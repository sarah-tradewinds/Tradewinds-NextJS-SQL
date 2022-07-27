// Third party packages
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { useTranslation } from 'next-i18next';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Button from '../common/form/button';

interface CountrySliderProps {
	countries: {
		id: string;
		name: any;
		slug: any;
		image: { url: string };
	}[];
	onCountryClick?: (country: any) => any;
}

const CountrySlider: React.FC<CountrySliderProps> = (props) => {
	const { countries, onCountryClick } = props;

	const { t } = useTranslation('home');

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 2,
			spacing: 8
		},
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 4, spacing: 8 }
			},
			'(min-width: 768px)': {
				slides: { perView: 6, spacing: 8 }
			},
			'(min-width: 1024px)': {
				slides: { perView: 8, spacing: 8 }
			}
		}
	});

	return (
		<div className="relative bg-gradient-to-r from-primary-main to-primary-main/80 pb-6 dark:from-primary-eco dark:to-primary-eco/80">
			<div className="my-4 flex items-center justify-center space-x-4">
				<div className="w-40 rounded-l-lg border border-white md:w-56 lg:w-80"></div>
				<p className="whitespace-nowrap py-2 text-center text-white">
					{t('shop_by_country')}
				</p>
				<div className="w-40   border border-white md:w-56 lg:w-80"></div>
			</div>

			<div ref={ref} className="keen-slider">
				{countries.map((country) => (
					<Button
						key={country.id}
						onClick={() => {
							if (onCountryClick) {
								onCountryClick(country);
							}
						}}
						className="keen-slider__slide"
					>
						<ImageWithErrorHandler
							src={country.image?.url}
							alt=""
							width="107px"
							height="64.2px"
						/>
					</Button>
				))}
			</div>

			{/* Shading */}
			<div className="absolute top-0 h-full w-[48px] bg-gradient-to-r from-primary-main to-primary-main/80 md:w-[80px]"></div>
			<div className="absolute top-0 right-0 h-full w-[48px] bg-gradient-to-l from-primary-main to-primary-main/80 md:w-[80px]"></div>
		</div>
	);
};

export default CountrySlider;
