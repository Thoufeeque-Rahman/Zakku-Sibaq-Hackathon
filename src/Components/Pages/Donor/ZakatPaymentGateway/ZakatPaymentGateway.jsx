import React, { useEffect, useRef, useState } from 'react'
import './ZakatPaymentGateway.css'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import BackgroundLetterAvatars from '../../../Components/Avatar/Avatar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';


// function PaymentProcessingModal({ show, handleClose }) {

function PaymentProcessingModal({ show, setShow, setFullscreen, handleClose, handleShowDoneModal, paymentStatus }) {
    const [isProcessing, setIsProcessing] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); 
        if (show) {
            const timer = setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(true);
            }, 4000);
            return () => clearTimeout(timer);
        }

    }, [show]);


    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <div className="payment-status" style={{}}>
            <Modal id="paymentProcessingModal" show={show} onHide={() => {
                handleClose();
                setIsProcessing(true);
            }} className=''>
                <Modal.Body className="text-center">
                    {isProcessing ? (
                        <>
                            <p className='fs-4 fw-semibold mb-0' style={{ color: 'var(--text-color)' }}>Processing your payment</p>
                            <p className='fs-6 fw-regular text-muted mb-0'>This will only take a few seconds.</p>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                <DotLottieReact
                                    src="https://lottie.host/de2c53ec-b478-4ea8-838c-19f89f2ad12b/c7mrmMfMb3.lottie"
                                    loop
                                    autoplay
                                />
                            </div>
                            <Button variant="danger" onClick={() => {
                                handleClose();
                                setIsProcessing(true);
                            }} className="mt-3 w-75" style={{
                                borderRadius: '30px',
                                backgroundColor: '#dc3545',
                                border: '1px solid #dc3545',
                            }}>
                                Cancel Payment
                            </Button>
                        </>
                    ) : (

                        <>
                            <p className='fs-4 fw-semibold mb-0' style={{ color: 'var(--text-color)' }}>Payment Successful</p>
                            <p className='fs-6 fw-regular text-muted mb-0'>Thank you for your payment.</p>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                <DotLottieReact
                                    src="https://lottie.host/64f425c5-edfe-44a7-bc12-421b36c2e475/ifN0oqjpac.lottie"
                                    autoplay
                                />
                            </div>
                            <Button variant="success" onClick={() => {
                                handleClose();
                                handleShow()
                                setIsProcessing(true);
                            }} className="mt-3 w-75" style={{
                                borderRadius: '30px',
                                backgroundColor: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                            }}>
                                Next
                            </Button>
                        </>
                    )
                    }

                </Modal.Body>
            </Modal>
        </div>
    );
}

