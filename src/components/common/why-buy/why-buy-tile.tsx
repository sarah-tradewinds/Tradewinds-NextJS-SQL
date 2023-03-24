import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface WhyBuyTileProps {
	imageUrl: string;
	alt?: string;
	title: string;
	subtitle: string;
	imageClassName?: string;
	containerClassName?: string;
	contentContainerClassName?: string;
}

const WhyBuyTile: React.FC<WhyBuyTileProps> = (props) => {
	const {
		imageUrl,
		alt,
		title,
		subtitle,
		imageClassName,
		containerClassName,
		contentContainerClassName
	} = props;

	return (
		<div
			className={`flex flex-col items-center text-white ${containerClassName}`}
		>
			<div className={`relative h-[110px] w-[110px] ${imageClassName}`}>
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || title}
					fill={true}
				/>
			</div>
			<div
				className={`mt-3 space-y-1 text-center ${contentContainerClassName}`}
			>
				<p>{title}</p>
				<p className="text-xs">{subtitle}</p>
			</div>
		</div>
	);
};

export default WhyBuyTile;
