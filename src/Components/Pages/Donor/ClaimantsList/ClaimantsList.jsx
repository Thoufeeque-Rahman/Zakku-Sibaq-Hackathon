import React, { useEffect, useState } from 'react'
import './ClaimantsList.css'
import ClaimantCard from '../../../Components/ClaimantCard/ClaimantCard'
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function ClaimantsList() {

    const [distriData, setDistriData] = useState('own-mahal');
    const [otherMahalData, setOtherMahalData] = useState('all');
    const [userMahal, setUserMahal] = useState('');
    const [mahals, setMahals] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserData = async () => {
            if (user) {
                // setFormData((prevData) => ({
                //     ...prevData,
                //     name: user.displayName,
                //     email: user.email
                // }));

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserMahal(docSnap.data().mahal);
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

        const fetchVakeelData = async () => {
            const querySnapshot = await getDocs(collection(db, "vakeels"));
            const vakeelsData = [];

            querySnapshot.forEach((doc) => {
                vakeelsData.push({ ...doc.data(), id: doc.id });
                console.log(doc.id, " => ", doc.data());
            });
            console.log(vakeelsData);
            setVakeels(vakeelsData);
        }

        const fetchMahlData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "mahals"));
                const mahalsData = [];
                querySnapshot.forEach((doc) => {
                    mahalsData.push(doc.data());
                    console.log(doc.id, " => ", doc.data());
                });
                console.log(mahalsData);
                setMahals(mahalsData);
            } catch (error) {
                console.error("Error fetching mahals data: ", error);
            }
        }

        fetchMahlData();




        fetchUserData();
        fetchClaimantData();
        fetchVakeelData();
        // alert('Please note that this is a demo version of the application. The data shown here is dummy data and does not reflect the actual data. You can view the actual data by logging in to the actual application. Thank you!');

    }, []);

    const handleChangeSelect = (event) => {
        const { value } = event.target;
        setDistriData(value);
    };

    const handleMahalFilter = (event) => {
        const { value } = event.target;
        setOtherMahalData(value);
    };

    const [claimants, setClaimants] = useState([])
    const [vakeels, setVakeels] = useState([])

    // const vakeel = [
    //     {
    //         name: 'Akbar Ali',
    //         id: '@9876543210',
    //         username: 'akbarali',
    //         number: '+91 9876543210',
    //         timestamp: '2 days ago',
    //     },
    // ]

    const claimantsOwnMahalFilterApproved = claimants.filter(claimant => claimant.mahal === userMahal && claimant.status === 'approved' && claimant.amountAllotted - claimant.paidAmount > 0).filter(claimant => claimant.amountAllotted - claimant.paidAmount > 0)
    const otherMahalFilter = claimants.filter(claimant => otherMahalData === 'all' && claimant.status === 'approved' ? claimant : claimant.mahal === otherMahalData && claimant.status === 'approved').filter(claimant => claimant.amountAllotted - claimant.paidAmount > 0)
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };


    return (
        <div className="container-box">
            <div className="claimant-box">
                <div className="header">
                    <div className="header-text d-flex justify-content-start">
                        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <div>
                            <h1>Claimants</h1>
                        </div>
                        {/* <div>
                            <div className="noti-icon" style={{ backgroundColor: 'rgba(217, 217, 217, 0.30)', padding: '8px 10px', borderRadius: '50px', cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
                                    <path d="M11.5893 0.258139C11.7197 0.108154 11.9043 0.016086 12.1025 0.0021638C12.3007 -0.0117584 12.4963 0.0536039 12.6464 0.18389C13.6159 1.02589 14.3949 2.06497 14.9314 3.23186C15.0145 3.41267 15.0224 3.6191 14.9534 3.80575C14.8844 3.99239 14.744 4.14396 14.5633 4.2271C14.3826 4.31025 14.1762 4.31816 13.9897 4.2491C13.8031 4.18004 13.6516 4.03967 13.5685 3.85886C13.1215 2.88565 12.4724 2.0189 11.6643 1.31638C11.5142 1.18604 11.4221 1.00145 11.408 0.803157C11.394 0.604868 11.4592 0.408357 11.5893 0.258139Z" fill="white" />
                                    <path d="M2.357 0.183885C2.50711 0.0533998 2.70289 -0.0120833 2.90127 0.00184111C3.09965 0.0157656 3.28437 0.107957 3.4148 0.258135C3.54523 0.408312 3.61069 0.604174 3.59677 0.802632C3.58285 1.00109 3.4907 1.18589 3.34058 1.31637C2.5325 2.0189 1.88335 2.88564 1.43638 3.85885C1.39643 3.9501 1.33871 4.03248 1.26658 4.10117C1.19445 4.16986 1.10937 4.22348 1.0163 4.25891C0.92323 4.29434 0.824036 4.31086 0.724511 4.30752C0.624986 4.30417 0.527124 4.28103 0.43664 4.23943C0.346157 4.19783 0.264863 4.13861 0.197508 4.06524C0.130152 3.99186 0.0780843 3.90579 0.0443439 3.81206C0.0106034 3.71833 -0.00413312 3.61882 0.0009946 3.51933C0.00612232 3.41984 0.0310116 3.32237 0.0742091 3.23261C0.609984 2.06566 1.3882 1.02633 2.357 0.183885Z" fill="white" />
                                    <path d="M9.1783 12.75C9.82678 12.75 10.1694 13.518 9.73682 14.001C9.45582 14.3156 9.11153 14.5672 8.72652 14.7394C8.34151 14.9115 7.92448 15.0004 7.50276 15C7.08104 15.0004 6.66401 14.9115 6.27901 14.7394C5.894 14.5672 5.54971 14.3156 5.2687 14.001C4.85488 13.539 5.15025 12.8168 5.744 12.7553L5.82647 12.7508L9.1783 12.75Z" fill="white" />
                                    <path d="M7.50275 0.000137328C8.52082 0.000137328 9.38145 0.677381 9.65809 1.60587L9.69257 1.73412L9.69857 1.76637C10.525 2.23279 11.2293 2.88844 11.7536 3.6796C12.278 4.47077 12.6075 5.37495 12.7153 6.31808L12.7363 6.53333L12.7505 6.75007V8.9483L12.7663 9.0503C12.8689 9.60292 13.1746 10.0971 13.6232 10.4355L13.7484 10.5233L13.8698 10.5975C14.5145 10.9628 14.2896 11.922 13.5872 11.9955L13.5002 12H1.50528C0.734602 12 0.465465 10.977 1.13568 10.5975C1.42133 10.4358 1.66814 10.2135 1.85878 9.94622C2.04942 9.67893 2.17927 9.37314 2.23922 9.0503L2.25496 8.94306L2.25571 6.71558C2.30142 5.73599 2.58644 4.78255 3.08582 3.9387C3.58521 3.09485 4.28373 2.38632 5.12025 1.87512L5.30617 1.76562L5.31367 1.73337C5.41972 1.28489 5.66073 0.879757 6.00419 0.572634C6.34765 0.265512 6.77702 0.0711876 7.23436 0.0158871L7.3708 0.00313726L7.50275 0.000137328Z" fill="white" />
                                </svg>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="claimants-list-body">
                    <div className="filter-box">
                        <div className="filter">
                            <div className="filter-item gap-2">
                                <label htmlFor="Distribution-Method" className='ms-2 fw-medium' style={{
                                    fontSize: '15px',
                                    color: '#000',
                                }}>Select Distribution Method</label>
                                <select onChange={handleChangeSelect} name="Distribution-Method" className='w-100' id="Distribution-Method">
                                    <option selected value="own-mahal">Own Mahal</option>
                                    <option value="other-mahal">Other Mahal (Naqlu Zakat)</option>
                                    <option value="vakeel">Vakeel</option>
                                </select>
                            </div>
                            {distriData === 'other-mahal' && <div className="filter-item d-flex gap-2 mt-2">
                                <select onChange={handleMahalFilter} name="mahal-filter" className='w-100 text-black' id="mahal-filter">
                                    <option value="all">All</option>
                                    {mahals.map((mahal, index) => (
                                        <option key={index} value={mahal.mahal}>{mahal.mahal}</option>
                                    ))}
                                </select>
                                <div className='p-1 border border-2 rounded-circle'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-filter">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
                                    </svg>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="claimants-box pt-2 pb-4">
                        <Alert variant='warning' className='mb-4'>
                            <div className="d-flex gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 9v4" />
                                        <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                                        <path d="M12 16h.01" />
                                    </svg>
                                </div>
                                <p className='mb-0'>Refer to our blog before selecting a claimant to ensure the category, counts aligns with Zakat rules.</p>
                            </div>
                        </Alert>
                        {distriData === 'own-mahal' && <>
                            {claimantsOwnMahalFilterApproved.map((claimant, index) => {
                                return <ClaimantCard key={index} claimant={claimant} />
                            })}
                        </>}
                        {distriData === 'other-mahal' && <>
                            {otherMahalFilter.map((claimant, index) => {
                                return <ClaimantCard key={index} claimant={claimant} />
                            })}
                        </>}
                        {distriData === 'vakeel' && <>
                            {vakeels.map((claimant, index) => {
                                return <ClaimantCard key={index} claimant={claimant} vakeel={true} />
                            })}
                        </>}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ClaimantsList