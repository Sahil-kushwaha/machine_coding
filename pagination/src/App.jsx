import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { PAGE_SIZE } from "./utils/constant";
import Pagination from "./components/Pagination";
import { useMemo } from "react";

function App() {
  // /* eslint-disable no-unused-vars */
  const [products, setProducts] = useState([]);
  const [currPage ,setCurrPage] =useState(0);
  
  const fetchProduct = async () => {
    try {
      
      const data = await fetch(`https://dummyjson.com/products?limit=100`);
      const json = await data.json();
      setProducts(json.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
 

  const totalProducts = products.length 
  const NoOfPages = useMemo(()=>Math.ceil(totalProducts/PAGE_SIZE),[totalProducts])
  const startOfCurrPage = PAGE_SIZE*currPage
  const endOfCurrPage = PAGE_SIZE+PAGE_SIZE*currPage

  return products.length<=0  ? 
  <p>Loading...</p>
  : (
    <div className="product-page">
      <h1>Pagination</h1>
      <Pagination NoOfPages={NoOfPages} currPage={currPage} setCurrPage={setCurrPage}/>

      <div className="product-container">
        {products.slice(startOfCurrPage,endOfCurrPage ).map((product) => {
          return <ProductCard
          key={product.id}
         id={product.id}
         title={product.title}
         thumbnail={product.thumbnail}
        />;
        })}

    </div>
    
    </div>
  );
}

export default App;
