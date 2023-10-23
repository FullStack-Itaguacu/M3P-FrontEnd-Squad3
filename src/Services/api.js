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

/**
 * Realiza o cadastro de um novo usuário com informações e endereço.
 *
 * @param {object} payload - Dados para o cadastro.
 * @param {object} payload.user - Informações do usuário.
 * @param {string} payload.user.fullName - Nome completo do usuário.
 * @param {string} payload.user.email - Endereço de e-mail do usuário.
 * @param {string} payload.user.cpf - CPF do usuário.
 * @param {string} payload.user.birthDate - Data de nascimento do usuário (no formato "YYYY-MM-DD").
 * @param {string} payload.user.phone - Número de telefone do usuário.
 * @param {string} payload.user.password - Senha do usuário.
 * @param {string} payload.user.typeUser - Tipo de usuário (por exemplo, "ADMIN").
 * @param {object[]} payload.addresses - Lista de endereços associados ao usuário.
 * @param {string} payload.addresses.street - Rua do endereço.
 * @param {number} payload.addresses.numberStreet - Número do endereço.
 * @param {string} payload.addresses.complement - Complemento do endereço.
 * @param {string} payload.addresses.neighborhood - Bairro do endereço.
 * @param {string} payload.addresses.city - Cidade do endereço.
 * @param {string} payload.addresses.state - Estado do endereço.
 * @param {string} payload.addresses.zip - CEP do endereço.
 * @param {string} payload.addresses.lat - Latitude do endereço (opcional).
 * @param {string} payload.addresses.long - Longitude do endereço (opcional).
 * @returns {Promise} Uma promessa que representa o resultado da operação de cadastro.
 */
export const signupAdmin = async (payload, token) => {
  const response = await api.post("/user/admin/signup", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

/**
 * @param {Object} cadastrarProduto
 * @param {string} cadastrarProduto.name - Nome do laboratório.
 * @param {string} cadastrarProduto.imageLink - Link da imagem.
 * @param {string} cadastrarProduto.typeDosage - Tipo de dosagem.
 * @param {number} cadastrarProduto.dosage - Dosagem.
 * @param {number} cadastrarProduto.unitPrice - Preço unitário.
 * @param {string} cadastrarProduto.typeProduct - Tipo do produto- enum: ['Controlado', 'Não controlado']
 * @param {number} cadastrarProduto.totalStock - Estoque total.
 */
export const cadastrarProduto = async (token, cadastrarProduto) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(
      "/products/admin",
      cadastrarProduto,
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
 * @param {object} params - Parâmetros da requisição- exemplo: {offset: 0, limit: 20, name: 'Produto', typeProduct: 'Controlado', totalStock: 'asc'}
 * @param {number} params.offset - Offset para paginação
 * @param {number} params.limit - Limite de resultados
 * @param {string} params.name - Filtro por nome do produto
 * @param {string} params.typeProduct - Filtro por tipo de produto - enum: ['Controlado', 'Não controlado']
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

/**
 * @param {string} token - Token JWT de autenticação
 * @param {string} productId - ID do produto
 */

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
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
