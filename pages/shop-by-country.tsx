import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import Image from 'next/image';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import CountryFlagTile from 'components/website/common/search-by-country/country-flag-tile';
import Seo from 'components/website/common/seo';
import RegionsAndCountriesList from 'components/website/shop-by-country/regions-and-countries-list';
import { getRegionsAndCountries } from 'lib/shop-by-country.lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { getLocaleText } from 'utils/get_locale_text';

const ShopByCountryPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ regionsAndCountries = [] }) => {
	const { t } = useTranslation('search_by_country');

	const removeCategoryFilter = useCategoryStore(
		(state) => state.removeCategoryFilter
	);

	const setSelectedCountry = useCountriesStore(
		(state) => state.setSelectedCountry
	);

	const router = useRouter();

	const countryClickHandler = (
		countryId: string,
		countryName: string
	) => {
		removeCategoryFilter();
		setSelectedCountry(countryId, countryName);
		router.push('/product-search');
	}; // End of countryClickHandler

	return (
		<>
			<Seo title="Search by country page" description="" />

			<div className="relative mb-[2080px] bg-white md:m-auto ">
				{/* Headers */}
				<div className="h-[200px] md:absolute md:inset-0">
					<div className="relative h-[480px] md:h-[800px] lg:h-[1200px]">
						<Image
							src="/static/images/search-by-country-images/search-by-country-header.png"
							alt=""
							layout="fill"
							className="object-cover"
						/>
					</div>
					<h1 className="absolute inset-0 top-16 text-center text-[35px] font-semibold text-white md:top-24 md:text-[40px] lg:top-16 lg:text-[96px]">
						{t('search_by_country')}
					</h1>
				</div>

				{/* for small device */}
				<div className="absolute top-[140px] left-1/2 w-5/6 -translate-x-1/2 transform rounded-t-[40px] bg-white  pt-8 md:hidden">
					<div className="space-y-2 px-4">
						{regionsAndCountries.map((regionAndCountries: any) => {
							const { countries = [] } = regionAndCountries || {};
							return (
								<CountryCollapse
									key={regionAndCountries.id}
									leading={countries?.length}
									title={regionAndCountries.name}
								>
									<div className="space-y-2 bg-white py-2 pl-16">
										{countries.map((country: any) => {
											const countryName = getLocaleText(
												country.name || {},
												router.locale
											);
											return (
												<CountryFlagTile
													key={country.id}
													title={countryName}
													imageUrl={country.url || '/flags/frame.png'}
													onClick={() =>
														countryClickHandler(country.id, countryName)
													}
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
				<div className="mb-[2800px] hidden md:block">
					<div className="absolute top-[440px] left-1/2 w-[95%] -translate-x-1/2 transform">
						<div className="grid grid-cols-4 gap-y-24">
							<RegionsAndCountriesList
								regionsAndCountries={regionsAndCountries || []}
								onCountryClick={(country) =>
									countryClickHandler(country.id, country.name)
								}
							/>
						</div>
					</div>

					<div className="grid grid-cols-4">
						{/* <RegionsAndCountriesList
							regionsAndCountries={regionsAndCountries?.slice(5) || []}
							className="mt-32 flex flex-col items-center space-y-6"
						/> */}
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

	return {
		props: {
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
