// Login.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Col, Modal, ProgressBar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ZakathTrackerContainer from '../../../Components/ZakathTrackerContainer/ZakathTrackerContainer';
import ZakathCalcuIndicator from '../../../Components/ZakathCalcuIndicator/ZakathCalcuIndicator';
import BlogCard from '../../../Components/BlogCard/BlogCard';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import GooglePayButton from '@google-pay/button-react';
import { getMessaging } from "firebase/messaging";




const Home = () => {
    const auth = getAuth();

    
    
    const [show, setShow] = useState(false);
    const [paymentShow, setPaymentShow] = useState(false);
    const [paymentData, setPaymentData] = useState([]);
    const [paymentModalShow, setPaymentModalShow] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        mahal: '',
        selectMahal: '',
        userMode: '',
        file: null,
        filePreview: null
    });

    const user = auth.currentUser;
    const db = getFirestore();


    useEffect(() => {
        window.scrollTo(0, 0);
        if (user) {
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
                            mahal: docSnap.data().mahal,
                            userMode: docSnap.data().userMode
                        }));


                        console.log('Mahal:', docSnap.data().mahal);

                        if (!docSnap.data().mahal) {
                            console.log('Mahal not found');
                            setShow(true);
                        }
                        console.log("Document data:", docSnap.data());

                        // setPaymentData([]); // Clear the data before fetching
                        if (docSnap.data().userMode && docSnap.data().userMode.includes('Donor')) {
                            fetchDonorPaymentData();
                            console.log('Donor');
                        }

                        if (docSnap.data().userMode && docSnap.data().userMode.includes('Claimant')) {
                            fetchClaimantPaymentData();
                            console.log('Claimant');
                        }
                    } else {
                        console.log("No such document!");
                        navigate('/general/profile');
                    }
                }
            };

            const fetchDonorPaymentData = async () => {
                if (user) {
                    const docRef = doc(db, "Donors", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists() && docSnap.data().payments) {

                        console.log("Payment data:", docSnap.data().payments);
                        setPaymentData((prevData) => [...prevData, ...docSnap.data().payments]);
                        setPaymentShow(true);
                    } else {
                        console.log("No such document!");
                    }
                }
            };

            const fetchClaimantPaymentData = async () => {
                if (user) {
                    const docRef = doc(db, "Claimant", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists() && docSnap.data().payments) {
                        console.log("Payment data:", docSnap.data().payments);
                        setPaymentData((prevData) => [...prevData, ...docSnap.data().payments]);
                        setPaymentShow(true);
                    } else {
                        console.log("No such document!");
                    }
                }
            };

            console.log('UserMode' + formData.userMode);

            fetchUserData();
        } else {
            navigate('/getStarted')
        }

    }, []);

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        setFormData({
            selectMahal: '',
        });
    };

    const handleShow = () => {
        setShow(true);
        const date = new Date();
        formData.date = date.toISOString().split('T')[0];
    };

    const handleMahalSubmit = async () => {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
            mahal: formData.selectMahal
        });
        setFormData((prevData) => ({
            ...prevData,
            mahal: formData.selectMahal,
        }));
        setShow(false);
    }

    const handleMahalChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    const sortedPaymentData = Array.isArray(paymentData) && paymentData.length > 0
        ? [...paymentData]
            .filter((payment, index, self) => index === self.findIndex((p) => p.transactionId === payment.transactionId))
            .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
        : [];

    const timeAgo = (timestamp) => {
        const now = new Date();
        const secondsPast = (now.getTime() - timestamp.seconds * 1000) / 1000;

        if (secondsPast < 60) {
            return `${Math.floor(secondsPast)} secs ago`;
        }
        if (secondsPast < 3600) {
            return `${Math.floor(secondsPast / 60)} mins ago`;
        }
        if (secondsPast <= 86400) {
            return `${Math.floor(secondsPast / 3600)} hrs ago`;
        }
        if (secondsPast > 86400) {
            const day = timestamp.toDate().getDate();
            const month = timestamp.toDate().toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
            const year = timestamp.toDate().getFullYear() === now.getFullYear() ? "" : " " + timestamp.toDate().getFullYear();
            return day + " " + month + year;
        }
    };

    const blogPosts = [
        {
            id: 1,
            title: "Zakat: A Path to Economic Balance",
            preview: 'The world’s population has recently surpassed 7.7 billion. Among these, approximately 140 million people live below the international poverty line, with incomes under $1.25 a day.',
            content: `The world’s population has recently surpassed 7.7 billion. Among these, approximately 140 million people live below the international poverty line, with incomes under $1.25 a day. According to the World Institute of Economic Studies, 900 million people go to bed hungry every night. Furthermore, a report by ActionAid International reveals that every six seconds a child dies due to hunger. In some parts of the world, one in eight people is struggling to access sufficient food. UNICEF reports that over 200 million children worldwide are suffering from food scarcity, with over 80 million people facing extreme hunger in African nations such as Somalia, Ethiopia, and Eritrea.<br><br>
            The global issue of hunger and pozverty is growing more dire, especially in regions severely impacted by famine and drought. The recent tragedy in the Mediterranean, where African refugees lost their lives while attempting to cross the sea to Saudi Arabia, highlights the devastating consequences of food insecurity. This grim reality is also evident in North Korea, where 1,200 children die every day, according to UN aid agencies. In Ethiopia alone, famine claimed the lives of 1 million people in 1984-85. Reports show that 10% of Afghanistan's population is affected by famine, and 73 million people worldwide are facing food insecurity.<br><br>
            The fundamental cause of this global crisis is the rapid growth of the population. However, this issue is not solely due to population increase. It is also linked to the concentration of wealth in the hands of a small elite. According to Dr. Susan George, an American scientist, the distribution of wealth is highly imbalanced, with a small percentage of the global population controlling the majority of the world’s assets. The wealthiest nations, such as the United States, France, and the United Kingdom, hoard a disproportionate share of global resources, while poorer countries suffer from severe deprivation.<br><br>
            This growing disparity in wealth and the increasing prevalence of hunger and poverty necessitate solutions to address these inequities. The excess concentration of wealth and its unfair distribution lie at the heart of the problem. Even though the world produces enough resources to meet everyone’s basic needs, the lack of equitable distribution remains a major challenge, as outlined by economic experts such as Bernard Gillett and Roger Wylie.<br><br>
            A key solution to combat poverty and hunger in Islam is the institution of Zakat. Zakat, a mandatory form of charity in Islam, serves as a mechanism for wealth redistribution. The Qur’an emphasizes the importance of Zakat in several verses, reflecting its significance in ensuring the welfare of the underprivileged. Zakat aims to balance the wealth gap, providing for those in need, such as the poor, the orphans, travelers, and others who require financial assistance. It is considered not only a religious obligation but also a social responsibility, aimed at eradicating poverty and promoting economic justice.<br><br>
            Islamic teachings emphasize that wealth should not be hoarded by a few but should circulate within society to benefit everyone. As stated in the Qur’an, wealth should not remain concentrated in the hands of the rich but should be distributed to support those in need. This principle is evident in the teachings of Prophet Muhammad (PBUH), who highlighted the significance of Zakat in numerous Hadiths. Zakat is not merely a religious ritual; it is a means to address societal inequalities, as it ensures that the poor are given their due share of wealth.<br><br>
            The practice of Zakat, along with voluntary charity (Sadaqah), can significantly reduce poverty and hunger. In fact, during the reign of the second caliph, Umar ibn al-Khattab, poverty and hunger were largely eradicated in the Islamic world through the implementation of an equitable economic system. This example demonstrates the effectiveness of Islamic economic principles in creating a just and balanced society.<br><br>
            Moreover, Islam encourages the responsible use of resources and the avoidance of wastefulness. The Prophet Muhammad (PBUH) repeatedly warned against wasteful consumption and emphasized the importance of sharing resources with others. One of the key Hadiths highlights that even a small amount of food should not be wasted, as it may be the only sustenance available for someone in need.<br><br>
            In conclusion, the growing issues of poverty and hunger require systemic change. The Islamic economic framework, centered on principles such as Zakat, provides a viable solution to these problems. By promoting wealth distribution, social responsibility, and resource conservation, Islam offers a pathway to a more equitable and sustainable world. Through the practice of Zakat and the cultivation of generosity and social consciousness, we can work towards eradicating poverty and building a more balanced global economy.
            `,
            imageUrl: 'https://cdn.leonardo.ai/users/fcdd64d6-98ba-4541-aa58-813d5c338dd9/generations/2cccbb0d-917f-4f34-90d6-85dfb2761ded/Leonardo_Phoenix_Depict_a_serene_and_harmonious_scene_illustra_0.jpg'
        }
        ,
        {
            id: 2,
            title: "Zakat: When and To Whom?",
            preview: `Zakat, one of Islam’s five pillars, is as significant as Salah (prayer), with the Qur'an mentioning them together in 28 verses. `,
            content: `Zakat, one of Islam’s five pillars, is as significant as Salah (prayer), with the Qur'an mentioning them together in 28 verses. Made obligatory in the second year of Hijrah (624 CE), Zakat plays a crucial role in wealth distribution and societal welfare. It serves as an incentive for investment, discouraging hoarding by obligating the redistribution of stagnant wealth. This stimulates economic activity, benefits recipients, and uplifts society. The Qur'an emphasizes that Zakat is not voluntary charity but the rightful due of the needy (Qur'an 70:24).<br><br><hr><br>

           <h5> Wealth Subject to Zakat</h5><br>
          <h6><b> 1. Livestock and Agriculture</b></h6>
            Zakat is obligatory on eight types of wealth: livestock (goats, cows, camels), gold, silver, grains, dates, and raisins. However, there is no Zakat on vegetables, fruits, horses, rabbits, chickens, or other food items. Farms producing these items, though, are subject to Zakat. Islam considers producers by imposing Zakat on all their produce, which includes grains such as wheat, barley, millet, corn, and lentils, among others, in recognition of the needs of the poor.<br><br>
            Zakat is obligatory on grain, dates, and raisins only if the yield exceeds 600 Saa’ (1920 liters for produce with husks or 960 liters for huskless). Due to variations in weight, it is impractical to state the exact amount, but Zakat is calculated at 5% if irrigation costs are involved and 10% otherwise.<br><br>
            Zakat is not required on fruits like jackfruit, mango, pineapple, and other fruits, nor on root vegetables such as sweet potatoes, cassava, yams, garlic, mustard, sesame, apples, pumpkin, or squash. Zakat is only applicable to crops that are staples and significant to the economy.<br><br>
            In terms of grains, Zakat is applicable if the yield meets the threshold of 600 Saa’ (1920 liters for husked grains) or 300 Saa’ (960 liters for huskless grains). The amount of Zakat to be given is 5% if irrigation costs were involved and 10% if there were no such costs.<br><br>
          <h6><b>2. Gold, Silver, and Currency</b></h6>
          <ul>
          <li>  Non-ornamental gold meeting or exceeding 85 grams or silver meeting or exceeding 595 grams held for a lunar year are Zakat-liable at 2.5%.</li>
          <li>  Jewelry intended for personal use is generally exempt but becomes liable if stored as an investment.</li>
          <li>  Cash holdings meeting the nisab threshold (often calculated based on silver) are also subject to Zakat, with 2.5% of the total payable annually.</li>
          </ul>
          <h6><b>3. Trade Goods</b></h6>
            Business inventories, goods for sale, and receivables must be valued annually. If their market value exceeds the nisab, 2.5% Zakat is due.<br><br>
          <h6><b>4. Real Estate</b></h6>
          <ul>
           <li><b> Trade Properties:</b> Land intended for resale is subject to Zakat.</li>
           <li><b> Rental Properties:</b> The property itself is exempt, but rental income is Zakat-liable.</li>
           </ul>
           
         <h6><b>   5. Provident Funds and Installments</b></h6>
            Provident funds and recurring payments held for a year and meeting the nisab threshold are Zakat-liable. Advances and security deposits are also subject to Zakat, provided ownership remains with the payer.

            <hr>
            
          <h5>  Liabilities and Zakat</h5>
          <h6><b>1. Debt Management</b></h6>
          <ul>
         <li>   Short-term debts may reduce Zakat liability.</li>
          <li>  Long-term debts do not exempt wealth from Zakat if it meets the nisab.</li>
          </ul>
         <h6><b>2. Sales Proceeds </b></h6>
            Proceeds from assets sold for trade purposes are Zakat-liable if held for a year. Immediate expenses incurred after the sale reduce the amount subject to Zakat.<br><br>
          <h6><b>3. Lost Wealth</b></h6>
            Recovered stolen or lost assets become Zakat-liable retrospectively if they met the nisab during the years of loss.<br><br>

            <hr>
            
          <h5>  Eligible Recipients</h5>
            Islam designates eight categories of individuals as eligible recipients of Zakat, as explicitly mentioned in the Qur'an. These categories include the poor (fuqara), the needy (masakin), Zakat administrators, new Muslims (those whose hearts are to be reconciled), those in bondage (seeking emancipation), individuals burdened with debt, unpaid warriors (fighting in the cause of Allah), and stranded travelers.<br><br>
            Of these, the categories of Zakat administrators, those in bondage, and unpaid warriors are largely absent in contemporary times. It is sufficient to fulfill the Zakat obligation if the funds are distributed to at least three individuals from any of the remaining eligible categories. However, recipients must be Muslims and cannot belong to the Prophet’s family lineage (Banu Hashim and Banu Muttalib).<br><br>
            Additionally, Zakat funds should not be transferred to another locality if eligible recipients are present within one’s own community. In some places, there exists a practice of neighbors mutually exchanging their Zakat. This practice is permissible and considered even more virtuous if both parties qualify as eligible recipients under Islamic guidelines. Otherwise, such exchanges do not fulfill the obligation of Zakat.<br><br>
            
          <h5>  Social Importance of Zakat</h5>
            Zakat ensures the redistribution of wealth, addressing societal imbalances and promoting economic justice. Unlike conventional charity, Zakat is a duty, ensuring that wealth is treated as a trust from Allah. By eliminating poverty, it fosters communal harmony and bridges economic divides.<br><br>
            Islamic economics, with its emphasis on Zakat and prohibition of interest-based systems, prioritizes equity and communal welfare, distinguishing it from systems that perpetuate wealth inequality. Zakat strengthens social bonds, uplifts the underprivileged, and aligns wealth distribution with divine justice.<br><br>
            Zakat remains as relevant today as it was centuries ago, offering a timeless solution to modern economic challenges while fulfilling spiritual and societal obligations.`,
            imageUrl: 'https://cdn.leonardo.ai/users/fcdd64d6-98ba-4541-aa58-813d5c338dd9/generations/7af98400-b262-4958-ac39-f1cd2283d856/Leonardo_Phoenix_Create_an_image_illustrating_the_concept_of_Z_2.jpg'

        },
        {
            id: 3,
            title: 'Distribution of Zakat: Islamic Perspectives and Practical Guidelines',
            preview: `Zakat, one of the Five Pillars of Islam, is not only a mandatory act of worship but also a mechanism to ensure socio-economic balance in society`,
            content: `Zakat, one of the Five Pillars of Islam, is not only a mandatory act of worship but also a mechanism to ensure socio-economic balance in society. Its distribution has been meticulously guided in Islamic jurisprudence to uphold justice and equity. This essay explores the prescribed methods of Zakat distribution, challenges faced in contemporary settings, and the principles that govern equitable allocation.<br><br>
         <h5>   Methods of Zakat Distribution</h5>
            Islam outlines three primary methods for distributing Zakat:
            <ol>
          <li><b>Direct Distribution by the Owner:</b> The individual liable to pay Zakat directly hands it over to the eligible recipient. This method ensures transparency and personal involvement in fulfilling the obligation.</li>
         <li><b>Delegation to a Representative:</b> The Zakat payer appoints a trustworthy individual to distribute it on their behalf. Here, the responsibility is only fulfilled once the representative successfully delivers the Zakat to its rightful recipient.</li>
         <li><b>   Entrusting to the Khalifah:</b> In an Islamic state, Zakat can be entrusted to the Khalifah (ruler), whose role as a divinely appointed representative ensures the fulfillment of this duty.</li>
         </ol>
            While the third method simplifies the process in an Islamic governance system, it is inapplicable in regions without such structures. According to Imam Nawawi, the absence of an Islamic state restricts practical implementation to the first two methods, with direct distribution being the most preferable.<br><br>
          <h5>  Issues with Zakat Committees</h5>
            Modern Zakat committees often fall outside the classical framework of Islamic jurisprudence. A committee, being an impersonal entity, does not align with the prescribed requirement of appointing a specific representative. Instances of mismanagement, such as unutilized Zakat funds lying dormant in committee accounts, highlight the potential inefficiencies of these structures. Such practices contravene the foundational principles of Zakat, which emphasize timely and direct aid to eligible recipients.
            <br><br>
        <h5>    Practical Solutions and Recommendations</h5>
            To address these issues, individuals can collectively manage their Zakat in compliance with Islamic guidelines. After making individual niyyah (intention), they can pool their Zakat funds and personally oversee its distribution or appoint a mutually agreed representative. This approach combines the efficiency of collective action with the accountability of personal responsibility.
            <br><br>
         <h5>   Guidelines for Distribution Among Categories</h5>
            Zakat must be allocated among the eight eligible categories outlined in the Quran (9:60), including the poor, the needy, and those in debt. When distributing Zakat, certain principles must be followed:
            <ol>
         <li><b>Comprehensive Distribution:</b> If sufficient funds are available, Zakat should be distributed to all eight categories.</li>
         <li><b>   Minimum Recipients Per Category:</b> If resources are limited, at least three recipients from each category should be prioritized.</li>
         <li><b>   Equity Between Categories:</b> Funds must be distributed equitably among categories, though equal distribution among individuals within a category is not mandatory.</li>
         </ol>
            Some scholars, including Imam Abu Hanifa, hold that Zakat is discharged if given entirely to a single recipient or category, provided the recipient meets the eligibility criteria.
            <br><br>
         <h5>   Practical Assessment of Recipient Needs</h5>
            Islamic jurisprudence emphasizes tailoring Zakat to the specific needs of recipients. For instance:
            <ul>
          <li>  A poor individual incapable of earning should receive an amount sufficient for their average life expectancy, typically calculated as 60-70 years.</li>
          <li>  An individual capable of work may be provided with the tools or capital necessary to establish sustainable income-generating activities.</li>
          </ul>
            Such meticulous guidelines, recorded in classical texts like Fathul Mu'in and Tuhfah al-Muhtaj, underscore the transformative potential of Zakat in eradicating poverty.
            <br><br>
           <h5> Broader Implications and Responsibilities</h5>
            Beyond Zakat, Islam advocates for collective responsibility (fard kifayah) in addressing poverty. Wealthy individuals bear an obligation to ensure the basic needs of their communities, including food, clothing, and shelter. The surplus wealth they possess after meeting their own necessities is regarded as a trust, with its misuse or hoarding condemned as a moral failure.
            <br><br>
          <h5>  Conclusion</h5>
            The principles of Zakat distribution, rooted in justice and equity, offer a robust framework for poverty alleviation. However, their effective implementation requires adherence to Islamic guidelines and proactive community engagement. In contemporary contexts, re-establishing these principles while addressing systemic inefficiencies is vital for upholding the sanctity of this pillar of Islam. Wealth, when used as a means to uplift others, fulfills its true purpose, enriching not only the giver but the entire society.
            `,
            imageUrl: `https://cdn.leonardo.ai/users/fcdd64d6-98ba-4541-aa58-813d5c338dd9/generations/b3c3d275-48b0-491b-9f5b-bd76212bba85/Leonardo_Phoenix_A_serene_and_elegant_illustration_depicting_t_3.jpg?w=512`

        },
        {
            id: 4,
            title: '',
            preview: ``,
            content: ``,
            imageUrl: ``

        },
        {
            id: 5,
            title: '',
            preview: ``,
            content: ``,
            imageUrl: ``

        },
    ]

    const transferred = () => {
        return (
            <div className="claimant-mahallu ms-auto text-success bg-success-subtle d-flex align-items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                </svg>
                <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transfered</p>
            </div>
        )
    }

    return (
        <div className="container-box">
            <div className="home-box pb-4">
                <div className="home-header">
                    <div className="header-text d-flex justify-content-between">
                        <div>
                            <p>Assalamu Alaikum!</p>
                            {user ? <h1 className='text-wrap'>{formData.name}</h1> : <div className='mb-2' style={{ height: '35px', width: '200%', backgroundColor: '#ffffff82', borderRadius: '12px' }}></div>}
                        </div>
                        {/* <div>
                            <div className="noti-icon" style={{ backgroundColor: 'rgba(217, 217, 217, 0.30)', padding: '8px 10px', borderRadius: '50px', cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
                                    <path d="M11.5893 0.258139C11.7197 0.108154 11.9043 0.016086 12.1025 0.0021638C12.3007 -0.0117584 12.4963 0.0536039 12.6464 0.18389C13.6159 1.02589 14.3949 2.06497 14.9314 3.23186C15.0145 3.41267 15.0224 3.6191 14.9534 3.80575C14.8844 3.99239 14.744 4.14396 14.5633 4.2271C14.3826 4.31025 14.1762 4.31816 13.9897 4.2491C13.8031 4.18004 13.6516 4.03967 13.5685 3.85886C13.1215 2.88565 12.4724 2.0189 11.6643 1.31638C11.5142 1.18604 11.4221 1.00145 11.408 0.803157C11.394 0.604868 11.4592 0.408357 11.5893 0.258139Z" fill="white" />
                                    <path d="M2.357 0.183885C2.50711 0.0533998 2.70289 -0.0120833 2.90127 0.00184111C3.09965 0.0157656 3.28437 0.107957 3.4148 0.258135C3.54523 0.408312 3.61069 0.604174 3.59677 0.802632C3.58285 1.00109 3.4907 1.18589 3.34058 1.31637C2.5325 2.0189 1.88335 2.88564 1.43638 3.85885C1.39643 3.9501 1.33871 4.03248 1.26658 4.10117C1.19445 4.16986 1.10937 4.22348 1.0163 4.25891C0.92323 4.29434 0.824036 4.31086 0.724511 4.30752C0.624986 4.30417 0.527124 4.28103 0.43664 4.23943C0.346157 4.19783 0.264863 4.13861 0.197508 4.06524C0.130152 3.99186 0.0780843 3.90579 0.0443439 3.81206C0.0106034 3.71833 -0.00413312 3.61882 0.0009946 3.51933C0.00612232 3.41984 0.0310116 3.32237 0.0742091 3.23261C0.609984 2.06566 1.3882 1.02633 2.357 0.183885Z" fill="white" />
                                    <path d="M9.1783 12.75C9.82678 12.75 10.1694 13.518 9.73682 14.001C9.45582 14.3156 9.11153 14.5672 8.72652 14.7394C8.34151 14.9115 7.92448 15.0004 7.50276 15C7.08104 15.0004 6.66401 14.9115 6.27901 14.7394C5.894 14.5672 5.54971 14.3156 5.2687 14.001C4.85488 13.539 5.15025 12.8168 5.744 12.7553L5.82647 12.7508L9.1783 12.75Z" fill="white" />
                                    <path d="M7.50275 0.000137328C8.52082 0.000137328 9.38145 0.677381 9.65809 1.60587L9.69257 1.73412L9.69857 1.76637C10.525 2.23279 11.2293 2.88844 11.7536 3.6796C12.278 4.47077 12.6075 5.37495 12.7153 6.31808L12.7363 6.53333L12.7505 6.75007V8.9483L12.7663 9.0503C12.8689 9.60292 13.1746 10.0971 13.6232 10.4355L13.7484 10.5233L13.8698 10.5975C14.5145 10.9628 14.2896 11.922 13.5872 11.9955L13.5002 12H1.50528C0.734602 12 0.465465 10.977 1.13568 10.5975C1.42133 10.4358 1.66814 10.2135 1.85878 9.94622C2.04942 9.67893 2.17927 9.37314 2.23922 9.0503L2.25496 8.94306L2.25571 6.71558C2.30142 5.73599 2.58644 4.78255 3.08582 3.9387C3.58521 3.09485 4.28373 2.38632 5.12025 1.87512L5.30617 1.76562L5.31367 1.73337C5.41972 1.28489 5.66073 0.879757 6.00419 0.572634C6.34765 0.265512 6.77702 0.0711876 7.23436 0.0158871L7.3708 0.00313726L7.50275 0.000137328Z" fill="white" />
                                </svg>
                            </div>
                        </div> */}
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        <div className="user-mahallu d-flex align-items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                            </svg>
                            <p style={{ fontSize: '12px' }} className='ms-2 me-2'>{formData.mahal}</p>
                        </div>
                        {formData.userMode &&
                            <>
                                {formData.userMode.length > 1 ?
                                    <>
                                        {formData.userMode.map((userMode, index) => (
                                            <div key={index} className="user-mahallu d-flex align-items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                                                    <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                                                </svg>

                                                <p style={{ fontSize: '12px' }} className='ms-2 me-2'>{userMode}</p>
                                            </div>
                                        ))}
                                    </>
                                    : <div className="user-mahallu d-flex align-items-center ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user">

                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                                            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                                        </svg>
                                        <p style={{ fontSize: '12px' }} className='ms-2 me-2'>{formData.userMode}</p>
                                    </div>}
                            </>
                        }
                    </div>
                </div>
                <div className="home-body">
                    <ZakathTrackerContainer />
                    <ZakathCalcuIndicator />
                    <div className="donate-and-claimant-container mt-4">
                        <div className="donate-and-claimant-indicator">
                            <div className="donate-and-claimant-indicator-content ">
                                <Row className='gap-2'>
                                    <Col >
                                        <div className='text-center' style={{
                                            background: "#FFF",
                                            borderRadius: "30px",
                                            padding: "30px",
                                            boxShadow: "var(--box-shadow)",
                                            cursor: "pointer",
                                            transition: "all ease   0.3s"
                                        }}
                                            onClick={() => navigate('/general/donor/claimants-list')}
                                        >
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                                <path d="M2 31V27.7778C2 26.0686 2.65555 24.4294 3.82245 23.2209C4.98934 22.0123 6.57199 21.3333 8.22222 21.3333H14.4444C16.0947 21.3333 17.6773 22.0123 18.8442 23.2209C20.0111 24.4294 20.6667 26.0686 20.6667 27.7778V31M22.2222 2.20944C23.5606 2.56437 24.7469 3.37057 25.5941 4.50094C26.4413 5.63131 26.9011 7.02155 26.9011 8.45249C26.9011 9.88344 26.4413 11.2737 25.5941 12.404C24.7469 13.5344 23.5606 14.3406 22.2222 14.6956M30 31V27.7778C29.9921 26.3554 29.5301 24.9757 28.686 23.8538C27.8419 22.7318 26.6631 21.9306 25.3333 21.575M5.11111 8.44444C5.11111 10.1536 5.76666 11.7928 6.93356 13.0014C8.10045 14.2099 9.6831 14.8889 11.3333 14.8889C12.9836 14.8889 14.5662 14.2099 15.7331 13.0014C16.9 11.7928 17.5556 10.1536 17.5556 8.44444C17.5556 6.73527 16.9 5.0961 15.7331 3.88753C14.5662 2.67897 12.9836 2 11.3333 2C9.6831 2 8.10045 2.67897 6.93356 3.88753C5.76666 5.0961 5.11111 6.73527 5.11111 8.44444Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg> */}
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-moneybag">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5z" />
                                                <path d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                            </svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '33px' }} fill='var(--primary-color)' viewBox="0 0 512 512">
                                                {/* <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                                <path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c0 0 0 0 0 0s0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15c0 0 0 0 0 0l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z" /></svg>
                                            <p className='mt-2 m-0 fw-medium' style={{ fontSize: '14px' }}>{formData.userMode.includes('Donor') ? 'Give Zakat' : 'Give Zakat'}</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='text-center ' style={{
                                            background: "#FFF",
                                            borderRadius: "30px",
                                            padding: "30px",
                                            boxShadow: "var(--box-shadow)",
                                            cursor: "pointer",
                                            transition: "all ease   0.3s"
                                        }}
                                            onClick={() => navigate('/general/claimant/dashboard')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="34" viewBox="0 0 32 34" fill="none">
                                                <path d="M2 32V28.6667C2 26.8986 2.78666 25.2029 4.18694 23.9526C5.58721 22.7024 7.48638 22 9.46667 22H16.9333M18.8 28.6667L22.5333 32L30 25.3333M5.73333 8.66667C5.73333 10.4348 6.52 12.1305 7.92027 13.3807C9.32054 14.631 11.2197 15.3333 13.2 15.3333C15.1803 15.3333 17.0795 14.631 18.4797 13.3807C19.88 12.1305 20.6667 10.4348 20.6667 8.66667C20.6667 6.89856 19.88 5.20286 18.4797 3.95262C17.0795 2.70238 15.1803 2 13.2 2C11.2197 2 9.32054 2.70238 7.92027 3.95262C6.52 5.20286 5.73333 6.89856 5.73333 8.66667Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className='mt-2 m-0 fw-medium' style={{ fontSize: '14px' }}>{formData.userMode.includes('Claimant') ? 'Claimant Dash' : 'Get Zakat'}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className="recent-activities-container mt-4">
                        <div className="recent-activities">
                            <div className="recent-activities-head">
                                <div className="recent-activities-head-content d-flex justify-content-between">
                                    <div>
                                        <p className='fw-semibold' style={{ color: '' }}>Recent Zakat Payments</p>
                                    </div>
                                    <div>
                                        <p className='fw-bold text-muted veiwAll' onClick={() => setPaymentModalShow(true)} style={{ fontSize: "13px" }}>View All</p>
                                    </div>
                                </div>
                                <div className="recent-activities-body">
                                    {paymentShow ?
                                        <>
                                            {sortedPaymentData.slice(0, 3).map((payment, index) => {
                                                return <div key={index} className='d-flex justify-content-between mb-2'>
                                                    <div className='d-flex gap-2'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none">
                                                                <ellipse cx="20.6565" cy="20.5" rx="20.6565" ry="20.5" fill="#E5F8F6" />
                                                                <path d="M33.8016 27.0808V19.1631H8.76343V27.0808C8.76343 28.4807 9.29102 29.8233 10.2301 30.8132C11.1692 31.8031 12.443 32.3593 13.7711 32.3593H28.794C30.1221 32.3593 31.3958 31.8031 32.3349 30.8132C33.274 29.8233 33.8016 28.4807 33.8016 27.0808Z" stroke="#309A84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M32.3349 12.7914C31.3958 11.8015 30.1221 11.2454 28.794 11.2454H13.7711C12.443 11.2454 11.1692 11.8015 10.2301 12.7914C9.29102 13.7813 8.76343 15.1239 8.76343 16.5238H33.8016C33.8016 15.1239 33.274 13.7813 32.3349 12.7914Z" stroke="#309A84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className='m-0 fw-semibold' style={{ fontSize: '12px' }} >Zakath Payment</p>
                                                            <p className='m-0 fw-semibold text-muted' style={{ fontSize: '12px' }} >₹{payment.paidAmount} {payment.donorId === user.uid && payment.claimantId ? 'zakat paid to Claimant' : payment.donorId === user.uid && payment.vakeelId ? 'zakat paid to Vakeel' : null} {payment.claimantId === user.uid && 'zakath got form Donor'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-1 d-flex align-items-center">
                                                        {payment.donorId === user.uid && payment.vakeelId && payment.transferred && <div className="claimant-mahallu mx-auto text-success bg-success-subtle d-flex p-1 align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                                            </svg>
                                                            {/* <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transfered</p> */}
                                                        </div>}
                                                        {payment.donorId === user.uid && !payment.vakeelId && <div className="claimant-mahallu mx-auto text-success bg-success-subtle d-flex p-1 align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                                            </svg>
                                                            {/* <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transfered</p> */}
                                                        </div>}
                                                        {payment.donorId === user.uid && payment.vakeelId && !payment.transferred && <div className="claimant-mahallu mx-auto d-flex align-items-center text-warning-emphasis p-1 bg-warning-subtle">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock ms-auto">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                                                            </svg>
                                                            {/* <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Not Trasnf</p> */}
                                                        </div>}
                                                    </div>
                                                    <div className='col-2'>
                                                        <p className='m-0 fw-semibold text-muted' style={{ fontSize: '12px' }}>{timeAgo(payment.timestamp)}</p>
                                                    </div>
                                                </div>
                                            })}
                                        </>
                                        :
                                        <h3 className='text-muted text-center fs-6'>No activity</h3>
                                    }
                                </div>
                            </div>
                        </div>
                        <Modal show={paymentModalShow} onHide={() => setPaymentModalShow(false)} centered>
                            <Modal.Header closeButton >
                                <Modal.Title>Recent Zakat Payments History</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {sortedPaymentData.map((payment, index) => {
                                    return <div key={index} className='d-flex justify-content-between mb-2'>
                                        <div className='d-flex gap-2 w-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none">
                                                    <ellipse cx="20.6565" cy="20.5" rx="20.6565" ry="20.5" fill="#E5F8F6" />
                                                    <path d="M33.8016 27.0808V19.1631H8.76343V27.0808C8.76343 28.4807 9.29102 29.8233 10.2301 30.8132C11.1692 31.8031 12.443 32.3593 13.7711 32.3593H28.794C30.1221 32.3593 31.3958 31.8031 32.3349 30.8132C33.274 29.8233 33.8016 28.4807 33.8016 27.0808Z" stroke="#309A84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M32.3349 12.7914C31.3958 11.8015 30.1221 11.2454 28.794 11.2454H13.7711C12.443 11.2454 11.1692 11.8015 10.2301 12.7914C9.29102 13.7813 8.76343 15.1239 8.76343 16.5238H33.8016C33.8016 15.1239 33.274 13.7813 32.3349 12.7914Z" stroke="#309A84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className='w-100'>
                                                <p className='m-0 fw-semibold' style={{ fontSize: '12px' }} >Zakath Payment</p>

                                                <p className='m-0 fw-semibold text-muted' style={{ fontSize: '12px' }} >₹{payment.paidAmount} {payment.donorId === user.uid && payment.claimantId ? 'zakat paid to ' + payment.claimantName : payment.donorId === user.uid && payment.vakeelId ? 'zakat paid to Vakeel ' + payment.vakeelName : null} {payment.claimantId === user.uid && 'zakath got form Donor'}</p>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex align-items-center">
                                            {payment.donorId === user.uid && payment.vakeelId && payment.transferred && <div className="claimant-mahallu mx-auto text-success bg-success-subtle d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                                </svg>
                                                <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transferred <br /> to Claimant</p>
                                            </div>}
                                            {payment.donorId === user.uid && !payment.vakeelId && <div className="claimant-mahallu mx-auto text-success bg-success-subtle d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                                </svg>
                                                <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transferred <br /> to Claimant</p>
                                            </div>}
                                            {payment.donorId === user.uid && payment.vakeelId && !payment.transferred && <div className="claimant-mahallu mx-auto d-flex align-items-center text-warning-emphasis bg-warning-subtle">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clock ms-auto">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                                                </svg>
                                                <p style={{ fontSize: '12px' }} className='ms-1 me-1 mb-0'>Transferred <br /> to Vakeel</p>
                                            </div>}

                                        </div>
                                        <div className='col-2'>
                                            <p className='m-0 fw-semibold text-muted' style={{ fontSize: '12px' }}>{timeAgo(payment.timestamp)}</p>
                                        </div>
                                    </div>
                                })}
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className="latest-blog-container mt-4">
                        <div className="latest-blog-box">
                            <div className="latest-blog-head pt-3">
                                <div className="latest-blog-head-content px-2 d-flex justify-content-between">
                                    <div>
                                        <p className='fw-semibold' style={{ color: '' }}>Latest Blog</p>
                                    </div>
                                    <div>
                                        <p className='fw-bold text-muted veiwAll' onClick={() => navigate('/general/blog')} style={{ fontSize: "13px" }}>View All</p>

                                    </div>
                                </div>
                            </div>
                            <div className="latest-blog-body">
                                {blogPosts.slice(0, 2).map((post) => (
                                    <BlogCard
                                        key={post.id}
                                        post={post}
                                    />
                                ))}
                                {/* <BlogCard image={false} />
                                <BlogCard image={true} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="quick-links-container mt-4">
                        <div className="quick-links-box">
                            <div className="quick-links-head">
                                <div className="quick-links-head-content d-flex justify-content-between">
                                    <div>
                                        <p className='fw-semibold' style={{ color: '' }}>Quick Links</p>
                                    </div>
                                    {/* <div>
                                        <p className='fw-bold text-muted' style={{ fontSize: "13px" }}>View All</p>
                                    </div> */}
                                </div>
                            </div>
                            <div className="quick-links-body">
                                <div className="quick-links-card">
                                    <Link className='text-decoration-none' to='/general/donor/zakath-tracker'>
                                        <div className="quick-links-card-content d-flex justify-content-between px-5">
                                            <div className='rounded-circle' style={{ backgroundColor: '#E5F8F6', padding: '8px 10px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
                                                    <path d="M16 3v4" />
                                                    <path d="M8 3v4" />
                                                    <path d="M4 11h12.5" />
                                                    <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                                    <path d="M19 21v1m0 -8v1" />
                                                </svg>
                                            </div>
                                            <div className='align-items-center'>
                                                <p className='fw-semibold text-muted mt-2 ms-2 mb-0'>Track Zakat</p>
                                            </div>
                                            <div className='ms-auto'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                    <path d="M1 1.79395L7 7.50118L1 13.2084" stroke="#8E8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="quick-links-card mt-4">
                                    <Link className='text-decoration-none' to='/general/donor/claimants-list'>
                                        <div className="quick-links-card-content d-flex justify-content-between px-5">
                                            <div className='rounded-circle' style={{ backgroundColor: '#E5F8F6', padding: '8px 10px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 33" fill="none">
                                                    <path d="M2 31V27.7778C2 26.0686 2.65555 24.4294 3.82245 23.2209C4.98934 22.0123 6.57199 21.3333 8.22222 21.3333H14.4444C16.0947 21.3333 17.6773 22.0123 18.8442 23.2209C20.0111 24.4294 20.6667 26.0686 20.6667 27.7778V31M22.2222 2.20944C23.5606 2.56437 24.7469 3.37057 25.5941 4.50094C26.4413 5.63131 26.9011 7.02155 26.9011 8.45249C26.9011 9.88344 26.4413 11.2737 25.5941 12.404C24.7469 13.5344 23.5606 14.3406 22.2222 14.6956M30 31V27.7778C29.9921 26.3554 29.5301 24.9757 28.686 23.8538C27.8419 22.7318 26.6631 21.9306 25.3333 21.575M5.11111 8.44444C5.11111 10.1536 5.76666 11.7928 6.93356 13.0014C8.10045 14.2099 9.6831 14.8889 11.3333 14.8889C12.9836 14.8889 14.5662 14.2099 15.7331 13.0014C16.9 11.7928 17.5556 10.1536 17.5556 8.44444C17.5556 6.73527 16.9 5.0961 15.7331 3.88753C14.5662 2.67897 12.9836 2 11.3333 2C9.6831 2 8.10045 2.67897 6.93356 3.88753C5.76666 5.0961 5.11111 6.73527 5.11111 8.44444Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className='align-items-center'>
                                                <p className='fw-semibold text-muted mt-2 ms-2 mb-0'>Register as Donor</p>
                                            </div>
                                            <div className='ms-auto'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                    <path d="M1 1.79395L7 7.50118L1 13.2084" stroke="#8E8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="quick-links-card mt-4">
                                    <Link className='text-decoration-none' to='/general/claimant/apply'>
                                        <div className="quick-links-card-content d-flex justify-content-between px-5">
                                            <div className='rounded-circle' style={{ backgroundColor: '#E5F8F6', padding: '8px 10px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 34" fill="none">
                                                    <path d="M2 32V28.6667C2 26.8986 2.78666 25.2029 4.18694 23.9526C5.58721 22.7024 7.48638 22 9.46667 22H16.9333M18.8 28.6667L22.5333 32L30 25.3333M5.73333 8.66667C5.73333 10.4348 6.52 12.1305 7.92027 13.3807C9.32054 14.631 11.2197 15.3333 13.2 15.3333C15.1803 15.3333 17.0795 14.631 18.4797 13.3807C19.88 12.1305 20.6667 10.4348 20.6667 8.66667C20.6667 6.89856 19.88 5.20286 18.4797 3.95262C17.0795 2.70238 15.1803 2 13.2 2C11.2197 2 9.32054 2.70238 7.92027 3.95262C6.52 5.20286 5.73333 6.89856 5.73333 8.66667Z" stroke="#309A84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className='align-items-center'>
                                                <p className='fw-semibold text-muted mt-2 ms-2 mb-0'>Apply as Claimant</p>
                                            </div>
                                            <div className='ms-auto'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                    <path d="M1 1.79395L7 7.50118L1 13.2084" stroke="#8E8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} centered>

                    <Modal.Body>

                        <div className="income-form">
                            <p className='text-danger fw-medium text-center' style={{ fontSize: '13px' }}>You didn't selected your Mahal, Please enter Mahal name.</p>
                            <div className="form-group w-100">
                                <label htmlFor="exampleInputPassword1">Mahal Name</label>
                                <input type="text" value={formData.selectMahal} onChange={handleMahalChange} className="form-control" id="selectMahal" name='selectMahal' />
                            </div>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                                <Button style={{
                                    border: '1px solid var(--primary-color)',
                                    backgroundColor: 'var(--primary-color)',
                                    borderRadius: '50px',
                                    padding: '5px 20px',
                                    boxShadow: 'none',
                                    transition: 'all 0.3s',
                                }} onClick={handleMahalSubmit}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );
};

export default Home;
