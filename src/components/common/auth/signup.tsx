import { Fragment, useEffect, useState } from 'react';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Input from 'components/common/form/input';
import { useAuthStore } from 'store/auth';

// stores
import { useRouter } from 'next/router';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';
// import { userSignup } from './auth-services';
import { Combobox, Listbox, Transition } from '@headlessui/react';
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpDownIcon
} from '@heroicons/react/20/solid';
import { useGetCountries } from 'hooks/data-fetching/use-countries.hooks';
import { resendMail, userSignup } from 'lib/customer/auth.lib';
import { useTranslation } from 'next-i18next';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../elements/image-with-error-handler';

const SignUp: React.FC = () => {
	const BUTTON_SPINNER = buttonSpinner();
	const authStore = useAuthStore();
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<any>({});
	const { isSignUpOpen, setIsSignUpOpen } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const regPassword =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
	const router = useRouter();
	const { t } = useTranslation();
	const [signupResult, setSignupResult] = useState({
		message: '',
		result: false,
		signupDone: false
	});

	const mandatoryFields = [
		'first_name',
		'last_name',
		'country_id',
		'email',
		'phone_number'
	];

	const [signupData, setSignupData] = useState<any>({
		country: '',
		countryCode: '+91',
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		confirm_password: '',
		phone_number: null
	});

	useEffect(() => {
		setError({});
	}, [signupData]);

	const onChange = (field: string, value: string) => {
		// setSignupData({
		// 	...signupData,
		// 	[field]: value
		// });

		setSignupData((prevState: any) => ({
			...prevState,
			[field]: value
		}));
	};

	const validateData = () => {
		let errorFound = false;

		for (let i = 0; i < mandatoryFields.length; i++) {
			const field = mandatoryFields[i];

			if (
				field === 'phone_number' &&
				(signupData[field] === null ||
					signupData[field] === 0 ||
					signupData[field].toString().length < 10)
			) {
				error['phone_number'] = true;
				errorFound = true;
			} else {
				if (
					!signupData[field] ||
					signupData[field] === null ||
					signupData[field] === undefined
				) {
					error[field] = true;
					errorFound = true;
				}
			}
		}

		if (errorFound) setError({ ...error, hasError: true });
	};

	const validatePassword = () => {
		setError({ ...error });

		if (signupData?.password?.length < 8) {
			setError({
				...error,
				password: t(
					'auth:password_should_be_at_least_8_characters_long'
				)
			});
			return false;
		}

		if (!signupData?.confirm_password) {
			setError({
				...error,
				confirm_password: t('auth:please_enter_both_password')
			});
			return false;
		}

		if (signupData?.password !== signupData?.confirm_password) {
			setError({ ...error, password: t('auth:password_do_not_match') });
			return false;
		}

		// if (signupData?.password?.length < 8) {
		// 	setError({
		// 		...error,
		// 		password: t(
		// 			'auth:password_should_be_at_least_8_characters_long'
		// 		)
		// 	});
		// 	return false;
		// }

		if (!regPassword.test(signupData?.password)) {
			setError({
				...error,
				password: t('auth:password_policy_is_not_followed')
			});
			return false;
		}

		if (!regPassword.test(signupData?.confirm_password)) {
			setError({
				...error,
				confirm_password: t('auth:password_policy_is_not_followed')
			});
			return false;
		}

		return true;
	};

	const createUser = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		setError({});
		setSignupResult({
			message: '',
			result: false,
			signupDone: false
		});
		await validateData();

		if (!validatePassword()) return;

		console.log('error =', error);
		if ((error as any)?.hasError || Object.keys(error).length > 0) {
			setSignupResult({
				message: 'Error occurred',
				result: false,
				signupDone: false
			});
			return false;
		}

		setLoading(true);

		try {
			delete signupData.country;
			delete signupData.countryCode;
			const data = await userSignup(signupData);
			setSignupResult({
				message: 'User created',
				result: true,
				signupDone: true
			});
			setLoading(false);
		} catch (error) {
			setSignupResult({
				message: `Error: ${(error as any)?.message}`,
				result: false,
				signupDone: false
			});
			setLoading(false);
		}
	};

	return (
		<Modal
			open={isSignUpOpen}
			className="left-1/2 top-1/2 !z-[51000] mx-0 -translate-x-1/2 -translate-y-1/2 transform"
			// className="left-1/2 !z-[51000] -translate-x-1/2 transform"
			onClose={setIsSignUpOpen}
			overlayClassName="!z-[51000]"
		>
			<div className=" flex  items-center justify-center">
				{!signupResult.result ? (
					<div className="flex h-[530px] w-[290px] justify-center rounded-md bg-white pr-[15px]  pl-[15px] shadow-md sm:h-[530px] sm:w-[450px]  sm:pr-[18px] sm:pl-[18px] md:!h-[693px] md:!w-[720px]  md:!pr-[40px] md:!pl-[46px]">
						<div className="flex  h-[513px] w-full flex-col items-center overflow-auto border-gray/40 pt-[20px] pb-[10px] pr-[0px] sm:h-[530px] sm:w-full sm:pt-[23px] sm:pb-[15px] sm:pr-[0px] md:!h-[675px] md:!w-full md:!border-r  md:!pt-0 md:!pb-[20px] md:!pr-[51px]">
							<p className="hidden border-b border-gray/40 text-center font-semibold text-black sm:hidden md:!mb-[27px] md:!mt-[61px] md:!block md:!w-full md:!pb-[13px] md:!text-[25px]  md:!leading-[30px]">
								{t('auth:create_an_account')}
							</p>

							<div className="flex w-full justify-center ">
								<form className=" w-full space-y-[9px]  sm:w-[414px] md:!w-[285px]">
									<Input
										name="first_name"
										placeholder={t('auth:give_name')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className=" w-full"
										invalid={error?.first_name}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/>
									{error?.first_name && (
										<span className={`text-[12px] text-[red]`}>
											{t('auth:please_enter_first_name')}
										</span>
									)}
									<Input
										name="last_name"
										placeholder={t('auth:surname')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
										invalid={error?.last_name}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/>
									{error?.last_name && (
										<span className={`text-[12px] text-[red]`}>
											{t('auth:please_enter_last_name')}
										</span>
									)}
									{/* <Input
										name="country"
										placeholder={t('auth:country')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
										invalid={error?.country}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/> */}
									<CountryDropdown
										onSelect={(country) => {
											onChange('country_id', country?.id);
											onChange('phone_code', country?.phone_code);
										}}
									/>
									{error?.country && (
										<span className={`text-[12px] text-[red]`}>
											{t('auth:please_enter_country')}
										</span>
									)}
									<Input
										name="email"
										type="email"
										placeholder={t('auth:email')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
										invalid={error?.email}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/>
									{error?.email && (
										<span className={`text-[12px] text-[red]`}>
											{t('auth:please_enter_email')}
										</span>
									)}
									<div className="flex">
										<CountryCodeDropdown
											selectedCountryId={signupData?.country_id}
											onSelect={(country) =>
												onChange('phone_code', country?.phone_code)
											}
										/>
										<Input
											name="phone_number"
											type="number"
											placeholder={t('auth:phone_number')}
											isSmall={true}
											required={true}
											className="w-full !rounded-l-none !border-l-0 !pl-1"
											containerClassName="w-full"
											invalid={error?.phone_number}
											onChange={(
												e: React.FormEvent<HTMLInputElement>
											) =>
												onChange(
													e.currentTarget.name,
													e.currentTarget.value
												)
											}
										/>
									</div>
									{error?.phone_number && (
										<span className={`text-[12px] text-[red]`}>
											{t('auth:please_enter_phone_number')}
										</span>
									)}
									<Input
										name="password"
										type="password"
										placeholder={t('auth:password')}
										icon={<HiSparkles />}
										isSmall={true}
										className="w-full"
										invalid={error?.password}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/>
									{error?.password && (
										<span className={`text-[12px] text-[red]`}>
											{error?.password}
										</span>
									)}
									<Input
										name="confirm_password"
										type="password"
										placeholder={t('auth:verify_password')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
										invalid={error?.password}
										onChange={(
											e: React.FormEvent<HTMLInputElement>
										) => {
											setConfirmPassword(e.currentTarget.value);
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											);
										}}
									/>
									{error?.confirm_password && (
										<span className={`text-[12px] text-[red]`}>
											{error?.confirm_password}
										</span>
									)}
									<div className=" ml-[15px] text-gray sm:ml-[20px] md:!ml-[25px]">
										<div className=" mt-[7px] flex space-x-[16px] sm:mt-[7px] sm:space-x-[16px] md:!mt-[9px] md:!space-x-[18px]">
											<Input
												name="is_subscribe_to_email"
												type="checkbox"
												onChange={(e: any) =>
													onChange(
														e.currentTarget.name,
														e.currentTarget.checked
													)
												}
											/>
											<label
												htmlFor="is_subscribe_to_email"
												className="text-[12px]"
											>
												{t('auth:send_me_occasional_emails_about_twm')}
											</label>
										</div>
										<div className="mt-[7px] flex space-x-[16px] sm:mt-[7px] sm:space-x-[16px] md:!mt-[9px] md:!space-x-[18px]">
											<Input
												name="is_accept_to_terms"
												type="checkbox"
												onChange={(e: any) =>
													onChange(
														e.currentTarget.name,
														e.currentTarget.checked
													)
												}
											/>
											<label
												htmlFor="is_accept_to_terms"
												className="text-sm"
											>
												{t('auth:i_agree_to_the_terms_of_use')}
											</label>
										</div>
									</div>
									<button
										className="ml-0 h-[35px] w-full rounded-md bg-light_green text-center text-[15px] text-white sm:ml-[78px] sm:h-[31px] sm:w-[257px] sm:text-[15px] md:!ml-0 md:!h-[35px] md:!w-full md:!text-[18px]"
										disabled={loading}
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											createUser(e)
										}
									>
										{loading ? BUTTON_SPINNER : null}{' '}
										<>{t('auth:create_my_account')}</>
									</button>

									{signupResult.signupDone && !signupResult?.result && (
										<span
											className={`flex items-center justify-center text-[14px] text-[red]`}
										>
											{signupResult?.message}
										</span>
									)}

									{signupResult.signupDone && signupResult?.result && (
										<span className="flex items-center justify-center">
											{signupResult?.message}
										</span>
									)}
								</form>
							</div>
							<div>
								<button
									className="ml-0 mt-[20px] w-[260px] rounded-md bg-cyan py-2 text-center text-[12px] text-white sm:mt-[20px] sm:w-[257px] sm:text-[15px] md:!mt-[23px]  md:!w-[278px] md:!text-[12px]"
									onClick={() => {
										authStore.setIsSignUpOpen();
										authStore.setIsLoginOpen();
									}}
								>
									{t('auth:already_have_an_account_log_in')}
								</button>
							</div>
						</div>

						{/* Logos */}
						<div className="hidden w-full flex-col items-end justify-center  sm:hidden md:!flex">
							<div className="space-y-[31px]">
								<div className="relative mx-auto h-[170px]  w-[129px]">
									<ImageWithErrorHandler
										src="/TW-Create an account page-02.png"
										alt=""
										fill={true}
										className="object-contain"
									/>
								</div>

								<div className="relative h-[123px] w-[217px]">
									<ImageWithErrorHandler
										src="/TW-Create an account page-03.png"
										alt=""
										fill={true}
										className="object-contain"
									/>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="mt-16 items-center justify-center rounded-md bg-[#d1f0ff] p-8 shadow-md lg:w-[600px]">
						<h1 className="font-large mt-4 mb-2 text-center text-3xl text-primary-main">
							{t('auth:thank_you_for_registering')}
						</h1>
						<h4 className="font-small mb-4 text-center text-primary-main">
							{t('auth:you_are_almost_there_we_sent_an_email_to')}
							<br />
							<span className="font-bold">{signupData?.email}</span>
						</h4>
						<h4 className="font-small mb-4 text-center text-primary-main">
							{t(
								'auth:just_click_on_the_link_in_that_email_to_complete_your_verification'
							)}
							.
							<br />
							{t('auth:if_you_dont_see_it_you_may_need_to')}{' '}
							<b>{t('auth:check_your_spam')} </b>
							<span>{t('common:folder')}.</span>
						</h4>

						<h4 className="font-small mb-4 text-center font-bold text-primary-main">
							{t('still_cannot_find_the_email?')}
						</h4>

						<div className="mt-3 flex items-center justify-center">
							<button
								className={`rounded border border-[green] bg-[green] py-2 px-4 text-sm text-[white] hover:bg-opacity-75 focus:outline-none`}
								onClick={() => resendMail(signupData?.email)}
							>
								{t('resend_email')}
							</button>
						</div>

						<h4 className="font-small mt-8 text-center  text-primary-main">
							{t('need_help?')}{' '}
							<span className="font-bold text-[green] underline">
								<a href="#">{t('contact_us')} </a>
							</span>
						</h4>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default SignUp;

const CountryDropdown = (props: { onSelect?: (data: any) => void }) => {
	const { onSelect } = props;
	const { t } = useTranslation();
	const [selected, setSelected] = useState([]);
	const [query, setQuery] = useState('');

	const { locale } = useRouter();

	const { countries = [] } = useGetCountries();

	const getFilteredCountries = () => {
		if (!query) {
			return countries || [];
		}

		return (
			countries?.filter((country: any) =>
				getLocaleText(country.name || {}, locale)
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(query.toLowerCase().replace(/\s+/g, ''))
			) || []
		);
	}; // End of getFilteredCountries

	const filteredCountries = getFilteredCountries();

	return (
		<Combobox
			value={selected}
			onChange={(country) => {
				setSelected(country);
				onSelect?.(country);
			}}
		>
			<div className="relative mt-1">
				<div className="relative flex w-full items-center overflow-hidden rounded-md border-2 border-accent-primary-main pl-2">
					<HiSparkles className="h-5 w-5" />
					<Combobox.Input
						placeholder="Country"
						className="w-full py-1 pl-2 pr-4 outline-none focus:outline-none"
						displayValue={(country: any) =>
							getLocaleText(country.name || {}, locale)
						}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Combobox.Button className="w-10">
						<ChevronUpDownIcon
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
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredCountries.length === 0 && query ? (
							<div className="text-gray-700 relative cursor-default select-none py-2 px-4">
								{t('nothing_found')}
							</div>
						) : (
							filteredCountries.map((country: any) => (
								<Combobox.Option
									key={country.id}
									className={({ active }) =>
										`relative cursor-default select-none p-2 ${
											active ? 'font-semibold' : ''
										}`
									}
									value={country}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}
										>
											{getLocaleText(country.name || {}, locale)}
										</span>
									)}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};

const CountryCodeDropdown = (props: {
	selectedCountryId?: string;
	onSelect?: (data: any) => void;
}) => {
	const { onSelect, selectedCountryId } = props;
	const [selected, setSelected] = useState<any>({});
	const { locale } = useRouter();

	const { countries = [] } = useGetCountries();
	console.log('countriesCode', selected);

	useEffect(() => {
		if (countries?.length > 0) {
			setSelected(
				countries?.find(
					(country: any) => country?.id === selectedCountryId
				) || countries?.[0]
			);
		}
	}, [countries, selectedCountryId]);

	return (
		<Listbox
			value={selected}
			onChange={(country) => {
				setSelected(country);
				onSelect?.(country);
			}}
		>
			<div className="relative">
				<Listbox.Button className="relative flex h-full w-14 items-center rounded-l-md border border-r-0 border-accent-primary-main">
					<span className="block truncate pl-1">
						{getLocaleText(selected?.iso2 || '', locale)}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
						<ChevronDownIcon
							className="h-5 w-5 text-gray"
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>

				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{countries?.map((country: any) => (
							<Listbox.Option
								key={country?.id}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active
											? 'bg-amber-100 text-amber-900'
											: 'text-gray-900'
									}`
								}
								value={country}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}
										>
											{getLocaleText(country?.name || {}, locale)}
										</span>
										{selected ? (
											<span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3">
												<CheckIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}; // End of CountryCodeDropdown
