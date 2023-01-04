// Third party packages

// components
import CountryFlagTile from 'components/common/search-by-country/country-flag-tile';
import LocationHolder from 'components/common/search-by-country/location-holder';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { getLocaleText } from 'utils/get_locale_text';

interface RegionAndCountriesTileProps {
	regionId: string;
	regionName: string;
	regionImageUrl: string;
	regionColor?: string;
	countries: [];
	className?: string;
	onCountryTileClick: (country: any) => any;
}

const RegionAndCountriesTile: React.FC<RegionAndCountriesTileProps> = (
	props
) => {
	const {
		regionName,
		regionImageUrl,
		regionColor,
		countries,
		className,
		onCountryTileClick
	} = props;

	const [isExpanded, setIsExpanded] = useState(false);
	const { locale } = useRouter();

	const countriesBasedOnIsExpanded = isExpanded
		? countries
		: [...countries].slice(0, 3);

	const countryLength = countries?.length;

	return (
		<div className={className}>
			<div>
				<LocationHolder
					title={regionName}
					imageUrl={regionImageUrl}
					color={regionColor}
					count={countryLength}
				/>
			</div>

			{/* Countries List */}
			<div className="space-y-8">
				{countriesBasedOnIsExpanded?.map((country: any) => {
					return (
						<CountryFlagTile
							key={country?.id}
							imageUrl={country?.image?.url}
							title={getLocaleText(country?.name || {}, locale)}
							onClick={() => onCountryTileClick(country)}
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
