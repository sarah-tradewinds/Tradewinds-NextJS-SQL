// Third party packages

// components
import RegionAndCountriesTile from './regions-and-countries-tile';

const RegionsAndCountriesList: React.FC<{
	regionsAndCountries: [];
}> = ({ regionsAndCountries = [] }) => {
	return (
		<div className="grid grid-cols-4">
			{regionsAndCountries?.map((regionAndCountries: any) => {
				const { countries = [] } = regionAndCountries || {};

				return (
					<RegionAndCountriesTile
						key={regionAndCountries.id}
						regionId={regionAndCountries.id}
						regionName={regionAndCountries.name}
						countries={countries || []}
						className="mt-32 flex flex-col items-center space-y-6"
					/>
				);
			})}
		</div>
	);
};

export default RegionsAndCountriesList;
