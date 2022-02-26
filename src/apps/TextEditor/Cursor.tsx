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
            {on ? (
                <span
                    style={{
                        display: 'inline-block',
                        height: '1em',
                        width: '1px',
                        background: 'black',
                    }}
                />
            ) : (
                <span style={{ display: 'inline-block', width: '1px' }} />
            )}
        </>
    )
}