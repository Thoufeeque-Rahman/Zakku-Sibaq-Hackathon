import React, { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ApplicationForm from './ApplicationForm/ApplicationForm'
import Navbar from '../../Components/Navbar/Navbar'
import ApplicationStatus from './ApplicationStatus/ApplicationStatus'
import ZakathTracker from '../General/ZakathTracker/ZakathTracker'
import ClaimantDash from './ClaimantDash/ClaimantDash'

function ClaimantPage() {
  const [donor, setDonor] = useState(true)
  const navigate = useNavigate()
  return (
    <div>
      <Routes>
        <Route path='/' element={<h1>Claimant</h1>} />
        <Route path='/apply' element={<ApplicationForm setDonor />} />
        <Route path='/application-status' element={<ApplicationStatus />} />
        <Route path='/zakath-tracker' element={<ZakathTracker />} />
        <Route path='/dashboard' element={<ClaimantDash />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default ClaimantPage