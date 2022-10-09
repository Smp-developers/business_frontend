import "./toggle.css";

import { useContext } from "react";
import { ThemeContext } from "../../context";

const Toggle = () => {
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };
  return (
    <div className="t">
      <img src={'https://res.cloudinary.com/dqajigt6s/main_logo_vheqme_j3hi9m.png'} alt="" className="t-icon" />
      <img src={'https://res.cloudinary.com/dqajigt6s/main_logo_vheqme_j3hi9m.png'} alt="" className="t-icon" />
      <div
        className="t-button"
        onClick={handleClick}
        style={{ left: theme.state.darkMode ? 0 : 25 }}
      ></div>
    </div>
  );
};

export default Toggle;
