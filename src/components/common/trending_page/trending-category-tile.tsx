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
		<div className="relative rounded-lg bg-white p-4 shadow-md md:h-[295.35px]">
			<p
				className="inline-block px-4 text-xl font-semibold text-[#575858]"
				style={{ backgroundColor: backgroundColor }}
			>
				{index}
			</p>
			<p
				className="cursor-pointer text-xl font-semibold text-[#575858]"
				onClick={onTileClick}
			>
				{title}
			</p>

			<div className="absolute bottom-0 right-0">
				<div className="relative mt-6 md:h-[214.88px] md:w-[214.88px] lg:h-[227px] lg:w-[227px]">
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
