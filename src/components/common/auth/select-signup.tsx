import { useState } from 'react';

// Third party packages

// components
import Button from 'components/common/form/button';
import { useAuthStore } from 'store/auth';

// stores
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ImageWithErrorHandler from '../elements/image-with-error-handler';
import { Modal } from '../modal/modal';
import { buttonSpinner } from '../spinners/custom-spinners';

const SelectSignUp: React.FC = () => {
	const BUTTON_SPINNER = buttonSpinner();
	const authStore = useAuthStore();
	const [error, setError] = useState<any>({});
	const { isSelectSignUpOpen, setIsSelectSignUpOpen } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const { isSignUpOpen, setIsSignUpOpen } = useAuthStore();
	const router = useRouter();
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = useState('Buyer');

	const [open, setOpen] = useState(false);
	const [closeModal, setCloseModal] = useState(false);
	function handleRadioChange(event: any) {
		setSelectedOption(event.target.value);
	}

	return (
		<Modal
			open={isSelectSignUpOpen}
			className="top-14 !z-[51000] mx-4 transform md:top-40 md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			onClose={setIsSelectSignUpOpen}
			overlayClassName="!z-[51000]"
		>
			<div className="ml-2 flex  items-center justify-center">
				<div className="flex justify-center rounded-md bg-white shadow-md md:mt-12 md:w-[740px] md:py-4 lg:mr-[43px] lg:h-[905px] lg:w-[1204px] lg:justify-start lg:pl-[66px]">
					<div className="overflow-hiden flex h-[640px] flex-col items-center border-gray/40 py-8 md:h-auto lg:w-full lg:border-r lg:py-0 lg:pr-[24px]">
						<h2 className="  mt-[220px] h-[61px] w-[511px] border-b border-gray/40 pb-4 text-center font-semibold text-gray md:text-4xl lg:text-5xl">
							{t('auth:create_an_account')}
						</h2>

						<div className="flex w-[511px] justify-center border-b border-gray/40 pb-[71px] not-italic">
							<form className=" px-8 lg:w-[346px] lg:px-0">
								<div className=" mt-[41px] mb-[27px] space-x-[10px] text-center text-lg font-normal text-label_gray  ">
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
								>
									{loading ? BUTTON_SPINNER : null}{' '}
									<>{t('auth:create_my_account')}</>
								</Button>
							</form>
						</div>
						<div className=" mt-[55px]">
							<Button
								className=" rounded-lg border border-accent-primary-main !text-accent-primary-main"
								onClick={() => {
									authStore.setIsSelectSignUpOpen();
									authStore.setIsLoginOpen();
								}}
							>
								{t('auth:already_have_an_account_log_in')}
							</Button>
							<p
								className="mt-[24px] cursor-pointer text-center text-sm text-accent-primary-main "
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

export default SelectSignUp;
