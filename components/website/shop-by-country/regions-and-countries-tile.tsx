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
	onCountryTileClick: (countryId: string) => any;
}

const RegionAndCountriesTile: React.FC<RegionAndCountriesTileProps> = (
	props
) => {
	const { regionName, countries, className, onCountryTileClick } =
		props;

	const [isExpanded, setIsExpanded] = useState(false);

	const countriesBasedOnIsExpanded = isExpanded
		? countries
		: [...countries].slice(0, 3);

	const countryLength = countries?.length;

	return (
		<div className={className}>
			<LocationHolder
				title={regionName}
				imageUrl="/static/images/search-by-country-images/north-america.png"
				count={countryLength}
			/>
			{/* Countries List */}
			<div className="space-y-8">
				{countriesBasedOnIsExpanded?.map((country: any) => {
					return (
						<CountryFlagTile
							key={country?.id}
							imageUrl="/static/images/search-by-country-images/flags/usa.png"
							title={country?.name}
							onClick={() => onCountryTileClick(country.name)}
							containerClassName="cursor-pointer"
						/>
					);
				})}
			</div>

			{countryLength <= 3 && (
				<p className="mt-4 text-[20px] font-semibold text-accent-primary-main">
					More Coming Soon
				</p>
			)}

			{/* actions */}
			{countryLength > 3 && (
				<div
					className="mt-4 cursor-pointer"
					onClick={() => setIsExpanded((prevState) => !prevState)}
				>
					{isExpanded ? (
						<HiMinusCircle className="text-[32px] text-secondary" />
					) : (
						<HiPlusCircle className="text-[32px] text-secondary" />
					)}
				</div>
			)}
		</div>
	);
};

export default RegionAndCountriesTile;
