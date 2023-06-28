import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import FeatureCommunicationCenter from 'components/eco/why-buy/feature-communication';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');

	return (
		<>
			<Seo title="Why buy page" description="" />
			<div className=" !bg-white pb-[48px]">
				{/* Header section */}
				<div className="h-[263px]  bg-[url('/static/images/WhyBuyImages/why-buy-header.png')] bg-cover bg-no-repeat md:h-[318px] lg:h-[719px]">
					<div className="4k:py-16 pt-[153px] pl-[770px] ">
						<div className="4k:w-auto h-[113px] w-[660px] md:w-1/2">
							<p className=" w-[660px] text-[50px] font-semibold leading-[51px] text-gray ">
								{t('Why BUY on')}
								<br />
								{t('Tradewinds Marketplace?')}
							</p>
							{/* Content */}
							<p className=" mt-[25px] h-[204px] w-[348px] text-[25px] font-semibold text-primary-main  ">
								Verified Sellers <br />
								Cost-effective <br />
								Flexible payment options <br />
								Let the sellers come to you
							</p>
							<div className=" mt-[6px] ">
								<Button
									variant="special"
									className=" h-[60px] w-[319px] text-[25px] font-medium "
								>
									{t('common:join_now')}
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className=" -mt-[70px]">
					<FeatureCommunicationCenter />
				</div>

				<div className=' container mx-auto  h-[822px] w-[1506px]  bg-[url("/static/images/WhyBuyImages/ready-to-grow-banner.png")]  pt-[70px] pl-[164px] text-white '>
					<p className=" h-[122px] w-[389px] text-[50px] font-semibold leading-[61px] ">
						Ready to Grow Your Business?
					</p>
					<div className=" mt-[20px] h-[354px] w-[699px] text-[25px] leading-[30px]">
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
						<p className=" mt-[25px]">
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
					<div className=" mt-[20px] ml-[51px]  ">
						<button className=" h-[26px] w-[138px] rounded-[5px] bg-cyan text-[18px]">
							Start Today
						</button>
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
