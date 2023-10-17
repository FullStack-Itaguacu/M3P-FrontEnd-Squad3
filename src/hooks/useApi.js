import { useState, useEffect } from "react";
import * as api from '../Services/api'; 

export default function useApi() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
    await api.signupAdmin(adminData, addresses,token);
  }

  async function getUserAddresses() {
    return api.getUserAddresses(token);
  }

  async function listUsers(offset, limit) {
    return api.listUsers(token, offset, limit);
  }

  async function getUserById(userId) {
    return api.getUserById(token, userId);
  }

  async function updateUser(userId, userData) {
    return api.updateUser(token, userId, userData);
  }

  async function getProductById(productId) {
    return api.getProductById(token, productId);
  }

  async function cadastrarProduto(CadastrarProduto) {
    return api.CadastrarProduto(token, CadastrarProduto);
  }

  async function uploadImage(imageFile) {
    return api.uploadImage(token, imageFile);
  }

  async function listProducts(offset, limit, filters) {
    return api.listProducts(offset, limit, filters);
  }

  async function listAdminProducts(offset, limit, filters) {
    return api.listAdminProducts(token, offset, limit, filters);
  }

  async function getProductById(productId) {
    return api.getProductById(token, productId);
  }
  async function updateProduct(productId, productData) {

    return api.updateProduct(token, productId, productData);
  }

  async function createSale(saleData) {
    return api.createSale(token, saleData);
  }

  async function getUserSales() {
    return api.getUserSales(token);
  }

  async function getAdminSales() {
    return api.getAdminSales(token);
  }

  async function getSalesDashboard() {
    return api.getSalesDashboard(token);
  }

  async function getSaleById(saleId) {;
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
