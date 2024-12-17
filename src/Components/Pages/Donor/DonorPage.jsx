import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ApplicationForm from './ApplicationForm/ApplicationForm'
import Navbar from '../../Components/Navbar/Navbar'
import ClaimantsList from './ClaimantsList/ClaimantsList'
import ApplicationStatus from './ApplicationStatus/ApplicationStatus'
import ZakathTracker from '../General/ZakathTracker/ZakathTracker'
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import ZakatPaymentGateway from './ZakatPaymentGateway/ZakatPaymentGateway'

function DonorPage() {
  const [donor, setDonor] = useState()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mahal: '',
    userMode: ''
  });

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          name: user.displayName,
          email: user.email
        }));

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData((prevData) => ({
            ...prevData,
            phone: docSnap.data().phone,
            mahal: docSnap.data().mahal,
            userMode: docSnap.data().userMode,
            
          }));
          if (docSnap.data().userMode.includes('Donor')) {
            setDonor(true);
          }else{
            navigate('/general/donor/apply');
          }
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<h1>Donor</h1>} />
        <Route path='/apply' element={<ApplicationForm setDonor />} />
        <Route path='/application-status' element={<ApplicationStatus />} />
        <Route path='/claimants-list' element={<ClaimantsList />} />
        <Route path='/claimants-list/:id' element={<h1>Claimant</h1>} />
        <Route path='/zakath-tracker' element={<ZakathTracker />} />
        <Route path='/zakat-payment-gateway/:claimantId' element={<ZakatPaymentGateway vakeel={false} />} />
        <Route path='/zakat-payment-gateway/d2v/:vakeelId' element={<ZakatPaymentGateway vakeel={true} />} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default DonorPage