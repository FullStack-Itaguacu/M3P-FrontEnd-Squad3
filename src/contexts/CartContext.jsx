import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Verifica se o produto já está no carrinho
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // Se o produto já estiver no carrinho, atualize a quantidade
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Caso contrário, adicione o produto ao carrinho
        state.cartItems.push(action.payload);
      }
      // Atualize o estado do carrinho
      return {
        ...state,
        totalItems: state.totalItems + action.payload.quantity,
        totalPrice:
          state.totalPrice + action.payload.unitPrice * action.payload.quantity,
      };
    }
    case "REMOVE_FROM_CART":
      return state;
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
