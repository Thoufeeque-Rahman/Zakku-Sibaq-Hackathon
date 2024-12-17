import React, { useState } from 'react'
import './GetStarted.css'
import { useNavigate } from 'react-router-dom'
import { Alert, Dropdown } from 'react-bootstrap'
import logo from '../../../assets/zakku.svg'


function getStarted() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  // const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  // const appendAlert = (message, type) => {
  //   const wrapper = document.createElement('div')
  //   wrapper.innerHTML = [
  //     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
  //     `   <div>${message}</div>`,
  //     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
  //     '</div>'
  //   ].join('')

  //   alertPlaceholder.append(wrapper)
  // }

  // const alertTrigger = document.getElementById('liveAlertBtn')
  // if (alertTrigger) {
  //   alertTrigger.addEventListener('click', () => {
  //     appendAlert('Nice, you triggered this alert message!', 'success')
  //   })
  // }

  return (
    <div className='container-box vh-100 vw-xs-100 '>
      <div className="getStarted-box d-flex align-items-start flex-column">
        <div className="getStarted-head d-flex justify-content-between w-100">
          <div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="37" height="35" viewBox="0 0 24 24" fill="none" stroke="#309A84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-scale">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 20l10 0" />
              <path d="M6 6l6 -1l6 1" />
              <path d="M12 3l0 17" />
              <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
              <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
            </svg> */}
            <img src={logo} alt="logo" className='' style={{ width: '30px' }} />
          </div>
          <div>
            <h2 className='fw-bold mt-2 mt-md-0 mb-0 ms-3'>Zakku.</h2>
          </div>
          <div className='ms-auto'>
            <Dropdown>
              <Dropdown.Toggle style={{ background: 'none', border: 'none' }} id="dropdown-basic">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-scan">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                  <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/general/mahal/login')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-mosque">
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
                  </svg> Mahal Login</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/general/vakeel/login')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-shield">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
                    <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  </svg> Vakeel Login</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-cog">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
                    <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M19.001 15.5v1.5" />
                    <path d="M19.001 21v1.5" />
                    <path d="M22.032 17.25l-1.299 .75" />
                    <path d="M17.27 20l-1.3 .75" />
                    <path d="M15.97 17.25l1.3 .75" />
                    <path d="M20.733 20l1.3 .75" />
                  </svg> Admin Login</Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => navigate('/help-and-support')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-help-circle">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M12 16v.01" />
                    <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                  </svg> Help and Support</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </div>

        <p className='mt-5 text-start mx-4 w-100 fw-semibold mb-0' style={{ color: 'var(--primary-color)' }}>A Zakat Calculation, Collection and Allocation Innovation.</p>
        <Alert variant="warning" className='w-100 mt-4' show={show} onClose={() => setShow(false)} dismissible>
          {/* <Alert.Heading>Login to use this feature</Alert.Heading> */}
          <h5>Login to use this feature</h5>
        </Alert>

        <div className="features-cards mb-auto">
          <div className="feature-card d-flex gap-3" onClick={() => setShow(true)}>
            <div className="feature-card-head">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M4 11h12.5" />
                  <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                  <path d="M19 21v1m0 -8v1" />
                </svg>
              </div>
            </div>
            <div className="feature-card-body">
              <h3 className='fw-semibold'>Zakat Tracker and Money Managment</h3>
            </div>
          </div>
          <div className="feature-card d-flex gap-3" onClick={() => navigate('/general/home/zakat-calculator')}>
            <div className="feature-card-head">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-math-symbols">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12l18 0" />
                  <path d="M12 3l0 18" />
                  <path d="M16.5 4.5l3 3" />
                  <path d="M19.5 4.5l-3 3" />
                  <path d="M6 4l0 4" />
                  <path d="M4 6l4 0" />
                  <path d="M18 16l.01 0" />
                  <path d="M18 20l.01 0" />
                  <path d="M4 18l4 0" />
                </svg>
              </div>
            </div>
            <div className="feature-card-body">
              <h3 className='fw-semibold'>Zakat Calculator</h3>
            </div>
          </div>
          <div className="feature-card d-flex gap-3" onClick={() => navigate('/general/blog')}>
            <div className="feature-card-head">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <path d="M22.1667 4.75V11.0833C22.1667 11.5033 22.3336 11.906 22.6305 12.2029C22.9274 12.4999 23.3302 12.6667 23.7501 12.6667H30.0834M22.1667 4.75H11.0834C10.2436 4.75 9.43811 5.08363 8.84424 5.6775C8.25038 6.27136 7.91675 7.07681 7.91675 7.91667V30.0833C7.91675 30.9232 8.25038 31.7286 8.84424 32.3225C9.43811 32.9164 10.2436 33.25 11.0834 33.25H26.9167C27.7566 33.25 28.5621 32.9164 29.1559 32.3225C29.7498 31.7286 30.0834 30.9232 30.0834 30.0833V12.6667M22.1667 4.75L30.0834 12.6667M14.2501 14.25H15.8334M14.2501 20.5833H23.7501M14.2501 26.9167H23.7501" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="feature-card-body">
              <h3 className='fw-semibold'>Zakat related Articles</h3>
            </div>
          </div>
          <div className="feature-card d-flex gap-3" onClick={() => navigate('/help-and-support#FAQ')}>
            <div className="feature-card-head"> 
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <path d="M12.6667 14.25H25.3333M12.6667 20.5834H22.1667M22.1667 28.5H20.5833L12.6667 33.25V28.5H9.5C8.24022 28.5 7.03204 27.9996 6.14124 27.1088C5.25045 26.218 4.75 25.0098 4.75 23.75V11.0834C4.75 9.8236 5.25045 8.61541 6.14124 7.72462C7.03204 6.83382 8.24022 6.33337 9.5 6.33337H28.5C29.7598 6.33337 30.968 6.83382 31.8588 7.72462C32.7496 8.61541 33.25 9.8236 33.25 11.0834V18.2084M30.0833 34.8334V34.8492M30.0833 30.0834C30.7931 30.0811 31.4817 29.8408 32.0387 29.4009C32.5958 28.961 32.9891 28.3469 33.1559 27.657C33.3226 26.967 33.2531 26.2411 32.9584 25.5954C32.6637 24.9496 32.1609 24.4214 31.5305 24.0952C30.9006 23.7726 30.1801 23.6725 29.4861 23.8114C28.7921 23.9502 28.1656 24.3198 27.7083 24.86" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="feature-card-body">
              <h3 className='fw-semibold'>FAQ</h3>
            </div>
          </div>
        </div>
        <div className="getStarted-footer mt-md-5 mt-5">
          <button onClick={() => navigate('/general/login')} className='login-btn btn'>Login</button>
          <button onClick={() => navigate('/general/signup')} className='create-btn btn'>Create Account</button>
          <p className='text-center text-muted mt-2 mb-0' style={{ fontSize: "11px" }}>By continuing, you acknowledge and agree to abide by our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}

export default getStarted