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
import LocationHolder from 'components/website/common/search-by-country/location-holder';
import Seo from 'components/website/common/seo';
import { countries } from 'data/home';
import { getRegionsAndCountries } from 'lib/shop-by-country.lib';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

const ShopByCountryPage: NextPage<
	InferGetStaticPropsType<GetStaticProps>
> = ({ regionsAndCountries = [] }) => {
	const { t } = useTranslation('search_by_country');

	const flagBlock1 = (
		<div className="space-y-8">
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/usa.png"
				title={t('united_states_of_america')}
			/>
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/canada.png"
				title={t('canada')}
			/>
		</div>
	);
	const flagBlock2 = (
		<div className="space-y-8">
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/dominica-republic.png"
				title={t('dominica_republic')}
			/>
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/trinidad-and-tobago.png"
				title={t('trinidad_and_tobago')}
			/>
			<p className="hidden text-center text-[20px] font-semibold text-accent-primary-main lg:block">
				{t('more_coming_soon')}
			</p>
		</div>
	);
	const flagBlock3 = (
		<div className="space-y-8">
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/costa-rica.png"
				title={t('costa_rica')}
			/>
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/mexico.png"
				title={t('mexico')}
			/>
			<p className="hidden text-center text-[20px] font-semibold text-accent-primary-main lg:block">
				{t('more_coming_soon')}
			</p>
		</div>
	);
	const flagBlock4 = (
		<div className="space-y-8">
			<div className="grid gap-8 lg:grid-cols-2">
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/argentina.png"
					title={t('argentina')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/bolivia.png"
					title={t('bolivia')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/brazil.png"
					title={t('brazil')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/chile.png"
					title={t('chile')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/colombia.png"
					title={t('colombia')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/paraguay.png"
					title={t('paraguay')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/peru.png"
					title={t('peru')}
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/uruguay.png"
					title={t('uruguay')}
				/>
			</div>
			<p className="hidden text-center text-[20px] font-semibold text-accent-primary-main lg:block">
				{t('more_coming_soon')}
			</p>
		</div>
	);

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
						{countries.map((country) => {
							return (
								<CountryCollapse key={country.name}>
									<div className="space-y-2 bg-white py-2 pl-16">
										<CountryFlagTile
											title={country.name}
											imageUrl={country.imageUrl}
										/>
										<CountryFlagTile
											title="Canada"
											imageUrl="/flags/frame.png"
										/>
									</div>
								</CountryCollapse>
							);
						})}
					</div>
				</div>

				{/* Island and flags */}
				<div className="z-[1] hidden flex-col items-center p-8 pt-[208px] md:flex md:pt-[300px] lg:pt-[440px]">
					<div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-16">
						<div className="flex flex-col items-center space-y-6">
							<LocationHolder
								title={t('north_america')}
								imageUrl="/static/images/search-by-country-images/north-america.png"
							/>
							{flagBlock1}

							<HiPlusCircle className="text-[32px] text-secondary" />
						</div>
						<div className="flex flex-col items-center space-y-6">
							<LocationHolder
								title={t('the_caribbean')}
								imageUrl="/static/images/search-by-country-images/the-caribbean.png"
							/>
							{flagBlock2}
						</div>
						<div className="flex flex-col items-center space-y-6">
							<LocationHolder
								title={t('mexico_and_central_america')}
								imageUrl="/static/images/search-by-country-images/mexico-and-central-america.png"
							/>
							{flagBlock3}
						</div>
						<div className="flex flex-col items-center space-y-6">
							<LocationHolder
								title={t('south_america')}
								imageUrl="/static/images/search-by-country-images/south-america.png"
							/>
							{flagBlock4}
						</div>
					</div>
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
	isOpen?: boolean;
	onClose?: () => any;
}> = ({ children, onClose }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className="flex items-center justify-between bg-white px-2">
				<p className="text-[16px] font-semibold text-cyan">(2)</p>
				<p className=" text-[16px] font-semibold">North America</p>

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
