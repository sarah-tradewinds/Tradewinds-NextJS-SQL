import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface MainCategoryCardProps {
	title: string;
	subtitle: string;
	imageUrl: string;
	alt?: string;
	className?: string;
}

const MainCategoryCard: React.FC<MainCategoryCardProps> = (props) => {
	const { title, subtitle, imageUrl, alt, className } = props;

	return (
		<div className={className}>
			<h1 className="hidden text-[25px] font-semibold text-gray md:block">
				{title}
			</h1>
			<div className="flex items-center justify-between bg-agri-main p-4 md:mt-2 md:items-start md:justify-start">
				<h1 className="text-[18px] font-semibold text-gray md:hidden">
					{title}
				</h1>
				<p className="hidden text-white md:block md:text-[12px] lg:text-[18px]">
					{subtitle}
				</p>
				<div className="relative h-[38px] w-[35px] md:h-[133px] md:w-[280px]">
					<ImageWithErrorHandler src={imageUrl} alt="" layout="fill" />
				</div>
			</div>
		</div>
	);
}; // End of MainCategoryCard

export default MainCategoryCard;
