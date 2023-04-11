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
import { useCartStore } from 'store/cart-store';
import ImageWithErrorHandler from '../elements/image-with-error-handler';

import {
	BDM_DASHBOARD_PAGES,
	SELLER_DASHBOARD_PAGES,
	generateBdmDashboardUrl,
	generateSellerDashboardUrl
} from 'data/buyer/buyer-actions';

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
	const [selectedOption, setSelectedOption] = useState('');
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

	const cartProducts = useCartStore((state) => state.cartProducts);

	const loginUser = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!loginData.email || !loginData.password) return false;

		setLoading(true);

		try {
			const data = await userLogin(loginData);
			const accessToken = data?.access_token?.token || '';
			if (selectedOption === 'Seller') {
				window.open(
					generateSellerDashboardUrl({
						redirect_to: SELLER_DASHBOARD_PAGES.sellers,
						access_key: accessToken,
						refresh_key: data.refresh_token.token
					})
				);
				setLoading(false);
				return;
			} else if (selectedOption === 'BDM') {
				window.open(
					generateBdmDashboardUrl({
						redirect_to: BDM_DASHBOARD_PAGES.bdms,
						access_key: accessToken,
						refresh_key: data.refresh_token.token
					})
				);
				setLoading(false);
				return;
			}
			if (typeof window !== 'undefined') {
				localStorage.setItem('access_token', accessToken);
			}

			const customerDetails = await getCustomerDetails(accessToken);

			if (cartProducts.length) {
				await updateCart(
					cartProducts.map((cartProduct) => ({
						product_variant_id: cartProduct.product?.id,
						quantity: cartProduct.quantity
					}))
				);
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

	function handleRadioChange(event: any) {
		setSelectedOption(event.target.value);
	}
	return (
		<Modal
			open={isLoginOpen}
			// className="top-10 mx-4 transform md:top-40 md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			className="top-14 !z-[51000] mx-4 transform md:top-40 md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			overlayClassName="!z-[51000]"
			onClose={setIsLoginOpen}
		>
			<div className="ml-2 flex  items-center justify-center">
				<div className="flex justify-center rounded-md bg-white shadow-md md:mt-12 md:w-[740px] md:py-4 lg:h-[905px] lg:w-[1204px] lg:justify-start lg:px-16">
					<div className="overflow-hiden flex h-[640px] flex-col items-center border-gray/40 py-8 md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-24">
						<h2 className=" mb-8 mt-[220px] h-[67] w-[471px] border-b border-gray/40 pb-4 text-center font-semibold text-black md:text-4xl lg:text-5xl">
							{t('auth:welcome_back')}
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-8">
							<form className="w-full space-y-4 md:w-[360px]">
								<div className=" mt-[41px] mb-[27px] space-x-5 text-center text-lg">
									<label>I am a...</label>
									<label>
										<input
											type="radio"
											name="myRadio"
											value="Buyer"
											onChange={handleRadioChange}
										/>
										Buyer
									</label>
									<label>
										<input
											type="radio"
											name="myRadio"
											value="Seller"
											onChange={handleRadioChange}
										/>
										Seller
									</label>
									<label>
										<input
											type="radio"
											name="myRadio"
											value="BDM"
											onChange={handleRadioChange}
										/>
										BDM
									</label>
								</div>
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
									onClick={(e: any) => {
										if (selectedOption === 'Buyer') loginUser(e);
										else if (selectedOption === 'Seller') loginUser(e);
										else if (selectedOption === 'BDM') loginUser(e);
									}}
									disabled={loading}
								>
									{loading ? BUTTON_SPINNER : null} {t('auth:signin')}
								</Button>

								{/* <Button
									variant="product"
									className="w-full"
									onClick={(e: any) => loginUser(e)}
									disabled={loading}
								>
									{loading ? BUTTON_SPINNER : null} {t('auth:signin')}
								</Button> */}
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
