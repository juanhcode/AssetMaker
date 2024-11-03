import * as React from "react";
import { useState, useEffect } from "react";

// Images
import logoBitcoin from "assets/images/small-logos/bitcoin-btc-logo.png";
import logoLitecoin from "assets/images/small-logos/litecoin-ltc-logo.png";
import logoSolana from "assets/images/small-logos/solana-sol-logo.png";
import logoBNB from "assets/images/small-logos/bnb-bnb-logo.png";
import logoYearnFinance from "assets/images/small-logos/yearn-finance-yfi-logo.png";
import logoEthereum from "assets/images/small-logos/ethereum-eth-logo.png";
import logoMaker from "assets/images/small-logos/maker-mkr-logo.png";

import PropTypes from "prop-types";

Data.propTypes = {
  selectedOption: PropTypes.func.isRequired,
};

// Asocia cada símbolo de criptomoneda con su logo correspondiente
const logos = {
  BTC: logoBitcoin,
  LTC: logoLitecoin,
  SOL: logoSolana,
  BNB: logoBNB,
  YFI: logoYearnFinance,
  ETH: logoEthereum,
  MKR: logoMaker,
};

export default function Data({ selectedOption }) {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  console.log("select option", selectedOption);
  // Función asíncrona para obtener datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=crypto",
        {
          headers: {
            "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
            "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
          },
        }
      );
      const data = await response.json();
      const formattedData = await Promise.all(
        data.map(async (item) => {
          const price = await fetchPriceOfCrypto(item.symbol);
          return {
            id: (data.indexOf(item) + 1).toString(),
            currency: item.symbol,
            name: item.name.split("/")[0].trim(),
            price: price || "N/A",
          };
        })
      );
      formattedData.sort((a, b) => b.price - a.price);
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      //setError("No se pudieron cargar los datos.");
    }
  };

  const fetchPriceOfCrypto = async (symbol) => {
    try {
      const response = await fetch(
        `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${symbol.split("/")[0]}%2F${
          symbol.split("/")[1]
        }&timeframe=1H&start=2024-10-30T00%3A00%3A00Z&end=2024-10-30T16%3A00%3A00-04%3A00&limit=1&sort=desc`,
        {
          headers: {
            "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
            "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
          },
        }
      );
      const data = await response.json();
      console.log(data.bars[symbol][0].c);
      return data.bars[symbol][0].c;
    } catch (error) {
      console.error("Error fetching data:", error);
      //setError("No se pudieron cargar los datos.");
    }
  };

  // Función asíncrona para obtener datos de NASDAQ
  const fetchNasdaqData = async () => {
    try {
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=us_equity&exchange=NASDAQ",
        {
          headers: {
            "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
            "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
          },
        }
      );
      const data = await response.json();
      const formattedData = [
        {
          id: "1",
          currency: "BTC/USD",
          name: "Bitcoin",
          price: 50000,
        },
      ];
      formattedData.sort((a, b) => b.price - a.price);
      console.log("formatted Data", formattedData);
      setRows2(formattedData);
    } catch (error) {
      console.error("Error fetching NASDAQ data:", error);
    }
  };

  const fetchPriceOfNasdaq = async (symbol) => {
    try {
      const response = await fetch(
        `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbols}&timeframe=1H&start=2024-01-03T00%3A00%3A00Z&end=2024-01-04T09%3A30%3A00-04%3A00&limit=1&sort=desc`,
        {
          headers: {
            "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
            "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
          },
        }
      );
      const data = await response.json();
      return data.bars[symbol][0].c;
    } catch (error) {
      console.error("Error fetching data:", error);
      //setError("No se pudieron cargar los datos.");
    }
  };

  // useEffect para ejecutar fetchData cuando se cargue el componente
  useEffect(() => {
    fetchData();
    fetchNasdaqData();
  }, []);

  return selectedOption !== 20
    ? {
        columns: [
          { field: "id", headerName: "#", width: 70 },
          {
            field: "currency",
            headerName: "Moneda",
            width: 130,
            renderCell: (params) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logos[params.row.currency.split("/")[0]]}
                  alt={params.row.currency}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                {params.row.currency}
              </div>
            ),
          },
          { field: "name", headerName: "Nombre", width: 130 },
          { field: "price", headerName: "Precio", type: "number", width: 100 },
        ],
        rows,
      }
    : {
        columns: [
          { field: "id", headerName: "#", width: 70 },
          {
            field: "currency",
            headerName: "Moneda",
            width: 130,
            renderCell: (params) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logos[params.row.currency.split("/")[0]]}
                  alt={params.row.currency}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                {params.row.currency}
              </div>
            ),
          },
          { field: "name", headerName: "Nombre", width: 130 },
          { field: "price", headerName: "Precio", type: "number", width: 100 },
        ],
        rows2,
      };
}
