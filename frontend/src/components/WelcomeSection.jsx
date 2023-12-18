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
          lowerText={"Enjoy"}
          isOpen={openPanel === "one"}
          onToggleOpen={() => toggleOpen("one")}
        />
        <WelcomePanel
          panelNum={"two"}
          upperText={"You"}
          midText={"Make"}
          lowerText={"Change"}
          isOpen={openPanel === "two"}
          onToggleOpen={() => toggleOpen("two")}
        />
        <WelcomePanel
          panelNum={"three"}
          upperText={"It's"}
          midText={"Our"}
          lowerText={"Home"}
          isOpen={openPanel === "three"}
          onToggleOpen={() => toggleOpen("three")}
        />
        <WelcomePanel
          panelNum={"four"}
          upperText={"Bring"}
          midText={"City"}
          lowerText={"Comfort"}
          isOpen={openPanel === "four"}
          onToggleOpen={() => toggleOpen("four")}
        />
        <WelcomePanel
          panelNum={"five"}
          upperText={"Create"}
          midText={"Better"}
          lowerText={"Life"}
          isOpen={openPanel === "five"}
          onToggleOpen={() => toggleOpen("five")}
        />
      </div>
    </section>
  );
}

export default WelcomeSection;
