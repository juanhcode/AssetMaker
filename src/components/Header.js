import React, { useState } from 'react';
import { Navigation, Nav, Ul, Li, Logo } from './Header.style';
import logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';
import { Button, Container } from '../assets/styles/Common.style';
import hamburger from '../assets/images/icon-hamburger.svg';
import close from '../assets/images/icon-close.svg';

const Header = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<div>
			<Container>
				<Navigation>
					<Nav>
						<Logo>
							<img src={logo} alt='' />
						</Logo>
						<Ul className={open ? `active` : `navlinks`}>
							<Li>
								<Link to={`#`}>Inicio</Link>
							</Li>
							<Li>
								<Link to={`#`}>Acerca de</Link>
							</Li>
							<Li>
								<Link to={`#`}>Contacto</Link>
							</Li>
							<Li>
								<Link to={`#`}>Banco</Link>
							</Li>
							<Li>
								<Link to={`#`}>Carrera</Link>
							</Li>
						</Ul>
						<Link to='/Login'>
							<Button>Iniciar Sesión</Button>
						</Link>
						<img
							src={open ? close : hamburger}
							className='hamburger'
							alt=''
							onClick={handleClick}
						/>
					</Nav>
				</Navigation>
			</Container>
		</div>
	);
};

export default Header;
