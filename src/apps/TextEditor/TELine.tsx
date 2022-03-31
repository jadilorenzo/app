import React from 'react'
import { Paragraph } from './Document'
import Char from './TEChar'

const Line = ({i, p}: {i: number, p: Paragraph}): JSX.Element => {

    return (
        <span key={i} style={{ height: '2rem' }}>
            {p.content.split('').map((char, index) => (
                <span key={index}>
                    <Char char={char} index={index} parIndex={i} />
                </span>
            ))}
        </span>
    )
}

export default Line