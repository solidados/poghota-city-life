const TeamMateCard = ({ teamMate }) => {
  return (
    <div className="teamMate-card">
      <img src={teamMate.avatar} alt="User Avatar" />
      <div className="teamMate-info">
        <h3>{teamMate.name}</h3>
        <p>{teamMate.position}</p>
        <a href={teamMate.github} target="_blank" rel="noopener noreferrer">
          {`${teamMate.name.split(' ')[0]}'s GitHub`}
        </a>
      </div>
    </div>
  );
};

export default TeamMateCard;
