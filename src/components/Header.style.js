import styled from 'styled-components';

export const Navigation = styled.header`
	width: 100%;
	overflow: hidden;
	background-color: var(--background-color);
	z-index: 999;
	position: relative;
	@media (max-width: 600px) {
		overflow: visible;
	}
`;
export const Nav = styled.nav`
	padding: 3rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.hamburger {
		max-width: 3rem;
		display: none;
	}

	@media (max-width: 600px) {
		button {
			display: none;
		}
		.hamburger {
			display: block;
		}
	}
`;
export const Ul = styled.ul`
	display: flex;
	width: 50%;
	justify-content: space-between;
	@media (max-width: 600px) {
		flex-direction: column;
		width: 100%;
		align-items: center;
		position: absolute;
		top: 100px;
		background-color: var(--secondary-contrast-color);
		display: none;
		padding: 4rem 0;
		text-align: center;
		transition: all 0.3s ease;
	}
`;
export const Li = styled.li`
	padding: 1rem 0;
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
`;
