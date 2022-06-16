import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import CountryFlagTile from 'components/website/common/search-by-country/country-flag-tile';
import LocationHolder from 'components/website/common/search-by-country/location-holder';
import Seo from 'components/website/common/seo';

const SearchByCountryPage: NextPage = (props) => {
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

			<div className="relative md:bg-white">
				{/* Headers */}
				<div className="absolute inset-0">
					<div className="relative h-[580px] md:h-[800px] lg:h-[1200px]">
						<Image
							src="/static/images/search-by-country-images/search-by-country-header.png"
							alt=""
							layout="fill"
							className="object-cover"
						/>
						<h1 className="absolute inset-0 top-16 text-center text-[35px] font-semibold text-white md:top-24 md:text-[40px] lg:top-16 lg:text-[96px]">
							{t('search_by_country')}
						</h1>
					</div>
				</div>

				{/* Island and flags */}
				<div className="z-[1] flex flex-col items-center p-8 pt-[208px] md:pt-[300px] lg:pt-[440px]">
					<div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-16">
						<div className="flex flex-col items-center space-y-12">
							<LocationHolder
								title={t('north_america')}
								imageUrl="/static/images/search-by-country-images/north-america.png"
							/>
							{flagBlock1}
						</div>
						<div className="flex flex-col items-center space-y-12">
							<LocationHolder
								title={t('the_caribbean')}
								imageUrl="/static/images/search-by-country-images/the-caribbean.png"
							/>
							{flagBlock2}
						</div>
						<div className="flex flex-col items-center space-y-12">
							<LocationHolder
								title={t('mexico_and_central_america')}
								imageUrl="/static/images/search-by-country-images/mexico-and-central-america.png"
							/>
							{flagBlock3}
						</div>
						<div className="flex flex-col items-center space-y-12">
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default SearchByCountryPage;
