import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface WhyBuyOperationProps {
	imageUrl: string;
	title?: string;
	subtitle: string;
	className?: string;
}

export const WhyBuyOperationTile: React.FC<WhyBuyOperationProps> = ({
	imageUrl,
	title,
	subtitle,
	className
}) => {
	return (
		<>
			<div className={`relative ${className}`}>
				<ImageWithErrorHandler
					src={imageUrl}
					alt={title || ''}
					fill={true}
				/>
			</div>
		</>
	);
};

export const WhyBuyOperationSubTile: React.FC<{
	imageUrl: string;
	alt?: string;
	title: string;
	subtitle: string;
	className?: string;
	displayBorder?: boolean;
	contentClassName?: string;
	imgClassName?: string;
}> = ({
	imageUrl,
	alt,
	title,
	subtitle,
	className,
	contentClassName,
	imgClassName
}) => {
	return (
		<div className={`flex ${className}`}>
			<div>
				<div
					className={`relative mt-[10px] mr-[18px] h-[34px] w-[29px]  ${imgClassName}`}
				>
					<ImageWithErrorHandler
						src={imageUrl}
						alt={alt || title}
						fill={true}
						className="h-full w-full"
					/>
				</div>
			</div>

			<div
				className={`w-[475px] text-[15px]  text-primary-main ${contentClassName}`}
			>
				<p className="text-[24px] font-semibold">{title}</p>
				<p className="text-[18px] font-normal  leading-[22px] ">
					{subtitle}
				</p>
			</div>
		</div>
	);
};

interface ImageProps {
	imageUrl: string;
	alt: string;
	imgClassname: string;
}

export const OperationTailImage: React.FC<ImageProps> = (props) => {
	const { imageUrl, alt, imgClassname } = props;
	return (
		<div className={`relative ${imgClassname}`}>
			<ImageWithErrorHandler src={imageUrl} alt={alt} fill={true} />{' '}
		</div>
	);
};

export const OperationTailContent: React.FC<{
	title: string;
	subtitle: string;
	// contentClassName: string;
	// clasName1: string;
	// clasName2: string;
}> = ({ title, subtitle }) => {
	return (
		<div className={` text-gray `}>
			<p className=" text-[12px] font-semibold sm:text-[12px] md:text-[12px] lg:text-[15px] desktop:text-[24px]">
				{title}
			</p>
			<p className="text-[12px] font-normal sm:text-[10px] sm:leading-[13px] md:text-[10px] md:leading-[12px] lg:text-[12px]  lg:leading-[15px] desktop:text-[18px]  desktop:leading-[22px] ">
				{subtitle}
			</p>
		</div>
	);
};
