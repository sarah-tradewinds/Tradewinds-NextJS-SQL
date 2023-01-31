import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { MdOutlineClose } from 'react-icons/md';
import ThumbnailList from './thumbnail-list';

// styles
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import 'keen-slider/keen-slider.min.css';
import { useRouter } from 'next/dist/client/router';

interface ImageContainerProps {
	imageUrl: string;
	alt: string;
	thumbnails: {
		id?: string;
		url: string;
		alt: string;
	}[];
	className?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = (props) => {
	const { imageUrl, alt, thumbnails, className } = props;

	const { back } = useRouter();

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 4,
			spacing: 8
		}
	});

	return (
		<div className={className}>
			{/* Main Image */}
			<div className="relative flex items-center justify-center md:p-4">
				<div className="relative h-[211px] w-[320px] md:h-[323px] md:w-[489px] lg:h-[475px] lg:w-[719.26px]">
					<ImageWithErrorHandler src={imageUrl} alt={alt} fill={true} />
				</div>
				<button
					onClick={back}
					className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary-main !p-0 dark:bg-primary-eco md:hidden md:h-8 md:w-8"
				>
					<MdOutlineClose className="text-[24px] font-bold text-white" />
				</button>
			</div>

			{/* Thumbnails Slider only for small and medium screen */}
			<div className="relative hidden md:block lg:hidden">
				<div ref={ref} className="keen-slider">
					{thumbnails.map((thumbnail) => (
						<div key={thumbnail.url} className="keen-slider__slide">
							<div className="relative h-[136px] w-full md:!h-[89.64px] md:!w-[136.82px] lg:!h-[136px] lg:!w-[206px]">
								<Image
									src={
										thumbnail.url || '/static/images/coming-soon.png'
									}
									alt={thumbnail.alt}
									fill={true}
								/>
							</div>
						</div>
					))}
				</div>
				<div className="absolute top-0 h-[120px] w-[94px] bg-white/80"></div>
				<div className="absolute top-0 right-0 h-[120px] w-[94px] bg-white/80"></div>
			</div>

			{/* Thumbnails Slider only large screen */}
			<div className="hidden grid-cols-3 gap-4 lg:grid">
				<ThumbnailList thumbnails={thumbnails} />
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ImageContainer;
