import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface WhyUseRFQTileProps {
	imageUrl: string;
	alt?: string;
	title: string;
	isReverse?: boolean;
	imageContainerClassName?: string;
	textClassName?: string;
}

const WhyUseRFQTile: React.FC<WhyUseRFQTileProps> = (props) => {
	const {
		imageUrl,
		alt,
		title,
		isReverse,
		imageContainerClassName,
		textClassName
	} = props;

	return (
		<div
			className={` flex items-center ${
				isReverse ? 'flex-row-reverse' : ''
			}`}
		>
			<div
				className={`relative  ${
					imageContainerClassName
						? imageContainerClassName
						: 'bg-accent-primary-main'
				} `}
			>
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || title}
					fill={true}
				/>
			</div>
			<p
				className={` align-middle text-[18px] font-semibold ${
					textClassName ? textClassName : 'text-accent-primary-main'
				}`}
			>
				{title}
			</p>
		</div>
	);
};

export default WhyUseRFQTile;
