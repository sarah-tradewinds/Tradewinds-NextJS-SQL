import { useEffect, useState } from 'react';

import Image from 'next/image';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Button from 'components/common/form/button';
import Input from 'components/common/form/input';
import { useAuthStore } from 'store/auth';

// stores
import { useRouter } from 'next/router';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';
// import { userSignup } from './auth-services';
import { userSignup } from 'lib/customer/auth.lib';
import { useTranslation } from 'next-i18next';

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
		'country',
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
		setSignupData({
			...signupData,
			[field]: field === 'phone_number' ? Number(value || 0) : value
		});
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

		if ((error as any)?.hasError || Object.keys(error).length > 0) {
			return false;
		}

		setLoading(true);

		try {
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
				signupDone: true
			});
			setLoading(false);
		}
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
		setError({
			...error,
			password: ''
		});

		if (!(signupData?.password && signupData?.confirm_password)) {
			if (!signupData?.password)
				setError({
					...error,
					password: t('auth:please_enter_both_password')
				});
			if (!signupData?.confirm_password)
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
		if (signupData?.password?.length < 8) {
			setError({
				...error,
				password: t(
					'auth:password_should_be_at_least_8_characters_long'
				)
			});
			return false;
		}

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

	return (
		<Modal
			open={isSignUpOpen}
			className="top-4 transform md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 lg:-top-10 lg:-translate-y-0"
			onClose={setIsSignUpOpen}
		>
			<div className="ml-2 flex  items-center justify-center">
				{!signupResult.result ? (
					<div className="flex justify-center rounded-md bg-white shadow-md md:mt-12 md:w-[740px] md:py-4 lg:w-[1000px] lg:justify-start lg:px-16">
						<div className="flex h-[640px] flex-col items-center overflow-auto border-gray/40 py-8 md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-24">
							<h2 className="mb-8 border-b border-gray/40 pb-4 text-3xl font-semibold text-black md:text-4xl">
								{t('auth:create_an_account')}
							</h2>

							<div className="flex w-full justify-center border-b border-gray/40 pb-4">
								<form className="space-y-4 px-8 lg:w-[360px] lg:px-0">
									<Input
										name="first_name"
										placeholder={t('auth:give_name')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
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
									<Input
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
									<Input
										name="phone_number"
										type="number"
										placeholder={t('auth:phone_number')}
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
										invalid={error?.phone_number}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/>
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
									<div className="mx-2  text-gray">
										<div className="flex space-x-2">
											<Input
												name="isSubscribeToEmail"
												type="checkbox"
												onChange={(e: any) =>
													onChange(
														e.currentTarget.name,
														e.currentTarget.checked
													)
												}
											/>
											<label
												htmlFor="isSubscribeToEmail"
												className="text-sm"
											>
												{t('auth:send_me_occasional_emails_about_twm')}
											</label>
										</div>
										<div className="flex space-x-2">
											<Input
												name="isAcceptToTerms"
												type="checkbox"
												onChange={(e: any) =>
													onChange(
														e.currentTarget.name,
														e.currentTarget.checked
													)
												}
											/>
											<label
												htmlFor="isAcceptToTerms"
												className="text-sm"
											>
												{t('auth:i_agree_to_the_terms_of_use')}
											</label>
										</div>
									</div>
									<Button
										variant="product"
										className="w-full"
										disabled={loading}
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											createUser(e)
										}
									>
										{loading ? BUTTON_SPINNER : null}{' '}
										<>{t('auth:create_my_account')}</>
									</Button>

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
								<Button
									className="mt-4 rounded-lg border border-accent-primary-main !text-accent-primary-main"
									onClick={() => {
										authStore.setIsSignUpOpen();
										authStore.setIsLoginOpen();
									}}
								>
									{t('auth:already_have_an_account_log_in')}
								</Button>
							</div>
						</div>

						{/* Logos */}
						<div className="hidden w-full flex-col items-center justify-center lg:flex">
							<div className="relative h-[260px] w-[260px]">
								<Image
									src="/TW-Create an account page-02.png"
									alt=""
									fill={true}
									className="object-contain"
								/>
							</div>

							<div className="relative h-[260px] w-[260px]">
								<Image
									src="/TW-Create an account page-03.png"
									alt=""
									fill={true}
									className="object-contain"
								/>
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
							<b>{t('auth:check_your_spam')}</b>
							{t('common:folder')}.
						</h4>

						<h4 className="font-small mb-4 text-center font-bold text-primary-main">
							Still cannot find the email?
						</h4>

						<form>
							<div className="mt-3 flex items-center justify-center">
								<button
									className={`rounded border border-[green] bg-[green] py-2 px-4 text-sm text-[white] hover:bg-opacity-75 focus:outline-none`}
									// onClick={openLogin}
								>
									Resend Email
								</button>
							</div>
						</form>

						<h4 className="font-small mt-8 text-center  text-primary-main">
							Need help?{' '}
							<span className="font-bold text-[green] underline">
								<a href="#">Contact US</a>
							</span>
						</h4>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default SignUp;
