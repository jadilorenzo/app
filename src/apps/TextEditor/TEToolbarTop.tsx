import { Button, Tab, useTheme, Tabs } from '@mui/material'
import React from 'react'
import DocIcon from './Logos/DocIcon3.png'
import ShareIcon from './Logos/ShareIcon3.png'

export default function ToolbarTop() {
    const theme = useTheme()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    
    return (
        <Tabs
            style={{
                height: '3rem',
                display: 'flex',
            }}
            value={value}
            onChange={handleChange}
        >
            <Tab
                icon={
                    <img
                        src={DocIcon}
                        style={{
                            height: '1rem',
                            filter:
                  theme.palette.mode === 'dark' ? 'invert(100%)' : undefined,
                        }}
                    />
                }
            />
            <Tab
                icon={
                    <img
                        src={ShareIcon}
                        style={{
                            height: '1rem',
                            filter:
                  theme.palette.mode === 'dark' ? 'invert(100%)' : undefined,
                        }}
                    />
                }
            />
            <div
                style={{ display: 'inline', borderRadius: 0, textTransform: 'none' }}
            ></div>
        </Tabs>
    )
}
