import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
    --DarkBlue: hsl(233, 26%, 24%);
    --BrightYellow: hsl(51, 100%, 50%);
    --DarkYellow: hsl(51, 100%, 50%);

    --White: hsl(233, 8%, 111%);
    --Black: hsl(0, 0%, 0%);
    --GrayishBlue: hsl(210, 20%, 90%);
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
