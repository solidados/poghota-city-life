import { useState } from "react";

import WelcomePanel from "./panels/WelcomePanel";

function WelcomeSection () {
  const [openPanel, setOpenPanel] = useState(null);

  const toggleOpen = (panelNum) => {
    setOpenPanel((prevOpenPanel) => (prevOpenPanel === panelNum ? null : panelNum));
  };

  return (
    <section className="welcome">
      <div className="panels">
        <WelcomePanel
          panelNum={"one"}
          upperText={"Hey"}
          midText={"Let's"}
          lowerText={"Dance"}
          isOpen={openPanel === "one"}
          onToggleOpen={() => toggleOpen("one")}
        />
        <WelcomePanel
          panelNum={"two"}
          upperText={"Give"}
          midText={"Take"}
          lowerText={"Receive"}
          isOpen={openPanel === "two"}
          onToggleOpen={() => toggleOpen("two")}
        />
        <WelcomePanel
          panelNum={"three"}
          upperText={"Experience"}
          midText={"It"}
          lowerText={"Today"}
          isOpen={openPanel === "three"}
          onToggleOpen={() => toggleOpen("three")}
        />
        <WelcomePanel
          panelNum={"four"}
          upperText={"Give"}
          midText={"All"}
          lowerText={"You can"}
          isOpen={openPanel === "four"}
          onToggleOpen={() => toggleOpen("four")}
        />
        <WelcomePanel
          panelNum={"five"}
          upperText={"Life"}
          midText={"In"}
          lowerText={"Motion"}
          isOpen={openPanel === "five"}
          onToggleOpen={() => toggleOpen("five")}
        />
      </div>
    </section>
  );
}

export default WelcomeSection;
