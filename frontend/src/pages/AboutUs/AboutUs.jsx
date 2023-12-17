import { MISSIONS } from "./const";
import ornaments from './ornaments.jpg'
import opera from './opera.jpg';
import './style.css';

const AboutUs = () => {
  const missionsRenderer = MISSIONS.map((mission) =>
    <div className="mission" key={mission.id}>
      <div className="mission__id">{mission.id}</div>
      <div className="mission__text">
        <h4>{mission.header}</h4>{mission.paragraph}
      </div>
    </div>
  );

  return (
    <section className="aboutUs">
      <div className="container">
        <section className="aboutUs__intro">
          <h2 className="aboutUs__intro__heading">Your involvement is a catalyst for positive change.</h2>
          <p>
            We're a community-driven platform dedicated to enhancing the well-being of our beloved city. <br />For those
            who <span>care deeply about the streets, parks, and buildings that shape daily life in Yerevan,</span>
            this is your space to make a meaningful impact.
          </p><br />
          <p>Our app is your go-to hub for observing and addressing issues that matter.
            Whether it's a road concern, an emergency, or a situation affecting daily life, you have the ability to
            report
            it directly. Share valuable information, geolocation, and images to provide a comprehensive view of the
            issue.
          </p><br />
          <p>What sets us apart? <br />Seamless collaboration with city authorities,
            organizations, and community groups. Your submissions don't just stop at reporting; they initiate actions
            that
            shape the future of Yerevan. Watch your concerns transform into solutions as you track the status of each
            reported issue from submission to resolution.
          </p>
        </section>
        <section className="aboutUs__firstSection">
          <img className="aboutUs__firstSection__img" src={ornaments} alt="ornaments" />
          <div className="aboutUs__firstSection__text">Optimize infrastructure, and elevate community well-being
            seamlessly.
          </div>
        </section>
        <section className="aboutUs__missionsSection">
          {missionsRenderer}
        </section>
        <section className="aboutUs__thirdSection">
          <img className="aboutUs__thirdSection__img" src={opera} alt="opera" />
          <div className="aboutUs__thirdSection__text">Together, let's create a Yerevan built on collective efforts and
            shared triumphs.
          </div>
        </section>
      </div>
    </section>
  )
};
export default AboutUs;
