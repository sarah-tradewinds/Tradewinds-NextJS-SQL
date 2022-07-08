// Third party packages

// components
import RegionAndCountriesTile from './regions-and-countries-tile';

const RegionsAndCountriesList: React.FC<{
	regionsAndCountries: [];
	className?: string;
	onCountryClick: (countryId: string) => any;
}> = ({ regionsAndCountries = [], className, onCountryClick }) => {
	return (
		<>
			{regionsAndCountries?.map((regionAndCountries: any) => {
				const { countries = [] } = regionAndCountries || {};

				return (
					<RegionAndCountriesTile
						key={regionAndCountries.id}
						regionId={regionAndCountries.id}
						regionName={regionAndCountries.name}
						countries={countries || []}
						className={className}
						onCountryTileClick={onCountryClick}
					/>
				);
			})}
		</>
	);
};

export default RegionsAndCountriesList;
