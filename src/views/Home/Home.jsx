import React from "react";
import Hero from "../../components/hero/Hero";
import Info from "../../components/information/Info";
import Footer from "../../components/footerLanding/Footer";
import Header from "../../components/Header";
import { HomeContainer } from "./Home.style";

const Home = () => {
  return (
    <div>
      <HomeContainer>
        <Header />
        <Hero />
        <Info />
        <Footer />
      </HomeContainer>
    </div>
  );
};

export default Home;
