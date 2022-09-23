import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface MainCategoryCardProps {
	title: string;
	subtitle: string;
	imageUrl: string;
	alt?: string;
	className?: string;
	style?: any;
}

const MainCategoryCard: React.FC<MainCategoryCardProps> = (props) => {
	const { title, subtitle, imageUrl, alt, className, style } = props;

	return (
		<div className={`relative h-full overflow-hidden ${className}`}>
			<h1 className="hidden text-[25px] font-semibold text-gray md:block">
				{title}
			</h1>

			<div
				className="relative flex h-full items-center justify-between p-4 md:items-start md:justify-start"
				style={style}
			>
				<h1 className="text-[18px] font-semibold text-gray md:hidden">
					{title}
				</h1>
				<p className="hidden text-white md:block md:text-[12px] lg:text-[18px]">
					{subtitle}
				</p>
			</div>

			<div className="absolute right-0 bottom-0">
				<div className="relative h-[60px] w-[60px] md:h-[120px] md:w-[120px]">
					<ImageWithErrorHandler src={imageUrl} alt="" layout="fill" />
				</div>
			</div>
		</div>
	);
}; // End of MainCategoryCard

export default MainCategoryCard;
