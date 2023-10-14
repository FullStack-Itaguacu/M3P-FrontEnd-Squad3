import axios from "axios";


const api = axios.create({
    baseURL: process.env.URL_HOST_API, 
  });
  
  export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  }
  
  export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
  }

export const register = async (name, email, password) => {
  const response = await api.post('/register', { name, email, password });
  return response.data;
}