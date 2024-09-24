import styled from "styled-components";

export const Button = styled.button`
  padding: 1.5rem 2.5rem;
  border-radius: 3rem;
  background: linear-gradient(45deg, var(--primary-color) 20%, var(--primary-hover-color) 80%);
  border: none;
  outline: none;
  color: var(--background-color);
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;

  &:hover {
    background: linear-gradient(45deg, var(--primary-hover-color) 0%, var(--primary-color) 100%);
    color: var(--secondary-contrast-color);
    cursor: pointer;
  }
  &:active {
    background: var(--primary-hover-color);
    color: var(--secondary-contrast-color);
  }
`;
export const Container = styled.div`
  padding: 0 10rem;
  background: var(--background-color);
  color: var(--secondary-contrast-color);
  max-width: 1500px;
  margin: 0 auto;
  @media (max-width: 991px) {
    padding: 0 6rem;
  }
  @media (max-width: 480px) {
    padding: 0 2rem;
  }
`;
export const NoRightPaddingContainer = styled.div`
  padding: 0 0 0 10rem;
  background: var(--background-color);
  max-width: 1500px;
  margin: 0 auto;
  @media (max-width: 991px) {
    padding: 0 0 0 4rem;
  }
  @media (max-width: 600px) {
    padding: 0;
  }
`;
