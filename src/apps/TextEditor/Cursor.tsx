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
            <div
                style={
                    on
                        ? {
                            // position: 'relative',
                            // bottom: '1rem',
                            // // left: '0.1rem',
                            height: '1rem',
                            width: '0.1rem',
                            background: 'black',
                        }
                        : { width: '0.1rem' }
                }
            />
        </>
    )
}