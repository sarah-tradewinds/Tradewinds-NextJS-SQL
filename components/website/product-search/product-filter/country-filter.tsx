// Third party packages
// data
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
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
		fetchCountries,
		selectedCountries,
		setSelectedCountry
	} = useCountriesStore();

	useEffect(() => {
		if (countries.length <= 0) {
			fetchCountries();
		}
	}, [countries]);

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

			<div>
				{searchCountryByName().map((country) => {
					const countryName = getLocaleText(country.name || {}, locale);

					return (
						<div key={country.id} className="flex items-center">
							<Input
								id={country.id}
								type="checkbox"
								value={country.country_code}
								checked={country.isSelected}
								onChange={() =>
									setSelectedCountry(country.id, countryName)
								}
							/>
							<label
								htmlFor={country.id}
								className="ml-8 flex cursor-pointer items-center space-x-4"
							>
								<ImageWithErrorHandler
									src={country?.image?.url}
									alt=""
									width={23}
									height={16}
								/>
								<span className="capitalize">{countryName}</span>
							</label>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default CountrySearchFilter;
