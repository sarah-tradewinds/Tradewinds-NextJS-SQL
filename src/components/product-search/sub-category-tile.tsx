import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface SubCategoryTileProps {
	title: string;
	imageUrl: string;
	icon?: any;
	alt?: string;
	showBorder?: boolean;
	onTilePressed?: () => any;
	className?: string;
	imageClassName?: string;
	titleClassName?: string;
}

const SubCategoryTile: React.FC<SubCategoryTileProps> = ({
	title,
	imageUrl,
	alt,
	icon,
	showBorder,
	onTilePressed,
	className,
	imageClassName,
	titleClassName
}) => {
	return (
		<div
			className={`flex cursor-pointer items-center space-x-4 ${className}`}
			onClick={onTilePressed}
		>
			{!icon && (
				<div>
					<div
						className={`relative h-[33px] w-[37px] md:h-[60px] md:w-[60px] ${imageClassName}`}
					>
						<ImageWithErrorHandler
							src={imageUrl}
							alt={alt || ''}
							fill={true}
						/>
					</div>
				</div>
			)}
			{icon}
			<div className="relative">
				<p
					className={`text-[15px] font-semibold leading-[18px] text-gray md:text-[12px] lg:text-[18px] ${titleClassName}`}
				>
					{title}
				</p>
				{showBorder && (
					<p className="absolute left-1/2 -bottom-2 w-3/5 -translate-x-1/2 rounded-full border-b-2 border-secondary md:border-b-4"></p>
				)}
			</div>
		</div>
	);
}; // End of SubCategoryTile component

export default SubCategoryTile;
