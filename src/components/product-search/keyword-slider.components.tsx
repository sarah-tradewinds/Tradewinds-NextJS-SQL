// Third party packages
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Button from '../common/form/button';

const KeywordSlider: React.FC<{ keywords: string[] }> = ({
	keywords
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const [sliderRef, instanceRef] = useKeenSlider({
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		slides: {
			perView: 6,
			spacing: 4
		},
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 4, spacing: 8 }
			},
			'(min-width: 768px)': {
				slides: { perView: 3, spacing: 4 }
			},
			'(min-width: 1024px)': {
				slides: { perView: 8, spacing: 8 }
			}
		}
	});

	return (
		<div className="navigation-wrapper relative px-8">
			<div ref={sliderRef} className="keen-slider w-full ">
				{keywords.map((keyword) => (
					<div key={keyword} className="keen-slider__slide">
						{keyword}ssssssss
					</div>
				))}
			</div>

			{/* Navigation button */}
			{loaded && instanceRef?.current && (
				<>
					<Button
						className={`absolute -left-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !p-0 !text-black`}
						onClick={(e: any) =>
							e.stopPropagation() || instanceRef.current?.prev()
						}
					>
						<MdChevronLeft className="h-[32px] w-[32px]" />
					</Button>

					<Button
						className={`absolute -right-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !p-0 !text-black`}
						onClick={(e: any) =>
							e.stopPropagation() || instanceRef.current?.next()
						}
						disabled={
							currentSlide ===
							instanceRef?.current?.track?.details?.slides?.length - 1
						}
					>
						<MdChevronRight className="h-[32px] w-[32px]" />
					</Button>
				</>
			)}
		</div>
	);
};

export default KeywordSlider;
