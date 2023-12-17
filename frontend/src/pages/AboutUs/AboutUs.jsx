import { MISSIONS } from "./const";
import opera from './opera.jpg';
import AboutUsPageSlider from "./AboutUsPageSlider";
import zvartnots from './zvartnots.jpg';
import ornaments from './ornaments.jpg'
import './style.css';

const AboutUs = () => {
    const missionsRenderer = MISSIONS.map((mission)=> <div className="mission"><div className = 'mission__id'>{mission.id}</div><div className = 'mission__text'><span className = 'mission__text__header'>{mission.header}</span>{mission.paragraph}</div></div>)
    return <section className = 'aboutUs'>
        <section className = "aboutUs__intro">
       <p className = "aboutUs__intro__heading"> 'Welcome! Your involvement is a catalyst for positive change.'</p>
            <p className = "aboutUs__intro__text">
            We're a community-driven platform dedicated to enhancing the well-being of our beloved city. For those who <span className = "aboutUs__markedText">care deeply about the streets, parks, and buildings that shape daily life in Yerevan</span>, this is your space to make a meaningful impact.Our app is your go-to hub for observing and addressing issues that matter. Whether it's a road concern, emergency, or a situation affecting daily life, you have the ability to report it directly. Share valuable information, geolocation, and images to provide a comprehensive view of the issue.What sets us apart? The seamless collaboration with city authorities, organizations, and community groups. Your submissions don't just stop at reporting; they initiate actions that shape the future of Yerevan. Watch your concerns transform into solutions as you track the status of each reported issue from submission to resolution.
            </p>
        </section>
        <section className = "aboutUs__firstSection">
           <img className = "aboutUs__firstSection__img" src={ornaments} alt="ornaments" />
           <div className="aboutUs__firstSection__text">Optimize infrastructure, and elevate community well-being seamlessly.</div>
        </section >
        <section className = "aboutUs__missionsSection">
         {missionsRenderer}
        </section> 
        <section className = "aboutUs__thirdSection">
           <img className = "aboutUs__thirdSection__img" src={opera} alt="opera" />
           <div className="aboutUs__thirdSection__text">Together, let's create a Yerevan built on collective efforts and shared triumphs.</div>
        </section >
    </section>
};
export default AboutUs;