import CountryFlagTile from 'components/website/common/search-by-country/country-flag-tile';
import LocationHolder from 'components/website/common/search-by-country/location-holder';
import { NextPage } from 'next';
import Image from 'next/image';

const SearchByCountryPage: NextPage = (props) => {
	const flagBlock1 = (
		<div className="space-y-8">
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/usa.png"
				title="United States of America"
			/>
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/canada.png"
				title="Canada "
			/>
		</div>
	);
	const flagBlock2 = (
		<div className="space-y-8">
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/dominica-republic.png"
				title="Dominica Republic"
			/>
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/trinidad-and-tobago.png"
				title="Trinidad and Tobago"
			/>
			<p className="hidden text-center text-[20px] font-semibold text-accent-primary-main lg:block">
				More Coming Soon!
			</p>
		</div>
	);
	const flagBlock3 = (
		<div className="space-y-8">
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/costa-rica.png"
				title="Costa Rica"
			/>
			<CountryFlagTile
				imageUrl="/static/images/search-by-country-images/flags/mexico.png"
				title="Mexico"
			/>
			<p className="hidden text-center text-[20px] font-semibold text-accent-primary-main lg:block">
				More Coming Soon!
			</p>
		</div>
	);
	const flagBlock4 = (
		<div className="space-y-8">
			<div className="grid gap-8 lg:grid-cols-2">
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/argentina.png"
					title="Argentina"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/bolivia.png"
					title="Bolivia"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/brazil.png"
					title="Brazil"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/chile.png"
					title="Chile"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/colombia.png"
					title="Colombia"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/paraguay.png"
					title="Paraguay"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/peru.png"
					title="Peru"
				/>
				<CountryFlagTile
					imageUrl="/static/images/search-by-country-images/flags/uruguay.png"
					title="Uruguay"
				/>
			</div>
			<p className="hidden text-center text-[20px] font-semibold text-accent-primary-main lg:block">
				More Coming Soon!
			</p>
		</div>
	);

	return (
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
						Search By Country
					</h1>
				</div>
			</div>

			{/* Island and flags */}
			<div className="z-[1] flex flex-col items-center p-8 pt-[208px] md:pt-[300px] lg:pt-[440px]">
				<div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-16">
					<div className="flex flex-col items-center space-y-12">
						<LocationHolder
							title="North America"
							imageUrl="/static/images/search-by-country-images/north-america.png"
						/>
						{flagBlock1}
					</div>
					<div className="flex flex-col items-center space-y-12">
						<LocationHolder
							title="The Caribbean"
							imageUrl="/static/images/search-by-country-images/the-caribbean.png"
						/>
						{flagBlock2}
					</div>
					<div className="flex flex-col items-center space-y-12">
						<LocationHolder
							title="Mexico and Central America"
							imageUrl="/static/images/search-by-country-images/mexico-and-central-america.png"
						/>
						{flagBlock3}
					</div>
					<div className="flex flex-col items-center space-y-12">
						<LocationHolder
							title="South America"
							imageUrl="/static/images/search-by-country-images/south-america.png"
						/>
						{flagBlock4}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchByCountryPage;
