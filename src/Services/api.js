import axios from "axios";



const api = axios.create({
    baseURL: import.meta.env.VITE_URL_HOST_API, 
  });
  

  export const loginUser = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  }
  export const loginAdmin = async (email, password) => {
    const response = await api.post('/user/admin/login', { email, password });
    return response;
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

 
    const response = await api.post("/products/admin", CadastrarProduto, config);

    return response;
  } catch (error) {
 
    return error.response.data 
  }
};


export const uploadImage = async (imageFile, authToken) =>  {

  try {

    const formData = new FormData();
    formData.append('image', imageFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      }
    };

    const response = await api.post('/upload', formData, config);
    
    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }

}

