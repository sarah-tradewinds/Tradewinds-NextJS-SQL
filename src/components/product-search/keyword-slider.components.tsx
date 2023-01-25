// Third party packages
import useDeviceSize from 'hooks/use-device-size.hooks';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Button from '../common/form/button';

const KeywordSlider: React.FC<{ keywords: string[] }> = ({
	keywords
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const { deviceWidth } = useDeviceSize();

	const [sliderRef, instanceRef] = useKeenSlider({
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		loop: false,
		mode: 'snap',
		rtl: false,
		slides: { perView: 'auto' }
	});

	return (
		<div className="navigation-wrapper relative pl-4 pr-4">
			<div ref={sliderRef} className="keen-slider">
				{keywords.map((keyword) => (
					<div
						key={keyword}
						className="keen-slider__slide"
						style={{
							maxWidth:
								keyword.length * (deviceWidth >= 1512 ? 9 : 8) + 'px',
							minWidth:
								keyword.length * (deviceWidth >= 1512 ? 9 : 8) + 'px'
						}}
					>
						<p className="md:text-xs md:font-semibold md:leading-[15px] md:text-primary-main lg:text-[13px] lg:leading-4">
							{keyword}
						</p>
					</div>
				))}
			</div>

			{/* Navigation button */}
			{loaded && instanceRef?.current && (
				<>
					<Button
						className={`absolute -left-4 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !p-0 !px-0 !text-gray`}
						onClick={(e: any) =>
							e.stopPropagation() || instanceRef.current?.prev()
						}
					>
						<MdChevronLeft className="h-4 w-4" />
					</Button>

					<Button
						className={`absolute -right-4 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !p-0 !px-0 !text-gray`}
						onClick={(e: any) =>
							e.stopPropagation() || instanceRef.current?.next()
						}
						disabled={
							currentSlide ===
							instanceRef?.current?.track?.details?.slides?.length - 1
						}
					>
						<MdChevronRight className="h-4 w-4" />
					</Button>
				</>
			)}
		</div>
	);
};

export default KeywordSlider;
