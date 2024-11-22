import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProfilesPage from './pages/ProfilesPage/ProfilesPage'
import MainLayout from './layouts/MainLayout/MainLayout'
import ProfileFormPage from './pages/ProfileFormPage/ProfileFormPage'
import SamplePage from './pages/SamplePage/SamplePage'

function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>

          <Route path='' element={<Navigate to='/profiles' />} />
          <Route path='logged-in-redirect' element={<Navigate to='/profiles' />} />
          <Route path='logged-out-redirect' element={<Navigate to='/login' />} />

          <Route path='/sample' element={<SamplePage />} />

          <Route path='' element={<MainLayout />}>
            <Route path='/profiles' element={<ProfilesPage />} />
            <Route path='/profile-form' element={<ProfileFormPage />} />
          </Route>

        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
