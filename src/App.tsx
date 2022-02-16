import './App.css'
import React from 'react'
import Apps from './apps'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AppStateProvider } from './AppState'

function App() {
    return (
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
    )
}

export default App
