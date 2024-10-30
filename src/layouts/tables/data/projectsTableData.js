import * as React from "react";
import { useState, useEffect } from "react";

// Images
import logoBitcoin from "assets/images/small-logos/bitcoin-btc-logo.png";
import logoLitecoin from "assets/images/small-logos/litecoin-ltc-logo.png";
import logoSolana from "assets/images/small-logos/solana-sol-logo.png";
import logoBNB from "assets/images/small-logos/bnb-bnb-logo.png";

// Asocia cada símbolo de criptomoneda con su logo correspondiente
const logos = {
  BTC: logoBitcoin,
  LTC: logoLitecoin,
  SOL: logoSolana,
  BNB: logoBNB,
};

export default function Data() {
  const [rows, setRows] = useState([]);

  // Función asíncrona para obtener datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch("https://mocki.io/v1/11782e13-14fb-4c68-9baf-7bf1193de0c9");
      const data = await response.json();

      // Mapear los datos para la tabla
      const formattedData = data.map((item) => ({
        id: item.id,
        asset: item.asset,
        currency: item.currency,
        name: item.name,
        price: item.price,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No se pudieron cargar los datos.");
    }
  };

  // useEffect para ejecutar fetchData cuando se cargue el componente
  useEffect(() => {
    fetchData();
  }, []);

  return {
    columns: [
      { field: "id", headerName: "#", width: 70 },
      {
        field: "asset",
        headerName: "Activo",
        width: 160,
        renderCell: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logos[params.row.asset]}
              alt={params.row.asset}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {params.row.asset}
          </div>
        ),
      },
      { field: "currency", headerName: "Moneda", width: 130 },
      { field: "name", headerName: "Nombre", width: 130 },
      { field: "price", headerName: "Precio", type: "number", width: 100 },
    ],

    rows, // Los datos obtenidos de la API
  };
}