function PaymentDoneModal({ show, handleClose, amount, claimantData, paymentData }) {

    // console.log(claimantData);
    // console.log(paymentData);

    function takeScreenshot() {
        const screenshotElement = document.getElementById('screenshot');
        if (!screenshotElement) {
            console.error("Element with ID 'screenshot' not found");
            return;
        }

        html2canvas(screenshotElement).then(function (canvas) {
            // Create an image from the canvas
            var img = canvas.toDataURL("image/png");
            // Create a link element
            var link = document.createElement('a');
            link.href = img;
            link.download = 'screenshot.png';
            // Append the link to the body
            document.body.appendChild(link);
            // Trigger the download
            link.click();
            // Remove the link from the document
            document.body.removeChild(link);
        }).catch(function (error) {
            console.error("Error taking screenshot:", error);
        });
    }
    return (
        <div className="payment-done">
            <Modal show={show} fullscreen={true} onHide={handleClose} className='' style={{
                height: '100vh',
            }}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body id='screenshot' className="text-center">
                    <div className='w-100 mt-5'>
                        <div className="receiver-details text-center">
                            <BackgroundLetterAvatars name={paymentData.claimantName ? paymentData.claimantName : paymentData.vakeelName} /> {/* Avatar */}
                            <p className='mb-0 fw-medium'>To {paymentData.claimantName ? paymentData.claimantName : paymentData.vakeelName}</p>
                            <p className='text-muted' style={{ fontSize: '14px' }}>{paymentData.claimantUpiId ? paymentData.claimantUpiId : paymentData.vakeelUpiId}</p>
                            <p className='text-muted' style={{ fontSize: '25px' }}>(Demonstration only)</p>
                        </div>
                        <div className="payment-amount mt-5 pt-5">
                            <Form.Group className="mb-5 d-flex justify-content-center" controlId="formBasicEmail">
                                <Form.Label className='fw-medium fs-3 my-auto'>₹</Form.Label>
                                <div
                                    className='form-control fw-bold'
                                    value={amount}
                                    inputMode='number'
                                    style={{
                                        fontSize: '50px',
                                        fontWeight: '500',
                                        background: 'var(--light-bg)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '4px',
                                        color: 'var(--primary-color)',
                                        outline: 'none',
                                        boxShadow: 'none',
                                        width: 'min-content',
                                    }}
                                >
                                    {paymentData.paidAmount}
                                </div>
                            </Form.Group>
                            <p className='pb-1 mb-1 border-bottom w-75 mx-auto'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={20} viewBox="0 0 24 24" fill="var(--primary-color)" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check ms-auto">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                </svg> <span className='mt-1'>Completed</span>
                            </p>
                            <p className='text-muted' style={{ fontSize: '14px' }}>{new Date(paymentData.timestamp).toLocaleString()}</p>
                            <div className="payment-details-card text-start col-sm-12 col-md-4 mx-auto">
                                <div className="upiTransId mb-2">
                                    <p className='fw-medium'>UPI Transaction ID</p>
                                    <p className='text-muted'>{paymentData.transactionId}</p>
                                </div>
                                <div className="payeeDetails mb-2">
                                    <p className='fw-medium'>To: {paymentData.claimantName ? paymentData.claimantName : paymentData.vakeelName}</p>
                                    <p className='text-muted'>{paymentData.claimantUpiId ? paymentData.claimantUpiId : paymentData.vakeelUpiId}</p>
                                </div>
                                <div className="payeeDetails mb-2">
                                    <p className='fw-medium'>From: {paymentData.donorName}</p>
                                    <p className='text-muted'>{paymentData.donorUpiId}</p>
                                </div>
                                <div className="googleTransId">
                                    <p className='fw-medium'>Zakku Transaction ID</p>
                                    <p className='text-muted'>{paymentData.ZKTransactionId}</p>
                                </div>
                            </div>
                            <button onClick={takeScreenshot} className='d-flex align-items-center mx-auto' style={{
                                borderRadius: '30px',
                                backgroundColor: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                color: 'var(--white)',
                                padding: '7px 15px',
                                fontSize: '14px',
                                fontWeight: '500',
                                boxShadow: 'none',
                                outline: 'none',
                                cursor: 'pointer',

                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-camera me-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                    <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                </svg> Save Screenshot</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

function ZakatPaymentGateway({ vakeel, v2c }) {

    const { claimantId } = useParams();
    const { vakeelId } = useParams();
    const { transactionId } = useParams();

    const auth = getAuth()
    const user = auth.currentUser;
    const db = getFirestore();

    const [claimantData, setClaimantData] = useState({});
    const [paymentData, setPaymentData] = useState({});
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        upiId: '',
        description: '',
        exclude: false,
    });

    const [donorData, setDonorData] = useState({});
    const [vakeelData, setVakeelData] = useState({});
    const [transactionData, setTransactionData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [dailyData, setDailyData] = useState([]);
    // const [firstTransaction, setFirstTransaction] = useState(new Date());


    const silverPrice = 50;
    const nisabAmount = 595 * silverPrice;


    useEffect(() => {
        window.scrollTo(0, 0); 
        if (user) {
            const fetchTransactions = async () => {
                try {
                    const docRef = doc(db, "Tracker", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setDailyData(data.dailyData || []);

                        // const firstTransaction = new Date(data.firstTransaction);
                        // setFirstTransaction(firstTransaction);

                        // console.log(firstTransaction);

                        // calculateMinimumBalance(data.dailyData, firstTransaction);
                    } else {
                        setError("No document found");
                    }
                } catch (error) {
                    setError(`Error fetching user data: ${error.message}`);
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchTransactions();
        }

        const fetchDonorData = async (uid) => {
            const docRef = doc(db, "Donors", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDonorData(docSnap.data());
            } else {
                console.log("No such Donor!");
            }
        };

        const fetchClaimantData = async (claimantId) => {
            if (!claimantId) {
                console.error("Claimant ID is undefined");
                return;
            }

            const docRef = doc(db, "Claimant", claimantId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setClaimantData({ ...docSnap.data(), id: claimantId });
            } else {
                console.log("No such Claimant!");
            }
        };

        const fetchVakeelData = async (vakeelId) => {
            if (!vakeelId) {
                console.error("Vakeel ID is undefined");
                return;
            }

            const docRef = doc(db, "vakeels", vakeelId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setVakeelData({ ...docSnap.data(), id: vakeelId });
            } else {
                console.log("No such Vakeel!");
            }
        };

        const fetchTransactionData = async (transactionId) => {
            if (!transactionId) {
                console.error("Transaction ID is undefined");
                return;
            }

            const docRef = doc(db, "payments", transactionId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('Transaction Payment Data: ', docSnap.data());
                setTransactionData({ ...docSnap.data(), id: transactionId });
                setAmount(docSnap.data().paidAmount)
            } else {
                console.log('No dataat');

            }
        };

        fetchDonorData(user.uid);
        if (!vakeel) {
            fetchClaimantData(claimantId);
        } else {
            fetchVakeelData(vakeelId);
        }
        fetchTransactionData(transactionId);

        if (v2c && !claimantData.name && !claimantData.upiId) {
            console.log('V2C Payment Gateway');
            setV2cShow(true);
        }
    }, [claimantId, vakeelId, transactionId, db]);

    const [showModal, setShowModal] = useState(false);
    const [showDoneModal, setShowDoneModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [v2cshow, setV2cShow] = useState(false);

    const [fullscreen, setFullscreen] = useState(true);

    const handleShowModal = () => {
        setShowModal(true);
        setConfirm(false);
        handleIncomeExpenseSubmit();
        paymentSubmit();
    };


    const totalIncome = dailyData.reduce((sum, day) => {
        return sum + (day.income?.reduce((daySum, income) => daySum + (parseFloat(income.amount) || 0), 0) || 0);
    }, 0);

    const totalExpenses = dailyData.reduce((sum, day) => {
        return sum + (day.expense?.reduce((daySum, expense) => daySum + (parseFloat(expense.amount) || 0), 0) || 0);
    }, 0);

    const total = totalIncome - totalExpenses;
    console.log(total);


    const handleIncomeExpenseSubmit = async (e) => {

        console.log(formData);

        try {
            const docRef = doc(db, "Tracker", user.uid);
            const docSnap = await getDoc(docRef);

            let updatedDailyData = [...dailyData];
            console.log(docSnap.data());


            if (docSnap.exists()) {
                const existingData = docSnap.data();
                let dailyData = existingData.dailyData || [];

                const dateEntry = dailyData.find(entry => entry.date === new Date().toISOString().split('T')[0]);
                console.log(dateEntry);

                if (dateEntry) {
                    dateEntry.expense.push({
                        amount: parseFloat(amount).toFixed(2),
                        balance: total - parseFloat(amount).toFixed(2),
                        description: 'Zakat Payment',
                        status: total + parseFloat(amount).toFixed(2) >= nisabAmount ? true : false,
                        timestamp: new Date().toISOString(),
                        type: 'expense',
                    });
                } else {
                    dailyData.push({
                        date: new Date().toISOString().split('T')[0],
                        income: [],
                        expense: [{
                            amount: parseFloat(amount).toFixed(2),
                            balance: total - parseFloat(amount).toFixed(2),
                            description: 'Zakat Payment',
                            status: total - parseFloat(amount).toFixed(2) >= nisabAmount ? true : false,
                            timestamp: new Date().toISOString(),
                            type: 'expense',
                        }]
                    });
                }

                const status = dailyData.every(day =>
                    (day.income || []).every(income => income.status) &&
                    (day.expense || []).every(expense => expense.status)
                );

                await updateDoc(docRef, {
                    balance: total - parseFloat(amount).toFixed(2),
                    dailyData: dailyData,
                    status: status,
                });

                updatedDailyData = dailyData;
            } else {
                const newDailyData = [{
                    date: new Date().toISOString().split('T')[0],
                    nisab: nisabAmount,
                    income: [],
                    expense: [{
                        amount: parseFloat(amount).toFixed(2),
                        balance: total - parseFloat(amount).toFixed(2),
                        status: total - parseFloat(amount).toFixed(2) >= nisabAmount ? true : false,
                        description: 'Zakat Payment',
                        timestamp: new Date().toISOString(),
                        type: 'expense',
                    }]
                }];

                const status = newDailyData.every(day =>
                    day.income.every(income => income.status) &&
                    day.expense.every(expense => expense.status)
                );

                newDailyData[0].status = status;

                console.log(newDailyData);


                await setDoc(docRef, {
                    balance: total - parseFloat(amount).toFixed(2),
                    firstTransaction: new Date().toISOString().split('T')[0],
                    dailyData: newDailyData,
                    zakatDueAmount: 0,
                });

                updatedDailyData = newDailyData;
            }

            const minBalance = Math.min(...dailyData.map(day => day.balance));
            console.log('min' + minBalance);
            setDailyData(updatedDailyData);

        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };

    const paymentSubmit = async () => {
        console.log('Payment Submitted');

        const transactionId = `${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const ZKTransactionId = `ZK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const newPaymentData = [];
        console.log(claimantData, vakeelData);

        if (claimantData.id) {
            console.log('Claimant payment data:', claimantData);

            newPaymentData.push({
                paidAmount: parseFloat(amount).toFixed(2),
                description: formData.description,
                exclude: formData.exclude,
                paymentType: 'd2c',
                claimantId: claimantId,
                claimantName: claimantData.name,
                claimantUpiId: claimantData.upiId,
                claimantMahal: claimantData.mahal,
                donorId: user.uid,
                donorName: user.displayName,
                donorUpiId: donorData.upiId,
                transactionId: transactionId,
                ZKTransactionId: ZKTransactionId,
                timestamp: new Date(),
                status: 'success'
            });
            setPaymentData(newPaymentData[0]);

            console.log(newPaymentData);
        } else if (vakeelData.id) {
            newPaymentData.push({
                paidAmount: parseFloat(amount).toFixed(2),
                description: formData.description,
                exclude: formData.exclude,
                paymentType: 'd2v',
                vakeelId: vakeelId,
                vakeelName: vakeelData.fullName,
                vakeelUpiId: vakeelData.phone,
                donorId: user.uid,
                donorName: user.displayName,
                donorUpiId: donorData.upiId,
                transactionId: transactionId,
                ZKTransactionId: ZKTransactionId,
                timestamp: new Date(),
                status: 'success'
            });
            setPaymentData(newPaymentData[0]);

            console.log('Vakeel payment data:', newPaymentData);

            console.log(newPaymentData);
        } else if (transactionData && transactionData.vakeelId) {
            console.log(transactionData);

            newPaymentData.push({
                paidAmount: parseFloat(amount).toFixed(2),
                description: formData.description,
                paymentType: 'v2c',
                vakeelId: transactionData.vakeelId,
                vakeelName: transactionData.vakeelName,
                vakeelUpiId: transactionData.vakeelUpiId,
                claimantName: claimantData.name,
                claimantUpiId: claimantData.upiId,
                transactionId: transactionId,
                ZKTransactionId: ZKTransactionId,
                timestamp: new Date(),
                status: 'success'
            });
            setPaymentData(newPaymentData[0]);

            console.log('Vakeel to Claimant payment data:', newPaymentData);
        }





        try {
            const docRef = doc(db, 'payments', uuidv4());
            await setDoc(docRef, newPaymentData[0]);
            console.log('Payment data added to database');
            setPaymentStatus(true);
        } catch (error) {
            console.error('Error adding payment data to database:', error);
            setPaymentStatus(false)
        }

        try {
            console.log('Updating claimant document', transactionData.donorId, transactionData.transactionId);

            if (claimantData.id && !vakeelData.id) {
                const claimantDoc = await getDoc(doc(db, 'Claimant', claimantId));
                if (claimantDoc.exists()) {
                    const currentAmount = claimantDoc.data().paidAmount || 0;
                    await updateDoc(doc(db, 'Claimant', claimantId), {
                        paidAmount: parseFloat(currentAmount) + parseFloat(amount),
                        payments: arrayUnion(newPaymentData[0])
                    });
                    console.log('Claimant document updated');
                }

                await updateDoc(doc(db, 'Donors', user.uid), {
                    payments: arrayUnion(newPaymentData[0])
                });
            } else if (vakeelData.id && !claimantData.id) {
                const vakeelDoc = await getDoc(doc(db, 'vakeels', vakeelId));

                if (vakeelDoc.exists()) {
                    await updateDoc(doc(db, 'vakeels', vakeelId), {
                        payments: arrayUnion(newPaymentData[0])
                    });
                    console.log('Vakeel document updated');
                }

                await updateDoc(doc(db, 'Donors', user.uid), {
                    payments: arrayUnion(newPaymentData[0])
                });
            } else if (transactionData) {
                const vakeelDoc = await getDoc(doc(db, 'vakeels', transactionData.vakeelId));

                if (vakeelDoc.exists()) {
                    await updateDoc(doc(db, 'vakeels', transactionData.vakeelId), {
                        payments: arrayUnion(newPaymentData[0])
                    });
                    console.log('Vakeel to claimant document updated');
                }

                // await updateDoc(doc(db, 'Donors', transactionData.donorId), {
                const donorDoc = await getDoc(doc(db, 'Donors', transactionData.donorId));
                if (donorDoc.exists()) {
                    const payments = donorDoc.data().payments || [];

                    const index = payments.findIndex((payment) => payment.transactionId === transactionData.transactionId);
                    payments[index].transferred = true;

                    await updateDoc(doc(db, 'Donors', transactionData.donorId), {
                        payments: payments
                    });
                    console.log('Donor document updated');
                }

                const paymentDoc = await getDoc(doc(db, 'payments', transactionData.id));
                if (paymentDoc.exists()) {
                    await updateDoc(doc(db, 'payments', transactionData.id), {
                        transferred: true
                    });
                    console.log('Payment document updated');
                }



            }

        } catch (error) {
            console.error('Error updating claimant document:', error);
        }



        console.log('Payment data added to Claimant and Donors collections');

        // alert('Payment details submitted successfully!');

    }

    const handleCloseModal = () => setShowModal(false);

    const handleShowDoneModal = () => setShowDoneModal(true);
    const handleClosDoneModal = () => {
        setShowDoneModal(false);
        navigate(-1);
    }

    const navigate = useNavigate();


    const handleChange = (e) => {
        if (e.target.innerText <= (claimantData.amountAllotted - claimantData.paidAmount)) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const startOffset = range.startOffset;

            setAmount(e.target.innerText)

            window.requestAnimationFrame(() => {
                const newRange = document.createRange();
                const newNode = range.startContainer;
                const newOffset = Math.min(startOffset, newNode.length);

                newRange.setStart(newNode, newOffset);
                newRange.setEnd(newNode, newOffset);
                selection.removeAllRanges();
                selection.addRange(newRange);
            });


        } else {
            alert('Amount is greater than amount payable')
            setAmount(0)
        }
    }

    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <div className="container-box vh-100 vw-100">
            <div className="payment-box">
                <div className="header">
                    <div className="header-text d-flex justify-content-start gap-2">
                        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <div>
                            <h5>Zakku Payment <br /> Gateway <span className='fs-6'>(Demo)</span></h5>
                        </div>
                    </div>
                </div>
                <Modal show={v2cshow} onHide={() => setV2cShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Claimant Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group gap-1 mb-3 w-100">
                            <label for="name" className='fs-6 mb-0'>Claimant Name</label>
                            <input
                                type="text"
                                value={claimantData.name}
                                onChange={(e) => setClaimantData({ ...claimantData, name: e.target.value })}
                                className="form-control"
                                id="name"
                                name='name'
                                required
                                placeholder='eg: Sheik Zakariya'
                            />
                        </div>
                        <div className="form-group gap-1 mb-3 w-100">
                            <label for="upiId" className='fs-6 mb-0'>Claimant UPI ID</label>
                            <input
                                type="text"
                                value={claimantData.upiId}
                                onChange={(e) => setClaimantData({ ...claimantData, upiId: e.target.value })}
                                className="form-control"
                                id="upiId"
                                name='upiId'
                                required
                                placeholder='eg: example@okaxis'
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setV2cShow(false)} disabled={claimantData.name && claimantData.upiId ? false : true} className='w-100 rounded-5' variant="success">Save changes</Button>
                    </Modal.Footer>
                </Modal>
                <div className="payment-body">
                    <div className="payment-card py-5 px-5 position-relative" style={{ height: '85vh' }}>
                        <Form className='w-100'>
                            <div className='w-100 mt-5'>
                                <div className="receiver-details text-center">
                                    <BackgroundLetterAvatars name={claimantData.name ? claimantData.name : vakeelData.fullName} /> {/* Avatar */}
                                    <p className='mb-0 mt-1 fw-medium'>To {claimantData.name ? claimantData.name : vakeelData.fullName + '(Vakeel)'}</p>
                                    <p className='text-muted mb-0' style={{ fontSize: '14px' }}>{claimantData.upiId ? claimantData.upiId : "+91 " + vakeelData.phone}</p>
                                    {(claimantData.amountAllotted - claimantData.paidAmount) > 0 && <p className='' style={{ fontSize: '11px' }}>Maximum payable: <span className='fw-medium' style={{ color: 'var(--primary-color)' }}>₹ {(claimantData.amountAllotted - claimantData.paidAmount).toFixed(2)}</span></p>}
                                </div>
                                <div className="payment-amount mt-5">
                                    <Form.Group className=" d-flex justify-content-center" controlId="formBasicEmail">
                                        <Form.Label className='fw-medium fs-3 my-auto'>₹</Form.Label>
                                        <input
                                            type="number"
                                            className='form-control fw-bold'
                                            value={amount <= 0 ? '' : amount}
                                            placeholder='0.00'
                                            readOnly={transactionId ? true : false}
                                            min={0}
                                            step='0.01'
                                            onChange={(e) => {

                                                setAmount(e.target.value)
                                                if (e.target.value > (claimantData.amountAllotted - claimantData.paidAmount)) {
                                                    alert('Amount is greater than amount payable')
                                                    setAmount(0)
                                                }
                                                
                                            }}
                                            onWheel={(e) => e.target.blur()}
                                            style={{
                                                fontSize: '50px',
                                                fontWeight: '500',
                                                background: 'var(--light-bg)',
                                                border: 'none',
                                                borderRadius: '10px',
                                                padding: '4px',
                                                color: 'var(--primary-color)',
                                                outline: 'none',
                                                boxShadow: 'none',
                                                width: `${amount.toString().length + 0.2}ch`,
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            className='mx-auto text-center payment-description'
                                            placeholder="Description (optional)"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            maxLength={20}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                background: '#f8f9fa',
                                                border: 'none',
                                                borderRadius: '10px',
                                                padding: '5px 5px',
                                                color: '#000',
                                                outline: 'none',
                                                boxShadow: 'none',
                                                width: '60%',
                                            }}
                                        />
                                    </Form.Group>
                                    {!v2c && <div className="form-group gap-1 mt-3 w-100">
                                        <div className="form-check d-flex gap-2 mx-auto align-items-center">
                                            <input
                                                className="form-check-input border border-secondary border-2 rounded-3"
                                                type="checkbox"
                                                value={formData.anonymous}
                                                onChange={(e) => setFormData({ ...formData, exclude: e.target.checked })}
                                                id="exclude"
                                                name="exclude"
                                                style={{ width: '5px', height: '5px', boxShadow: 'none', color: 'var(--primary-color)' }}
                                            />
                                            <label className="form-check-label text-secondary " htmlFor="anonymous">
                                                Exclude this from my Zakat due
                                            </label>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <Button variant="primary" type="button" className='mt-5 mb-5 w-75 position-absolute bottom-0 start-50 translate-middle-x' disabled={amount <= 0 ? true : false} style={{
                                borderRadius: '30px',
                                backgroundColor: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                            }} onClick={() => setConfirm(true)}>Pay ₹{(parseFloat(amount).toFixed(2))}</Button>
                        </Form> 
                        <Modal show={confirm} centered id="paymentModal" onHide={() => setConfirm(false)}>
                            <p>Are you sure to proceed with this transaction?</p>
                            <div className="d-flex gap-3">
                                <Button className='w-100' variant="danger" onClick={() => setConfirm(false)}>No</Button>
                                <Button className='w-100' onClick={handleShowModal}>Yes</Button>
                            </div>
                        </Modal>
                        <PaymentProcessingModal show={showModal} setShow={setShowDoneModal} setFullscreen={setFullscreen} handleClose={handleCloseModal} handleShowDoneModal={handleShowDoneModal} paymentStatus={paymentStatus} />
                        <PaymentDoneModal show={showDoneModal} fullscreen={fullscreen} setShow={setShowDoneModal} handleClose={handleClosDoneModal} amount={amount} claimantData={claimantData} paymentData={paymentData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ZakatPaymentGateway