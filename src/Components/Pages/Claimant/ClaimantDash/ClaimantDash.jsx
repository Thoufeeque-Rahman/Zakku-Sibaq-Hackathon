import { React, useState, useEffect } from 'react'
import './ClaimantDash.css'
import { Button, Col, Modal, ProgressBar, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import ZakathTrackerContainer from '../../../Components/ZakathTrackerContainer/ZakathTrackerContainer';
import ZakathCalcuIndicator from '../../../Components/ZakathCalcuIndicator/ZakathCalcuIndicator';
import BlogCard from '../../../Components/BlogCard/BlogCard';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import GooglePayButton from '@google-pay/button-react';


function ClaimantDash() {

  const auth = getAuth();
  const [show, setShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(true);
  const [claimantData, setClaimantData] = useState([])
  const [paymentData, setPaymentData] = useState([]);
  const [paymentModalShow, setPaymentModalShow] = useState(false);


  const user = auth.currentUser;
  const db = getFirestore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mahal: '',
    selectMahal: '',
    userMode: '',
    file: null,
    filePreview: null
  });

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
          const data = docSnap.data();
          setFormData((prevData) => ({
            ...prevData,
            phone: data.phone,
            mahal: data.mahal,
            userMode: data.userMode,
          }));

          if (!data.mahal) {
            console.log('Mahal not found');
            setShow(true);
          }

          console.log("Document data:", data);

          // if (data.userMode?.includes('Donor')) {
          //   fetchDonorPaymentData();
          //   console.log('Donor');
          // }

          if (data.userMode?.includes('Claimant')) {
            fetchClaimantPaymentData();
            console.log('Claimant');
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    // const fetchDonorPaymentData = async () => {
    //   if (user) {
    //     const docRef = doc(db, "Donors", user.uid);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //       console.log("Payment data:", docSnap.data().payments);
    //       setPaymentData(docSnap.data().payments);
    //     } else {
    //       console.log("No such document!");
    //     }
    //   }
    // };

    const fetchClaimantData = async () => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          name: user.displayName,
          email: user.email
        }));

        const docRef = doc(db, "Claimant", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData((prevData) => ({
            ...prevData,
            phone: docSnap.data().phone,
            mahal: docSnap.data().mahal,
            amount: docSnap.data().amount,
            status: docSnap.data().status,
          }));
          console.log("Document data:", docSnap.data());
          console.log(formData.status);
          if (docSnap.data().status !== 'approved') {
            console.log(formData.status);
            navigate('/general/claimant/apply');
          }
        } else {
          console.log("No such document!");
          navigate('/general/claimant/apply');
        }
      }

      console.log(formData);

    };

    fetchClaimantData();
    fetchUserData();
  }, [user, db]); // Add only stable dependencies


  const sortedPaymentData = Array.isArray(paymentData) && paymentData.length > 0 ? [...paymentData].sort((a, b) => b.timestamp.seconds - a.timestamp.seconds) : [];

  const timeAgo = (timestamp) => {
    const now = new Date();
    const secondsPast = (now.getTime() - timestamp.seconds * 1000) / 1000;

    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} secs ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} mins ago`;
    }
    if (secondsPast <= 86400) {
      return `${Math.floor(secondsPast / 3600)} hrs ago`;
    }
    if (secondsPast > 86400) {
      const day = timestamp.toDate().getDate();
      const month = timestamp.toDate().toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      const year = timestamp.toDate().getFullYear() === now.getFullYear() ? "" : " " + timestamp.toDate().getFullYear();
      return day + " " + month + year;
    }
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="container-dash-box">
      <div className="claimant-dashboard-box">
        <div className="header">
          <div className="header-text d-flex justify-content-start">
            <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            <div>
              <h1>Claimant Dashboard</h1>
            </div>
          </div>
        </div>
        <div className="claimant-dash-body">

          <div className="total-box row w-100 mx-auto">
            <div className="income text-center col">
              <h4>Allotted</h4>
              <h6><span className="rupee-sign">₹</span> {claimantData.amountAllotted}</h6>
            </div>
            <div className="expense text-center col border-end border-start">
              <h4>Recieved</h4>
              <h6><span className="rupee-sign">₹</span> {claimantData.paidAmount}</h6>
            </div>
            <div className="Total text-center col">
              <h4>Balance</h4>
              <h6><span className="rupee-sign">₹</span> {claimantData.amountAllotted - claimantData.paidAmount}</h6>
            </div>
          </div>
          <div className="recent-activities-container mt-4">
            <div className="recent-activities" style={{ cursor: 'default' }}>
              <div className="recent-activities-head">
                <div className="recent-activities-head-content d-flex justify-content-between">
                  <div>
                    <p className='fw-semibold' style={{ color: '' }}>Payment History</p>
                  </div>
                </div>
                <div className="recent-activities-body">
                  {paymentShow ?
                    <>
                      {sortedPaymentData.map((payment, index) => {
                        return <div key={index} className='d-flex justify-content-between mb-2'>
                          <div className='d-flex gap-2'>
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none">
                                <ellipse cx="20.6565" cy="20.5" rx="20.6565" ry="20.5" fill="#E5F8F6" />
                                <path d="M33.8016 27.0808V19.1631H8.76343V27.0808C8.76343 28.4807 9.29102 29.8233 10.2301 30.8132C11.1692 31.8031 12.443 32.3593 13.7711 32.3593H28.794C30.1221 32.3593 31.3958 31.8031 32.3349 30.8132C33.274 29.8233 33.8016 28.4807 33.8016 27.0808Z" stroke="#309A84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M32.3349 12.7914C31.3958 11.8015 30.1221 11.2454 28.794 11.2454H13.7711C12.443 11.2454 11.1692 11.8015 10.2301 12.7914C9.29102 13.7813 8.76343 15.1239 8.76343 16.5238H33.8016C33.8016 15.1239 33.274 13.7813 32.3349 12.7914Z" stroke="#309A84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div>
                              <p className='m-0 fw-semibold' style={{ fontSize: '12px' }} >Zakath Payment</p>
                              <p className='m-0 fw-semibold text-muted' style={{ fontSize: '12px' }} >{payment.paidAmount} {payment.donorId === user.uid && 'INR zakat paid to Claimant'} {payment.claimantId === user.uid && user.uid + ' ' + payment.claimantId}</p>
                            </div>
                          </div>
                          <div className='col-2'>
                            <p className='m-0 fw-semibold text-muted' style={{ fontSize: '12px' }}>{timeAgo(payment.timestamp)}</p>
                          </div>
                        </div>
                      })}
                    </>
                    :
                    <h3 className='text-muted text-center'>No Such activity found</h3>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimantDash