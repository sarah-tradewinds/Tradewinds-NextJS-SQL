import Image from 'next/image';
import Slider from 'react-slick';
import ThumbnailList from './thumbnail-list';

interface ImageContainerProps {
	imageUrl: string;
	alt: string;
	thumbnails: {
		imageUrl: string;
		alt: string;
	}[];
	className?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = (props) => {
	const { imageUrl, alt, thumbnails, className } = props;

	return (
		<div className={className}>
			{/* Main Image */}
			<div className="relative h-[475px] w-full">
				<Image src={imageUrl} alt={alt} layout="fill" />
			</div>

			{/* Thumbnails Slider only for small and medium screen */}
			<div className="relative lg:hidden">
				<Slider
					{...{
						slidesToShow: 5
					}}
				>
					{thumbnails.map((thumbnail) => (
						<div
							key={thumbnail.imageUrl}
							className="relative h-[136px] w-full"
						>
							<Image
								src={thumbnail.imageUrl}
								alt={thumbnail.alt}
								layout="fill"
							/>
						</div>
					))}
				</Slider>
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
