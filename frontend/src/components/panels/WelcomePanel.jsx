function WelcomePanel ({ panelNum, upperText, midText, lowerText, isOpen, onToggleOpen, onToggleActive }) {
  const panelClassName = `panel panel-${panelNum} ${isOpen ? "open" : ""} ${isOpen ? "open-active" : ""}`;

  return (
    <div className={panelClassName} onClick={onToggleOpen} onTransitionEnd={onToggleActive}>
      <p>{upperText}</p>
      <p>{midText}</p>
      <p>{lowerText}</p>
    </div>
  );
}

export default WelcomePanel;
