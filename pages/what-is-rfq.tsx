import { NextPage } from 'next';
import Image from 'next/image';

// components
import Button from 'components/website/common/form/button';
import WhyUseRFQTile from 'components/website/common/rfq/why-use-rfq-tile';
import Seo from 'components/website/common/seo';

const WhatIsRFQPage: NextPage = () => {
	return (
		<>
			<Seo title="What is RFQ page" description="" />

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
								One Request Multiple Quotes
							</h1>
							<p className="text-[15px] tracking-wider md:text-[20px] lg:text-[33px]">
								Engage with suppliers more effectively
							</p>
						</div>

						<div>
							<h2 className="text-[15px] text-secondary md:text-[25px] lg:text-[50px]">
								RFQ
							</h2>
							<p className="text-[12px] tracking-wider md:text-[16px] lg:text-[25px]">
								“Request for quote” or
							</p>
							<p className="text-[12px] tracking-wider md:text-[16px] lg:text-[25px]">
								“Request for quotation”.
							</p>
						</div>

						<Button variant="buyer">Submit RFQ</Button>
					</div>
				</div>

				{/* Why use RFQ Section */}
				<div>
					<div className="space-y-4 bg-white py-8 md:hidden">
						<h2 className="mb-4 text-center text-[24px] font-semibold text-primary-main md:text-[20px] lg:text-[50px]">
							Why use RFQ?
						</h2>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/submit-request.png"
							title="Submit quote for your Custom Request"
							imageContainerClassName="bg-primary-main"
							textClassName="text-primary-main"
						/>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/receive-response.png"
							title="Receive response"
							isReverse={true}
						/>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
							title="Choose the Right Supplier"
							imageContainerClassName="bg-gray/20"
							textClassName="text-gray/60"
						/>
						<WhyUseRFQTile
							imageUrl="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
							title="Close deal"
							isReverse={true}
							imageContainerClassName="bg-gray"
							textClassName="text-gray"
						/>
					</div>

					{/* For tablet and desktop */}
					<div className="hidden w-full bg-[url('/static/images/RfqPageImages/why-use-rfq/tablet-and-desktop-why-use-rfq.png')] bg-cover bg-center bg-no-repeat md:block md:h-[540px] md:py-8 lg:h-[800px] lg:py-0">
						<div className="flex items-center justify-between">
							<p className="pl-10 font-semibold text-primary-main md:text-[20px] lg:pl-24 lg:text-[50px]">
								Why use RFQ?
							</p>

							<div className="text-white md:w-[290px] md:space-y-16 md:pl-8 lg:mt-16 lg:w-[540px] lg:space-y-20">
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/submit-request.png"
									title="Submit quote for your Custom Request"
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/receive-response.png"
									title="Receive responses from Multiple Suppliers"
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/choose-right-supplier.png"
									title="Choose the Right Supplier"
									imageContainerClassName="md:!w-[52px] md:!h-[48px] lg:!w-[132px] lg:!h-[110px]"
									textClassName="md:!text-[18px] lg:!text-[25px]"
								/>
								<WhyUseRFQTile
									imageUrl="/static/images/RfqPageImages/why-use-rfq/close-deal.png"
									title="Close deal"
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
								How should I send a RFQ on Tradewinds Marketplace?
							</h3>
							<div className="text-gray lg:text-white">
								<h4 className="text-[12px] font-semibold md:text-[16px] lg:text-[18px]">
									We have made preparing a RFQ simple.
								</h4>
								<p className="text-[12px] md:text-[16px] lg:text-[15px]">
									Complete Requesters information: Note: Remember, the
									more detail you provide; the more relevant the vendors
									responses will be. It’s a good idea to interface with
									other members of your staff or departments within your
									business to identify all the required specifications.
								</p>
							</div>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								Complete Product information: Add additional notes. Eg.
								Multiple colors, fabric needs etc
							</p>
							<p className="text-[12px] font-semibold text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								Review details and Submit
							</p>
						</div>

						{/* Second section */}
						<div className="space-y-4">
							<h3 className="text-[18px] font-semibold text-accent-secondary-main  md:text-[20px] lg:text-[25px]">
								Review vendor responses.
							</h3>
							<div className="text-gray lg:text-white">
								<h4 className="text-[12px] font-semibold md:text-[16px] lg:text-[18px]">
									After sending the RFQs, you can begin to receive
									responses. As a rule, it makes sense to make your
									vendor pool small enough, so it’s manageable for you.
								</h4>
								<p className="text-[12px] md:text-[16px] lg:text-[15px]">
									While capacity will vary depending on your business’
									resources, eight is typically a good number to start
									with. You should also allow enough time for the vendor
									and their team to work through the RFQ.
								</p>
							</div>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								By the end of the deadline, you can then review
								responses to identify what vendors present the best
								prices that
							</p>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								Choose your preferred quote: Your decision will likely
								be the vendor that presents the best price. But this may
								not always be the case. You may decide to select a
								higher-priced product if it also meets all of your
								procurement needs in terms of quality and custom
								solutions.
							</p>
							<p className="text-[12px] text-gray md:text-[16px] lg:text-[15px] lg:text-white">
								You should notify the vendor you have chosen of your
								decision and how you intend to proceed. Be certain to
								keep a copy of the RFQ as it will form the basis of your
								contractual relationship going forward.
							</p>
						</div>

						{/* Third section */}
						<div className="space-y-4">
							<h3 className="text-[18px] font-semibold text-accent-secondary-main md:text-[20px] lg:text-[25px]">
								Close out the process:
							</h3>
							<div className="text-gray lg:text-white">
								<h4 className="text-[12px] font-semibold md:text-[16px] lg:text-[18px]">
									Lastly, close out the process by formalizing the
									arrangement with the vendor.
								</h4>
								<p className="text-[12px] md:text-[16px] lg:text-[15px]">
									Remember, a RFQ only leads to a quotation from the
									vendor. It is not a contract and cannot be enforced
									until it is formally agreed upon by both parties.
									Also, notify other vendors who sent in quotations of
									your decision to go with another vendor.
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
							RFQs help B2B buyers identify what sellers best meet their
							procurement price point so that they can work within their
							budget.
						</h2>
						<p className="text-[12px] md:text-[16px] lg:text-[15px]">
							Thus, it is an essential and powerful tool during the
							procurement process. With the tradewinds market place RFQ
							page, you can find, connect with, and request competitive
							prices from vendors in Latin America and the Caribbean.
							Visit our RFQ webpage today or contact us now to start
							buying from international sellers.
						</p>

						<Button variant="buyer">Join Now</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default WhatIsRFQPage;
