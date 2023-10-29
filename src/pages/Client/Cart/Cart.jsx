import React, { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import useAuth from "../../../hooks/useAuth";
import NavBar from "../../../components/Navbar/navbar";

function Cart() {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const { getUserAddresses } = useApi()
    const { token } = useAuth();

    useEffect(() => {
        const fetchAddresses = async () => { // Renomeado para fetchAddresses
            const data = await getUserAddresses(token)
            setAddresses(data) // Corrigido para setAddresses
        }
        fetchAddresses()
    }, [token])

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    return (
        <div>
            <NavBar />
            <h1>Selecione o endereço</h1>
            <form>
                {addresses.map((address) => (
                    <div key={address.id}>
                        <input
                            type="radio"
                            id={address.id}
                            name="address"
                            value={address.id}
                            checked={selectedAddress === address.id}
                            onChange={handleAddressChange}
                        />
                        <label htmlFor={address.id}>
                            {address.zip},  {address.street}, {address.number} - {address.city}/{address.state}
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Cart;
