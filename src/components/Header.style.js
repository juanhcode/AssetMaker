import styled from "styled-components";

export const Navigation = styled.header`
  width: 100%;
  overflow: hidden;
  background-color: var(--background-color);
  z-index: 999;
  position: relative;
  @media (max-width: 768px) {
    overflow: visible;
  }
`;
export const Nav = styled.nav`
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hamburger {
    max-width: 3rem;
    display: none;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    .hamburger {
      display: block;
    }
    button {
      display: none;
    }
  }
`;
export const Ul = styled.ul`
  display: flex;
  width: 30%;
  justify-content: space-around;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    position: absolute;
    top: 100px;
    left: 0;
    background-color: var(--secondary-contrast-color);
    display: none;
    padding: 4rem 0;
    text-align: center;
    transition: all 0.3s ease;
    gap: 1.5rem;
    &.open {
      display: block;
    }
  }
`;
export const Li = styled.li`
  padding: 1rem 0;
  @media (max-width: 768px) {
    .mobile-button {
      display: block;
    }
  }
`;
export const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  @media (max-width: 768px) {
    width: 120px;
  }
`;
