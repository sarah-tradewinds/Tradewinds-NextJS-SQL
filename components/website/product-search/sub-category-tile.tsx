import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface SubCategoryTileProps {
	title: string;
	imageUrl: string;
	icon?: any;
	alt?: string;
	showBorder?: boolean;
	onTilePressed?: () => any;
	className?: string;
}

const SubCategoryTile: React.FC<SubCategoryTileProps> = ({
	title,
	imageUrl,
	alt,
	icon,
	showBorder,
	onTilePressed,
	className
}) => {
	return (
		<div
			className={`flex cursor-pointer items-center space-x-4 ${className}`}
			onClick={onTilePressed}
		>
			{!icon && (
				<div>
					<div className="relative h-[60px] w-[60px] object-cover">
						<ImageWithErrorHandler
							src={imageUrl}
							alt={alt}
							layout="fill"
						/>
					</div>
				</div>
			)}
			{icon}
			<div className="relative">
				<p className="text-[15px] font-semibold text-gray md:text-[12px] lg:text-[18px]">
					{title}
				</p>
				{showBorder && (
					<p className="absolute left-1/2 -bottom-2 w-3/5 -translate-x-1/2 rounded-full border-b-4 border-secondary"></p>
				)}
			</div>
		</div>
	);
}; // End of SubCategoryTile component

export default SubCategoryTile;
