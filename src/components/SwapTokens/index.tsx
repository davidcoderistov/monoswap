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
    selectable?: boolean
}

export default function SwapTokens ({ selectable = true, ...props }: SwapTokensProps) {
    return (
        <React.Fragment>
            <TokenInput
                type={props.fromType}
                value={props.fromValue}
                onChange={props.onFromChange}
                disabled={props.fromDisabled || !selectable}
                symbol={props.fromSymbol}
                imgSrc={props.fromImgSrc}
                balance={props.fromBalance}
                onClick={props.onFromClick}
                selectable={selectable} />
            <ArrowDownward
                active={props.switchActive}
                onClick={props.onSwitchClick} />
            <TokenInput
                type={props.toType}
                value={props.toValue}
                onChange={props.onToChange}
                disabled={props.toDisabled || !selectable}
                symbol={props.toSymbol}
                imgSrc={props.toImgSrc}
                balance={props.toBalance}
                onClick={props.onToClick}
                selectable={selectable}/>
        </React.Fragment>
    )
}