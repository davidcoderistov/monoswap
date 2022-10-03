
export const NETWORKS = {
    ETHEREUM: {
        MAINNET: 'Ethereum',
        ROPSTEN: 'Ropsten',
        RINKEBY: 'Rinkeby',
        GORLI: 'Gorli',
        KOVAN: 'Kovan',
        SEPOLIA: 'Sepolia',
    },
    POLYGON: {
        MAINNET: 'Polygon',
        MUMBAI: 'Mumbai',
    },
    AVALANCHE: {
        MAINNET: 'Avalanche',
        FUJI: 'Fuji',
    },
    OPTIMISM: {
        MAINNET: 'Optimism',
        GORLI: 'Optimism Gorli',
        KOVAN: 'Optimism Kovan',
    },
    ARBITRUM: {
        MAINNET: 'Arbitrum',
        RINKEBY: 'Arbitrum Rinkeby',
        GORLI: 'Arbitrum Gorli',
    }
}

export const IMAGES = {
    [NETWORKS.ETHEREUM.MAINNET]: '/ethereumlogo.png',
    [NETWORKS.POLYGON.MAINNET]: '/polygonlogo.png',
    [NETWORKS.OPTIMISM.MAINNET]: '/optimismlogo.png',
    [NETWORKS.ARBITRUM.MAINNET]: 'https://arbiscan.io/images/svg/brands/arbitrum.svg?v=1.3',
}