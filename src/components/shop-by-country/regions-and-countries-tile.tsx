// Third party packages

// components
import CountryFlagTile from 'components/common/search-by-country/country-flag-tile';
import LocationHolder from 'components/common/search-by-country/location-holder';
import { useTranslation } from 'next-i18next';
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

	const { t } = useTranslation('search_by_country');
	const [isExpanded, setIsExpanded] = useState(false);
	const { locale } = useRouter();

	const countriesBasedOnIsExpanded = isExpanded
		? countries
		: [...countries].slice(0, 3);

	const countryLength = countries?.length;

	return (
		<div className={`${className}`}>
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
						<div key={country?.id}>
							<CountryFlagTile
								key={country?.id}
								imageUrl={country?.image}
								title={getLocaleText(country?.name || {}, locale)}
								onClick={() => onCountryTileClick(country)}
								containerClassName="cursor-pointer"
							/>
						</div>
					);
				})}
			</div>

			{/* {countryLength <= 3 && (
				<p className=" font-semibold text-accent-primary-main md:mt-[25px] md:text-[18px] lg:mt-[25px] lg:text-[18px] desktop:mt-4  desktop:text-[21px]">
					{t('more_coming_soon')}
				</p>
			)} */}

			{/* actions */}
			{countryLength > 3 && (
				<div
					className=" container mx-auto justify-center md:mt-[25px] md:pl-[80px] lg:mt-[25px] lg:pl-[80px] desktop:mt-4 desktop:pl-[120px]"
					onClick={() => setIsExpanded((prevState) => !prevState)}
				>
					{isExpanded ? (
						<HiMinusCircle className="text-secondary md:text-[26px] lg:text-[26px] desktop:text-[20px]" />
					) : (
						<HiPlusCircle className=" text-secondary md:text-[26px] lg:text-[26px] desktop:text-[20px]" />
					)}
				</div>
			)}
		</div>
	);
};

export default RegionAndCountriesTile;
