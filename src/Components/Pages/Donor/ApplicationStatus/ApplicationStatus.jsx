import React, { useEffect, useState } from 'react'
import './ApplicationStatus.css'
import { ProgressBar, Row, Col } from 'react-bootstrap'
import BlogCard from '../../../Components/BlogCard/BlogCard'
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

function ApplicationStatus({ now }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        mahal: '',
        status: '',
    });
    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    useEffect(() => {
        const fetchDonorData = async () => {
            if (user) {
                setFormData((prevData) => ({
                    ...prevData,
                    name: user.displayName,
                    email: user.email
                }));

                const docRef = doc(db, "Donors", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData((prevData) => ({
                        ...prevData,
                        phone: docSnap.data().phone,
                        mahal: docSnap.data().mahal,
                        status: docSnap.data().status,
                    }));
                    console.log("Document data:", docSnap.data());
                    console.log(formData.status);
                    if (docSnap.data().status === 'approved') {
                        console.log(formData.status);
                        navigate('/general/home');
                    }
                } else {
                    console.log("No such document!");
                }
            }

        };
        console.log(formData);

        fetchDonorData();
    }, []);

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
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
    
    return (
        <div className="container-box pb-5">
            <div className="application-status-box">
                <div className="header">
                    <div className="header-text d-flex justify-content-start">
                        <svg onClick={handleBackClick} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <div>
                            <h1>Application Status</h1>
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
                </div>
                <div className="application-status-body">
                    <div className="application-card">
                        <h6>Donor Application Status</h6>
                        {formData.status === 'pending' &&
                            <div className="status d-flex mt-3">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock  ms-auto">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="#ffc1073f" />
                                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                        <path d="M12 7v5l3 3" />
                                    </svg>
                                </div>
                                <h1 className='fs-2 mt-1' style={{ color: '#ffc107' }}>Pending</h1>
                            </div>
                        }
                        {formData.status === 'rejected' && <>
                            <div className="status d-flex mt-3">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock  ms-auto">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="#dc35453f" />
                                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                        <path d="M12 7v5l3 3" />
                                    </svg>
                                </div>
                                <h1 className='fs-2 mt-1' style={{ color: '#dc3545' }}>Rejected</h1>
                            </div>
                            <div className="claimant-mahallu bg-primary-subtle text-primary w-100 text-center mt-3 d-flex justify-content-center align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rotate">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
                                </svg>
                                <p style={{ fontSize: '13px' }} className='ms-1 me-1 mb-0 fs-6 fw-medium'>Retry</p>
                            </div>
                        </>}

                    </div>
                    <div className="latest-blog-container mt-4">
                        <div className="latest-blog-box">
                            <div className="latest-blog-head pt-3">
                                <div className="latest-blog-head-content px-2 d-flex justify-content-between">
                                    <div>
                                        <p className='fw-semibold' style={{ color: '' }}>Latest Blog</p>
                                    </div>
                                    <div>
                                        <p className='fw-bold text-muted' style={{ fontSize: "13px" }}>View All</p>
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
                                    <div className="quick-links-card-content d-flex justify-content-between px-5">
                                        <div className='rounded-circle' style={{ backgroundColor: '#E5F8F6', padding: '8px 10px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                                                <path d="M7 15.8391V10.1319C7 9.87962 6.89464 9.63767 6.70711 9.45929C6.51957 9.2809 6.26522 9.18069 6 9.18069H2C1.73478 9.18069 1.48043 9.2809 1.29289 9.45929C1.10536 9.63767 1 9.87962 1 10.1319V15.8391C1 16.0914 1.10536 16.3333 1.29289 16.5117C1.48043 16.6901 1.73478 16.7903 2 16.7903M7 15.8391C7 16.0914 6.89464 16.3333 6.70711 16.5117C6.51957 16.6901 6.26522 16.7903 6 16.7903H2M7 15.8391C7 16.0914 7.10536 16.3333 7.29289 16.5117C7.48043 16.6901 7.73478 16.7903 8 16.7903H12C12.2652 16.7903 12.5196 16.6901 12.7071 16.5117C12.8946 16.3333 13 16.0914 13 15.8391M7 15.8391V6.32707C7 6.0748 7.10536 5.83285 7.29289 5.65447C7.48043 5.47608 7.73478 5.37587 8 5.37587H12C12.2652 5.37587 12.5196 5.47608 12.7071 5.65447C12.8946 5.83285 13 6.0748 13 6.32707V15.8391M2 16.7903H16M13 15.8391C13 16.0914 13.1054 16.3333 13.2929 16.5117C13.4804 16.6901 13.7348 16.7903 14 16.7903H18C18.2652 16.7903 18.5196 16.6901 18.7071 16.5117C18.8946 16.3333 19 16.0914 19 15.8391V2.52225C19 2.26997 18.8946 2.02803 18.7071 1.84965C18.5196 1.67126 18.2652 1.57104 18 1.57104H14C13.7348 1.57104 13.4804 1.67126 13.2929 1.84965C13.1054 2.02803 13 2.26997 13 2.52225V15.8391Z" stroke="#309A84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='align-items-center'>
                                            <p className='fw-semibold text-muted mt-2 ms-2 mb-0'>View Statistics</p>
                                        </div>
                                        <div className='ms-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                <path d="M1 1.79395L7 7.50118L1 13.2084" stroke="#8E8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="quick-links-card mt-4">
                                    <div className="quick-links-card-content d-flex justify-content-between px-5">
                                        <div className='rounded-circle' style={{ backgroundColor: '#E5F8F6', padding: '8px 10px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                                                <path d="M10 1.04346V4.84828C10 5.10055 10.1054 5.3425 10.2929 5.52088C10.4804 5.69927 10.7348 5.79948 11 5.79948H15M10 1.04346H3C2.46957 1.04346 1.96086 1.24389 1.58579 1.60066C1.21071 1.95743 1 2.44132 1 2.94587V16.2627C1 16.7673 1.21071 17.2512 1.58579 17.608C1.96086 17.9647 2.46957 18.1652 3 18.1652H13C13.5304 18.1652 14.0391 17.9647 14.4142 17.608C14.7893 17.2512 15 16.7673 15 16.2627V5.79948M10 1.04346L15 5.79948M5 14.3603H11M5 10.5555H11" stroke="#309A84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='align-items-center'>
                                            <p className='fw-semibold text-muted mt-2 ms-2 mb-0'>Download Reports</p>
                                        </div>
                                        <div className='ms-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                                <path d="M1 1.79395L7 7.50118L1 13.2084" stroke="#8E8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="quick-links-card mt-4">
                                    <div className="quick-links-card-content d-flex justify-content-between px-5">
                                        <div className='rounded-circle' style={{ backgroundColor: '#E5F8F6', padding: '8px 10px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
                                                <path d="M1 18.839V16.9366C1 15.9275 1.42143 14.9597 2.17157 14.2462C2.92172 13.5326 3.93913 13.1317 5 13.1317H9M10 16.9366L12 18.839L16 15.0342M3 5.52211C3 6.53121 3.42143 7.49898 4.17157 8.21252C4.92172 8.92606 5.93913 9.32693 7 9.32693C8.06087 9.32693 9.07828 8.92606 9.82843 8.21252C10.5786 7.49898 11 6.53121 11 5.52211C11 4.51301 10.5786 3.54523 9.82843 2.83169C9.07828 2.11815 8.06087 1.71729 7 1.71729C5.93913 1.71729 4.92172 2.11815 4.17157 2.83169C3.42143 3.54523 3 4.51301 3 5.52211Z" stroke="#309A84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ApplicationStatus