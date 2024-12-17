import React, { useEffect, useState } from 'react'
import './ApplicationStatus.css'
import { ProgressBar, Row, Col } from 'react-bootstrap'
import BlogCard from '../../../Components/BlogCard/BlogCard'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

function ApplicationStatus({ now }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        mahal: '',
        amount: '',
        status: '',
        files: [],
        filePreviews: [],
    });
    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    useEffect(() => {
        window.scrollTo(0, 0); 
        
        const fetchClaimantData = async () => {
            if (user) {
                setFormData((prevData) => ({
                    ...prevData,
                    name: user.displayName,
                    email: user.email
                }));

                const docRef = doc(db, "Claimant", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData((prevData) => ({
                        ...prevData,
                        phone: docSnap.data().phone,
                        mahal: docSnap.data().mahal,
                        amount: docSnap.data().amount,
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

        fetchClaimantData();
    }, []);

    const handleBackClick = () => {
        navigate('/general/home'); // Navigate to the previous page
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

                    </div>
                </div>
                <div className="application-status-body">
                    <div className="application-card">
                        <h6>Application Status</h6>
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
                                                <p className='fw-semibold text-muted mt-2 ms-2 mb-0'>Apply as Donor</p>
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
            </div>

        </div>
    )
}

export default ApplicationStatus