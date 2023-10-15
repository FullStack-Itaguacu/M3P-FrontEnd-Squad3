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

export const cadastrarProduto = async (CadastrarProduto , authToken) => {
  try {
 
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    };

 
    const response = await axios.post("/products/admin", CadastrarProduto, config);

    return response.data;
  } catch (error) {
 
    console.error("Erro ao cadastrar o produto:", error);
    throw error; 
  }
};