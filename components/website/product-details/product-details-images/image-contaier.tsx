import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { MdOutlineClose } from 'react-icons/md';
import ThumbnailList from './thumbnail-list';

// styles
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
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
			<div className="relative p-4">
				<div className="relative h-[211px] w-full md:h-[475px]">
					<ImageWithErrorHandler src={imageUrl} alt={alt} fill={true} />
				</div>
				<button
					onClick={back}
					className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-eco !p-0 md:hidden"
				>
					<MdOutlineClose className="text-[24px] font-bold text-white" />
				</button>
			</div>

			{/* Thumbnails Slider only for small and medium screen */}
			<div className="relative hidden md:block lg:hidden">
				<div ref={ref} className="keen-slider">
					{thumbnails.map((thumbnail) => (
						<div key={thumbnail.url} className="keen-slider__slide">
							<div className="relative h-[136px] w-full">
								<Image
									src={thumbnail.url || '/loading-circle-50.png'}
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
