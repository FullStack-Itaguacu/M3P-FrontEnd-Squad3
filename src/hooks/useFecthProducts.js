
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function useFetchProducts() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.listProducts();
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);  
      }
    }
    fetchData();
  }, []);

  return { loading, error, products };

}