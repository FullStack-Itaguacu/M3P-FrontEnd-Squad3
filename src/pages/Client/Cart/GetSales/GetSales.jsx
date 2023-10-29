import React, { useState, useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import useAuth from "../../../../hooks/useAuth";
import Navbar from "../../../../components/Navbar/navbar";
import styles from "./GetSales.module.css";

function GetSales() {
    const { getUserSales } = useApi();
    const { token } = useAuth();
    const [sales, setSales] = useState([
    ]);
    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {
        const fetchGetSales = async () => {
            try {
                const data = await getUserSales(token);
                setSales(data);
            } catch (error) {
                console.error("Erro ao obter as vendas: ", error);
            }
        };
        fetchGetSales();
    }, [token]);

    const groupByDate = (sales) => {
        const groupedSales = {};
        sales.forEach((sale) => {
            const date = new Date(sale.createdAt).toLocaleDateString();
            if (!groupedSales[date]) {
                groupedSales[date] = [];
            }
            groupedSales[date].push(sale);
        });
        return groupedSales;
    };

    const handleClick = (sale) => {
        setSelectedSale(sale);
    };

    const renderSaleDetails = () => {
        if (selectedSale && selectedSale.details) {
            return selectedSale.details.map((detail) => (
                <div key={detail.id}>
                    <p>Produto: {detail.productId}</p>
                    <p>Vendedor: {detail.sellerId}</p>
                    <p>Quantidade comprada: {detail.amountBuy}</p>
                    <p>Preço unitário: {detail.unitPrice}</p>
                </div>
            ));
        }
        return null;
    };

    return (
        <div>
            <Navbar />
            <div>
                <h1 className={styles.titulo}>Meus Pedidos</h1>
                <div className={styles.cardContainer}>
                    {sales.map((sale) => (
                        <div className={styles.card} key={sale.id} onClick={() => handleClick(sale)}>
                            <h2 className={styles.titulo1}>Data da compra</h2>
                            <p className={styles.cardContent}>{new Date(sale.createdAt).toLocaleDateString()}</p>
                            <h2 className={styles.titulo1}>Total</h2>
                            <p className={styles.cardContent}>R$ {sale.total.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                {selectedSale && (
                    <div className={styles.modal}>
                        <h2>Detalhes da Venda</h2>
                        <p>Data da compra: {new Date(selectedSale.createdAt).toLocaleDateString()}</p>
                        {renderSaleDetails()}
                        <button className={styles.cardButton} onClick={() => setSelectedSale(null)}>Fechar</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GetSales;
