import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/landing.jsx'
import SignIn from './pages/signIn.jsx'
import SignUp from './pages/signUp.jsx'
import Home from './pages/home.jsx'
import ForgotPassword from './pages/forgotPassword.jsx'
import useCurrentUser from './hooks/useCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import UploadPage from './pages/UploadPage.jsx'
import { AppProvider } from './context/AppProvider.jsx'
import usePostCall from './hooks/usePostCall.jsx'
import FluidLandingPage from './pages/FluidLandingPage.jsx'

function App() {
  useCurrentUser()
  usePostCall()
  const { userData } = useSelector(state => state.user)

  return (
    <AppProvider>
      <Routes>
        <Route path='/' element={userData ? <Navigate to="/home" /> : <Landing />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={userData ? <Home /> : <SignIn />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/profile/:user_name' element={<Profile />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/fluid-test' element={<FluidLandingPage />} />
      </Routes>
    </AppProvider>
  )
}

export default App
