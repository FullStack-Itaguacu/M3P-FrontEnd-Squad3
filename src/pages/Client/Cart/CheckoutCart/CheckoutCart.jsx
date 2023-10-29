import { useState, useEffect } from "react";
import axios from "axios"; // Certifique-se de importar o axios
import useApi from "../../../../hooks/useApi";
import { useHistory } from "react-router-dom";

const CheckoutCart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Produto 1",
            image_url: "image_url_1.jpg",
            quantity: 2,
            stock: 5,
            price: 10.0,
        },
        {
            id: 2,
            name: "Produto 2",
            image_url: "image_url_2.jpg",
            quantity: 1,
            stock: 10,
            price: 15.0,
        },
        // Adicione mais itens do carrinho aqui
    ]);

    const [paymentMethod, setPaymentMethod] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { token } = useApi(); // Certifique-se de incluir a obtenção do token
    const history = useHistory();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCartItems();
    }, [token]);

    useEffect(() => {
        // Calculate total price based on cart items
        let price = 0;
        cartItems.forEach((item) => {
            price += item.quantity * item.price;
        });
        setTotalPrice(price);
    }, [cartItems]);

    const handleQuantityChange = (id, quantity) => {
        // Update quantity of cart item in database
        axios
            .put(`/api/cart/${id}`, { quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCartItems((prevItems) =>
                    prevItems.map((item) => (item.id === id ? response.data : item))
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCheckout = async () => {
        try {
            // Check if all items are in stock
            const outOfStockItems = cartItems.filter((item) => item.quantity > item.stock);
            if (outOfStockItems.length > 0) {
                setErrorMessage(
                    `Os seguintes itens estão fora de estoque: ${outOfStockItems
                        .map((item) => item.name)
                        .join(", ")}`
                );
                return;
            }

            // Check if address is selected
            if (!address) {
                setErrorMessage("Por favor, selecione um endereço de entrega.");
                return;
            }

            // Create sale object
            const sale = {
                items: cartItems.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                })),
                payment_method: paymentMethod,
                address: address,
            };

            // Post sale object to API
            const response = await axios.post("/api/sales", sale, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Clear cart and redirect to home page
            setCartItems([]);
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <img src={item.image_url} alt={item.name} />
                    <p>Quantidade: {item.quantity}</p>
                    <div>
                        <button
                            disabled={item.quantity === 1}
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                            -
                        </button>
                        <button
                            disabled={item.quantity === item.stock}
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p>Preço Total: R${item.quantity * item.price}</p>
                </div>
            ))}
            <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="">Selecione um método de pagamento</option>
                <option value="credit_card">Cartão de Crédito</option>
                <option value="debit_card">Cartão de Débito</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
                <option value="bank_transfer">Transferência Bancária</option>
            </select>
            <input type="text" value={address} onChange={handleAddressChange} placeholder="Endereço de Entrega" />
            <button onClick={handleCheckout}>Finalizar Compra</button>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Preço Total do Carrinho: R${totalPrice}</p>
        </div>
    );
};

export default CheckoutCart;
