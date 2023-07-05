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
		<div className="grid grid-cols-4 gap-y-[5px] gap-x-[11px] sm:gap-x-[17.31px] sm:gap-y-[8.31px]">
			{thumbnails.map((thumbnailImageUrl) => (
				<div
					key={thumbnailImageUrl}
					className="relative h-[60px] w-[60px] cursor-pointer sm:h-[45.69px] sm:w-[45.69px] lg:h-[136px] lg:w-full"
					onClick={() => onImageSelect?.(thumbnailImageUrl)}
				>
					<ImageWithErrorHandler
						src={thumbnailImageUrl || '/loading-circle-50.png'}
						alt={thumbnailImageUrl}
						fill={true}
						className="object-contain"
					/>
				</div>
			))}
		</div>
	);
}; // End of ProductDetailsPage

export default ThumbnailList;
