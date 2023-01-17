import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import { useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useRouter } from 'next/router';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { getLocaleText } from 'utils/get_locale_text';

// components
import CountryFlagTile from 'components/common/search-by-country/country-flag-tile';
import Seo from 'components/common/seo';
import RegionsAndCountriesList from 'components/shop-by-country/regions-and-countries-list';

// lib
import { getRegionsAndCountries } from 'lib/shop-by-country.lib';
import { useEffect } from 'react';
import { useCategoryStore } from 'store/category-store';
import { useCountriesStore } from 'store/countries-store';

const ShopByCountryPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ regionsAndCountries = [] }) => {
	const { t } = useTranslation('search_by_country');

	const router = useRouter();

	const removeCategoryFilter = useCategoryStore(
		(state) => state.removeCategoryFilter
	);

	const { setSelectedCountry, removeSelectedCountries } =
		useCountriesStore((state) => ({
			setSelectedCountry: state.setSelectedCountry,
			removeSelectedCountries: state.removeSelectedCountries
		}));

	useEffect(() => {
		removeSelectedCountries();
	}, []);

	const countryClickHandler = (
		regionId: string,
		regionName: string,
		countryId: string,
		countryName: string
	) => {
		router.push(
			`/product-search?region=${regionId}_${regionName}&country=${countryId}_${countryName}`
		);
	}; // End of countryClickHandler

	return (
		<>
			<Seo title="Search by country page" description="" />

			<div className="relative mb-[2080px] bg-white md:m-auto ">
				{/* Headers */}
				<div className="relative bg-secondary">
					<div className="relative h-[480px] bg-[url('/static/images/search-by-country-images/search-by-country-header.png')]"></div>
					<h1 className="absolute inset-0 top-16 text-center text-[35px] font-semibold text-white md:top-24 md:text-[40px] lg:top-16 lg:text-[96px]">
						{t('shop_by_country')}
					</h1>
				</div>

				<div className="container">
					{/* for small device */}
					<div className="absolute top-[140px] left-1/2 w-5/6 -translate-x-1/2 transform rounded-t-[40px] bg-white  pt-8 md:hidden">
						<div className="space-y-2 px-4">
							{regionsAndCountries.map((regionAndCountries: any) => {
								const { countries = [] } = regionAndCountries || {};
								const regionId = regionAndCountries.id;

								return (
									<CountryCollapse
										key={regionId}
										leading={countries?.length}
										title={getLocaleText(
											regionAndCountries.name || {},
											router.locale
										)}
									>
										<div className="space-y-2 bg-white py-2 pl-16">
											{countries?.map((country: any) => {
												return (
													<CountryFlagTile
														key={country.id}
														title={getLocaleText(
															country.name || {},
															router.locale
														)}
														imageUrl={country?.image?.url}
														onClick={() => {
															countryClickHandler(
																regionId,
																regionAndCountries?.name,
																country.id,
																country.name?.en
															);
														}}
													/>
												);
											})}
										</div>
									</CountryCollapse>
								);
							})}
						</div>
					</div>

					{/* Island and flags */}
					<div className="-mt-[16px] mb-40 hidden justify-center md:flex">
						<div className="w-[95%]s">
							<div className="grid grid-cols-4 gap-x-16 gap-y-24">
								<RegionsAndCountriesList
									regionsAndCountries={regionsAndCountries || []}
									onCountryClick={(country) => {
										countryClickHandler(
											country?.region?.id,
											country?.region?.name,
											country.id,
											country.name?.en
										);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	const regionsAndCountries = await getRegionsAndCountries();

	// Top Row, from left to right: North America, Mexico and Central America, The Caribbean, South America
	// Bottom Row, from left to right: Europe, Africa, Middle East, Asia
	// Lastly: Global/Rest of worlds (Australia)

	const topRegionsAndCountries: any[] = [];
	const topRegionNames = [
		'north america',
		'mexico and central',
		'america',
		'the caribbean',
		'south america'
	];

	const middleRegionsAndCountries: any[] = [];
	const middleRegionsNames = [
		'europe',
		'africa',
		'middle east',
		'asia'
	];

	const bottomRegionsAndCountries: any[] = [];

	const getRegionsAndCountriesList = (
		regionNames: string[],
		revert?: boolean
	) => {
		const regionsAndCountryList: any[] = [];
		regionNames.forEach((regionName) => {
			regionsAndCountries?.forEach((regionAndCountries: any) => {
				const fetchedRegionName = (
					regionAndCountries?.name?.en || ''
				)?.toLowerCase();

				if (
					fetchedRegionName === regionName?.toLowerCase() &&
					!revert
				) {
					regionsAndCountryList.push(regionAndCountries);
				}

				if (revert && fetchedRegionName !== regionName?.toLowerCase()) {
					regionsAndCountryList.push(regionAndCountries);
				}
			});
		});

		return regionsAndCountryList || [];
	}; // End of getRegionsAndCountriesList

	const regionsAndCountryList: any[] = [
		...getRegionsAndCountriesList(topRegionNames),
		...getRegionsAndCountriesList(middleRegionsNames),
		...getRegionsAndCountriesList(['australia'])
	];

	return {
		props: {
			// regionsAndCountries: regionsAndCountryList || regionsAndCountries,
			regionsAndCountries,
			...(await serverSideTranslations(locale || 'en'))
		}
	};
};

export default ShopByCountryPage;

const CountryCollapse: React.FC<{
	leading?: any;
	title?: any;
	isOpen?: boolean;
	onClose?: () => any;
}> = (props) => {
	const { leading, title, children, onClose } = props;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className="flex items-center bg-white px-2">
				<div className="flex w-full items-center bg-white">
					<p className="w-[40px] text-[16px] font-semibold text-cyan">
						({leading})
					</p>

					<p className="text-[16px] font-semibold">{title}</p>
				</div>

				<div onClick={() => setIsOpen((prevState) => !prevState)}>
					{isOpen ? (
						<HiMinusCircle className="text-[32px] text-secondary" />
					) : (
						<HiPlusCircle className="text-[32px] text-secondary" />
					)}
				</div>
			</div>
			{isOpen && <div>{children}</div>}
		</div>
	);
}; // End of CountryCollapse component
