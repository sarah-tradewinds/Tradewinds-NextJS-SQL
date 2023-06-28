import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import {
	WhySellOnTWOperationSubTile,
	WhySellOnTWOperationTile
} from 'components/common/why-sell-on-tradewinds/why-sell-on-tradewinds-tile';
const WhySellOnTradewindsPage: NextPage = () => {
	const { t } = useTranslation('why_sell_on_tw');

	const leftSideClassName =
		'md:pr-4 lg:pr-0 border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0';

	return (
		<>
			<Seo title="Why sell on tradewinds page" description="" />
			<div className=" bg-white pb-[60px]">
				{/* Header */}
				<div className="  h-[1508px] w-full bg-bg_light_gray ">
					<div className="relative h-[703px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat md:h-[340px] lg:h-[703px]">
						<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>

						{/* content */}
						{/* <div className="4k:left-1/2 4k:-translate-x-1/2 absolute left-20 top-8 z-[50] text-white lg:top-32 lg:w-1/2"> */}
						<div className="absolute left-[87px] top-8 z-[50] text-white lg:top-32 lg:w-1/2">
							<p className="text-[35px] font-semibold  leading-[51px] md:text-[40px] lg:w-[666px] lg:text-[50px] ">
								{t('Expand your')}
								<br />
								{t('Business Globally')}
							</p>
							<div className="mt-[20px] hidden space-y-2 font-semibold md:block md:text-[16px] lg:text-[25px]">
								<p className=" w-[490px]">
									{t(
										'Unlock the Full Sales Potential of Your Business and Maximize Profitability Join Us'
									)}
								</p>
							</div>
							<div className=" ml-[58px]">
								<Button
									variant="buyer"
									className="mt-8 h-[60px] w-[319px] text-[25px] font-medium "
								>
									{t('common:join_now')}
								</Button>
							</div>
						</div>
						<div className=" absolute left-1/2 z-50 mt-[549px]  h-[338px] w-[1336px] -translate-x-1/2 space-y-[20px] rounded-[12px] bg-dark_gray p-[40px]  text-center text-[25px] leading-[30px]  text-beauty ">
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
					<div className=" container mx-auto mt-[242px] w-[1340px] justify-center  text-primary-main">
						<p className=" text-center text-[50px] font-semibold leading-[60px] ">
							{t('Benefits')}
						</p>
						<div className=" mt-[45px] flex space-x-[4px]">
							<div className=" h-[279px] w-[445px] text-center ">
								<div className=" relative mx-auto h-[108px] w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/global-img.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className=" mt-[25px] ">
									<p className=" text-[23px] font-bold ">
										{t('Global Exposure')}
									</p>
									<p className=" text-[18px] font-semibold ">
										{t('Skyrocket your Sales')}
									</p>
									<p className=" mt-[25px] text-[18px] font-medium ">
										{t(
											'Supercharge your business sales with international exposure. Expand your customer base and maximize revenue, capturing new markets, and driving growth.'
										)}
									</p>
								</div>
							</div>
							<div className=" h-[279px] w-[445px] text-center ">
								<div className=" relative mx-auto h-[108px] w-[109px] ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/commer-img.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className="mt-[25px]">
									<p className=" text-[23px] font-bold ">
										{t('Commerce in USD$')}
									</p>
									<p className=" text-[18px] font-semibold ">
										{t('Power up profits')}
									</p>
									<p className="mt-[25px] text-[18px] font-medium ">
										{t(
											'Boost your sales to new heights by harnessing the power of selling in USD$. Tap into a globally recognized currency to unlock unlimited growth potential for your business.'
										)}
									</p>
								</div>
							</div>
							<div className=" h-[279px] w-[445px] text-center ">
								<div className=" container relative mx-auto h-[108px] w-[109px] justify-center ">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/sell-wholesale.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className=" mt-[25px]">
									<p className=" text-[23px] font-bold ">
										{t('Sell Wholesale')}
									</p>
									<p className=" text-[18px] font-semibold ">
										{t('Amplify Your Business!')}
									</p>
									<p className="mt-[25px] text-[18px] font-medium ">
										{t(
											'Harness the power of bulk selling. Effortlessly showcase and sell your products in larger quantities and leverage the power of high-volume transactions to skyrocket your business growth.'
										)}
									</p>
								</div>
							</div>
						</div>
						<div className=" mt-[90px] text-center ">
							<Button
								variant="buyer"
								className=" h-[60px] w-[319px] text-[25px] font-medium "
							>
								{t('common:join_now')}
							</Button>
						</div>
					</div>
				</div>

				<div className="container mx-auto w-[1336px]  text-primary-main">
					<div>
						<div className=" mt-[81px] text-center md:p-8">
							<p className="text-[18px] font-semibold leading-[60px] lg:text-[50px]">
								{t('Platform Features')}
							</p>
						</div>
						<div className="space-y-[96px]">
							<div className=" h-[456px] rounded-[10px] bg-bg-main pt-[58px] pl-[30px]">
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/store-front-img.png"
									title={t('Storefront')}
									className="pl-8"
									containerClassName={leftSideClassName}
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
										title="Personalized Storefront"
										subtitle={t('Showcase your products seamlessly.')}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/keyword-advertising.png"
										title={t('SEO Optimization:')}
										subtitle={t(
											'Optimize your product listings for SEO with valuable posting recommendations.'
										)}
										imgClassName="hidden md:block"
										className="-ml-4 pt-4 md:-ml-0"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/inventory.png"
										title={t('Inventory Management: ')}
										subtitle={t(
											'Track inventory from purchase to the sale of goods. individual sale.'
										)}
										imgClassName="hidden md:block"
										className="-ml-4 pt-4 md:-ml-0"
									/>
								</WhySellOnTWOperationTile>
							</div>

							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/communication.png"
								title={t('common:communication_center')}
								className="pl-8"
								containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
							>
								<WhySellOnTWOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/messaging-center.png"
									title={t('common:messaging_center')}
									subtitle={t(
										'Engage with customers to build strong relationships.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhySellOnTWOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/Translation tools-icon.png"
									title={t('translation_tools')}
									subtitle={t(
										'Effortlessly communicate with translated conversations in your preferred languages.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhySellOnTWOperationTile>

							<div className=" h-[456px] rounded-[10px] bg-bg-main pt-[58px] pl-[30px]">
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/Order Management.png"
									title={t('Order Management')}
									className="pl-8"
									containerClassName={leftSideClassName}
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/invoice-icon.png"
										title={t('Invoice creation:')}
										subtitle={t(
											'Effortlessly send stunning, professional invoices that impress.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/proccessing.png"
										title={t('Processing Protection:')}
										subtitle={t(
											'Enable secure transactions through Tradewinds Marketplace, fostering trust between buyers and sellers.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/logistics.png"
										title={t('Logistics: ')}
										subtitle={t(
											'Effortlessly streamline your logistics and fulfillment using our advanced Fulfillment Manager, allowing you to easily track every shipment and delivery while enjoying the convenience of automatic updates.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
								</WhySellOnTWOperationTile>
							</div>

							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/RFQ-tool.png"
								title={t('RFQ Tool- "Request for Quotation"')}
								className="pl-8"
								containerClassName="md:pr-4 lg:pr-0 lg:border-b-0 border-gray/40 pb-8 lg:pb-0 lg:flex-row-reverse border-b"
							>
								<WhySellOnTWOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
									title={t('Seamlessly connect with buyers')}
									subtitle={t(
										'Seeking your products and provide quotes to hot leads, revolutionizing your sales process for limitless business opportunities.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhySellOnTWOperationTile>
							<div className=" h-[456px] rounded-[10px] bg-bg-main pt-[58px] pl-[30px]">
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/Marketing-img.png"
									title={t('Marketing')}
									className="pl-8"
									containerClassName={leftSideClassName}
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/sponsored-campaigns.png"
										title={t('Sponsored campaigns:')}
										subtitle={t(
											'Increase traffic to your storefront and create interest for your products.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/keyword-advertising.png"
										title={t('Keyword Advertising:')}
										subtitle={t(
											'Maximize your product visibility by targeting buyers based on their location, browsing history, and more. This helps your products appear higher in relevant searches, attracting more customers.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png"
										title={t('Budget Control:')}
										subtitle={t(
											'Customize your advertising parameters to align with your preferred budget and achieve your marketing goals.'
										)}
										imgClassName="hidden md:block"
									/>
								</WhySellOnTWOperationTile>
							</div>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/analytics-img.png"
								title={t('common:analytics')}
								className="pl-8"
								containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
							>
								<WhySellOnTWOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/dashboards.png"
									title={t('dashboards')}
									subtitle={t(
										'Unleash the power of data visualization to track your store metrics, analyze historical data, and receive intelligent suggestions based on platform insights.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhySellOnTWOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/analytics.png"
									title={t('industry_analytics')}
									subtitle={t(
										'Gain valuable insights into product performance through in-depth demand analysis, trend evaluation, price comparisons, and more.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhySellOnTWOperationTile>
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

export default WhySellOnTradewindsPage;
