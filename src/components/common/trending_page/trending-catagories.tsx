import { useRouter } from 'next/router';

import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../elements/image-with-error-handler';
import TrendingCategoryTile from './trending-category-tile';

const TrendingCatagories: React.FC<{ categories: any[] }> = ({
	categories
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		breakpoints: {
			'(min-width: 744px)': {
				slides: { perView: 4, spacing: 12 }
			},
			'(min-width: 1512px)': {
				slides: { perView: 5, spacing: 10 }
			}
		},
		slides: { perView: 2, spacing: 12 }
	});

	const { locale } = useRouter();

	return (
		<>
			<div className="mt-[20px] hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
				{categories?.map((category, index) => (
					// <div key={category?.id}>
					// 	<div className="ml-[5px] grid grid-flow-col grid-rows-4 gap-x-[14px] gap-y-[12px] overflow-hidden">
					// 		<div className=" h-[312px] w-[370px] rounded-[10px] bg-white pt-[20px]">
					// 			<div
					// 				className=" ml-[14px] h-[27px] w-[44px] "
					// 				style={{ backgroundColor: category.color }}
					// 			>
					// 				<span className=" ml-[9px] h-[51px] w-[16px] text-[21px] font-semibold text-gray">
					// 					{index + 1}
					// 				</span>
					// 			</div>
					// 			<div className=" flex space-x-8">
					// 				<div>
					// 					<p className=" ml-[15px] text-[21px] font-semibold  text-gray">
					// 						{getLocaleText(category?.title || {}, locale)}
					// 					</p>
					// 				</div>
					// 				<div className="relative mt-6 h-[214.88px] w-[214.88px]">
					// 					<ImageWithErrorHandler
					// 						src={category?.image}
					// 						alt="camera"
					// 						fill={true}
					// 					/>
					// 				</div>
					// 			</div>
					// 		</div>
					// 	</div>
					// </div>
					<TrendingCategoryTile
						key={category?.id}
						index={index + 1}
						title={getLocaleText(category?.title || {}, locale)}
						imageUrl={category?.image}
						backgroundColor={category?.edges?.main_category?.color}
					/>
				))}
			</div>

			{/* medium device */}
			{/* <div className=" ml-[7px] mr-[6px] mt-[17px] grid hidden grid-cols-2 grid-rows-5 space-x-[12px] md:grid lg:hidden">
				<div className=" h-[295px] w-[350px] rounded-[10px] bg-white pt-[20px]">
					<div className=" ml-[14px] h-[27px] w-[44px] bg-light_yellow  ">
						<span className=" ml-[9px] h-[51px] w-[16px] text-[21px] font-semibold text-gray">
							2
						</span>
					</div>
					<div className=" flex space-x-8">
						<div>
							<p className=" ml-[15px] text-[21px] font-semibold  text-gray">
								Energy
							</p>
						</div>
						<div className=" relative mt-6 h-[215px] w-[215px]">
							<ImageWithErrorHandler
								src="/static/images/trending_images/coal.png"
								alt="camera"
								fill={true}
							/>
						</div>
					</div>
				</div>
				<div className=" h-[295px] w-[350px] rounded-[10px] bg-white pt-[20px]">
					<div className=" ml-[14px] h-[27px] w-[44px] bg-light_yellow  ">
						<span className=" ml-[9px] h-[51px] w-[16px] text-[21px] font-semibold text-gray">
							2
						</span>
					</div>
					<div className=" flex space-x-8">
						<div>
							<p className=" ml-[15px] text-[21px] font-semibold  text-gray">
								Energy
							</p>
						</div>
						<div className=" relative mt-6 h-[215px] w-[215px]">
							<ImageWithErrorHandler
								src="/static/images/trending_images/coal.png"
								alt="camera"
								fill={true}
							/>
						</div>
					</div>
				</div>
			</div> */}

			{/* Only for mobiles */}
			<div className="ml-[7px] mr-[14px] md:hidden lg:hidden">
				<div className="  h-[153px] w-full rounded-[10px] bg-white pt-[9px]">
					<div className=" flex">
						<div className=" ml-[7px] h-[23px] w-[28px] bg-light_yellow  ">
							<span className=" ml-[9px] h-[23px] w-[8px] pb-6 text-[19px] font-semibold text-gray">
								1
							</span>
						</div>
						<div className=" -mt-[5px]">
							<p className=" ml-[11px] text-[25px] font-semibold  text-gray">
								Energy
							</p>
						</div>
					</div>
					<div className=" -mt-[10px] grid grid-cols-2 gap-[15px] ">
						<div>
							<div className="  ml-[10px] h-[60px] w-[349px]">
								<p className=" text-[15px] font-semibold text-primary-main">
									Product name <br />
								</p>
								<p className="  text-[12px] font-semibold leading-[15px] text-gray">
									<span>$2.29 - $5.00 /piece</span>
									<br />
									<span>100 Pieces /Min. Order</span>
								</p>
							</div>
							<div className="  ml-[10px] h-[60px] w-[349px]">
								<p className=" text-[15px] font-semibold text-primary-main">
									Product name <br />
								</p>
								<p className="  text-[12px] font-semibold leading-[15px] text-gray">
									<span>$2.29 - $5.00 /piece</span>
									<br />
									<span>100 Pieces /Min. Order</span>
								</p>
							</div>
						</div>
						<div className=" relative mt-[4px] h-[105px] w-[105px]">
							<ImageWithErrorHandler
								src="/static/images/trending_images/coal.png"
								alt="camera"
								fill={true}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TrendingCatagories;
