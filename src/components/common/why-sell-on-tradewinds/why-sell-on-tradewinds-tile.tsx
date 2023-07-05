import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface WhySellOnTWOperationProps {
	imageUrl: string;

	title: string;
	subtitle?: string | React.ReactNode;
	className?: string;
	displayBorder?: boolean;
	containerClassName?: string;
	imageClassName?: string;
	childrenContainerClassName?: string;
}

export const WhySellOnTWOperationTile: React.FC<
	WhySellOnTWOperationProps
> = ({
	imageUrl,

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
						className={`relative md:h-[400px] md:w-[300px] lg:h-[350px] lg:w-[603px] ${imageClassName}`}
					>
						<ImageWithErrorHandler
							src={imageUrl}
							alt={title}
							fill={true}
						/>
					</div>
				</div>

				<div className={className}>
					<div className=" md:text-[20px] lg:text-[35px]">
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

export const WhySellOnTWOperationSubTile: React.FC<{
	imageUrl: string;

	title: string;
	subtitle: string;
	className?: string;
	displayBorder?: boolean;
	contentClassName?: string;
	imgClassName?: string;
}> = ({
	imageUrl,

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
					className={`relative mr-[18px] h-[34px] w-[29px] ${imgClassName}`}
				>
					<ImageWithErrorHandler
						src={imageUrl}
						alt={title}
						fill={true}
						className=""
					/>
				</div>
			</div>

			<div className={`text-[18px] ${contentClassName}`}>
				<p className="font-semibold">
					{title} <span className=" font-normal">{subtitle}</span>
				</p>
			</div>
		</div>
	);
};
