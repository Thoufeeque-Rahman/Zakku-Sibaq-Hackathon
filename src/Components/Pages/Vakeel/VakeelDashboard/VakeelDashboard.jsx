import { getAuth, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import './VakeelDashboard.css'
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function VakeelDashboard() {

  const auth = getAuth();
  const user = auth.currentUser;

  const db = getFirestore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    userMode: ''
  });
  const [payments, setPayments] = useState([])
  const [userState, setUserState] = useState(() => user ? user : null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('VakeelDashboard')
    const fetchVakeelData = async () => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          name: user.displayName,
          email: user.email
        }));

        const docRef = doc(db, "vakeels", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData((prevData) => ({
            ...prevData,
            phone: docSnap.data().phone,
            whatsapp: docSnap.data().whatsapp,
            userMode: docSnap.data().userMode
          }));
          if (!docSnap.data().userMode.includes('Vakeel')) {
            alert('You are not authorized to access this page');
            console.log('You are not authorized to access this page');
            navigate('/getStarted');
          }
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    }

    const fetchPaymentsData = async () => {
      const querySnapshot = await getDocs(collection(db, "payments"));
      const paymentsData = [];
      querySnapshot.forEach((doc) => {
        paymentsData.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      console.log('payments' + { paymentsData });
      setPayments(paymentsData);
    }

    fetchVakeelData()
    fetchPaymentsData()
  }, [user, db])

  const handleSignout = () => {
    if (!userState) {
      console.log("No user signed in");
      alert("No user signed in");
      return;
    } else {
      signOut(auth).then(() => {
        setUserState(null);
        alert("Sign out successful");
        navigate('/getStarted')
      }).catch((error) => {
        console.log("Sign out failed");
      });
    }
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const secondsPast = (now.getTime() - timestamp.seconds * 1000) / 1000;

    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast <= 86400) {
      return `${Math.floor(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast > 86400) {
      const day = timestamp.toDate().getDate();
      const month = timestamp.toDate().toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      const year = timestamp.toDate().getFullYear() === now.getFullYear() ? "" : " " + timestamp.toDate().getFullYear();
      return day + " " + month + year;
    }
  };


  const paymentsFiltered = payments.filter((payment) => payment.paymentType === 'd2v').filter((payment) => payment.vakeelId === user.uid).sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

  const handleVakeelPayment = (transactionId) => {

    navigate(`/general/vakeel/zakat-payment-gateway/v2c/${transactionId}`);
  };



  return (
    <div className="container-box pb-5">
      <div className="vakeel-dash-box">
        <div className="header">
          <div className="header-text d-flex justify-content-between">
            <div>
              <p>Assalamu Alaikum, Welcome <span className='fw-bold'>Vakeel!</span></p>
              {user ? <h1 className='text-wrap'>{formData.name}</h1> : <div className='mb-2' style={{ height: '35px', width: '300px', backgroundColor: '#ffffff82', borderRadius: '12px' }}></div>}
            </div>
            <div>
              <div className="noti-icon" onClick={handleSignout} style={{ backgroundColor: 'rgba(217, 217, 217, 0.30)', padding: '8px 10px', borderRadius: '50%', cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                  <path d="M15 12h-12l3 -3" />
                  <path d="M6 15l-3 -3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="vakeel-dash-body">
          <Tabs defaultActiveKey="all" id="claimant-donor-tabs" className="mb-3 gap-2 vakeel">
            <Tab eventKey="all" title="All Zakats">

              <div className="claimants-box">
                {paymentsFiltered && paymentsFiltered.map((payment, index) => {

                  return <div key={index} className="claimant-card mb-3">
                    <div className="d-flex">
                      <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Payment</p>
                      </div>
                      {payment.transferred && <div className="claimant-mahallu ms-auto text-success bg-success-subtle d-flex align-items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                        </svg>
                        <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transferred</p>
                      </div>}
                      {!payment.transferred && <div className="claimant-mahallu ms-auto d-flex align-items-center text-warning-emphasis bg-warning-subtle mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock ms-auto">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                        </svg>
                        <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Not-Transferred</p>
                      </div>}
                    </div>
                    <h2 className='mb-1' style={{
                      fontSize: "20px",
                    }}><span className='fs-6 fw-regular'>From: </span> {payment.donorName}</h2>
                    <p className='mb-1 text-muted opacity-75'>@{payment.donorUpiId}</p>
                    <h2 className='mb-1' style={{
                      fontSize: "16px",
                    }}>Amount: <span className='fs-5 fw-regular' style={{ color: 'var(--primary-color)' }}>{payment.paidAmount}</span></h2>

                    <p className='mb-1 text-muted opacity-75' style={{ fontSize: '14px' }} >
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                      </svg> {timeAgo(payment.timestamp)}
                    </p>
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center w-100 text-center mt-2" onClick={() => handleVakeelPayment(payment.id)} style={{ backgroundColor: 'var(--primary-color)', pointerEvents: payment.paidAmount <= 0 || payment.transferred ? 'none' : 'auto', opacity: payment.paidAmount <= 0 || payment.transferred ? 0.5 : 1 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                      </svg>
                      <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Transfer Zakat</p>
                    </div>
                  </div>
                })}
              </div>
            </Tab>
            <Tab eventKey="not" title="Not Transferred">
              <div className="claimants-box">

                {paymentsFiltered && paymentsFiltered.filter((payment) => !payment.transferred).map((payment, index) => {

                  return <div key={index} className="claimant-card mb-3">
                    <div className="d-flex">
                      <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Payment</p>
                      </div>
                      {payment.transferred && <div className="claimant-mahallu ms-auto text-success bg-success-subtle d-flex align-items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>Transfered</p>
                      </div>}
                      {!payment.transferred && <div className="claimant-mahallu ms-auto d-flex align-items-center text-danger bg-danger-subtle mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>Not-Transfered</p>
                      </div>}
                    </div>
                    <h2 className='mb-1' style={{
                      fontSize: "20px",
                    }}><span className='fs-6 fw-regular'>From: </span> {payment.donorName}</h2>
                    <p className='mb-1 text-muted opacity-75'>@{payment.donorUpiId}</p>
                    <h2 className='mb-1' style={{
                      fontSize: "16px",
                    }}>Amount: <span className='fs-5 fw-regular' style={{ color: 'var(--primary-color)' }}>{payment.paidAmount}</span></h2>

                    <p className='mb-1 text-muted opacity-75' style={{ fontSize: '14px' }} >
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                      </svg> {timeAgo(payment.timestamp)}
                    </p>
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center w-100 text-center mt-2" onClick={() => handleVakeelPayment(payment.id)} style={{ backgroundColor: 'var(--primary-color)', pointerEvents: payment.paidAmount <= 0 || payment.transferred ? 'none' : 'auto', opacity: payment.paidAmount <= 0 || payment.transferred ? 0.5 : 1 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                      </svg>
                      <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Transfer Zakat</p>
                    </div>
                  </div>
                })}
              </div>
            </Tab>
            <Tab eventKey="done" title="Transferred">
              <div className="claimants-box">

                {paymentsFiltered && paymentsFiltered.filter((payment) => payment.transferred).map((payment, index) => {

                  return <div key={index} className="claimant-card mb-3">
                    <div className="d-flex">
                      <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Payment</p>
                      </div>
                      {payment.transferred && <div className="claimant-mahallu ms-auto text-success bg-success-subtle d-flex align-items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>Transfered</p>
                      </div>}
                      {!payment.transferred && <div className="claimant-mahallu ms-auto d-flex align-items-center text-danger bg-danger-subtle mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>Not-Transfered</p>
                      </div>}
                    </div>
                    <h2 className='mb-1' style={{
                      fontSize: "20px",
                    }}><span className='fs-6 fw-regular'>From: </span> {payment.donorName}</h2>
                    <p className='mb-1 text-muted opacity-75'>@{payment.donorUpiId}</p>
                    <h2 className='mb-1' style={{
                      fontSize: "16px",
                    }}>Amount: <span className='fs-5 fw-regular' style={{ color: 'var(--primary-color)' }}>{payment.paidAmount}</span></h2>

                    <p className='mb-1 text-muted opacity-75' style={{ fontSize: '14px' }} >
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                      </svg> {timeAgo(payment.timestamp)}
                    </p>
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center w-100 text-center mt-2" onClick={() => handleVakeelPayment(payment.id)} style={{ backgroundColor: 'var(--primary-color)', pointerEvents: payment.paidAmount <= 0 || payment.transferred ? 'none' : 'auto', opacity: payment.paidAmount <= 0 || payment.transferred ? 0.5 : 1 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                      </svg>
                      <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Transfer Zakat</p>
                    </div>
                  </div>
                })}
              </div>
            </Tab>

          </Tabs>
          <div className="vakeel-dash-body-box">

          </div>
          <div className="vakeel-dash-body-box">

          </div>
        </div>
      </div>
    </div>
  )
}

export default VakeelDashboard