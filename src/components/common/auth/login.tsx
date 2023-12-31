import { useState } from 'react';

// Third party packages

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
		setIsSelectSignUpOpen,
		setCustomerData
	} = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Buyer');
	console.log('selectedOption', selectedOption);
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
	const { t } = useTranslation('auth');

	const { totalCartItems, cartItems } = useCartStore((state) => ({
		cartItems: state.cartItems,
		totalCartItems: state.totalItem
	}));

	const loginUser = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!loginData.email || !loginData.password) return false;

		setLoading(true);

		try {
			const data = await userLogin({
				...loginData,
				login_as: selectedOption?.toLocaleLowerCase()
			});
			const accessToken = data?.access_token?.token || '';
			if (selectedOption === 'Seller') {
				window.open(
					generateSellerDashboardUrl({
						redirect_to: SELLER_DASHBOARD_PAGES.sellers,
						access_key: accessToken,
						refresh_key: data.refresh_token.token
					}),
					'_self'
				);
				setLoading(false);
				return;
			} else if (selectedOption === 'BDM') {
				window.open(
					generateBdmDashboardUrl({
						redirect_to: BDM_DASHBOARD_PAGES.bdms,
						access_key: accessToken,
						refresh_key: data.refresh_token.token
					}),
					'_self'
				);
				setLoading(false);
				return;
			}
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
			const redirectTo = localStorage.getItem('redirectTo');
			if (redirectTo) {
				router.replace(redirectTo);
				localStorage.removeItem('redirectTo');
			}
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
			className="!top-1/2 !left-1/2 !z-[51000] !-translate-y-1/2 !-translate-x-1/2"
			overlayClassName="!z-[51000]"
			onClose={setIsLoginOpen}
		>
			<div className="ml-2 flex items-center justify-center">
				<div className="flex h-[530px] justify-center rounded-md bg-white shadow-md sm:h-[600px] md:h-[800px] md:w-[740px] md:py-4 lg:mt-12 lg:mr-[43px] lg:h-[850px] lg:w-[1000px] lg:justify-start lg:pl-[66px] xl:w-[1204px] desktop:h-[800px]">
					<div className="flex h-[640px] w-[300px] flex-col items-center border-gray/40 py-8 sm:w-[470px] md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-[24px]">
						<h2 className="h-[67] w-full border-b border-gray/40 pb-4 text-center font-semibold text-gray md:mt-[188px] md:text-4xl lg:text-5xl">
							{t('auth:welcome_back')}
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-[7px] text-[13px] sm:text-lg">
							<form className="w-full px-4 md:w-[300px] md:px-0 lg:w-[480px]">
								<div className="mt-[41px] mb-[27px] font-normal text-label_gray  ">
									{/* <p>{t('i_am_a...')}</p> */}

									<div className="flex justify-center space-x-[15px] lg:space-x-2 xl:space-x-3">
										<label className="capitalize">
											<span className="mr-[7px]">
												<input
													className=" inline-block h-[18px] w-[18px] border align-text-top sm:h-[23px] sm:w-[23px] "
													type="radio"
													name="myRadio"
													value="Buyer"
													onChange={handleRadioChange}
													defaultChecked
												/>
											</span>
											{t('buyer')}
										</label>
										<label>
											<span className=" mr-[7px]">
												<input
													className=" inline-block h-[18px] w-[18px] border align-text-top sm:h-[23px] sm:w-[23px]"
													type="radio"
													name="myRadio"
													value="Seller"
													onChange={handleRadioChange}
												/>
											</span>
											{t('seller')}
										</label>
										<label>
											<span className=" mr-[7px]">
												<input
													className=" inline-block h-[18px] w-[18px] border align-text-top sm:h-[23px] sm:w-[23px]"
													type="radio"
													name="myRadio"
													value="BDM"
													onChange={handleRadioChange}
												/>
											</span>
											{/* {t('business_agent')} */}
											BA
										</label>
									</div>
								</div>
								<Input
									name="email"
									type="email"
									placeholder={t('auth:email')}
									icon={
										<img
											className=" mb-[13px]"
											src="/login_icon/contact-icon-one.png"
											alt="image"
										></img>
									}
									className="mb-[18px] w-full pl-[61px]"
									onChange={(e: React.FormEvent<HTMLInputElement>) =>
										onChange('email', e.currentTarget.value)
									}
								/>
								<Input
									name="password"
									type="password"
									placeholder={t('auth:password')}
									icon={
										<img
											className=" mb-[13px]"
											src="/login_icon/contact-icon-three.png"
											alt="image"
										></img>
									}
									className="mb-[22px] w-full pl-[61px]"
									onChange={(e: React.FormEvent<HTMLInputElement>) =>
										onChange('password', e.currentTarget.value)
									}
								/>

								<Button
									variant="product"
									className="w-full text-lg"
									onClick={(e: any) => {
										if (selectedOption === 'Buyer') loginUser(e);
										else if (selectedOption === 'Seller') loginUser(e);
										else if (selectedOption === 'BDM') loginUser(e);
									}}
									disabled={loading}
								>
									{loading ? BUTTON_SPINNER : null} {t('auth:signin')}
								</Button>

								<p
									className=" mt-[15px] cursor-pointer text-center text-base  text-accent-primary-main"
									onClick={() => {
										router.push('/forgot-password');
									}}
								>
									{t('auth:forgot_password')}?
								</p>
							</form>
						</div>

						<div className="mt-8">
							<p
								onClick={() => {
									setIsLoginOpen();
									setIsSelectSignUpOpen();
								}}
								className="cursor-pointer rounded-lg border-2 border-solid border-accent-primary-main px-4 py-[6px] text-center  text-base font-normal  text-accent-primary-main opacity-80 md:w-[346px]"
							>
								{t('auth:dont_have_an_account')}? Sign up!
							</p>
						</div>

						{loginResult.isDone && !loginResult.result && (
							<span
								className={`mt-[19px] flex items-center justify-center text-center text-[14px] text-[red]`}
							>
								{loginResult?.message}
							</span>
						)}
					</div>

					{/* Logos */}
					<div className="hidden w-full flex-col items-center justify-center lg:flex">
						<div className="relative h-[266px] w-[202px] lg:h-[200px] lg:w-[159px] xl:h-[266px] xl:w-[202px]">
							<ImageWithErrorHandler
								src="/TW-Create an account page-02.png"
								alt=""
								fill={true}
								className="object-contain"
							/>
						</div>

						<div className="relative mt-[20px] h-[280px] w-[495px] lg:h-[153px] lg:w-[247px] xl:h-[280px] xl:w-[495px]">
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
