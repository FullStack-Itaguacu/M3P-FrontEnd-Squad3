import { useState} from "react";
import * as api from '../Services/api'; 

export default function useApi() {
  const [token, setToken] = useState("");
  

  async function getTokenFromStorage() {
    const getTokneStorage = localStorage.getItem("token");
    return getTokneStorage;
  }

 

  async function loginUser(email, password) {
    const response = await api.loginUser(email, password);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  }

  async function loginAdmin(email, password) {
    const response = await api.loginAdmin(email, password);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  }

  async function signupUser(userData, addresses) {
    await api.signupUser(userData, addresses);
  }

  async function signupAdmin(adminData, addresses) {
    const token = await getTokenFromStorage();
    await api.signupAdmin(adminData, addresses,token);
  }

  async function getUserAddresses() {
    const token = await getTokenFromStorage();
    return api.getUserAddresses(token);
  }

  async function listUsers(offset, limit) {
    const token = await getTokenFromStorage();
    return api.listUsers(token, offset, limit);
  }

  async function getUserById(userId) {
    const token = await getTokenFromStorage();
    return api.getUserById(token, userId);
  }

  async function updateUser(userId, userData) {
    const token = await getTokenFromStorage();
    return api.updateUser(token, userId, userData);
  }

  async function getProductById(productId) {
    const token = await getTokenFromStorage();
    return api.getProductById(token, productId);
  }

  async function cadastrarProduto(CadastrarProduto) {
    const token = await getTokenFromStorage();
    return api.CadastrarProduto(token, CadastrarProduto);
  }

  async function uploadImage(imageFile) {
    const token = await getTokenFromStorage();
    return api.uploadImage(token, imageFile);
  }

  async function listProducts(offset, limit, filters) {
  
    return api.listProducts(offset, limit, filters);
  }

  async function listAdminProducts(offset, limit, filters) {
    const token = await getTokenFromStorage();
    return api.listAdminProducts(token, offset, limit, filters);
  }

  async function getProductById(productId) {
    const token = await getTokenFromStorage();
    return api.getProductById(token, productId);
  }
  async function updateProduct(productId, productData) {
    const token = await getTokenFromStorage();
    return api.updateProduct(token, productId, productData);
  }

  async function createSale(saleData) {
    const token = await getTokenFromStorage();
    return api.createSale(token, saleData);
  }

  async function getUserSales() {
    const token = await getTokenFromStorage();
    return api.getUserSales(token);
  }

  async function getAdminSales() {
    const token = await getTokenFromStorage();
    return api.getAdminSales(token);
  }

  async function getSalesDashboard() {
    const token = await getTokenFromStorage();
    return api.getSalesDashboard(token);
  }

  async function getSaleById(saleId) {
    const token = await getTokenFromStorage();
    return api.getSaleById(token, saleId);
  }
  return {
    token,
    loginUser,
    loginAdmin,
    signupUser,
    getUserAddresses,
    listProducts,
    getProductById,
    listAdminProducts,
    updateProduct,
    createSale,
    getUserSales,
    getAdminSales,
    getSalesDashboard,
    getSaleById,
    listUsers,
    getUserById,
    updateUser,
    signupAdmin,
    cadastrarProduto,
    uploadImage
  };
}
