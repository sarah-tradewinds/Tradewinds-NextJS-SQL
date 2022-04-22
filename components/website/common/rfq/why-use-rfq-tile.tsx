import Image from 'next/image';

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
				className={`relative h-24 w-32 ${
					imageContainerClassName
						? imageContainerClassName
						: 'bg-accent-primary-main'
				} p-4`}
			>
				<Image src={imageUrl} alt={alt || title} layout="fill" />
			</div>
			<p
				className={`mx-4 text-[18px] font-semibold ${
					textClassName ? textClassName : 'text-accent-primary-main'
				}`}
			>
				{title}
			</p>
		</div>
	);
};

export default WhyUseRFQTile;
