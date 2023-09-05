import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Seo from 'components/common/seo';
import WhySellPlatform from 'components/eco/why-buy/whysell-platform';
const WhySellOnTradewindsPage: NextPage = () => {
	const { t } = useTranslation('why_sell_on_tw');

	const leftSideClassName = 'md:pr-4 lg:pr-0  pb-8 lg:pb-0';

	const gotoSellerSignup = () => {
		window?.open(
			`${process.env.SELLER_DASHBOARD_SITE_URL}/seller-registration`,
			'__blank'
		);
	}; // End of gotoSellerSignup

	return (
		<>
			<Seo title="Why sell on tradewinds page" description="" />
			<div className=" bg-bg_light_gray ">
				{/* Header */}

				<div className=" w-full">
					<div className="relative mx-auto h-[203px] w-full bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat sm:h-[298px]  md:h-[358px] lg:h-[478px] desktop:h-[703px] 3xl:container">
						<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>

						{/* content */}
						{/* <div className="4k:left-1/2 4k:-translate-x-1/2 absolute left-20 top-8 z-[50] text-white lg:top-32 lg:w-1/2"> */}
						<div className="absolute z-[50] ml-[16px] mt-[19px] text-white sm:ml-[37px] sm:mt-[60px] md:ml-[44px] md:mt-[71px] lg:ml-[59px] lg:mt-[95px] desktop:ml-[87px] desktop:mt-[px] ">
							<p className=" w-[160px] text-[15px] font-semibold leading-[18px] sm:w-[160px] sm:text-[15px] md:w-[240px] md:text-[24px] md:leading-[25px] lg:w-[306px] lg:text-[32px] lg:leading-[34px] desktop:w-[530px] desktop:text-[50px] desktop:leading-[51px]">
								{t('expand_your_business_globally')}
							</p>

							<p className=" mt-[8px] w-[187px] text-[12px] font-semibold leading-[14px] sm:mt-[11px] sm:ml-[5px] sm:w-[242px] sm:text-[12px] sm:leading-[15px] md:mt-[9px] md:ml-[7px] md:w-[300px] md:text-[15px] md:leading-[18px] lg:mt-[14px] lg:ml-[7px] lg:w-[357px] lg:text-[18px] lg:leading-[21px] desktop:mt-[20px] desktop:ml-[8px] desktop:w-[48%] desktop:text-[25px] desktop:leading-[30px]">
								{t(
									'unlock_the_Full _Sales_Potential_of_Your_Business_and_Maximize_Profitability_Join_Us'
								)}
							</p>

							<div className="mt-[24px] ml-[37px] sm:mt-[17px] sm:ml-[24px] md:mt-[18px] md:ml-[30px] lg:mt-[34px] lg:ml-[39px] desktop:mt-[29px] desktop:ml-[58px]">
								<button
									onClick={gotoSellerSignup}
									className="h-[13px] w-[73px] rounded-lg bg-cyan text-[6px] font-medium sm:h-[25px] sm:w-[135px] sm:text-[10px] md:h-[30px] md:w-[162px] md:text-[13px] lg:h-[40px] lg:w-[216px] lg:text-[17px] desktop:h-[60px] desktop:w-[319px] desktop:text-[25px]"
								>
									{t('common:join_now')}
								</button>
							</div>
						</div>
					</div>

					<div className="relative z-50 w-full space-y-[10px] rounded-none bg-dark_gray p-[14px] text-left text-[12px] leading-[15px] text-beauty sm:container sm:mx-auto sm:-mt-[70px]  sm:h-[180px] sm:w-[566px] sm:justify-center sm:space-y-[10px] sm:rounded-[12px] sm:p-[10px] sm:text-center  sm:text-[12px] sm:leading-[15px] md:-mt-[79px] md:h-[220px] md:w-[680px] md:space-y-[15px] md:p-[15px]  md:text-[15px] md:leading-[18px] lg:-mt-[105px] lg:h-[248px] lg:w-[907px] lg:space-y-[15px] lg:p-[20px]  lg:text-[18px] lg:leading-[21px] desktop:-mt-[154px]  desktop:h-[358px]  desktop:w-[1336px]  desktop:space-y-[20px] desktop:p-[40px] desktop:text-[25px]  desktop:leading-[30px] ">
						<p>
							{t(
								'welcome_to_tradewinds_Marketplace,_your_ultimate_destination'
							)}
						</p>
						<p>
							{t(
								`whether_you're_a_seasoned_seller_looking_to_expand_your_market_reach_or_a_budding_entrepreneur_ready`
							)}
						</p>
					</div>
					<p className="mt-[22px] text-center text-[14px] font-semibold leading-[17px] text-primary-main sm:text-[15px] sm:leading-[18px] md:text-[18px] md:leading-[22px] lg:text-[25px] lg:leading-[30px] desktop:text-[50px] desktop:leading-[60px] ">
						{t('benefits')}
					</p>
					<div className="  mb-5 w-[80%] text-primary-main  sm:container sm:mx-auto sm:w-[640px] sm:justify-center  md:w-[768px] lg:w-[950px] desktop:w-[1340px]">
						<div className=" mt-[20px] block space-y-[40px] pl-[14px] sm:container sm:mx-auto sm:mt-[15px] sm:flex sm:justify-center sm:space-y-0 sm:space-x-[18px] sm:pl-0 md:mt-[14px] md:space-x-[8px] lg:mt-[19px] lg:space-x-[11px] desktop:mt-[45px] desktop:space-x-[4px]">
							<div className="  w-full text-left sm:h-[173px] sm:w-[186px] sm:space-y-0 sm:text-center md:h-[160px] md:w-[225px] lg:h-[205px] lg:w-[300px] desktop:h-[279px] desktop:w-[445px] ">
								<div className=" relative h-[45px] w-[45px] sm:mx-auto sm:h-[46px] sm:w-[46px] md:h-[55px] md:w-[55px] lg:h-[74px] lg:w-[74px] desktop:h-[108px] desktop:w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/global-img.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className=" mt-[7px] sm:!mt-[11px] md:mt-[12px] lg:mt-[17px] desktop:mt-[20px] ">
									<p className=" text-[12px] font-bold sm:text-[12px] md:text-[11px] lg:text-[15px] desktop:text-[23px] ">
										{t('global_exposure')}
									</p>
									<p className="text-[10px] font-semibold sm:text-[10px]  md:text-[11px] lg:text-[15px] desktop:text-[18px] ">
										{t('skyrocket_your_sales')}
									</p>
									<p className="mt-[10px] text-[10px] font-medium sm:mt-[11px] sm:text-[10px] md:mt-[12px] md:text-[9px] lg:mt-[17px] lg:text-[12px] desktop:mt-[25px] desktop:text-[18px] ">
										{t(
											'supercharge_your_business_sales_with_international_exposure._Expand_your_customer base and maximize revenue, capturing new markets, and driving growth.'
										)}
									</p>
								</div>
							</div>
							<div className=" w-full text-left sm:h-[173px] sm:w-[210px] sm:text-center md:h-[160px] md:w-[225px] lg:h-[205px] lg:w-[300px] desktop:h-[279px] desktop:w-[445px] ">
								<div className=" relative mt-[30px] h-[40px] w-[40px] sm:mx-auto sm:mt-[5px] sm:h-[40px] sm:w-[40px] md:mt-[7px] md:h-[48px] md:w-[47px] lg:mt-[10px] lg:h-[64px] lg:w-[63px] desktop:mt-0 desktop:h-[108px] desktop:w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/commer-img.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className="mt-[7px] sm:mt-[13px] md:mt-[12px] lg:mt-[17px] desktop:mt-[20px]">
									<p className="text-[12px]  font-bold sm:text-[12px] md:text-[11px] lg:text-[15px] desktop:text-[23px] ">
										{t('commerce_in_USD$')}
									</p>
									<p className="text-[10px] font-semibold sm:text-[10px] md:text-[11px] lg:text-[15px] desktop:text-[18px] ">
										{t('power_up_profits')}
									</p>
									<p className="mt-[10px] text-[10px] font-medium sm:mt-[11px] sm:text-[10px] md:mt-[12px] md:text-[9px] lg:mt-[17px] lg:text-[12px] desktop:mt-[25px] desktop:text-[18px] ">
										{t(
											'boost_your_sales_to_new_heights_by_harnessing_the_power_of_selling_in_USD$.'
										)}
									</p>
								</div>
							</div>
							<div className="text-left sm:h-[173px] sm:w-[200px] sm:text-center md:h-[160px] md:w-[225px] lg:h-[205px] lg:w-[300px] desktop:h-[279px] desktop:w-[445px] ">
								<div className=" relative mt-[30px] h-[45px] w-[45px] sm:mx-auto sm:-mt-[0px] sm:h-[46px] sm:w-[46px] md:mt-0 md:h-[55px] md:w-[55px] lg:mt-[0px] lg:h-[73px] lg:w-[73px] desktop:mt-0 desktop:h-[108px] desktop:w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/sell_wholesale.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className="mt-[7px] sm:mt-[11px] md:mt-[12px] lg:mt-[17px] desktop:mt-[20px]">
									<p className=" text-[12px] font-bold sm:mt-[11px] sm:text-[12px] md:text-[11px] lg:text-[15px] desktop:text-[23px] ">
										{t('sell_wholesale')}
									</p>
									<p className="text-[10px] font-semibold sm:text-[10px] md:text-[11px] lg:text-[15px] desktop:text-[18px] ">
										{t('amplify_your_business!')}
									</p>
									<p className="mt-[10px] text-[10px] font-medium sm:mt-[11px] sm:text-[10px] md:mt-[12px] md:text-[9px] lg:mt-[17px] lg:text-[12px] desktop:mt-[25px] desktop:text-[18px] ">
										{t(
											'harness_the_power_of_bulk_selling._Effortlessly_showcase_and_sell_your_products_in_larger_quantities'
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className=" mb-4 hidden text-center sm:mt-[51px] sm:block md:mt-[33px] lg:mb-8 lg:mt-[60px] desktop:mt-[95px] ">
						<button
							onClick={gotoSellerSignup}
							className=" rounded-[7px] bg-cyan font-normal text-white sm:h-[25px] sm:w-[135px] sm:text-[12.5px] md:h-[31px] md:w-[162px] md:text-[15px] lg:h-[40px] lg:w-[216px] lg:text-[16px] desktop:h-[60px] desktop:w-[319px] desktop:text-[25px] "
						>
							{t('common:join_now')}
						</button>
					</div>
				</div>
				<div className=" h-full">
					<WhySellPlatform
						mainClass="text-primary-main bg-white"
						class1="bg-bg-main"
						case1={false}
					/>
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

export default WhySellOnTradewindsPage;
