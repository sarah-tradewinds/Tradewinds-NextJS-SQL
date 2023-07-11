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

	return (
		<>
			<Seo title="Why sell on tradewinds page" description="" />
			<div className=" bg-bg_light_gray ">
				{/* Header */}

				<div className=" h-[1126px] w-full sm:h-[729px] md:h-[775px] lg:h-[1016px] desktop:h-[1508px] ">
					<div className="relative mx-auto h-[203px] w-[300px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat sm:h-[298px] sm:w-[640px] md:h-[358px] md:w-[768px] lg:h-[478px] lg:w-[1025px] desktop:h-[703px] desktop:w-[1512px]">
						<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>

						{/* content */}
						{/* <div className="4k:left-1/2 4k:-translate-x-1/2 absolute left-20 top-8 z-[50] text-white lg:top-32 lg:w-1/2"> */}
						<div className="absolute z-[50] ml-[16px] mt-[19px] text-white sm:ml-[37px] sm:mt-[60px] md:ml-[44px] md:mt-[71px] lg:ml-[59px] lg:mt-[95px] desktop:ml-[87px] desktop:mt-[px] ">
							<p className=" w-[160px] text-[15px] font-semibold sm:w-[160px] sm:text-[15px] md:w-[240px] md:text-[24px] lg:w-[306px] lg:text-[32px] desktop:w-[530px] desktop:text-[50px]">
								{t('Expand your Business Globally')}
							</p>

							<p className=" mt-[8px] w-[187px] text-[12px] font-semibold leading-[14px] sm:mt-[11px] sm:ml-[5px] sm:w-[242px] sm:text-[12px] sm:leading-[15px] md:mt-[9px] md:ml-[7px] md:w-[300px] md:text-[15px] md:leading-[18px] lg:mt-[14px] lg:ml-[7px] lg:w-[357px] lg:text-[18px] lg:leading-[21px] desktop:mt-[20px] desktop:ml-[8px] desktop:w-[390px] desktop:text-[25px] desktop:leading-[30px]">
								{t(
									'Unlock the Full Sales Potential of Your Business and Maximize Profitability Join Us'
								)}
							</p>

							<div className="mt-[24px] ml-[37px] sm:mt-[17px] sm:ml-[24px] md:mt-[21px] md:ml-[30px] lg:mt-[34px] lg:ml-[39px] desktop:mt-[29px] desktop:ml-[58px]">
								<button className=" h-[13px] w-[73px] rounded-sm bg-cyan text-[6px] font-medium sm:h-[25px] sm:w-[135px] sm:text-[10px] md:h-[30px] md:w-[162px] md:text-[13px] lg:h-[40px] lg:w-[216px] lg:text-[17px] desktop:h-[60px] desktop:w-[319px] desktop:text-[25px] ">
									{t('common:join_now')}
								</button>
							</div>
						</div>
						<div className=" absolute left-1/2 z-50 mt-[203px] h-[308px] w-[300px] -translate-x-1/2 space-y-[10px] rounded-none bg-dark_gray p-[14px] text-center text-[12px] leading-[15px]  text-beauty sm:mt-[232px] sm:h-[170px] sm:w-[566px] sm:space-y-[10px] sm:rounded-[12px] sm:p-[10px]  sm:text-[12px] sm:leading-[15px] md:mt-[279px] md:h-[205px] md:w-[680px] md:space-y-[15px] md:p-[15px]  md:text-[15px] md:leading-[18px] lg:mt-[373px] lg:h-[228px] lg:w-[907px] lg:space-y-[15px] lg:p-[20px]  lg:text-[18px] lg:leading-[21px] desktop:mt-[549px]  desktop:h-[338px]  desktop:w-[1336px]  desktop:space-y-[20px] desktop:p-[40px] desktop:text-[25px]  desktop:leading-[30px] ">
							<p>
								{t(
									'Welcome to Tradewinds Marketplace, your ultimate destination for global trade success. We understand the importance of expanding your business beyond borders and reaching customers around the world. With our innovative platform, we provide a dynamic marketplace where sellers can thrive, and buyers can discover exceptional products.'
								)}
							</p>
							<p>
								{t(
									`Whether you're a seasoned seller looking to expand your market reach or a budding entrepreneur ready to take your business to new heights, Tradewinds Marketplace offers the tools, resources, and support you need to succeed. Get ready to unlock endless possibilities and embark on an exciting journey of global business growth.`
								)}
							</p>
						</div>
					</div>
					<div className=" container mx-auto mt-[330px] w-[300px] justify-center text-primary-main sm:mt-[122px] sm:w-[640px] md:mt-[146px] md:w-[768px] lg:mt-[156px] lg:w-[950px] desktop:mt-[242px] desktop:w-[1340px]">
						<p className=" text-center text-[14px] font-semibold leading-[17px] sm:text-[15px] sm:leading-[18px] md:text-[18px] md:leading-[22px] lg:text-[25px] lg:leading-[30px] desktop:text-[50px] desktop:leading-[60px] ">
							{t('Benefits')}
						</p>
						<div className=" container mx-auto mt-[25px] block justify-center sm:mt-[15px] sm:flex sm:space-x-[20px] md:mt-[14px] md:space-x-[8px] lg:mt-[19px] lg:space-x-[11px] desktop:mt-[45px] desktop:space-x-[4px]">
							<div className=" mx-auto h-[137px] w-[272px] text-left sm:h-[173px] sm:w-[180px] sm:text-center md:h-[160px] md:w-[225px] lg:h-[205px] lg:w-[300px] desktop:h-[279px] desktop:w-[445px] ">
								<div className=" relative h-[45px] w-[45px] sm:mx-auto sm:h-[46px] sm:w-[46px] md:h-[55px] md:w-[55px] lg:h-[74px] lg:w-[74px] desktop:h-[108px] desktop:w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/global-img.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className=" mt-[7px] sm:mt-[11px] md:mt-[12px] lg:mt-[17px] desktop:mt-[25px] ">
									<p className=" text-[12px] font-bold sm:text-[12px] md:text-[11px] lg:text-[15px] desktop:text-[23px] ">
										{t('Global Exposure')}
									</p>
									<p className="text-[10px] font-semibold sm:text-[10px]  md:text-[11px] lg:text-[15px] desktop:text-[18px] ">
										{t('Skyrocket your Sales')}
									</p>
									<p className="mt-[10px] text-[10px] font-medium sm:mt-[11px] sm:text-[10px] md:mt-[12px] md:text-[9px] lg:mt-[17px] lg:text-[12px] desktop:mt-[25px] desktop:text-[18px] ">
										{t(
											'Supercharge your business sales with international exposure. Expand your customer base and maximize revenue, capturing new markets, and driving growth.'
										)}
									</p>
								</div>
							</div>
							<div className="mx-auto h-[150px] w-[272px] text-left sm:h-[173px] sm:w-[180px] sm:text-center md:h-[160px] md:w-[225px] lg:h-[205px] lg:w-[300px] desktop:h-[279px] desktop:w-[445px] ">
								<div className=" relative mt-[30px] h-[40px] w-[40px] sm:mx-auto sm:mt-[5px] sm:h-[40px] sm:w-[40px] md:mt-[7px] md:h-[48px] md:w-[47px] lg:mt-[10px] lg:h-[64px] lg:w-[63px] desktop:mt-0 desktop:h-[108px] desktop:w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/commer-img.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className="mt-[7px] sm:mt-[11px] md:mt-[12px] lg:mt-[17px] desktop:mt-[25px]">
									<p className="text-[12px]  font-bold sm:text-[12px] md:text-[11px] lg:text-[15px] desktop:text-[23px] ">
										{t('Commerce in USD$')}
									</p>
									<p className="text-[10px] font-semibold sm:text-[10px] md:text-[11px] lg:text-[15px] desktop:text-[18px] ">
										{t('Power up profits')}
									</p>
									<p className="mt-[10px] text-[10px] font-medium sm:mt-[11px] sm:text-[10px] md:mt-[12px] md:text-[9px] lg:mt-[17px] lg:text-[12px] desktop:mt-[25px] desktop:text-[18px] ">
										{t(
											'Boost your sales to new heights by harnessing the power of selling in USD$. Tap into a globally recognized currency to unlock unlimited growth potential for your business.'
										)}
									</p>
								</div>
							</div>
							<div className="mx-auto h-[150px] w-[272px] text-left sm:h-[173px] sm:w-[180px] sm:text-center md:h-[160px] md:w-[225px] lg:h-[205px] lg:w-[300px] desktop:h-[279px] desktop:w-[445px] ">
								<div className=" relative mt-[30px] h-[45px] w-[45px] sm:mx-auto sm:-mt-[0px] sm:h-[46px] sm:w-[46px] md:mt-0 md:h-[55px] md:w-[55px] lg:mt-[0px] lg:h-[73px] lg:w-[73px] desktop:mt-0 desktop:h-[108px] desktop:w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/sell_wholesale.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className="mt-[7px] sm:mt-[11px] md:mt-[12px] lg:mt-[17px] desktop:mt-[25px]">
									<p className=" text-[12px] font-bold sm:mt-[11px] sm:text-[12px] md:text-[11px] lg:text-[15px] desktop:text-[23px] ">
										{t('Sell Wholesale')}
									</p>
									<p className="text-[10px] font-semibold sm:text-[10px] md:text-[11px] lg:text-[15px] desktop:text-[18px] ">
										{t('Amplify Your Business!')}
									</p>
									<p className="mt-[10px] text-[10px] font-medium sm:mt-[11px] sm:text-[10px] md:mt-[12px] md:text-[9px] lg:mt-[17px] lg:text-[12px] desktop:mt-[25px] desktop:text-[18px] ">
										{t(
											'Harness the power of bulk selling. Effortlessly showcase and sell your products in larger quantities and leverage the power of high-volume transactions to skyrocket your business growth.'
										)}
									</p>
								</div>
							</div>
						</div>
						<div className=" hidden text-center sm:mt-[41px] sm:block md:mt-[33px] lg:mt-[60px] desktop:mt-[90px] ">
							<button className=" rounded-[7px] bg-cyan font-normal text-white sm:h-[25px] sm:w-[135px] sm:text-[12.5px] md:h-[31px] md:w-[162px] md:text-[15px] lg:h-[40px] lg:w-[216px] lg:text-[25px] desktop:h-[60px] desktop:w-[319px] desktop:text-[25px] ">
								{t('common:join_now')}
							</button>
						</div>
					</div>
				</div>
				{/*<div className=" mx-auto w-[300px] bg-white sm:w-[640px] md:w-[768px] lg:w-[1025px] desktop:w-[1466px]">
					<div className="container mx-auto w-[277px] text-primary-main sm:w-[566px] md:w-[680px] lg:w-[907px] desktop:w-[1336px]">
						<div>
							<div className=" pt-[15px] text-center sm:pt-[13px] md:pt-[16px] lg:pt-[31px]  desktop:pt-[75px] ">
								<p className="text-[15px] font-semibold leading-[18px] sm:text-[15px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[25px] lg:leading-[30px] desktop:text-[50px] desktop:leading-[60px]">
									{t('Platform Features')}
								</p>
							</div>
							<div className="mt-[20px] space-y-[20px] sm:mt-[19px]  sm:space-y-[41px] md:mt-[23px] md:space-y-[49px] lg:mt-[38px] lg:space-y-[65px] desktop:mt-[71px] desktop:space-y-[96px]">
								<div className=" h-[375px] rounded-[10px] bg-bg-main pl-[13px] pt-[20px] sm:h-[193px] sm:pl-[13px] sm:pt-[25px] md:h-[232px] md:pl-[15px] md:pt-[29px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]">
									<WhySellOnTWOperationTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/store-front-img.png"
										title={t('Storefront')}
										className=" pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
										containerClassName={leftSideClassName}
									>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
											title="Personalized Storefront"
											subtitle={t('Showcase your products seamlessly.')}
											className=" "
										/>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/keyword-advertising.png"
											title={t('SEO Optimization:')}
											subtitle={t(
												'Optimize your product listings for SEO with valuable posting recommendations.'
											)}
											className="  "
										/>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/inventory.png"
											title={t('Inventory Management: ')}
											subtitle={t(
												'Track inventory from purchase to the sale of goods. individual sale.'
											)}
											className=" "
										/>
									</WhySellOnTWOperationTile>
								</div>

								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/communication.png"
									title={t('common:communication_center')}
									className="pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
									containerClassName="md:pr-4 lg:pr-0 sm:flex-row-reverse md:flex-row-reverse lg:flex-row-reverse  pb-8 lg:pb-0"
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/messaging-center.png"
										title={t('common:messaging_center')}
										subtitle={t(
											'Engage with customers to build strong relationships.'
										)}
										className=" "
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/Translation tools-icon.png"
										title={t('translation_tools')}
										subtitle={t(
											'Effortlessly communicate with translated conversations in your preferred languages.'
										)}
										className=" "
									/>
								</WhySellOnTWOperationTile>

								<div className=" h-[450px] rounded-[10px] bg-bg-main pl-[13px] pt-[20px] sm:h-[218px] sm:pl-[13px] sm:pt-[0px] md:h-[262px] md:pl-[15px] md:pt-[12px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]">
									<WhySellOnTWOperationTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/Order Management.png"
										title={t('Order Management')}
										className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
										containerClassName={leftSideClassName}
									>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/invoice-icon.png"
											title={t('Invoice creation:')}
											subtitle={t(
												'Effortlessly send stunning, professional invoices that impress.'
											)}
											className="  "
										/>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/proccessing.png"
											title={t('Processing Protection:')}
											subtitle={t(
												'Enable secure transactions through Tradewinds Marketplace, fostering trust between buyers and sellers.'
											)}
											className=" "
										/>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/logistics.png"
											title={t('Logistics: ')}
											subtitle={t(
												'Effortlessly streamline your logistics and fulfillment using our advanced Fulfillment Manager, allowing you to easily track every shipment and delivery while enjoying the convenience of automatic updates.'
											)}
											className=" "
										/>
									</WhySellOnTWOperationTile>
								</div>

								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/RFQ-tool.png"
									title={t('RFQ Tool- "Request for Quotation"')}
									className="pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
									containerClassName="md:pr-4 lg:pr-0 sm:flex-row-reverse md:flex-row-reverse  pb-8 lg:pb-0 lg:flex-row-reverse "
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
										title={t('Seamlessly connect with buyers')}
										subtitle={t(
											'Seeking your products and provide quotes to hot leads, revolutionizing your sales process for limitless business opportunities.'
										)}
										className="  "
									/>
								</WhySellOnTWOperationTile>
								<div className=" h-[457px] rounded-[10px] bg-bg-main pl-[13px] pt-[20px] sm:h-[237px] sm:pl-[13px] sm:pt-[0px] md:h-[285px] md:pl-[15px] md:pt-[12px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]">
									<WhySellOnTWOperationTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/Marketing-img.png"
										title={t('Marketing')}
										className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
										containerClassName={leftSideClassName}
									>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/sponsored-campaigns.png"
											title={t('Sponsored campaigns:')}
											subtitle={t(
												'Increase traffic to your storefront and create interest for your products.'
											)}
											className="  "
										/>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/keyword-advertising.png"
											title={t('Keyword Advertising:')}
											subtitle={t(
												'Maximize your product visibility by targeting buyers based on their location, browsing history, and more. This helps your products appear higher in relevant searches, attracting more customers.'
											)}
											className=" "
										/>
										<WhySellOnTWOperationSubTile
											imageUrl="/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png"
											title={t('Budget Control:')}
											subtitle={t(
												'Customize your advertising parameters to align with your preferred budget and achieve your marketing goals.'
											)}
										/>
									</WhySellOnTWOperationTile>
								</div>
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/analytics-img.png"
									title={t('common:analytics')}
									className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
									containerClassName="md:pr-4 sm:flex-row-reverse md:flex-row-reverse  lg:pr-0 lg:flex-row-reverse  pb-8 lg:pb-0"
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/dashboards.png"
										title={t('dashboards')}
										subtitle={t(
											'Unleash the power of data visualization to track your store metrics, analyze historical data, and receive intelligent suggestions based on platform insights.'
										)}
										className=" "
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/analytics.png"
										title={t('industry_analytics')}
										subtitle={t(
											'Gain valuable insights into product performance through in-depth demand analysis, trend evaluation, price comparisons, and more.'
										)}
										className=" "
									/>
								</WhySellOnTWOperationTile>
							</div>
						</div>
					</div>
				</div> */}
				<WhySellPlatform
					mainClass="text-primary-main bg-white"
					class1="bg-bg-main"
					case1={false}
				/>
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
