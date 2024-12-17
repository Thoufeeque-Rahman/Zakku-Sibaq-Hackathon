// Login.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { FirebaseContext } from '../../../../store/firebaseContext';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const Login = ({ general, userMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const [error, setError] = useState(null);


  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      navigate('/general/home');
    }
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User:', user); // User object
        console.log('User ID:', user.uid); // User ID
        console.log('User Email:', user.email); // User Email
        console.log('User Name:', user.displayName); // User Name
        console.log('User Phone:', user.phoneNumber); // User Phone

      })
      .then(() => {
        // Redirect to dashboard
        console.log('Redirect to dashboard');
        {
          userMode === 'General' &&
            navigate('/general/home');
        }
        {
          userMode === 'Mahal' &&
            navigate('/general/mahal/dashboard');
        }
        {
          userMode === 'Vakeel' &&
            navigate('/general/vakeel/dashboard');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log('Error:', errorMessage);
      });


    console.log('Login data:', formData);
    console.log('Firebase:', firebase);

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

  return (
    <div className="auth-container-box">
      <div className="auth-box">
        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <h2 style={{ color: 'var(--text-color)', fontSize: '50px' }} className='fw-bold text-center mt-5'>Zakku.</h2>
        {!general && <h1 className=" fs-sm-6 fs-md-5 fs-lg-6 fs-xl-7 auth-title mt-5">{userMode} Login</h1>}
        <p className="auth-subtitle">Get Started Now</p>

        <p style={{ fontSize: '12px' }} className="auth-subsubtitle mt-5 mb-3 fw-medium text-center text-muted">Fill the form below to login</p>
        <form onSubmit={handleSubmit} className="auth-form position-relative">
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <div className="input-group">
              {/* <i style={{ color: '#309A84' }} class="fa-solid fa-envelope-open fs-4 me-2"></i> */}
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
                placeholder="Email "
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
          {error && (
            <p style={{ fontSize: '12px', marginTop: '-10px' }} className='text-danger fw-medium text-right'>
              * {error}
            </p>
          )}

          <div className="form-options">
            {/* <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label> */}
            {/* <Link to="/forgot-password" className="forgot-password ms-auto">
              Forgot Password?
            </Link> */}
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
          {
            general === true && <>
              <p style={{ fontSize: '14px' }} className="auth-subsubtitle m-0 fw-medium text-center text-muted" >or continue with</p>
              <a type="btn" onClick={handleGoogleLogin} className="google-btn fs-6 text-center">
                <img src="https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png" height="22px" width="22px" alt="" /> Continue with Google
              </a>
            </>
          }
        </form>

        <p className="auth-switch">
          Don't have an account?
          {general && <Link to="/general/signup"> Sign up</Link>}
          {userMode === 'Mahal' && <Link to="/general/mahal/signup"> Sign up</Link>}
          {userMode === 'Vakeel' && <Link to="/general/vakeel/signup"> Sign up</Link>}
        </p>
      </div>
    </div>
  );
};

export default Login;
