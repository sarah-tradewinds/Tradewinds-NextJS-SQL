import Image from 'next/image';

interface MetadataTileProps {
	imageUrl?: string;
	alt?: string;
	title: any;
	icon?: any;
	className?: string;
	imageContainerClassName?: string;
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
		imageContainerClassName
	} = props;

	return (
		<div
			className={`flex items-center space-x-2 ${className} `}
			onClick={onClick}
		>
			{imageUrl && (
				<div
					className={`relative h-[12px] w-[16px] lg:h-[16px] lg:w-[24px] ${imageContainerClassName}`}
				>
					<Image
						src={imageUrl}
						alt={alt}
						layout="fill"
						objectFit="contain"
					/>
				</div>
			)}
			{icon}

			<span className="text-[10px] text-gray md:text-[12px] lg:text-[13px]">
				{title}
			</span>
		</div>
	);
};

export default MetadataTile;
