import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface MetadataTileProps {
	imageUrl?: string;
	alt?: string;
	title: any;
	icon?: any;
	className?: string;
	imageContainerClassName?: string;
	titleClassName?: string;
	onClick?: () => any;
}

const MetadataTile: React.FC<MetadataTileProps> = (props) => {
	const {
		imageUrl,
		alt,
		title,
		icon,
		onClick,
		className,
		imageContainerClassName,
		titleClassName
	} = props;

	return (
		<div
			className={`flex items-center !space-x-2 lg:h-[31px] ${className} `}
			onClick={onClick}
		>
			{imageUrl && (
				<div
					className={`relative h-[12px] w-[16px] lg:h-[16px] lg:w-[24px] ${imageContainerClassName}`}
				>
					<ImageWithErrorHandler
						src={imageUrl}
						alt={alt || ''}
						fill={true}
						className="object-contain"
					/>
				</div>
			)}
			{icon}

			<span
				className={`text-[10px] text-gray md:text-[12px] lg:text-[13px] ${titleClassName}`}
			>
				{title}
			</span>
		</div>
	);
};

export default MetadataTile;
