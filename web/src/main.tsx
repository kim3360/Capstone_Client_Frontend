import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import MemberListScreen from './admin/screens/MemberList.tsx'
import QueueList from './admin/screens/QueueList.tsx'
import AdminMain from './admin/screens/AdminMain.tsx'
import LoginPage from './admin/config/adminLogin.tsx'
import GuestScreen from './user/UserScreen/GuestScreen.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<GuestScreen />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
//