import { useState } from 'react';

// Third party packages

// components
import Button from 'components/common/form/button';
import { useAuthStore } from 'store/auth';

// stores
import { useRouter } from 'next/router';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';
// import { userSignup } from './auth-services';
import { useTranslation } from 'next-i18next';
import ImageWithErrorHandler from '../elements/image-with-error-handler';

const SelectSignUp: React.FC = () => {
	const BUTTON_SPINNER = buttonSpinner();
	const authStore = useAuthStore();
	const [error, setError] = useState<any>({});
	const { isSelectSignUpOpen, setIsSelectSignUpOpen } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const { isSignUpOpen, setIsSignUpOpen } = useAuthStore();
	const router = useRouter();
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = useState('');
	// const [signUp, setSignUp] = useState(false);

	const [open, setOpen] = useState(false);
	const [closeModal, setCloseModal] = useState(false);
	function handleRadioChange(event: any) {
		setSelectedOption(event.target.value);
	}
	// console.log('Selectsignup', signUp);
	// useEffect(() => {
	// 	setOpen(false);
	// }, [open]);
	return (
		<Modal
			open={isSelectSignUpOpen}
			className="top-14 !z-[51000] mx-4 transform md:top-40 md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			onClose={setIsSelectSignUpOpen}
			overlayClassName="!z-[51000]"
		>
			<div className="ml-2 flex  items-center justify-center">
				<div className="flex justify-center rounded-md bg-white shadow-md md:mt-12 md:w-[740px] md:py-4 lg:h-[905px] lg:w-[1204px] lg:justify-start lg:px-16">
					<div className="overflow-hiden flex h-[640px] flex-col items-center border-gray/40 py-8 md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-24">
						<h2 className=" mb-8 mt-[220px] h-[67] w-[471px] border-b border-gray/40 pb-4 text-center font-semibold text-black md:text-4xl lg:text-5xl">
							{t('auth:create_an_account')}
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-[71px]">
							<form className="space-y-4 px-8 lg:w-[360px] lg:px-0">
								<div className=" mt-[47px] mb-[41px] space-x-5 text-center text-lg">
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
								<Button
									variant="product"
									className=" w-full"
									disabled={loading}
									onClick={() => {
										if (selectedOption === 'Buyer') {
											setIsSignUpOpen();
										} else if (selectedOption === 'Seller') {
											window.open(
												'https://www.tradewindsqa.com/#/seller-registration'
											);
										} else if (selectedOption === 'BDM') {
											window.open(
												'https://www.tradewindsqa.com/#/bdm-registration'
											);
										}
									}}
									// onClick={setIsSignUpOpen}
								>
									{loading ? BUTTON_SPINNER : null}{' '}
									<>{t('auth:create_my_account')}</>
								</Button>

								{/* {
									open && selectedOption === 'Buyer' && setIsSignUpOpen
									// setSignUp(!signUp)
								}
								{open &&
									selectedOption === 'Seller' &&
									window.open(
										'https://www.tradewindsqa.com/#/seller-registration'
									)}
								{open &&
									selectedOption === 'BDM' &&
									window.open(
										'https://www.tradewindsqa.com/#/bdm-registration'
									)} */}
							</form>
						</div>
						<div className=" mt-[55px]">
							<Button
								className=" rounded-lg border border-accent-primary-main !text-accent-primary-main"
								onClick={() => {
									authStore.setIsSignUpOpen();
									authStore.setIsLoginOpen();
								}}
							>
								{t('auth:already_have_an_account_log_in')}
							</Button>
							<p
								className="mt-[24px] cursor-pointer text-center text-sm text-accent-primary-main underline"
								// onClick={() => {
								// 	// setIsLoginOpen();
								// 	router.push('/forgot-password');
								// }}
							>
								{t('auth:forgot_password')}?
							</p>
						</div>
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

export default SelectSignUp;
