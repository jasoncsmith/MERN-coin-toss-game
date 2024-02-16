import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import messages, { DEFAULT_TOAST_OPTIONS } from './messages'

import { AppDispatch } from './reducers'
import { isTokenExpired } from './helpers'
import { loadState } from './helpers/localStorage'
import { navigationProxy } from './helpers/navigationProxy'

import { logout } from './actions/auth'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  navigationProxy.navigate = useNavigate() // initialize navigation outside of components

  const dispatch: AppDispatch = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    const state = loadState()
    const user = state?.user?.user
    // checks onLoad and path change

    if (user && isTokenExpired(user.exp)) {
      dispatch(logout())
      messages.info('Your session has expired')
    }
  }, [pathname])

  return (
    <Container maxWidth="lg">
      <Navbar />
      <ToastContainer {...DEFAULT_TOAST_OPTIONS} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </Container>
  )
}

export default App
