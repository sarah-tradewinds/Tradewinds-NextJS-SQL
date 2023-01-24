import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { LocalesType } from 'types/common.types';
import { getLocaleText } from 'utils/get_locale_text';

export interface ICountry {
	id: string;
	name: LocalesType;
	slug: LocalesType;
}

interface CountrySearchDropdownProps {
	countries: ICountry[];
	defaultValue?: ICountry;
	inputClassName?: string;
	buttonClassName?: string;
	inputAndButtonContainerClassName?: string;
	optionsContainerClassName?: string;
	onCountryChange?: (id?: string, name?: string) => void;
}

const CountrySearchDropdown: React.FC<CountrySearchDropdownProps> = (
	props
) => {
	const {
		countries = [],
		defaultValue,
		inputClassName,
		buttonClassName,
		inputAndButtonContainerClassName,
		optionsContainerClassName,
		onCountryChange
	} = props;

	const [selected, setSelected] = useState<ICountry | undefined>(
		defaultValue
	);

	const [query, setQuery] = useState('');

	const router = useRouter();

	useEffect(() => {
		setSelected(defaultValue);
	}, [defaultValue]);

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
		<div>
			<Combobox
				value={selected}
				onChange={(value: ICountry) =>
					setSelected((prevState) => {
						const updatedValue =
							prevState?.id !== value.id ? value : undefined;
						onCountryChange?.(updatedValue?.id, updatedValue?.name?.en);
						return updatedValue;
					})
				}
			>
				<div className="relative mt-1">
					<div className={inputAndButtonContainerClassName}>
						<Combobox.Input
							className={`h-full w-full text-center text-[10px] font-semibold leading-[22px] text-gray outline-none lg:!text-[15px] lg:!leading-[41px] ${inputClassName}`}
							displayValue={(country) =>
								getLocaleText(
									(country as any)?.name || '',
									router.locale
								) || 'Select'
							}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className={buttonClassName}>
							<ChevronDownIcon
								className="h-5 w-5 text-[#E1DDDD]"
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
						<Combobox.Options
							className={`absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg outline-none ring-1 ring-black ring-opacity-5 ${optionsContainerClassName}`}
						>
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
