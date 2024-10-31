import React, { useState } from "react";
import { NoRightPaddingContainer } from "../../assets/styles/Common.style";
import { H1, Para } from "../../assets/styles/Typography.style";
import { HeroWrapper, HeroContent, HeroImage, HeroContentWrapper } from "./Hero.style";
import HeroImg from "../../assets/images/landing.jpg";
import HeroImgLowRes from "../../assets/images/landing-low-res.jpg";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <NoRightPaddingContainer>
      <HeroWrapper>
        <HeroContent>
          <HeroContentWrapper>
            <H1> Potencie su futuro financiero</H1>
            <Para>
              Bienvenido a AssetMaker, una plataforma diseñada para ayudarle a gestionar su
              portafolio de inversiones de manera sencilla y eficiente. Con nuestras herramientas
              intuitivas, puede monitorear, organizar y optimizar sus activos, todo en un solo
              lugar. Tome el control de sus inversiones y comience a construir su camino hacia la
              estabilidad financiera con AssetMaker.
            </Para>
          </HeroContentWrapper>
        </HeroContent>
        <HeroImage className={isImageLoaded ? "loaded" : ""}>
          <img
            src={HeroImgLowRes}
            data-src={HeroImg}
            alt="hero"
            className={`hero-img ${isImageLoaded ? "loaded" : ""}`}
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </HeroImage>
      </HeroWrapper>
    </NoRightPaddingContainer>
  );
};

export default Hero;
