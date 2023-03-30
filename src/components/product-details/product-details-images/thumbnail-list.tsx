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
		<>
			{thumbnails.map((thumbnailImageUrl) => (
				<div
					key={thumbnailImageUrl}
					className="relative h-[136px] w-full cursor-pointer"
					onClick={() => onImageSelect?.(thumbnailImageUrl)}
				>
					<ImageWithErrorHandler
						src={thumbnailImageUrl || '/loading-circle-50.png'}
						alt={thumbnailImageUrl}
						fill={true}
					/>
				</div>
			))}
		</>
	);
}; // End of ProductDetailsPage

export default ThumbnailList;
