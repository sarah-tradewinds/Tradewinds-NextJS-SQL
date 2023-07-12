import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Seo from 'components/common/seo';
import KeyAdvantageComponent from 'components/eco/why-buy/keyadvantagecomponent';
import ProductQualifications from 'components/eco/why-buy/product-qualifications';
import WhySellPlatform from 'components/eco/why-buy/whysell-platform';
const WhySellOnTradewindsPage: NextPage = () => {
	const { t } = useTranslation('why_sell_on_tw');

	const leftSideClassName =
		'md:pr-4 lg:pr-0 border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0';

	const gotoSellerSignup = () => {
		window?.open(
			`${process.env.SELLER_DASHBOARD_SITE_URL}/eco/seller-registration`,
			'__blank'
		);
	}; // End of gotoSellerSignup

	return (
		<>
			<Seo title="Why sell on tradewinds" description="" />
			<div className=" bg-light_gray ">
				<div>
					{/* Header */}
					<div className=" w-full bg-header-bar">
						{/* <div className="relative mx-auto h-[203px] w-[300px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat sm:h-[298px] sm:w-[640px] md:h-[358px] md:w-[768px] lg:h-[478px] lg:w-[1025px] desktop:h-[703px] desktop:w-[1512px]">
							<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>
							<div className="absolute z-[50] ml-[16px] mt-[19px] text-white sm:ml-[37px] sm:mt-[60px] md:ml-[44px] md:mt-[71px] lg:ml-[59px] lg:mt-[95px] desktop:ml-[87px] desktop:mt-[137px] ">
								<p className=" w-[160px] text-[15px] font-semibold sm:w-[160px] sm:text-[15px] md:w-[240px] md:text-[24px] lg:w-[400px] lg:text-[32px] lg:leading-[39px] desktop:w-[566px] desktop:text-[50px] desktop:leading-[51px]">
									Discover Sustainable e-commerce with Tradewinds Eco.
								</p>

								<p className=" mt-[8px] w-[187px] text-[12px] font-semibold leading-[14px] sm:mt-[11px] sm:ml-[5px] sm:w-[242px] sm:text-[12px] sm:leading-[15px] md:mt-[9px] md:ml-[7px] md:w-[300px] md:text-[15px] md:leading-[18px] lg:mt-[14px] lg:ml-[7px] lg:w-[357px] lg:text-[18px] lg:leading-[21px] desktop:mt-[10px] desktop:ml-[8px] desktop:w-[570px] desktop:text-[25px] desktop:leading-[30px]">
									Explore environmentally focused products, support
									ethical brands, and make a positive impact on the
									planet.
								</p>

								<div className="mt-[24px] ml-[37px]  sm:mt-[17px] sm:ml-[24px] md:mt-[21px] md:ml-[30px] lg:mt-[34px] lg:ml-[39px] desktop:mt-[30px] desktop:ml-[67px]">
									<button className=" h-[13px] w-[73px] rounded-lg bg-secondary text-[6px] font-medium sm:h-[25px] sm:w-[135px] sm:text-[10px] md:h-[30px] md:w-[162px] md:text-[13px] lg:h-[40px] lg:w-[216px] lg:text-[17px] desktop:h-[60px] desktop:w-[319px] desktop:text-[25px] ">
										{t('common:join_now')}
									</button>
								</div>
							</div>
						</div>
						<div className=" lg:mt-[px] desktop:-mt-[152px]">
							<ProductQualifications />
						</div> */}
						<div className="relative mx-auto h-[203px] w-[300px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat  sm:h-[298px] sm:w-[640px] md:h-[358px] md:w-[768px] lg:h-[478px] lg:w-[1025px] desktop:h-[703px] desktop:w-[1512px]">
							<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>
							<div className="absolute z-[50] ml-[16px] mt-[19px] text-white sm:ml-[36px] sm:mt-[60px] md:ml-[44px] md:mt-[35px] lg:ml-[59px] lg:mt-[58px] desktop:ml-[87px] desktop:mt-[137px]">
								<p className="text-[15px] font-semibold leading-[18px] sm:w-[283px] sm:text-[15px] sm:leading-[18px] md:w-[273px] md:text-[24px] md:leading-[29px] lg:w-[380px] lg:text-[32px] lg:leading-[39px] desktop:w-[566px] desktop:text-[50px] desktop:leading-[51px]">
									Discover Sustainable e-commerce with Tradewinds Eco.
								</p>
								<p className=" mt-[2px] ml-0 w-[187px] text-[12px] font-semibold leading-[15px] sm:mt-[7px] sm:ml-[0px] sm:w-[288px] sm:text-[12px] sm:leading-[15px] md:mt-[15px]  md:ml-[5px] md:w-[300px] md:text-[15px] md:leading-[21px] lg:mt-[14px] lg:ml-[7px] lg:w-[307px] lg:text-[18px] lg:leading-[18px] desktop:mt-[10px] desktop:ml-[8px] desktop:w-[570px] desktop:text-[25px] desktop:leading-[30px]">
									Explore environmentally focused products, support
									ethical brands, and make a positive impact on the
									planet.
								</p>
								<div className="mt-[14px] ml-[36px] sm:mt-[27px] sm:ml-[31px] md:mt-[18px] md:ml-[35px] lg:mt-[23px] lg:ml-[39px] desktop:mt-[30px] desktop:ml-[67px]">
									<button
										onClick={gotoSellerSignup}
										className=" h-[13px] w-[73px] rounded-sm bg-secondary text-[6px] font-medium sm:h-[25px] sm:w-[135px] sm:rounded-sm sm:text-[10px] md:h-[30px] md:w-[162px] md:rounded-md md:text-[13px] lg:h-[40px] lg:w-[216px] lg:rounded-lg lg:text-[17px] desktop:h-[60px] desktop:w-[319px] desktop:rounded-lg desktop:text-[25px] "
									>
										{t('common:join_now')}
									</button>
								</div>
							</div>
							<div className=" absolute left-1/2 z-50 mt-[203px] -translate-x-1/2 sm:mt-[232px] md:mt-[279px] lg:mt-[373px] desktop:mt-[549px]">
								<ProductQualifications />
							</div>
						</div>
						<div className=" container relative mx-auto mt-[755px] h-[975px] w-[300px] justify-center bg-bg-eco text-gray sm:mt-[447px] sm:h-[526px] sm:w-[640px] md:mt-[550px] md:h-[680px] md:w-[768px] lg:mt-[708px] lg:h-[780px] lg:w-[1025px] desktop:mt-[1015px] desktop:h-[1189px] desktop:w-[1512px]">
							<p className="container mx-auto w-[300px] pt-[22px] text-center text-[15px] font-semibold leading-[18px] text-dark_brown sm:w-[563px] sm:pt-[35px] sm:text-[15px] sm:leading-[18px] md:w-[768px] md:pt-[39px] md:text-[18px] md:leading-[21px] lg:w-[1025px] lg:pt-[41px] lg:text-[30px] lg:leading-[37px] desktop:w-[753px] desktop:pt-[136px] desktop:text-[50px] desktop:leading-[60px] ">
								Key advantages of selling on Tradewinds Eco
							</p>
							<div className=" absolute left-1/2 mt-[0px] -translate-x-1/2 sm:mt-[30px] md:mt-[38px] lg:mt-[38px] desktop:mt-[70px] ">
								<div className="block sm:!flex sm:space-x-[18px] md:space-x-[23px] lg:space-x-[42px] desktop:space-x-[69px]">
									<KeyAdvantageComponent
										imgUrl="/static/images/EcoPage/why-sell/targeted-audience.png"
										imgClass="h-[34px] w-[26px] sm:h-[34px] sm:w-[26px] md:h-[44px] md:w-[34px] lg:h-[62px] lg:w-[47px] desktop:h-[103px] desktop:w-[78px]"
										title="Targeted Audience"
										descriptionHead="Access to a Targeted Audience:"
										description="Tradewinds Eco provides you with a dedicated
											marketplace that caters specifically to
											eco-conscious buyers. By listing your products
											here, you can connect with a niche audience
											actively seeking sustainable and environmentally
											friendly options."
									/>
									<KeyAdvantageComponent
										imgUrl="/static/images/EcoPage/why-sell/enhanced-visibility.png"
										imgClass="h-[31px] w-[31px] sm:h-[31px] sm:w-[31px] md:h-[40px] md:w-[40px] lg:h-[56px] lg:w-[56px] desktop:h-[92px] desktop:w-[92px]"
										title="Enhanced Visibility"
										descriptionHead="Enhanced Visibility and Brand Exposure:"
										description="With Tradewinds Eco, you can increase the
											visibility of your brand and products within the
											sustainability community. Our platform showcases
											your offerings to a wider audience, helping you
											stand out and attract more potential customers."
									/>
									<KeyAdvantageComponent
										imgUrl="/static/images/EcoPage/why-sell/aligned-values.png"
										imgClass="h-[30px] w-[22px] sm:h-[30px] sm:w-[22px] md:h-[38px] md:w-[29px] lg:h-[54px] lg:w-[40px] desktop:h-[89px] desktop:w-[67px]"
										title="Aligned Values"
										descriptionHead="Align with Sustainable Values:"
										description="Selling on Tradewinds Eco allows you to align your
											brand with eco-conscious values and demonstrate
											your commitment to sustainability. This
											association can enhance your brand reputation and
											attract customers who prioritize environmentally
											friendly products."
									/>
								</div>
								<div className="container mx-auto block justify-center sm:mt-[21px] sm:!flex sm:space-x-[32px] md:mt-[55px] md:space-x-[45px] lg:mt-[45px] lg:space-x-[60px] desktop:mt-[35px] desktop:space-x-[99px]">
									<KeyAdvantageComponent
										imgUrl="/static/images/EcoPage/why-sell/dedicated-support.png"
										imgClass="h-[35px] w-[35px] sm:h-[35px] sm:w-[35px] md:h-[45px] md:w-[45px] lg:h-[63px] lg:w-[63px] desktop:h-[105px] desktop:w-[104px]"
										title="Dedicated Support"
										descriptionHead="Dedicated Support and Resources:"
										description="We provide comprehensive suite of tools and
											resources to assist you throughout your selling
											journey. See all Platform features below."
									/>
									<KeyAdvantageComponent
										imgUrl="/static/images/EcoPage/why-sell/networking.png"
										imgClass="h-[39px] w-[36px] sm:h-[39px] sm:w-[36px] md:h-[48px] md:w-[51px] lg:h-[67px] lg:w-[71px] desktop:h-[110px] desktop:w-[117px]"
										title="Networking"
										descriptionHead="Networking and Collaboration Opportunities:"
										description="Tradewinds Eco fosters a community of like-minded
											sellers and buyers who share a common passion for
											sustainability. As a seller on our platform, you
											can connect and collaborate with other eco-focused
											businesses, creating potential partnerships and
											expanding your network"
									/>
								</div>
							</div>
						</div>
						{/* </div>

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
					</div> */}
					</div>
				</div>
				<WhySellPlatform
					mainClass="text-accent-secondary-eco bg-light_gray"
					class1="bg-header-bar"
					case1={true}
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
