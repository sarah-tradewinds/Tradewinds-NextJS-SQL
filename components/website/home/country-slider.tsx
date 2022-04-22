import Image from 'next/image';
import Slider from 'react-slick';

interface CountrySliderProps {
	countries: {
		name: string;
		slug: string;
		imageUrl: string;
	}[];
}

const CountrySlider: React.FC<CountrySliderProps> = (props) => {
	const { countries } = props;

	const flagSliderSetting = {
		dots: false,
		arrows: false,
		infinite: true,
		autoplay: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1
	};

	return (
		<div className="bg-gradient-to-r from-primary-main to-primary-main/80 pb-6 dark:from-primary-eco dark:to-primary-eco/80">
			<div className="my-4 flex items-center justify-center space-x-4">
				<div className="w-40 rounded-l-lg border border-white md:w-56 lg:w-80"></div>
				<p className="whitespace-nowrap py-2 text-center text-white">
					Shop By Country
				</p>
				<div className="w-40   border border-white md:w-56 lg:w-80"></div>
			</div>

			<Slider
				{...flagSliderSetting}
				className="mx-auto"
				centerMode={true}
			>
				{countries.map((country) => (
					<div key={country.imageUrl} className="h-[80px] w-[180px]">
						<Image
							src={country.imageUrl}
							alt=""
							width={180}
							height={80}
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default CountrySlider;
