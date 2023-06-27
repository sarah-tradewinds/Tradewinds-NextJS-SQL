import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import {
	OperationTailContent,
	OperationTailImage
} from 'components/common/why-buy/why-buy-operation-tile';
import WhyBuyTile from 'components/common/why-buy/why-buy-tile';

function FeatureCommunication() {
	return (
		<div className="container mx-auto ">
			{/* Why Buy points section only display on large screen*/}
			<div className="z-50  flex h-[927px] w-full justify-center bg-[url('/static/images/WhyBuyImages/why-buy-second-banner.png')]  bg-no-repeat">
				<div className="  ">
					<div className=" grid grid-cols-2 gap-x-[120px]">
						<WhyBuyTile
							imageClassName=" w-[80px] h-[84px] mt-[61px]  "
							imageUrl="/static/images/WhyBuyImages/verified-seller.png"
							contentContainerClassName="w-[580px] mt-[28px] h-[219px]"
							title="Verified Seller"
							subtitle="Discover a vast selection of products from trusted sellers across various industries."
						/>
						<WhyBuyTile
							imageClassName=" w-[98px] h-[98px] mt-[48px]"
							imageUrl="/static/images/WhyBuyImages/buy-with-confidence.png"
							contentContainerClassName="w-[572px] mt-[28px] h-[135px]"
							title="Buy with confidence"
							subtitle="At Tradewinds Marketplace, we prioritize your peace of mind when purchasing from new sellers online. Our platform employs robust tools and protocols to ensure a secure and reliable shopping experience, guaranteeing that you receive exactly what you ordered."
						/>
						<WhyBuyTile
							imageClassName=" w-[112px] h-[112px]"
							imageUrl="/static/images/WhyBuyImages/sellers-come-to-you.png"
							contentContainerClassName="w-[548px] mt-[19px] h-[129px]"
							title="Let the sellers come to you"
							subtitle="Specify your requirements and submit them in the Request for Quotation (RFQ) marketplace. Receive quotes from multiple sellers, usually within 24 hours or less."
						/>
						<WhyBuyTile
							imageClassName=" w-[82px] h-[112px] "
							imageUrl="/static/images/WhyBuyImages/fexible-payment.png"
							contentContainerClassName="w-[599px] mt-[20px] h-[19px]"
							title="Flexible payment options"
							subtitle="With TWMP, buyers can receive real-time financing assessments within seconds through our secure lending partners, Klarna and Afterpay."
						/>
					</div>

					<div className=" mt-[82px] text-center">
						<Button
							variant="special"
							className=" h-[60px] w-[319px] text-[25px] font-medium "
						>
							Join Now
						</Button>
					</div>
				</div>
			</div>

			<div className=" bg-white pt-[28px] pb-[48px]">
				<div className="flex flex-col items-center font-semibold text-primary-main">
					<p className="text-[50px] ">Features</p>
					<p className="text-[25px]">
						Innovative digital tools that transform the wholesale
						experience
					</p>
				</div>

				<div className=" ml-[93px] mt-[54px] flex space-x-[99px] text-primary-main ">
					<div className=" relative  h-[578px] w-[704px] ">
						<ImageWithErrorHandler
							src="/static/images/WhyBuyImages/cart-img.png"
							alt=""
							fill={true}
						/>
					</div>
					<div className=" w-[529px]">
						<p>
							<span className=" text-[24px] font-semibold">
								Optimize your procurement operations
							</span>{' '}
							<br />
							<span className=" text-[18px] font-normal ">
								Transform your wholesale operations with innovative
								digital tools.
							</span>
						</p>
						<p>
							<span className=" text-[24px] font-semibold">
								Expand Your Procurement Horizons
							</span>{' '}
							<br />
							<span className=" text-[18px] font-normal ">
								Unlock the Power of Diverse Procurement: Expand Your
								Options, Maximize Your Potential, and Mitigate Risks of
								Overreliance.
							</span>
						</p>
						<p>
							<span className=" text-[24px] font-semibold">
								Explore a vast selection of products to suit your needs.
							</span>{' '}
							<br />
							<span className=" text-[18px] font-normal ">
								Discover a diverse range of products on Tradewinds
								Marketplace, offering buyers the freedom to select the
								best sellers and items to meet their needs.
							</span>
						</p>
						<p>
							<span className=" text-[24px] font-semibold">
								Flexible Buying Options 
							</span>{' '}
							<br />
							<span className=" text-[18px] font-normal ">
								Buyers have the flexibility to purchase ready-to-ship
								products with a simple click or directly engage with
								sellers for price negotiation and customization options.
							</span>
						</p>
						<p>
							<span className=" text-[24px] font-semibold">
								Dynamic Pricing- Optimize your sales
							</span>{' '}
							<br />
							<span className=" text-[18px] font-normal ">
								Negotiate Pricing, Explore Ladder Pricing, and Set
								Minimum Order Quantities for Maximum Profitability.
							</span>
						</p>
					</div>
				</div>
				<div className=" mt-[91px] ml-[83px] h-[741px] w-[1337px] rounded-[10px] bg-bg_gray text-primary-main">
					<div className="h-[115px]  pt-[34px] ">
						<p className=" text-center text-[50px] font-semibold leading-[60px]  ">
							Communication Center
						</p>
						<p className=" text-center text-[25px] leading-[27px]">
							Browse and Choose from Millions of products.
						</p>
					</div>
					<div className="mt-[21px] flex space-x-[120px] ">
						<div className="ml-[40px] flex  space-x-[20px]">
							<div>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/messaging-center.png"
									alt="organic"
									imgClassname=" mt-[15px] w-[34px] h-[26px]  "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/product-inquiries.png"
									alt="Biodegradable"
									imgClassname=" mt-[90px] w-[44px] h-[31px]"
								/>
								<OperationTailImage
									imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
									alt="Nontoxic"
									imgClassname=" mt-[90px] w-[35px] h-[32px] "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/translation-tool.png"
									alt="Sustainably sourced"
									imgClassname=" mt-[85px]  w-[36px] h-[36px] "
								/>
							</div>
							<div className=" h-[552px] w-[475px] space-y-[10px]">
								<OperationTailContent
									title="Messaging Center"
									subtitle="Take control of Supplier interactions: Build Loyalty, track leads, and manage orders effortlessly in a centralized platform."
									contentClassName="text-gray text-[35px] font-semibold leading-[42px] "
								/>
								<OperationTailContent
									title="Product inquiries"
									subtitle="Seamless Connectivity: Connect with Sellers, Negotiate Pricing, Inquire about Products, and Personalize your Orders through Direct Messaging."
									contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
								/>
								<OperationTailContent
									title="Request for Quotation (RFQ)"
									subtitle="Effortless Sourcing: Post an RFQ and proactively discover and connect with sellers offering the products you need."
									contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
								/>
								<OperationTailContent
									title="Translation Tool"
									subtitle="You could send a message to a seller in English and your message will automatically be translated to Spanish. When they message you back, the text will automatically be translated to your preferred language, whether it be English, Mandarin, Italian, French, etc."
									contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
								/>
							</div>
						</div>
						<div className="ml-[40px] flex  space-x-[20px]">
							<div>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/order-management-icon.png"
									alt="Order Management"
									imgClassname=" mt-[15px] w-[39px] h-[39px]  "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/invoice.png"
									alt="Effortlessly Manage Invoices"
									imgClassname=" mt-[80px] w-[20px] h-[30px]"
								/>
								<OperationTailImage
									imageUrl="/static/images/why-sell-on-tradewinds-images/proccessing.png"
									alt="Secure Processing"
									imgClassname=" mt-[85px] w-[30px] h-[40px] "
								/>
								<OperationTailImage
									imageUrl="/static/images/WhyBuyImages/logistics-and-fulfillment-img.png"
									alt="Simplified Logistics and Fulfillment"
									imgClassname=" mt-[55px]  w-[36px] h-[36px] "
								/>
							</div>
							<div className=" h-[462px] w-[475px] space-y-[10px]">
								<OperationTailContent
									title="Order Management"
									subtitle="Simplify your Workflow: Streamline every step in a single platform and leverage on-platform tools for a seamless and efficient process."
									contentClassName="text-gray text-[35px] font-semibold leading-[42px] "
								/>
								<OperationTailContent
									title="Effortlessly Manage Invoices"
									subtitle="Streamline the process of receiving, negotiating, and accepting invoices with utmost professionalism and minimal effort"
									contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
								/>
								<OperationTailContent
									title="Secure Processing"
									subtitle="Ensure the safety of your transactions with robust processing protection."
									contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
								/>
								<OperationTailContent
									title="Simplified Logistics and Fulfillment"
									subtitle="Experience the convenience of flexible and cost-efficient shipping rates through Tradewinds Marketplace"
									contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeatureCommunication;
