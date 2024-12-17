import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getAuth, signOut, updateProfile, updateEmail, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './insert/image';
import { Button, Form, FormGroup, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import AsyncSelect from 'react-select/async';


function Profile() {

  const db = getFirestore()
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user ? user.email : null;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mahal: '',
    username: '',
    userMode: '',
    file: null,
    filePreview: null
  });
  const [mahals, setMahals] = useState([]);


  const [userState, setUserState] = useState(() => user ? user : null);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      const fetchUserData = async () => {
        const user = auth.currentUser;
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
              username: docSnap.data().username,
              userMode: docSnap.data().userMode
            }));
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
            setShow(true);
          }

          setUserState(user);
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


      fetchMahlData();

      fetchUserData();
    } else {
      navigate('/getStarted')
    }
  }, []);



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

  const handleUpdateProfile = async () => {
    if (!userState) {
      console.log("No user signed in");
      alert("No user signed in");
      return;
    } else {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          mahal: formData.mahal,
          username: formData.username,
          userMode: formData.userMode
        }, { merge: true });

        await updateProfile(user, {
          displayName: formData.name
        });

        await updateEmail(user, formData.email);

        alert("Profile updated successfully");
        setShow(false);
      }
    }
  };


  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);

  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
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

  return (
    <>
      <div className="container-box pb-5">
        <div className="settings-box">
          <div className="header">
            <div className="header-text d-flex justify-content-start">
              <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
              <div>
                <h1>Profile Settings</h1>
              </div>
              <div className='ms-auto'>
                <div className="noti-icon" onClick={() => setConfirm(true)} style={{ backgroundColor: 'rgba(217, 217, 217, 0.30)', padding: '8px 10px', borderRadius: '50%', cursor: 'pointer' }}>
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
          <div className="settings-body">
            <div className='profile-informations mx-auto'>
              <div className="features-cards mb-auto text-center d-flex justify-content-center flex-column">
                <div className="p-2 bg-white rounded-circle align-self-center" style={{ marginTop: '-60px' }}>
                  <div className="profile-pic rounded-circle p-2" style={{ background: '#E5F8F6', width: 'fit-content' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <g clip-path="url(#clip0_217_43)">
                        <path d="M11 44.1V40.4333C11 38.4884 11.7726 36.6231 13.1479 35.2479C14.5232 33.8726 16.3884 33.1 18.3333 33.1H25.6667C27.6116 33.1 29.4768 33.8726 30.8521 35.2479C32.2274 36.6231 33 38.4884 33 40.4333V44.1M14.6667 18.4333C14.6667 20.3782 15.4393 22.2435 16.8146 23.6188C18.1898 24.994 20.0551 25.7666 22 25.7666C23.9449 25.7666 25.8102 24.994 27.1855 23.6188C28.5607 22.2435 29.3333 20.3782 29.3333 18.4333C29.3333 16.4884 28.5607 14.6231 27.1855 13.2479C25.8102 11.8726 23.9449 11.1 22 11.1C20.0551 11.1 18.1898 11.8726 16.8146 13.2479C15.4393 14.6231 14.6667 16.4884 14.6667 18.4333Z" stroke="#309A84" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_217_43">
                          <rect width="44" height="44" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="profile-data">
                  <p className='mb-0 fw-semibold' style={{ fontSize: '16px' }}>{formData.name}</p>
                  <p className='mb-0 text-muted' style={{ fontSize: '14px' }}>@{formData.username}</p>
                  <p className='mb-0 text-muted' style={{ fontSize: '14px' }}>{formData.email}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <div className="claimant-mahallu d-flex align-items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                      </svg>
                      <p style={{ fontSize: '12px' }} className='ms-2 me-2 mb-0'>{formData.mahal}</p>
                    </div>
                    <div className="claimant-mahallu d-flex align-items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                        <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                      </svg>
                      <p style={{ fontSize: '12px' }} className='ms-2 me-2 mb-0'>{formData.userMode}</p>
                    </div>
                  </div>

                  <button className='btn edit-btn mt-4' style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    marginTop: '10px',
                    borderRadius: '25px',
                    fontSize: '15px'
                  }}
                    onClick={() => setShow(true)}
                  >Edit Profile
                    <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 15" fill="none">
                      <path d="M1 1.79395L7 7.50118L1 13.2084" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <br />
                  <button className='btn edit-btn mt-2' style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    marginTop: '10px',
                    borderRadius: '25px',
                    fontSize: '15px'
                  }}
                    onClick={() => navigate('/help-and-support')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-headset me-2">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 14v-3a8 8 0 1 1 16 0v3" />
                      <path d="M18 19c0 1.657 -2.686 3 -6 3" />
                      <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z" />
                      <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z" />
                    </svg>
                    Help and Support

                  </button>

                </div>
              </div>
            </div>
            <div className='notification-main'>
              <h4 className='notification-text'>Notificaion</h4>
              <div className='notification-list-1'>
                <div className='p-2 rounded-circle' style={{ background: '#E5F8F6' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail-exclamation">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
                    <path d="M3 7l9 6l9 -6" />
                    <path d="M19 16v3" />
                    <path d="M19 22v.01" />
                  </svg>
                </div>
                <p className='mb-0 ms-3 fw-medium'>Email Notifications </p>
                <div className='button-on-off ms-auto'>
                  <label className="switch">
                    <input type="checkbox" hidden />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div className='notification-list-2 mt-2'>
                <div className='p-2 rounded-circle' style={{ background: '#E5F8F6' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-notification">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M17 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  </svg>
                </div>
                <p className='mb-0 ms-3 fw-medium'>Push Notifications </p>
                <div className='button-on-off ms-auto'>
                  <label className="switch">
                    <input type="checkbox" hidden />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

            </div>
            <div className='security-main'>
              <h4 className='notification-text'>Security</h4>
              <button className='change-password-btn w-100 mb-2' onClick={() =>
                sendPasswordResetEmail(auth, email)
                  .then(() => {
                    alert('Password reset email sent!');
                    // ..
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                  })
              }>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock-password me-2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                  <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                  <path d="M15 16h.01" />
                  <path d="M12.01 16h.01" />
                  <path d="M9.02 16h.01" />
                </svg>
                Change Password
              </button>
              <button className='change-password-btn dlt-acc w-100' onClick={() =>
                deleteUser(user).then(() => {
                  // User deleted.
                  alert('Account deleted successfully');
                  navigate('/getStarted');
                }).catch((error) => {
                  // An error ocurred
                  // ...
                })}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash me-2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
                Delete Account
              </button>
            </div>
            <div>
              {/* <input className="btn btn-primary border-0 submit-button" type="submit" value="Save Changes" /> */}

            </div>
            <Modal show={confirm} centered id="paymentModal" onHide={() => setConfirm(false)}>
              <p>Are you sure to proceed with Log Out?</p>
              <div className="d-flex gap-3">
                <Button className='w-100' variant="danger" onClick={() => setConfirm(false)}>No</Button>
                <Button className='w-100' onClick={handleSignout}>Yes</Button>
              </div>
            </Modal>

            <Modal show={show} onHide={() => setShow(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
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
                    <label for="name" className='fs-6 mb-0'>User Name</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      id="username"
                      name='username'
                      required
                      placeholder='eg: sheik_zakariya'
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
                  <div className="form-group gap-1 w-100">
                    <label for="mahal" className='fs-6 mb-0'>Mahal Name</label>
                    <AsyncSelect
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
                    />
                  </div>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdateProfile}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

        </div>
      </div >
      <Navbar />
    </>
  )




}

export default Profile