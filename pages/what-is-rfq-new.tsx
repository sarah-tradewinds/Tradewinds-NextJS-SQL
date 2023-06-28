import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Point from 'components/common/rfq/point';
import WhyUseRFQTile from 'components/common/rfq/why-use-rfq-tile';
import Seo from 'components/common/seo';

const WhatIsRFQPage: NextPage = () => {
	const { t } = useTranslation('what_is_rfq');

	return (
		<>
			<Seo title={t('title')} description="" />

			<div>
				{/* Header */}
				<div className="h-[863px] w-full bg-[url('/static/images/RfqPageImages/header-img-what-rfq.png')] bg-cover bg-no-repeat ">
					{/* <div className="relative h-[263px] w-full md:h-[400px] lg:h-[673px]">
						<ImageWithErrorHandler
							src="/static/images/RfqPageImages/rfq-header.png"
							alt=""
							fill={true}
						/>
					</div> */}

					<div className=" absolute left-[50px] mt-[86px]  text-white  ">
						<p className="h-[284px] w-[1033px] text-[96px] font-semibold text-secondary ">
							{t('one_request_multiple_quotes')}
						</p>
						<p className=" text-[33px] ">
							{t('engage_with_suppliers_more_effectively')}
						</p>
						<div className=" ml-[161px] mt-[45px]  p-0 ">
							<button className=" h-[52px] w-[276px] rounded-[5px] bg-secondary text-[18px] font-medium">
								Submit RFQ
							</button>
						</div>
					</div>
				</div>

				<div className="container mx-auto">
					{/* Why use RFQ Section */}
					<div>
						{/* <div className="space-y-4 bg-white py-8 md:hidden">
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
						</div> */}

						{/* For tablet and desktop */}
						<div className=" z-30 -mt-[163px] h-[909px] w-[1512px] bg-[url('/static/images/RfqPageImages/why-use-rfq-bg.png')] bg-cover bg-center bg-no-repeat">
							<p className=" mx-auto h-[128px] w-[1141px] pt-[20px] text-[20px] leading-[24px] text-primary-main ">
								RFQs serve as a vital tool for buyers to identify
								sellers that align with their needs. Experience the
								power of RFQs on Tradewinds Marketplace, where you can
								connect with vendors worldwide, request competitive
								prices, and expand your international sourcing. With a
								diverse range of suppliers at your fingertips, RFQs
								enable you to diversify your sourcing strategies,
								discover new markets, and access unique products. Unlock
								the potential of RFQs on Tradewinds Marketplace and
								transform the way you source and procure goods for your
								business.
							</p>
							<div className=" flex items-center space-x-[480px] ">
								<p className=" font-semibold text-primary-main md:text-[20px] lg:pl-[84px] lg:text-[50px]">
									{t('common:why_use_rfq')}
								</p>
								<div className="text-white md:w-[290px] md:space-y-16 md:pl-8 lg:mt-16 lg:w-[540px] lg:space-y-20">
									<WhyUseRFQTile
										imageUrl="/static/images/RfqPageImages/submit-request-img.png"
										title={t('submit_quote_for_your_custom_request')}
										imageContainerClassName=" lg:!w-[150px] lg:!h-[124px]"
										textClassName="md:!text-[18px] ml-[46px]  lg:!text-[25px]"
									/>
									<WhyUseRFQTile
										imageUrl="/static/images/RfqPageImages/receive-response-img.png"
										title={t(
											'receive_responses_from_multiple_suppliers'
										)}
										imageContainerClassName=" lg:!w-[160px] lg:!h-[96px]"
										textClassName="md:!text-[18px] ml-[46px] lg:!text-[25px]"
									/>
									<WhyUseRFQTile
										imageUrl="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
										title={t('choose_the_right_supplier')}
										imageContainerClassName=" lg:!w-[102px] lg:!h-[128px]"
										textClassName="md:!text-[18px] ml-[51px] lg:!text-[25px]"
									/>
									<WhyUseRFQTile
										imageUrl="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
										title={t('close_deal')}
										imageContainerClassName=" lg:!w-[129px] lg:!h-[115px]"
										textClassName="md:!text-[18px] ml-[27px] lg:!text-[25px]"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* RFQ Sending Process */}
					<div className="flex overflow-hidden bg-[url('/static/images/RfqPageImages/rfq-bg.png')]">
						<div className="relative hidden  lg:-ml-[29px] lg:block lg:h-[888px] lg:w-[814px]">
							<ImageWithErrorHandler
								src="/static/images/RfqPageImages/rfq-main-img.png"
								alt=""
								fill={true}
								className="object-contain"
							/>
						</div>

						{/* content */}
						<div>
							<div className=" -ml-[15px]">
								<p className="font-semibold text-accent-secondary-main lg:mt-[62px] lg:h-[122px] lg:w-[741px] lg:text-[50px] lg:leading-[60px]">
									How should I send a RFQ <br />
									on Tradewinds Marketplace?
								</p>

								<h4 className="font-semibold lg:text-[24px] lg:leading-[29px] lg:text-white">
									{t('we_have_made_preparing_a_rfq_simple')}
								</h4>
							</div>
							<div className="mt-[38px] ml-[51px] leading-[21.94px]">
								<div className=" h-[540px] w-[584px] text-[18px] text-white ">
									<p className="text-[25px] font-semibold text-accent-secondary-main ">
										Fill out RFQ form:
									</p>
									<div className="mb-[10px] ml-[15px] ">
										<Point
											content="Complete RFQ Form: Note: To enhance vendor
											responses, ensure your provided information is
											detailed for responses that are tailored and
											relevant."
										/>

										<Point
											content="Complete Product information: Complete Product
											information: Add additional notes. Eg. Multiple
											colors, fabric needs etc."
										/>

										<Point content="Review details and Submit" />
									</div>
									<p className="text-[25px] font-semibold text-accent-secondary-main ">
										Review vendor responses:
									</p>
									<div className="mb-[10px] ml-[15px] ">
										<Point content="Review vendor responses:" />
										<Point
											content="Choose your preferred quote: Notify your chosen
											vendor of your decision and next steps while
											retaining a copy of the RFQ for future contractual
											reference."
										/>
										<Point content="Review details and Submit" />
									</div>
									<p className="text-[25px] font-semibold text-accent-secondary-main ">
										Finalize the process:
									</p>
									<div className="mb-[10px] ml-[15px] ">
										<Point
											content="Finally, formalize the arrangement with the chosen
											vendor to close out the process. Keep in mind that
											an RFQ is not a contract and requires formal
											agreement from both parties to be enforceable.
											Notify other vendors of your decision to proceed
											with a different vendor."
										/>
									</div>
								</div>
							</div>
						</div>

						{/* <div className="space-y-8 py-8 px-8 text-gray md:py-16 md:text-white"> */}
						{/* First section */}
						{/* <div className="md:space-y-4">
								<h3 className="text-[18px] font-semibold text-accent-secondary-main md:text-[20px] lg:text-[25px]">
									{t(
										'how_should_i_send_a_rfq_on_tradewinds_marketplace'
									)}
								</h3>
								<div className="text-gray lg:text-white">
									<h4 className="mb-4 text-[12px] font-semibold md:mb-0 md:text-[16px] lg:text-[18px]">
										{t('we_have_made_preparing_a_rfq_simple')}
									</h4>
									<p className="text-[12px] md:text-[16px] lg:text-[15px]">
										{t('complete_requesters_information')}
									</p>
								</div>
								<p className="mb-4 text-[12px] text-gray md:mb-0 md:text-[16px] lg:text-[15px] lg:text-white">
									{t('complete_product_information')}
								</p>
								<p className="text-[12px] font-semibold text-gray md:text-[16px] lg:text-[15px] lg:text-white">
									{t('review_details_and_submit')}
								</p>
							</div> */}

						{/* Second section */}
						{/* <div className="md:space-y-4">
								<h3 className="text-[18px] font-semibold text-accent-secondary-main  md:text-[20px] lg:text-[25px]">
									{t('review_vendor_responses')}
								</h3>
								<div className="text-gray lg:text-white">
									<h4 className="mb-4 text-[12px] font-semibold md:mb-0 md:text-[16px] lg:text-[18px]">
										{t('after_sending_the_rfqs')}
									</h4>
									<p className="text-[12px] md:text-[16px] lg:text-[15px]">
										{t(
											'while_capacity_will_vary_depending_on_your_business'
										)}
									</p>
								</div>
								<div className="space-y-4">
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
								</div>{' '}
							</div> */}

						{/* Third section */}
						{/* <div className="md:space-y-4">
								<h3 className="text-[18px] font-semibold text-accent-secondary-main md:text-[20px] lg:text-[25px]">
									{t('close_out_the_process')}
								</h3>
								<div className="text-gray lg:text-white">
									<h4 className="mb-4 text-[12px] font-semibold md:mb-0 md:text-[16px] lg:text-[18px]">
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
							</div> */}
						{/* </div> */}
					</div>

					{/* Bottom section */}
					{/* <div className="flex flex-col bg-white bg-cover bg-no-repeat md:h-[480px] md:flex-row md:bg-[url('/static/images/RfqPageImages/stock.png')] lg:items-end">
						<div className="relative h-[244px] md:hidden">
							<ImageWithErrorHandler
								src="/static/images/RfqPageImages/stock.png"
								alt=""
								fill={true}
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
							<div className="flex justify-center">
								<Button variant="buyer">{t('common:join_now')}</Button>
							</div>
						</div>
					</div> */}
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
