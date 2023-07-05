import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import CommunicationCenter from 'components/eco/why-buy/feature-communication';
import ProductQualifications from 'components/eco/why-buy/product-qualifications';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');

	return (
		<>
			<Seo title="Why buy page" description="" />

			<div className=" bg-bg_light_pink">
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
				<div className=" -mt-[91px] ">
					<ProductQualifications />
				</div>
				<CommunicationCenter />
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
