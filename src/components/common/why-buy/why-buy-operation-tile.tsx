import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface WhyBuyOperationProps {
	imageUrl: string;
	alt?: string;
	imageClassName?: string;
}

export const WhyBuyOperationTile: React.FC<WhyBuyOperationProps> = ({
	imageUrl,
	alt,
	imageClassName
}) => {
	return (
		<>
			<div className={`relative ${imageClassName}`}>
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
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
