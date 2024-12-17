import React from 'react'
import './Navbar.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className='sticky-bottom' style={{ borderEndStartRadius: '12px', borderEndEndRadius: '12px' }} >
            <nav className="navbar border-bottom-1 navbar-expand-xs" style={{ borderEndStartRadius: '12px', borderEndEndRadius: '12px' }} >
                <div className="container-fluid">
                    <div className="d-flex justify-content-between w-100" id="navbarNav" style={{ padding: '12px 65px ' }}>
                        <div>
                            <a className="nav-link active" aria-current="page" onClick={() => navigate('/general/home')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 34 34" fill="none">
                                    <path d="M12 32V22C12 21.1159 12.3512 20.2681 12.9763 19.643C13.6014 19.0179 14.4493 18.6667 15.3333 18.6667H18.6667C19.5507 18.6667 20.3986 19.0179 21.0237 19.643C21.6488 20.2681 22 21.1159 22 22V32M5.33333 17H2L17 2L32 17H28.6667V28.6667C28.6667 29.5507 28.3155 30.3986 27.6904 31.0237C27.0652 31.6488 26.2174 32 25.3333 32H8.66667C7.78261 32 6.93477 31.6488 6.30964 31.0237C5.68452 30.3986 5.33333 29.5507 5.33333 28.6667V17Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                        <div>
                            <a className="nav-link" aria-current="page" onClick={() => navigate('/general/donor/zakath-tracker')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
                                    <path d="M16 3v4" />
                                    <path d="M8 3v4" />
                                    <path d="M4 11h12.5" />
                                    <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                    <path d="M19 21v1m0 -8v1" />
                                </svg>
                            </a>
                        </div>
                        <div>
                            <a className="nav-link" aria-current="page" onClick={() => navigate('/general/home/zakat-calculator')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-math-symbols">
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
                            </a>
                        </div> 
                        <div>
                            <a className="nav-link" aria-current="page" onClick={() => navigate('/general/blog')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 38 38" fill="none">
                                    <path d="M22.1667 4.75V11.0833C22.1667 11.5033 22.3336 11.906 22.6305 12.2029C22.9274 12.4999 23.3302 12.6667 23.7501 12.6667H30.0834M22.1667 4.75H11.0834C10.2436 4.75 9.43811 5.08363 8.84424 5.6775C8.25038 6.27136 7.91675 7.07681 7.91675 7.91667V30.0833C7.91675 30.9232 8.25038 31.7286 8.84424 32.3225C9.43811 32.9164 10.2436 33.25 11.0834 33.25H26.9167C27.7566 33.25 28.5621 32.9164 29.1559 32.3225C29.7498 31.7286 30.0834 30.9232 30.0834 30.0833V12.6667M22.1667 4.75L30.0834 12.6667M14.2501 14.25H15.8334M14.2501 20.5833H23.7501M14.2501 26.9167H23.7501" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                        <div>
                            <a className="nav-link" aria-current="page" onClick={() => navigate('/general/profile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 38 38" fill="none">
                                    <path d="M19.1909 20.235C19.0801 20.2192 18.9376 20.2192 18.8109 20.235C16.0243 20.14 13.8076 17.86 13.8076 15.0575C13.8076 12.1916 16.1193 9.86414 19.0009 9.86414C21.8668 9.86414 24.1943 12.1916 24.1943 15.0575C24.1784 17.86 21.9776 20.14 19.1909 20.235Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M29.6715 30.6852C26.8532 33.266 23.1165 34.8335 18.9998 34.8335C14.8831 34.8335 11.1465 33.266 8.32812 30.6852C8.48646 29.1969 9.43646 27.7402 11.1306 26.6002C15.469 23.7185 22.5623 23.7185 26.869 26.6002C28.5632 27.7402 29.5132 29.1969 29.6715 30.6852Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.9998 34.8333C27.7443 34.8333 34.8332 27.7444 34.8332 19C34.8332 10.2554 27.7443 3.16663 18.9998 3.16663C10.2553 3.16663 3.1665 10.2554 3.1665 19C3.1665 27.7444 10.2553 34.8333 18.9998 34.8333Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar