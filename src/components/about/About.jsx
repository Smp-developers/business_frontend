import "./about.css";


const About = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img
            src="https://tetacourse.com/uploads/mini/full/8a/1629611190_react-js-and-python-django-full-stack-master-course.webp"
            alt=""
            className="a-img"
            style={{objectFit:"contain"}}
          />
        </div>
      </div>
      <div className="a-right">
        <h1 className="a-title">About SMP</h1>
        <p className="a-sub">
         It is a known fact that the leading technologies become a costly one to learn. In fact it should be costly because of the demand. For example to learn the Django+react full stack it leads to pay of 35,000 per course.<br /> But lot of students wont able to pay that much. For those here we are to help we started a best ever course designing platform where you can learn complete DJANGO + REACT + GIT + PROJECT with less amount. Contact us for details.
        </p>
      
        
      </div>
    </div>
  );
};

export default About;
