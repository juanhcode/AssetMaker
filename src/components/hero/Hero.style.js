import styled from "styled-components";
export const HeroWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }
`;
export const HeroContent = styled.div`
  flex: 1;
  padding: 1rem;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const HeroImage = styled.div`
  flex: 1;
  position: relative;
  height: 70vh;
  background-size: cover;
  background-position: center;
  img {
    position: absolute;
    max-width: 90%;
    top: 10%;
    right: 35%;
  }
  &.loaded img {
    display: block;
  }
  @media (max-width: 1200px) {
    width: 65%;
    img {
      max-width: 70%;
      top: 0;
      right: 10%;
    }
  }
  @media (max-width: 767px) {
    width: 40%;
    img {
      max-width: 100%;
      top: 20%;
      right: 10%;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    img {
      max-width: 100%;
      top: -10rem;
      right: 0;
    }
  }

  @media (max-width: 480px) {
    height: 60vh;
  }
`;
export const HeroContentWrapper = styled.div`
  max-width: 40rem;
  @media (max-width: 600px) {
    text-align: center;
    padding: 2rem;
  }
`;
