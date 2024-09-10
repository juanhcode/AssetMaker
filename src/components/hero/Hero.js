import React from 'react';
import { NoRightPaddingContainer } from '../../assets/styles/Common.style';
import { H1, Para } from '../../assets/styles/Typography.style';
import {
	HeroWrapper,
	HeroContent,
	HeroImage,
	HeroContentWrapper,
} from './Hero.style';
import HeroImg from '../../assets/images/Fund.png';

const Hero = () => {
	return (
		<NoRightPaddingContainer>
			<HeroWrapper>
				<HeroContent>
					<HeroContentWrapper>
						<H1> Potencie su futuro financiero</H1>
						<Para>
							Bienvenido a AssetMaker, una plataforma diseñada para ayudarle a gestionar su portafolio de
							inversiones de manera sencilla y eficiente. Con nuestras herramientas intuitivas,
							puede monitorear, organizar y optimizar sus activos, todo en un solo lugar.
							Tome el control de sus inversiones y comience a construir
							su camino hacia la estabilidad financiera con AssetMaker.
						</Para>
					</HeroContentWrapper>
				</HeroContent>
				<HeroImage>
					<img src={HeroImg} alt='hero' />
				</HeroImage>
			</HeroWrapper>
		</NoRightPaddingContainer>
	);
};

export default Hero;
