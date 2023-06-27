import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface whyBuyImageProps {
	imageUrl: string;
	alt: string;
	imgClassname: string;
}

export const WhyBuyOperationTailImage: React.FC<whyBuyImageProps> = (
	props
) => {
	const { imageUrl, alt, imgClassname } = props;
	return (
		<div className={` ${imgClassname}`}>
			<ImageWithErrorHandler src={imageUrl} alt={alt} fill={true} />{' '}
		</div>
	);
};

export const WhyBuyOperationTailContent: React.FC<{
	content: string;
	contentClassName: string;
}> = ({ content, contentClassName }) => {
	return (
		<div>
			<p className={`${contentClassName}`}>{content}</p>
		</div>
	);
};
