import Image from 'next/image';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';

// stores
import { useAuthStore } from 'store/auth';
import { Modal } from '../modal/modal';

const SignUp: React.FC = () => {
	const { isSignUpOpen, setIsSignUpOpen } = useAuthStore();

	const signUpHandler = () => {};

	return (
		<Modal
			open={isSignUpOpen}
			className="left-8 top-1/2 -translate-y-1/2 transform  lg:left-1/2 lg:-top-10 lg:-translate-x-1/2 lg:-translate-y-0"
			onClose={setIsSignUpOpen}
		>
			<div className="flex items-center justify-center ">
				<div className="mt-16 flex w-screen justify-center rounded-md bg-white p-8 shadow-md lg:w-[1000px] lg:justify-start lg:p-16">
					<div className="flex flex-col items-center border-gray/40 pr-24 lg:border-r">
						<h2 className="mb-8 border-b border-gray/40 pb-4 text-4xl font-semibold text-black">
							Create an Account
						</h2>

						<div className="flex w-full justify-center border-b border-gray/40  pb-8">
							<form className="w-[360px] space-y-4">
								<Input
									name="first_name"
									placeholder="Give Name"
									icon={<HiSparkles />}
									required={true}
									className="w-full"
								/>
								<Input
									name="last_name"
									placeholder="Surname"
									icon={<HiSparkles />}
									required={true}
									className="w-full"
								/>
								<Input
									name="country"
									placeholder="Country"
									icon={<HiSparkles />}
									required={true}
									className="w-full"
								/>
								<Input
									name="email"
									type="email"
									placeholder="Email"
									icon={<HiSparkles />}
									required={true}
									className="w-full"
								/>
								<Input
									name="password"
									type="password"
									placeholder="Password"
									icon={<HiSparkles />}
									className="w-full"
								/>
								<Input
									name="confirm_password"
									type="password"
									placeholder="Verify Password"
									icon={<HiSparkles />}
									required={true}
									className="w-full"
								/>

								<div className="mx-4 space-y-4 text-gray">
									<div className="flex space-x-2">
										<Input name="newsletter" type="checkbox" />
										<label htmlFor="newsletter" className="text-sm">
											Send me occasional emails about Tradewinds
											Marketplace
										</label>
									</div>
									<div className="flex space-x-2">
										<Input name="terms_of_use" type="checkbox" />
										<label htmlFor="terms_of_use" className="text-sm">
											I agree to the Terms of Use
										</label>
									</div>
								</div>

								<Button variant="product" className="w-full">
									Create My Account
								</Button>
							</form>
						</div>
						<div>
							<Button className="mt-8 rounded-lg border border-accent-primary-main text-accent-primary-main">
								Already have an account? Log in
							</Button>
							<p className="mt-8 text-center text-sm text-accent-primary-main">
								Forgot Password?
							</p>
						</div>
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

export default SignUp;
