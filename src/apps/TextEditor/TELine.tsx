import React from 'react'
import { Element } from './Doc'
import Char from './TEChar'

const Line = ({indexY, line}: {indexY: number, line: Element[]}): JSX.Element => {
    return (
        <span key={indexY} style={{ height: '2rem' }}>
            {line.map((char, indexX) =>
                char.type === 'text' ? (
                    <span key={indexX}>
                        <Char
                            char={char.char}
                            id={char.id}
                            location={{ x: indexX, y: indexY }}
                        />
                    </span>
                ) : null
            )}
        </span>
    )
}

export default Line