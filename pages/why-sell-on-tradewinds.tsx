import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import {
	WhyBuyOperationSubTile,
	WhyBuyOperationTile
} from 'components/common/why-buy/why-buy-operation-tile';

const WhySellOnTradewindsPage: NextPage = () => {
	const { t } = useTranslation('why_sell_on_tw');

	const leftSideClassName =
		'md:pr-4 lg:pr-0 border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0';

	return (
		<>
			<Seo title="Why sell on tradewinds page" description="" />
			<div>
				{/* Header */}
				<div className="relative h-[300px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat md:h-[340px] lg:h-[703px]">
					<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>

					{/* content */}
					<div className="4k:left-1/2 4k:-translate-x-1/2 absolute left-20 top-8 z-[50] text-white lg:top-32 lg:w-1/2">
						<h1 className="text-[35px] font-semibold md:text-[40px] lg:text-[50px] ">
							{t('why_sell_on_tradewinds_marketplace')}
						</h1>
						<div className="hidden space-y-2 font-semibold md:block md:text-[16px] lg:text-[25px]">
							<p>{t('unified_trading_experience')}</p>
							<p>
								{t(
									'platform_that_helps_small_and_medium_sized_enterprises_go_global'
								)}
							</p>
							<p>
								{t(
									'connect_with_millions_of_business_buyers_from_around_the_world'
								)}
							</p>
						</div>
						<Button variant="buyer" className="mt-8">
							{t('common:join_now')}
						</Button>
					</div>
				</div>

				<div className="container mx-auto">
					{/* Power is in the Number */}
					<div className="space-y-4">
						<div className="p-4 text-center md:p-8">
							<h2 className="text-[24px] font-semibold text-primary-main md:text-[40px] lg:text-[50px]">
								{t('power_is_in_the_number')}
							</h2>
							<p className="-mt-4 text-[18px] font-semibold text-accent-primary-main md:text-[20px] lg:text-[25px]">
								{t('let_the_sellers_come_to_you')}
							</p>
							<p className="text-[12px] text-gray md:text-[15px]">
								{t('detail_what_youre_looking_for_and_share')}
							</p>
						</div>
						<div className="space-y-4 md:bg-white md:p-8">
							<div className="flex flex-wrap justify-center text-primary-main">
								<div>
									<h3 className="text-[24px] font-semibold md:text-[40px] lg:text-[50px]">
										{t('stand_alone_vs')}
									</h3>
									<p className="hidden w-56 text-[14px] md:block">
										{t('building_a_site_with_similar_feature_as_twmp')}
									</p>
								</div>
								<div>
									<h3 className="text-[24px] font-semibold md:text-[40px] lg:text-[50px]">
										{t('common:tradewinds')}
									</h3>
									<p className="hidden w-56 text-[14px] md:block">
										{t('membership_of_tradewinds_mp')}
									</p>
								</div>
							</div>
							{/* Images for small device */}
							<div className="space-y-8 md:hidden">
								{/* Stand Alone vs. Tradewinds */}
								<div className="bg-white p-8">
									<h3 className="flex flex-col items-center text-gray">
										<span className="text-[96px] font-semibold">
											5x
										</span>
										<span className="text-[25px]">Traffic</span>
									</h3>
									<div className="flex justify-between">
										<div className="space-y-2 text-primary-main">
											<div className="relative h-[95px] w-[119px]">
												<ImageWithErrorHandler
													src="/static/images/why-sell-on-tradewinds-images/non-member.png"
													alt=""
													fill={true}
												/>
											</div>
											<p className="text-center text-[10px]">
												Non Member
											</p>
										</div>
										<div className="space-y-2">
											<div className="relative h-[95px] w-[119px]">
												<ImageWithErrorHandler
													src="/static/images/why-sell-on-tradewinds-images/twmp-member.png"
													alt=""
													fill={true}
												/>
											</div>
											<p className="text-center text-[10px] ">
												TWMP Member
											</p>
										</div>
									</div>
								</div>
								{/* Purchasing Exposure */}
								<div className="space-y-4 p-8">
									<h2 className=" text-center text-[25px]">
										Purchasing Exposure
									</h2>
									<div className="flex justify-between">
										<div className="space-y-2 text-primary-main">
											<div className="relative h-[95px] w-[119px]">
												<ImageWithErrorHandler
													src="/static/images/why-sell-on-tradewinds-images/cart-non-member.png"
													alt=""
													fill={true}
												/>
											</div>
											<p className="text-center text-[10px]">
												Non Member
											</p>
										</div>
										<div className="space-y-2 text-primary-main">
											<div className="relative h-[95px] w-[119px]">
												<ImageWithErrorHandler
													src="/static/images/why-sell-on-tradewinds-images/cart-twmp-member.png"
													alt=""
													fill={true}
												/>
											</div>
											<p className="text-center text-[10px]">
												TWMP Member
											</p>
										</div>
									</div>
								</div>

								{/* Website cost */}
								<div className="bg-white p-8">
									<h3 className="flex flex-col items-center text-gray">
										<span className="text-[96px] font-semibold">
											70%
										</span>
										<span className="text-[25px]">Website Cost</span>
									</h3>
									<div className="flex justify-between">
										<div className="space-y-2 text-primary-main">
											<div className="relative h-[95px] w-[119px]">
												<ImageWithErrorHandler
													src="/static/images/why-sell-on-tradewinds-images/dollar-non-member.png"
													alt=""
													fill={true}
												/>
											</div>
											<p className="text-center text-[10px]">
												Non Member
											</p>
										</div>
										<div className="space-y-2 text-primary-main">
											<div className="relative h-[95px] w-[119px]">
												<ImageWithErrorHandler
													src="/static/images/why-sell-on-tradewinds-images/dollar-twmp-member.png"
													alt=""
													fill={true}
												/>
											</div>
											<p className="text-center text-[10px]">
												TWMP Member
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Images for medium and large screen */}
							<div className="hidden flex-col items-center space-y-4 md:flex">
								<div className="relative h-[174px] md:w-[431px] lg:w-[812px]">
									<ImageWithErrorHandler
										src="/static/images/why-sell-on-tradewinds-images/5x-traffic.png"
										alt=""
										fill={true}
									/>
								</div>
								<div className="flex space-x-4">
									<div className="relative h-[174px] md:w-[361px] lg:w-[690px]">
										<ImageWithErrorHandler
											src="/static/images/why-sell-on-tradewinds-images/6x-purchasing-exposure.png"
											alt=""
											fill={true}
										/>
									</div>
									<div className="relative h-[174px]  md:w-[361px] lg:w-[690px]">
										<ImageWithErrorHandler
											src="/static/images/why-sell-on-tradewinds-images/website-cost.png"
											alt=""
											fill={true}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Why Sell in the  Western Hemisphere?
					 */}
					<div className="relative h-[1080px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-buy.png')] bg-cover bg-center bg-no-repeat md:h-[900px] lg:h-[780px]">
						<div className="absolute inset-0 bg-primary-main opacity-50"></div>
						<div className="z-2 absolute inset-0">
							<div className="space-y-8 py-8 px-8 md:px-24">
								<h2 className="text-center text-[27px] font-semibold text-white md:text-[40px] lg:text-[50px]">
									{t('why_sell_in_the_western_hemisphere')}
								</h2>
								<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
									<div className="flex flex-col items-center text-center">
										<h3 className="text-[50px] font-semibold text-secondary md:text-[55px] lg:text-[99px]">
											{t('331_million')}
										</h3>
										<p className="-mt-4 text-[18px] font-semibold text-white md:text-[20px] lg:text-[25px]">
											{t('largest_market')}
										</p>
										<p className="text-[12px] text-white md:text-[16px] lg:text-[18px]">
											{t(
												'the_us_has_an_open_consumer_market_of_over_331_million_americans'
											)}
										</p>
									</div>
									<div className="flex flex-col items-center text-center">
										<div className="relative h-[95px] w-[147px] md:h-[55px] md:w-[85px] lg:h-[95px] lg:w-[147px]">
											<ImageWithErrorHandler
												src="/static/images/why-sell-on-tradewinds-images/diversity.png"
												alt=""
												fill={true}
											/>
										</div>
										<p className="mt-4 text-[18px]  font-semibold text-white md:text-[20px] lg:text-[25px]">
											{t('diversity')}
										</p>
										<p className="text-[12px] text-white md:text-[16px] lg:text-[18px]">
											{t(
												'the_us_has_an_open_consumer_market_of_over_331_million_americans'
											)}
										</p>
									</div>
									<div className="flex flex-col items-center text-center">
										<div className="relative h-[107px] w-[107px] md:h-[52px] md:w-[52px] lg:h-[107px] lg:w-[107px]">
											<ImageWithErrorHandler
												src="/static/images/why-sell-on-tradewinds-images/free-trade.png"
												alt=""
												fill={true}
											/>
										</div>
										<p className="mt-4 font-semibold text-white md:text-[20px] lg:text-[25px]">
											{t('common:free_trade')}
										</p>
										<p className=" text-white md:text-[16px] lg:text-[18px]">
											{t(
												'there_are_more_than_100_regional_trade_agreements_in_the_western_hemisphere._the_u.s._currently_has_14_free_trade_agreements_with_20_countries'
											)}
										</p>
									</div>
									<div className="text-center">
										<h3 className="text-[50px] font-semibold text-secondary md:text-[55px] lg:text-[99px]">
											{t('1_point_9_trillion')}
										</h3>
										<p className="-mt-4 text-[18px]  font-semibold text-white md:text-[20px] lg:text-[25px]">
											{t('active_buyers')}
										</p>
										<p className="text-[12px] text-white md:text-[16px] lg:text-[18px]">
											{t(
												'the_us_has_an_active_internet_user_base_of_284_million'
											)}
										</p>
									</div>
								</div>
								<div className="flex justify-center">
									<Button variant="special">
										{t('common:join_now')}
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* B2B tools to simplify your operations */}
					<div className="bg-white">
						<div className="space-y-8 p-4 text-center text-primary-main md:p-8">
							<div>
								<h2 className="text-[24px] font-semibold md:text-[40px] lg:text-[50px]">
									{t('b2b_tools_to_simplify_your_operations')}
								</h2>
								<p className="text-[18px] md:font-semibold lg:text-[25px]">
									{t(
										'innovative_digital_tools_that_transform_the_wholesale_experience'
									)}
								</p>
							</div>
							<Button variant="buyer">{t('common:buy_now')}</Button>
						</div>

						<div className="space-y-8">
							<WhyBuyOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/custom-store-front.png"
								title={t(
									'custom_storefront_set_up_a_store_that_showcases_your_products'
								)}
								className="pl-8"
								containerClassName={leftSideClassName}
							>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
									title={t('digital_storefront')}
									subtitle={t(
										'create_a_digital_identity_that_helps_you_brand_your_business_and_showcase_your_capabilities'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/smart-product-posting.png"
									title={t('smart_product_posting')}
									subtitle={t(
										'optimize_your_product_listings_for_seo_with_posting_suggestions_based_on__titles'
									)}
									imgClassName="hidden md:block"
									className="-ml-4 pt-4 md:-ml-0"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png"
									title={t('common:dynamic_pricing')}
									subtitle={t('negotiate_pricing_with_seller')}
									imgClassName="hidden md:block"
									className="-ml-4 pt-4 md:-ml-0"
								/>
							</WhyBuyOperationTile>
							<WhyBuyOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/communication-center.png"
								title={t('common:communication_center')}
								subtitle={t(
									'connect_freely_to_build_lasting_relationships'
								)}
								className="pl-8"
								containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
							>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/messaging-center.png"
									title={t('common:messaging_center')}
									subtitle={t(
										'interact_with_customers_on_your_terms_and__to_foster_loyalty_and_repeat_sales_and_track_leads_and_orders_all_in_one_place'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/translation-tool.png"
									title={t('translation_tools')}
									subtitle={t(
										'communicate_seamlessly_with_conversations_translated_into__choice_languages'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
									title={t('common:request_for_quotation_rfq')}
									subtitle={t(
										'post_a_rfq_and_proactively_find_and_connect_with_sellers_with_products_you_are_sourcing'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhyBuyOperationTile>
							<WhyBuyOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/rfq.png"
								title={t('common:request_for_quotation_rfq')}
								subtitle={t(
									'create_a_digital_storefront_and_get_your_brand_seen_globally'
								)}
								className="pl-8"
								containerClassName={leftSideClassName}
							>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
									title={t('digital_storefront')}
									subtitle={t(
										'create_a_digital_identity_that_helps_you_brand_your_business_and_showcase_your_capabilities'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/smart-product-posting.png"
									title={t('smart_product_posting')}
									subtitle={t(
										'optimize_your_product_listings_for_seo_with_posting_suggestions_based_on__titles'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png"
									title={t('common:dynamic_pricing')}
									subtitle={t('negotiate_pricing_with_seller')}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhyBuyOperationTile>
							<WhyBuyOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/marketing.png"
								title={t('marketing')}
								subtitle={t(
									'find_the_right_buyers_for_your_products_and_market_directly_to_them_with_tools_to_increase_exposure_and_conversions'
								)}
								className="pl-8"
								containerClassName="md:pr-4 lg:pr-0 lg:border-b-0 border-gray/40 pb-8 lg:pb-0 lg:flex-row-reverse border-b"
							>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/sponsored-campaigns.png"
									title={t('sponsored_campaigns')}
									subtitle={t(
										'increase_traffic_to_your_storefront_and_create_interest_for_your_products'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/keyword-advertising.png"
									title={t('keyword_advertising')}
									subtitle={t(
										'keyword_advertising_is_a_value_added_service_available_to_twmp_members'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/pay-by-click.png"
									title={t('pay_by_click')}
									subtitle={t(
										'pay_only_when_a_buyer_clicks_on_your_product'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/budget-control.png"
									title={t('budget_control')}
									subtitle={t(
										'meet_your_advertising_expectations_according_to_your_desired_budget'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/analytics.png"
									title={t('common:analytics')}
									subtitle={t(
										'meet_your_advertising_expectations_according_to_your_desired_budget'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhyBuyOperationTile>
							<WhyBuyOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/order-management.png"
								title={t('order_management')}
								subtitle={
									<>
										<p>{t('manage_every_step_in_one_place')}</p>
										<p className="text-[18px]">
											{t('take_advantage_of_on')}
										</p>
									</>
								}
								className="pl-8"
								containerClassName={leftSideClassName}
							>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/invoice.png"
									title={t('invoice_creation')}
									subtitle={t(
										'send_beautifully_branded_invoices_with_minimum_effort_and_maximum_professionalism'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/processing-protection.png"
									title={t('processing_protection')}
									subtitle={t(
										'accept_secure_customer_payments_through_twmp'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/payments.png"
									title={t('payments')}
									subtitle={t(
										'facilitate_secure_payments_through_financing_services'
									)}
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/logistics-and-fulfillment.png"
									title={t('common:logistics_and_fulfillment')}
									subtitle={t(
										'leverage_flexible_shipping_rates_that_enable_you_to_use_twmp'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhyBuyOperationTile>
							<WhyBuyOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/marketing.png"
								title={t('common:analytics')}
								subtitle={t(
									'continuously_improve_your_store_and_sales'
								)}
								className="pl-8"
								containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
							>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/dashboards.png"
									title={t('dashboards')}
									subtitle={t(
										'i_visualize_your_store’s_metrics_and_historical_data'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
								<WhyBuyOperationSubTile
									imageUrl="/static/images/why-sell-on-tradewinds-images/industry-analytics.png"
									title={t('industry_analytics')}
									subtitle={t(
										'understand_the_state_of_your_category_and_which_products_perform_best_through_demand_analysis'
									)}
									className="-ml-4 pt-4 md:-ml-0"
									imgClassName="hidden md:block"
								/>
							</WhyBuyOperationTile>
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
