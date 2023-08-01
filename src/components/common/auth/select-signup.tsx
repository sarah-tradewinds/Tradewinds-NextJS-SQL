import { useState } from 'react';

// Third party packages

// components
import Button from 'components/common/form/button';
import { useAuthStore } from 'store/auth';

// stores
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useHomeStore } from 'store/home';
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
	const { t } = useTranslation('auth');
	const [selectedOption, setSelectedOption] = useState('Buyer');

	const [open, setOpen] = useState(false);
	const [closeModal, setCloseModal] = useState(false);

	const isEco = useHomeStore(({ isEco }) => isEco);

	function handleRadioChange(event: any) {
		setSelectedOption(event.target.value);
	}

	return (
		<Modal
			open={isSelectSignUpOpen}
			className=" left-1/2 top-1/2 !z-[51000] -translate-x-1/2 -translate-y-1/2 transform "
			onClose={setIsSelectSignUpOpen}
			overlayClassName="!z-[51000]"
		>
			<div className="ml-2 flex  items-center justify-center">
				<div className="flex justify-center rounded-md bg-white shadow-md  md:h-[600px] md:w-[720px]  lg:w-[920px]">
					<div className="overflow-hiden  flex h-[400px] w-[300px]  flex-col items-center border-r border-gray/40 px-[10px]  sm:mt-[50px] sm:h-[500px] sm:w-[480px] sm:border-r sm:px-[20px] md:w-[450px] lg:w-[600px] ">
						<h2 className=" mt-[30px] w-full border-b border-gray/40 text-center text-[20px] font-semibold text-gray sm:mt-[50px] sm:text-[35px]">
							{t('auth:create_an_account')}
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40 pb-[30px] not-italic sm:pb-[40px]">
							<form className="w-[300px] sm:w-[510px]">
								<div className=" mt-[30px] mb-[27px] text-left text-[13px] font-normal text-label_gray sm:mt-[41px] sm:text-center sm:text-lg  ">
									<label>{t('i_am_a...')}</label>
									<br />
									<div className="block justify-center sm:flex sm:space-x-[10px]">
										<div className="  sm:w-[150px] md:w-[150px] lg:w-full">
											<label>
												<span className=" mr-[7px]">
													<input
														className=" inline-block h-[17px] w-[17px] border align-text-top sm:h-[23px] sm:w-[23px] "
														type="radio"
														name="myRadio"
														value="Buyer"
														onChange={handleRadioChange}
														defaultChecked
													/>
												</span>
												{t('buyer')}
											</label>
										</div>
										<div className=" sm:w-[150px] md:w-[140px] lg:w-full">
											<label>
												<span className=" mr-[7px]">
													<input
														className=" inline-block h-[17px] w-[17px] align-text-top sm:h-[23px] sm:w-[23px]"
														type="radio"
														name="myRadio"
														value="Seller"
														onChange={handleRadioChange}
													/>
												</span>
												{t('seller')}
											</label>
										</div>
										<div className=" sm:w-[150px] md:w-[140px] lg:w-full">
											<label>
												<span className=" mr-[7px]">
													<input
														className=" inline-block h-[17px] w-[17px] align-text-top sm:h-[23px] sm:w-[23px]"
														type="radio"
														name="myRadio"
														value="BDM"
														onChange={handleRadioChange}
													/>
												</span>
												{t('business_agent')}
											</label>
										</div>
									</div>
								</div>
								<div className=" container mx-auto w-[220px] justify-center sm:w-[250px] md:w-[350px]">
									<Button
										variant="product"
										className="w-full"
										disabled={loading}
										// onClick={setIsSelectSignUpOpen}
										onClick={() => {
											setIsSelectSignUpOpen();
											if (selectedOption === 'Buyer') {
												setIsSignUpOpen();
											} else if (selectedOption === 'Seller') {
												window.open(
													`${process.env.SELLER_DASHBOARD_SITE_URL}/${
														isEco ? 'eco/' : ''
													}seller-registration`
												);
											} else if (selectedOption === 'BDM') {
												window.open(
													`${process.env.BDM_DASHBOARD_SITE_URL}/bdm-registration`
												);
											}
										}}
									>
										{loading ? BUTTON_SPINNER : null}{' '}
										<>{t('auth:create_my_account')}</>
									</Button>
								</div>
							</form>
						</div>
						<div className="mt-[30px] sm:mt-[55px]">
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
					{/* <div className="hidden w-full flex-col items-center justify-center sm:flex">
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
					</div> */}
					<div className="hidden flex-col justify-center sm:hidden md:flex md:w-[450px]">
						<div className="space-y-[31px]">
							<div className="relative mx-auto h-[170px]  w-[129px]">
								<ImageWithErrorHandler
									src="/TW-Create an account page-02.png"
									alt=""
									fill={true}
									className="object-contain"
								/>
							</div>

							<div className="relative mx-auto h-[123px] w-[217px]">
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
			</div>
		</Modal>
	);
};

export default SelectSignUp;
