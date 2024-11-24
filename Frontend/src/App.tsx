import './App.css'
import 'react-toastify/ReactToastify.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProfilesPage from './pages/ProfilesPage/ProfilesPage'
import MainLayout from './layouts/MainLayout/MainLayout'
import ProfileFormPage from './pages/ProfileFormPage/ProfileFormPage'
import SamplePage from './pages/SamplePage/SamplePage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import { NoAuthGuard } from './components/Guards/NoAuthGuard'
import { AuthGuard } from './components/Guards/AuthGuard'

function App() {
  return (
    <>

      {/**************************************************
      * Toast
      */}
      <ToastContainer />



      {/**************************************************
     * Routes
     */}
      <BrowserRouter>
        <Routes>

          <Route path='' element={<Navigate to='/home' />} />
          <Route path='logged-in-redirect' element={<Navigate to='/profiles' />} />
          <Route path='logged-out-redirect' element={<Navigate to='/login' />} />


          {/* Other Pages */}
          <Route path='/home' element={<HomePage />} />
          <Route path='/sample' element={<SamplePage />} />


          {/* No-Auth Pages */}
          <Route element={<NoAuthGuard />}>
            <Route path='/login' element={<LoginPage />} />
          </Route>


          {/* Auth Pages */}
          <Route element={<AuthGuard />}>
            <Route path='' element={<MainLayout />}>
              <Route path='/profiles' element={<ProfilesPage />} />
              <Route path='/profile-form' element={<ProfileFormPage />} />
            </Route>
          </Route>


          <Route path='*' element={<div className='w-full h-full flex items-center justify-center text-xl text-gray-600'>Page Not Found</div>} />

        </Routes>
      </BrowserRouter >


    </>
  )
}

export default App
