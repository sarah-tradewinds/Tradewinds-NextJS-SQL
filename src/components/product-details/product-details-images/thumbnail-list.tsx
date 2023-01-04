import Image from 'next/image';
import React from 'react';

interface ThumbnailListProps {
	thumbnails: {
		id?: string;
		url: string;
		alt: string;
	}[];
	className?: string;
}

const ThumbnailList: React.FC<ThumbnailListProps> = (props) => {
	const { thumbnails, className } = props;

	return (
		<>
			{thumbnails.map((thumbnail) => (
				<div key={thumbnail.url} className="relative h-[136px] w-full">
					<Image
						src={thumbnail.url || '/loading-circle-50.png'}
						alt={thumbnail.alt}
						fill={true}
					/>
				</div>
			))}
		</>
	);
}; // End of ProductDetailsPage

export default ThumbnailList;
