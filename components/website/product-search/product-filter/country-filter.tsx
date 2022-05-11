import Image from 'next/image';

// data
import { Combobox, Transition } from '@headlessui/react';
import Input from 'components/website/common/form/input';
import { countries } from 'data/home';
import React, { useState } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';

const CountrySearchFilter: React.FC = (props) => {
	const [selectedCountry, setSelectedCountry] = useState('');
	const [query, setQuery] = useState('');

	return (
		<div>
			<Combobox
				value={selectedCountry}
				onChange={(country) => setSelectedCountry(country)}
			>
				<div className="focus-visible:ring-offset-teal-300 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
					<Combobox.Input
						onChange={(event) =>
							console.log('event.target.value =', event.target.value)
						}
						className="h-[40px] w-full rounded-md border-2 border-accent-primary-main py-2  pl-3 pr-8 outline-none"
					/>

					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
						<HiOutlineSelector className="text-gray-400 h-5 w-5" />
					</Combobox.Button>
				</div>

				<Transition
					as={React.Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => setQuery('')}
				>
					<Combobox.Options className="mt-4 space-y-2 rounded-b-md border border-gray/10 p-2 shadow-lg">
						{countries.map((country) => (
							<Combobox.Option
								key={country.name}
								value={country.name}
								className="cursor-pointer"
							>
								<div className="flex items-center">
									<Input
										type="checkbox"
										checked={selectedCountry === country.name}
									/>
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
							</Combobox.Option>
						))}
					</Combobox.Options>
				</Transition>
			</Combobox>
		</div>
	);
};

export default CountrySearchFilter;
