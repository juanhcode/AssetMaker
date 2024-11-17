import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bottleneck from "bottleneck";
import logoBtc from "assets/images/small-logos/bitcoin-btc-logo.png";
import logoLtc from "assets/images/small-logos/litecoin-ltc-logo.png";
import logoSol from "assets/images/small-logos/solana-sol-logo.png";
import logoBnb from "assets/images/small-logos/bnb-bnb-logo.png";
import logoYfi from "assets/images/small-logos/yearn-finance-yfi-logo.png";
import logoEth from "assets/images/small-logos/ethereum-eth-logo.png";
import logoMkr from "assets/images/small-logos/maker-mkr-logo.png";
import logoBch from "assets/images/small-logos/bitcoin-cash-bch-logo.png";
import defaultLogo from "assets/images/small-logos/nasdaq-logo.png";

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

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 300,
});

const cache = {};
const dataCache = {};

function Data({ selectedOption }) {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);

  const fetchPriceOfCrypto = async (symbol) => {
    const cacheKey = `cache-${symbol}`;

    try {
      if (cache[symbol]) {
        console.time(`${cacheKey}-cache`);
        console.log(`Usando caché para ${symbol}`);
        console.timeEnd(`${cacheKey}-cache`);
        return cache[symbol];
      }

      const now = new Date();
      const endDate = now.toISOString().split("T")[0];
      const startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString().split("T")[0];

      console.time(`${cacheKey}-fetch`);
      console.log(`Realizando petición a Alpaca para ${symbol}`);
      const response = await limiter.schedule(() =>
        fetch(
          `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${symbol}&timeframe=1M&start=${startDate}&end=${endDate}&limit=1&sort=desc`,
          { headers }
        )
      );
      const data = await response.json();
      const price = data.bars?.[symbol]?.[0]?.c ?? 0;

      cache[symbol] = price;

      console.timeEnd(`${cacheKey}-fetch`);
      return price;
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const fetchData = async (page = 0) => {
    try {
      if (dataCache[page]) {
        setRows(dataCache[page]);
        return;
      }

      console.time("fetchData");

      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=crypto",
        { headers }
      );
      const data = await response.json();

      const start = page * 10;
      const end = start + 10;
      const currentPageData = data.slice(start, end);

      // Solo hacer peticiones para los elementos del slice
      const formattedData = await Promise.all(
        currentPageData.map(async (item) => {
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

      const sortedDataWithIds = formattedData
        .sort((a, b) => b.price - a.price)
        .map((item, index) => ({ ...item, id: (index + 1).toString() }));

      dataCache[page] = sortedDataWithIds;

      setRows(sortedDataWithIds);

      console.timeEnd("fetchData");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedOption === 10) {
      fetchData();
    }
  }, [selectedOption]);

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
