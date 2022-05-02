import Image from 'next/image';

// Third party packages
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module

interface CountrySliderProps {
	countries: {
		name: string;
		slug: string;
		imageUrl: string;
	}[];
}

const CountrySlider: React.FC<CountrySliderProps> = (props) => {
	const { countries } = props;

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 2,
			spacing: 8
		},
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 3, spacing: 10 }
			},
			'(min-width: 768px)': {
				slides: { perView: 4, spacing: 8 }
			},
			'(min-width: 1024px)': {
				slides: { perView: 5, spacing: 8 }
			}
		}
	});

	return (
		<div className="bg-gradient-to-r from-primary-main to-primary-main/80 pb-6 dark:from-primary-eco dark:to-primary-eco/80">
			<div className="my-4 flex items-center justify-center space-x-4">
				<div className="w-40 rounded-l-lg border border-white md:w-56 lg:w-80"></div>
				<p className="whitespace-nowrap py-2 text-center text-white">
					Shop By Country
				</p>
				<div className="w-40   border border-white md:w-56 lg:w-80"></div>
			</div>

			<div ref={ref} className="keen-slider">
				{countries.map((country) => (
					<div
						key={country.imageUrl}
						className="keen-slider__slide h-[80px] w-[180px] px-4"
					>
						<Image
							src={country.imageUrl}
							alt=""
							width={180}
							height={80}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default CountrySlider;
