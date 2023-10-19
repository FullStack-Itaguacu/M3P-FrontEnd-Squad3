import axios from "axios";

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

export const signupAdmin = async (adminData, addresses, token) => {
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
export const cadastrarProduto = async (CadastrarProduto, authToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
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

export const uploadImage = async (imageFile, authToken) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await api.post("/upload", formData, config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const listProducts = async (offset, limit, filters = {}) => {
  const params = {
    offset,
    limit,
    ...filters,
  };

  const response = await api.get(`/products/${offset}/${limit}`, {
    params,
  });
  return response.data;
};

export const listAdminProducts = async (
  token,
  offset = 0,
  limit = 20,
  filters = {}
) => {
  const params = {
    offset,
    limit,
    ...filters,
    ...filters,
  };

  const response = await api.get(`/products/admin/${offset}/${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
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

export async function getCep(cep) {
  try {
    const response = await api.get(
      `https://brasilapi.com.br/api/cep/v2/${cep}`
    );
    if (response.data.errors && response.data.errors.length > 0) {
      throw new Error("CEP não encontrado");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
