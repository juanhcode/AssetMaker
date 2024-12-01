import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bottleneck from "bottleneck";
import defaultLogo from "assets/images/small-logos/nasdaq-logo.png";

// Cabeceras de las credenciales de Alpaca
const headers = {
  "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
  "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
};

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 300,
});

// Caché para almacenar datos
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
const calcularMaxMinRendimiento = (rendimientoPromedio, desviacionEstandar) => {
  const maxRendimiento = rendimientoPromedio + desviacionEstandar;
  const minRendimiento = rendimientoPromedio - desviacionEstandar;
  return { maxRendimiento, minRendimiento };
};

function Data({ selectedOption, pagina }) {
  const [rows, setRows] = useState([]);

  // Obtener precios de NASDAQ
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
      const startDate = new Date(now.setMonth(now.getMonth() - 48)).toISOString().split("T")[0];
      console.time(`${cacheKey}-fetch`);
      console.log(`Realizando petición a Alpaca para ${symbol}`);

      const response = await limiter.schedule(() =>
        fetch(
          `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1M&start=${startDate}&end=${endDate}&limit=1000&adjustment=raw&feed=iex&sort=asc`,
          { headers }
        )
      );
      const data = await response.json();
      const bars = data.bars?.[`${symbol}`] || [];
      console.log(`Precios para ${symbol}:`, bars);

      // Extrayendo precios de cierre
      const precioCierre = bars.map((bar) => bar.c).slice(-48);
      console.log(`Precios de cierre para ${symbol}:`, precioCierre);

      let rendimientos = [];
      for (let i = 1; i < precioCierre.length; i++) {
        const precioActual = precioCierre[i];
        const precioAnterior = precioCierre[i - 1];
        const rendimiento = ((precioActual - precioAnterior) / precioAnterior) * 100;
        rendimientos.push(rendimiento);
      }
      console.log(`Rendimientos para ${symbol}:`, rendimientos);

      const rendimientoPromedio =
        rendimientos.reduce((acc, val) => acc + val, 0) / rendimientos.length;

      // Calcular desviación estándar
      const desviacionEstandar = calcularDesviacionEstandar(rendimientos);
      console.log(`Desviación estándar para ${symbol}:`, desviacionEstandar);

      // Calcular máximos y mínimos rendimientos
      const { maxRendimiento, minRendimiento } = calcularMaxMinRendimiento(
        rendimientoPromedio,
        desviacionEstandar
      );

      const priceData = {
        precioCierre: precioCierre[precioCierre.length - 1],
        rendimiento: rendimientoPromedio.toFixed(2),
        desviacionEstandar: desviacionEstandar.toFixed(2),
        maxRendimiento: maxRendimiento.toFixed(2),
        minRendimiento: minRendimiento.toFixed(2),
      };
      console.log(`Rendimiento promedio para ${symbol}:`, priceData);

      cache[symbol] = priceData;

      console.timeEnd(`${cacheKey}-fetch`);
      return priceData;
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  // Función para obtener datos de las acciones NASDAQ
  const fetchDataNasdaq = async (page) => {
    try {
      if (dataCache[page]) return setRows(dataCache[page]);

      console.time("fetchDataNasdaq");

      const response = await fetch(
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

          return {
            currency: item.symbol,
            price: priceData.precioCierre || 0,
            threeYearReturn: priceData?.rendimiento ? `${priceData.rendimiento}%` : "0.00%",
            desviacionEstandar: priceData?.desviacionEstandar
              ? `${priceData.desviacionEstandar}%`
              : "0.00%",
            maxRendimiento: priceData?.maxRendimiento ? `${priceData.maxRendimiento}%` : "0.00%",
            minRendimiento: priceData?.minRendimiento ? `${priceData.minRendimiento}%` : "0.00%",
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

  useEffect(() => {
    fetchDataNasdaq(pagina.page || 0);
  }, [pagina, selectedOption]);

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
    {
      field: "threeYearReturn",
      headerName: "Rendimiento mensual",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const rendimiento = parseFloat(params.row.threeYearReturn);
        const isPositive = rendimiento >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? `▲ ${params.row.threeYearReturn}` : `▼ ${params.row.threeYearReturn}`}
          </div>
        );
      },
    },
    {
      field: "desviacionEstandar",
      headerName: "Desviación Estándar",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const desviacion = parseFloat(params.row.desviacionEstandar);
        const isPositive = desviacion >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive
              ? `▲ ${params.row.desviacionEstandar}`
              : `▼ ${params.row.desviacionEstandar}`}
          </div>
        );
      },
    },
    {
      field: "maxRendimiento",
      headerName: "Máximo Rendimiento",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const maxRendimiento = parseFloat(params.row.maxRendimiento);
        const isPositive = maxRendimiento >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? `▲ ${params.row.maxRendimiento}` : `▼ ${params.row.maxRendimiento}`}
          </div>
        );
      },
    },
    {
      field: "minRendimiento",
      headerName: "Mínimo Rendimiento",
      type: "number",
      width: 170,
      renderCell: (params) => {
        const minRendimiento = parseFloat(params.row.minRendimiento);
        const isPositive = minRendimiento >= 0;

        return (
          <div style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? `▲ ${params.row.minRendimiento}` : `▼ ${params.row.minRendimiento}`}
          </div>
        );
      },
    },
  ];

  return { columns, rows };
}

Data.propTypes = {
  pagina: PropTypes.object.isRequired,
};

export default Data;
