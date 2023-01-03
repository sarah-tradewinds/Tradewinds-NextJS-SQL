import Image from 'next/image';
import { useState } from 'react';

interface ImageWithErrorHandlerProps {
	src: string;
	alt: string | undefined;
	width?: number;
	height?: number;
	// layout?: 'fill' | 'fixed' | 'responsive' | 'intrinsic' | undefined;
	fill?: boolean;
	defaultImageUrl?: string;
	errorImageUrl?: string;
	className?: string;
}

const ImageWithErrorHandler: React.FC<ImageWithErrorHandlerProps> = (
	props
) => {
	const {
		src,
		alt,
		// layout,
		fill,
		width,
		height,
		defaultImageUrl = '/page_not_found.svg',
		errorImageUrl = '/page_not_found.svg',
		className
	} = props;

	const [imageUrl, setImageUrl] = useState(src || defaultImageUrl);

	const onErrorHandler = () => {
		setImageUrl(errorImageUrl);
	}; // End of onErrorHandler method

	return (
		<Image
			src={imageUrl}
			alt={alt || ''}
			onError={onErrorHandler}
			fill={fill}
			width={width}
			height={height}
			className={className}
		/>
	);
}; // End of ImageWithErrorHandler

export default ImageWithErrorHandler;