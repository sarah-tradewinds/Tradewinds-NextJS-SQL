import { useState } from 'react';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Button from 'components/common/form/button';
import Input from 'components/common/form/input';

// stores
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';

// libs
import { updateCart } from 'lib/cart.lib';
import { getCustomerDetails, userLogin } from 'lib/customer/auth.lib';
import { useTranslation } from 'next-i18next';
import { useCartStore } from 'store/cart-store-v2';
import ImageWithErrorHandler from '../elements/image-with-error-handler';

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
	const { t } = useTranslation();

	const { totalCartItems, cartItems } = useCartStore((state) => ({
		cartItems: state.cartItems,
		totalCartItems: state.totalItem
	}));

	const loginUser = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!loginData.email || !loginData.password) return false;

		setLoading(true);

		try {
			const data = await userLogin(loginData);
			const accessToken = data?.access_token?.token || '';
			if (typeof window !== 'undefined') {
				localStorage.setItem('access_token', accessToken);
			}

			const customerDetails = await getCustomerDetails(accessToken);

			if (totalCartItems) {
				await updateCart(cartItems);
			}

			const customerData = {
				userId: customerDetails.userId,
				buyerId: customerDetails.buyerId,
				name: customerDetails.name,
				phone: customerDetails.phone,
				email: customerDetails.email,
				tradewinds_email: customerDetails?.tradewinds_email,
				access: {
					token: accessToken,
					expireIn: ''
				},
				refresh: {
					token: data.refresh_token.token,
					expireIn: ''
				}
			};

			localStorage.setItem(
				'customerData',
				JSON.stringify(customerData)
			);

			setCustomerData(customerData);

			setLoading(false);
			setIsLoginOpen();
		} catch (error) {
			console.log('[loginUser] error =', error);
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
			// className="top-10 mx-4 transform md:top-40 md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			className="top-14 !z-[51000] mx-4 transform md:top-40 md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			overlayClassName="!z-[51000]"
			onClose={setIsLoginOpen}
		>
			<div className="flex items-center justify-center">
				<div className="mt-16 flex w-full justify-center rounded-md bg-white p-8 shadow-md md:w-[740px] lg:w-[1000px] lg:justify-start lg:p-16">
					<div className="flex flex-col items-center border-gray/40 lg:border-r lg:pr-24">
						<h2 className="mb-8 border-b border-gray/40  pb-4 text-2xl font-semibold text-black md:text-3xl">
							{t('auth:login_to_your_account')}
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-8">
							<form className="w-full space-y-4 md:w-[360px]">
								<Input
									name="email"
									type="email"
									placeholder={t('auth:email')}
									icon={<HiSparkles />}
									className="w-full"
									onChange={(e: React.FormEvent<HTMLInputElement>) =>
										onChange('email', e.currentTarget.value)
									}
								/>
								<Input
									name="password"
									type="password"
									placeholder={t('auth:password')}
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
									{loading ? BUTTON_SPINNER : null} {t('auth:login')}
								</Button>
								<p
									className="mt-8 cursor-pointer text-center text-sm text-accent-primary-main underline"
									onClick={() => {
										// setIsLoginOpen();
										router.push('/forgot-password');
									}}
								>
									{t('auth:forgot_password')}?
								</p>
							</form>
						</div>
						<div>
							<p className="mt-8 text-center text-lg font-semibold opacity-80">
								{t('auth:dont_have_an_account')}
							</p>
							<Button
								className="mt-2 border border-accent-secondary-main text-accent-secondary-main hover:bg-accent-secondary-main hover:text-white"
								onClick={() => {
									setIsSignUpOpen();
									setIsLoginOpen();
								}}
							>
								{t('auth:become_a_member_today')}
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
							<ImageWithErrorHandler
								src="/TW-Create an account page-02.png"
								alt=""
								fill={true}
								className="object-contain"
							/>
						</div>

						<div className="relative h-[260px] w-[260px]">
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
		</Modal>
	);
};

export default Login;
