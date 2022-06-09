import React from 'react'
import Logo from './Logos/Logo25.png'
import HeaderLogoNotch from './HeaderLogoNotch'

export default function HeaderLogo() {
    return (
        <HeaderLogoNotch>
            <img
                src={Logo}
                style={{
                    height: '1.25rem',
                    marginTop: '0.85rem',
                    marginBottom: '0.85rem'
                }}
            />
            <div className='flex items-center justify-center m-1'>
                <h2 className='ml-1 text-lg'>
                    <span style={{ fontWeight: 400 }}>Forward Tech</span>
                </h2>
                <span
                    className='ml-3 mt-1 uppercase text-gray-600'
                    style={{
                        fontFamily: 'Dosis',
                        fontSize: '.75rem',
                    }}
                >
            Text/Math Editor
                </span>
            </div>
        </HeaderLogoNotch>
    )
}
