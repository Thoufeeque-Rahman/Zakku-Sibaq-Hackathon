// Login.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { FirebaseContext } from '../../../../store/firebaseContext';
import { createUserWithEmailAndPassword, getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const Signup = ({ general, userMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    mahal: 'Manjeri',
    userMode: userMode === 'Mahal' ? ['Mahal'] : userMode === 'Vakeel' ? ['Vakeel'] : ['General'],
    password: '',
    confirmPassword: '',
    RPposition: '',
    SPposition: '',
    SPmahal: ''
  });

  const [mahals, setMahals] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  const [passwordError, setPasswordError] = useState(false); // Add state for password error
  const [error, setError] = useState(null);
  const auth = getAuth();
  const db = getFirestore()
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('User:', userMode);
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
  }, [userMode]);

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check for password match when confirmPassword changes
    if (name === 'confirmPassword') {
      setPasswordError(value !== formData.password && value !== '');
    } else if (name === 'password') {
      setPasswordError(formData.confirmPassword !== value && formData.confirmPassword !== '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (formData.password !== formData.confirmPassword) {
      // Show an alert if passwords don't match
      alert("Passwords do not match. Please try again.");
      return;
    }

    // {
    //   userMode === 'Mahal' && setFormData((prevData) => ({
    //     ...prevData,
    //     userMode: ['Mahal']
    //   }));
    // }
    // Add signup logic here
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        // Signed in
        userCredential.user
        const user = userCredential.user;
        await updateProfile(user, { displayName: formData.fullName })
          .then(async () => {
            // Profile updated!
            const username = formData.fullName.toLowerCase().replace(/\s+/g, '');

            {
              userMode === 'Mahal' ?
                await setDoc(doc(db, 'mahals', user.uid), {
                  id: user.uid,
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  mahal: formData.mahal,
                  RPposition: formData.RPposition === 'other' ? formData.SPposition : formData.RPposition,
                  username: username,
                  userMode: formData.userMode
                }).then(() => {


                  navigate('/general/mahal/dashboard');
                  console.log('Mahal added to database');


                }).catch((error) => {
                  setError(error.message);
                  console.error('Error adding user to database: ', error);

                })
                : console.log(userMode + ' is not Mahal');

            }
            {
              userMode === 'General' &&
                await setDoc(doc(db, 'users', user.uid), {
                  id: user.uid,
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  mahal: selectedOption.value,
                  username: username,
                  userMode: []
                }).then(() => {

                  navigate('/general/home');
                  console.log('User added to database');


                }).catch((error) => {
                  setError(error.message);
                  console.error('Error adding user to database: ', error);

                })
            }
            {
              userMode === 'Vakeel' &&
                await setDoc(doc(db, 'vakeels', user.uid), {
                  id: user.uid,
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  whatsapp: formData.whatsapp,
                  username: username,
                  userMode: formData.userMode
                }).then(() => {

                  navigate('/general/vakeel/dashboard');
                  console.log('Vakeel added to database');


                }).catch((error) => {
                  setError(error.message);
                  console.error('Error adding vakeel to database: ', error);

                })
            }

          }).catch((error) => {
            setError(error.message);
            console.error('Error updating profile: ', error);
          });
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
    console.log('Signup data:', formData);
    console.log(firebase);
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('Google User:', user);
        navigate('/general/home');
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Google Error:', errorCode, errorMessage, email, credential);
        // ...
      });
  };

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      RPposition: value
    }));
  };

  const handleMahalChangeSelect = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      mahal: value
    }));
  };


  // const loadOptions = (inputValue, callback) => {
  //   const options = filteredOptions.map(mahal => ({
  //     label: mahal.mahal,
  //     value: mahal.mahal
  //   }));
  //   callback(options);
  // };

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
    <div className="auth-container-box">
      <div className="auth-box">
        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <h2 style={{ color: 'var(--text-color)', fontSize: '50px' }} className='fw-bold text-center  mt-5'>Zakku.</h2>
        {!general && <h1 className=" fs-sm-6 fs-md-5 fs-lg-6 fs-xl-7 auth-title mt-5">{userMode} Signup</h1>}
        <p className="auth-subtitle">Get Started Now</p>

        <p style={{ fontSize: '12px' }} className="auth-subsubtitle mt-5 mb-3 fw-medium text-center text-muted">Fill the form below to Signup</p>
        <form onSubmit={handleSubmit} className="auth-form position-relative">
          {userMode === 'Mahal' ?
            <>
              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#309A84" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-mosque">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 21h7v-2a2 2 0 1 1 4 0v2h7" />
                      <path d="M4 21v-10" />
                      <path d="M20 21v-10" />
                      <path d="M4 16h3v-3h10v3h3" />
                      <path d="M17 13a5 5 0 0 0 -10 0" />
                      <path d="M21 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z" />
                      <path d="M5 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z" />
                      <path d="M12 2a2 2 0 1 0 2 2" />
                      <path d="M12 6v2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="mahal"
                    name="mahal"
                    className='ms-3'
                    value={formData.mahal}
                    onChange={handleChange}
                    placeholder="Name of Mahal"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className='ms-3'
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Name of Responsible Person"
                    required
                  />
                </div>
              </div>

              <div className="mahal-special">
                <div className="form-group gap-1 w-100">
                  {/* <label for="mahal" className='fs-6 mb-0'>Select Mahal</label> */}

                  <select onChange={handleChangeSelect} id="mahal" className="form-select" aria-label="Default select example" style={{ height: '50px' }}>
                    <option value="" selected>Select Position</option>
                    <option value="president">President</option>
                    <option value="secretory">Secretory</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {formData.RPposition === 'other' && <div className="form-group gap-1 mt-3 w-100">
                  {/* <label for="mahal" className='fs-6 mb-0'>Mahal Name</label> */}
                  <input
                    type="text"
                    value={formData.SPposition}
                    onChange={handleChange}
                    className="form-control"
                    id="SPposition"
                    name='SPposition'
                    placeholder='Specify Position'
                  />
                </div>}
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail-opened">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                      <path fill="#fff" d="M3 9l9 6l9 -6l-9 -6l-9 6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className='ms-3'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
                      <path d="M11 4h2" />
                      <path d="M12 17v.01" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className='ms-3'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>


              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className='ms-3'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className='ms-3'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
            </> :
            <>
              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className='ms-3'
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>


              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail-opened">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                      <path fill="#fff" d="M3 9l9 6l9 -6l-9 -6l-9 6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className='ms-3'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
                      <path d="M11 4h2" />
                      <path d="M12 17v.01" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className='ms-3'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
                      <path d="M11 4h2" />
                      <path d="M12 17v.01" />
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#309A84" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="whatsapp"
                    name="whatsapp"
                    className='ms-3'
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Whatsapp number"
                    required
                  />
                </div>
              </div>
              {/* <div className="form-group">
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#309A84" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-mosque">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 21h7v-2a2 2 0 1 1 4 0v2h7" />
                      <path d="M4 21v-10" />
                      <path d="M20 21v-10" />
                      <path d="M4 16h3v-3h10v3h3" />
                      <path d="M17 13a5 5 0 0 0 -10 0" />
                      <path d="M21 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z" />
                      <path d="M5 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z" />
                      <path d="M12 2a2 2 0 1 0 2 2" />
                      <path d="M12 6v2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="mahal"
                    name="mahal"
                    className='ms-3'
                    value={formData.mahal}
                    onChange={handleChange}
                    placeholder="Name of Mahal"
                    required
                  />
                </div>
              </div> */}

              {userMode !== 'Vakeel' && <div className="form-group gap-1  w-100">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder={'Select Mahal'}
                  isClearable
                  className='asyncSelect w-100'
                />
                {/* <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptions}
                  defaultOptions
                  onChange={handleMahalChange}
                  value={formData.mahal ? { label: formData.mahal, value: formData.mahal } : null}
                  id='mahal'
                  name='mahal'
                  placeholder="Select Mahal"
                  className='w-100 asyncSelect'
                  isClearable
                /> */}
              </div>}



              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className='ms-3'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <div className="input-group">
                  <div className='position-absolute top-50 start-0 translate-middle-y ms-2' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path fill="#309A84" d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className='ms-3'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
            </>
          }
          {passwordError && (
            <p style={{ fontSize: '12px', marginTop: '-10px' }} className='text-danger fw-medium text-right'>
              * Passwords do not match
            </p>
          )}
          {error && (
            <p style={{ fontSize: '12px', marginTop: '-10px' }} className='text-danger fw-medium text-right'>
              * {error}
            </p>
          )}

          <button type="submit" className="submit-btn mt-2">
            Signup
          </button>
          {general && <>
            <p style={{ fontSize: '14px' }} className="auth-subsubtitle m-0 fw-medium text-center text-muted" >or continue with</p>
            <a type="btn" onClick={handleGoogleLogin} className="google-btn fs-6 text-center">
              <img src="https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png" height="22px" width="22px" alt="" /> Continue with Google
            </a>
          </>}
        </form>

        <p className="auth-switch">
          Already have an account?
          {general && <Link to="/general/login"> Login</Link>}
          {userMode === 'Mahal' && <Link to="/general/mahal/login"> Login</Link>}
          {userMode === 'Vakeel' && <Link to="/general/vakeel/login"> Login</Link>}
        </p>
      </div>
    </div>
  );
};

export default Signup;

