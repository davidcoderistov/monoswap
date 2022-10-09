import React from 'react'
import TokenInput from '../TokenInput'
import ArrowDownward from '../ArrowDownward'


interface SwapTokensProps {
    fromType: 'button' | 'select'
    fromValue: string
    onFromChange: (fromValue: string) => void
    fromDisabled: boolean
    fromBalance?: string
    fromSymbol?: string
    fromImgSrc?: string
    onFromClick: () => void
    toType: 'button' | 'select'
    toValue: string
    onToChange: (fromValue: string) => void
    toDisabled: boolean
    toBalance?: string
    toSymbol?: string
    toImgSrc?: string
    onToClick: () => void
    switchActive: boolean
    onSwitchClick: () => void
}

export default function SwapTokens (props: SwapTokensProps) {
    return (
        <React.Fragment>
            <TokenInput
                type={props.fromType}
                value={props.fromValue}
                onChange={props.onFromChange}
                disabled={props.fromDisabled}
                symbol={props.fromSymbol}
                imgSrc={props.fromImgSrc}
                balance={props.fromBalance}
                onClick={props.onFromClick} />
            <ArrowDownward
                active={props.switchActive}
                onClick={props.onSwitchClick} />
            <TokenInput
                type={props.toType}
                value={props.toValue}
                onChange={props.onToChange}
                disabled={props.toDisabled}
                symbol={props.toSymbol}
                imgSrc={props.toImgSrc}
                balance={props.toBalance}
                onClick={props.onToClick} />
        </React.Fragment>
    )
}