import React, { useEffect, useState } from 'react'
import './ApplicationForm.css'
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import jsQR from 'jsqr';
import { getAuth } from 'firebase/auth';
import QRCodeImageScanner from '../../../Components/QrCodeReader/QrCodeReader';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

function ApplicationForm({ setDonor }) {

    const [applicationFile, setApplicationFile] = useState(null);
    const [mahals, setMahals] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        mahal: '',
        amount: '',
        upiId: '',
        files: [],
        filePreviews: [],
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
                    setSelectedOption({ label: docSnap.data().mahal, value: docSnap.data().mahal });
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };
        const fetchClaimantData = async () => {
            if (user) {
                const docRef = doc(db, "Claimant", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    if (docSnap.data().email === user.email) {
                        navigate('/general/claimant/application-status');
                    }
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


        console.log(formData);


        fetchClaimantData();
        fetchMahlData();
        fetchUserData();
    }, []);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);

    };

    const handleChangeSelect = (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            mahal: value
        }));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const filePreviews = [];

        files.forEach((file) => {
            if (!file.type.startsWith('image/')) {
                setFormData((prevData) => ({
                    ...prevData,
                    files: [],
                    filePreviews: [],
                    errorMessage: 'Please select image files only.'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                filePreviews.push(reader.result);
                if (filePreviews.length === files.length) {
                    setFormData((prevData) => ({
                        ...prevData,
                        files: files,
                        filePreviews: filePreviews,
                        errorMessage: ''
                    }));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const storage = getStorage();
        // const db = getFirestore();

        const fileURLs = [];

        for (const file of formData.files) {
            const storageRef = ref(storage, `uploads/${uuidv4()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(storageRef);
            fileURLs.push(fileURL);
        }

        const docRef = doc(db, 'Claimant', user.uid);
        await setDoc(docRef, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            amountRequested: formData.amount,
            amountAllotted: formData.amount,
            paidAmount: 0,
            upiId: formData.upiId,
            mahal: selectedOption.value,
            category: selectedCategoryOption.value,
            status: 'pending',
            fileURLs: fileURLs,
            timestamp: new Date()
        });



        setFormData({
            name: '',
            email: '',
            phone: '',
            mahal: '',
            amount: '',
            upiId: '',
            files: [],
            filePreviews: [],
            errorMessage: ''
        });

        alert('Application submitted successfully!');
        navigate('/general/claimant/application-status');
    };

    const [qrCodeData, setQrCodeData] = useState('');
    const [error, setError] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setError('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                // Create a canvas to process the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the uploaded image on the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Extract image data from the canvas
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                // Decode the QR code
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if (code) {
                    console.log('QR Code Data:', code.data); // Debug log
                    setQrCodeData(code.data); // Save the decoded data
                    setFormData((prevData) => ({
                        ...prevData,
                        upiUrl: code.data
                    }));
                    setError(''); // Clear any previous error
                } else {
                    setQrCodeData('');
                    setError('QR code not found in the image.');
                }
            };

            img.onerror = () => {
                setError('Error loading the image.');
            };
        };

        reader.onerror = () => {
            setError('Error reading the file.');
        };

        reader.readAsDataURL(file); // Read the file as a data URL
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

    const categoryOptions = [
        { label: 'The Poor (Fuqara)', value: 'Poor' },
        { label: 'The Needy (Masakin)', value: 'Needy' },
        { label: 'Zakat Administrators', value: 'Admin' },
        { label: 'New Muslims', value: 'New muslim' },
        { label: 'Those in Bondage (seeking emanccipation)', value: 'Bondage' },
        { label: 'Individuals burdened with debt', value: 'Debt' },
        { label: 'Unpaid warriors (fighting in the cause of Allah)', value: 'Warriors' },
        { label: 'Stranded Travelers', value: 'Traveler' },
    ]

    const [selectedOption, setSelectedOption] = useState();
    const [selectedCategoryOption, setSelectedCategoryOption] = useState();

    return (
        <div className="container-box pb-5">
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
                            <h1>Claimant <br /> Application</h1>
                        </div>
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
                                <label for="category" className='fs-6 mb-0'>Select Category</label>
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
                                    defaultValue={selectedCategoryOption}
                                    onChange={setSelectedCategoryOption}
                                    options={categoryOptions}
                                    value={formData.category && !selectedOption ? { label: formData.category, value: formData.category } : selectedCategoryOption}
                                    placeholder={'Select Category'}
                                    isClearable
                                    className='asyncSelect w-100'
                                />
                            </div>
                            <div className="form-group gap-1 mb-3 w-100">
                                <label for="mahal" className='fs-6 mb-0'>Mahal Name</label>
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

                            <div className="amount-group">
                                <label for="amount" className='fs-6 mb-0'>Amount Receivable</label>
                                <div class="input-group mb-3 p-0 border-0 d-flex">
                                    <span class="input-group-text" style={{ height: '45px' }}>₹</span>
                                    <input
                                        name='amount'
                                        id='amount'
                                        type="number"
                                        value={formData.amount}
                                        required
                                        onChange={handleChange}
                                        placeholder='eg: 5000'
                                        class="form-control"
                                        aria-label="Amount (to the nearest dollar)"
                                        style={{
                                            borderRadius: '0.25rem',
                                            borderTopRightRadius: '15px',
                                            borderBottomRightRadius: '15px',
                                            borderTopLeftRadius: '0',
                                            borderBottomLeftRadius: '0',
                                            height: '45px'

                                        }} />
                                </div>
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
                            <div className="form-group gap-1 mb-3 w-100 rounded-4 p-3" style={{ border: '1px dotted' }}>
                                <input type="file" style={{ padding: '6px 7px' }} onChange={handleFileChange} className='form-control' name="" id="" multiple />
                                {formData.files === '' ? null : <p className='text-muted text-center' style={{
                                    fontSize: "12px",
                                }}>Upload any relevant documents to support your application (.jpeg, .jpg, .png formats only)  </p>}
                                {formData.errorMessage && <p className='text-danger fw-medium text-center w-100' style={{ fontSize: '13px' }}>*{formData.errorMessage}</p>}
                                {formData.filePreviews && (
                                    <div className="file-preview mt-3">
                                        {formData.filePreviews.length > 0 && (
                                            <div className="file-previews mt-2">
                                                {formData.filePreviews.map((preview, index) => (
                                                    <img className='mb-2 me-2' key={index} src={preview} alt={`File Preview ${index}`} style={{ maxWidth: '100%', height: '100px' }} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* <div className="form-group gap-1 mb-3 w-100 rounded-4 p-3 text-break text-center text-success" style={{ border: '1px dotted' }}>
                                <h1 className='fs-6 mx-auto'>Upload your UPI QR Code Image</h1>
                                <input type="file" required accept="image/*" style={{ padding: '6px 7px' }} onChange={handleImageUpload} className='form-control mb-3' name="" id="" />
                                {error && <p className='text-danger text-center mx-auto'>{error}</p>}
                                {qrCodeData && (
                                    <div className='text-center text-success w-100'>
                                        {qrCodeData && <p className='mx-auto'>UPI id: {qrCodeData.match(/pa=([^&]*)/)[1]}</p>}
                                    </div>
                                )}
                            </div> */}
                            {/* <p>url: {formData.upiUrl}</p> */}
                            <button type="submit" disabled={formData.amount !== '' ? false : true} className="btn submit-btn w-100">Submit</button>

                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ApplicationForm