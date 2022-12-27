import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { LocalesType } from 'types/common.types';
import { getLocaleText } from 'utils/get_locale_text';

const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' }
];

interface CountrySearchDropdownProps {
	countries: {
		id: string;
		name: LocalesType;
		slug: LocalesType;
	}[];
}

const CountrySearchDropdown: React.FC<CountrySearchDropdownProps> = (
	props
) => {
	const { countries = [] } = props;

	const [selected, setSelected] = useState(countries[0]);
	const [query, setQuery] = useState('');

	const router = useRouter();

	const filteredCountries =
		query === ''
			? countries
			: countries.filter((country) => {
					const { en, es, fr, pt, ru } = country.name;

					const matchName = (name: string) => {
						return name
							.toLowerCase()
							.replace(/\s+/g, '')
							.includes(query.toLowerCase().replace(/\s+/g, ''));
					};

					return (
						matchName(en || '') ||
						matchName(es || '') ||
						matchName(fr || '') ||
						matchName(pt || '') ||
						matchName(ru || '')
					);
			  });

	return (
		<div className="w-">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<div className="">
						<Combobox.Input
							className="text-gray-900 h-9 w-[84px] border-2 border-gray/20 py-2 pl-3 pr-10 font-semibold outline-none lg:w-[202px]"
							displayValue={(country) =>
								getLocaleText(
									(country as any).name || '',
									router.locale
								)
							}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDownIcon
								className="text-gray-400 h-5 w-5"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-[280px] overflow-auto rounded-md bg-white py-1 shadow-lg outline-none ring-1 ring-black ring-opacity-5">
							{filteredCountries.length === 0 && query !== '' ? (
								<div className="text-gray-700 relative cursor-default select-none py-2 px-4">
									Nothing found.
								</div>
							) : (
								filteredCountries.map((country) => (
									<Combobox.Option
										key={country.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? 'bg-primary-main text-white'
													: 'text-gray'
											}`
										}
										value={country}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{getLocaleText(
														country.name || '',
														router.locale
													)}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-teal-600'
														}`}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}; // End of CountrySearchDropdown

export default CountrySearchDropdown;
