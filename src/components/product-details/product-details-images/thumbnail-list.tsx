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
		<div className="grid h-[292px] w-[670px] grid-flow-row grid-cols-3 gap-[10px] overflow-y-auto">
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
						className="object-contain"
					/>
				</div>
			))}
		</div>
	);
}; // End of ProductDetailsPage

export default ThumbnailList;
