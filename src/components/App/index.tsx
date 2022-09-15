import React, { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import SelectNetwork from '../SelectNetwork'
import ConnectWalletButton from '../ConnectWalletButton'
import AccountButton from '../AccountButton'
import ConnectWalletModal from '../ConnectWalletModal'
import AppContext from '../../context'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'


export default function App () {

    const {
        provider,
        setProvider,
        selectedAccount,
        setSelectedAccount,
        setConnectedTo,
        metamask,
    } = useContext(AppContext)

    const [connectWalletOpen, setConnectWalletOpen] = useState(false)

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

            const handleChainChanged = () => {
                console.log('chain changed')
            }
            rpcProvider.on('chainChanged', handleChainChanged)

            return () => {
                rpcProvider.off('accountsChanged', handleAccountsChange)
                rpcProvider.off('chainChanged', handleChainChanged)
            }
        }
    }, [provider, setSelectedAccount, setConnectedTo])

    const handleOpenConnectWallet = () => {
        setConnectWalletOpen(true)
    }

    const handleCloseConnectWallet = () => {
        setConnectWalletOpen(false)
    }

    return (
        <Box
            component='div'
            display='flex'
            justifyContent='end'
        >
            <SelectNetwork />
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
    )
}