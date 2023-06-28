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
					{/* For tablet and desktop */}
					<div className=" z-30 -mt-[163px] h-[909px] w-[1512px] bg-[url('/static/images/RfqPageImages/why-use-rfq-bg.png')] bg-cover bg-center bg-no-repeat">
						<p className=" mx-auto h-[128px] w-[1141px] pt-[20px] text-[20px] leading-[24px] text-primary-main ">
							RFQs serve as a vital tool for buyers to identify sellers
							that align with their needs. Experience the power of RFQs
							on Tradewinds Marketplace, where you can connect with
							vendors worldwide, request competitive prices, and expand
							your international sourcing. With a diverse range of
							suppliers at your fingertips, RFQs enable you to diversify
							your sourcing strategies, discover new markets, and access
							unique products. Unlock the potential of RFQs on
							Tradewinds Marketplace and transform the way you source
							and procure goods for your business.
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
									title={t('receive_responses_from_multiple_suppliers')}
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
