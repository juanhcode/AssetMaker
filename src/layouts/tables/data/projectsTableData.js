import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Images
import logoBtc from "assets/images/small-logos/bitcoin-btc-logo.png";
import logoLtc from "assets/images/small-logos/litecoin-ltc-logo.png";
import logoSol from "assets/images/small-logos/solana-sol-logo.png";
import logoBnb from "assets/images/small-logos/bnb-bnb-logo.png";
import logoYfi from "assets/images/small-logos/yearn-finance-yfi-logo.png";
import logoEth from "assets/images/small-logos/ethereum-eth-logo.png";
import logoMkr from "assets/images/small-logos/maker-mkr-logo.png";
import logoBch from "assets/images/small-logos/bitcoin-cash-bch-logo.png";
import defaultLogo from "assets/images/small-logos/nasdaq-logo.png";

// Asocia cada símbolo de criptomoneda con su logo correspondiente
const logos = {
  BTC: logoBtc,
  BCH: logoBch,
  LTC: logoLtc,
  SOL: logoSol,
  BNB: logoBnb,
  YFI: logoYfi,
  ETH: logoEth,
  MKR: logoMkr,
};

const headers = {
  "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
  "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
};

function Data({ selectedOption }) {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);

  // Función asíncrona para obtener datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=crypto",
        { headers }
      );
      const data = await response.json();

      // Mapear y obtener el precio de cada activo
      const formattedData = await Promise.all(
        data.map(async (item) => {
          const price = await fetchPriceOfCrypto(item.symbol);
          return {
            currency: item.symbol,
            name: item.name.split("/")[0].trim(),
            price: price || 0,
            monthlyReturn: (Math.random() * 5).toFixed(2),
            monthlyRisk: (Math.random() * 5).toFixed(2),
            minReturn: (Math.random() * 3).toFixed(2),
            maxReturn: (Math.random() * 8).toFixed(2),
          };
        })
      );
      // Ordenar los datos por precio de mayor a menor, limitar a 20 resultados y asignar el ID en base al orden posterior.
      const sortedDataWithIds = formattedData
        .sort((a, b) => b.price - a.price)
        //.slice(0, 20)
        .map((item, index) => ({ ...item, id: (index + 1).toString() }));

      setRows(sortedDataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPriceOfCrypto = async (symbol) => {
    try {
      const now = new Date(); // Obtiene la fecha y hora actuales
      const endDate = now.toISOString().split("T")[0]; // Convierte la fecha actual a formato "YYYY-MM-DD"
      const startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString().split("T")[0]; // Un mes atrás

      const response = await fetch(
        `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${symbol}&timeframe=1M&start=${startDate}&end=${endDate}&limit=1&sort=desc`,
        /*`https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${symbol.split("/")[0]}%2F${
          symbol.split("/")[1]
        }&timeframe=1M&start=${startDate}&end=${endDate}&limit=1&sort=desc`,*/
        { headers }
      );
      const data = await response.json();
      return data.bars?.[symbol]?.[0]?.c ?? 0;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Función asíncrona para obtener datos de NASDAQ
  const fetchNasdaqData = async () => {
    try {
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=us_equity&exchange=NASDAQ&attributes=",
        { headers }
      );
      const data = await response.json();
      // Mapear y obtener el precio de cada activo
      const formattedData = await Promise.all(
        data.map(async (item) => {
          const price = await fetchPriceOfNasdaq(item.symbol);
          return {
            currency: item.symbol,
            price: price || 0,
            monthlyReturn: (Math.random() * 5).toFixed(2),
            monthlyRisk: (Math.random() * 5).toFixed(2),
            minReturn: (Math.random() * 3).toFixed(2),
            maxReturn: (Math.random() * 8).toFixed(2),
          };
        })
      );
      // Ordenar los datos por precio de mayor a menor, limitar a 20 resultados y asignar el ID en base al orden posterior.
      const sortedDataWithIds = formattedData
        .sort((a, b) => b.price - a.price)
        //.slice(0, 20)
        .map((item, index) => ({ ...item, id: (index + 1).toString() }));

      setRows2(sortedDataWithIds);
    } catch (error) {
      console.error("Error fetching NASDAQ data:", error);
    }
  };

  const fetchPriceOfNasdaq = async (symbol) => {
    try {
      const now = new Date(); // Obtiene la fecha y hora actuales
      const endDate = now.toISOString().split("T")[0]; // Convierte la fecha actual a formato "YYYY-MM-DD"
      const startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString().split("T")[0]; // Un mes atrás

      const response = await fetch(
        `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1M&start=${startDate}&end=${endDate}&limit=10&adjustment=raw&feed=iex&sort=desc`,
        //`https://data.alpaca.markets/v2/stocks/bars?symbols=AAPL&timeframe=1M&start=2024-10-01&end=2024-11-01&limit=10&adjustment=raw&feed=iex&sort=desc`,
        { headers }
      );
      const data = await response.json();
      const recentPrice = data.bars?.[symbol]?.[0]?.c ?? 0;
      console.log("Precio nasdaq", recentPrice);
      return recentPrice;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect para ejecutar fetchData cuando se cargue el componente
  useEffect(() => {
    fetchData();
    fetchNasdaqData();
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "currency",
      headerName: selectedOption !== 20 ? "Moneda" : "Acciones",
      width: 130,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              selectedOption === 20 ? defaultLogo : logos[params.row.currency.split("/")[0]] || ""
            }
            alt={params.row.currency}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          {params.row.currency}
        </div>
      ),
    },
    ...(selectedOption !== 20 ? [{ field: "name", headerName: "Nombre", width: 130 }] : []),
    { field: "price", headerName: "Precio", type: "number", width: 100 },
    { field: "monthlyReturn", headerName: "Rendimiento mensual", type: "number", width: 150 },
    { field: "monthlyRisk", headerName: "Riesgo mensual", type: "number", width: 130 },
    { field: "minReturn", headerName: "Rendimiento mínimo", type: "number", width: 150 },
    { field: "maxReturn", headerName: "Rendimiento máximo", type: "number", width: 150 },
  ];

  return { columns, rows: selectedOption !== 20 ? rows : rows2 };
}

Data.propTypes = {
  selectedOption: PropTypes.func.isRequired,
};

export default Data;
