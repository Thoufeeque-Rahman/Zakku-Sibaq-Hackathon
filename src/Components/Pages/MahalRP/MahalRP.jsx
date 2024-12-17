import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../General/Auth/Login'
import Navbar from '../../Components/Navbar/Navbar'
import Signup from '../General/Auth/Signup'
import MahalDashboard from './MahalDashboard/MahalDashboard'

function MahalRP() {
    return (
        <div style={{ borderRadius: '12px', boxShadow: 'var(--box-shadow)' }}>
            <Routes>
                <Route path='/login' element={<Login general={false} userMode='Mahal' />} />
                <Route path='/signup' element={<Signup general={false} userMode='Mahal' />} />
                <Route path='/dashboard' element={
                    <>
                        <MahalDashboard />
                        {/* <Navbar /> */}
                    </>
                } />
            </Routes>
        </div>
    )
}

export default MahalRP