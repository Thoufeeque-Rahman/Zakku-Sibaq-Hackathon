import { getAuth, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import './MahalDashboard.css'
import { Col, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap';
import ZakathTrackerContainer from '../../../Components/ZakathTrackerContainer/ZakathTrackerContainer';
import ClaimantCard from '../../../Components/ClaimantCard/ClaimantCard';
import { useNavigate } from 'react-router-dom';

function MahalDashboard() {
    const auth = getAuth()
    const user = auth.currentUser
    const db = getFirestore()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        mahal: '',
        userMode: ''
    });
    const [userState, setUserState] = useState(() => user ? user : null);
    const navigate = useNavigate();

    const [claimants, setClaimants] = useState([])
    const [donors, setDonors] = useState([])
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                setFormData((prevData) => ({
                    ...prevData,
                    name: user.displayName,
                    email: user.email
                }));

                const docRef = doc(db, "mahals", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData((prevData) => ({
                        ...prevData,
                        phone: docSnap.data().phone,
                        mahal: docSnap.data().mahal,
                        userMode: docSnap.data().userMode
                    }));
                    if (!docSnap.data().userMode.includes('Mahal')) {
                        alert('You are not authorized to access this page');
                        navigate('/getStarted');
                    }
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

        const fetchClaimantData = async () => {
            const querySnapshot = await getDocs(collection(db, "Claimant"));
            const claimantsData = [];
            querySnapshot.forEach((doc) => {
                const username = doc.data().name.toLowerCase().replace(/\s+/g, '');
                claimantsData.push({ ...doc.data(), username, id: doc.id });
                console.log(doc.id, " => ", doc.data());
            });
            console.log(claimantsData);
            setClaimants(claimantsData);
        }

        const fetchDonorsData = async () => {
            const querySnapshot = await getDocs(collection(db, "Donors"));
            const donorsData = [];
            querySnapshot.forEach((doc) => {
                const username = doc.data().name.toLowerCase().replace(/\s+/g, '');
                donorsData.push({ ...doc.data(), username, id: doc.id });
                console.log(doc.id, " => ", doc.data());
            });
            console.log(donorsData);
            setDonors(donorsData);
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


        fetchUserData();
        fetchClaimantData();
        fetchDonorsData();
        fetchPaymentsData();
    }, [user]);

    const handleSignout = () => {
        if (!userState) {
            console.log("No user signed in");
            alert("No user signed in");
            navigate('/getStarted')
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






    const claimantsOwnMahalFilterAll = claimants.filter(claimant => claimant.mahal === formData.mahal)
    const claimantsOwnMahalFilterApproved = claimants.filter(claimant => claimant.mahal === formData.mahal && claimant.status === 'approved')
    const claimantsOwnMahalFilterRejected = claimants.filter(claimant => claimant.mahal === formData.mahal && claimant.status === 'rejected')
    const claimantsOwnMahalFilterPending = claimants.filter(claimant => claimant.mahal === formData.mahal && claimant.status === 'pending')

    const donorsOwnMahalFilterAll = donors.filter(claimant => claimant.mahal === formData.mahal)

    const paymentsOwnMahalFilterAll = payments.filter(payment => payment.claimantMahal === formData.mahal)



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

    return (
        <div className="container-box pb-5">
            <div className="mahal-dash-box">
                <div className="header">
                    <div className="header-text d-flex justify-content-between">
                        <div>
                            <p>Assalamu Alaikum, Welcome MAHAL!</p>
                            {user ? <h1>{formData.mahal}</h1> : <div className='mb-2' style={{ height: '35px', width: '300px', backgroundColor: '#ffffff82', borderRadius: '12px' }}></div>}
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
                    <div className="user-mahallu d-flex align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                        </svg>
                        <p style={{ fontSize: '18px' }} className='ms-1 me-2'>{formData.name}</p>
                    </div>
                </div>
                <div className="mahal-dash-body">
                    <Tabs defaultActiveKey="claimants" id="claimant-donor-tabs" className="mb-3">
                        <Tab eventKey="claimants" title="Claimants" className='hi'>
                            <div className="zakath-tracker-container" style={{ marginTop: '24px' }}>
                                <div className="zakath-tracker-indic">
                                    <div className="zakath-tracker-head">
                                        <div className="zakath-tracker-head-content d-flex justify-content-between">
                                            <div>
                                                <p className='fw-bold' style={{ color: '#309A84' }}>Claimants Approval</p>
                                            </div>
                                            <div>
                                                <p className='fw-bold'><span style={{ color: '#309A84' }}>{claimantsOwnMahalFilterApproved.length}/</span>{claimantsOwnMahalFilterAll.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="zakath-tracker-body">
                                        <div className="zakath-tracker-body-content">
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col className='d-flex justify-content-between' style={{ fontSize: '12px' }}>
                                                            <p className='fw-medium mb-1 text-warning-emphasis'>Pending</p>
                                                            <p className='fw-medium mb-1 text-success'>Approved</p>
                                                            <p className='fw-medium mb-1 text-danger'>Rejected</p>
                                                        </Col>
                                                    </Row>
                                                    <ProgressBar style={{ height: '20px' }}>
                                                        <ProgressBar className='text-warning-emphasis' variant="warning" now={claimantsOwnMahalFilterPending.length / claimantsOwnMahalFilterAll.length * 100} label={
                                                            claimantsOwnMahalFilterPending.length === 0 ? '0%' : claimantsOwnMahalFilterPending.length === claimantsOwnMahalFilterAll.length ? '100%' : (claimantsOwnMahalFilterPending.length / claimantsOwnMahalFilterAll.length * 100).toFixed(1) + '%'
                                                        } key={2} />
                                                        <ProgressBar now={claimantsOwnMahalFilterApproved.length / claimantsOwnMahalFilterAll.length * 100} label={
                                                            claimantsOwnMahalFilterApproved.length === 0 ? '0%' : claimantsOwnMahalFilterApproved.length === claimantsOwnMahalFilterAll.length ? '100%' : (claimantsOwnMahalFilterApproved.length / claimantsOwnMahalFilterAll.length * 100).toFixed(1) + '%'
                                                        } key={1} />
                                                        <ProgressBar variant="danger" now={claimantsOwnMahalFilterRejected.length / claimantsOwnMahalFilterAll.length * 100} label={
                                                            claimantsOwnMahalFilterRejected.length === 0 ? '0%' : claimantsOwnMahalFilterRejected.length === claimantsOwnMahalFilterAll.length ? '100%' : (claimantsOwnMahalFilterRejected.length / claimantsOwnMahalFilterAll.length * 100).toFixed(1) + '%'
                                                        } key={3} />
                                                    </ProgressBar>
                                                </Col>
                                            </Row>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3 mt-4">
                                <Tab eventKey="all" title="All">
                                    <div className="daily-box px-2 mt-4">
                                        <div className="claimants-box">
                                            {claimantsOwnMahalFilterAll.sort((a,b)=> b.timestamp - a.timestamp).map((claimant, index) => {
                                                return <ClaimantCard key={index} claimant={claimant} mahalRP={true} setClaimants={setClaimants} claimants={claimants} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="pending" title="Pending">
                                    <div className="daily-box px-2 mt-4">
                                        <div className="claimants-box">
                                            {claimantsOwnMahalFilterPending.map((claimant, index) => {
                                                return <ClaimantCard key={index} claimant={claimant} mahalRP={true} setClaimants={setClaimants} claimants={claimants} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="approved" title="Approved">
                                    <div className="daily-box px-2 mt-4">
                                        <div className="claimants-box">
                                            {claimantsOwnMahalFilterApproved.map((claimant, index) => {
                                                return <ClaimantCard key={index} claimant={claimant} mahalRP={true} setClaimants={setClaimants} claimants={claimants} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="rejected" title="Rejected">
                                    <div className="daily-box px-2 mt-4">
                                        <div className="claimants-box">
                                            {claimantsOwnMahalFilterRejected.map((claimant, index) => {
                                                return <ClaimantCard key={index} claimant={claimant} mahalRP={true} setClaimants={setClaimants} claimants={claimants} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="Donors" title="Donors">
                            <div className="claimants-box">

                                {donorsOwnMahalFilterAll.map((donor, index) => {

                                    return <div className="claimant-card mb-3">
                                        <div className="d-flex">
                                            <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                                                <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Donor</p>
                                            </div>
                                            <div className="claimant-mahallu ms-auto d-flex align-items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                                                </svg>
                                                <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>{donor.mahal}</p>
                                            </div>
                                        </div>
                                        <h2 className='mb-1' style={{
                                            fontSize: "20px",
                                        }}>{donor.anonymous ? 'Anonymous' : donor.name}</h2>
                                        <p className='mb-1 text-muted opacity-75'>@{donor.anonymous ? 'anonymous' : donor.username}</p>

                                        <p className='mb-1 text-muted opacity-75' style={{ fontSize: '14px' }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                                            </svg> {timeAgo(donor.timestamp)}
                                        </p>
                                    </div>
                                })}
                            </div>
                        </Tab>
                        <Tab eventKey="payments" title="Payments">
                            <div className="claimants-box">

                                {paymentsOwnMahalFilterAll.map((payment, index) => {

                                    return <div key={index} className="claimant-card mb-3">
                                        <div className="d-flex">
                                            <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                                                <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Payment</p>
                                            </div>
                                            <div className="claimant-mahallu ms-auto d-flex align-items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                                                </svg>
                                                <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>{payment.claimantMahal}</p>
                                            </div>
                                        </div>
                                        <h2 className='mb-1' style={{
                                            fontSize: "20px",
                                        }}><span className='fs-6 fw-regular'>To: </span> {payment.claimantName}</h2>
                                        <p className='mb-1 text-muted opacity-75'>@{payment.claimantUpiId}</p>
                                        <h2 className='mb-1' style={{
                                            fontSize: "16px",
                                        }}>Amount: <span className='fs-5 fw-regular' style={{ color: 'var(--primary-color)' }}>{payment.paidAmount}</span></h2>

                                        <p className='mb-1 text-muted opacity-75' style={{ fontSize: '14px' }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                                            </svg> {timeAgo(payment.timestamp)}
                                        </p>
                                    </div>
                                })}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default MahalDashboard