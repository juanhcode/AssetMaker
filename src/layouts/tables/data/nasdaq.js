import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bottleneck from "bottleneck";
import defaultLogo from "assets/images/small-logos/nasdaq-logo.png";

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

function Data({ pagina }) {
  const [rows, setRows] = useState([]);

  const fetchPriceOfNasdaq = async (symbol) => {
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
          //
          `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1D&start=${startDate}&end=${endDate}&limit=10&adjustment=raw&feed=iex&sort=desc`,
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

  const fetchDataNasdaq = async (page) => {
    try {
      if (dataCache[page]) {
        setRows(dataCache[page]);
        return;
      }

      console.time("fetchDataNasdaq");

      const response = await fetch(
        //https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=us_equity&exchange=NASDAQ&attributes=
        "https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=us_equity&exchange=NASDAQ",
        { headers }
      );
      const data = await response.json();

      const start = page * 10;
      const end = start + 10;
      const currentPageData = data.slice(start, end);

      const formattedData = await Promise.all(
        currentPageData.map(async (item) => {
          const priceData = await fetchPriceOfNasdaq(item.symbol);

          const monthlyReturn =
            priceData.initial !== 0
              ? ((priceData.final - priceData.initial) / priceData.initial) * 100
              : 0;

          const monthlyRisk = calculateStandardDeviation(priceData.prices);

          return {
            currency: item.symbol,
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

      console.timeEnd("fetchDataNasdaq");
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
    fetchDataNasdaq(pagina.page || 0);
  }, [pagina]);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "currency",
      headerName: "Acciones",
      width: 130,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={defaultLogo}
            alt={params.row.currency}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          {params.row.currency}
        </div>
      ),
    },
    { field: "price", headerName: "Precio", type: "number", width: 100 },
    { field: "monthlyReturn", headerName: "Rendimiento mensual", type: "number", width: 150 },
    { field: "monthlyRisk", headerName: "Riesgo mensual", type: "number", width: 130 },
    { field: "minReturn", headerName: "Rendimiento mínimo", type: "number", width: 150 },
    { field: "maxReturn", headerName: "Rendimiento máximo", type: "number", width: 150 },
  ];

  return { columns, rows };
}

Data.propTypes = {
  pagina: PropTypes.object.isRequired,
};

export default Data;
