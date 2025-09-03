import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages'
import RootLayout from './pages/layout'
import { ThemeProvider } from "@/components/theme-provider"
import { HashRouter, Routes, Route } from 'react-router'
import SignIn from './pages/sign-in'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HashRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route index element={<App />}/>
                        <Route path="/login" element={<SignIn />} />
                    </Route>
                </Routes>
            </HashRouter>
        </ThemeProvider>
  </StrictMode>,
)
