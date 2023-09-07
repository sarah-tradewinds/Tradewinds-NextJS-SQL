// stores
import { useAuthStore } from 'store/auth';

import Link from 'next/link';
import { Modal } from './modal/modal';

const FreeTrailPopup: React.FC = () => {
	const { freeTrailOpen, setFreeTrailClose } = useAuthStore();

	return (
		<Modal
			open={freeTrailOpen}
			className="!left-1/2 top-[60px] !z-[51000] !-translate-x-1/2 sm:top-[86px] lg:top-[118px]  xl:!top-[161px]"
			overlayClassName=" !bg-transparent "
			onClose={setFreeTrailClose}
		>
			<div className=" h-[288px] w-[278px] bg-white text-center sm:h-[322px] sm:w-[542px] lg:h-[420px] lg:w-[698px] xl:h-[495px] xl:w-[822px]  ">
				<div
					onClick={setFreeTrailClose}
					className=" float-right mt-[3px] mr-[4.3px] h-[19px] w-[19px] rounded-full bg-[#D9D9D9] pt-[8px] sm:hidden"
				>
					<div className=" m-auto h-[3px] w-[10px] rounded-[2px] bg-white "></div>
				</div>
				<p className="bg-gradient-to-r from-[#37B34A] via-[#33A7DF] to-[#044E86] bg-clip-text px-[12px]  pt-[32px] text-[20px] font-semibold leading-[24px] text-transparent sm:px-[33px] sm:pt-[49px] sm:text-[28px] sm:leading-[34px] lg:px-[32px] lg:pt-[64px] lg:text-[37px] lg:leading-[45px] xl:px-[38px] xl:pt-[76px] xl:text-[44px] xl:leading-[53px] ">
					Start with 5 days free, then enjoy 3 Months for $10/mo
				</p>
				<p className="px-[17px] pt-[9px] text-[11px] leading-[13px] text-primary-main sm:px-[113px] sm:pt-[26px] sm:text-[14px] sm:leading-[16px] lg:px-[182px] lg:pt-[31px] lg:text-[15px] lg:leading-[18px]  xl:mt-[48px] xl:px-[211px] xl:text-[18px] xl:leading-[21.94px] ">
					Try{' '}
					<span className=" font-semibold ">
						Tradewinds Market Place
					</span>{' '}
					free for 5 days, no credit card required
				</p>
				<Link
					href={'https://www.dashboard.tradewindsmarketplace.com/#/'}
				>
					<p className=" mx-auto mt-[22px] h-[31px] w-[110px] rounded-[3px] bg-[#36B04A] py-[8px] px-[11px] text-[12.18px]  font-semibold text-white sm:mt-[21px] sm:h-[38px] sm:w-[134px] sm:rounded-[4px] sm:py-[10px]  sm:px-[13px] sm:text-[14px] lg:mt-[45px] lg:h-[47px] lg:w-[163px] lg:rounded-[5px] lg:py-[12px]  lg:px-[17px] lg:text-[18px] xl:mt-[48px]  ">
						Start free trial
					</p>
				</Link>
				{/* <p className="mt-[12px] text-[10px] leading-[12px] text-primary-main ">
					By entering your email, you agree to receive marketing emails
					from TWMP
				</p> */}
			</div>
		</Modal>
	);
};

export default FreeTrailPopup;
