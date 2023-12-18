import TeamMateCard from "../../components/TeamMateCard";
import { teamMates } from "../../data/TeamMates.js";

import './teamPage.css';
import MainBackground from "../../components/background/MainBackground";

function TeamPage () {

  return (
    <>
      <MainBackground />
      <div className="team-page">
        <div className="team-container">
          <h2 className="team-title">Our Team</h2>
          <div className="team">
            {teamMates.map((teamMate) => (
              <TeamMateCard key={teamMate.id} teamMate={teamMate} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamPage;
