import React, { useEffect, useState } from 'react'

export default function Cursor() {
    const [on, setOn] = useState<boolean>(true)

    useEffect(() => {
        const id = setTimeout(() => {
            setOn((o) => !o)
        }, 450)
        return () => clearTimeout(id)
    })

    return (
        <>
            <span style={{ height: 0, width: 0, display: 'inline-block' }}>
                <div
                    style={
                        on
                            ? {
                                height: '1.2rem',
                                width: '0.1rem',
                                background: 'black',
                                display: 'inline-block',
                                position: 'relative',
                                bottom: '-0.2rem',
                            }
                            : { height: '1.2rem', width: '0.1rem', display: 'inline-block' }
                    }
                />
            </span>
        </>
    )
}