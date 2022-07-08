// Third party packages

// components
import CountryFlagTile from 'components/website/common/search-by-country/country-flag-tile';
import LocationHolder from 'components/website/common/search-by-country/location-holder';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

interface RegionAndCountriesTileProps {
	regionId: string;
	regionName: string;
	countries: [];
	className?: string;
}

const RegionAndCountriesTile: React.FC<RegionAndCountriesTileProps> = (
	props
) => {
	const { regionName, countries, className } = props;

	const [isExpanded, setIsExpanded] = useState(false);

	const countriesBasedOnIsExpanded = isExpanded
		? countries
		: [...countries].slice(0, 3);

	return (
		<div className={className}>
			<LocationHolder
				title={regionName}
				imageUrl="/static/images/search-by-country-images/north-america.png"
				count={countries?.length}
			/>
			{/* Countries List */}
			<div className="space-y-8">
				{countriesBasedOnIsExpanded?.map((country: any) => {
					return (
						<CountryFlagTile
							key={country?.id}
							imageUrl="/static/images/search-by-country-images/flags/usa.png"
							title={country?.name}
						/>
					);
				})}
			</div>

			{/* actions */}
			<div
				className="cursor-pointer"
				onClick={() => setIsExpanded((prevState) => !prevState)}
			>
				{isExpanded ? (
					<HiMinusCircle className="text-[32px] text-secondary" />
				) : (
					<HiPlusCircle className="text-[32px] text-secondary" />
				)}
			</div>
		</div>
	);
};

export default RegionAndCountriesTile;
