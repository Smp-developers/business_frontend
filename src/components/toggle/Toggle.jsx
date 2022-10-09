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
      <img src={'https://media.istockphoto.com/vectors/moon-and-star-black-icon-of-moon-for-night-pictogram-of-crescent-and-vector-id1334613123?k=20&m=1334613123&s=612x612&w=0&h=E9zgR7MI8srjMcswIxphF6X0dieNcTiyItbcsk_Gd1M='} alt="" className="t-icon" />
      <img src={'https://us.123rf.com/450wm/chudtsankov/chudtsankov1207/chudtsankov120700038/14510469-summer-hot-sun.jpg?ver=6'} alt="" className="t-icon" />
      <div
        className="t-button"
        onClick={handleClick}
        style={{ left: theme.state.darkMode ? 0 : 25 }}
      ></div>
    </div>
  );
};

export default Toggle;
