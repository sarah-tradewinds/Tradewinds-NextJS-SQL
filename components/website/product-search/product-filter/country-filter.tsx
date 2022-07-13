// Third party packages
// data
import CountryCollapse from 'components/website/common/country-collapse/country-collapse';
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import { searchCountryByNameUtil } from 'lib/product-search.lib';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCountriesStore } from 'store/countries-store';
import { getCountriesName } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

const CountrySearchFilter: React.FC<{
	onCountryChange?: (countryIds: string) => any;
}> = (props) => {
	const { onCountryChange } = props;

	const [searchCounty, setSearchCounty] = useState('');
	const [filteredRegionsAndCountries, setFilteredRegionsAndCountries] =
		useState<any[]>([]);

	const { locale } = useRouter();

	const {
		regionsAndCountries,
		fetchRegionsAndCountries,
		fetchCountries,
		selectedCountries,
		setSelectedCountry
	} = useCountriesStore();

	// Fetching countries with regions
	useEffect(() => {
		if (regionsAndCountries.length <= 0) {
			fetchRegionsAndCountries();
		}
	}, [regionsAndCountries]);

	useEffect(() => {
		if (onCountryChange) {
			onCountryChange(getCountriesName(selectedCountries).toString());
		}
	}, [selectedCountries]);

	// Setting filter
	// useEffect(() => {
	// 	setFilteredRegionsAndCountries(regionsAndCountries);
	// }, [regionsAndCountries]);

	return (
		<>
			{/* Search box */}
			<div className="flex">
				<Input
					className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto"
					value={searchCounty}
					onChange={({ target }) => setSearchCounty(target.value)}
				/>
				<Button
					variant="buyer"
					className="rounded-none rounded-r-md px-2"
					onClick={() => {
						const filterData = searchCountryByNameUtil(
							regionsAndCountries,
							searchCounty
						);
						console.log('filterData =', filterData);
						setFilteredRegionsAndCountries(filterData);
					}}
				>
					Go
				</Button>
			</div>

			{/* Regions and country list */}
			<div className="space-y-2">
				{filteredRegionsAndCountries.map((regionAndCountries) => {
					const { countries = [] } = regionAndCountries || {};

					return (
						<CountryCollapse
							key={regionAndCountries?.id}
							isOpen={regionAndCountries.isSelected}
							leading={countries?.length}
							title={regionAndCountries?.name}
							plusIcon={
								<span className="cursor-pointer text-[15px] font-semibold">
									+
								</span>
							}
							minusIcon={
								<span className="cursor-pointer text-[15px] font-semibold">
									-
								</span>
							}
							containerClassName="flex-row-reverse !px-0"
							contentContainerClassName="flex-row-reverse space-x-4 justify-end "
						>
							<div>
								{countries.map((country: any) => {
									const countryName = getLocaleText(
										country.name || {},
										locale
									);

									return (
										<Button
											key={country.id}
											className={`!block !min-h-[24px] text-gray ${
												country.isSelected ? '!text-black' : ''
											}`}
											onClick={() =>
												setSelectedCountry(country.id, countryName)
											}
										>
											{countryName}
										</Button>
									);
								})}
							</div>
						</CountryCollapse>
					);
				})}
			</div>
		</>
	);
};

export default CountrySearchFilter;
