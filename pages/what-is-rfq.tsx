import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Button from 'components/website/common/form/button';
import WhyUseRFQTile from 'components/website/common/rfq/why-use-rfq-tile';
import Seo from 'components/website/common/seo';

const WhatIsRFQPage: NextPage = () => {
	const { t } = useTranslation('what_is_rfq');

	return (
		<>
			<Seo title={t('title')} description="" />

			<div className="relative">
				{/* Header */}
				<div className="relative bg-[url('/static/images/RfqPageImages/rfq-header.png')]">
					<div className="relative h-[300px] w-full md:h-[400px] lg:h-[673px]">
						<Image
							src="/static/images/RfqPageImages/rfq-header.png"
							alt=""
							layout="fill"
						/>
					</div>

					<div className="absolute top-4 left-4 space-y-8 text-white md:top-8 md:left-8 md:w-4/6 lg:top-16 lg:left-16 lg:w-3/4">
						<div>
							<h1 className="text-[25px] font-semibold text-secondary md:text-[40px] lg:text-[96px] lg:leading-[117px]">
								{t('one_request_multiple_quotes')}
							</h1>
							<p className="text-[15px] tracking-wider md:text-[20px] lg:text-[33px]">
								{t('engage_with_suppliers_more_effectively')}
							</p>
						</div>

						<div>
							<h2 className="text-[15px] text-secondary md:text-[25px] lg:text-[50px]">
								{t('rfq')}
							</h2>
							<p className="text-[12px] tracking-wider md:text-[16px] lg:text-[25px]">
								{t('request_for_quote')}
							</p>
							<p className="text-[12px] tracking-wider md:text-[16px] lg:text-[25px]">
								{t('request_for_quotation')}
							</p>
						</div>

						<Button variant="buyer">{t('common:submit_rfq')}</Button>
					</div>
				</div>

				{/* Why use RFQ Section */}
				<div>
					<div className="space-y-4 bg-white py-8 md:hidden">
						<h2 className="mb-4 text-center text-[24px] font-semibold text-primary-main md:text-[20px] lg:text-[50px]">
							{t('common:why_use_rfq')}
						</h2>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/submit-request.png"
							title={t('submit_quote_for_your_custom_request')}
							imageContainerClassName="bg-primary-main"
							textClassName="text-primary-main"
						/>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/receive-response.png"
							title={t('receive_response')}
							isReverse={true}
						/>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
							title={t('choose_the_right_supplier')}
							imageContainerClassName="bg-gray/20"
							textClassName="text-gray/60"
						/>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
							title={t('close_deal')}
							isReverse={true}
							imageContainerClassName="bg-gray"
							textClassName="text-gray"
						/>
					</div>

					{/* For tablet and desktop */}
					<div className="hidden w-full bg-[url('/static/images/RfqPageImages/why-use-rfq/tablet-and-desktop-why-use-rfq.png')] bg-cover bg-center bg-no-repeat md:block md:h-[540px] md:py-8 lg:h-[800px] lg:py-0">
						<div className="flex items-center justify-between">
							<p className="pl-10 font-semibold text-primary-main md:text-[20px] lg:pl-24 lg:text-[50px]">
								{t('common:why_use_rfq')}
							</p>

							<div className="text-white md:w-[290px] md:space-y-16 md:pl-8 lg:mt-16 lg:w-[540px] lg:space-y-20">
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/submit-request.png"
									title={t('submit_quote_for_your_custom_request')}
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/receive-response.png"
									title={t('receive_responses_from_multiple_suppliers')}
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
									title={t('choose_the_right_supplier')}
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
									title={t('close_deal')}
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* RFQ Sending Process */}
				<div className="flex bg-[url('/static/images/RfqPageImages/rfq-bg.png')]">
					<div className="relative hidden lg:block lg:h-[600px] lg:w-[850px]">
						<Image
							src="/static/images/RfqPageImages/rfq-main.png"
							alt=""
							layout="fill"
							className="object-contain"
						/>
					</div>

					<div className="relative hidden md:block md:h-[824px] md:w-[100vw] lg:hidden">
						<Image
							src="/static/images/RfqPageImages/rfq-main-tablet.png"
							alt=""
							layout="fill"
						/>
					</div>

					{/* content */}
					<div className="space-y-8 py-8 px-8 text-gray md:py-16 md:text-white">
						{/* First section */}
						<div className="space-y-4">
							<h3 className="text-[18px] font-semibold text-accent-secondary-main md:text-[20px] lg:text-[25px]">
								{t('how_should_i_send_a_rfq_on_tradewinds_marketplace')}
							</h3>
							<div className="text-gray lg:text-white">
								<h4 className="text-[12px] font-semibold md:text-[16px] lg:text-[18px]">
									{t('we_have_made_preparing_a_rfq_simple')}
								</h4>
								<p className="text-[12px] md:text-[16px] lg:text-[15px]">
									{t('complete_requesters_information')}
								</p>
							</div>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								{t('complete_product_information')}
							</p>
							<p className="text-[12px] font-semibold text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								{t('review_details_and_submit')}
							</p>
						</div>

						{/* Second section */}
						<div className="space-y-4">
							<h3 className="text-[18px] font-semibold text-accent-secondary-main  md:text-[20px] lg:text-[25px]">
								{t('review_vendor_responses')}
							</h3>
							<div className="text-gray lg:text-white">
								<h4 className="text-[12px] font-semibold md:text-[16px] lg:text-[18px]">
									{t('after_sending_the_rfqs')}
								</h4>
								<p className="text-[12px] md:text-[16px] lg:text-[15px]">
									{t(
										'while_capacity_will_vary_depending_on_your_business'
									)}
								</p>
							</div>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								{t(
									'responses_to_identify_what_vendors_present_the_best'
								)}
							</p>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								{t(
									'priced_product_if_it_also_meets_all_of_your_procurement_needs_in_terms_of_quality_and_custom_solutions'
								)}
							</p>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								{t(
									'you_should_notify_the_vendor_you_have_chosen_of_your_decision_and_how_you_intend_to_proceed'
								)}
							</p>
						</div>

						{/* Third section */}
						<div className="space-y-4">
							<h3 className="text-[18px] font-semibold text-accent-secondary-main md:text-[20px] lg:text-[25px]">
								{t('close_out_the_process')}
							</h3>
							<div className="text-gray lg:text-white">
								<h4 className="text-[12px] font-semibold md:text-[16px] lg:text-[18px]">
									{t(
										'lastly_close_out_the_process_by_formalizing_the_arrangement_with_the_vendor'
									)}
								</h4>
								<p className="text-[12px] md:text-[16px] lg:text-[15px]">
									{t(
										'remember_a_rfq_only_leads_to_a_quotation_from_the_vendor'
									)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom section */}
				<div className="flex flex-col bg-white bg-cover bg-no-repeat md:h-[480px] md:flex-row md:bg-[url('/static/images/RfqPageImages/stock.png')] lg:items-end">
					<div className="relative h-[244px] md:hidden">
						<Image
							src="/static/images/RfqPageImages/stock.png"
							alt=""
							layout="fill"
						/>
					</div>

					<div className="space-y-4 p-8 text-gray md:w-4/6 md:py-16 md:px-8 md:text-white lg:w-1/2 lg:py-4 lg:px-16">
						<h2 className="text-[18px] font-semibold tracking-wider md:text-[20px] lg:text-[25px]">
							{t(
								'rfqs_help_b2b_buyers_identify_what_sellers_best_meet_their_procurement_price_point_so_that_they_can_work_within_their_budget'
							)}
						</h2>
						<p className="text-[12px] md:text-[16px] lg:text-[15px]">
							{t(
								'thus_it_is_an_essential_and_powerful_tool_during_the_procurement_process'
							)}
						</p>

						<Button variant="buyer">{t('common:join_now')}</Button>
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

export default WhatIsRFQPage;
