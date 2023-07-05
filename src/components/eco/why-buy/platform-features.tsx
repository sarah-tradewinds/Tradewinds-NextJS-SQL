import {
	WhySellOnTWOperationSubTile,
	WhySellOnTWOperationTile
} from 'components/common/why-sell-on-tradewinds/why-sell-on-tradewinds-tile';

function PlatformFeatures() {
	const leftSideClassName =
		'md:pr-4 lg:pr-0 border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0';

	function t(arg0: string): string {
		throw new Error('Function not implemented.');
	}

	return (
		<div className="container mx-auto w-[1336px]">
			<div>
				<div className=" mt-[81px] text-center text-primary-main md:p-8">
					<p className="text-[18px] font-semibold leading-[60px] lg:text-[50px]">
						{t('Platform Features')}
					</p>
				</div>
				<div className="space-y-[96px]">
					<div className=" h-[456px] rounded-[10px] bg-bg_gray pt-[58px] pl-[30px]">
						<WhySellOnTWOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/store-front-img.png"
							title={t('Storefront')}
							className="pl-8"
							containerClassName={leftSideClassName}
						>
							<WhySellOnTWOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
								title={t('Personalized Storefront:')}
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

					<div className=" h-[456px] rounded-[10px] bg-bg_gray pt-[58px] pl-[30px]">
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
					<div className=" h-[456px] rounded-[10px] bg-bg_gray pt-[58px] pl-[30px]">
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
	);
}

export default PlatformFeatures;
