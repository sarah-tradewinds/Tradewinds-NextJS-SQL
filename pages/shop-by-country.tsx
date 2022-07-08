import {
	GetStaticProps,
	InferGetStaticPropsType,
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
import RegionAndCountriesTile from 'components/website/shop-by-country/regions-and-countries-tile';
import { getRegionsAndCountries } from 'lib/shop-by-country.lib';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

const ShopByCountryPage: NextPage<
	InferGetStaticPropsType<GetStaticProps>
> = ({ regionsAndCountries = [] }) => {
	const { t } = useTranslation('search_by_country');

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
										{countries.map((country: any) => (
											<CountryFlagTile
												key={country.id}
												title={country.name}
												imageUrl={country.url || '/flags/frame.png'}
											/>
										))}
									</div>
								</CountryCollapse>
							);
						})}
					</div>
				</div>

				{/* Island and flags */}
				<div className="mb-16 hidden md:block">
					<div className="z-[1] hidden flex-col items-center p-8 pt-[208px] md:flex md:pt-[300px] lg:pt-[440px]">
						<div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-16">
							{(regionsAndCountries?.slice(0, 4) || [])?.map(
								(regionAndCountries: any) => {
									const { countries = [] } = regionAndCountries || {};

									return (
										<RegionAndCountriesTile
											key={regionAndCountries.id}
											regionId={regionAndCountries.id}
											regionName={regionAndCountries.name}
											countries={countries || []}
										/>
									);
								}
							)}
						</div>
					</div>

					<RegionsAndCountriesList
						regionsAndCountries={regionsAndCountries || []}
					/>
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
