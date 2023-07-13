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
			className={` block flex-col items-center text-white sm:flex ${containerClassName}`}
		>
			<div className={`relative  ${imageClassName}`}>
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || title}
					fill={true}
				/>
			</div>
			<div
				className={` text-left sm:text-center ${contentContainerClassName}`}
			>
				<p
					className={` text-[12px] font-semibold sm:text-[12px] md:text-[15px] lg:text-[15px] desktop:text-[25px]`}
				>
					{title}
				</p>
				<p
					className={` text-[10px] font-semibold leading-[14px] sm:text-[10px] sm:leading-[12px] md:text-[10px] md:leading-[14px] lg:text-[12px] desktop:text-[18px] desktop:leading-[30px]`}
				>
					{subtitle}
				</p>
			</div>
		</div>
	);
};

export default WhyBuyTile;
