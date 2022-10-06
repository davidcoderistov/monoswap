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
                type='view'
                value={props.fromValue}
                symbol={props.fromSymbol}
                imgSrc={props.fromImgSrc} />
            <ArrowDownward active={false} />
            <TokenInput
                type='view'
                value={props.toValue}
                symbol={props.toSymbol}
                imgSrc={props.toImgSrc} />
        </React.Fragment>
    )
}