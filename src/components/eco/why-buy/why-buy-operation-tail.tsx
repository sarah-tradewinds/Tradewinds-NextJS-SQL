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
}> = ({ content }) => {
	return (
		<div>
			<p
				className={`text-[13px] font-semibold leading-[16px] text-gray sm:text-[13px] sm:leading-[16px] md:text-[15px] md:leading-[18px] lg:text-[20px] lg:leading-[24px] desktop:text-[35px]  desktop:leading-[42px] `}
			>
				{content}
			</p>
		</div>
	);
};
