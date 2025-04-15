
const ProductCard = ({ id, title, thumbnail }) => {
  return (
    <div className="product-card" id={id}>
      <img src={thumbnail} alt="" />
      <p>{title}</p>
    </div>
  );
};

export default ProductCard;