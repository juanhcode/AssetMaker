import React from 'react';
import { Container } from '../../assets/styles/Common.style.js';
import { H2, H3, Para } from '../../assets/styles/Typography.style.js';
import { InfoCard, InfoGrid, InfoHeader, InfoWrapper } from './Info.style';
import BankingIcon from '../../assets/images/icon-online.svg';
import BudgetingIcomn from '../../assets/images/icon-budgeting.svg';
import Onboarding from '../../assets/images/icon-onboarding.svg';
import Api from '../../assets/images/icon-api.svg';

const Info = () => {
	return (
		<InfoWrapper>
			<Container>
				<InfoHeader>
					<H2>¿Por qué elegir AssetMaker?</H2>
					<Para>
						{' '}
						Aprovechamos las mejores herramientas digitales para convertir
						su portafolio en el centro de su estrategia financiera.
						Gestione y controle sus inversiones de manera más fácil y eficiente que nunca.
					</Para>
				</InfoHeader>
				<InfoGrid>
					<InfoCard>
						<img src={BankingIcon} alt='Banca en línea' />
						<H3>Banca en Línea</H3>
						<Para>
							Nuestra modernas aplicaciones web le permite gestionar
							su portafolio de inversiones desde cualquier lugar del mundo.
						</Para>
					</InfoCard>
					<InfoCard>
						<img src={BudgetingIcomn} alt='Presupuestación sencilla' />
						<H3> Presupuestación Sencilla</H3>
						<Para>
							Vea claramente cómo se distribuyen sus inversiones cada mes.
							Reciba alertas cuando esté cerca de sus límites de inversión.
						</Para>
					</InfoCard>
					<InfoCard>
						<img src={Onboarding} alt='Incorporación rápida' />
						<H3> Incorporación Rápida</H3>
						<Para>
							Olvídese de las sucursales físicas. Abra su cuenta en minutos
							en línea y comience a administrar su portafolio de inmediato.
						</Para>
					</InfoCard>
					<InfoCard>
						<img src={Api} alt='API abierta' />
						<H3> API Abierta</H3>
						<Para>
							Controle sus ahorros, inversiones y más desde una sola cuenta.
							Rastrear y ajustar su portafolio nunca ha sido tan fácil.
						</Para>
					</InfoCard>
				</InfoGrid>
			</Container>
		</InfoWrapper>
	);
};

export default Info;
