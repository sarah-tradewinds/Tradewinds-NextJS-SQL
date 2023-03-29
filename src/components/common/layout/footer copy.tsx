// Third party packages
import { useTranslation } from 'next-i18next';

// store
import { useHomeStore } from 'store/home';

const Footer: React.FC = () => {
	const isEco = useHomeStore(({ isEco }) => isEco);

	const { t } = useTranslation('footer');

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<footer className="bg-accent-primary-main dark:bg-bg-eco">
			<div className="relative flex h-[80px] flex-col items-center justify-center">
				<button
					onClick={goToTop}
					className="mb-6 text-center font-semibold text-white dark:text-accent-secondary-eco"
				>
					{t('back_to_top')}
				</button>
				<div className="absolute -bottom-7 rounded-full bg-accent-primary-main p-2 dark:bg-bg-eco">
					<img
						alt="..."
						src={
							isEco
								? '/eco-tradewinds.png'
								: '/static/images/EcoPage/footerlogo.png'
						}
						className=""
					/>
				</div>
			</div>
			<div className="h-[400px] w-full bg-primary-main dark:bg-primary-eco"></div>
		</footer>
	);
};

export default Footer;
