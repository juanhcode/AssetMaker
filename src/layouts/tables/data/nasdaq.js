import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bottleneck from "bottleneck";
import defaultLogo from "assets/images/small-logos/nasdaq-logo.png";

// Cabeceras de las credenciales de Alpaca
const headers = {
  "Apca-Api-Key-Id": "PK6NYSR7W1ZRXWLX2NC9",
  "Apca-Api-Secret-Key": "UTTc5XPc8J8qIpRVHTLmzi5ZIg30xsgy0yipL9b3",
};

// Configuración del limitador para evitar exceso de solicitudes
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
const calcularMaxMinRendimiento = (fiveYearPerformance, fiveYearRisk) => {
  const maximumYield = fiveYearPerformance + fiveYearRisk;
  const minRendimiento = fiveYearPerformance - fiveYearRisk;
  return { maximumYield, minRendimiento };
};

// Componente principal
function Data({ selectedOption, pagina }) {
  const [rows, setRows] = useState([]);

  // Obtener precios de NASDAQ
  const fetchPriceOfNasdaq = async (symbol) => {
    const cacheKey = `cache-${symbol}`;

    try {
      if (cache[symbol]) {
        return cache[symbol];
      }

      const now = new Date();
      const endDate = now.toISOString().split("T")[0];
      const startDate = new Date(now.setMonth(now.getMonth() - 48)).toISOString().split("T")[0];

      const response = await limiter.schedule(() =>
        fetch(
          `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1M&start=${startDate}&end=${endDate}&limit=1000&adjustment=raw&feed=iex&sort=asc`,
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
      const { maximumYield, minRendimiento } = calcularMaxMinRendimiento(
        fiveYearPerformance,
        fiveYearRisk
      );

      const priceData = {
        precioCierre: precioCierre[precioCierre.length - 1],
        fiveYearPerformance: fiveYearPerformance.toFixed(2),
        fiveYearRisk: fiveYearRisk.toFixed(2),
        maximumYield: maximumYield.toFixed(2),
        minRendimiento: minRendimiento.toFixed(2),
      };

      cache[symbol] = priceData;

      console.timeEnd(`${cacheKey}-fetch`);
      return priceData;
    } catch (error) {
      console.log("Error al obtener precios de NASDAQ:", error);
    }
  };

  // Función para obtener datos de las acciones NASDAQ
  const fetchDataNasdaq = async (page) => {
    try {
      if (dataCache[page]) return setRows(dataCache[page]);

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
            fiveYearPerformance: priceData?.fiveYearPerformance
              ? `${priceData.fiveYearPerformance}%`
              : "0.00%",
            fiveYearRisk: priceData?.fiveYearRisk ? `${priceData.fiveYearRisk}%` : "0.00%",
            maximumYield: priceData?.maximumYield ? `${priceData.maximumYield}%` : "0.00%",
            minRendimiento: priceData?.minRendimiento ? `${priceData.minRendimiento}%` : "0.00%",
          };
        })
      );

      const sortedDataWithIds = formattedData
        .sort((a, b) => b.price - a.price)
        .map((item, index) => ({ ...item, id: start + index + 1 }));

      dataCache[page] = sortedDataWithIds;

      setRows(sortedDataWithIds);
    } catch (error) {
      console.log("Error al obtener datos de NASDAQ:", error);
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
      field: "fiveYearPerformance",
      headerName: "Rendimiento mensual",
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
        const desviacion = parseFloat(params.row.fiveYearRisk);
        const isPositive = desviacion >= 0;

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
