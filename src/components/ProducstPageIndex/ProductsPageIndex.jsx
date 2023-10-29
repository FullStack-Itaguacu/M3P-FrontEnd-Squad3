import Card from "../Card/Card";
import styles from "./ProductsPageIndex.module.css"
import useApi from "../../hooks/useApi";
import{ useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";


function ProductsPageIndex() {
const {listProducts} = useApi();
const [products, setProducts] = useState([]);
const { addToCart} = useAuth();


useEffect(()  => {
    listproductsDatabase();
}
, []);

async function listproductsDatabase() {
    const fetchProducts = await listProducts();
    setProducts(fetchProducts.data.products);
    
   
}

const addProductToCart = (productData) => {
  
  addToCart(productData);

};




    return (
        <div className={styles.containerProducts}>
           
              {products.map((product) => (
                <Card 
                key={product.id}
                product={product} 
                addToCart={addProductToCart} />
              ))}
           
        </div>
      );
}

export default ProductsPageIndex;