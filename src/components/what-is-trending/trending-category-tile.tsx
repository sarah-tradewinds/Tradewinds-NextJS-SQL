import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface TrendingCategoryTileProps {
	index: string;
	backgroundColor: string;
	title: string;
	imageUrl: string;
	onTileClick?: () => void;
}

const TrendingCategoryTile: React.FC<TrendingCategoryTileProps> = (
	props
) => {
	const { index, backgroundColor, title, imageUrl, onTileClick } =
		props;

	return (
		<div className="flex h-[61px] items-center justify-between rounded-md bg-white px-[6px]">
			<div className="flex items-center space-x-[10.42px]">
				<div
					className="flex h-[23.66px] w-[26.5px] items-center justify-center text-[19.48px] font-semibold leading-[23.75px] text-gray"
					style={{ backgroundColor }}
				>
					{index}
				</div>
				<p
					onClick={onTileClick}
					className="text-[15px] font-semibold leading-[18.29px] text-gray"
				>
					{title}
				</p>
			</div>

			<div className="relative h-[50px] w-[46.82px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={title}
					fill={true}
					className="object-cover"
				/>
			</div>
		</div>
	);
};

export default TrendingCategoryTile;
