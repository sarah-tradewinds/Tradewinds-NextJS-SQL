import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import React from 'react';

interface ThumbnailListProps {
	thumbnails: string[];
	className?: string;
	onImageSelect?: (imageUrl: string) => void;
}

const ThumbnailList: React.FC<ThumbnailListProps> = (props) => {
	const { thumbnails, className, onImageSelect } = props;

	return (
		<div className="grid grid-cols-4 gap-y-[5px] gap-x-[11px] sm:gap-x-[17.31px] sm:gap-y-[8.31px] md:gap-y-[12.96px] md:gap-x-[20.94px] lg:gap-y-[13.61px] xl:gap-x-[45px] xl:gap-y-[20px]">
			{thumbnails.map((thumbnailImageUrl) => (
				<div
					key={thumbnailImageUrl}
					className="relative h-[60px] w-[60px] cursor-pointer sm:h-[45.69px] sm:w-[45.69px] md:h-[54.83px] md:w-[54.83px] lg:h-[74.84px] lg:w-[74.84px] xl:h-[110px] xl:w-[110px]"
					onClick={() => onImageSelect?.(thumbnailImageUrl)}
				>
					<ImageWithErrorHandler
						src={thumbnailImageUrl}
						alt={thumbnailImageUrl}
						fill={true}
						className="object-contain"
						// className="object-cover"
					/>
				</div>
			))}
		</div>
	);
}; // End of ProductDetailsPage

export default ThumbnailList;
