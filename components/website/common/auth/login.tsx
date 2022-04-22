import Image from 'next/image';

// Third party packages
import { HiSparkles } from 'react-icons/hi';

// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';

// stores
import { useAuthStore } from 'store/auth';
import { Modal } from '../modal/modal';

const Login: React.FC = () => {
	const { isLoginOpen, setIsLoginOpen } = useAuthStore();

	return (
		<Modal
			open={isLoginOpen}
			className="left-8 top-1/2 -translate-y-1/2 transform  lg:left-1/2 lg:-top-10 lg:-translate-x-1/2 lg:-translate-y-0"
			onClose={setIsLoginOpen}
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
									name="email"
									type="email"
									placeholder="Email"
									icon={<HiSparkles />}
									className="w-full"
								/>
								<Input
									name="password"
									type="password"
									placeholder="Password"
									icon={<HiSparkles />}
									className="w-full"
								/>

								<Button variant="product" className="w-full">
									Create My Account
								</Button>
								<p className="mt-8 text-center text-sm text-accent-primary-main">
									Forgot Password?
								</p>
							</form>
						</div>
						<div>
							<p className="mt-8 text-center text-lg font-semibold opacity-80">
								Dont Have an Account?
							</p>
							<Button className="mt-2 border border-accent-secondary-main text-accent-secondary-main hover:bg-accent-secondary-main hover:text-white">
								Become A Member Today
							</Button>
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

export default Login;
