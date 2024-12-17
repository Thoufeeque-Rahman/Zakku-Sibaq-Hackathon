import React from 'react'
import './ZakathCalcuIndicator.css'
import { useNavigate } from 'react-router-dom'

function ZakathCalcuIndicator() {

    const navigate = useNavigate();

    return (
        <div className="zakat-calcu-indica-container mt-4  mx-auto" onClick={() => navigate('zakat-calculator')} style={{ width: '85%' }}>
            <div className="zakat-calcu-indicator">
                <div className="zakat-calcu-indicator-content d-flex">
                    <div>
                        <p>Zakat</p>
                        <div className="d-flex">
                            <h1>Calculator</h1>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-math-symbols">
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
            </div>
        </div>
    )
}

export default ZakathCalcuIndicator