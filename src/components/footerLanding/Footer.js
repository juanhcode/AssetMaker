import React from "react";
import { FooterLinks, FooterWrapper } from "./Footer.style";
import logo from "../../assets/images/Logo.png";
import iconFb from "../../assets/images/icon-facebook.svg";
import iconTwitter from "../../assets/images/icon-twitter.svg";
import iconYoutube from "../../assets/images/icon-youtube.svg";
import iconPinterest from "../../assets/images/icon-pinterest.svg";
import { Container } from "../../assets/styles/Common.style";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <div className="footer_inner">
          <FooterLinks>
            <div className="footer-top">
              <div className="logo">
                <img src={logo} alt="Logo de AssetMaker" />
              </div>
              <div className="social-icons">
                <img src={iconFb} alt="Facebbok" />
                <img src={iconTwitter} alt="Twitter" />
                <img src={iconYoutube} alt="YouTube" />
                <img src={iconPinterest} alt="Pinterest" />
              </div>
            </div>
            <div className="link">
              <HashLink smooth to="/#info">
                Acerca de
              </HashLink>
              <Link to="/contact">Contacto</Link> <Link to="/blog">Blog</Link>
            </div>
            <div className="link">
              <Link to="/Support">Soporte</Link>
              <Link to="/Help">Ayuda</Link>
            </div>
          </FooterLinks>
        </div>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
