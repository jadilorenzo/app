import './App.css'
import React from 'react'
import Apps from './apps'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AppStateProvider } from './AppState'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, useMediaQuery } from '@mui/material'

function App() {
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const prefersDarkMode = false

    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark': undefined,
            primary: {
                main: '#36b223',
            },
            secondary: {
                main: '#595959',
            },
            background: {
                default: prefersDarkMode ? '#343434' : '#FAFAFA',
                paper: prefersDarkMode ?  'F0F0F0' : undefined
            }
        },
        typography: {
            fontFamily: 'Tomorrow, Avenir',
        },
        shape: {
            borderRadius: 0
        },
        components: {
            MuiPaper: {
                defaultProps: {
                    elevation: 0,
                    variant: 'outlined'
                }
            }
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppStateProvider>
                    <CssBaseline/>
                    <Routes>
                    
                        <Route path='/' element={
                            <>
                                <div>Hello World</div>
                                <br/>
                                {Object.keys(Apps).map((key) => (
                                    <div key={key}><Link to={`/apps/${key}`}>{key}</Link></div>
                                ))}
                            </>
                        }/>
                        {Object.keys(Apps).map((key: string) => {
                            const A : React.FC = Apps[key]
                            return (
                                <Route key={key} path={`/apps/${key}`} element={<A/>}/>
                            )
                        })}
                    
                    </Routes>
                </AppStateProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
