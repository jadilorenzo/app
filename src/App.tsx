import './App.css'
import React from 'react'
import Apps from './apps'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AppStateProvider } from './AppState'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#36b223',
        },
        secondary: {
            main: '#595959',
        },
    },
    typography: {
        fontFamily: 'Tomorrow, Avenir',
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppStateProvider>
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
