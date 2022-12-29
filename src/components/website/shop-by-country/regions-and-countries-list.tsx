// Third party packages

// components
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';
import RegionAndCountriesTile from './regions-and-countries-tile';

const RegionsAndCountriesList: React.FC<{
	regionsAndCountries: [];
	className?: string;
	onCountryClick: (country: any) => any;
}> = ({ regionsAndCountries = [], className, onCountryClick }) => {
	const { locale } = useRouter();

	return (
		<>
			{regionsAndCountries?.map((regionAndCountries: any) => {
				const { countries = [] } = regionAndCountries || {};

				return (
					<RegionAndCountriesTile
						key={regionAndCountries.id}
						regionId={regionAndCountries.id}
						regionName={getLocaleText(
							regionAndCountries.name || {},
							locale
						)}
						regionImageUrl={
							regionAndCountries?.image?.url ||
							'/static/images/search-by-country-images/shape.png'
						}
						regionColor={regionAndCountries?.color}
						countries={countries || []}
						className={className}
						onCountryTileClick={(country) => {
							country.region = {
								id: regionAndCountries.id,
								name: regionAndCountries?.name?.en
							};
							onCountryClick(country);
						}}
					/>
				);
			})}
		</>
	);
};

export default RegionsAndCountriesList;
