import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Point from 'components/common/rfq/point';
import WhyUseRFQTile from 'components/common/rfq/why-use-rfq-tile';
import Seo from 'components/common/seo';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { useAuthStore } from 'store/auth';

const WhatIsRFQPage: NextPage = () => {
	const { t } = useTranslation('what_is_rfq');

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData
		})
	);

	const submitRFQ = () => {
		if (!isAuth) {
			setIsLoginOpen();

			return;
		}

		const rfqUrl = generateBuyerDashboardUrl({
			redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
			action: BUYER_DASHBOARD_ACTIONS.create_rfq,
			access_key: customerData.access.token,
			refresh_key: customerData.refresh.token
		});

		window?.open(rfqUrl, '__blank');
	}; // End of submitRFQ

	return (
		<>
			<Seo title={t('What is RFQ')} description="" />

			<div className="">
				{/* Header */}
				<div className="container mx-auto h-[135px] w-[300px] justify-center bg-[url('/static/images/RfqPageImages/header-img-what-rfq.png')] bg-cover bg-no-repeat sm:h-[284px] sm:w-[640px] md:h-[341px] md:w-[768px] lg:h-[456px] lg:w-[1025px] desktop:h-[673px] desktop:w-[1512px] ">
					<div className=" pl-[14px] pt-[4px] text-white sm:pl-[17px] sm:pt-[51px] md:pl-[21px] md:pt-[62px] lg:pl-[27px] lg:pt-[83px] desktop:pl-[50px]  desktop:pt-[123px]">
						<p className=" h-[47px] w-[278px] text-[20px] font-semibold leading-[24px] text-secondary sm:h-[66px] sm:w-[343px] sm:text-[27px] sm:leading-[33px] md:h-[80px] md:w-[60%] md:text-[32px] md:leading-[39px] lg:h-[106px]  lg:text-[43px] lg:leading-[52px] desktop:h-[150px]  desktop:text-[64px] desktop:leading-[78px] ">
							{t('one_request_multiple_quotes')}
						</p>
						<p className="text-[12px] sm:text-[15px] md:text-[18px] lg:text-[24px] desktop:text-[36px] ">
							{t('engage_with_suppliers_more_effectively')}
						</p>
						<div className=" ml-0 mt-[0px] sm:ml-[50px] sm:mt-[20px]  md:ml-[59px] md:mt-0 lg:ml-[90px] lg:mt-[32px] desktop:ml-[118px] desktop:mt-[45px] ">
							<button
								onClick={submitRFQ}
								className="  h-[22px]  w-[117px] rounded-[5px] bg-secondary text-[8px] font-medium sm:h-[27px] sm:w-[117px] sm:text-[8px] md:h-[30px] md:w-[140px] md:text-[10px] lg:h-[35px] lg:w-[187px] lg:text-[12px] desktop:h-[52px] desktop:w-[276px] desktop:text-[18px]"
							>
								{t('common:submit_rfq')}
							</button>
						</div>
					</div>
				</div>

				<div className="">
					{/* For tablet and desktop */}
					<div className=" container z-30 mx-auto hidden justify-center bg-[url('/static/images/RfqPageImages/why-use-rfq-bg.png')]  bg-cover bg-center bg-no-repeat sm:hidden md:-mt-[117px] md:block md:h-[490px] md:w-[768px] lg:-mt-[115px] lg:block lg:h-[616px] lg:w-[1025px] desktop:-mt-[163px] desktop:block desktop:h-[909px] desktop:w-[1512px]">
						<p className=" mx-auto text-primary-main md:h-[93px] md:w-[630px] md:pt-[5px] md:text-[10px] md:leading-[13px] lg:h-[80px] lg:w-[773px] lg:pt-[13px] lg:text-[12px] lg:leading-[14px] desktop:h-[128px] desktop:w-[1141px] desktop:pt-[20px] desktop:text-[18px] desktop:leading-[21px]">
							{t(
								'RFQs_serve_as_a_vital_tool_for_buyers_to_identify_sellers_that_align_with_their_needs._Experience the power of RFQs on Tradewinds Marketplace,'
							)}
						</p>
						<div className=" flex items-center md:space-x-[205px] lg:space-x-[395px] desktop:space-x-[595px] ">
							<p className=" font-semibold text-primary-main md:-mt-[50px] md:ml-[38px] md:w-[201px] md:text-[25px] lg:-mt-[20px] lg:ml-[50px] lg:w-[220px] lg:text-[25px] desktop:-mt-[30px] desktop:ml-[75px] desktop:w-[360px] desktop:text-[40px]">
								{t('common:why_use_rfq')}
							</p>
							<div className="text-white md:mt-[10px] md:w-[330px] md:space-y-[48px] lg:mt-[60px] lg:w-[400px] lg:space-y-[50px] desktop:mt-16 desktop:w-[540px] desktop:space-y-[75px]">
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/submit-request-img.png"
									title={t('submit_quote_for_your_custom_request')}
									imageContainerClassName=" md:ml-[60px] md:w-[62px] md:h-[58px] lg:ml-0 lg:w-[87px] lg:h-[70px] desktop:ml-0 desktop:w-[115px] desktop:h-[100px]"
									textClassName=" md:text-[15px] md:ml-[20px] md:w-[198px] md:h-[34px] lg:text-[18px] lg:ml-[31px] lg:w-[209px] lg:h-[45px] desktop:w-[314px] desktop:h-[67px] desktop:ml-[46px] desktop:text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/receive-response-img.png"
									title={t('receive_responses_from_multiple_suppliers')}
									imageContainerClassName="md:ml-[50px] md:w-[58px] md:h-[48px] lg:ml-0 lg:w-[77px] lg:h-[65px] desktop:ml-0 desktop:w-[115px] desktop:h-[96px]"
									textClassName="md:text-[15px] md:ml-[30px] md:w-[198px] md:h-[34px] lg:text-[18px] lg:ml-[31px] lg:w-[246px] lg:h-[45px] desktop:w-[314px] desktop:h-[67px] desktop:ml-[46px] desktop:text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
									title={t('choose_the_right_supplier')}
									imageContainerClassName="mt-0 md:ml-[60px] md:w-[51px] md:h-[65px] lg:mt-[10px] lg:ml-0 lg:w-[69px] lg:h-[86px] desktop:ml-0 desktop:w-[102px] desktop:h-[128px]"
									textClassName="md:text-[15px] md:ml-[30px] md:w-[198px] md:h-[34px] lg:text-[18px] lg:ml-[41px] lg:w-[209px] lg:h-[45px] desktop:w-[314px] desktop:h-[67px] desktop:ml-[51px] desktop:text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
									title={t('close_deal')}
									imageContainerClassName="md:ml-[60px] md:w-[65px] md:h-[58px] lg:ml-0 lg:w-[87px] lg:h-[77px] desktop:ml-0 desktop:w-[129px] desktop:h-[115px]"
									textClassName="md:text-[15px] md:ml-[20px] md:w-[198px] md:h-[34px] lg:text-[18px] lg:ml-[31px] lg:w-[209px] lg:h-[45px] desktop:w-[314px] desktop:h-[67px] desktop:ml-[27px] desktop:text-[25px]"
								/>
							</div>
						</div>
					</div>
					{/* Only for Mobile */}
					<div className=" container mx-auto block h-[617px] justify-center sm:flex sm:h-[339px] sm:space-x-[28px] md:hidden ">
						<div className=" mt-[12px] ml-[21px] sm:mt-[41px] sm:ml-[19px]">
							<p className=" h-[30px] w-[237px] text-[20px] sm:h-[37px] sm:w-[228px] ">
								{t('common:why_use_rfq')}
							</p>
							<p className=" h-[226px] w-[260px] text-[12px] leading-[14px] sm:h-[172px] sm:w-[341px] ">
								{t(
									'RFQs_serve_as_a_vital_tool_for_buyers_to_identify_sellers_that_align_with_their_needs._Experience the power of RFQs on Tradewinds Marketplace,'
								)}
							</p>
						</div>
						<div className="  flex space-x-[28px]  ">
							<div className="mt-[44px] ml-[35px] space-y-[16px] sm:mt-[31px] sm:ml-0">
								<div className="h-[55px] w-[55px]  rounded-full bg-primary-main pl-[8px] pt-[9px] ">
									<div className="relative  h-[38px] w-[35px] ">
										<ImageWithErrorHandler
											src="/static/images/RfqPageImages/submit-request-img.png"
											alt="submit-request"
											fill={true}
										/>
									</div>
								</div>
								<div className="h-[55px] w-[55px]  rounded-full bg-bg_blue pl-[6px] pt-[11px] ">
									<div className="relative  h-[36px] w-[43px] ">
										<ImageWithErrorHandler
											src="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
											alt="submit-request"
											fill={true}
										/>
									</div>
								</div>
								<div className="h-[55px] w-[55px]  rounded-full bg-bg_light_blue pl-[13px] pt-[9px] ">
									<div className="relative  h-[37px] w-[29px] ">
										<ImageWithErrorHandler
											src="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
											alt="submit-request"
											fill={true}
										/>
									</div>
								</div>
								<div className="h-[55px] w-[55px]  rounded-full bg-bg_gray_medium pl-[8px] pt-[8px] ">
									<div className="relative  h-[34px] w-[38px] ">
										<ImageWithErrorHandler
											src="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
											alt="submit-request"
											fill={true}
										/>
									</div>
								</div>
							</div>
							<div className="mt-[41px]  w-[174px] space-y-[39px] text-[12px]">
								<p>{t('submit_quote_for_your_custom_request')}</p>
								<p>{t('receive_responses_from_multiple_suppliers')}</p>
								<p>{t('choose_the_right_supplier')}</p>
								<p className=" pt-[15px]">{t('close_deal')}</p>
							</div>
						</div>
					</div>

					{/* RFQ Sending Process */}
					<div className="container mx-auto flex w-[300px] justify-center overflow-hidden bg-[url('/static/images/RfqPageImages/rfq-bg.png')] sm:w-[640px] md:w-[768px] lg:w-[1025px] desktop:w-[1512px]">
						<div className="relative hidden md:-ml-[20px] md:block md:h-[650px] md:w-[413px] lg:-ml-[29px] lg:block lg:h-[601px] lg:w-[551px] desktop:-ml-[29px] desktop:block desktop:h-[888px] desktop:w-[814px]">
							<ImageWithErrorHandler
								src="/static/images/RfqPageImages/rfq-main-img.png"
								alt=""
								fill={true}
								className="object-contain"
							/>
						</div>

						{/* content */}
						<div>
							<div className="ml-[21px] sm:ml-[19px] md:-ml-[8px]  lg:-ml-[10px] desktop:-ml-[15px]">
								<p className="mt-[30px] h-[95px] w-[280px] text-[20px] font-semibold leading-[25px] text-gray sm:mt-[33px] sm:h-[50px] sm:w-[606px] sm:text-[20px] sm:leading-[25px] md:mt-[31px] md:h-[90px] md:w-[430px] md:text-[25px] md:leading-[30px] lg:mt-[42px] lg:h-[60px] lg:w-[531px] lg:text-[25px] lg:leading-[30px] desktop:mt-[62px] desktop:h-[98px] desktop:w-[723px] desktop:text-[32px] desktop:leading-[48px]">
									{t(
										'how_should_i_send_a_rfq_on_tradewinds_marketplace'
									)}
								</p>

								<h4 className="text-left text-[12px] font-semibold leading-[15px] text-white sm:text-center sm:text-[12px] sm:leading-[15px] md:text-left md:text-[15px] md:leading-[18px] lg:text-left lg:text-[18px] lg:leading-[21px] desktop:text-left desktop:text-[24px] desktop:leading-[29px]">
									{t('we_have_made_preparing_a_rfq_simple')}
								</h4>
							</div>
							<div className="ml-[22px] mt-[28px] leading-[14px] sm:ml-[180px] sm:mt-[30px] sm:leading-[14px] md:ml-[25px] md:mt-[14px] md:leading-[14px] lg:ml-[31px] lg:mt-[18px] lg:leading-[12.94px] desktop:ml-[51px] desktop:mt-[38px] desktop:leading-[21.94px]">
								<div className=" h-[646px] w-[246px] space-y-[20px] text-[12px] text-white sm:h-[488px] sm:w-[371px] sm:space-y-[20px] sm:text-[12px] md:h-[383px] md:w-[297px] md:space-y-[5px] md:text-[12px] lg:h-[384px] lg:w-[395px] lg:space-y-[25px] lg:text-[12px] desktop:h-[540px] desktop:w-[584px] desktop:space-y-[30px] desktop:text-[18px] ">
									<div>
										<p className="text-[12px] font-semibold text-gray sm:text-[12px] md:text-[15px] lg:text-[18px] desktop:text-[25px] ">
											{t('fill_out_RFQ_form')}
										</p>
										<div className="ml-[12px] mb-[30px] -space-y-[5px] sm:ml-[12px] sm:mb-[30px] sm:-space-y-[5px] md:ml-[12px] md:mb-[7px] md:-space-y-[10px] lg:ml-[12px] lg:mb-[7px] lg:-space-y-[10px] desktop:ml-[15px] desktop:mb-[10px] desktop:space-y-[0px] ">
											<Point
												content={t(
													'complete_RFQ_form:_Note:_To_enhance_vendor_responses,_ensure_your_provided_information_is_detailed for responses that are tailored and relevant.'
												)}
											/>

											<Point
												content={t('complete_product_information')}
											/>

											<Point content={t('review_details_and_submit')} />
										</div>
									</div>
									<div>
										<p className="text-[12px] font-semibold text-gray md:text-[15px] lg:text-[18px] desktop:text-[25px] ">
											{t('review_vendor_responses')}
										</p>
										<div className="ml-[12px] mb-[30px] -space-y-[5px]  sm:ml-[12px] sm:mb-[30px] sm:-space-y-[5px] md:ml-[12px] md:mb-[7px] md:-space-y-[10px] lg:ml-[12px] lg:mb-[10px] lg:-space-y-[10px] desktop:ml-[15px]  desktop:mb-[10px] desktop:space-y-[0px] ">
											<Point content={t('review_vendor_responses')} />
											<Point
												content={t(
													'choose_your_preferred_quote:_Notify_your_chosen_vendor_of_your_decision_and_next steps while retaining a copy of the RFQ for future contractual reference.'
												)}
											/>
											<Point content={t('review_details_and_submit')} />
										</div>
									</div>
									<div>
										<p className="text-[12px] font-semibold text-gray md:text-[15px] lg:text-[18px] desktop:text-[25px] ">
											{t('finalize_the_process')}
										</p>
										<div className="ml-[12px] mb-[30px] -space-y-[5px] sm:ml-[12px] sm:mb-[30px] sm:-space-y-[5px] md:ml-[12px] md:mb-[7px] md:-space-y-[10px] lg:ml-[12px] lg:mb-[7px] lg:-space-y-[10px] desktop:ml-[15px] desktop:mb-[10px] desktop:space-y-[0px] ">
											<Point
												content={t(
													'finally,_formalize_the_arrangement_with_the_chosen_vendor_to_close_out_the_process._Keep in mind that an RFQ is not a contract and requires formal agreement from both parties to be enforceable. Notify other vendors of your decision to proceed with a different vendor.'
												)}
											/>
										</div>
									</div>
								</div>
							</div>
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

export default WhatIsRFQPage;
