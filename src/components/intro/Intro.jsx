import "./intro.css";


const Intro = () => {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Hello, We are SMP Developers</h2>
          {/* <h1 className="i-name">John Burton</h1> */}
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">HTML</div>
              <div className="i-title-item">CSS</div>
              <div className="i-title-item">Javascript</div>
              <div className="i-title-item">React.js</div>
              <div className="i-title-item">Django</div>
              <div className="i-title-item">Project</div>
            </div>
          </div>
          <p className="i-desc">
            Join here and become one of the best full stack developers.
          </p>
        </div>
      
      </div>
      <div className="i-right">
        <div className="i-bg"></div>
        <img src={'https://res.cloudinary.com/dqajigt6s/main_logo_vheqme_j3hi9m.png'} alt="" className="i-img" />
      </div>
    </div>
  );
};

export default Intro;
