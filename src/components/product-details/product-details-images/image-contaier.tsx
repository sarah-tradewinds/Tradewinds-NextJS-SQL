import { useRouter } from 'next/router';
import { useState } from 'react';

// Third party packages
import { useKeenSlider } from 'keen-slider/react';
import { MdOutlineClose } from 'react-icons/md';

// styles
import 'keen-slider/keen-slider.min.css';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import ThumbnailList from './thumbnail-list';

interface ImageContainerProps {
	imageUrl: string;
	alt: string;
	thumbnails: string[];
	className?: string;
	onThumbnailImagePressed?: () => void;
}

const ImageContainer: React.FC<ImageContainerProps> = (props) => {
	const {
		imageUrl,
		alt,
		thumbnails,
		className,
		onThumbnailImagePressed
	} = props;

	const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrl);

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
			<div className="relative flex items-center justify-center sm:mt-[17px] sm:mr-[43.41px] sm:ml-[36.71px]">
				<div className="relative flex h-[200px] w-[200px] items-center justify-center sm:h-[196.89px] sm:w-[196.89px] md:h-[236.27px] md:w-[236.27px] lg:h-[322.48px] lg:w-[322.48px] desktop:h-[474px] desktop:w-[474px]">
					<ImageWithErrorHandler
						key={selectedImageUrl}
						src={selectedImageUrl || imageUrl}
						alt={alt || ''}
						fill={true}
						loading="eager"
						className="object-contain"
					/>
				</div>
				<button
					onClick={back}
					className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary-main !p-0 dark:bg-primary-eco sm:hidden md:hidden md:h-8 md:w-8"
				>
					<MdOutlineClose className="text-[24px] font-bold text-white" />
				</button>
			</div>

			{/* Thumbnails Slider only for small and medium screen */}
			<div className="md:blocks relative hidden lg:hidden">
				<div ref={ref} className="keen-slider">
					{thumbnails.map((thumbnailImageUrl) => (
						<div key={thumbnailImageUrl} className="keen-slider__slide">
							<div
								onClick={() =>
									setSelectedImageUrl(thumbnailImageUrl || imageUrl)
								}
								className="relative h-[136px] w-full cursor-pointer md:!h-[89.64px] md:!w-[136.82px] lg:!h-[136px] lg:!w-[206px]"
							>
								<ImageWithErrorHandler
									src={
										thumbnailImageUrl ||
										'/static/images/coming-soon.png'
									}
									alt={thumbnailImageUrl}
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
			<div className="ml-[18px] mr-[13px] sm:mt-[2.11px]">
				<ThumbnailList
					thumbnails={thumbnails}
					onImageSelect={(thumbnailImageUrl) => {
						setSelectedImageUrl(thumbnailImageUrl || imageUrl);
						onThumbnailImagePressed?.();
					}}
				/>
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ImageContainer;
