import Input from 'components/website/common/form/input';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';

import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
// https://tradewinds-dev-public.s3.us-east-2.amazonaws.com/index.html#/verify?verify_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYXkuc3NzaGFybWFAZ21haWwuY29tIiwiZXhwIjoxNjUxNTg0MDc1fQ.sj29JceE-8t6KRRu2oLPB_2ENJTO0SQnxB8PqEEyIks

const ForgotPassword = () => {
	const authStore = useAuthStore();
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState({
		isDone: false,
		isForgotEmailSent: false,
		result: false,
		message: ''
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [token, setToken] = useState<string>('');
	const [verifyStatus, setVerifyStatus] = useState({
		isDone: false,
		result: false,
		message: ''
	});

	useEffect(() => {
		setToken(router?.query?.verify_token as string);
	}, [router.query]);

	useEffect(() => {
		return;
		// if (token) {
		// 	const requestOptions = {
		// 		method: 'GET',
		// 		headers: { 'Content-Type': 'application/json' }
		// 	};

		// 	fetch(
		// 		`https://tradewinds-dev.eastus.cloudapp.azure.com/api/v1/verify_account?verify_token=${token}`,
		// 		requestOptions
		// 	)
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			if (data.message === 'Account verified, log in')
		// 				setVerifyStatus({
		// 					message: '',
		// 					result: true,
		// 					isDone: true
		// 				});
		// 			else
		// 				setVerifyStatus({
		// 					message: data.error,
		// 					result: false,
		// 					isDone: true
		// 				});
		// 			// setLoading(false);
		// 		});
		// }
	}, [token]);

	const isValidEmail = () => {
		return email ? true : false;
	};

	const openLogin = (e: any) => {
		e.preventDefault();
		authStore.setIsLoginOpen();
		router.push('/');
	};

	const submitChangePassword = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setStatus({ ...status, isDone: true, result: false });
		}, 2000);
	};

	const submitPasswordResetRequest = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setStatus({ ...status, isForgotEmailSent: true });
		}, 2000);
	};

	return (
		<>
			<div className="flex h-screen bg-primary-main">
				{/* Invalid request without token */}
				{!token && !status.isForgotEmailSent && (
					<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-4">
						<h1 className="mt-4 mb-4 text-center text-3xl font-bold">
							Forgot password
						</h1>

						<h1 className="mt-5 mb-2 font-bold">
							Please enter the registered email address
						</h1>

						<Input
							name="email"
							type="email"
							placeholder="Email*"
							icon={<AiOutlineMail />}
							className="w-full"
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								setEmail(e.currentTarget.value)
							}
						/>

						<button
							className="mt-3 rounded border border-[green] bg-[green] py-2 px-4 text-sm hover:bg-opacity-75 focus:outline-none disabled:opacity-60 "
							disabled={(isValidEmail() ? false : true) || loading}
							onClick={submitPasswordResetRequest}
							type="button"
						>
							{loading && (
								<svg
									role="status"
									className="mr-3 inline h-6 w-6 animate-spin text-[blue]"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="#E5E7EB"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"
									/>
								</svg>
							)}
							Submit
						</button>

						<hr className="mt-3 text-[#868686]" />

						<div className="mt-4 mb-2 text-sm">
							<span className="font-bold">Not a Buyer yet?</span>
							<span
								className="ml-1 cursor-pointer underline"
								onClick={() => {
									authStore.setIsSignUpOpen();
									router.push('/');
								}}
							>
								Create your account now!
							</span>
						</div>
					</div>
				)}

				{!token && status.isForgotEmailSent && (
					<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-5">
						<h1 className="font-large text-1xl mt-4 mb-2 ">
							An email has been sent to the email address provided (
							{email}). Please check your email and follow the
							instructions to reset your password.
						</h1>

						<hr className="mt-3 text-[#868686]" />

						<div className="mt-4 mb-2">
							<span
								className="ml-1 cursor-pointer underline"
								onClick={() => {
									authStore.setIsLoginOpen();
									router.push('/');
								}}
							>
								Login to your account
							</span>
						</div>
					</div>
				)}

				{/* We have token */}
				{token ? (
					status.isDone && !status.result ? (
						<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-5">
							<h1 className="font-large text-1xl mt-4 mb-2 text-[red]">
								The request seems to be invalid, either the request has
								been expired or the link is not correct. Please open the
								reset password link from the email you received.
								<br />
								<br />
								Please retry try Forgot Password to regenerate the code
								and if the problem still persists, please contact
								support.
							</h1>
							<hr className="mt-3 text-[#868686]" />
							<div className="mt-4 mb-2">
								<span
									className="ml-1 cursor-pointer underline"
									onClick={() => {
										authStore.setIsLoginOpen();
										router.push('/');
									}}
								>
									Forgot your password?
								</span>
							</div>
						</div>
					) : token && status.isDone && status.result ? (
						<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-5">
							<h1 className="font-large mt-4 mb-2 text-center text-primary-main">
								Your password has been changed successfully. Please
								login to your account
							</h1>

							<hr className="mt-3 text-[#868686]" />

							<form>
								<div className="mt-3 flex items-center justify-center">
									<button
										className={`rounded border border-[green] bg-[green] py-2 px-4 text-sm hover:bg-opacity-75 focus:outline-none`}
										onClick={openLogin}
									>
										Login
									</button>
								</div>
							</form>
						</div>
					) : (
						<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-5">
							<h1 className="mt-5 mb-2 font-bold">
								Please enter the new password
							</h1>

							<Input
								name="email"
								type="password"
								placeholder="Enter new password*"
								icon={<RiLockPasswordLine />}
								className="w-full"
								onChange={(e: React.FormEvent<HTMLInputElement>) =>
									setEmail(e.currentTarget.value)
								}
							/>

							<Input
								name="email"
								type="password"
								placeholder="Enter confirm password*"
								icon={<RiLockPasswordLine />}
								className="mt-2 w-full"
								onChange={(e: React.FormEvent<HTMLInputElement>) =>
									setEmail(e.currentTarget.value)
								}
							/>
							<span className="text-[11px]">
								Your password must be 8-20 characters long and should
								contain at least one special character, one uppercase
								letter and one number.
							</span>

							<button
								className="mt-3 rounded border border-[green] bg-[green] py-2 px-4 text-sm hover:bg-opacity-75 focus:outline-none disabled:opacity-60 "
								disabled={(isValidEmail() ? false : true) || loading}
								onClick={submitChangePassword}
								type="button"
							>
								{loading && (
									<svg
										role="status"
										className="mr-3 inline h-6 w-6 animate-spin text-[blue]"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#E5E7EB"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentColor"
										/>
									</svg>
								)}
								Submit
							</button>
						</div>
					)
				) : null}
			</div>
		</>
	);
};

export default ForgotPassword;
