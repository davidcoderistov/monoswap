import React, {useState} from 'react'
import { Box } from '@mui/material'
import MainApp from './components/App'
import AppContext, { Provider, Account, Wallet } from './context'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Verdana',
        },
    },
})


function App() {

    const [provider, setProvider] = useState<Provider>(null)
    const [selectedAccount, setSelectedAccount] = useState<Account>(null)
    const [selectedChainId, setSelectedChainId] = useState(1)
    const [connectedTo, setConnectedTo] = useState<Wallet>(null)
    const [message, setMessage] = useState<string | null>(null)

    // Metamask info
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
    const [isMetamaskConnecting, setIsMetamaskConnecting] = useState(false)
    const [isMetamaskError, setIsMetamaskError] = useState(false)

    const context = {
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
        metamask: {
            isInstalled: isMetamaskInstalled,
            setIsInstalled: setIsMetamaskInstalled,
            isConnecting: isMetamaskConnecting,
            setIsConnecting: setIsMetamaskConnecting,
            isError: isMetamaskError,
            setIsError: setIsMetamaskError,
        }
    }

  return (
      <ThemeProvider theme={theme}>
          <AppContext.Provider value={context}>
              <Box sx={{ padding: 2 }}>
                  <Box sx={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: 'none',
                      width: '200vw',
                      height: '200vh',
                      background: 'radial-gradient(50% 50% at 50% 50%, #fc077d10 0%, rgba(255, 255, 255, 0) 100%)',
                      transform: 'translate(-50vw, -100vh)',
                      zIndex: -1,
                      backgroundColor: '#212429',
                  }} />
                  <MainApp />
              </Box>
          </AppContext.Provider>
      </ThemeProvider>
  )
}

export default App
