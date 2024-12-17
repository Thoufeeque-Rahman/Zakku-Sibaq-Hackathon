import React, { useEffect, useState } from 'react'
import './ApplicationForm.css'
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

function ApplicationForm({ setDonor }) {

    const [applicationFile, setApplicationFile] = useState(null);
    const [mahals, setMahals] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        upiId: '',
        mahal: '',
        SPmahal: '',
        anonymous: false,
        file: null,
        filePreview: null
    });
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    useEffect(() => {
        window.scrollTo(0, 0); 
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
                        mahal: docSnap.data().mahal
                    }));
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

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


        fetchUserData();
        fetchMahlData();
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);

    };

    const handleMahalChangeSelect = (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            mahal: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const docRef = doc(db, 'Donors', user.uid);
        await setDoc(docRef, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            upiId: formData.upiId,
            mahal: selectedOption.value,
            anonymous: formData.anonymous,
            status: 'approved',
            timestamp: new Date()
        });

        await updateDoc(doc(db, 'users', user.uid), {
            userMode: arrayUnion("Donor"),
            mahal: selectedOption.value,
        });

        setFormData({
            name: '',
            email: '',
            phone: '',
            upiId: '',
            mahal: '',
            SPmahal: '',
            anonymous: false,
            errorMessage: ''
        });

        alert('Application submitted successfully!');
        navigate('/general/donor/application-status');
    };

    const handleBackClick = () => {
        navigate('/general/home'); // Navigate to the previous page
    };

    const loadOptions = (inputValue, callback) => {
        const filteredOptions = mahals.filter(mahal =>
            mahal.mahal.toLowerCase().includes(inputValue.toLowerCase())
        );
        const options = filteredOptions.map(mahal => ({
            label: mahal.mahal,
            value: mahal.mahal
        }));
        callback(options);
    };

    const handleMahalChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            mahal: selectedOption ? selectedOption.value : '',
        }));

        console.log(formData);

    };

    const filteredOptions = mahals.filter(mahal =>
        mahal.mahal.toLowerCase()
    );

    const options = filteredOptions.map(mahal => ({
        label: mahal.mahal,
        value: mahal.mahal
    }));

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="container-box">
            <div className="application-box">
                <div className="header">
                    <div className="header-text d-flex justify-content-start">
                        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <div>
                            <h1>Donor Registration</h1>
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
                <div className="application-body">
                    <div className="application-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group gap-1 mb-3 w-100">
                                <label for="name" className='fs-6 mb-0'>Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="name"
                                    name='name'
                                    required
                                    placeholder='eg: Sheik Zakariya'
                                />
                            </div>
                            <div className="form-group gap-1 mb-3 w-100">
                                <label for="email" className='fs-6 mb-0'>Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    required
                                    placeholder='eg: example@gmail.com'
                                />
                            </div>
                            <div className="form-group gap-1 mb-3 w-100">
                                <label for="phone" className='fs-6 mb-0'>Phone Number</label>
                                <input
                                    type="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="phone"
                                    name='phone'
                                    required
                                    placeholder='eg: 0971234567'
                                />
                            </div>
                            <div className="form-group gap-1 mb-3 w-100">
                                <label for="upiId" className='fs-6 mb-0'>UPI ID</label>
                                <input
                                    type="text"
                                    value={formData.upiId}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="upiId"
                                    name='upiId'
                                    required
                                    placeholder='eg: example@okaxis'
                                />
                            </div>

                            <div className="form-group gap-1 mb-3 w-100">
                                <label htmlFor="mahal" className='fs-6 mb-0'>Mahal Name</label>
                                {/* <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    defaultOptions
                                    onChange={handleMahalChange}
                                    value={formData.mahal ? { label: formData.mahal, value: formData.mahal } : null}
                                    placeholder="Select Mahal"
                                    className='w-100 asyncSelect'
                                    isClearable
                                /> */}
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    value={formData.mahal && !selectedOption ? { label: formData.mahal, value: formData.mahal } : selectedOption}
                                    placeholder={'Select Mahal'}
                                    isClearable
                                    className='asyncSelect w-100'
                                />
                            </div>


                            {/* <div className="form-group gap-1 mb-3 w-100 rounded-4 p-3" style={{ border: '1px dotted' }}>
                                <input type="file" style={{ padding: '6px 7px' }} onChange={handleFileChange} className='form-control' name="" id="" />
                                {formData.file ? null : <p className='text-muted text-center' style={{fontSize: "12px",
                                }}>Upload any relevant documents to support your application (Upload .jpeg, .jpg, .png formated files only)  </p>}
                                {formData.errorMessage && <p className='text-danger fw-medium text-center w-100' style={{ fontSize: '13px' }}>*{formData.errorMessage}</p>}
                                {formData.filePreview && (
                                    <div className="file-preview mt-3">
                                        {formData.file.type.startsWith('image/') ? (
                                            <img src={formData.filePreview} alt="File Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                                        ) : (
                                            <a href={formData.filePreview} target="_blank" rel="noopener noreferrer">Preview File</a>
                                        )}
                                    </div>
                                )}
                            </div> */}

                            <div className="form-group gap-1 mb-3 w-100">
                                <div className="form-check d-flex gap-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={formData.anonymous}
                                        onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                                        id="anonymous"
                                        name="anonymous"
                                        style={{ width: '10px', height: '10px' }}
                                    />
                                    <label className="form-check-label" htmlFor="anonymous">
                                        Stay Anonymous (Your name will not appear in the mahal lists and you can donate anonymously)
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn submit-btn w-100" onClick={() => {
                                setDonor(true)
                                navigate('/donor/claimants-list')
                            }}>Submit</button>

                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ApplicationForm