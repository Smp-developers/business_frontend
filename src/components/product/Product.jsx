import "./product.css";

const Product = ({img,link}) => {
  return (
    <div className="p">
      <div className="p-browser">
        <div className="p-circle"></div>
        <div className="p-circle"></div>
        <div className="p-circle"></div>
      </div>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={'https://res.cloudinary.com/dqajigt6s/main_logo_vheqme_j3hi9m.png'} alt="" className="p-img" />
      </a>
    </div>
  );
};

export default Product;
