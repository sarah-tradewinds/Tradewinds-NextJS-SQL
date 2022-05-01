import Image from 'next/image';
import React from 'react';

interface ThumbnailListProps {
	thumbnails: {
		imageUrl: string;
		alt: string;
	}[];
	className?: string;
}

const ThumbnailList: React.FC<ThumbnailListProps> = (props) => {
	const { thumbnails, className } = props;

	return (
		<>
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
		</>
	);
}; // End of ProductDetailsPage

export default ThumbnailList;
