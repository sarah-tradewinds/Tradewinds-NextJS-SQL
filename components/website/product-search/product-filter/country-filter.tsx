// Third party packages
// data
import CountryCollapse from 'components/website/common/country-collapse/country-collapse';
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
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
	const { locale } = useRouter();

	const {
		countries,
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

	const searchCountryByName = () => {
		if (!searchCounty) {
			return countries;
		}

		const filteredCountries = countries.filter((country) => {
			const countryNames = Object.values(country?.name || {});
			const countryIndex = countryNames.findIndex(
				(countryName: any) => {
					return (
						countryName.toLowerCase() === searchCounty?.toLowerCase()
					);
				}
			);

			return countryIndex >= 0;
		});

		return filteredCountries || [];
	}; // End of searchCountryByName function

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
					onClick={searchCountryByName}
				>
					Go
				</Button>
			</div>

			<div className="space-y-2">
				{regionsAndCountries.map((regionAndCountries) => {
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
