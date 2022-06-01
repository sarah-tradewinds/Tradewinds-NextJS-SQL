import Image from 'next/image';

// Third party packages
// data
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import React, { useEffect, useState } from 'react';
import { useCountriesStore } from 'store/countries-store';

const CountrySearchFilter: React.FC<{
	onCountryChange: (countryIds: string) => any;
}> = (props) => {
	const { onCountryChange } = props;

	const [searchCounty, setSearchCounty] = useState('');
	const [selectedCountryIdList, setSelectedCountryIdList] = useState<
		string[]
	>([]);

	const { countries, fetchCountries } = useCountriesStore();

	useEffect(() => {
		fetchCountries();
	}, []);

	useEffect(() => {
		onCountryChange(selectedCountryIdList.toString());
	}, [selectedCountryIdList]);

	const searchCountryByName = () => {
		if (!searchCounty) {
			return countries;
		}

		const filteredCountries = countries.filter(
			(country) =>
				country?.country_name?.toLowerCase() ===
				searchCounty?.toLowerCase()
		);

		return filteredCountries || [];
	}; // End of searchCountryByName function

	const handlingCountryCode = (newCountryCode: string) => {
		const countryCodeList = [...selectedCountryIdList];
		const countryCodeIndex = countryCodeList.findIndex(
			(countryCode) => countryCode === newCountryCode
		);

		if (countryCodeIndex < 0) {
			countryCodeList.push(newCountryCode);
		} else {
			countryCodeList.splice(countryCodeIndex, 1);
		}

		setSelectedCountryIdList(countryCodeList);
	}; // End of handlingCountryCode function

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
				{searchCountryByName().map((country) => (
					<div key={country.id} className="flex items-center">
						<Input
							id={country.id}
							type="checkbox"
							value={country.country_code}
							onChange={() => handlingCountryCode(country.id)}
						/>
						<label
							htmlFor={country.id}
							className="ml-8 flex cursor-pointer items-center space-x-4"
						>
							<Image
								src={'https://' + country?.country_flag?.url}
								alt=""
								width={23}
								height={16}
							/>
							<span className="capitalize">{country.country_name}</span>
						</label>
					</div>
				))}
			</div>
		</>
	);
};

export default CountrySearchFilter;
