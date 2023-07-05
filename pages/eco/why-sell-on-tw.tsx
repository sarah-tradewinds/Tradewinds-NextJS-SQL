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
import ProductQualifications from 'components/eco/why-buy/product-qualifications';
const WhySellOnTradewindsPage: NextPage = () => {
	const { t } = useTranslation('why_sell_on_tw');

	const leftSideClassName =
		'md:pr-4 lg:pr-0 border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0';

	return (
		<>
			<Seo title="Why sell on tradewinds page" description="" />
			<div className=" bg-light_gray pb-[138px]">
				{/* Header */}
				<div className="   w-full bg-header-bar">
					<div className="relative h-[703px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat md:h-[340px] lg:h-[703px]">
						{/* content */}
						{/* <div className="4k:left-1/2 4k:-translate-x-1/2 absolute left-20 top-8 z-[50] text-white lg:top-32 lg:w-1/2"> */}
						<div className="absolute left-[87px] top-8 z-[50] text-white lg:top-32 lg:w-1/2">
							<h1 className="text-[35px] font-semibold leading-[51px] md:text-[40px] lg:text-[50px] ">
								{t('Expand your')}
								<br />
								{t('Business Globally')}
							</h1>
							<div className="mt-[20px] hidden space-y-2 font-semibold md:block md:text-[16px] lg:text-[25px]">
								<p className=" w-[490px]">
									{t(
										'Unlock the Full Sales Potential of Your Business and Maximize Profitability Join Us'
									)}
								</p>
							</div>
							<Button
								variant="special"
								className="mt-8 h-[60px] w-[319px] text-[25px] font-medium "
							>
								{t('common:join_now')}
							</Button>
						</div>
						<div className=" absolute left-1/2  mt-[550px] -translate-x-1/2">
							<ProductQualifications />
						</div>
					</div>
					<div className=" container relative mx-auto mt-[921px] h-[1189px] w-[1512px] justify-center bg-bg-eco text-gray">
						<p className="container mx-auto w-[753px] pt-[136px] text-center text-[50px] font-semibold leading-[60px] text-dark_brown ">
							Key advantages of selling on Tradewinds Eco
						</p>
						<div className=" absolute left-1/2 mt-[70px] -translate-x-1/2 ">
							<div className="flex space-x-[60px]">
								<div className=" text-center ">
									<div className=" relative mx-auto h-[103px] w-[78px] ">
										<ImageWithErrorHandler
											src="/static/images/EcoPage/why-sell/targeted-audience.png"
											alt=""
											fill={true}
										/>
									</div>
									<div className=" mt-[25px] h-[210px] w-[445px] ">
										<p className=" text-[35px] font-bold ">
											{t('Targeted Audience')}
										</p>

										<p className="  text-[18px]">
											<span className=" font-semibold">
												Access to a Targeted Audience:
											</span>
											Tradewinds Eco provides you with a dedicated
											marketplace that caters specifically to
											eco-conscious buyers. By listing your products
											here, you can connect with a niche audience
											actively seeking sustainable and environmentally
											friendly options.
										</p>
									</div>
								</div>
								<div className=" text-center ">
									<div className=" relative mx-auto h-[92px] w-[92px] ">
										<ImageWithErrorHandler
											src="/static/images/EcoPage/why-sell/enhanced-visibility.png"
											alt=""
											fill={true}
										/>
									</div>
									<div className="mt-[30px] h-[210px] w-[445px]">
										<p className=" text-[35px] font-bold ">
											{t('Enhanced Visibility')}
										</p>
										<p className="  text-[18px]">
											<span className=" font-semibold">
												Enhanced Visibility and Brand Exposure:
											</span>
											With Tradewinds Eco, you can increase the
											visibility of your brand and products within the
											sustainability community. Our platform showcases
											your offerings to a wider audience, helping you
											stand out and attract more potential customers.
										</p>
									</div>
								</div>
								<div className=" text-center ">
									<div className=" container relative mx-auto h-[89px] w-[67px] justify-center ">
										<ImageWithErrorHandler
											src="/static/images/EcoPage/why-sell/aligned-values.png"
											alt=""
											fill={true}
										/>
									</div>
									<div className=" mt-[30px] h-[210px] w-[445px]">
										<p className=" text-[35px] font-bold ">
											{t('Aligned Values')}
										</p>

										<p className=" text-[18px]  ">
											<span className=" font-semibold">
												Align with Sustainable Values:
											</span>
											Selling on Tradewinds Eco allows you to align your
											brand with eco-conscious values and demonstrate
											your commitment to sustainability. This
											association can enhance your brand reputation and
											attract customers who prioritize environmentally
											friendly products.
										</p>
									</div>
								</div>
							</div>
							<div className="container mx-auto mt-[35px] flex justify-center space-x-[60px]">
								<div className=" text-center ">
									<div className=" container relative mx-auto h-[105px] w-[104px] justify-center ">
										<ImageWithErrorHandler
											src="/static/images/EcoPage/why-sell/dedicated-support.png"
											alt=""
											fill={true}
										/>
									</div>
									<div className=" mt-[21px] h-[210px] w-[445px]">
										<p className=" text-[35px] font-bold ">
											{t('Dedicated Support')}
										</p>

										<p className=" text-[18px]  ">
											<span className=" font-semibold">
												Dedicated Support and Resources:
											</span>
											We provide comprehensive suite of tools and
											resources to assist you throughout your selling
											journey.  See all Platform features below.
										</p>
									</div>
								</div>
								<div className=" text-center ">
									<div className=" container relative mx-auto h-[110px] w-[117px] justify-center ">
										<ImageWithErrorHandler
											src="/static/images/EcoPage/why-sell/networking.png"
											alt=""
											fill={true}
										/>
									</div>
									<div className=" mt-[16px] h-[279px] w-[445px]">
										<p className=" text-[35px] font-bold ">
											{t('Networking')}
										</p>
										<p className="text-[18px] font-semibold">
											Networking and Collaboration Opportunities:
										</p>
										<p className=" text-[18px]">
											Tradewinds Eco fosters a community of like-minded
											sellers and buyers who share a common passion for
											sustainability. As a seller on our platform, you
											can connect and collaborate with other eco-focused
											businesses, creating potential partnerships and
											expanding your network
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container mx-auto w-[1336px] text-accent-secondary-eco">
					<div>
						<div className=" mt-[81px] text-center  md:p-8">
							<p className="text-[18px] font-semibold leading-[60px] lg:text-[50px]">
								{t('Platform Features')}
							</p>
						</div>
						<div className="space-y-[96px] text-accent-secondary-eco">
							<div className=" h-[456px] rounded-[10px] bg-bg_gray pt-[58px] pl-[30px]">
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/store-front-img.png"
									title={t('Storefront')}
									className="pl-8"
									containerClassName={leftSideClassName}
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/personalized.png"
										title={t('Personalized Storefront:')}
										subtitle={t('Showcase your products seamlessly.')}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/seo-optimization.png"
										title={t('SEO Optimization:')}
										subtitle={t(
											'Optimize your product listings for SEO with valuable posting recommendations.'
										)}
										imgClassName="hidden md:block"
										className="-ml-4 pt-4 md:-ml-0"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/inventory-management.png"
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
									imageUrl="/eco/why-sell/messaging-center.png"
									title={t('common:messaging_center')}
									subtitle={t(
										'Engage with customers to build strong relationships.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhySellOnTWOperationSubTile
									imageUrl="/eco/why-sell/translation tools.png"
									title={t('translation_tools')}
									subtitle={t(
										'Effortlessly communicate with translated conversations in your preferred languages.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhySellOnTWOperationTile>

							<div className=" h-[456px] rounded-[10px] bg-bg_gray pt-[58px] pl-[30px]">
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/Order Management.png"
									title={t('Order Management')}
									className="pl-8"
									containerClassName={leftSideClassName}
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/invoice.png"
										title={t('Invoice creation:')}
										subtitle={t(
											'Effortlessly send stunning, professional invoices that impress.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/processing.png"
										title={t('Processing Protection:')}
										subtitle={t(
											'Enable secure transactions through Tradewinds Marketplace, fostering trust between buyers and sellers.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/logistics.png"
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
									imageUrl="/eco/why-sell/seamlessly.png"
									title={t('Seamlessly connect with buyers')}
									subtitle={t(
										'Seeking your products and provide quotes to hot leads, revolutionizing your sales process for limitless business opportunities.'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhySellOnTWOperationTile>
							<div className=" h-[456px] rounded-[10px] bg-bg_gray pt-[58px] pl-[30px]">
								<WhySellOnTWOperationTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/Marketing-img.png"
									title={t('Marketing')}
									className="pl-8"
									containerClassName={leftSideClassName}
								>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/sponsored.png"
										title={t('Sponsored campaigns:')}
										subtitle={t(
											'Increase traffic to your storefront and create interest for your products.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/seo-optimization.png"
										title={t('Keyword Advertising:')}
										subtitle={t(
											'Maximize your product visibility by targeting buyers based on their location, browsing history, and more. This helps your products appear higher in relevant searches, attracting more customers.'
										)}
										className="-ml-4 pt-4 md:-ml-0"
										imgClassName="hidden md:block"
									/>
									<WhySellOnTWOperationSubTile
										imageUrl="/eco/why-sell/budget.png"
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
