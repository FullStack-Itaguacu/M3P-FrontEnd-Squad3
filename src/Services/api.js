import axios from "axios";
import queryString from "query-string";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST_API,
});

// Autenticação
export const loginUser = async (email, password) => {
  const response = await api.post("/user/login", { email, password });

  return response;
};

export const loginAdmin = async (email, password) => {
  const response = await api.post("/user/admin/login", { email, password });
  return response;
};

// Usuários
export const signupUser = async (userData, addresses) => {
  const response = await api.post("/user/signup", {
    user: userData,
    addresses,
  });
  return response.data;
};

export const signupAdmin = async (adminData, addresses) => {
  const response = await api.post(
    "/user/admin/signup",
    {
      user: adminData,
      addresses,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserAddresses = async (token) => {
  const response = await api.get("/buyers/address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const listUsers = async (token, offset, limit) => {
  const response = await api.get(`/buyers/admin/${offset}/${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserById = async (token, userId) => {
  const response = await api.get(`/buyers/admin/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (token, userId, userData) => {
  const response = await api.patch(`/buyers/admin/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Produtos
export const cadastrarProduto = async (token, CadastrarProduto) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(
      "/products/admin",
      CadastrarProduto,
      config
    );

    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const uploadImage = async (token, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post("/upload", formData, config);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Lista produtos para o admin
 *
 * @param {string} token - Token JWT de autenticação
 * @param {object} params - Parâmetros da requisição- exemplo: {offset: 0, limit: 20, name: 'Produto', typeProduct: 'Bebida', totalStock: 'asc'}
 * @param {number} params.offset - Offset para paginação 
 * @param {number} params.limit - Limite de resultados
 * @param {string} params.name - Filtro por nome do produto
 * @param {string} params.typeProduct - Filtro por tipo de produto
 * @param {string} params.totalStock - Filtro por estoque total - enum: ['asc', 'desc']
 *

*/

export const listProducts = async (params) => {

  const { offset = 0, limit = 20 } = params || {};
  const query = queryString.stringify(
    {
      name: params?.name,
      typeProduct: params?.typeProduct,
      totalStock: params?.totalStock,
    },
    {
      skipEmptyString: true,
    }
  );
  const baseUrl = `/products/admin/${offset}/${limit}`;
  const concatQuery = `?${query}`;
  
  const url = baseUrl + concatQuery;
  const response = await api.get(url);
  return response.data;
};

/**
 * Lista produtos para o admin
 *
 * @param {string} token - Token JWT de autenticação
 * @param {object} params - Parâmetros da requisição- exemplo: {offset: 0, limit: 20, name: 'Produto', typeProduct: 'Bebida'}
 * @param {number} params.offset - Offset para paginação 
 * @param {number} params.limit - Limite de resultados
 * @param {string} params.name - Filtro por nome do produto
 * @param {string} params.typeProduct - Filtro por tipo de produto
 * @param {string} params.totalStock - Filtro por estoque total - enum: ['asc', 'desc']
 *

*/

export const listAdminProducts = async (token, params) => {
  const { offset = 0, limit = 20 } = params || {};

  const query = queryString.stringify(
    {
      name: params?.name,
      typeProduct: params?.typeProduct,
      totalStock: params?.totalStock,
    },
    {
      skipEmptyString: true,
    }
  );
  const baseUrl = `/products/admin/${offset}/${limit}`;
  const concatQuery = `?${query}`;
  
  const url = baseUrl + concatQuery;

  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProductById = async (token, productId) => {
  const response = await api.get(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = async (token, productId, productData) => {
  const response = await api.patch(
    `/products/admin/${productId}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Vendas
export const createSale = async (token, items) => {
  const response = await api.post("/sales", items, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserSales = async (token) => {
  const response = await api.get("/sales", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAdminSales = async (token) => {
  const response = await api.get("/sales/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSalesDashboard = async (token) => {
  const response = await api.get("/sales/dashboard/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSaleById = async (token, saleId) => {
  const response = await api.get(`/sales/${saleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
