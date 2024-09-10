import styled from 'styled-components';

export const FooterWrapper = styled.footer`
	background: var(--background-color);
	padding: 6rem 0;
	color: var(--secondary-contrast-color);

	.footer_inner {
		display: flex;
		justify-content: space-between;
		width: 100%;
		@media (max-width: 480px) {
			flex-direction: column;
			align-items: center;
		}
	}
`;
export const FooterLinks = styled.div`
	display: flex;
	width: 60%;
	justify-content: space-between;
	.logo {
		max-width: 15rem;
	}
	.social-icons {
		margin-top: 4rem;
		img {
			max-width: 2rem;
			margin-right: 1rem;
			alt: 'Social Icon'
		}
	}
	.link {
		display: flex;
		flex-direction: column;
		a {
			margin-bottom: 1rem;
			color: var(--secondary-contrast-color);
			text-decoration: none;
		}
	}
	@media (max-width: 480px) {
		flex-direction: column;
		align-items: center;
		.footer-top {
			padding-bottom: 1.5rem;
			text-align: center;
		}
	}
`;
