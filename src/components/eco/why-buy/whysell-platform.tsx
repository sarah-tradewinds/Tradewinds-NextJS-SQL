interface platformprops {
	mainClass: string;
	class1: string;
	case1: boolean;
}

// Third party packages
import { useTranslation } from 'next-i18next';

import {
	WhySellOnTWOperationSubTile,
	WhySellOnTWOperationTile
} from 'components/common/why-sell-on-tradewinds/why-sell-on-tradewinds-tile';

const WhySellPlatform: React.FC<platformprops> = (props) => {
	const { mainClass, case1, class1 } = props;
	const leftSideClassName = 'md:pr-4 lg:pr-0  pb-8 lg:pb-0';
	const { t } = useTranslation('why_sell_on_tw');
	return (
		<div
			className={`${mainClass} mx-auto w-full  pb-[40px]  sm:w-[620px] md:w-[745px] lg:w-[994px] desktop:w-[1466px]`}
		>
			<div className="w-[277px]s mx-auto sm:w-[566px]  md:container md:w-[680px] lg:w-[907px] desktop:w-[1336px]">
				<div>
					<div className=" pt-[15px] text-center sm:pt-[13px] md:pt-[16px] lg:pt-[31px]  desktop:pt-[75px] ">
						<p className="text-[15px] font-semibold leading-[18px] sm:text-[15px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[25px] lg:leading-[30px] desktop:text-[50px] desktop:leading-[60px]">
							{t('platform_features')}
						</p>
					</div>
					<div className="mt-[20px] space-y-[20px] sm:mt-[19px] sm:space-y-[41px] md:mt-[23px] md:space-y-[49px] lg:mt-[38px] lg:space-y-[65px] desktop:mt-[71px] desktop:space-y-[96px]">
						<div
							className={`${class1} h-[375px] rounded-[10px] pl-[13px] pt-[20px] sm:h-[193px] sm:pl-[13px] sm:pt-[25px] md:h-[232px] md:pl-[15px] md:pt-[29px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]`}
						>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/store-front-img.webp"
								title={t('storefront')}
								className=" pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
								containerClassName={leftSideClassName}
							>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/personalized.png'
											: '/static/images/why-sell-on-tradewinds-images/store-front.png'
									}
									title={t('personalized_storefront')}
									subtitle={t('showcase_your_products_seamlessly')}
									className=" "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/seo-optimization.png'
											: '/static/images/why-sell-on-tradewinds-images/keyword-advertising.png'
									}
									title={t('seo_optimization')}
									subtitle={t(
										'optimize_your_product_listings_for_SEO_with_valuable_posting_recommendations'
									)}
									className="  "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/inventory-management.png'
											: '/static/images/why-sell-on-tradewinds-images/inventory.png'
									}
									title={t('inventory_management')}
									subtitle={t(
										'track_inventory_from_purchase_to_the_sale_of_goods. individual sale.'
									)}
									className=" "
								/>
							</WhySellOnTWOperationTile>
						</div>

						<WhySellOnTWOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/communication.webp"
							title={t('common:communication_center')}
							className="pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
							containerClassName="md:pr-4 lg:pr-0 sm:flex-row-reverse md:flex-row-reverse lg:flex-row-reverse  pb-8 lg:pb-0"
						>
							<WhySellOnTWOperationSubTile
								imageUrl={
									case1
										? '/eco/why-sell/messaging-center.png'
										: '/static/images/why-sell-on-tradewinds-images/messaging-center.png'
								}
								title={t('common:messaging_center')}
								subtitle={t(
									'engage_with_customers_to_build_strong_relationships'
								)}
								className=" "
							/>
							<WhySellOnTWOperationSubTile
								imageUrl={
									case1
										? '/eco/why-sell/translation tools.png'
										: '/static/images/why-sell-on-tradewinds-images/Translation tools-icon.png'
								}
								title={t('translation_tools')}
								subtitle={t(
									'effortlessly_communicate_with_translated_conversations_in_your_preferred_languages'
								)}
								className=" "
							/>
						</WhySellOnTWOperationTile>

						<div
							className={`${class1} h-[460px] rounded-[10px]  pl-[13px] pt-[20px] sm:h-[238px] sm:pl-[13px] sm:pt-[0px] md:h-[292px] md:pl-[15px] md:pt-[12px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]`}
						>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/Order Management.webp"
								title={t('common:order_management')}
								className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
								containerClassName={leftSideClassName}
							>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/invoice.png'
											: '/static/images/why-sell-on-tradewinds-images/invoice.png'
									}
									title={t('invoice_creation')}
									subtitle={t(
										'effortlessly_send_stunning,_professional_invoices_that_impress'
									)}
									className="  "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/processing.png'
											: '/static/images/why-sell-on-tradewinds-images/proccessing.png'
									}
									title={t('processing_protection')}
									subtitle={t(
										'enable_secure_transactions_through_tradewinds_marketplace,_fostering_trust_between_buyers_and_sellers.'
									)}
									className=" "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/logistics.png'
											: '/static/images/why-sell-on-tradewinds-images/logistics.png'
									}
									title={t('logistics: ')}
									subtitle={t(
										'effortlessly_streamline_your_logistics_and_fulfillment_using_our_advanced_Fulfillment_Manager'
									)}
									className=" "
								/>
							</WhySellOnTWOperationTile>
						</div>

						<WhySellOnTWOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/RFQ-tool.webp"
							title={t('rfq_tool-Request_for_quotation')}
							className="pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
							containerClassName="md:pr-4 lg:pr-0 sm:flex-row-reverse md:flex-row-reverse  pb-8 lg:pb-0 lg:flex-row-reverse "
						>
							<WhySellOnTWOperationSubTile
								imageUrl={
									case1
										? '/eco/why-sell/seamlessly.png'
										: '/static/images/why-sell-on-tradewinds-images/rfq-icon.png'
								}
								title={t('seamlessly_connect_with_buyers')}
								subtitle={t(
									'seeking_your_products_and_provide_quotes_to_hot_leads,_revolutionizing_your_sales_process for limitless business opportunities.'
								)}
								className="  "
							/>
						</WhySellOnTWOperationTile>

						<div
							className={`${class1} h-[457px] rounded-[10px]  pl-[13px] pt-[20px] sm:h-[237px] sm:pl-[13px] sm:pt-[0px] md:h-[295px] md:pl-[15px] md:pt-[12px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]`}
						>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/Marketing-img.webp"
								title={t('marketing')}
								className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
								containerClassName={leftSideClassName}
							>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/sponsored.png'
											: '/static/images/why-sell-on-tradewinds-images/sponsored-campaigns.png'
									}
									title={t('sponsored_campaigns')}
									subtitle={t(
										'increase_traffic_to_your_storefront_and_create_interest_for_your_products'
									)}
									className="  "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/seo-optimization.png'
											: '/static/images/why-sell-on-tradewinds-images/keyword-advertising.png'
									}
									title={t('keyword_advertising')}
									subtitle={t(
										'maximize_your_product_visibility_by_targeting_buyers_based_on_their_location,_browsing_history,_and more. This helps your products appear higher in relevant searches, attracting more customers.'
									)}
									className=" "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/budget.png'
											: '/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png'
									}
									title={t('budget_control')}
									subtitle={t(
										'customize_your_advertising_parameters_to_align_with_your_preferred_budget_and_achieve_your marketing goals.'
									)}
								/>
							</WhySellOnTWOperationTile>
						</div>

						<WhySellOnTWOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/analytics-img.webp"
							title={t('common:analytics')}
							className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
							containerClassName="md:pr-4 sm:flex-row-reverse md:flex-row-reverse  lg:pr-0 lg:flex-row-reverse  pb-8 lg:pb-0"
						>
							<WhySellOnTWOperationSubTile
								imageUrl={
									case1
										? '/eco/why-sell/dashboard.png'
										: '/static/images/why-sell-on-tradewinds-images/dashboards.png'
								}
								title={t('dashboards')}
								subtitle={t(
									'unleash_the_power_of_data_visualization_to_track_your_store_metrics,_analyze_historical data, and receive intelligent suggestions based on platform insights.'
								)}
								className=" "
							/>
							<WhySellOnTWOperationSubTile
								imageUrl={
									case1
										? '/eco/why-sell/industry.png'
										: '/static/images/why-sell-on-tradewinds-images/analytics.png'
								}
								title={t('industry_analytics')}
								subtitle={t(
									'gain_valuable_insights_into_product_performance_through_in-depth_demand_analysis, trend evaluation, price comparisons, and more.'
								)}
								className=" "
							/>
						</WhySellOnTWOperationTile>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhySellPlatform;
