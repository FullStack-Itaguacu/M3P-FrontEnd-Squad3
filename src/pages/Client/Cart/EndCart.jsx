import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import { useCart } from "../../../contexts/CartContext";

const EndCart = () => {
  const { state, dispatch } = useCart();
  const { cartItems, totalPrice } = state;
  const [paymentMethod, setPaymentMethod] = useState("");

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleQuantityChange = (productId, quantity) => {};

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {};

  return (
    <div>
      <h1>Seu Carrinho de Compras</h1>
      {cartItems.map((item) => (
        <Card key={item.id} product={item} addToCart={addToCart} />
      ))}
      <div>Total: R$ {totalPrice}</div>
      <div>
        <select onChange={(e) => handlePaymentMethodChange(e.target.value)}>
          <option value="">Selecione o Método de Pagamento</option>
          <option value="creditCard">Cartão de Crédito</option>
          <option value="debitCard">Cartão de Débito</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
          <option value="transferencia">Transferência Bancária</option>
        </select>
      </div>
      <button onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  );
};

export default EndCart;
