import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

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
		alt = '',
		fill,
		width,
		height,
		defaultImageUrl = '/coming-soon.png',
		errorImageUrl = '/coming-soon.png',
		className
	} = props;

	const isValidUrl = (url: string) => {
		try {
			new URL(url?.toString());
			return true;
		} catch (error) {
			const [isRelativePath] = url ? url?.split('/') : [];
			if (isRelativePath === '') {
				return true;
			}
			return false;
		}
	}; // End of isValidUrl function

	const [imageUrl, setImageUrl] = useState(src || defaultImageUrl);

	useEffect(() => {
		setImageUrl(src);
	}, [src]);

	const onErrorHandler = () => {
		setImageUrl(errorImageUrl);
	}; // End of onErrorHandler method

	return (
		<Image
			{...props}
			key={imageUrl?.toString()}
			src={
				isValidUrl(imageUrl?.toString()) ? imageUrl : defaultImageUrl
			}
			alt={alt || ''}
			onError={onErrorHandler}
		/>
	);
}; // End of ImageWithErrorHandler

export default ImageWithErrorHandler;
