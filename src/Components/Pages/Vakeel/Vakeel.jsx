import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../General/Auth/Login'
import Navbar from '../../Components/Navbar/Navbar'
import Signup from '../General/Auth/Signup'
import VakeelDashboard from './VakeelDashboard/VakeelDashboard'
import ZakatPaymentGateway from '../Donor/ZakatPaymentGateway/ZakatPaymentGateway'

function Vakeel() {
    return (
        <div style={{ borderRadius: '12px', boxShadow: 'var(--box-shadow)' }}>
            <Routes>
                <Route path='/login' element={<Login general={false} userMode='Vakeel' />} />
                <Route path='/signup' element={<Signup general={false} userMode='Vakeel' />} />
                <Route path='/dashboard' element={
                    <>
                        <VakeelDashboard />
                        {/* <Navbar /> */}
                    </>
                } />
                <Route path='/zakat-payment-gateway/v2c/:transactionId' element={<ZakatPaymentGateway v2c={true} />} />
            </Routes>
        </div> 
    )
}

export default Vakeel