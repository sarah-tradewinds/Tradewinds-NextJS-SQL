import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface WhyBuyOperationProps {
	imageUrl: string;
	title?: string;
	className?: string;
}

export const WhyBuyOperationTile: React.FC<WhyBuyOperationProps> = ({
	imageUrl,
	title,
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
	contentClassName: string;
}> = ({ title, subtitle, contentClassName }) => {
	return (
		<div className={` text-primary-main ${contentClassName}`}>
			<p className="text-[24px] font-semibold">{title}</p>
			<p className="text-[18px] font-normal  leading-[22px] ">
				{subtitle}
			</p>
		</div>
	);
};
