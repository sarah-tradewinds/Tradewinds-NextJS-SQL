import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { buttonSpinner } from '../components/website/common/spinners/custom-spinners';

// https://tradewinds-dev-public.s3.us-east-2.amazonaws.com/index.html#/verify?verify_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYXkuc3NzaGFybWFAZ21haWwuY29tIiwiZXhwIjoxNjUxNTg0MDc1fQ.sj29JceE-8t6KRRu2oLPB_2ENJTO0SQnxB8PqEEyIks

const Verify = () => {
	const BUTTON_SPINNER = buttonSpinner();
	const authStore = useAuthStore();
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
		if (token) {
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			};

			fetch(
				`https://tradewinds-dev.eastus.cloudapp.azure.com/api/v1/verify_account?verify_token=${token}`,
				requestOptions
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.message === 'Account verified, log in')
						setVerifyStatus({
							message: '',
							result: true,
							isDone: true
						});
					else
						setVerifyStatus({
							message: data.error,
							result: false,
							isDone: true
						});
					// setLoading(false);
				});
		}
	}, [token]);

	const openLogin = (e: any) => {
		e.preventDefault();
		authStore.setIsLoginOpen();
		router.push('/');
	};

	return (
		<>
			<div className="flex h-screen bg-primary-main">
				{/* Invalid request without token */}
				{!token && (
					<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-1">
						<h1 className="font-large mt-4 mb-2 text-center  text-[red]">
							It seems like the url is invalid, please make sure you
							click on the link received in the email to verify your
							account. Please retry
						</h1>
					</div>
				)}

				{/* We have token */}
				{token ? (
					verifyStatus.isDone && !verifyStatus.result ? (
						<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-1">
							<h1 className="font-large text-1xl mt-4 mb-2 text-center text-[red]">
								It seems like the token is expired or you are using the
								invalid link to verify your account.
							</h1>
							<h4 className="font-small mb-4 text-center text-[red]">
								Please retry
							</h4>
						</div>
					) : token && verifyStatus.isDone && verifyStatus.result ? (
						<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-1">
							<h1 className="font-large mt-4 mb-2 text-center text-3xl text-primary-main">
								Thank you for registering
							</h1>
							<h4 className="font-small mb-4 text-center text-primary-main">
								Please login to your account
							</h4>

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
						<div className="border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-[#c7ecff] py-10 px-16">
							<h1 className="mt-4 mb-12 text-center font-medium text-primary-main">
								Verifying your account, please wait
							</h1>

							<form>
								<div className="mt-6 flex items-center justify-center">
									{BUTTON_SPINNER}
								</div>
							</form>
						</div>
					)
				) : null}
			</div>
		</>
	);
};

export default Verify;
