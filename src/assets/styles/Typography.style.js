import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  color: var(--secondary-contrast-color);
  @media (max-width: 480px) {
    font-size: 3.5rem;
  }
`;
export const H2 = styled.h2`
  font-size: 3.2rem;
  font-weight: bold;
  color: var(--secondary-contrast-color);
`;
export const H3 = styled.h3`
  font-size: 2.2rem;
  font-weight: 300;
  color: var(--secondary-contrast-color);
`;
export const H4 = styled.h4`
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--background-color);
`;
export const H5 = styled.h5`
  font-size: 1.2;
  font-weight: 300;
  color: var(--background-color);
`;
export const Para = styled.p`
  font-size: 1.6rem;
  color: var(--secondary-contrast-color);
  line-height: 1.5;
`;
