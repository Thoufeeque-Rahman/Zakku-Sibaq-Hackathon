import React from 'react'
import Home from './Home/Home'
import Navbar from '../../Components/Navbar/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import ZakathCalculator from './ZakathCalculator/ZakathCalculator'


function GeneralPage() {
  return (
    <div style={{ borderRadius: '12px', boxShadow: 'var(--box-shadow)' }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/zakat-calculator' element={<ZakathCalculator />} />
        <Route path='*' element={<Navigate to={'/getStarted'}/>} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default GeneralPage