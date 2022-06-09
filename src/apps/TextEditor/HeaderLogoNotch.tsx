import React, { useContext } from 'react'
import { AppState } from '../../AppState'

export default function HeaderLogoNotch(props: {children: any}) {
    const { get } = useContext(AppState)

    return (
        <span
            className='header-logo-notch'
            style={{
                background: get('darkMode') ? '#36b223' : 'white',
                width: '18rem',
                clipPath:
                    'polygon(0 0, 18rem 0, 18rem 2rem, 17rem 3rem, 0 3rem)',
            }}
        >
            <div className='flex pl-2' style={{width: '18rem', margin: 'auto'}}>
                {props.children}
            </div>
        </span>
    )
}
