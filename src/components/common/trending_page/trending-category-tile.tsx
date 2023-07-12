import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface ITrendingCategoryTile {
	index: number;
	title: string;
	imageUrl: string;
	backgroundColor: string;
	onTileClick?: () => void;
}

const TrendingCategoryTile: React.FC<ITrendingCategoryTile> = (
	props
) => {
	const { index, title, imageUrl, backgroundColor, onTileClick } =
		props;

	return (
		<div className="relative rounded-lg bg-white p-4 shadow-sm md:h-[282.9px]">
			<p
				className="font-semibold text-gray md:mt-1 md:h-[20.21px] md:w-[33.42px] md:pl-1 md:text-[15.45px] md:leading-[18.83px] lg:h-[18.45px] lg:w-[30.06px] lg:text-[14.35px] lg:leading-[17.49px] xl:h-[22.86px] xl:w-[37.25px] xl:text-[17.78px] xl:leading-[21.67px] desktop:h-[27px] desktop:w-[44px] desktop:text-[21px] desktop:leading-[25.6px]"
				style={{ backgroundColor: backgroundColor }}
			>
				{index}
			</p>
			<p
				className="cursor-pointer font-semibold text-gray md:text-[15.54px] md:leading-[18.29px] xl:text-[17.78px] xl:leading-[21.67px] desktop:text-[21px] desktop:leading-[25.6px]"
				onClick={onTileClick}
			>
				{title}
			</p>

			<div className="absolute bottom-0 right-0 md:bottom-[7.77px] md:right-[13.21px]">
				<div className="relative mt-6 md:h-[173.31px] md:w-[173.31px] lg:h-[155.09px] lg:w-[155.09px] xl:h-[192.17px] xl:w-[192.17px] desktop:h-[227px] desktop:w-[192.17px]">
					<ImageWithErrorHandler
						key={imageUrl}
						src={imageUrl}
						alt={title}
						fill={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default TrendingCategoryTile;
