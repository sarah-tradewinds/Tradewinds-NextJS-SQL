import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import {
	OperationTailContent,
	OperationTailImage
} from 'components/common/why-buy/why-buy-operation-tile';
import WhyBuyTile from 'components/common/why-buy/why-buy-tile';
import { useAuthStore } from 'store/auth';
function FeatureCommunication() {
	const { setIsSignUpOpen } = useAuthStore();
	return (
		<div>
			{/* Why Buy points section only display on large screen*/}
			<div className="z-50   flex justify-center bg-[url('/static/images/WhyBuyImages/why-buy-second-banner.png')] bg-center bg-no-repeat sm:h-[394px] sm:w-[640px] md:h-[457px] md:w-[744px] lg:h-[610px] lg:w-[993px] desktop:h-[927px]  desktop:w-[1487px]">
				<div className="hidden sm:block md:block lg:block desktop:block">
					<div className=" grid grid-cols-2 sm:mt-[23px] sm:gap-y-[17px] sm:gap-x-[50px] md:mt-[29px] md:gap-y-[15px] md:gap-x-[56px] lg:mt-[39px] lg:gap-y-[20px] lg:gap-x-[80px] desktop:mt-[61px] desktop:gap-y-[95px] desktop:gap-x-[140px]">
						<WhyBuyTile
							imageClassName=" sm:w-[34px] sm:h-[35px] md:w-[39px] md:h-[41px]  lg:w-[52px] lg:h-[54px]  desktop:w-[80px] desktop:h-[84px] "
							imageUrl="/static/images/WhyBuyImages/verified-seller.png"
							contentContainerClassName="sm:w-[246px] sm:mt-[11px] md:w-[284px] md:mt-[13px] lg:w-[379px] lg:mt-[18px] desktop:w-[580px]  desktop:mt-[28px] "
							title="Verified Seller"
							subtitle="Discover a vast selection of products from trusted sellers across various industries."
						/>
						<WhyBuyTile
							imageClassName=" sm:w-[41px] sm:h-[41px] md:w-[48px] md:h-[48px]  lg:w-[64px] lg:h-[64px]  desktop:w-[98px] desktop:h-[98px] "
							imageUrl="/static/images/WhyBuyImages/buy-with-confidence.png"
							contentContainerClassName="sm:w-[244px] sm:mt-[12px] md:w-[281px] md:mt-[13px] lg:w-[374px] lg:mt-[18px] desktop:w-[572px] desktop:mt-[0px] "
							title="Buy with confidence"
							subtitle="At Tradewinds Marketplace, we prioritize your peace of mind when purchasing from new sellers online. Our platform employs robust tools and protocols to ensure a secure and reliable shopping experience, guaranteeing that you receive exactly what you ordered."
						/>
						<WhyBuyTile
							imageClassName="sm:w-[47px] sm:h-[47px] md:w-[54px] md:h-[54px]  lg:w-[73px] lg:h-[73px]  desktop:w-[112px] desktop:h-[112px]"
							imageUrl="/static/images/WhyBuyImages/sellers-come-to-you.png"
							contentContainerClassName="sm:w-[233px] sm:mt-[7px] md:w-[268px] md:mt-[9px] lg:w-[358px] lg:mt-[12px] desktop:w-[548px] desktop:mt-[19px] "
							title="Let the sellers come to you"
							subtitle="Specify your requirements and submit them in the Request for Quotation (RFQ) marketplace. Receive quotes from multiple sellers, usually within 24 hours or less."
						/>
						<WhyBuyTile
							imageClassName="sm:w-[35px] sm:h-[47px] md:w-[41px] md:h-[54px]  lg:w-[54px] lg:h-[73px] desktop:w-[82px] desktop:h-[112px] "
							imageUrl="/static/images/WhyBuyImages/fexible-payment.png"
							contentContainerClassName=" sm:w-[254px] sm:mt-[8px] md:w-[293px] md:mt-[9px] lg:w-[392px] lg:mt-[13px] desktop:w-[548px] desktop:mt-[20px] h-[19px]"
							title="Flexible payment options"
							subtitle="With TWMP, buyers can receive real-time financing assessments within seconds through our secure lending partners, Klarna and Afterpay."
						/>
					</div>

					<div className=" text-center sm:mt-[39px] md:mt-[56px] lg:mt-[77px] desktop:mt-[82px]">
						<button
							onClick={setIsSignUpOpen}
							className=" bg-secondary font-medium text-white sm:h-[25px] sm:w-[135px] sm:rounded-[5px] sm:text-[10px] md:h-[29px] md:w-[156px] md:rounded-[8px] md:text-[12px] lg:h-[39px] lg:w-[209px] lg:rounded-[10px] lg:text-[16px] desktop:h-[60px] desktop:w-[319px] desktop:rounded-[10px] desktop:text-[25px] "
						>
							Join Now
						</button>
					</div>
				</div>
				{/* This is for mobile */}
				<div className=" block sm:hidden ">
					<div className="  h-[822px] w-[300px] pl-[34px]">
						<WhyBuyTile
							imageClassName=" mt-[27px] w-[34px] h-[35px]  "
							imageUrl="/static/images/WhyBuyImages/verified-seller.png"
							contentContainerClassName=" mt-[11px] w-[247px] h-[61px] "
							title="Verified Seller"
							subtitle="Discover a vast selection of products from trusted sellers across various industries."
						/>
						<WhyBuyTile
							imageClassName=" mt-[54px] w-[47px] h-[47px] "
							imageUrl="/static/images/WhyBuyImages/buy-with-confidence.png"
							contentContainerClassName=" mt-[7px] w-[243px] h-[121px] "
							title="Buy with confidence"
							subtitle="At Tradewinds Marketplace, we prioritize your peace of mind when purchasing from new sellers online. Our platform employs robust tools and protocols to ensure a secure and reliable shopping experience, guaranteeing that you receive exactly what you ordered."
						/>
						<WhyBuyTile
							imageClassName=" mt-[45px] w-[41px] h-[41px] "
							imageUrl="/static/images/WhyBuyImages/sellers-come-to-you.png"
							contentContainerClassName=" mt-[11px] w-[233px] h-[91px]"
							title="Let the sellers come to you"
							subtitle="Specify your requirements and submit them in the Request for Quotation (RFQ) marketplace. Receive quotes from multiple sellers, usually within 24 hours or less."
						/>
						<WhyBuyTile
							imageClassName=" mt-[34px] h-[41px] w-[35px] "
							imageUrl="/static/images/WhyBuyImages/fexible-payment.png"
							contentContainerClassName=" mt-[8px] w-[255px] h-[77px]"
							title="Flexible payment options"
							subtitle="With TWMP, buyers can receive real-time financing assessments within seconds through our secure lending partners, Klarna and Afterpay."
						/>

						<div className=" mt-[45px] -ml-[94px] text-center sm:mt-[39px] md:mt-[56px] lg:mt-[77px] desktop:mt-[82px]">
							<button
								onClick={setIsSignUpOpen}
								className="h-[25px] w-[135px] rounded-[5px] bg-secondary font-medium text-white sm:h-[25px] sm:w-[135px] sm:rounded-[5px] sm:text-[10px] md:h-[29px] md:w-[156px] md:rounded-[8px] md:text-[12px] lg:h-[39px] lg:w-[209px] lg:rounded-[10px] lg:text-[16px] desktop:h-[60px] desktop:w-[319px] desktop:rounded-[10px] desktop:text-[25px] "
							>
								Join Now
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className=" bg-white sm:pt-[11px] md:pt-[13px] lg:pt-[18px] desktop:pt-[28px]">
				<div className=" left-0 mt-[33px] flex flex-col pl-[20px] font-semibold text-gray sm:items-center">
					<p className=" text-[18px] sm:text-[18px] md:text-[20px] lg:text-[25px] desktop:text-[50px] ">
						Features
					</p>
					<p className=" text-[12px] sm:text-[15px] md:text-[15px] lg:text-[18px] desktop:text-[25px]">
						Innovative digital tools that transform the wholesale
						experience
					</p>
				</div>

				<div className=" block pl-[20px] text-gray sm:mt-[13px] sm:ml-[25px] sm:flex sm:space-x-[42px] md:mt-[24px] md:ml-[48px] md:space-x-[48px] lg:mt-[32px] lg:ml-[82px] lg:space-x-[64px] desktop:mt-[54px] desktop:ml-[64px] desktop:space-x-[99px] ">
					<div className=" relative sm:h-[319px] sm:w-[299px] md:h-[283px] md:w-[345px] lg:h-[378px] lg:w-[460px]  desktop:h-[578px] desktop:w-[704px] ">
						<ImageWithErrorHandler
							src="/static/images/WhyBuyImages/cart-img.png"
							alt=""
							fill={true}
						/>
					</div>
					<div className="mt-[12px] h-[405px] w-[261px] space-y-[8px]  leading-[14px] sm:h-[332px] sm:w-[252px] sm:space-y-[4px] sm:leading-[12.2px] md:-mt-[10px] md:h-[333px] md:w-[247px] md:space-y-[5px] md:leading-[12px] lg:mt-0 lg:h-[408px] lg:w-[329px] lg:space-y-[8px] lg:leading-[16px] desktop:mt-0 desktop:h-[578px] desktop:w-[524px] desktop:space-y-[15px] desktop:leading-[24px]">
						<p>
							<span className=" text-[12px] font-semibold sm:text-[12px] md:text-[12px] lg:text-[15px] desktop:text-[24px]">
								Optimize your procurement operations
							</span>{' '}
							<br />
							<span className="text-[12px] font-normal sm:text-[10px] md:text-[10px] lg:text-[12px] desktop:text-[18px] ">
								Transform your wholesale operations with innovative
								digital tools.
							</span>
						</p>
						<p>
							<span className="text-[12px] font-semibold sm:text-[12px] md:text-[12px] lg:text-[15px] desktop:text-[24px]">
								Expand Your Procurement Horizons
							</span>{' '}
							<br />
							<span className="text-[12px] font-normal sm:text-[10px] md:text-[10px] lg:text-[12px] desktop:text-[18px] ">
								Unlock the Power of Diverse Procurement: Expand Your
								Options, Maximize Your Potential, and Mitigate Risks of
								Overreliance.
							</span>
						</p>
						<p>
							<span className="text-[12px] font-semibold sm:text-[12px] md:text-[12px] lg:text-[15px] desktop:text-[24px]">
								Explore a vast selection of products to suit your needs.
							</span>{' '}
							<br />
							<span className="text-[12px] font-normal sm:text-[10px] md:text-[10px] lg:text-[12px] desktop:text-[18px] ">
								Discover a diverse range of products on Tradewinds
								Marketplace, offering buyers the freedom to select the
								best sellers and items to meet their needs.
							</span>
						</p>
						<p>
							<span className="text-[12px] font-semibold sm:text-[12px] md:text-[12px] lg:text-[15px] desktop:text-[24px]">
								Flexible Buying Options 
							</span>{' '}
							<br />
							<span className="text-[12px] font-normal sm:text-[10px] md:text-[10px] lg:text-[12px] desktop:text-[18px] ">
								Buyers have the flexibility to purchase ready-to-ship
								products with a simple click or directly engage with
								sellers for price negotiation and customization options.
							</span>
						</p>
						<p>
							<span className="text-[12px] font-semibold sm:text-[12px] md:text-[12px] lg:text-[15px] desktop:text-[24px]">
								Dynamic Pricing- Optimize your sales
							</span>{' '}
							<br />
							<span className="text-[12px] font-normal sm:text-[10px] md:text-[10px] lg:text-[12px] desktop:text-[18px] ">
								Negotiate Pricing, Explore Ladder Pricing, and Set
								Minimum Order Quantities for Maximum Profitability.
							</span>
						</p>
					</div>
				</div>
				{/* this is for large screen */}
				<div className=" hidden rounded-[10px] bg-bg_gray text-gray sm:ml-[25px] sm:mt-[32px] sm:block sm:h-[409px] sm:w-[594px] md:ml-[43px] md:mt-[12px] md:h-[363px] md:w-[655px] lg:ml-[57px] lg:mt-[59px] lg:h-[485px] lg:w-[875px] desktop:ml-[72px] desktop:mt-[91px] desktop:h-[741px] desktop:w-[1337px]">
					<div className="sm:h-[37px] sm:pt-[13px] md:h-[38px] md:pt-[9px] lg:h-[87px] lg:pt-[18px] desktop:h-[115px]  desktop:pt-[34px] ">
						<p className=" text-center font-semibold sm:text-[18px] sm:leading-[20px] md:text-[18px] md:leading-[20px] lg:text-[25px] lg:leading-[30px] desktop:text-[50px] desktop:leading-[60px]  ">
							Communication Center
						</p>
						<p className=" text-center sm:text-[12px] sm:leading-[13px] md:text-[13px] md:leading-[14px] lg:text-[18px] lg:leading-[22px] desktop:text-[25px] desktop:leading-[27px]">
							Browse and Choose from Millions of products.
						</p>
					</div>
					<div className="flex sm:mt-[24px] sm:space-x-[47px] md:mt-[18px] md:space-x-[50px] lg:mt-[21px] lg:space-x-[106px] desktop:mt-[21px] desktop:space-x-[150px] ">
						<div className=" flex space-x-[10px] sm:ml-[30px] sm:space-x-[10px] md:ml-[22px] md:space-x-[12px] lg:ml-[30px] lg:space-x-[15px] desktop:ml-[40px]  desktop:space-x-[20px]">
							<div>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/messaging-center.png"
									alt="organic"
									imgClassname="sm:mt-[8px] sm:w-[14px] sm:h-[11px] md:mt-[8px] md:w-[16px] md:h-[12px] lg:mt-[8px] lg:w-[22px] lg:h-[17px] desktop:mt-[15px] desktop:w-[34px] desktop:h-[26px]"
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/product-inquiries.png"
									alt="Biodegradable"
									imgClassname="sm:mt-[54px] sm:w-[18px] sm:h-[13px] md:mt-[53px] md:w-[21px] md:h-[15px] lg:mt-[70px] lg:w-[28px] lg:h-[20px] desktop:mt-[90px] desktop:w-[44px] desktop:h-[31px]"
								/>
								<OperationTailImage
									imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
									alt="Nontoxic"
									imgClassname="sm:mt-[66px] sm:w-[15px] sm:h-[13px] md:mt-[50px] md:w-[17px] md:h-[13px] lg:mt-[60px] lg:w-[23px] lg:h-[20px] desktop:mt-[90px] desktop:w-[35px] desktop:h-[32px] "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/translation-tool.png"
									alt="Sustainably sourced"
									imgClassname="sm:mt-[56px] sm:w-[19px] sm:h-[17px] md:mt-[53px] md:w-[20px] md:h-[18px] lg:mt-[65px] lg:w-[25px] lg:h-[17px] desktop:mt-[85px]  desktop:w-[36px] desktop:h-[36px] "
								/>
							</div>
							<div className="sm:h-[316px] sm:w-[223px] sm:space-y-[10px] md:h-[290px] md:w-[257px] md:space-y-[12px] lg:h-[364px] lg:w-[310px] lg:space-y-[17px] desktop:h-[552px] desktop:w-[475px] desktop:space-y-[10px]">
								<OperationTailContent
									title="Messaging Center"
									subtitle="Take control of Supplier interactions: Build Loyalty, track leads, and manage orders effortlessly in a centralized platform."
								/>
								<OperationTailContent
									title="Product inquiries"
									subtitle="Seamless Connectivity: Connect with Sellers, Negotiate Pricing, Inquire about Products, and Personalize your Orders through Direct Messaging."
								/>
								<OperationTailContent
									title="Request for Quotation (RFQ)"
									subtitle="Effortless Sourcing: Post an RFQ and proactively discover and connect with sellers offering the products you need."
								/>
								<OperationTailContent
									title="Translation Tool"
									subtitle="You could send a message to a seller in English and your message will automatically be translated to Spanish. When they message you back, the text will automatically be translated to your preferred language, whether it be English, Mandarin, Italian, French, etc."
								/>
							</div>
						</div>
						<div className=" flex sm:space-x-[9px] md:space-x-[12px] lg:space-x-[18px] desktop:space-x-[20px]">
							<div>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/order-management-icon.png"
									alt="Order Management"
									imgClassname="sm:mt-[8px] sm:w-[16px] sm:h-[16px] md:mt-[8px] md:w-[19px] md:h-[19px] lg:mt-[10px] lg:w-[25px] lg:h-[25px] desktop:mt-[15px] desktop:w-[39px] desktop:h-[39px]  "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/effortlessly.png"
									alt="Effortlessly Manage Invoices"
									imgClassname="sm:mt-[63px] sm:w-[10px] sm:h-[14px] md:mt-[45px] md:w-[12px] md:h-[16px] lg:mt-[55px] lg:w-[25px] lg:h-[25px] desktop:mt-[80px] desktop:w-[20px] desktop:h-[30px]"
								/>
								<OperationTailImage
									imageUrl="/static/images/why-sell-on-tradewinds-images/proccessing.png"
									alt="Secure Processing"
									imgClassname="sm:mt-[53px] sm:w-[12px] sm:h-[17px] md:mt-[49px] md:w-[14px] md:h-[19px] lg:mt-[62px] lg:w-[16px] lg:h-[20px] desktop:mt-[85px] desktop:w-[30px] desktop:h-[40px] "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/logistics-and-fulfillment-img.png"
									alt="Simplified Logistics and Fulfillment"
									imgClassname="sm:mt-[37px] sm:w-[15px] sm:h-[15px] md:mt-[38px] md:w-[17px] md:h-[17px] lg:mt-[48px] lg:w-[23px] lg:h-[23px] desktop:mt-[55px]  desktop:w-[36px] desktop:h-[36px] "
								/>
							</div>
							<div className="sm:h-[296px] sm:w-[226px] sm:space-y-[10px] md:h-[249px] md:w-[232px] md:space-y-[12px] lg:h-[219px] lg:w-[310px] lg:space-y-[17px] desktop:h-[462px] desktop:w-[475px] desktop:space-y-[10px]">
								<OperationTailContent
									title="Order Management"
									subtitle="Simplify your Workflow: Streamline every step in a single platform and leverage on-platform tools for a seamless and efficient process."
								/>
								<OperationTailContent
									title="Effortlessly Manage Invoices"
									subtitle="Streamline the process of receiving, negotiating, and accepting invoices with utmost professionalism and minimal effort"
								/>
								<OperationTailContent
									title="Secure Processing"
									subtitle="Ensure the safety of your transactions with robust processing protection."
								/>
								<OperationTailContent
									title="Simplified Logistics and Fulfillment"
									subtitle="Experience the convenience of flexible and cost-efficient shipping rates through Tradewinds Marketplace"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* This is for mobile */}
				<div className=" block w-full pl-[16px] sm:hidden md:hidden lg:hidden desktop:hidden">
					<div className=" h-[51px] w-[259px]">
						<p className=" text-[18px] font-semibold  ">
							Communication Center
						</p>
						<p className=" text-[12px]">
							Browse and Choose from Millions of products.
						</p>
					</div>
					<div className=" pr-[60px]">
						<OperationTailImage
							imageUrl="/static/images/WhyBuyImages/messaging-center.png"
							alt="organic"
							imgClassname="w-[14px] h-[11px] mt-[22px]"
						/>
						<OperationTailContent
							title="Messaging Center"
							subtitle="Take control of Supplier interactions: Build Loyalty, track leads, and manage orders effortlessly in a centralized platform."
						/>
						<OperationTailImage
							imageUrl="/static/images/WhyBuyImages/product-inquiries.png"
							alt="Biodegradable"
							imgClassname="w-[18px] h-[13px] mt-[18px]"
						/>
						<OperationTailContent
							title="Product inquiries"
							subtitle="Seamless Connectivity: Connect with Sellers, Negotiate Pricing, Inquire about Products, and Personalize your Orders through Direct Messaging."
						/>
						<OperationTailImage
							imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
							alt="Nontoxic"
							imgClassname="w-[15px] h-[13px] mt-[15px]"
						/>
						<OperationTailContent
							title="Request for Quotation (RFQ)"
							subtitle="Effortless Sourcing: Post an RFQ and proactively discover and connect with sellers offering the products you need."
						/>
						<OperationTailImage
							imageUrl="/static/images/WhyBuyImages/translation-tool.png"
							alt="Sustainably sourced"
							imgClassname="w-[19px] h-[17px] mt-[15px] "
						/>
						<OperationTailContent
							title="Translation Tool"
							subtitle="You could send a message to a seller in English and your message will automatically be translated to Spanish. When they message you back, the text will automatically be translated to your preferred language, whether it be English, Mandarin, Italian, French, etc."
						/>

						<OperationTailImage
							imageUrl="/static/images/WhyBuyImages/order-management-icon.png"
							alt="Order Management"
							imgClassname="mt-[15px] w-[16px] h-[16px]"
						/>
						<OperationTailContent
							title="Order Management"
							subtitle="Simplify your Workflow: Streamline every step in a single platform and leverage on-platform tools for a seamless and efficient process."
						/>
						<OperationTailImage
							imageUrl="/static/images/WhyBuyImages/effortlessly.png"
							alt="Effortlessly Manage Invoices"
							imgClassname=" mt-[10px] w-[10px] h-[14px]"
						/>
						<OperationTailContent
							title="Effortlessly Manage Invoices"
							subtitle="Streamline the process of receiving, negotiating, and accepting invoices with utmost professionalism and minimal effort"
						/>
						<OperationTailImage
							imageUrl="/static/images/why-sell-on-tradewinds-images/proccessing.png"
							alt="Secure Processing"
							imgClassname="mt-[10px] w-[12px] h-[17px]"
						/>
						<OperationTailContent
							title="Secure Processing"
							subtitle="Ensure the safety of your transactions with robust processing protection."
						/>
						<OperationTailImage
							imageUrl="/static/images/WhyBuyImages/logistics-and-fulfillment-img.png"
							alt="Simplified Logistics and Fulfillment"
							imgClassname="mt-[10px] w-[15px] h-[15px]"
						/>
						<OperationTailContent
							title="Simplified Logistics and Fulfillment"
							subtitle="Experience the convenience of flexible and cost-efficient shipping rates through Tradewinds Marketplace"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeatureCommunication;
