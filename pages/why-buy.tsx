import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Seo from 'components/common/seo';
import FeatureCommunicationCenter from 'components/eco/why-buy/feature-communication';
import { useAuthStore } from 'store/auth';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');
	const { setIsSignUpOpen } = useAuthStore();

	return (
		<>
			<Seo title="Why buy page" description="" />
			<div className=" !bg-white pb-[48px]">
				{/* Header section */}
				<div className=" container mx-auto h-[207px] w-[300px] justify-center  bg-[url('/static/images/WhyBuyImages/why-buy-header.png')] bg-cover bg-no-repeat sm:h-[343px] sm:w-[640px] md:h-[343px] md:w-[768px] lg:h-[458px] lg:w-[1025px] desktop:h-[703px] desktop:w-full">
					<div className=" pt-[10px] pl-[155px] sm:pt-[19px] sm:pl-[381px] md:pt-[36px]  md:pl-[390px] lg:pt-[110px]  lg:pl-[521px] desktop:pt-[129px]  desktop:pl-[768px] ">
						<p className="  text-[15px] font-semibold leading-[18px] text-gray sm:text-[18px] sm:leading-[25px] md:text-[25px] md:leading-[27px] lg:text-[32px] lg:leading-[33px] desktop:text-[50px] desktop:leading-[51px] ">
							{t('Why BUY on')}
							<br />
							{t('Tradewinds Marketplace?')}
						</p>
						{/* Content */}
						<p className=" mt-[10px] w-[115px] text-[12px] font-semibold leading-[15px] text-primary-main sm:mt-[14px] sm:w-[221px] sm:text-[15px] sm:leading-[18px] md:mt-[10px] md:w-[321px] md:text-[15px] md:leading-[18px] lg:mt-[12px] lg:w-[227px] lg:text-[16px] lg:leading-[30px] desktop:mt-[25px] desktop:w-[348px] desktop:text-[25px] desktop:leading-[42px]  ">
							Verified Sellers <br />
							Cost-effective <br />
							Flexible payment options <br />
							Let the sellers come to you
						</p>
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
				<div>
					<div className=" container mx-auto -mt-[5px] flex justify-center sm:-mt-[26px]  md:-mt-[26px] lg:-mt-[47px] desktop:-mt-[70px]">
						<FeatureCommunicationCenter />
					</div>

					<div className=' container mx-auto h-[350px]  w-[300px] bg-[url("/static/images/WhyBuyImages/ready-to-grow-banner.png")] pl-[22px]  pt-[14px] text-white sm:mt-[26px] sm:h-[349px]  sm:w-[626px] sm:pl-[64px] sm:pt-[29px] md:mt-[18px] md:h-[403px]  md:w-[721px] md:pl-[74px] md:pt-[43px] lg:mt-[31px] lg:h-[538px]  lg:w-[963px] lg:pl-[99px] lg:pt-[45px]  desktop:mt-[48px]  desktop:h-[822px]  desktop:w-[1489px] desktop:pl-[164px] desktop:pt-[48px] '>
						<p className=" h-[52px] w-[166px] text-[21px] font-semibold leading-[25px] sm:h-[52px] sm:w-[166px] sm:text-[21px] sm:leading-[25px] md:h-[60px] md:w-[191px] md:text-[24px] md:leading-[29px] lg:h-[80px] lg:w-[275px] lg:text-[33px] lg:leading-[38px] desktop:h-[122px] desktop:w-[389px] desktop:text-[50px] desktop:leading-[61px] ">
							Ready to Grow Your Business?
						</p>
						<div className="mt-[9px] h-[151px] w-[259px] text-[10px] leading-[12px] sm:mt-[8px] sm:h-[150px] sm:w-[297px] sm:text-[10px] sm:leading-[12px] md:mt-[9px] md:h-[173px] md:w-[432px] md:text-[12px] md:leading-[14px] lg:mt-[12px] lg:h-[231px] lg:w-[457px] lg:text-[16px] lg:leading-[19px] desktop:mt-[20px] desktop:h-[354px] desktop:w-[699px] desktop:text-[25px] desktop:leading-[30px]">
							<p>
								<span className=" font-semibold">Start Buying</span>
								<br />
								Create an account
								<br />
								Negotiate deals, buy right away or Post a RFQ
								<br />
								Respond to Suppliers
								<br /> Procure Orders and payment
								<br /> Receive Products
							</p>
							<p className="mt-[18px] sm:mt-[15px] md:mt-[18px] lg:mt-[20px] desktop:mt-[25px]">
								<span className=" font-semibold">
									Manage your account
								</span>{' '}
								<br />
								Stay connected with Suppliers
								<br />
								Nurture your relationships
								<br />
								Optimize purchases
							</p>
						</div>
						<div className="ml-[9px] mt-[16pxpx] sm:ml-[22px] sm:mt-[8px] md:ml-[15px] md:mt-[9px] lg:mt-[13px] lg:ml-[33px] desktop:ml-[51px] desktop:mt-[20px]  ">
							<button
								onClick={setIsSignUpOpen}
								className=" h-[19px] w-[104px] rounded-[3px] bg-cyan text-[8px] sm:h-[11px] sm:w-[58px] sm:rounded-[3px] sm:text-[7px] md:h-[12px] md:w-[67px] md:rounded-[4px] md:text-[8px] lg:h-[17px] lg:w-[90px] lg:rounded-[5px] lg:text-[11px] desktop:h-[26px] desktop:w-[138px] desktop:rounded-[5px] desktop:text-[18px]"
							>
								Start Today
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default WhyBuyPage;
