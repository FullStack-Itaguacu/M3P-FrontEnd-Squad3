import AllRoutes from "./Routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AllRoutes />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
