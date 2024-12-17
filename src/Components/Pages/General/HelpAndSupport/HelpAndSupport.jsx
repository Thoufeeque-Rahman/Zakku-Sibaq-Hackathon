import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HelpAndSupport.css';
import { Accordion } from 'react-bootstrap';
import tumbnail from '../../../../assets/tumbnail.png';

function HelpAndSupport() {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };
    return (
        <div className="container-box pb-5">
            <div className="help-box">
                <div className="header">
                    <div className="header-text d-flex justify-content-start">
                        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <div>
                            <h1>Help and Support</h1>
                        </div>
                    </div>
                </div>
                <div className="help-body">

                    <div className="help-card">
                        <span className='fs-5' style={{ fontWeight: '600', color: 'var(--primary-color)' }}>New to Zakku? </span>  <br />
                        <span>Start your journey here with beginner-friendly resources that help you and your team work smarter.</span>
                    </div>


                    <div className="vedio">
                        <div className="vedio-head" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <span className='fs-5' style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Video Tutorial</span>
                        </div>
                        <img src={tumbnail} width="100%" height="200" style={{ borderRadius: '10px' }} alt="" />
                        {/* <iframe width="360" height="200" style={{ borderRadius: '10px' }} src="https://www.youtube.com/embed/0tFkcOAzYBg?si=JQtcsR_3a87scgkn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                    </div>


                    {/* <a href="#FAQ">Faq</a>`3333ADAABCDEFGHIJKLMNOPQRSTUVWXYYYZZZZZZZZ */}


                    <div className="help-card question-board mt-3" id='FAQ'>
                        <span className='fs-5' style={{ fontWeight: '600', marginBottom: '10px', color: 'var(--primary-color)' }} >Get your questions answered</span>

                        <Accordion defaultActiveKey="" style={{ boxShadow: 'none', border: '1px solid var(--primary-color)', borderRadius: '22px' }}>
                            <form>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bulb">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                                                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                                                <path d="M9.7 17l4.6 0" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            <p className='mb-0'>What is this app for?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>This app facilitates the collection and distribution of Zakat funds. It connects donors with eligible recipients through a transparent and efficient process, guided by Islamic principles.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart-handshake">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
                                                <path d="M12.5 15.5l2 2" />
                                                <path d="M15 13l2 2" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>How do I donate Zakat through the app?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Simply register as a donor. then, either directly transfer funds to claimants or choose a vakeel from your preferred region, and transfer the amount securely through the app.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-question">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                                <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                                                <path d="M19 22v.01" />
                                                <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>Who is eligible to apply for Zakat?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Claimants must fall under one of the eight categories mentioned in the Quran, such as the poor, the needy, and those in debt.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-text">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                                                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                                                <path d="M9 12h6" />
                                                <path d="M9 16h6" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>How do I apply for Zakat?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Register as a claimant, fill out an application form with the required details, and wait for approval from your mahal.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-list-check">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                                                <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                                                <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                                                <path d="M11 6l9 0" />
                                                <path d="M11 12l9 0" />
                                                <path d="M11 18l9 0" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>What is the 'Three Minimum Rule'?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>This rule states that a donor must pay at least three persons from each available category of claimants.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-headset">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 14v-3a8 8 0 1 1 16 0v3" />
                                                <path d="M18 19c0 1.657 -2.686 3 -6 3" />
                                                <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z" />
                                                <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>What should I do if I encounter a problem with the app?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Contact our support team directly through the app. You can also email us at rahman.am90@gmail.com.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="6">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-free-rights">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                                <path d="M13.867 9.75c-.246 -.48 -.708 -.769 -1.2 -.75h-1.334c-.736 0 -1.333 .67 -1.333 1.5c0 .827 .597 1.499 1.333 1.499h1.334c.736 0 1.333 .671 1.333 1.5c0 .828 -.597 1.499 -1.333 1.499h-1.334c-.492 .019 -.954 -.27 -1.2 -.75" />
                                                <path d="M12 7v2" />
                                                <path d="M12 15v2" />
                                                <path d="M6 6l1.5 1.5" />
                                                <path d="M16.5 16.5l1.5 1.5" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>Is there a fee for using this app?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>No, the app is completely free for all users.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="7">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-key">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M14 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                <path d="M12.5 11.5l-4 4l1.5 1.5" />
                                                <path d="M12 15l-1.5 -1.5" />
                                                <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>How is user data protected?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>We prioritize your privacy and follow strict data protection protocols, including encryption and secure storage.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="8">
                                    <Accordion.Header>
                                        <div className="help-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shield-check">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
                                                <path d="M15 19l2 2l4 -4" />
                                            </svg>
                                        </div>
                                        <div className="help-question-content d-flex align-items-center">
                                            {/* <span className='fs-6 question-head'>Calculate Zakat</span> */}
                                            <p className='mb-0'>Will my personal details be shared with others?</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>No, your information will only be used to process your Zakat transactions and will not be shared with third parties.</p>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </form>
                        </Accordion>


                    </div>
                    {/* <div className="help-card question-board mt-3">
                        <span className='fs-5' style={{ fontWeight: '600', marginBottom: '10px', color: 'var(--primary-color)' }} >Contact Us</span>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-label">Email:</span>
                                <a href="mailto:rahman.am90@gmail.com" className="contact-link">rahman.am90@gmail.com</a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">WhatsApp:</span>
                                <a href="https://wa.me/+966500000000" className="contact-link">+966 500 000 000</a>
                            </div>
                        </div>

                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default HelpAndSupport