import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST_API,
});

export const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export async function getCep(cep) {
  try {
    const response = await api.get(
      `https://brasilapi.com.br/api/cep/v2/${cep}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const register = async (name, email, password) => {
  const response = await api.post("/register", { name, email, password });
  return response.data;
};
