import { useState } from "react";

const InfoButton = ({ infoText, infoIcon }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div className="relative inline-block">
      {isInfoVisible && (
        <div className="absolute bottom-full -left-56 md:left-0 w-80 md:w-80 h-fit rounded-md border-2 border-odtheme/10 bg-dtheme p-2 z-10">
          {infoText}
        </div>
      )}
      <button onClick={toggleInfo}>{infoIcon || "i"}</button>
    </div>
  );
};

export default InfoButton;
