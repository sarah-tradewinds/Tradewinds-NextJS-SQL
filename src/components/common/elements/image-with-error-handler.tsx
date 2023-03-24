import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithErrorHandlerProps extends ImageProps {
	// src: string;
	// alt: string | undefined;
	// width?: number;
	// height?: number;
	// fill?: boolean;
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
		fill,
		width,
		height,
		defaultImageUrl = '/coming-soon.png',
		errorImageUrl = '/coming-soon.png',
		className
	} = props;

	const imageSrc = src?.toString()?.toLowerCase() || '';

	const [slashFirst] = imageSrc?.split('/');
	const [httpFirst] = imageSrc?.split('http');
	const [httpsFirst] = imageSrc?.split('https');

	let isImageUrlIsInCorrectFormat = true;
	if (
		imageSrc &&
		slashFirst !== '' &&
		httpFirst !== '' &&
		httpsFirst !== ''
	) {
		isImageUrlIsInCorrectFormat = false;
	}

	const [imageUrl, setImageUrl] = useState(src || defaultImageUrl);

	const onErrorHandler = () => {
		setImageUrl(errorImageUrl);
	}; // End of onErrorHandler method

	// console.log('imageUrlimageUrlimageUrl =', alt, {
	// 	isImageUrlIsInCorrectFormat,
	// 	imageUrl,
	// 	src
	// });

	return (
		<Image
			{...props}
			src={isImageUrlIsInCorrectFormat ? imageUrl : defaultImageUrl}
			alt={alt || ''}
			onError={onErrorHandler}
			// fill={fill}
			// width={width}
			// height={height}
			// className={className}
			// actions
		/>
	);
}; // End of ImageWithErrorHandler

export default ImageWithErrorHandler;
