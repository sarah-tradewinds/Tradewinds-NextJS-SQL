import { useEffect, useState } from 'react';

import Image from 'next/image';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import { useAuthStore } from 'store/auth';

// stores
import { useRouter } from 'next/router';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';
import { userSignup } from './auth-services';

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
		'phoneNumber'
	];

	const [signupData, setSignupData] = useState<any>({
		country: '',
		countryCode: '+91',
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		confirm_password: '',
		phoneNumber: null,
		roles: ['buyer']
	});

	useEffect(() => {
		setError({});
	}, [signupData]);

	const onChange = (field: string, value: string) => {
		setSignupData({
			...signupData,
			[field]: field === 'phoneNumber' ? Number(value || 0) : value
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

		await userSignup(signupData)
			.then((res) => {
				// console.log('data response', res);
				if (res.status === 200)
					setSignupResult({
						message: 'User created',
						result: true,
						signupDone: true
					});
				else
					setSignupResult({
						message: res.message,
						result: false,
						signupDone: true
					});
				setLoading(false);
			})
			.catch((err) => {
				console.log('signup error', err);
				setSignupResult({
					message: `Error: ${err.message}`,
					result: false,
					signupDone: true
				});
				setLoading(false);
			});
	};

	const validateData = () => {
		let errorFound = false;

		for (let i = 0; i < mandatoryFields.length; i++) {
			const field = mandatoryFields[i];

			if (
				field === 'phoneNumber' &&
				(signupData[field] === null ||
					signupData[field] === 0 ||
					signupData[field].toString().length < 10)
			) {
				error['phoneNumber'] = true;
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
				setError({ ...error, password: 'Please enter both password' });
			if (!signupData?.confirm_password)
				setError({
					...error,
					confirm_password: 'Please enter both password'
				});
			return false;
		}
		if (signupData?.password !== signupData?.confirm_password) {
			setError({ ...error, password: 'Password do not match' });
			return false;
		}
		if (signupData?.password?.length < 8) {
			setError({
				...error,
				password: 'Password should be at least 8 characters long'
			});
			return false;
		}

		if (!regPassword.test(signupData?.password)) {
			setError({
				...error,
				password: 'Password policy is not followed'
			});

			return false;
		}

		if (!regPassword.test(signupData?.confirm_password)) {
			setError({
				...error,
				confirm_password: 'Password policy is not followed'
			});

			return false;
		}

		return true;
	};

	return (
		<Modal
			open={isSignUpOpen}
			className="left-8 top-1/2 -translate-y-1/2 transform lg:left-1/2 lg:-top-10 lg:-translate-x-1/2 lg:-translate-y-0"
			onClose={setIsSignUpOpen}
		>
			<div className="flex items-center justify-center ">
				{!signupResult.result ? (
					<div className="mt-12 flex w-screen justify-center rounded-md bg-white py-4 shadow-md lg:w-[1000px] lg:justify-start lg:px-16">
						<div className="flex flex-col items-center border-gray/40 pr-24 lg:border-r">
							<h2 className="mb-8 border-b border-gray/40 pb-4 text-4xl font-semibold text-black">
								Create an Account
							</h2>

							<div className="flex w-full justify-center border-b border-gray/40 pb-4">
								<form className="w-[360px] space-y-4">
									<Input
										name="first_name"
										placeholder="Give Name"
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
											Please enter firstname
										</span>
									)}
									<Input
										name="last_name"
										placeholder="Surname"
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
											Please enter lastName
										</span>
									)}
									<Input
										name="country"
										placeholder="Country"
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
											Please enter country
										</span>
									)}
									<Input
										name="email"
										type="email"
										placeholder="Email"
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
											Please enter email
										</span>
									)}
									<Input
										name="phoneNumber"
										type="number"
										placeholder="Phone number"
										icon={<HiSparkles />}
										isSmall={true}
										required={true}
										className="w-full"
										invalid={error?.phoneNumber}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											onChange(
												e.currentTarget.name,
												e.currentTarget.value
											)
										}
									/>
									{error?.phoneNumber && (
										<span className={`text-[12px] text-[red]`}>
											Please enter phone number
										</span>
									)}
									<Input
										name="password"
										type="password"
										placeholder="Password"
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
										placeholder="Verify Password"
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
												Send me occasional emails about TWM
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
												I agree to the Terms of Use
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
										<>Create My Account</>
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
									className="mt-4 rounded-lg border border-accent-primary-main text-accent-primary-main"
									onClick={() => {
										authStore.setIsSignUpOpen();
										authStore.setIsLoginOpen();
									}}
								>
									Already have an account? Log in
								</Button>
								{/* <p
									className="mt-8 cursor-pointer text-center text-sm text-accent-primary-main underline"
									onClick={() => {
										authStore.setIsSignUpOpen();
										router.push('/forgot-password');
									}}
								>
									Forgot Password?
								</p> */}
							</div>
						</div>

						{/* Logos */}
						<div className="hidden w-full flex-col items-center justify-center lg:flex">
							<div className="relative h-[260px] w-[260px]">
								<Image
									src="/TW-Create an account page-02.png"
									alt=""
									layout="fill"
									className="object-contain"
								/>
							</div>

							<div className="relative h-[260px] w-[260px]">
								<Image
									src="/TW-Create an account page-03.png"
									alt=""
									layout="fill"
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="mt-16 items-center justify-center rounded-md bg-[#d1f0ff] p-8 shadow-md lg:w-[600px]">
						<h1 className="font-large mt-4 mb-2 text-center text-3xl text-primary-main">
							Thank you for registering
						</h1>
						<h4 className="font-small mb-4 text-center text-primary-main">
							You are almost there! We sent an email to
							<br />
							<span className="font-bold">{signupData?.email}</span>
						</h4>
						<h4 className="font-small mb-4 text-center text-primary-main">
							Just click on the link in that email to complete your
							verification.
							<br />
							If you dont see it, you may need to <b>check your spam</b>
							folder.
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
