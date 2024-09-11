import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
  --primary-color: #ffd700; /* Amarillo brillante */
  --primary-hover-color: #e6c200; /* Amarillo oscuro para hover */
  --secondary-color: #000000; /* Negro */
  --secondary-hover-color: #333333; /* Gris oscuro para hover */
  --secondary-contrast-color: #fff;
  --background-color: #000000; /* Fondo negro */
  --text-color: #ffd700; /* Texto amarillo brillante */
}

*{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
}

    html {
        font-size: 62.5%;
    }
    body {
        font-family: 'Public Sans', sans-serif;
    }
    a{
        color: var(--secondary-contrast-color);
        font-size: 1.4rem;
        transition: color 0.3s ease;
    }
    a:hover {
        color: var(--secondary-contrast-color);
    }
    img {
        width: 100%;
        height: auto;
    }
`;

export default GlobalStyle;
