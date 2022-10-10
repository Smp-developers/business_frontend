import { useContext, useEffect } from "react";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";
import Intro from "../../components/intro/Intro";
import ProductList from "../../components/productList/ProductList";
import Toggle from "../../components/toggle/Toggle";
import { ThemeContext } from "../../context.js";

const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  
  return (
    <div className="home">
    <div className="homeContainer">  <div
      style={{
        backgroundColor: darkMode ? "#222" : "white",
        color: darkMode && "white"
       
      }}
    >
      <Toggle />
      <Intro />
      <About />
      <ProductList />
      <Contact />
    </div></div>
    </div>
  );
};

export default Home;
