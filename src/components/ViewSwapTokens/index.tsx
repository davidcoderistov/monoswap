import React from 'react'
import TokenInput from '../TokenInput'
import ArrowDownward from '../ArrowDownward'


interface ViewSwapTokensProps {
    fromValue: string
    fromSymbol: string
    fromImgSrc: string
    toValue: string
    toSymbol: string
    toImgSrc: string
}

export default function ViewSwapTokens (props: ViewSwapTokensProps) {

    return (
        <React.Fragment>
            <TokenInput
                value={props.fromValue}
                type='view'
                symbol={props.fromSymbol}
                imgSrc={props.toSymbol} />
            <ArrowDownward active={false} />
            <TokenInput
                value={props.toValue}
                type='view'
                symbol={props.toSymbol}
                imgSrc={props.toImgSrc} />
        </React.Fragment>
    )
}