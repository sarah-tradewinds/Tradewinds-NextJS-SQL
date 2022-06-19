import { Menu, Transition } from '@headlessui/react';
import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const supportedLocales = [
	{
		code: 'en',
		name: 'English'
	},
	{
		code: 'es',
		name: 'Spanish'
	},
	{
		code: 'fr',
		name: 'French'
	},
	{
		code: 'pt',
		name: 'Portuguese'
	}
];

export default function LanguageDropdown() {
	const { push, pathname, query, asPath, locale } = useRouter();

	const localeHandler = (locale: string) => {
		i18n?.changeLanguage(locale);
		push({ pathname, query }, asPath, {
			locale
		});
	}; // End of localeHandler

	return (
		<div className="fixed top-[86px]">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="flex items-center space-x-1 font-semibold">
						<span>{locale}</span>
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
					<Menu.Items className="divide-gray-100 absolute right-0 z-[4] origin-top-right divide-y rounded-md bg-white px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							{supportedLocales.map(({ code, name }) => {
								console.log('locale', locale, code);
								return (
									<Menu.Item key={code}>
										<button
											onClick={() => localeHandler(code)}
											className={`text-sm ${
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
		</div>
	);
}

function EditInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 13V16H7L16 7L13 4L4 13Z"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
		</svg>
	);
}

function EditActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 13V16H7L16 7L13 4L4 13Z"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
		</svg>
	);
}

function DuplicateInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 4H12V12H4V4Z"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<path
				d="M8 8H16V16H8V8Z"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
		</svg>
	);
}

function DuplicateActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 4H12V12H4V4Z"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<path
				d="M8 8H16V16H8V8Z"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
		</svg>
	);
}

function ArchiveInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="8"
				width="10"
				height="8"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<rect
				x="4"
				y="4"
				width="12"
				height="4"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function ArchiveActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="8"
				width="10"
				height="8"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<rect
				x="4"
				y="4"
				width="12"
				height="4"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function MoveInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function MoveActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}

function DeleteInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="6"
				width="10"
				height="10"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function DeleteActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="6"
				width="10"
				height="10"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}
