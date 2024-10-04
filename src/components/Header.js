import React, { useState } from "react";
import { Navigation, Nav, Ul, Li, Logo } from "./Header.style";
import logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";
import { Button, Container } from "../assets/styles/Common.style";
import { HashLink } from "react-router-hash-link";
import classNames from "classnames";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <header>
      <Container>
        <Navigation>
          <Nav>
            <Logo>
              <img src={logo} alt="Logo" />
            </Logo>
            <Ul className={classNames("navlinks", { open })}>
              <Li>
                <HashLink smooth to="/#">
                  Inicio
                </HashLink>
              </Li>
              <Li>
                <HashLink smooth to="/#info">
                  Acerca de
                </HashLink>
              </Li>
              <Li>
                <HashLink smooth to="/#contacto">
                  Contacto
                </HashLink>
              </Li>
            </Ul>
            <Link to="/login" className="desktop-button">
              <Button>Iniciar Sesión</Button>
            </Link>
          </Nav>
        </Navigation>
      </Container>
    </header>
  );
};

export default Header;
