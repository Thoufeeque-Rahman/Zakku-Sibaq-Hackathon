import React from 'react';
import './BlogPage.css';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../../Components/BlogCard/BlogCard';
import Navbar from '../../../Components/Navbar/Navbar'
import html2canvas from 'html2canvas';
import { Accordion } from 'react-bootstrap';


function BlogPage() {
  const navigate = useNavigate();
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
      title: 'Innovative Horizons in Waqf: Discovering Drivers, Key Elements, and Proven Models of Success',
      preview: `To begin with, the innovation here does not imply inventing something new which is not found anywhere in the world. Rather, each initiative that helped to solve a problem, big or small, or to improve the offering of services and goods. `,
      content: `
            <h5>Drivers and Elements of Innovation</h5>

            The six drivers for innovation in non-profit organisations are identified[1]:<br>
            <ol>
         <li>   Adapting to rapidly changing environments.</li>
          <li>  Giving service users the best value </li>
          <li>  Delivering extraordinary results.</li>
           <li> Becoming thought leaders and policy pushers.</li>
           <li> Increasing employee satisfaction and retention.</li>
           <li> Increasing organisational profile in a competitive marketplace.</li>
            </ol>
            Some significant elements that need to be ingrained in the innovative strategies from an Islamic perspective are given below:<br>
            
            <ol>
          <li>  This innovation should be based on the integration of a combination of good traditional elements and beneficial contemporary methods (al-qadīm al-ṣāliḥ wa al-jadīd al-nāfiʿ).</li>
          <li>  Novelty is the fundamental feature of innovation, whereas beneficence, effectiveness, efficiency and quality are its core elements from an Islamic perspective. Principles of justice and equity are crucial for any innovation in waqf practices.</li>
          <li>  Public interest is the fundamental axis of maqāṣid al-sharīʿah, and so is of waqf. Maslaḥah (welfare) means the achievement of benefit and the repulsion of harm. It should be the governing principle of innovation.</li>
          <li>  In addition, Sharīʿah is, as a whole, mercy for the world, therefore being merciful is an intrinsic characteristic of Sharīʿah rulings. Denial of this fundamental happens to be the nullification of the maqāṣid al-sharīʿah. [2] The element of mercy should permeate innovative strategies.</li>
         <li>   In innovation, the important concern is its conformity to the jurisprudential pillars and conditions. Waqf being an Islamic institution, its revival can be accepted without a solid and authentic juristic grounding (al-takyīf al-Sharʿī). In other words, strict adherence to the juristic parameters and arranging in accordance with the maqāṣid al-sharīʿah is inevitable.</li>
          <li>  Collaboration and synergised initiatives with various stakeholders from society.
            Adequate use and proper investment of waqf assets.</li>
          <li>  Visionary leadership and vibrant management: Leadership is doing the right things and management doing things right.</li>
          <li>  Engagement with stakeholders in the social and financial systems.</li>
            <lo>
            <br>
         <h5>   Successful Models of Innovation</h5>
            
            To begin with, the innovation here does not imply inventing something new which is not found anywhere in the world. Rather, each initiative that helped to solve a problem, big or small, or to improve the offering of services and goods. As a subsequent step, it has to move to the next step thus to reach groundbreaking models of waqf practices.<br><br>
            
            Undeniably, in some parts of the world, desirable and effective models of waqf practices can be found, for example, Kumpulan Waqaf An-Nur Berhad, IIUM Endowment Fund and five waqf entities under Islamic Development Bank in Saudi Arabia. Waqaf An-Nur Corporation (WANCorp), founded on October 25, 2000, focuses on managing assets and shares of waqf under Johor cooperation. “WANCorp declares all income earned as dividend and distributes the benefits with 70:25:5 formulae, of which 70% of the benefit goes back to JCorp for reinvestment and human capital development, 25% goes to WANCorp for Fisabilillah and 5% is distributed to Islamic Religious Council of Johor”.[3] This strategy equips the company to maintain steadfast development and produce more waqf benefits.<br><br>
            
            IIUM Endowment fund, established on March 15, 1999, at International Islamic University Malaysia, delivers assistance to needy students to meet their needs of tuition fees and the living cost of studying at the university. “IEF has been innovative in generating income by introducing the Kafalah program, which happens to be one of its major cash collection activities. It also has purchased 12 units of Putra Villa Condominium which are to be rented out at monthly rental rates ranging from RM2000 to RM2500 per unit. In addition, the Azman Hashim complex is also expected to generate a steady income flow of RM0.51 million per year to IEF”.[4]<br><br>
            
            The Islamic Development Bank experimented with various initiatives to foster the waqf sector in Muslim and non-Muslim countries. This experiment seems to be successful and innovative, for example, one of its flagship programs is the Sustainable Villages Program (SVP), a crucial project with a profound social cause which is the eradication of poverty.[5]<br><>br
            
            Waqf in Kuwait leads the way with its remarkable performance, flexibility in legal injunctions, facilitations by the government, autonomy of the waqf department in decision-making, encouraging people to establish new waqf and establishing complaint waqf projects, and funding in research and charity initiatives.[6]<br><br>
            
            Yayasan Iqra (Iqra Foundation) foundation in Malaysia promotes wealth creation through Muslim endowment principles and works to make Islamic endowment Malaysia’s third financial force. “The foundation provides a platform for individuals and the corporate sector to commit shares or financial instruments as an endowment with a portion of the profits returning to the principal sum and the remaining channelled to the community”[7].<br><br>
            
          <h5>  Concluding Remarks</h5>
            
            New and serious discussions are on the rise regarding the revival of Waqf. The revival should start within the hearts and minds of believers. The change needs to start from the grassroots level. The innovation should focus on realising the objectives of waqf with due diligence to the fiqh principles of the core nature of its religious perspective.<br><br>
            
            The necessity of innovation is unequivocal due to its extremely poor utilization in some areas. As part of innovation, the extent of waqf utility for the benefit of the ummah in terms of economy, education, healthcare, food security, self-sufficiency, art, science, culture, spirituality and environmental stability needs to be further extensively explored in the light of the needs of contemporary times.<br><br>
            
            At times, the revival efforts seem like treating the symptoms, not the causes of diseases. In the researcher’s view, a paradigm shift needs to happen in the existing attitude to waqf at a grassroots level and to experiment with innovation in proliferating the benefits of waqf. The problem is not with waqf but with the people around it and their governance. A transition in the modus operandi from traditional and classical to progressive and contemporary is the high need of the hour. Waqf revival can be done by leveraging the use of existing waqf and encouraging Muslims to do more waqf. To propose the innovative application of waqf and expedite sustainable growth, the waqf governance needs to be revised.<br><br>
            
            The characteristics of innovation and originality are distinctive qualities of human beings. The attitude towards Waqf and its governance needs drastic and transformative changes to sort out its malaise and boost it as a soulful religious and socio-economic catalyst.<br><br>
            
            Islam demonstrates its concern for people’s welfare not only in this world but also in the hereafter. Waqf can be a vital vehicle and engaging platform to cater to the needs of socio-economic development. Waqf represents a distinguishable segment of Islamic civilization with a pivotal role in the revival of Islamic society. Waqf promotes the core idea of sustainability. Waqf is about preserving the property and spreading its fruits and benefits. Endowed property simultaneously and inherently ingrates the features of preservation and investment.<br><br>
            
            This study proves only that innovation in the endowment sector is nothing short of a necessity in the current times. The authorities in various regions and countries need to assemble the brilliant minds of the ummah to explore the avenues and strategies of innovation and the prospective methods of its implementation.`,
      imageUrl: `https://cdn.leonardo.ai/users/fcdd64d6-98ba-4541-aa58-813d5c338dd9/generations/7df5b9de-8152-4c2c-b76c-3c3049c76a23/Leonardo_Phoenix_Create_an_visually_striking_image_that_repres_1.jpg?w=512`

    },
    {
      id: 5,
      title: `The Pillars of Benevolence: Waqf's Enduring Significance in Islam`,
      preview: `Waqf is one of the meritorious acts and formidable symbols of Islam. It is an inextinguishable spring of reward for a Muslim.`,
      content: `Waqf is one of the meritorious acts and formidable symbols of Islam. It is an inextinguishable spring of reward for a Muslim. It has both spiritual and material benefits. It continues to create hope for students, researchers, patients, desperate widows, organisations, social services, religious institutions, educational entities, etc. An evident example of Islam’s concern for sustainable development is endowment because sustainability is the inherent and integral characteristic of waqf.<br><br>

            Waqf has its soulful role in the Islamic revival from the period of the Prophet Muhammad (ﷺ), the Companions, the Followers, Umayyad and Abbasid dynasties until the period of the Ottoman Caliphate. It still continues with its services at various levels in different parts of the world. Muslims are obliged to extend the hand of help to needy people as a human duty to their fellow human. The companions of the Prophet such as Abu Bakar, ʿUmar, ʿUthman, ʿAli, ʿĀisha, Fatimah, ʿAmr bin ʿĀs, Jabir, are some examples who made endowment. Muslims made endowments of the masjid, wells, bridges, hotels, rest houses, madrassah, universities, medicines, and trees. In addition, Muslims, in the realisation of duties towards other creatures, initiated waqf for animals and birds, for example.<br><br>
            
            Waqf has a huge role to play in a humanitarian cause and social solidarity by taking care to translate the concept of leaving no-one-behind. Waqf can be used as a funding source for several social welfares, healthcare, educational, humanitarian activities, and voluntary services, subject to the conditions spelt out by the endower. In addition, it can be used for facing calamities and encountering epidemics and tribulations.<br><br>
            
            Waqf is no longer a subsidiary chapter in Islamic juristic literature. Instead, it has outgrown to become an independent Islamic institution. Its profound impacts in several fields being a repository of sustenance and survival for many generations. From the definitions of waqf by the scholars of various madhāhib, we can retrieve specific facts:<br>
            <ol>
         <li>   In waqf, the ownership is transferred to Allah (ﷻ), and its benefits are open to the people. Hence, its ownership cannot be moved to anyone else, and its benefit is long-lasting.</li>
          <li>  It has an irreversible nature.</li>
          <li>  It can be for self, family or others.</li>
           <li> In waqf, the property is protected, and its usufruct is dedicated to designated beneficiaries.</li>
          <li>  The feature of waqf is perpetuity.</li>
            </ol>
            Ibn Ashur enumerated the goals of donations and charity[i], including waqf as:<br>
            <ol>
         <li>   To increase the number of endowments and to promote people for charity.</li>
        <li>    Plantation of generous behaviour and helping others for the sake of Allah (ﷻ) in the heart of believers.</li>
          <li>  Flexibility in making donations by allowing various conditions in its implementation from the side of the endower.</li>
            </ol>
            In addition, the net benefits of waqf can be encapsulated as follows:<br>
            <ol>
          <li>  cooperation (Taʿāwun)</li>
          <li>  Solidarity (Takāful)</li>
         <li>   Interdependence (Tarābuṭ)</li>
         <li>   Sociability (Ilfah)</li>
          <li>  Brotherhood (Ukhuwwah)</li>
          <li>  Protection of wealth (Hifẓ al-māl)</li>
         <li>   Investment for both worlds</li>
            </ol>

            Shāh Walīullāh Dehlawī explained the benefits of Waqf. The waqf was not known to the people before Islam, and the Prophet (ﷺ) introduced it to them because it includes features which are not present in other forms of charities and donations. Maybe some people spend a good amount of wealth to help people. However, once that wealth is used, the same people may be in a needy position once again. In addition, another group of needy people will emerge who might be deprived of any help. To combat this situation, the best and most effective way is the endowment, in which the property, source of help, is protected and maintained whereas its fruits, benefits and usufruct are kept open for the beneficiaries.[ii]<br><br>
            
            Waqf plays its role impacts both worlds. It becomes an investment for the endower for the next world as a source of infinite reward, giving him a sense of satisfaction and social solidarity in this world. For the beneficiary, the endowment helps meet this world’s needs and thus for working for the hereafter. The Islamic worldview is based on cultivating success in both worlds, as portrayed in the following Quranic verses: (1) {Our Rabb! Give us the good life, both in this world and in the Hereafter and save us from the torment of the fire} (al-Baqarah: 201). (2) {Rather seek, using what Allah has given you, to attain the abode of the hereafter while not neglecting your share in this world. Be good to others as Allah has been good to you} (al-Qasas: 77).<br><br>
            
            In Islam, types of obedience are classified into two:<br>
            <ol>
           <li> Beneficial for its does in the hereafter like prayer, fasting, etc.</li>
          <li>  Beneficial for its doer (donor) in the hereafter and for the receiver in this world like hadiyyah, waqf, etc.[iii]</li>
            </ol>

            Ibn ʿAbd al-Salām further explained the Sharīʿah obligations are of two types one its reason and wisdom are intelligible for people (maʿqūl al-maʿna) and the other which has meaning and wisdom are known only to Allah (taʿabbudiyy).[iv] Ibn Rushd coined the terms maṣlaḥī and ʿibādi for the above categories respectively. maʿqūl al-maʿna means its benefit (maṣlaḥah) is understandable for people.<br><br>
            
            Waqf is crucial in the preservation and promotion of the lofty goals of ḍarūriyyāt, for example. The first waqf in Islam is the masjid which has a tremendous role in hifẓ al-dīn. Endowments help meet people’s basic and physical needs such as food, income and home, which becomes hifẓ al-nafs. Waqf is used for education, research comes under the preservation of intellect (hifẓ al-ʿaql) where in addition waqf for the family will help in the preservation of lineage (hifẓ al-nasl). Obviously, maintaining the property and spreading wings of help ensures one form of hifẓ al-māl.`,
      imageUrl: `https://cdn.leonardo.ai/users/fcdd64d6-98ba-4541-aa58-813d5c338dd9/generations/95bf6a1a-c1ff-4a49-b2cc-a683992e663a/Leonardo_Phoenix_A_majestic_warmtoned_illustration_depicting_t_1.jpg`

    },
  ]

  return (
    <>
      <div className="container-box pb-5">
        <div className="blog-page-box" id="screenshot">
          <div className="header">
            <div className="header-text d-flex justify-content-start">
              <svg
                onClick={handleBackClick}
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 24 24"
                stroke="var(--white)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left me-3"
                aria-label="Go Back"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
              <div>
                <h1>Read Articles</h1>
              </div>
            </div>
          </div>
          <div className="blog-page-body">

            <div className="latest-blog-container mt-4">
              <div className="latest-blog-box">
                <div className="latest-blog-head pt-3">
                  <div className="latest-blog-head-content px-2 d-flex justify-content-between">
                  </div>
                </div>
                <div className="latest-blog-body">
                  {blogPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="help-card question-board mt-3">
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
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default BlogPage;
