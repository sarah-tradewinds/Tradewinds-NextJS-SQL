import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';

function ecoSignUp() {
	return (
		<div className=' mx-auto h-[866px] w-[321px]  bg-header-bar md:h-[810px] md:w-[744px] md:bg-header-bar  lg:h-[800px] lg:w-[1512px] lg:bg-[url("/static/images/bg-Eco-Sign-Up.png")] lg:pt-[21px]'>
			<div className=' h-[477px] w-full bg-[url("/static/images/mobile-bg-Eco-Sign-Up.png")] pt-[56px] md:h-[361px] md:bg-[url("/static/images/bg-Eco-Sign-Up.png")] md:pt-[34px]'>
				<div className="relative mx-auto h-[150px] w-[244px] md:h-[145px] md:w-[237px] lg:h-[205.76px] lg:w-[334.65px]  ">
					<ImageWithErrorHandler
						src="/static/images/tradewinds-eco-log.png"
						alt="rfq box"
						fill={true}
					/>
				</div>
				{/* Desktop and tablet */}
				<div className=" mt-[12px] hidden text-center text-[15px] font-semibold text-dark_brown md:block md:text-[21px] md:leading-[25px] lg:block lg:text-[24px] lg:leading-[29px]">
					<p>
						Sale beyond your horizons. Connect with buyers worldwide.
					</p>
					<p className=" md:mt-[52px]  lg:mt-[34px]">
						Start Selling on{' '}
						<span className=" font-medium">Tradewind</span>
						seco
					</p>
				</div>

				<div className=" mt-[106px] hidden text-[15px] md:mt-[96px] md:block lg:mt-[26px] lg:block">
					<form className=" space-y-[23px] text-center">
						<div className=" space-x-[24px]  ">
							<input
								name="first_name"
								placeholder={'First Name'}
								required={true}
								className=" h-[30px] w-[315px] rounded-[5px] pl-[10px] "
							/>
							<input
								name="last_name"
								placeholder={'Last Name'}
								required={true}
								className="h-[30px] w-[319px] rounded-[5px] pl-[10px] "
							/>
						</div>
						<input
							name="last_name"
							placeholder={'Select Country'}
							required={true}
							className="h-[30px] w-[658px] rounded-[5px] pl-[10px]"
						/>
						<div className=" space-x-[26px]">
							<input
								name="last_name"
								placeholder={'Country Code'}
								required={true}
								className="h-[30px] w-[259px] rounded-[5px] pl-[10px]"
							/>
							<input
								name="last_name"
								placeholder={'Phone Number'}
								required={true}
								className="h-[30px] w-[373px] rounded-[5px] pl-[10px]"
							/>
						</div>
						<input
							name="last_name"
							placeholder={'Email'}
							required={true}
							className="h-[30px] w-[658px] rounded-[5px] pl-[10px]"
						/>
						<br />
						<input
							name="last_name"
							placeholder={'Password'}
							required={true}
							className="h-[30px] w-[658px] rounded-[5px] pl-[10px]"
						/>
						<br />
						<input
							name="last_name"
							placeholder={'Verify Password'}
							required={true}
							className="h-[30px] w-[658px] rounded-[5px] pl-[10px]"
						/>
						<br />
						<Button className=" h-[32px] w-[209px] rounded-[5px] bg-primary-eco text-[18px] ">
							Submit
						</Button>
					</form>
				</div>

				{/* Mobile */}
				<div className=" mt-[12px] text-center font-semibold text-dark_brown  md:hidden lg:hidden ">
					<p className=" text-[15px]">
						Sale beyond your horizons.
						<br /> Connect with buyers worldwide.
					</p>
					<p className=" mt-[52px] text-[24px] leading-[29px]">
						Start Selling on{' '}
						<span className=" font-medium">Tradewind</span>
						eco
					</p>
				</div>
				<div className=" lg:hiden mt-[116px] text-[14px] md:hidden">
					<form className="  space-y-[12px] text-center">
						<input
							name="first_name"
							placeholder={'First Name'}
							required={true}
							className=" h-[30px] w-[304px] rounded-[5px] pl-[10px] "
						/>
						<input
							name="last_name"
							placeholder={'Last Name'}
							required={true}
							className="h-[30px] w-[304px] rounded-[5px] pl-[10px] "
						/>

						<input
							name="last_name"
							placeholder={'Select Country'}
							required={true}
							className="h-[30px] w-[304px] rounded-[5px] pl-[10px]"
						/>
						<div className=" space-x-[9px]">
							<input
								name="last_name"
								placeholder={'Country Code'}
								required={true}
								className="h-[30px] w-[112px] rounded-[5px] pl-[10px]"
							/>
							<input
								name="last_name"
								placeholder={'Phone Number'}
								required={true}
								className="h-[30px] w-[183px] rounded-[5px] pl-[10px]"
							/>
						</div>
						<input
							name="last_name"
							placeholder={'Email'}
							required={true}
							className="h-[30px] w-[304px] rounded-[5px] pl-[10px]"
						/>
						<br />
						<input
							name="last_name"
							placeholder={'Password'}
							required={true}
							className="h-[30px] w-[304px] rounded-[5px] pl-[10px]"
						/>
						<br />
						<input
							name="last_name"
							placeholder={'Verify Password'}
							required={true}
							className="h-[30px] w-[304px] rounded-[5px] pl-[10px]"
						/>
						<Button className=" h-[32px] w-[209px] rounded-[5px] bg-primary-eco text-[18px] ">
							Submit
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ecoSignUp;
