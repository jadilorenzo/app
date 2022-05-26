import React from 'react'
import Logo from './Logos/Logo24.png'
import HeaderLogoNotch from './HeaderLogoNotch'
import { lineHeight } from '@mui/system'

export default function HeaderLogo() {
    return (
        <HeaderLogoNotch>
            <img
                src={Logo}
                style={{
                    height: '1.8rem',
                    margin: '0.5rem 0 0.5rem 0',
                }}
            />
            <div className='flex items-center justify-center m-1'>
                <h2 className='ml-1 text-lg'>
                    <span style={{ fontWeight: 400 }}>Power</span>
                </h2>
                <span
                    className='ml-3 mt-1 uppercase text-gray-600'
                    style={{
                        fontFamily: 'Helvetica',
                        fontSize: '0.25rem',
                        lineHeight: '0.25rem'
                    }}
                >
            Text Editor
                </span>
            </div>
        </HeaderLogoNotch>
    )
}
