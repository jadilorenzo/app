import React, { useContext } from 'react'
import { AppState } from '../../AppState'

export default function HeaderLogoNotch(props: {children: any}) {
    const { get } = useContext(AppState)

    return (
        <span
            className='header-logo-notch'
            style={{
                background: get('darkMode') ? '#36b223' : 'white',
                width: '14rem',
                clipPath:
                    'polygon(0 0, 11.75rem 0, 11.75rem 2rem, 10.75rem 3rem, 0 3rem)',
            }}
        >
            <div className='flex w-56 ml-2'>
                {props.children}
            </div>
        </span>
    )
}
