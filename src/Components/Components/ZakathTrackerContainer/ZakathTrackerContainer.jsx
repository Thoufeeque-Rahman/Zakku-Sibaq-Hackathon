import React from 'react'
import { Col, ProgressBar, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ZakathTrackerContainer.css'
import { Link, useNavigate } from 'react-router-dom';

function ZakathTrackerContainer({ now, tracker }) {

    const navigate = useNavigate();
    return (
        <div className="zakath-tracker-container mx-auto " onClick={() => navigate('/general/donor/zakath-tracker')} style={{ width: '85%', ...(tracker ? { marginTop: '24px' } : { margin: 'auto' }) }}>  
            <div className="zakath-tracker-indic">
                {/* <div className="zakath-tracker-head">
                    <div className="zakath-tracker-head-content d-flex justify-content-between">
                        <div>
                            <p className='fw-bold' style={{ color: '#309A84' }}>Track and Manage your</p>
                        </div>
                        
                    </div>
                </div>
                <div className="zakath-tracker-body">
                    <div className="zakath-tracker-body-content">
                        <Row>
                            <Col>
                                <ProgressBar now={now / 365 * 100} label={Math.round(now / 365 * 100) + '%'} />
                            </Col>
                        </Row>

                        {!tracker && <Row>
                            <Col>
                                <Link className='text-decoration-none' to='/general/donor/zakath-tracker'>
                                    <div className='track-zakath-btn'>
                                        <div className='mt-3 d-flex justify-content-center mx-auto px-3 py-1 fw-bold rounded-5' style={{ color: '#309A84', border: '1px solid', width: 'fit-content', transition: 'all ease-in 0.3s' }} >
                                            <p className='m-0'>Track Zakat</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M5 12l14 0" />
                                                <path d="M15 16l4 -4" />
                                                <path d="M15 8l4 4" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        </Row>}

                    </div>
                </div> */}
                <div className="zakat-calcu-indicator-content d-flex">
                    <div>
                        <p>Zakat</p>
                        <div className="d-flex">
                            <h1>Tracker</h1>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-scale">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M7 20l10 0" />
                                <path d="M6 6l6 -1l6 1" /> 
                                <path d="M12 3l0 17" />
                                <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
                                <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
                            </svg> */}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-line-dashed">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12h2" />
                            <path d="M17 12h2" />
                            <path d="M11 12h2" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right" style={{marginLeft: '-6px'}}>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M15 16l4 -4" />
                            <path d="M15 8l4 4" />
                        </svg>
                    </div>
                    <div>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-calculator">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                            <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                            <path d="M8 14l0 .01" />
                            <path d="M12 14l0 .01" />
                            <path d="M16 14l0 .01" />
                            <path d="M8 17l0 .01" />
                            <path d="M12 17l0 .01" />
                            <path d="M16 17l0 .01" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar">
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
            </div>
        </div>
    )
}

export default ZakathTrackerContainer