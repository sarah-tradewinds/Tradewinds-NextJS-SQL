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
			<div
				className={` block items-center sm:flex ${containerClassName}`}
			>
				<div>
					<div
						className={`relative h-[148px] w-[255px] sm:h-[149px] sm:w-[255px] md:h-[177px] md:w-[306px] lg:h-[237px] lg:w-[409px] desktop:h-[350px] desktop:w-[603px] ${imageClassName}`}
					>
						<ImageWithErrorHandler
							src={imageUrl}
							alt={title}
							fill={true}
						/>
					</div>
				</div>

				<div className={`  mt-4 ${className}`}>
					<div className="text-[12px] sm:text-[12px] md:text-[16px] lg:text-[15px] desktop:text-[25px]">
						<p className="font-semibold">{title}</p>
						<p>{subtitle}</p>
					</div>
					<div
						className={`-ml-3 mt-[23px] space-y-2 px-4 sm:ml-0 sm:mt-[15px] md:mt-[10px] lg:mt-[15px] desktop:mt-[15px] ${childrenContainerClassName}`}
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
					className={`relative !mt-[5px] mr-[11px] h-[12px] w-[14px] sm:mr-[5px] sm:block sm:h-[12px] sm:w-[14px] md:mr-[13px] md:block md:h-[15px] md:w-[17px] lg:mr-[15px] lg:h-[22px] lg:w-[20px] desktop:mr-[18px] desktop:h-[34px] desktop:w-[29px] ${imgClassName}`}
				>
					<ImageWithErrorHandler
						src={imageUrl}
						alt={title}
						fill={true}
						className=""
					/>
				</div>
			</div>

			<div
				className={`text-[10px] sm:text-[10px] sm:leading-[12px] md:text-[12px] md:leading-[15px] lg:text-[12px] lg:leading-[15px] desktop:text-[18px] desktop:leading-[21px] ${contentClassName}`}
			>
				<p className="font-semibold">
					{title} <span className=" font-normal">{subtitle}</span>
				</p>
			</div>
		</div>
	);
};
