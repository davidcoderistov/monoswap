import React, { useState, useEffect, useContext } from 'react'
import { Dialog, Box } from '@mui/material'
import ConnectWalletModalTitle from './ConnectWalletModalTitle'
import WalletsView from './WalletsView'
import LoadingView from './LoadingView'
import ErrorView from './ErrorView'
import AccountView from './AccountView'
import TermsView from './TermsView'
import AppContext from '../../context'
import { Transaction } from '../../types'
import { getChainExplorerUrl } from '../../utils'


interface ConnectWalletModalProps {
    open: boolean
    onClose: () => void
}

export default function ConnectWalletModal (props: ConnectWalletModalProps) {

    const {
        provider,
        selectedAccount,
        setSelectedAccount,
        connectedTo,
        setConnectedTo,
        transactions,
        metamask
    } = useContext(AppContext)

    const [selectedWallet, setSelectedWallet] = useState<'metamask'>('metamask')
    const [isWalletsView, setIsWalletsView] = useState(false)
    const [isAccountView, setIsAccountView] = useState(false)
    const [isActionable, setIsActionable] = useState(false)

    useEffect(() => {
        if (props.open) {
            const isConnected = Boolean(connectedTo) && Boolean(selectedAccount)
            setIsAccountView(isConnected)
            setIsWalletsView(!isConnected)
            setIsActionable(false)
        }
    }, [props.open, connectedTo, selectedAccount])

    useEffect(() => {
        if (isAccountView) {
            setIsActionable(false)
        }
    }, [isAccountView])

    const [isConnecting, setIsConnecting] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (metamask.isConnecting || metamask.isError) {
            setIsWalletsView(false)
            setIsActionable(true)
        }
        setIsConnecting(metamask.isConnecting)
        setIsError(metamask.isError)
    }, [metamask.isConnecting, metamask.isError])


    const handleConnectWallet = (wallet: 'metamask') => {
        setSelectedWallet(wallet)
        if (connectedTo === wallet) {
            handleClickBack()
        } else {
            if (wallet === 'metamask') {
                if (provider) {
                    const tryConnecting = async () => {
                        metamask.setIsConnecting(true)
                        try {
                            const accounts = await provider.send('eth_requestAccounts', [])
                            if (Array.isArray(accounts) && accounts.length > 0) {
                                setSelectedAccount(accounts[0])
                                setConnectedTo('metamask')
                                metamask.setIsError(false)
                            } else {
                                metamask.setIsError(true)
                            }
                            metamask.setIsConnecting(false)
                        } catch (e) {
                            metamask.setIsError(true)
                            metamask.setIsConnecting(false)
                        }
                    }
                    tryConnecting()
                } else {
                    window.open('https://metamask.io/')
                }
            }
        }
    }

    const handleClickTryAgain = () => {
        handleConnectWallet(selectedWallet)
    }

    const handleClickBack = () => {
        if (isConnecting || isError) {
            setIsWalletsView(true)
        } else {
            setIsAccountView(true)
        }
        setIsActionable(false)
    }

    const handleDisconnectWallet = () => {
        setConnectedTo(null)
        setSelectedAccount(null)
        setIsActionable(false)
    }

    const handleChangeWallet = () => {
        setIsWalletsView(true)
        setIsAccountView(false)
        setIsActionable(true)
    }

    const handleTransactionClick = (transaction: Transaction) => {
        const baseUrl = getChainExplorerUrl(transaction.chainId)
        if (baseUrl) {
            window.open(`${baseUrl}/tx/${transaction.hash}`)
        }
    }

    return (
        <Dialog
            open={props.open}
            fullWidth
            sx={{
                '.MuiDialog-paper':
                    { backgroundColor: '#191B1F',
                        borderRadius: '30px',
                        maxWidth: '418px'
                    }
            }}
        >
            <Box
                component='div'
                color='#FFFFFF'
            >
                <ConnectWalletModalTitle
                    title={ isAccountView ? 'Account' : 'Connect a wallet'}
                    actionable={isActionable}
                    disabled={false}
                    onClickBack={handleClickBack}
                    onClose={props.onClose} />
                { isAccountView && selectedAccount ? (
                    <AccountView
                        address={selectedAccount}
                        transactions={transactions}
                        onTransactionClick={handleTransactionClick}
                        onDisconnect={handleDisconnectWallet}
                        onChange={handleChangeWallet}
                    />
                ) : (
                    <React.Fragment>
                        { isWalletsView ? (
                            <React.Fragment>
                                <WalletsView
                                    connectedTo={connectedTo}
                                    isMetamaskInstalled={metamask.isInstalled}
                                    onClick={handleConnectWallet} />
                                <TermsView />
                            </React.Fragment>
                        ) : isConnecting ? (
                            <React.Fragment>
                                <LoadingView />
                                <TermsView />
                            </React.Fragment>
                        ) : (
                            <ErrorView
                                onClickTryAgain={handleClickTryAgain}
                                onClickBackToWallet={handleClickBack} />
                        )}
                        <Box paddingBottom='20px' />
                    </React.Fragment>
                )}
            </Box>
        </Dialog>
    )
}