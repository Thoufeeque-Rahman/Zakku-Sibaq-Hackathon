import React, { useEffect, useState } from 'react'
import './ZakathCalculator.css'
import { Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function ZakathCalculator() {

    const auth = getAuth()
    const user = auth.currentUser

    const [formData, setFormData] = useState({
        TFCaratGold: '',
        TFpricePerGram: '',
        TTCaratGold: '',
        TTpricePerGram: '',
        OECaratGold: '',
        OEpricePerGram: '',
        SilverWeight: '',
        SpricePerGram: '',
        CIH: '',
        CISA: '',
        CICA: '', 
        CFD: '',
        PLEstimate: '',
        LRF: '',
        IGB: '',
        IPP: '',
        VSBMF: '',
        GSDA: '',
        IPCF: '',
        PSD: '',
        OSW: '',
        VSS: '',
        VDS: '',
        ARCS: '',

        CRS: '',
        YLF: '',
        WCY: '',
        APBSD: ''


    });

    var TVSB = 0;
    var TVSPF = 0;
    TVSB = (parseInt(formData.VSS) || 0) + (parseInt(formData.ARCS) || 0);
    TVSPF = (parseInt(formData.CRS) || 0) + (parseInt(formData.YLF) || 0) - (parseInt(formData.WCY) || 0) + (parseInt(formData.APBSD) || 0);

    const [zakat, setZakat] = useState(0);
    const [totalWealth, setTotalWealth] = useState(0);
    useEffect(() => {
        const totalWealth = calculateTotalZakat();
        setTotalWealth(totalWealth);
    }, [formData]);

    const silverPrice = formData.SpricePerGram || 0;
    const nisabAmount = 595 * silverPrice;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);

    };

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", "goldapi-1nbh9jsm3soh0dz-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };

    const calculateTotalZakat = () => {
        const excludedFields = [
            'TFCaratGold',
            'TFpricePerGram',
            'TTCaratGold',
            'TTpricePerGram',
            'OECaratGold',
            'OEpricePerGram',
            'SilverWeight',
            'SpricePerGram',
            'VSS',
            'VDS',
            'ARCS',
        ];

        const totalWealth = Object.keys(formData).reduce((acc, key) => {
            if (excludedFields.includes(key)) {
                return acc;
            }
            return acc + parseFloat(formData[key] || 0);
        }, 0);

        // Calculate the value of gold
        const TFCaratGold = (parseFloat(formData.TFCaratGold || 0) * parseFloat(formData.TFpricePerGram || 0));
        const TTCaratGold = (parseFloat(formData.TTCaratGold || 0) * parseFloat(formData.TTpricePerGram || 0));
        const OECaratGold = (parseFloat(formData.OECaratGold || 0) * parseFloat(formData.OEpricePerGram || 0));
        const goldValue = TFCaratGold + TTCaratGold + OECaratGold + parseFloat(formData.OgvEstimate || 0);
        const silverValue = (parseFloat(formData.SilverWeight || 0) * parseFloat(formData.SpricePerGram || 0));
        // Add the gold value to the total wealth
        const totalWithGold = totalWealth + goldValue + silverValue + TVSB + TVSPF;

        console.log('Total Wealth:', totalWithGold);

        const zakat = totalWithGold * 0.025; // 2.5% zakat

        setZakat(zakat);
        // setTotalWithGold(totalWithGold);

        // return zakat, totalWithGold;
        return totalWealth;
    };

    const totalGold = (parseFloat(formData.TFCaratGold || 0) + ((parseFloat(formData.TTCaratGold || 0) * 91.6 / 100) + (parseFloat(formData.OECaratGold || 0) * 75 / 100)));
    const TFCaratGold = (parseFloat(formData.TFCaratGold || 0) * parseFloat(formData.TFpricePerGram || 0));
    const TTCaratGold = (parseFloat(formData.TTCaratGold || 0) * parseFloat(formData.TTpricePerGram || 0));
    const OECaratGold = (parseFloat(formData.OECaratGold || 0) * parseFloat(formData.OEpricePerGram || 0));
    const totalGoldValue = TFCaratGold + TTCaratGold + OECaratGold + parseFloat(formData.OgvEstimate || 0);

    const totalSilver = (formData.SilverWeight * 92.5 / 100);
    const totalSilverValue = (parseFloat(formData.SilverWeight || 0) * parseFloat(formData.SpricePerGram || 0));

    const payZakat = () => {
        if (user) {
            navigate('/general/donor/claimants-list')

        } else {
            navigate('/general/login')
            console.log('Please login to pay Zakat')
        }
    }

        
    return (
        <>
            <div className="container-box">
                <div className="zakat-calculator-box">
                    <div className="header">
                        <div className="header-text d-flex justify-content-start">
                            <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l14 0" />
                                <path d="M5 12l6 6" />
                                <path d="M5 12l6 -6" />
                            </svg>
                            <div>
                                <h1>Zakat Calculator</h1>
                            </div>

                        </div>
                    </div>
                    <div className="zakat-calculator-body pb-5">
                        <Accordion defaultActiveKey="">
                            <form>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>GOLD</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>24 Carat Gold/Jewelry</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.TFCaratGold}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="TFCaratGold"
                                                    name='TFCaratGold'
                                                    placeholder='Weight in Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <input
                                                    type="number"
                                                    value={formData.TFpricePerGram}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="TFpricePerGram"
                                                    name='TFpricePerGram'
                                                    placeholder='Price per Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />

                                                <p className='mb-0'>Estimated Value: <strong style={{ color: 'var(--text-color)' }}>₹{formData.TFCaratGold * formData.TFpricePerGram}</strong></p>
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>22 Carat Gold/Jewelry</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.TTCaratGold}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="TTCaratGold"
                                                    name='TTCaratGold'
                                                    placeholder='Weight in Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <input
                                                    type="number"
                                                    value={formData.TTpricePerGram}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="TTpricePerGram"
                                                    name='TTpricePerGram'
                                                    placeholder='Price per Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <p className='mb-0'>Estimated Value: <strong style={{ color: 'var(--text-color)' }}>₹{formData.TTCaratGold * formData.TTpricePerGram}</strong></p>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className='fw-medium'>18 Carat Gold/Jewelry</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.OECaratGold}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="OECaratGold"
                                                    name='OECaratGold'
                                                    placeholder='Weight in Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <input
                                                    type="number"
                                                    value={formData.OEpricePerGram}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="OEpricePerGram"
                                                    name='OEpricePerGram'
                                                    placeholder='Price per Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <p className='mb-0'>Estimated Value: <strong style={{ color: 'var(--text-color)' }}>₹{formData.OECaratGold * formData.OEpricePerGram}</strong></p>
                                            </div>
                                        </div>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </form>
                        </Accordion>
                        <div className="zakth-card mt-2 mb-4 py-4" style={{ background: '#E5F8F6' }}>
                            <div className="">
                                <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>ZAKAT ON GOLD</p>
                                <p className='mb-0'>Total pure Gold you have: <strong style={{ color: 'var(--text-color)' }}>{totalGold.toFixed(2)} gms</strong></p>
                                <p className='mb-0'>Zakat on Gold: <strong style={{ color: totalGold >= 85 && totalGoldValue === 0 ? '#dc3545' : 'var(--text-color)' }}>{totalGold >= 85 && totalGoldValue !== 0 ? (totalGoldValue * 0.025).toFixed(2) : totalGold >= 85 && totalGoldValue === 0 ? '* fill the price input' : '₹ 0.00'}</strong></p>
                            </div>
                        </div>
                        <Accordion>
                            <form>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>SILVER</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className=''>
                                            <p className='fw-medium'>Include Household Silver Utensils, Artefacts, and Jewelery.</p>
                                            <div className="form-group gap-1 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.SilverWeight}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="SilverWeight"
                                                    name='SilverWeight'
                                                    placeholder='Weight in Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <input
                                                    type="number"
                                                    value={formData.SpricePerGram}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="SpricePerGram"
                                                    name='SpricePerGram'
                                                    placeholder='Price per Gram'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <p className='mb-0'>Estimated Value: <strong style={{ color: 'var(--text-color)' }}>₹{formData.SilverWeight * formData.SpricePerGram}</strong></p>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </form>
                        </Accordion>
                        <div className="zakth-card mt-2 mb-4 py-4" style={{ background: '#E5F8F6' }}>
                            <div>
                                <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>ZAKAT ON SILVER</p>
                                <p className='mb-0'>Total pure Silver you have: <strong style={{ color: 'var(--text-color)' }}>{totalSilver.toFixed(2)} gms</strong></p>
                                <p className='mb-0'>Zakat on Silver: <strong style={{ color: totalSilver >= 595 && totalSilverValue === 0 ? '#dc3545' : 'var(--text-color)' }}>{totalSilver >= 595 && totalSilverValue !== 0 ? '₹ ' + (totalSilverValue * 0.025).toFixed(2) : totalSilver >= 595 && totalSilverValue === 0 ? '* fill the price input' : '₹ 0.00'}</strong></p>
                            </div>
                        </div>
                        <Accordion defaultActiveKey="0">
                            <form>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <p className='fw-medium mb-0' style={{ color: '#000', fontSize: '14px' }}>* Enter today's rate of 1 gm of silver in your city/Nearest city to calculate Zakat</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="form-group gap-1 w-100">
                                            <input
                                                type="number"
                                                value={formData.SpricePerGram}
                                                onChange={handleChange}
                                                className="form-control mb-2"
                                                id="SpricePerGram"
                                                name='SpricePerGram'
                                                placeholder='Enter silver price per gram'
                                                onWheel={(e) => e.target.blur()}
                                            />

                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>CASH IN HAND/BANK</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Cash in Hand</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.CIH}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="CIH"
                                                    name='CIH'
                                                    placeholder='Actual Value'

                                                    onWheel={(e) => e.target.blur()} />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Cash in Savings Account</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.CISA}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="CISA"
                                                    name='CISA'
                                                    placeholder='Actual Value'

                                                    onWheel={(e) => e.target.blur()} />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Cash in Current Account</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.CICA}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="CICA"
                                                    name='CICA'
                                                    placeholder='Actual Value'

                                                    onWheel={(e) => e.target.blur()} />
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className='fw-medium'>Cash held in Fixed Deposits</p>
                                            <div className="form-group gap-1 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.CFD}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="CFD"
                                                    name='CFD'
                                                    placeholder='Actual Value'

                                                    onWheel={(e) => e.target.blur()} />
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>LAND PROPERTY</p>
                                    </Accordion.Header>
                                    <Accordion.Body>

                                        <div className=''>
                                            <p className='fw-medium'>Plots of land held for sale (Market value on Zakat Due Date)</p>
                                            <div className="form-group gap-1 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.PLEstimate}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="PLEstimate"
                                                    name='PLEstimate'
                                                    placeholder='Estimated Value'

                                                    onWheel={(e) => e.target.blur()} />
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>INVESTMENT IN SHARES / BONDS/  MUTUAL FUNDS / LOANS / ADVANCES/ SECURITY DEPOSITS, ETC.</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Value of Shares/Bonds/Mutual Funds. Take the market value on Zakat Due Date</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.VSBMF}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="VSBMF"
                                                    name='VSBMF'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Investment in Govt Bonds, PSU Bonds, Corporate Bonds</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.IGB}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="IGB"
                                                    name='IGB'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Loans Receivable from Friends and Relatives / Security Deposits / Advances</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.LRF}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="LRF"
                                                    name='LRF'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Insurance Premiums paid including bonus up to date</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.IPP}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="IPP"
                                                    name='IPP'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Government Security Deposits, ADRs, etc</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.GSDA}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="GSDA"
                                                    name='GSDA'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Investment in Private Chits, Funds, etc</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.IPCF}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="IPCF"
                                                    name='IPCF'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Postal Savings/Deposits</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.PSD}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="PSD"
                                                    name='PSD'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className='fw-medium'>Other Sources of Wealth</p>
                                            <div className="form-group gap-1 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.OSW}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="OSW"
                                                    name='OSW'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>BUSINESS</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Value of Saleable Stock</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.VSS}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="VSS"
                                                    name='VSS'
                                                    placeholder='Estimated Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Value of Damaged/Dead Stock</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.VDS}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="VDS"
                                                    name='VDS'
                                                    placeholder='Estimated Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div> */}
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Amount Receivable from Credit Sales</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.ARCS}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="ARCS"
                                                    name='ARCS'
                                                    placeholder='Estimated Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <p className='mb-0'>Total Value of Stock: <strong style={{ color: 'var(--text-color)' }}>₹{TVSB}</strong></p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                {/* <Accordion.Item eventKey="6">
                                    <Accordion.Header>
                                        <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>ZAKAT ON SHARE IN PARTNERSHIP FIRMS</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Capital, Reserves and Surplus as per last balance Sheet (your share)</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.CRS}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="CRS"
                                                    name='CRS'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Your Loan to the Firm as on Zakat Due Date</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.YLF}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="YLF"
                                                    name='YLF'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>LESS:  Withdrawals made by you during the current year</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.WCY}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="WCY"
                                                    name='WCY'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 border-bottom border-2'>
                                            <p className='fw-medium'>Accumulated Profit from the date of Balance Sheet to this Date (Estimate the Profit Value as it is difficult to get exact figures in the middle of Accounting Year)</p>
                                            <div className="form-group gap-1 mb-3 w-100">
                                                <input
                                                    type="number"
                                                    value={formData.APBSD}
                                                    onChange={handleChange}
                                                    className="form-control mb-2"
                                                    id="APBSD"
                                                    name='APBSD'
                                                    placeholder='Actual Value'
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                            </div>
                                        </div>
                                        <p className='mb-0'>Total Value of Stock: <strong style={{ color: 'var(--text-color)' }}>₹{TVSPF}</strong></p>
                                    </Accordion.Body>
                                </Accordion.Item> */}
                            </form>
                        </Accordion>
                        <div className="zakth-card mt-2 mb-4 py-4" style={{ background: '#E5F8F6' }}>
                            <div className="">
                                <p className='fw-bold mb-0' style={{ color: 'var(--primary-color)' }}>ZAKAT ON WEALTH</p>
                                <p className='mb-0'>Total Wealth you have: <strong style={{ color: 'var(--text-color)' }}>{(totalWealth + TVSB).toFixed(2)}</strong></p>
                                <p className='mb-0'>Zakat on Wealth: <strong style={{ color: (totalWealth + TVSB) >= nisabAmount && nisabAmount === 0 ? '#dc3545' : 'var(--text-color)' }}>{(totalWealth + TVSB) >= nisabAmount && nisabAmount !== 0 ? '₹ ' + ((totalWealth + TVSB) * 0.025).toFixed(2) : (totalWealth + TVSB) >= nisabAmount && nisabAmount === 0 ? '* fill the silver price input' : '₹ 0.00'}</strong></p>
                            </div>
                        </div>
                        <div className="zakth-card mt-2 mb-4 py-2" style={{ background: 'var(--primary-color)', color: '#fff', display: ((totalGoldValue * 0.025) + (totalSilverValue * 0.025) + ((totalWealth + TVSB) * 0.025)).toFixed(2) <= 0 && 'hidden' }} onClick={payZakat}>
                            <div className="">
                                <p className='fw-bold fs-5 mb-0 text-center' style={{ color: '#fff' }}>Pay Zakat: {(totalWealth + TVSB) >= nisabAmount && nisabAmount !== 0 ? '₹ ' + ((totalWealth + TVSB) * 0.025).toFixed(2) : (totalWealth + TVSB) >= nisabAmount && nisabAmount === 0 ? '₹ 0.0' : '₹ 0.00'}</p>
                                {/* <p className='mb-0'>Total Wealth you have: <strong style={{ color: 'var(--text-color)' }}>{totalWealth.toFixed(2)}</strong></p>
                                <p className='mb-0'>Zakat on Wealth: <strong style={{ color: totalWealth >= nisabAmount && nisabAmount === 0 ? '#dc3545' : 'var(--text-color)' }}>{totalWealth >= nisabAmount && nisabAmount !== 0 ? '₹ ' + (totalWealth * 0.025).toFixed(2) : totalWealth >= nisabAmount && nisabAmount === 0 ? '* fill the silver price input' : '₹ 0.00'}</strong></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default ZakathCalculator