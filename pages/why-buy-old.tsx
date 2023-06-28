import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import {
	WhyBuyOperationSubTile,
	WhyBuyOperationTile
} from 'components/common/why-buy/why-buy-operation-tile';
import WhyBuyTile from 'components/common/why-buy/why-buy-tile';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');

	return (
		<>
			<Seo title="Why buy page" description="" />

			{/* Header section */}
			<div className="h-[263px] bg-[url('/static/images/WhyBuyImages/why-buy-header.png')] bg-cover bg-no-repeat md:h-[318px] lg:h-[680px]">
				<div className="4k:py-16 container mx-auto flex justify-end p-16">
					<div className="4k:w-auto md:w-1/2">
						<h1 className="text-[35px] font-semibold text-white md:text-[40px] lg:w-3/4 lg:text-[50px] lg:leading-[51px] lg:text-gray">
							{t('why_buy_on_tradewinds_marketplace')}
						</h1>
						{/* Content */}
						<div className="hidden grid-cols-2 gap-4 lg:grid">
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									{t('verified_sellers')}
								</h2>
								<p className="text-sm">
									{t(
										'wide_assortment_of_product_from_reliable_sellers_in'
									)}
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									{t('buy_with_confidence')}
								</h2>
								<p className="text-sm">
									{t(
										'buying_from_a_new_seller_over_the_internet_can_feel_a_bit_risky_at_first'
									)}
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									{t('net_terms')}
								</h2>
								<p className="text-sm">
									{t('twmp_offers_real_time_financing ')}
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									{t('cost_effective')}
								</h2>
								<p className="text-sm">
									{t('lower_cost_to_maximize_your_profit')}
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									{t('bring_your_ideas_to_life')}
								</h2>
								<p className="text-sm">
									{t('start_grow_your_business_with_confidence')}
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									{t('let_the_sellers_come_to_you')}
								</h2>
								<p className="text-sm">
									{t(
										"detail_what_you're_looking_for_and_share_it_in_the_request_for_quotation"
									)}
								</p>
							</div>
						</div>
						<div className="mt-4 hidden text-center lg:block">
							<Button variant="buyer">{t('common:join_now')}</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto">
				{/* Display only on small and medium */}
				<div className="lg:hidden">
					{/* Buyer platform features */}
					<div className="space-y-4 bg-white p-6 md:space-y-8 md:p-8 lg:hidden">
						<div className="md:text-center ">
							<h2 className="text-[18px] font-semibold text-primary-main">
								{t('buyer_platform_features')}
							</h2>
							<p>{t('browse_and_choose_from_millions_of_products')}</p>
						</div>

						<div className="grid gap-4 md:grid-cols-3 md:gap-8">
							<p className="text-[12px]">
								<span className="font-semibold text-primary-main">
									{t('millions_of_products_to_choose_from_twmp')}
								</span>
								<span className="text-gray">
									{t(
										'provides_a_wide_variety_of_products_to_choose_from_giving_buyers_the_flexibility_to_choose_the_seller_and_items_best_suited_for_them'
									)}
								</span>
							</p>
							<p className="text-[12px]">
								<span className="font-semibold text-primary-main">
									{t('millions_of_products_to_choose_from_twmp')}{' '}
								</span>
								<span className="text-gray">
									{t(
										'provides_a_wide_variety_of_products_to_choose_from_giving_buyers_the_flexibility_to_choose_the_seller_and_items_best_suited_for_them'
									)}
								</span>
							</p>
							<p className="text-[12px]">
								<span className="font-semibold text-primary-main">
									{t('millions_of_products_to_choose_from_twmp')}
								</span>
								<span className="text-gray">
									{t(
										'provides_a_wide_variety_of_products_to_choose_from_giving_buyers_the_flexibility_to_choose_the_seller_and_items_best_suited_for_them'
									)}
								</span>
							</p>
						</div>
						<div className="flex justify-center">
							<Button variant="buyer">{t('common:join_now')}</Button>
						</div>
					</div>

					<div className="flex h-[426px] flex-col items-center justify-center bg-primary-main bg-[url('/static/images/WhyBuyImages/why-buy.png')] bg-cover bg-no-repeat px-4 md:space-y-8">
						<h2 className="text-[18px] font-semibold text-white">
							{t('connect_freely_to_build_lasting_relationships')}
						</h2>
						<div className="grid gap-4 md:grid-cols-3">
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/messaging-center-orange.png"
								title={t('messaging_center')}
								subtitle={t(
									'interact_with_suppliers_on_your_terms_to_foster_loyalty'
								)}
								contentContainerClassName="!text-left"
								imageClassName="hidden md:block"
							/>
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/product-inquiries-orange.png"
								title={t('product_inquiries')}
								subtitle={t(
									'each_sale_is_a_conversation_that_starts_with_an_inquiry'
								)}
								contentContainerClassName="!text-left"
								imageClassName="hidden md:block"
							/>
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/rfq-orange.png"
								title={t('common:request_for_quotation_rfq')}
								subtitle={t(
									'post_a_rfq_and_proactively_find_and_connect_with_sellers_with_products_you_are_sourcing'
								)}
								contentContainerClassName="!text-left"
								imageClassName="hidden md:block"
							/>
						</div>
						<div className="hidden justify-center md:flex">
							<Button variant="special">{t('common:join_now')}</Button>
						</div>
					</div>

					{/* Utilize Resourceful Tools Sections*/}
					<div className="space-y-4 bg-white px-4 py-8 md:space-y-8 md:px-16">
						<h2 className="text-[18px] font-semibold text-primary-main md:text-center">
							{t('utilize_resourceful_tools')}
						</h2>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/translation-tool.png"
							title={t('translation_tool')}
							subtitle={t(
								'the_most_valuable_tool_for_global_expansion_is_the_automatic_translation_of_storefronts_and_private_messages'
							)}
							imgClassName="hidden md:block"
							className="md:ml-0"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/currency-conversions.png"
							title={t('currency_conversions')}
							subtitle={t(
								'you_can_see_listings_in_your_preferred_currency'
							)}
							imgClassName="hidden md:block"
							className="md:ml-0"
						/>
						<div className="hidden justify-center md:flex">
							<Button variant="product">{t('common:join_now')}</Button>
						</div>
					</div>

					{/* Manage every step in one place */}
					<div className="space-y-8 bg-[#00B2C7] p-4 md:p-8">
						<h2 className="text-[18px] font-semibold text-white md:text-center">
							{t('manage_every_step_in_one_place')}
						</h2>
						<div className="grid gap-4 md:grid-cols-2">
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/dollar.png"
								title={t('processing_protection')}
								subtitle={t('initiate_secure_payments_through_twmp')}
								contentClassName="!text-white"
								imgClassName="hidden md:block w-[33px] h-[39px]"
								className="md:-ml-0"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/dollar.png"
								title={t('processing_protection')}
								subtitle={t('initiate_secure_payments_through_twmp')}
								contentClassName="!text-white"
								imgClassName="hidden md:block w-[33px] h-[39px]"
								className="md:-ml-0"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/invoice.png"
								title={t('receive_invoices')}
								subtitle={t(
									'receive_negotiate_and_accept_invoices_with_minimum_effort_and_maximum_professionalism'
								)}
								contentClassName="!text-white"
								imgClassName="hidden md:block w-[33px] h-[39px]"
								className="md:-ml-0"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/flight.png"
								title={t('common:logistics_and_fulfillment')}
								subtitle={t('enjoy_flexible_and_cost')}
								contentClassName="!text-white"
								imgClassName="hidden md:block w-[33px] h-[39px]"
								className="md:-ml-0"
							/>
						</div>
						<div className="hidden justify-center md:flex">
							<Button variant="buyer" className="bg-gray">
								{t('common:join_now')}
							</Button>
						</div>
					</div>
				</div>

				{/* Why Buy points section only display on large screen*/}
				<div className="hidden justify-center bg-primary-main bg-[url('/static/images/WhyBuyImages/why-buy.png')] bg-cover bg-no-repeat lg:flex">
					<div className="w-3/4  p-8">
						<h2 className="my-8 text-center text-[50px] text-white">
							{t('why_buy_in_the_western_hemisphere')}
						</h2>

						<div className="mt-16 grid grid-cols-2 gap-16">
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/timezone.png"
								title={t('time_zone_compatibility')}
								subtitle={t(
									'minimum_time_zone_differences_significantly_help_simplify_communication_and_coordination'
								)}
							/>
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/cultural.png"
								title={t('cultural_closeness')}
								subtitle={t(
									'nearshoring_allows_you_to_access_a_bilingual_community_of_professionals_with_a_similar_cultural_background_to_ease_communication'
								)}
							/>
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/free-trade.png"
								title={t('common:free_trade')}
								subtitle={t(
									'there_are_more_than_100_regional_trade_agreements_in_the_western_hemisphere._the_u.s._currently_has_14_free_trade_agreements_with_20_countries'
								)}
							/>
							<WhyBuyTile
								imageUrl="/static/images/WhyBuyImages/swift-trun-around.png"
								title={t('swift_turn_around')}
								subtitle={t(
									'since_latin_america_and_the_caribbean_are_proximally_closer_to_the_usa_your_products_will_be_delivered_faster'
								)}
							/>
						</div>

						<div className="mt-8 text-center">
							<Button variant="special">{t('common:join_now')}</Button>
						</div>
					</div>
				</div>

				{/*  */}
				<div className="hidden bg-white p-16 lg:block">
					<div className="flex flex-col items-center text-primary-main">
						<h2 className="text-[50px] ">
							{t('streamline_your_percurment_operations')}
						</h2>
						<p className="font-semibold">
							{t(
								'innovative_digital_tools_that_transform_the_wholesale_experience'
							)}
						</p>

						<div className="mt-8 text-center">
							<Button variant="buyer"> {t('common:join_now')}</Button>
						</div>
					</div>

					<div className="space-y-16">
						<WhyBuyOperationTile
							imageUrl="/static/images/WhyBuyImages/cart.png"
							title={t('enhance_buy_power')}
							subtitle={t(
								'browse_and_choose_from_millions_of_products'
							)}
							className="pl-8"
							// displayBorder={true}
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/store.png"
								title={t('millions_of_products_to_choose_from_twmp')}
								subtitle={t(
									'provides_a_wide_variety_of_products_to_choose_from_giving_buyers_the_flexibility_to_choose_the_seller_and_items_best_suited_for_them'
								)}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/buying-options.png"
								title={t('buying_options')}
								subtitle={t(
									'buyers_can_choose_to_order_ready_to_ship_products'
								)}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/dynamic-pricing.png"
								title={t('common:dynamic_pricing')}
								subtitle={t('negotiate_pricing_with_seller')}
								className="mt-2"
							/>
						</WhyBuyOperationTile>

						<WhyBuyOperationTile
							imageUrl="/static/images/WhyBuyImages/iot.png"
							title={t('common:communication_center')}
							subtitle={t(
								'browse_and_choose_from_millions_of_products'
							)}
							className="pl-8"
							// containerClassName="flex-row-reverse"
							// displayBorder={true}
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/messaging-center.png"
								title={t('common:messaging_center')}
								subtitle={t(
									'interact_with_suppliers_on_your_terms_to_foster_loyalty'
								)}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/product-inquiries.png"
								title={t('product_inquiries')}
								subtitle={t(
									'ach_sale_is_a_conversation_that_starts_with_an_inquiry'
								)}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/rfq.png"
								title={t('common:request_for_quotation_rfq')}
								subtitle={t(
									'post_a_rfq_and_proactively_find_and_connect_with_sellers_with_products_you_are_sourcing'
								)}
								className="mt-2"
							/>
						</WhyBuyOperationTile>

						<WhyBuyOperationTile
							imageUrl="/static/images/WhyBuyImages/tools.png"
							title={t('tools')}
							subtitle={t('the_very_nature_of_twmp')}
							className="pl-8"
							// displayBorder={true}
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/translation-tool.png"
								title={t('translation_tool')}
								subtitle={t(
									'you_could_send_a_message_to_a_seller_in_english_and_your_message_will_automatically_be_translated_to_spanish'
								)}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/currency-conversions.png"
								title={t('currency_conversions')}
								subtitle={t(
									'you_can_see_listings_in_your_preferred_currency'
								)}
								className="mt-2"
							/>
						</WhyBuyOperationTile>

						<WhyBuyOperationTile
							imageUrl="/static/images/WhyBuyImages/order.png"
							title={t('order_management')}
							subtitle={t(
								'manage_every_step_in_one_place_take_advantage_of_on'
							)}
							className="pl-8"
							// containerClassName="flex-row-reverse"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/receive-invoices.png"
								title={t('receive_invoices')}
								subtitle={t(
									'receive_negotiate_and_accept_invoices_with_minimum_effort_and_maximum_professionalism'
								)}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/processing-protection.png"
								title={t('processing_protection')}
								subtitle={t('initiate_secure_payments_through_twmp')}
								className="mt-2"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/WhyBuyImages/processing-protection.png"
								title={t('common:logistics_and_fulfillment')}
								subtitle={t(
									'enjoy_flexible_and_cost_efficient_shipping_rates_with_twmp'
								)}
								className="mt-2"
							/>
						</WhyBuyOperationTile>
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

export default WhyBuyPage;
