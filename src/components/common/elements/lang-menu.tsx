import { Menu, Transition } from '@headlessui/react';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const supportedLocales = [
	{
		code: 'en',
		name: 'english'
	},
	{
		code: 'es',
		name: 'spanish'
	},
	{
		code: 'fr',
		name: 'french'
	},
	{
		code: 'pt',
		name: 'portuguese'
	},
	{
		code: 'bn',
		name: 'bengali'
	}
];

const LanguageDropdown: React.FC = () => {
	const { push, pathname, query, asPath, locale } = useRouter();
	const { t } = useTranslation('common');

	const localeHandler = (locale: string) => {
		i18n?.changeLanguage(locale);
		push({ pathname, query }, asPath, {
			locale
		});
	}; // End of localeHandler

	let selectedLocale = supportedLocales.find(
		(supportLocale) => supportLocale.code === locale
	);
	if (!selectedLocale) {
		selectedLocale = supportedLocales[0];
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="flex items-center space-x-1 font-semibold text-gray md:text-[10.8px] md:font-normal md:leading-[13.17px] lg:text-[14.14px] lg:leading-[17.57px]">
					<span className="capitalize">{t(selectedLocale.name)}</span>
					<span className="uppercase">{t(selectedLocale.code)}</span>
					<span className="hidden md:inline">&gt;</span>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="divide-gray-100 absolutes fixed z-[4] mt-2 origin-top-right divide-y rounded-md bg-white px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-1">
					<div className="px-1">
						{supportedLocales.map(({ code, name }) => {
							return (
								<Menu.Item key={code}>
									<button
										onClick={() => localeHandler(code)}
										className={`my-2 block text-sm capitalize ${
											locale === code
												? 'font-semibold text-primary-main'
												: ''
										}`}
									>
										{name}
									</button>
								</Menu.Item>
							);
						})}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default LanguageDropdown;
