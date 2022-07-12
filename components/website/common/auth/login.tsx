import Image from 'next/image';
import { useState } from 'react';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';

// stores
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';

// libs
import {
	getCustomerDetails,
	userLogin
} from '../../../../lib/customer/auth.lib';

interface ILoginData {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const BUTTON_SPINNER = buttonSpinner();
	const {
		isLoginOpen,
		setIsLoginOpen,
		setIsSignUpOpen,
		setCustomerData
	} = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [loginData, setLoginData] = useState<ILoginData>({
		email: '',
		password: ''
	});
	const [loginResult, setLoginResult] = useState({
		isDone: false,
		message: '',
		result: false
	});
	const router = useRouter();

	const loginUser = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!loginData.email || !loginData.password) return false;

		setLoading(true);

		try {
			const data = await userLogin(loginData);
			const customerDetails = await getCustomerDetails(
				data.access_token.token
			);
			setCustomerData({
				id: customerDetails.id,
				name: customerDetails.name,
				access: {
					token: data.access_token.token,
					expireIn: ''
				},
				refresh: {
					token: data.refresh_token.token,
					expireIn: ''
				}
			});

			setLoading(false);
			setIsLoginOpen();
		} catch (error) {
			setLoginResult({
				isDone: true,
				message: (error as any)?.message,
				result: false
			});
			setLoading(false);
		}
	};

	const onChange = (field: string, value: string) => {
		setLoginData({ ...loginData, [field]: value });
	};

	return (
		<Modal
			open={isLoginOpen}
			className="top-0 mx-4 transform md:top-1/2 md:left-1/2 md:mx-0 md:-translate-y-1/2 md:-translate-x-1/2 lg:-top-10 lg:-translate-y-0"
			onClose={setIsLoginOpen}
		>
			<div className="flex items-center justify-center">
				<div className="mt-16 flex w-full justify-center rounded-md bg-white p-8 shadow-md md:w-[740px] lg:w-[1000px] lg:justify-start lg:p-16">
					<div className="flex flex-col items-center border-gray/40 lg:border-r lg:pr-24">
						<h2 className="mb-8 border-b border-gray/40  pb-4 text-2xl font-semibold text-black md:text-3xl">
							Login to your account
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-8">
							<form className="w-full space-y-4 md:w-[360px]">
								<Input
									name="email"
									type="email"
									placeholder="Email"
									icon={<HiSparkles />}
									className="w-full"
									onChange={(e: React.FormEvent<HTMLInputElement>) =>
										onChange('email', e.currentTarget.value)
									}
								/>
								<Input
									name="password"
									type="password"
									placeholder="Password"
									icon={<HiSparkles />}
									className="w-full"
									onChange={(e: React.FormEvent<HTMLInputElement>) =>
										onChange('password', e.currentTarget.value)
									}
								/>

								<Button
									variant="product"
									className="w-full"
									onClick={(e: any) => loginUser(e)}
									disabled={loading}
								>
									{loading ? BUTTON_SPINNER : null} Login
								</Button>
								<p
									className="mt-8 cursor-pointer text-center text-sm text-accent-primary-main underline"
									onClick={() => {
										// setIsLoginOpen();
										router.push('/forgot-password');
									}}
								>
									Forgot Password?
								</p>
							</form>
						</div>
						<div>
							<p className="mt-8 text-center text-lg font-semibold opacity-80">
								Dont Have an Account?
							</p>
							<Button
								className="mt-2 border border-accent-secondary-main text-accent-secondary-main hover:bg-accent-secondary-main hover:text-white"
								onClick={() => {
									setIsSignUpOpen();
									setIsLoginOpen();
								}}
							>
								Become A Member Today
							</Button>
						</div>

						{loginResult.isDone && !loginResult.result && (
							<span
								className={`mt-3 flex items-center justify-center text-center text-[14px] text-[red]`}
							>
								{loginResult?.message}
							</span>
						)}
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
			</div>
		</Modal>
	);
};

export default Login;
