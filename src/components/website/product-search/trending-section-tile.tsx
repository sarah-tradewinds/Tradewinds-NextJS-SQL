import { BsCurrencyDollar } from 'react-icons/bs';
import MainCategoryCard from './main-category-card';
import SubCategoryTile from './sub-category-tile';

interface TrendingSectionTileProps {
	minPrice: number;
	maxPrice: number;
	filterByEco?: boolean;
	onMinPriceClick: (price: number) => any;
	onMaxPriceClick: (price: number) => any;
	onEcoClick: () => any;
}

const TrendingSectionTile: React.FC<TrendingSectionTileProps> = (
	props
) => {
	const {
		minPrice,
		maxPrice,
		filterByEco,
		onMinPriceClick,
		onMaxPriceClick,
		onEcoClick
	} = props;

	const filterOptions = [
		{
			id: '1',
			imageUrl: '',
			icon: (
				<div className="flex text-[32px] text-primary-eco">
					<BsCurrencyDollar className="-mr-3" />
					<BsCurrencyDollar className="-mr-3" />
					<BsCurrencyDollar className="-mr-3" />
				</div>
			),
			title: 'Over $100 USD',
			isSelected: minPrice === 100,
			onClick: onMinPriceClick
		},
		{
			id: '2',
			imageUrl: '',
			icon: (
				<BsCurrencyDollar className="text-[32px] text-primary-eco" />
			),
			title: 'Under $100 USD',
			isSelected: maxPrice === 100,
			onClick: onMaxPriceClick
		},
		{
			id: '3',
			imageUrl: '/static/icons/eco-icon.png',
			title: 'ECO',
			isSelected: filterByEco,
			onClick: onEcoClick
		}
	];

	return (
		<div className="grid grid-cols-12 md:gap-0 md:rounded-md md:bg-white md:p-4 md:shadow-md lg:gap-2">
			{/* Trending Card */}
			<div className="col-span-12 md:col-span-3">
				<MainCategoryCard
					title={"What's Trending?"}
					subtitle={'You will get all the trending product list.'}
					imageUrl="/"
					className="w-screen md:w-auto"
				/>
			</div>
			{/* Filter for Trending mode */}
			<div className="col-span-12 border-gray/20 md:col-span-9 md:ml-4 md:border-l-2 md:pl-4">
				<div className="flex justify-between">
					{filterOptions.map((filterOption) => (
						<SubCategoryTile
							key={filterOption.id}
							className="pb-4"
							title={filterOption.title}
							imageUrl={
								filterOption.imageUrl || '/vehicles/green-tractor.png'
							}
							icon={filterOption.icon}
							onTilePressed={() => {
								filterOption.onClick(0);
							}}
							showBorder={filterOption.isSelected}
						/>
					))}
				</div>
			</div>
		</div>
	);
}; // End of TrendingSectionTile

export default TrendingSectionTile;
