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
			className={`${mainClass} mx-auto w-[300px]  pb-[40px]  sm:w-[620px] md:w-[745px] lg:w-[994px] desktop:w-[1466px]`}
		>
			<div className="container mx-auto w-[277px]  sm:w-[566px] md:w-[680px] lg:w-[907px] desktop:w-[1336px]">
				<div>
					<div className=" pt-[15px] text-center sm:pt-[13px] md:pt-[16px] lg:pt-[31px]  desktop:pt-[75px] ">
						<p className="text-[15px] font-semibold leading-[18px] sm:text-[15px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[25px] lg:leading-[30px] desktop:text-[50px] desktop:leading-[60px]">
							{t('Platform Features')}
						</p>
					</div>
					<div className="mt-[20px] space-y-[20px] sm:mt-[19px]  sm:space-y-[41px] md:mt-[23px] md:space-y-[49px] lg:mt-[38px] lg:space-y-[65px] desktop:mt-[71px] desktop:space-y-[96px]">
						<div
							className={`${class1} h-[375px] rounded-[10px] pl-[13px] pt-[20px] sm:h-[193px] sm:pl-[13px] sm:pt-[25px] md:h-[232px] md:pl-[15px] md:pt-[29px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]`}
						>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/store-front-img.png"
								title={t('Storefront')}
								className=" pl-[4px] sm:pl-[20px] md:pl-[13px] lg:pl-[32px] desktop:pl-8"
								containerClassName={leftSideClassName}
							>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/personalized.png'
											: '/static/images/why-sell-on-tradewinds-images/store-front.png'
									}
									title="Personalized Storefront"
									subtitle={t('Showcase your products seamlessly.')}
									className=" "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/seo-optimization.png'
											: '/static/images/why-sell-on-tradewinds-images/keyword-advertising.png'
									}
									title={t('SEO Optimization:')}
									subtitle={t(
										'Optimize your product listings for SEO with valuable posting recommendations.'
									)}
									className="  "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/inventory-management.png'
											: '/static/images/why-sell-on-tradewinds-images/inventory.png'
									}
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
								imageUrl={
									case1
										? '/eco/why-sell/messaging-center.png'
										: '/static/images/why-sell-on-tradewinds-images/messaging-center.png'
								}
								title={t('common:messaging_center')}
								subtitle={t(
									'Engage with customers to build strong relationships.'
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
									'Effortlessly communicate with translated conversations in your preferred languages.'
								)}
								className=" "
							/>
						</WhySellOnTWOperationTile>

						<div
							className={`${class1} h-[450px] rounded-[10px]  pl-[13px] pt-[20px] sm:h-[218px] sm:pl-[13px] sm:pt-[0px] md:h-[262px] md:pl-[15px] md:pt-[12px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]`}
						>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/Order Management.png"
								title={t('Order Management')}
								className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
								containerClassName={leftSideClassName}
							>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/invoice.png'
											: '/static/images/why-sell-on-tradewinds-images/invoice.png'
									}
									title={t('Invoice creation:')}
									subtitle={t(
										'Effortlessly send stunning, professional invoices that impress.'
									)}
									className="  "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/processing.png'
											: '/static/images/why-sell-on-tradewinds-images/proccessing.png'
									}
									title={t('Processing Protection:')}
									subtitle={t(
										'Enable secure transactions through Tradewinds Marketplace, fostering trust between buyers and sellers.'
									)}
									className=" "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/logistics.png'
											: '/static/images/why-sell-on-tradewinds-images/logistics.png'
									}
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
								imageUrl={
									case1
										? '/eco/why-sell/seamlessly.png'
										: '/static/images/why-sell-on-tradewinds-images/rfq-icon.png'
								}
								title={t('Seamlessly connect with buyers')}
								subtitle={t(
									'Seeking your products and provide quotes to hot leads, revolutionizing your sales process for limitless business opportunities.'
								)}
								className="  "
							/>
						</WhySellOnTWOperationTile>
						<div
							className={`${class1} h-[457px] rounded-[10px]  pl-[13px] pt-[20px] sm:h-[237px] sm:pl-[13px] sm:pt-[0px] md:h-[285px] md:pl-[15px] md:pt-[12px] lg:h-[310px] lg:pl-[19px] lg:pt-[39px] desktop:h-[456px] desktop:pl-[30px] desktop:pt-[58px]`}
						>
							<WhySellOnTWOperationTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/Marketing-img.png"
								title={t('Marketing')}
								className="pl-[4px] sm:pl-[20px] md:pl-[13px]  lg:pl-[32px] desktop:pl-8"
								containerClassName={leftSideClassName}
							>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/sponsored.png'
											: '/static/images/why-sell-on-tradewinds-images/sponsored-campaigns.png'
									}
									title={t('Sponsored campaigns:')}
									subtitle={t(
										'Increase traffic to your storefront and create interest for your products.'
									)}
									className="  "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/seo-optimization.png'
											: '/static/images/why-sell-on-tradewinds-images/keyword-advertising.png'
									}
									title={t('Keyword Advertising:')}
									subtitle={t(
										'Maximize your product visibility by targeting buyers based on their location, browsing history, and more. This helps your products appear higher in relevant searches, attracting more customers.'
									)}
									className=" "
								/>
								<WhySellOnTWOperationSubTile
									imageUrl={
										case1
											? '/eco/why-sell/budget.png'
											: '/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png'
									}
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
								imageUrl={
									case1
										? '/eco/why-sell/dashboard.png'
										: '/static/images/why-sell-on-tradewinds-images/dashboards.png'
								}
								title={t('dashboards')}
								subtitle={t(
									'Unleash the power of data visualization to track your store metrics, analyze historical data, and receive intelligent suggestions based on platform insights.'
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
									'Gain valuable insights into product performance through in-depth demand analysis, trend evaluation, price comparisons, and more.'
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
