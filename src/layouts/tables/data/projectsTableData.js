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
import logoUni from "assets/images/small-logos/uniswap-uni-logo.png";
import logoSushi from "assets/images/small-logos/sushiswap-sushi-logo.png";
import logoGrt from "assets/images/small-logos/the-graph-grt-logo.png";
import logoXtz from "assets/images/small-logos/tezos-xtz-logo.png";
import logoUsdt from "assets/images/small-logos/tether-usdt-logo.png";
import logoDoge from "assets/images/small-logos/dogecoin-doge-logo.png";
import logoDot from "assets/images/small-logos/polkadot-new-dot-logo.png";
import logoLink from "assets/images/small-logos/chainlink-link-logo.png";
import logoCrv from "assets/images/small-logos/curve-dao-token-crv-logo.png";
import logoShib from "assets/images/small-logos/shiba-inu-shib-logo.png";
import logoAvax from "assets/images/small-logos/avalanche-avax-logo.png";
import logoBat from "assets/images/small-logos/basic-attention-token-bat-logo.png";
import logoAave from "assets/images/small-logos/aave-aave-logo.png";
import logoUsdc from "assets/images/small-logos/usd-coin-usdc-logo.png";

// Mapeo de logos por símbolo
const logos = {
  BTC: logoBtc,
  BCH: logoBch,
  LTC: logoLtc,
  SOL: logoSol,
  BNB: logoBnb,
  YFI: logoYfi,
  ETH: logoEth,
  MKR: logoMkr,
  UNI: logoUni,
  SUSHI: logoSushi,
  GRT: logoGrt,
  XTZ: logoXtz,
  USDT: logoUsdt,
  DOGE: logoDoge,
  DOT: logoDot,
  LINK: logoLink,
  CRV: logoCrv,
  SHIB: logoShib,
  AAVE: logoAave,
  AVAX: logoAvax,
  BAT: logoBat,
  USDC: logoUsdc,
};

// Configuración de las credenciales de Alpaca
const headers = {
  "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
  "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
};

// Configuración del limitador para evitar exceso de solicitudes
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 300,
});

// Caché para almacenar datos y reducir solicitudes
const cache = {};
const dataCache = {};

// Función para calcular la desviación estándar
const calcularDesviacionEstandar = (rendimientos) => {
  const n = rendimientos.length;
  const media = rendimientos.reduce((acc, val) => acc + val, 0) / n;
  const sumaDeCuadrados = rendimientos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
  return Math.sqrt(sumaDeCuadrados / n);
};

// Función para calcular máximos y mínimos rendimientos
const calcularMaxMinRendimiento = (fiveYearPerformance, fiveYearRisk) => {
  const maximumYield = fiveYearPerformance + fiveYearRisk;
  const minimumYield = fiveYearPerformance - fiveYearRisk;
  return { maximumYield, minimumYield };
};

