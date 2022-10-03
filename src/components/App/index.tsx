import React, { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import Snackbar from "../Snackbar";
import SelectNetwork from '../SelectNetwork'
import ConnectWalletButton from '../ConnectWalletButton'
import AccountButton from '../AccountButton'
import ConnectWalletModal from '../ConnectWalletModal'
import SwapInterface from '../SwapInterface'
import AppContext from '../../context'
import detectEthereumProvider from '@metamask/detect-provider'
import { getNetwork, getChainId, getRpcUrls, getNetworkImgSrc, getChainIdHexValue, isChainSupported } from '../../utils'
import { ethers } from 'ethers'


export default function App () {

    const {
        provider,
        setProvider,
        selectedAccount,
        setSelectedAccount,
        selectedChainId,
        setSelectedChainId,
        connectedTo,
        setConnectedTo,
        message,
        setMessage,
        metamask,
    } = useContext(AppContext)

    const [connectWalletOpen, setConnectWalletOpen] = useState(false)

    const selectedNetwork = getNetwork(selectedChainId)
    const selectedImgSrc = getNetworkImgSrc(selectedChainId)

    useEffect( () => {
        const trySetProvider = async () => {
            try {
                const provider = await detectEthereumProvider({ silent: true })
                if (provider) {
                    if (provider === window.ethereum) {
                        setProvider(new ethers.providers.Web3Provider(provider))
                        metamask.setIsInstalled(true)
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
        trySetProvider()
    }, [setProvider])

    useEffect(() => {
        if (provider) {
            const trySetAccount = async () => {
                try {
                    const accounts = await provider.send('eth_accounts', [])
                    if (Array.isArray(accounts) && accounts.length > 0) {
                        setSelectedAccount(accounts[0])
                        setConnectedTo('metamask')
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            trySetAccount()

            const { provider: rpcProvider }: any = provider

            const handleAccountsChange = (accounts: string[]) => {
                setSelectedAccount(accounts.length > 0 ? accounts[0] : null)
            }
            rpcProvider.on('accountsChanged', handleAccountsChange)

            const handleChainChanged = (chainId: string) => {
                setSelectedChainId(Number(chainId))
            }
            rpcProvider.on('chainChanged', handleChainChanged)

            return () => {
                rpcProvider.off('accountsChanged', handleAccountsChange)
                rpcProvider.off('chainChanged', handleChainChanged)
            }
        }
    }, [provider, setSelectedAccount, setConnectedTo, setSelectedChainId])

    useEffect(() => {
        if (provider && connectedTo === 'metamask') {
            const trySetNetwork = async () => {
                try {
                    const chainId: string = await provider.send('net_version', [])
                    setSelectedChainId(Number(chainId))
                } catch (e) {
                    console.error(e)
                }
            }
            trySetNetwork()
        }
    }, [provider, connectedTo, setSelectedChainId])

    useEffect(() => {
        if (!isChainSupported(selectedChainId)) {
            const network = getNetwork(selectedChainId)
            setMessage(`The Monoswap Interface does not support the ${network} network. You won't be able to swap any tokens.`)
        }
    }, [selectedChainId, setMessage])

    const handleChangeSelectedNetwork = (network: string) => {
        const chainId = getChainId(network)
        if (chainId) {
            if (connectedTo === 'metamask') {
                if (provider) {
                    const { provider: rpcProvider }: any = provider
                    if (rpcProvider && rpcProvider.request) {
                        const trySwitchNetwork = async () => {
                            try {
                                await rpcProvider.request({
                                    method: 'wallet_switchEthereumChain',
                                    params: [{ chainId: getChainIdHexValue(chainId) }]
                                })
                                setSelectedChainId(chainId)
                            } catch (switchError: any) {
                                if (switchError.code === 4902) {
                                    try {
                                        const rpcUrls = getRpcUrls(chainId)
                                        await rpcProvider.request({
                                            method: 'wallet_addEthereumChain',
                                            params: [
                                                {
                                                    chainId: getChainIdHexValue(chainId),
                                                    chainName: network,
                                                    rpcUrls,
                                                },
                                            ],
                                        })
                                    } catch (addError) {
                                        setMessage(
                                            `Failed to switch networks from the Monoswap Interface.
                                             In order to use Monoswap on ${network}, you must change 
                                             the networks in your wallet.`
                                        )
                                        return
                                    }
                                } else {
                                    setMessage(
                                        `Failed to switch networks from the Monoswap Interface.
                                             In order to use Monoswap on ${network}, you must change 
                                             the networks in your wallet.`
                                    )
                                }
                            }
                        }
                        trySwitchNetwork()
                    }
                }
            } else if (connectedTo === 'walletconnect') {
                // TODO: Handle network change when connected to WalletConnect
            } else {
                setSelectedChainId(chainId)
            }
        }
    }

    const handleOpenConnectWallet = () => {
        setConnectWalletOpen(true)
    }

    const handleCloseConnectWallet = () => {
        setConnectWalletOpen(false)
    }

    const handleCloseSnackbar = () => {
        setMessage(null)
    }

    return (
        <React.Fragment>
            <Box
                component='div'
                display='flex'
                justifyContent='end'
            >
                { selectedNetwork && (
                    <SelectNetwork
                        selectedNetwork={selectedNetwork}
                        selectedImgSrc={selectedImgSrc}
                        onChange={handleChangeSelectedNetwork}
                    />
                )}
                <Box ml='12px' />
                { selectedAccount ? (
                    <AccountButton
                        address={selectedAccount}
                        onClick={handleOpenConnectWallet} />
                ) : (
                    <ConnectWalletButton onClick={handleOpenConnectWallet} />
                )}
                <ConnectWalletModal
                    open={connectWalletOpen}
                    onClose={handleCloseConnectWallet}
                />
            </Box>
            <Box
                component='div'
                position='absolute'
                left='calc(100% - 390px)'
            >
                <Snackbar
                    open={Boolean(message)}
                    message={message ?? ''}
                    onClose={handleCloseSnackbar} />
            </Box>
            <Box
                component='div'
                display='flex'
                justifyContent='center'
                marginTop='80px'
            >
                <SwapInterface onConnectWallet={handleOpenConnectWallet} />
            </Box>
        </React.Fragment>
    )
}