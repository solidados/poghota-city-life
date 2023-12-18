import TeamIcon from "./socialIcons/TeamIcon";

const TeamMateCard = ({ teamMate }) => {
  return (
    <div className="teamMate-card">
      <img src={teamMate.avatar} alt="User Avatar" />
      <div className="teamMate-info">
        <h3>{teamMate.name}</h3>
        <p>{teamMate.position}</p>
        <div className="social-icons">
          <TeamIcon socialUrl={teamMate.github} />
          <TeamIcon socialUrl={teamMate.linkedin} />
        </div>
      </div>
    </div>
  );
};

export default TeamMateCard;