// Componente principal
function Data({ selectedOption, pagina }) {
  const [rows, setRows] = useState([]);

  // Obtener precios de criptomonedas
  const fetchPriceOfCrypto = async (symbol) => {
    const cacheKey = `cache-${symbol}`;

    try {
      if (cache[symbol]) {
        return cache[symbol];
      }

      const now = new Date();
      const endDate = now.toISOString().split("T")[0];
      const startDate = new Date(now.setMonth(now.getMonth() - 48)).toISOString().split("T")[0];
      console.time(`${cacheKey}-fetch`);

      const response = await limiter.schedule(() =>
        fetch(
          `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${symbol}&timeframe=1M&start=${startDate}&end=${endDate}&limit=1000&sort=asc`,
          { headers }
        )
      );

      const data = await response.json();
      const bars = data.bars?.[`${symbol}`] || [];

      // Extrayendo precios de cierre
      const precioCierre = bars.map((bar) => bar.c).slice(-48);

      let rendimientos = [];
      for (let i = 1; i < precioCierre.length; i++) {
        const precioActual = precioCierre[i];
        const precioAnterior = precioCierre[i - 1];
        const fiveYearPerformance = ((precioActual - precioAnterior) / precioAnterior) * 100;
        rendimientos.push(fiveYearPerformance);
      }

      const fiveYearPerformance =
        rendimientos.reduce((acc, val) => acc + val, 0) / rendimientos.length;

      // Calcular desviación estándar
      const fiveYearRisk = calcularDesviacionEstandar(rendimientos);

      // Calcular máximos y mínimos rendimientos
      const { maximumYield, minimumYield } = calcularMaxMinRendimiento(
        fiveYearPerformance,
        fiveYearRisk
      );

      const priceData = {
        precioCierre: precioCierre[precioCierre.length - 1],
        fiveYearPerformance: fiveYearPerformance.toFixed(2),
        fiveYearRisk: fiveYearRisk.toFixed(2),
        maximumYield: maximumYield.toFixed(2),
        minimumYield: minimumYield.toFixed(2),
      };

      cache[symbol] = priceData;

      return priceData;
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  // Función para obtener datos de las acciones Crypto
  const fetchData = async (page) => {
    try {
      if (dataCache[page]) return setRows(dataCache[page]);
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=crypto",
        { headers }
      );
      const data = await response.json();

      const start = page * 10;
      const end = start + 10;
      const currentPageData = data.slice(start, end);

      const formattedData = await Promise.all(
        currentPageData.map(async (item) => {
          const priceData = await fetchPriceOfCrypto(item.symbol);

          return {
            currency: item.symbol,
            name: item.name.split("/")[0].trim(),
            price: priceData.precioCierre || 0,
            fiveYearPerformance: priceData?.fiveYearPerformance
              ? `${priceData.fiveYearPerformance}%`
              : "0.00%",
            fiveYearRisk: priceData?.fiveYearRisk ? `${priceData.fiveYearRisk}%` : "0.00%",
            maximumYield: priceData?.maximumYield ? `${priceData.maximumYield}%` : "0.00%",
            minimumYield: priceData?.minimumYield ? `${priceData.minimumYield}%` : "0.00%",
          };
        })
      );

      const sortedDataWithIds = formattedData
        .sort((a, b) => b.price - a.price)
        .map((item, index) => ({ ...item, id: start + index + 1 }));

      dataCache[page] = sortedDataWithIds;

      setRows(sortedDataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(pagina.page || 0);
  }, [pagina, selectedOption]);

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    {
      field: "currency",
      headerName: "Moneda",
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logos[params.row.currency.split("/")[0]] || ""}
            alt={params.row.currency}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          {params.row.currency}
        </div>
      ),
    },
    { field: "name", headerName: "Nombre", width: 100 },
    { field: "price", headerName: "Precio", type: "number", width: 80 },
    {
      field: "fiveYearPerformance",
      headerName: "Rendimiento Mensual",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const fiveYearPerformance = parseFloat(params.row.fiveYearPerformance);
        const isPositive = fiveYearPerformance >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive
              ? `▲ ${params.row.fiveYearPerformance}`
              : `▼ ${params.row.fiveYearPerformance}`}
          </div>
        );
      },
    },
    {
      field: "fiveYearRisk",
      headerName: "Desviación Estándar",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const fiveYearRisk = parseFloat(params.row.fiveYearRisk);
        const isPositive = fiveYearRisk >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? `▲ ${params.row.fiveYearRisk}` : `▼ ${params.row.fiveYearRisk}`}
          </div>
        );
      },
    },
    {
      field: "maximumYield",
      headerName: "Máximo Rendimiento",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const maximumYield = parseFloat(params.row.maximumYield);
        const isPositive = maximumYield >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? `▲ ${params.row.maximumYield}` : `▼ ${params.row.maximumYield}`}
          </div>
        );
      },
    },
    {
      field: "minimumYield",
      headerName: "Mínimo Rendimiento",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const minimumYield = parseFloat(params.row.minimumYield);
        const isPositive = minimumYield >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? `▲ ${params.row.minimumYield}` : `▼ ${params.row.minimumYield}`}
          </div>
        );
      },
    },
  ];

  return { columns, rows };
}

Data.propTypes = {
  selectedOption: PropTypes.func.isRequired,
  pagina: PropTypes.object.isRequired,
};

export default Data;
