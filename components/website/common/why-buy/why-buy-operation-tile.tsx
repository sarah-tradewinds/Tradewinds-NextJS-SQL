import Image from 'next/image';

interface WhyBuyOperationProps {
	imageUrl: string;
	alt?: string;
	title: string;
	subtitle?: string | React.ReactNode;
	className?: string;
	displayBorder?: boolean;
	containerClassName?: string;
	imageClassName?: string;
	childrenContainerClassName?: string;
}

export const WhyBuyOperationTile: React.FC<WhyBuyOperationProps> = ({
	imageUrl,
	alt,
	title,
	subtitle,
	children,
	className,
	displayBorder,
	containerClassName,
	childrenContainerClassName,
	imageClassName
}) => {
	return (
		<>
			<div className={`flex items-center ${containerClassName}`}>
				<div>
					<div
						className={`relative md:h-[400px] md:w-[300px] lg:h-[380px] lg:w-[601px] ${imageClassName}`}
					>
						<Image src={imageUrl} alt={alt || title} layout="fill" />
					</div>
				</div>

				<div className={className}>
					<div className="text-primary-main md:text-[20px] lg:text-[25px]">
						<h3 className="font-semibold">{title}</h3>
						<p>{subtitle}</p>
					</div>
					<div
						className={`space-y-2 px-4 ${childrenContainerClassName}`}
					>
						{children}
					</div>
				</div>
			</div>

			{displayBorder && (
				<div className="flex justify-center">
					<div className="w-1/2 border border-gray/40"></div>
				</div>
			)}
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
					className={`relative mr-8 h-[30px] w-[34px] ${imgClassName}`}
				>
					<Image
						src={imageUrl}
						alt={alt || title}
						layout="fill"
						className="h-full w-full"
					/>
				</div>
			</div>

			<div
				className={`text-[15px] text-primary-main ${contentClassName}`}
			>
				<p className="font-semibold">{title}</p>
				<p>{subtitle}</p>
			</div>
		</div>
	);
};
