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

	function handleRadioChange(event: any) {
		setSelectedOption(event.target.value);
	}
	return (
		<Modal
			open={isLoginOpen}
			className="top-14  !z-[51000] transform md:top-40  md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			overlayClassName="!z-[51000]"
			onClose={setIsLoginOpen}
		>
			<div className="ml-2 flex  items-center justify-center">
				<div className="flex justify-center rounded-md bg-white shadow-md md:mt-12 md:w-[740px] md:py-4 lg:mr-[43px] lg:h-[905px] lg:w-[1204px] lg:justify-start lg:pl-[66px]">
					{/* <div className="flex h-[640px] flex-col items-center border-gray/40 py-8 md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-[24px]"> */}
					<div className="flex h-[640px] w-[300px] flex-col items-center border-gray/40 py-8 md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-[24px]">
						<h2 className="h-[67] w-full border-b border-gray/40 pb-4 text-center font-semibold text-gray md:mt-[188px] md:text-4xl lg:text-5xl">
							{t('auth:welcome_back')}
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-[7px] text-lg">
							<form className="w-full px-4 md:w-[346px] md:px-0">
								<div className="mt-[41px] mb-[27px] space-x-[10px] text-center font-normal text-label_gray">
									<label>I am a...</label>
									<label>
										<span className=" mr-[7px]">
											<input
												className=" inline-block h-[23px] w-[23px] border align-text-top "
												type="radio"
												name="myRadio"
												value="Buyer"
												onChange={handleRadioChange}
												defaultChecked
											/>
										</span>
										Buyer
									</label>
									<label>
										<span className=" mr-[7px]">
											<input
												className=" inline-block h-[23px] w-[23px] align-text-top"
												type="radio"
												name="myRadio"
												value="Seller"
												onChange={handleRadioChange}
											/>
										</span>
										Seller
									</label>

									<label>
										<span className=" mr-[7px]">
											<input
												className=" inline-block h-[23px] w-[23px] align-text-top"
												type="radio"
												name="myRadio"
												value="BDM"
												onChange={handleRadioChange}
											/>
										</span>
										BDM
									</label>
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

								{/* <Button
									variant="product"
									className="w-full"
									onClick={(e: any) => loginUser(e)}
									disabled={loading}
								>
									{loading ? BUTTON_SPINNER : null} {t('auth:signin')}
								</Button> */}
								<p
									className=" mt-[15px] cursor-pointer text-center text-base  text-accent-primary-main"
									onClick={() => {
										// setIsLoginOpen();
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
								{t('auth:dont_have_an_account')}
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
						<div>
							<p className=" text-sm text-label_gray">
								TW Create an account page-02 1
							</p>
						</div>
						<div className="relative h-[266px] w-[202px]">
							<ImageWithErrorHandler
								src="/TW-Create an account page-02.png"
								alt=""
								fill={true}
								className="object-contain"
							/>
						</div>

						<div className="relative mt-[20px] h-[280px] w-[495px]">
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
