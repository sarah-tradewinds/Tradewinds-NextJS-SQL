import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

// Third party packages
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import useDeviceSize from 'hooks/use-device-size.hooks';
import Slider from 'react-slick';
import { getLocaleText } from 'utils/get_locale_text';

interface CollectionSliderOldProps {
	name: string;
	dataList: any[];
	onCountryClick?: (country: any) => any;
	isLoading?: boolean;
	className?: string;
}

const CollectionSliderOld: React.FC<CollectionSliderOldProps> = (
	props
) => {
	const { name, dataList, onCountryClick, isLoading, className } =
		props;

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const { deviceWidth } = useDeviceSize();

	const router = useRouter();

	const slider = useRef(null);

	const settings = {
		slidesToShow: 4,
		slidesToScroll: 4,
		speed: 500,
		rows: 2,
		arrows: false,
		infinite: false,
		responsive: [
			{
				breakpoint: 1512,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					rows: 2
				}
			},
			{
				breakpoint: 744,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					rows: 2
				}
			}
		]
	};

	const productList =
		dataList?.map((product: any) => {
			const imageUrl = product?.images[0]
				? product?.images[0]?.url
				: '';
			return (
				<div
					key={product?.id}
					className="relative mb-4 mr-4 !h-[92px] !w-[139.25px] border-[2px] border-[#C4C4C4] md:mr-0 md:!h-[92px] md:!w-[144.12px] lg:mb-7 lg:!h-[134px] lg:!w-[239px]"
				>
					<div className="flex h-full w-full flex-col justify-between p-2">
						<p className="text-xs leading-[15px]">
							{getLocaleText(
								product?.product_name || {},
								router.locale
							)}{' '}
						</p>

						{/* Icon or Image */}
						<div className="flex space-x-2">
							<div className="relative h-5 w-5">
								<Image
									src="/static/images/TWSafety.png"
									alt="Logo"
									fill={true}
								/>
							</div>
							<div className="relative h-5 w-5">
								<Image
									src="/static/images/TWEco.png"
									alt="Logo"
									fill={true}
								/>
							</div>
						</div>
					</div>

					{/* Product Image */}
					<div className="absolute bottom-0 right-0">
						<div className="relative h-[67px] w-[60px] md:h-[70px] md:w-[63px] lg:h-[100px] lg:w-[100px]">
							<ImageWithErrorHandler
								key={imageUrl}
								src={imageUrl}
								alt=""
								fill={true}
							/>
						</div>
					</div>
				</div>
			);
		}) || [];

	if (
		deviceWidth < 744 ||
		(deviceWidth >= 744 && productList?.length < 7) ||
		(deviceWidth >= 1512 && productList?.length < 9)
	) {
		return (
			<div className="mt-4 mb-4 md:ml-[40px] md:w-[500px] lg:ml-[56.01px] lg:w-[1034px]">
				<p className="pb-1 text-[13px] font-semibold leading-4 md:py-4 md:text-[18px] md:leading-[22px] lg:text-[25px] lg:leading-[30px]">
					{name}
				</p>
				<div className="grid grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4">
					{productList}
				</div>
			</div>
		);
	}

	return (
		<div className="relative mt-4 w-full">
			<Button
				onClick={() => (slider?.current as any)?.slickPrev()}
				className={`absolute top-1/2 hidden -translate-y-1/2 transform items-center justify-center !rounded-full !px-0 !py-0 md:flex md:!h-[33px] md:!w-[33px] md:border md:!border-[#575858] lg:-left-0`}
			>
				<MdChevronLeft className="w-full text-[#575858] lg:h-full" />
			</Button>

			<div className="md:w-[540px] md:pl-10 lg:mr-[56.01px] lg:w-[1115px] lg:pl-[60px]">
				<p className="pb-1 text-[13px] font-semibold leading-4 md:py-4 md:text-[18px] md:leading-[22px] lg:text-[25px] lg:leading-[30px]">
					{name}
				</p>
				<Slider ref={slider} {...settings}>
					{productList}
				</Slider>
			</div>

			<Button
				className={`absolute right-0 top-1/2 hidden !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full !px-0 !py-0 md:right-10 md:flex md:!h-[33px] md:!w-[33px] md:border md:!border-[#575858] lg:right-52`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="w-full text-[#575858] lg:h-full" />
			</Button>
		</div>
	);
};

export default CollectionSliderOld;
