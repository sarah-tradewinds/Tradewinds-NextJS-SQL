import Image from 'next/image';

// data
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import { countries } from 'data/home';

const CountrySearchFilter: React.FC = (props) => {
	return (
		<div>
			<div className="flex">
				<Input className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto" />
				<Button
					variant="buyer"
					className="rounded-none rounded-r-md px-2"
				>
					Go
				</Button>
			</div>

			<div className="mt-4 space-y-2">
				{countries.map((country) => {
					return (
						<div key={country.name} className="flex items-center">
							<Input type="checkbox" />
							<div className="ml-8 flex items-center space-x-4">
								<Image
									src={country.imageUrl}
									alt=""
									width={23}
									height={16}
								/>
								<span>{country.name}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CountrySearchFilter;
