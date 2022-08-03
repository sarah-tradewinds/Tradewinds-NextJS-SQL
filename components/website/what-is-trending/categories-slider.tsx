import useDeviceSize from 'hooks/use-device-size.hooks';
import { useKeenSlider } from 'keen-slider/react';
import Slider from 'react-slick';
import SubCategoryCard from '../home/common/sub-category-card';

function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'blue' }}
			onClick={onClick}
		/>
	);
}

const CategoriesSlider: React.FC<{ dataList?: [] }> = ({
	dataList = []
}) => {
	const [ref] = useKeenSlider<HTMLDivElement>({
		// loop: true,
		slides: {
			perView: 4,
			spacing: 8
		}
	});

	const { deviceSize } = useDeviceSize();

	const settings = {
		slidesToShow: 4,
		speed: 500,
		rows: 2,
		responsive: [
			{
				breakpoint: 1001,
				settings: {
					slidesToShow: 3,
					speed: 500,
					rows: 2
				}
			}
		]
	};

	const subCategories = [];
	for (let i = 0; i <= 7; i++) {
		subCategories.push(i);
	}

	return (
		<Slider {...settings}>
			{subCategories.map((id) => {
				return (
					<div key={id} className="py-4 px-2">
						<SubCategoryCard
							subCat={{
								id: '1',
								title: { en: id + ' - Animal & Veterinary' },
								slug: { en: 'animal-and-veterinary' },
								image: { url: '/vehicles/green-tractor.png' },
								clr: ''
							}}
							containerClassName="h-[140px]"
						/>
					</div>
				);
			})}
		</Slider>
	);

	const dataArray = [...dataList].slice(0, deviceSize === 'md' ? 6 : 8);

	return (
		<div className="grid grid-cols-3 lg:grid-cols-4">
			{dataArray.map((data: any) => {
				return (
					<div key={data.id} className="py-4 px-2">
						<SubCategoryCard
							subCat={{
								id: data.id,
								title: data.product_name,
								slug: { en: 'animal-and-veterinary' },
								image: data?.images
									? data?.images[0]?.url
									: '/vehicles/green-tractor.png',
								clr: ''
							}}
							containerClassName="h-[140px]"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default CategoriesSlider;
