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
			`/product-search?region=${regionId}_${regionName}&country=${countryId}_${countryName}&trendingProduct=${true}`
		);
	}; // End of countryClickHandler

	return (
		<>
			<Seo title="Search by country page" description="" />

			<div className="container relative mx-auto  justify-center bg-white md:m-auto ">
				{/* Headers */}
				<div className=" relative ">
					<div className="container relative mx-auto h-[240px] w-[300px] justify-center bg-[url('/static/images/search-by-country-images/shopby-header-image-small.png')] bg-cover bg-no-repeat sm:h-[298px] sm:w-[640px] md:h-[238px] md:w-[768px] md:!bg-[url('/static/images/search-by-country-images/search-by-country-header.png')] lg:h-[318px] lg:w-[1025px] desktop:h-[436px] desktop:w-[1512px]">
						<p className=" absolute pl-[58px] pt-[31px] text-[32px] font-semibold text-white sm:pt-[83px] sm:pl-[202px] sm:text-[25px] md:pt-[85px] md:pl-[113px] md:text-[25px] lg:pt-[115px] lg:pl-[151px] lg:text-[40px] desktop:pt-[180px] desktop:pl-[332px] desktop:text-[96px]">
							{t('shop_by_country')}
						</p>
					</div>
				</div>

				<div className="container">
					{/* Island and flags */}
					<div className=" hidden justify-center pb-[40px] sm:hidden md:mt-0 md:flex lg:mt-0 desktop:-mt-[16px]">
						<div className="grid md:grid-cols-3 md:gap-x-[20px] md:gap-y-[123px] lg:grid-cols-4 lg:gap-x-[20px] lg:gap-y-[96px] desktop:grid-cols-4 desktop:gap-x-[30px] desktop:gap-y-[130px]">
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
						{console.log('regionsAndCountries', regionsAndCountries)}
					</div>
				</div>
			</div>
			{/* for small device */}
			<div className=" relative left-1/2 z-50 -mt-[83px] block w-[237px] -translate-x-1/2 transform rounded-md bg-white sm:-mt-[86px] sm:block sm:w-[447px] md:hidden">
				<div className="mr-[28px] ml-[24px] space-y-[15px] py-[15px] sm:mr-[47px] sm:ml-[40px] sm:pt-[15px]">
					{regionsAndCountries.map((regionAndCountries: any) => {
						const countries =
							regionAndCountries?.edges?.region_country || [];
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
								<div className="space-y-[30px] bg-white py-2 pl-[25px] sm:pl-[40px]">
									{countries?.map((country: any) => {
										console.log('country', country);
										return (
											<CountryFlagTile
												key={country.id}
												title={getLocaleText(
													country.name || {},
													router.locale
												)}
												imageUrl={country?.image}
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
		'mexico and central america',
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
		...getRegionsAndCountriesList([
			'global/rest of the world',
			'global/rest of world'
		])
	];

	return {
		props: {
			regionsAndCountries: regionsAndCountryList || regionsAndCountries,
			// regionsAndCountries,
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
			<div className="] flex  items-center justify-between bg-white text-[15px] sm:text-[21px]">
				<div className="flex w-[160px] items-center sm:w-[300px]">
					<p className=" w-[30px] font-semibold text-cyan sm:w-[50px]">
						({leading})
					</p>

					<p className="w-[130px]  font-semibold sm:w-[190px]">
						{title}
					</p>
				</div>

				<div onClick={() => setIsOpen((prevState) => !prevState)}>
					{isOpen ? (
						<HiMinusCircle className="text-[18px] text-secondary sm:text-[20px]" />
					) : (
						<HiPlusCircle className="text-[18px] text-secondary sm:text-[20px]" />
					)}
				</div>
			</div>
			{isOpen && <div>{children}</div>}
		</div>
	);
}; // End of CountryCollapse component
