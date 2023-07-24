// Third party packages
import { useTranslation } from 'next-i18next';
import { useAuthStore } from 'store/auth';

function WhyBuyBanner() {
	const { t } = useTranslation('why_buy');
	const { setIsSignUpOpen } = useAuthStore();
	return (
		<div className=" container mx-auto h-[207px] w-[300px] justify-center  bg-[url('/static/images/WhyBuyImages/why-buy-header.png')] bg-cover bg-no-repeat sm:h-[343px] sm:w-[640px] md:h-[343px] md:w-[768px] lg:h-[458px] lg:w-[1025px] desktop:h-[703px] desktop:w-full">
			<div className=" pt-[10px] pl-[70px] sm:pt-[19px] sm:pl-[381px] md:pt-[36px]  md:pl-[390px] lg:pt-[110px]  lg:pl-[521px] desktop:pt-[129px]  desktop:pl-[768px] ">
				<p className="  text-[15px] font-semibold leading-[18px] text-gray sm:text-[18px] sm:leading-[25px] md:text-[25px] md:leading-[27px] lg:text-[32px] lg:leading-[33px] desktop:text-[50px] desktop:leading-[51px] ">
					{t('why_buy_on_tradewinds_marketplace')}
				</p>
				{/* Content */}
				<div className=" mt-[8px] space-y-[10px] text-[12px] font-semibold leading-[15px] text-primary-main sm:mt-[14px] sm:text-[15px] sm:leading-[18px] md:mt-[10px] md:text-[15px] md:leading-[18px] lg:mt-[12px] lg:text-[16px] lg:leading-[30px] desktop:mt-[25px] desktop:text-[25px] desktop:leading-[42px]  ">
					<p>{t('verified_sellers')} </p>
					<p>{t('cost_effective')} </p>
					<p>{t('flexible_payment_options')} </p>
					<p>{t('let_the_sellers_come_to_you')} </p>
				</div>
				<div className="mt-[0px] sm:mt-[23px] md:mt-[22px] lg:mt-[18px] desktop:mt-[25px] ">
					<button
						onClick={setIsSignUpOpen}
						className=" h-[13px] w-[73px] rounded-[4px] bg-secondary text-[6px] font-medium text-white sm:h-[29px] sm:w-[156px] sm:rounded-[5px] sm:text-[12px] md:h-[29px] md:w-[156px] md:rounded-[6px] md:text-[12px] lg:h-[39px] lg:w-[209px] lg:rounded-[8px] lg:text-[18px] desktop:h-[60px] desktop:w-[319px] desktop:rounded-[10px] desktop:text-[25px] "
					>
						{t('common:join_now')}
					</button>
				</div>
			</div>
		</div>
	);
}

export default WhyBuyBanner;
