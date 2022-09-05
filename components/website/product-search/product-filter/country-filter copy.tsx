// Third party packages
// data
import CountryCollapse from 'components/website/common/country-collapse/country-collapse';
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import { getRegionsAndCountries } from 'lib/shop-by-country.lib';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getIdAndName } from 'store/category-store-copy';
import { useCountriesStore } from 'store/countries-store';
import { getLocaleText } from 'utils/get_locale_text';

const CountrySearchFilterCopy: React.FC<{
	onCountryChange?: (countryIds: string) => any;
}> = (props) => {
	const [searchCounty, setSearchCounty] = useState('');
	const [regionsAndCountryList, setRegionsAndCountryList] = useState<
		any[]
	>([]);
	const [filteredRegionsAndCountries, setFilteredRegionsAndCountries] =
		useState<any[]>([]);

	const { locale, push, query } = useRouter();

	const { region, country } = query;

	const {
		regionsAndCountries,
		fetchRegionsAndCountries,
		setSelectedCountry
	} = useCountriesStore();

	useEffect(() => {
		getRegionsAndCountries().then((data) => {
			setRegionsAndCountryList(data);
			setFilteredRegionsAndCountries(data);
		});
	}, []);

	// Fetching countries with regions
	useEffect(() => {
		if (regionsAndCountries.length <= 0) {
			fetchRegionsAndCountries();
		}
	}, [regionsAndCountries]);

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
							[...regionsAndCountryList],
							searchCounty
						);
						if (!searchCounty) {
							setFilteredRegionsAndCountries(regionsAndCountryList);
						} else {
							setFilteredRegionsAndCountries(filterData);
						}
					}}
				>
					Go
				</Button>
			</div>

			{/* Regions and country list */}
			<div className="space-y-2">
				{regionsAndCountries.length <= 0 && <Skeleton count={16} />}

				{regionsAndCountries.map((regionAndCountries) => {
					const { countries = [] } = regionAndCountries || {};

					const regionId = regionAndCountries?.id;

					const [selectedRegionId] =
						getIdAndName((region || '') as string) || [];

					const isRegionSelected = regionId === selectedRegionId;

					return (
						<CountryCollapse
							key={regionId}
							isOpen={isRegionSelected}
							leading={countries?.length}
							title={getLocaleText(
								regionAndCountries?.name || {},
								locale
							)}
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
								{countries.map((countryData: any) => {
									const countryName = getLocaleText(
										countryData.name || {},
										locale
									);

									const [selectedCountryId] =
										getIdAndName((country || '') as string) || [];

									const isCountrySelected =
										countryData.id === selectedCountryId;

									return (
										<Button
											key={countryData.id}
											className={`!block !min-h-[24px] !text-gray ${
												isCountrySelected ? '!text-black' : ''
											}`}
											onClick={() => {
												push(
													`/product-search-copy?region=${regionId}_${
														regionAndCountries?.name?.en || ''
													}&country=${countryData.id}_${
														countryData?.name?.en || ''
													}`
												);
											}}
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

export default CountrySearchFilterCopy;

const searchCountryByNameUtil = (
	regionsAndCountryList: any[],
	searchedCountryName: string
) => {
	const copiedRegionsAndCountries = [...regionsAndCountryList];

	if (!searchedCountryName) {
		return copiedRegionsAndCountries;
	}

	const searchedRegionOrCountryName =
		searchedCountryName.toLocaleLowerCase();

	const filteredCountries = copiedRegionsAndCountries.filter(
		(regionAndCountries) => {
			const { name, countries = [] } = regionAndCountries || {};

			regionAndCountries.isSelected = false;
			if (name.toLowerCase() === searchedRegionOrCountryName) {
				regionAndCountries.isSelected = true;
				return regionAndCountries;
			} else {
				const filterCountries = countries.filter((country: any) => {
					const countryNames = Object.values(country?.name || {});
					const countryIndex = countryNames.findIndex(
						(countryName: any) => {
							return (
								countryName.toLowerCase() ===
								searchedRegionOrCountryName
							);
						}
					);

					const isCountryNameMatched = countryIndex >= 0;
					country.isSelected = isCountryNameMatched;

					return isCountryNameMatched;
				});

				regionAndCountries.isSelected = filterCountries.length > 0;
				regionAndCountries.countries = filterCountries || [];
				return regionAndCountries;
			}
		}
	);

	return filteredCountries || [];
}; // End of searchCountryByNameUtil function
