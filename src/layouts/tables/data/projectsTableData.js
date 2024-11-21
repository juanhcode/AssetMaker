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

function Data({ selectedOption, pagina }) {
  const [rows, setRows] = useState([]);

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
          `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${symbol}&timeframe=1D&start=${startDate}&end=${endDate}&sort=desc`,
          { headers }
        )
      );
      const data = await response.json();
      const prices = data.bars?.[symbol] || [];

      const priceData = {
        prices: prices.map((bar) => bar.c),
        min: Math.min(...prices.map((bar) => bar.l)),
        max: Math.max(...prices.map((bar) => bar.h)),
        initial: prices.length ? prices[0].o : 0,
        final: prices.length ? prices[prices.length - 1].c : 0,
      };

      cache[symbol] = priceData;

      console.timeEnd(`${cacheKey}-fetch`);
      return priceData;
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const fetchData = async (page) => {
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

      const formattedData = await Promise.all(
        currentPageData.map(async (item) => {
          const priceData = await fetchPriceOfCrypto(item.symbol);

          const monthlyReturn = ((priceData.final - priceData.initial) / priceData.initial) * 100;
          const monthlyRisk = calculateStandardDeviation(priceData.prices);

          return {
            currency: item.symbol,
            name: item.name.split("/")[0].trim(),
            price: priceData.final || 0,
            monthlyReturn: monthlyReturn.toFixed(2),
            monthlyRisk: monthlyRisk.toFixed(2),
            minReturn: priceData.min.toFixed(2),
            maxReturn: priceData.max.toFixed(2),
          };
        })
      );

      const sortedDataWithIds = formattedData
        .sort((a, b) => b.price - a.price)
        .map((item, index) => ({ ...item, id: start + index + 1 }));

      dataCache[page] = sortedDataWithIds;

      setRows(sortedDataWithIds);

      console.timeEnd("fetchData");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateStandardDeviation = (values) => {
    if (values.length === 0) return 0;
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
    return Math.sqrt(avgSquaredDiff);
  };

  useEffect(() => {
    fetchData(pagina.page || 0);
  }, [pagina]);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "currency",
      headerName: "Moneda",
      width: 130,
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
    { field: "name", headerName: "Nombre", width: 130 },
    { field: "price", headerName: "Precio", type: "number", width: 100 },
    { field: "monthlyReturn", headerName: "Rendimiento mensual", type: "number", width: 150 },
    { field: "monthlyRisk", headerName: "Riesgo mensual", type: "number", width: 130 },
    { field: "minReturn", headerName: "Rendimiento mínimo", type: "number", width: 150 },
    { field: "maxReturn", headerName: "Rendimiento máximo", type: "number", width: 150 },
  ];

  return { columns, rows };
}

Data.propTypes = {
  selectedOption: PropTypes.func.isRequired,
  pagina: PropTypes.object.isRequired,
};

export default Data;
