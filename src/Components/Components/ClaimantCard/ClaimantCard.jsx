import React, { useEffect, useState } from 'react'
import './ClaimantCard.css'
import { useNavigate } from 'react-router-dom'
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Button, Modal } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


function ClaimantCard({ claimant, vakeel, number, mahalRP, setClaimants }) {
    const navigate = useNavigate()
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    const [userMode, setUserMode] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserMode(docSnap.data().userMode);
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

        if (claimant.amountAllotted - claimant.paidAmount === 0) {
            handlePending();
        }

        fetchUserData();
    }, [user.uid]);


    const handleApprove = async () => {
        if (setClaimants && claimant.amountAllotted) {
            setClaimants(prevClaimants => prevClaimants.map(c =>
                c.id === claimant.id ? { ...c, status: 'approved' } : c
            ));
            const approvedRef = doc(db, "Claimant", claimant.id);

            // Set the "capital" field of the city 'DC'
            await updateDoc(approvedRef, {
                status: 'approved'
            });

            const claimantRef = doc(db, "users", claimant.id);

            // Set the "capital" field of the city 'DC'
            await updateDoc(claimantRef, {
                userMode: arrayUnion("Claimant")
            });
        }

        handleClose()

    };

    const handleReject = async () => {
        if (setClaimants && claimant.amountAllotted) {
            setClaimants(prevClaimants => prevClaimants.map(c =>
                c.id === claimant.id ? { ...c, status: 'rejected' } : c
            ));
            const rejectedRef = doc(db, "Claimant", claimant.id);

            // Set the "capital" field of the city 'DC'
            await updateDoc(rejectedRef, {
                status: 'rejected'
            });

            await updateDoc(doc(db, 'users', claimant.id), {
                userMode: arrayRemove("Claimant")
            });
        }
        handleClose()

    };

    const handlePending = async () => {
        if (setClaimants && claimant.amountAllotted) {
            setClaimants(prevClaimants => prevClaimants.map(c =>
                c.id === claimant.id ? { ...c, status: 'pending' } : c
            ));
            const pendingRef = doc(db, "Claimant", claimant.id);

            // Set the "capital" field of the city 'DC'
            await updateDoc(pendingRef, {
                status: 'pending'
            });

            await updateDoc(doc(db, 'users', claimant.id), {
                userMode: arrayRemove("Claimant")
            });
        }
        handleClose()

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

    const [show, setShow] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleImageClick = (imageUrl) => {
        setFullScreenImage(imageUrl);
        setShow(true);
    };

    const handleReview = () => {
        setShow(true);
    }

    const handleAmount = (e) => {
        setClaimants(prevClaimants => prevClaimants.map(c =>
            c.id === claimant.id ? { ...c, amountAllotted: e.target.value } : c
        ));
        const amountRef = doc(db, "Claimant", claimant.id);

        // Set the "capital" field of the city 'DC'
        updateDoc(amountRef, {
            amountAllotted: e.target.value
        });
    }

    const [showDonateModal, setShowDonateModal] = useState(false);
    const amountPayable = claimant.amount - claimant.paidAmount;
    const [paymentDetails, setPaymentDetails] = useState({
        transactionId: '',
        paidAmount: amountPayable,
        screenshot: null,
    });


    const handlePayment = () => {
        // alert('Please fill the Form after payment');
        // const upiLink = claimant.upiUrl;
        // window.location.href = upiLink;
        // setShowDonateModal(true);
        navigate(`/general/donor/zakat-payment-gateway/${claimant.id}`);
    };

    const handleVakeelPayment = () => {
        // alert('Please fill the Form after payment');
        // const upiLink = claimant.upiUrl;
        // window.location.href = upiLink;
        // setShowDonateModal(true);
        navigate(`/general/donor/zakat-payment-gateway/d2v/${claimant.id}`);
    };

    const handlePaymentDetailsChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            screenshot: file,
        }));
    };

    const handleDonateSubmit = async (event) => {
        event.preventDefault();
        console.log('handleDonateSubmit called');
        const storage = getStorage();
        const db = getFirestore();

        let fileURL = null;

        if (paymentDetails.screenshot) {
            console.log('Uploading screenshot...');
            const storageRef = ref(storage, `screenshots/${paymentDetails.screenshot.name}`);
            await uploadBytes(storageRef, paymentDetails.screenshot);
            fileURL = await getDownloadURL(storageRef);
            console.log('Screenshot uploaded:', fileURL);
        }

        const docRef = doc(db, 'payments', uuidv4());
        await setDoc(docRef, {
            claimantId: claimant.id,
            donorId: user.uid,
            transactionId: paymentDetails.transactionId,
            screenshot: fileURL,
            paidAmount: paymentDetails.paidAmount,
            type: "D2C",
            timestamp: new Date()
        });

        console.log('Payment details saved to Firestore');


        const claimantDoc = await getDoc(doc(db, 'Claimant', claimant.id));
        if (claimantDoc.exists()) {
            const currentAmount = claimantDoc.data().paidAmount || 0;
            await updateDoc(doc(db, 'Claimant', claimant.id), {
                paidAmount: parseFloat(currentAmount) + parseFloat(paymentDetails.paidAmount)
            });
            console.log('Claimant document updated');
        }

        const paymentData = {
            donorId: user.uid,
            claimantId: claimant.id,
            claimantMahal: claimant.mahal,
            transactionId: paymentDetails.transactionId,
            screenshot: fileURL,
            paidAmount: paymentDetails.paidAmount,
            timestamp: new Date()
        };

        await updateDoc(doc(db, 'Claimant', claimant.id), {
            payments: arrayUnion(paymentData)
        });

        await updateDoc(doc(db, 'Donors', user.uid), {
            payments: arrayUnion(paymentData)
        });

        console.log('Payment data added to Claimant and Donors collections');

        setPaymentDetails({
            transactionId: '',
            screenshot: null,
            paidAmount: '',
        });

        alert('Payment details submitted successfully!');
        setShowDonateModal(false);
    };

    return (
        <div className="claimant-card mb-3">
            <div className="d-flex gap-2">
                {claimant.amountRequested &&
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Claimant</p>
                    </div>
                }
                {!claimant.amountRequested && claimant.userMode && claimant.userMode.includes('Donor') &&
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Donor</p>
                    </div>
                }
                {claimant.userMode && claimant.userMode.includes('Vakeel') &&
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center text-center mb-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <p style={{ fontSize: '12px' }} className='mb-0 fw-medium'>Vakeel</p>
                    </div>
                }
                {!vakeel && !mahalRP && <div className="claimant-mahallu d-flex mb-2 align-items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                    </svg>
                    <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>{claimant.mahal}</p>
                </div>}
                {claimant.category &&
                    <div className="claimant-mahallu d-flex mb-2 align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-category">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4h6v6h-6z" />
                            <path d="M14 4h6v6h-6z" />
                            <path d="M4 14h6v6h-6z" />
                            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0'>{claimant.category}</p>
                    </div>
                }
                {
                    claimant.status === 'approved' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="var(--primary-color)" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check ms-auto">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                    </svg>
                }
                {
                    claimant.status === 'pending' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="#ffc107" className="icon icon-tabler icons-tabler-filled icon-tabler-clock ms-auto">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                    </svg>
                }
                {
                    claimant.status === 'rejected' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="#dc3545" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x ms-auto">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                    </svg>
                }
            </div>
            <h2 className='mb-1' style={{
                fontSize: "20px",
            }}>{claimant.name ? claimant.name : claimant.fullName}</h2>
            <p className='mb-1 text-muted opacity-75'>@{claimant.username}</p>
            {mahalRP && <p className='mb-1 text-muted opacity-75' style={{ fontSize: '14px' }} >
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                </svg> {timeAgo(claimant.timestamp)}
            </p>}

            {
                mahalRP &&
                <a className='text-decoration-none' href={'tel:' + claimant.phone}>
                    <div className="claimant-mahallu d-flex align-items-center justify-content-center w-100 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Call Now (+91 {claimant.phone})</p>
                    </div>
                </a>
            }

            {
                mahalRP &&
                <div className="claimant-mahallu bg-primary-subtle text-primary d-flex align-items-center justify-content-center w-100 text-center mt-2" onClick={handleReview}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                    <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Review Application</p>
                </div>
            }

            {
                userMode.includes('Donor') && !vakeel &&
                <>
                    {/* <div className="claimant-mahallu d-flex align-items-center justify-content-center w-100 text-center mt-2" style={{ backgroundColor: 'var(--primary-color)' }}> */}
                    <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium '>Amount Payable: <span className='fw-semibold' style={{ color: 'var(--primary-color)' }}>₹{claimant.amountAllotted - claimant.paidAmount}</span></p>
                    {/* /* </div> */}
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center w-100 text-center mt-4" onClick={handlePayment} style={{ backgroundColor: 'var(--primary-color)', pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                            <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Donate Now</p>
                    </div>
                </>
            }

            {vakeel &&
                <>
                    <div className='d-flex gap-2 mt-4'>
                        <a className='text-decoration-none' target='_blank' href={'tel:' + claimant.phone}>
                            <div className="claimant-mahallu d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                </svg>
                                <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Call Now</p>
                            </div>
                        </a>
                        <a className='text-decoration-none ms-auto' target='_blank' href={'https://wa.me/' + claimant.whatsapp}>
                            <div className="claimant-mahallu d-flex align-items-center ms-auto" style={{ background: '#2734431c', color: '#1ebea5' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                </svg>
                                <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Chat with Vakeel</p>
                            </div>
                        </a>
                    </div>
                    <div className="claimant-mahallu text-white d-flex align-items-center justify-content-center w-100 text-center mt-2" onClick={handleVakeelPayment} style={{ backgroundColor: 'var(--primary-color)', pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                            <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                        </svg>
                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Transfer Zakat</p>
                    </div>
                </>
            }

            <Modal show={show} onHide={handleClose} centered>

                <Modal.Body className='p-4'>
                    <h2 className='mb-1' style={{
                        fontSize: "20px",
                    }}>{claimant.name}</h2>
                    <p className='mb-1 text-muted opacity-75'>@{claimant.username}</p>
                    <p className='mb-1 text-muted opacity-75'>Mahal: {claimant.mahal}</p>
                    <p className='mb-1 text-muted opacity-75'>Phone: {claimant.phone}</p>
                    <p className='mb-1 text-muted opacity-75'>Email: {claimant.email}</p>
                    <p className='mb-1 text-muted opacity-75 text-break'>UPI ID: {claimant.upiId}</p>

                    {claimant.amountRequested &&
                        <>
                            <p className='mb-1 opacity-75 fs-5 fw-bold text-dark'>Zakath Requested: {claimant.amountRequested}</p>
                            <p className='mb-1 opacity-75 fs-5 fw-bold text-dark'>Amount Allotted: {claimant.amountAllotted}</p>
                            <div className="amount-group">
                                <label for="amount" className='fs-6 fw-regular mb-0 text-muted'>Amount Allotted</label>
                                <div className="input-group mb-3 p-0 border-0 d-flex">
                                    <span className="input-group-text" style={{ height: '45px' }}>₹</span>
                                    <input name='amountAllotted' id='amountAllotted' type="text" value={claimant.amountAllotted} onChange={handleAmount} placeholder='Amount needed to Full fill needs' className="form-control" aria-label="Amount (to the nearest dollar)" style={{
                                        borderRadius: '0.25rem',
                                        borderTopRightRadius: '15px',
                                        borderBottomRightRadius: '15px',
                                        borderTopLeftRadius: '0',
                                        borderBottomLeftRadius: '0',
                                        fontSize: '16px',
                                        height: '45px',

                                    }} />
                                </div>
                            </div>
                            <p className='mb-1 opacity-75 fs-5 fw-bold text-success'>Amount Paid: {claimant.paidAmount}</p>
                            <p className='mb-1 opacity-75 fs-5 fw-bold text-primary'>Amount Payable: {claimant.amountAllotted - claimant.paidAmount}</p>
                        </>
                    }
                    {/* <p className='mb-1 text-muted opacity-75'>Timestamp: {timeAgo(claimant.timestamp)}</p> */}
                    {claimant.fileURLs && (
                        <div className="file-preview mt-3">
                            {claimant.fileURLs.map((preview, index) => (
                                <img
                                    className='mb-2 me-2'
                                    key={index}
                                    src={preview}
                                    alt={`File Preview ${index}`}
                                    style={{ maxWidth: '100%', height: '100px', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(preview)}
                                />
                            ))}
                        </div>
                    )}
                    {
                        mahalRP && claimant.status === 'pending' ?
                            <div className='d-flex gap-2 px-3 mt-3' >
                                <div className="claimant-mahallu bg-success text-white w-100 text-center" onClick={handleApprove} style={{ pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                                    <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Approve</p>
                                </div>
                                <div className="claimant-mahallu bg-danger text-white w-100 text-center" onClick={handleReject} style={{ pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                                    <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Reject</p>
                                </div>
                            </div>
                            :
                            mahalRP && claimant.status === 'approved' ?
                                <div className='d-flex gap-2 px-3 mt-3'>
                                    <div className="claimant-mahallu bg-danger text-white w-100 text-center" onClick={handleReject} style={{ pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Reject</p>
                                    </div>
                                    <div className="claimant-mahallu bg-warning text-white w-100 text-center" onClick={handlePending} style={{ pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                                        <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Pending</p>
                                    </div>
                                </div>
                                :
                                mahalRP && claimant.status === 'rejected' ?
                                    <div className='d-flex gap-2 px-3 mt-3'>
                                        <div className="claimant-mahallu bg-success text-white w-100 text-center" onClick={handleApprove} style={{ pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                                            <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Approve</p>
                                        </div>
                                        <div className="claimant-mahallu bg-warning text-white w-100 text-center" onClick={handlePending} style={{ pointerEvents: claimant.amountAllotted <= 0 ? 'none' : 'auto', opacity: claimant.amountAllotted <= 0 ? 0.5 : 1 }}>
                                            <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Pending</p>
                                        </div>
                                    </div>
                                    : null
                    }
                </Modal.Body>
            </Modal>
            <Modal show={showDonateModal} onHide={() => setShowDonateModal(false)} centered>
                <Modal.Body className='p-4'>
                    <form onSubmit={handleDonateSubmit}>
                        <h2 className='mb-3' style={{ color: 'var(--primary-color)' }}>Payment Details</h2>
                        <p className='mb-3 text-muted opacity-75'>Please fill the form after payment</p>

                        <p className='text-danger'>USER ID: {claimant.id}</p>

                        <div className="mb-3 form-group w-100 gap-0">
                            <label htmlFor="paidAmount" className="form-label">Paid Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                id="paidAmount"
                                name="paidAmount"
                                required
                                value={paymentDetails.paidAmount}
                                onChange={handlePaymentDetailsChange}
                            />
                        </div>
                        <div className="mb-3 form-group w-100 gap-0">
                            <label htmlFor="screenshot" className="form-label">Screenshot</label>
                            <input
                                type="file"
                                className="form-control py-2"
                                id="screenshot"
                                name="screenshot"
                                required
                                onChange={handleScreenshotChange}
                            />
                        </div>
                        <button type="submit" className="btn submit-btn w-100">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
            {fullScreenImage && (
                <Modal show={true} onHide={() => setFullScreenImage(null)} centered>
                    <Modal.Body>
                        <img src={fullScreenImage} alt="Full Screen" style={{ width: '100%' }} />
                    </Modal.Body>
                </Modal>
            )}


        </div>
    )
}

export default ClaimantCard