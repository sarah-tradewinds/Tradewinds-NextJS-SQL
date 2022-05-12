import Button from 'components/website/common/form/button';
import Seo from 'components/website/common/seo';
import {
	WhyBuyOperationSubTile,
	WhyBuyOperationTile
} from 'components/website/common/why-buy/why-buy-operation-tile';

import { NextPage } from 'next';
import Image from 'next/image';

const WhySellOnTradewindsPage: NextPage = () => {
	return (
		<>
			<Seo title="Why sell on tradewinds page" description="" />
			<div>
				{/* Header */}
				<div className="relative h-[300px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-sell-on-tradewinds-header.png')] bg-cover bg-center bg-no-repeat md:h-[340px] lg:h-[703px]">
					<div className="absolute inset-0 z-[1] bg-black opacity-40"></div>

					<div className="absolute left-20 top-8 z-[50] text-white lg:top-32 lg:w-1/2">
						<h1 className="text-[35px] font-semibold md:text-[40px] lg:text-[50px] ">
							Why Sell on Tradewinds Marketplace?
						</h1>
						<div className="hidden space-y-2 font-semibold md:block md:text-[16px] lg:text-[25px]">
							<p>Unified Trading Experience</p>
							<p>
								Platform that helps Small and medium-sized enterprises
								go global
							</p>
							<p>
								Connect with millions of business buyers from around the
								world
							</p>
						</div>
						<Button variant="buyer" className="mt-8">
							Join Now
						</Button>
					</div>
				</div>

				{/* Power is in the Number */}
				<div className="space-y-4">
					<div className="p-4 text-center md:p-8">
						<h2 className="text-[24px] font-semibold text-primary-main md:text-[40px] lg:text-[50px]">
							Power is in the Number
						</h2>
						<p className="25px font-semibold text-primary-main">
							Let the sellers come to you
						</p>
						<p className="text-[12px] text-gray md:text-[15px]">
							Detail what you`&apos;`re looking for and share it in the
							Request for Quotation (RFQ) marketplace. You`&apos;`ll get
							quotes from multiple sellers - often in 24 hours or less!
						</p>
					</div>
					<div className="space-y-4 md:bg-white md:p-8">
						<div className="flex flex-wrap justify-center text-primary-main">
							<div>
								<h3 className="text-[40px] lg:text-[50px]">
									Stand Alone vs.
								</h3>
								<p className="hidden w-56 text-[14px] md:block">
									Building a site with similar feature as TWMP
								</p>
							</div>
							<div>
								<h3 className="text-[40px] lg:text-[50px]">
									Tradewinds
								</h3>
								<p className="hidden w-56 text-[14px] md:block">
									Membership of TradeWinds MP
								</p>
							</div>
						</div>
						{/* Images for small device */}
						<div className="space-y-8 md:hidden">
							{/* Stand Alone vs. Tradewinds */}
							<div className="bg-white p-8">
								<h3 className="flex flex-col items-center text-gray">
									<span className="text-[96px] font-semibold">5x</span>
									<span className="text-[25px]">Traffic</span>
								</h3>
								<div className="flex justify-between">
									<div className="space-y-2 text-primary-main">
										<div className="relative h-[95px] w-[119px]">
											<Image
												src="/static/images/why-sell-on-tradewinds-images/non-member.png"
												alt=""
												layout="fill"
											/>
										</div>
										<p className="text-center text-[10px]">
											Non Member
										</p>
									</div>
									<div className="space-y-2">
										<div className="relative h-[95px] w-[119px]">
											<Image
												src="/static/images/why-sell-on-tradewinds-images/twmp-member.png"
												alt=""
												layout="fill"
											/>
										</div>
										<p className="text-center text-[10px] ">
											TWMP Member
										</p>
									</div>
								</div>
							</div>
							{/* Purchasing Exposure */}
							<div className="space-y-4 p-8">
								<h2 className=" text-center text-[25px]">
									Purchasing Exposure
								</h2>
								<div className="flex justify-between">
									<div className="space-y-2 text-primary-main">
										<div className="relative h-[95px] w-[119px]">
											<Image
												src="/static/images/why-sell-on-tradewinds-images/cart-non-member.png"
												alt=""
												layout="fill"
											/>
										</div>
										<p className="text-center text-[10px]">
											Non Member
										</p>
									</div>
									<div className="space-y-2 text-primary-main">
										<div className="relative h-[95px] w-[119px]">
											<Image
												src="/static/images/why-sell-on-tradewinds-images/cart-twmp-member.png"
												alt=""
												layout="fill"
											/>
										</div>
										<p className="text-center text-[10px]">
											TWMP Member
										</p>
									</div>
								</div>
							</div>

							{/* Website cost */}
							<div className="bg-white p-8">
								<h3 className="flex flex-col items-center text-gray">
									<span className="text-[96px] font-semibold">70%</span>
									<span className="text-[25px]">Website Cost</span>
								</h3>
								<div className="flex justify-between">
									<div className="space-y-2 text-primary-main">
										<div className="relative h-[95px] w-[119px]">
											<Image
												src="/static/images/why-sell-on-tradewinds-images/dollar-non-member.png"
												alt=""
												layout="fill"
											/>
										</div>
										<p className="text-center text-[10px]">
											Non Member
										</p>
									</div>
									<div className="space-y-2 text-primary-main">
										<div className="relative h-[95px] w-[119px]">
											<Image
												src="/static/images/why-sell-on-tradewinds-images/dollar-twmp-member.png"
												alt=""
												layout="fill"
											/>
										</div>
										<p className="text-center text-[10px]">
											TWMP Member
										</p>
									</div>
								</div>
							</div>
						</div>
						{/* Images for medium and large screen */}
						<div className="hidden flex-col items-center space-y-4 md:flex">
							<div className="relative h-[174px] md:w-[431px] lg:w-[812px]">
								<Image
									src="/static/images/why-sell-on-tradewinds-images/5x-traffic.png"
									alt=""
									layout="fill"
								/>
							</div>
							<div className="flex space-x-4">
								<div className="relative h-[174px] md:w-[361px] lg:w-[690px]">
									<Image
										src="/static/images/why-sell-on-tradewinds-images/6x-purchasing-exposure.png"
										alt=""
										layout="fill"
									/>
								</div>
								<div className="relative h-[174px]  md:w-[361px] lg:w-[690px]">
									<Image
										src="/static/images/why-sell-on-tradewinds-images/website-cost.png"
										alt=""
										layout="fill"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Why Sell in the  Western Hemisphere?
				 */}
				<div className="relative h-[1080px] bg-[url('/static/images/why-sell-on-tradewinds-images/why-buy.png')] bg-cover bg-center bg-no-repeat md:h-[900px] lg:h-[780px]">
					<div className="absolute inset-0 bg-primary-main opacity-50"></div>
					<div className="z-2 absolute inset-0">
						<div className="space-y-8 py-8 px-8 md:px-24">
							<h2 className="text-center text-[27px] font-semibold text-white md:text-[40px] lg:text-[50px]">
								Why Sell in the Western Hemisphere?
							</h2>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-[50px] font-semibold text-secondary md:text-[55px] lg:text-[99px]">
										331 Million
									</h3>
									<p className="-mt-4 text-[18px] font-semibold text-white md:text-[20px] lg:text-[25px]">
										Largest Market
									</p>
									<p className="text-[12px] text-white md:text-[16px] lg:text-[18px]">
										The US has an open consumer market of over 331
										million Americans
									</p>
								</div>
								<div className="flex flex-col items-center text-center">
									<div className="relative h-[95px] w-[147px] md:h-[55px] md:w-[85px] lg:h-[95px] lg:w-[147px]">
										<Image
											src="/static/images/why-sell-on-tradewinds-images/diversity.png"
											alt=""
											layout="fill"
										/>
									</div>
									<p className="mt-4 text-[18px]  font-semibold text-white md:text-[20px] lg:text-[25px]">
										Diversity
									</p>
									<p className="text-[12px] text-white md:text-[16px] lg:text-[18px]">
										The US market is diverse with a range of income
										levels and consumer tastes, meaning demand for a
										wide range of goods and services
									</p>
								</div>
								<div className="flex flex-col items-center text-center">
									<div className="relative h-[107px] w-[107px] md:h-[52px] md:w-[52px] lg:h-[107px] lg:w-[107px]">
										<Image
											src="/static/images/why-sell-on-tradewinds-images/free-trade.png"
											alt=""
											layout="fill"
										/>
									</div>
									<p className="mt-4 font-semibold text-white md:text-[20px] lg:text-[25px]">
										Free Trade
									</p>
									<p className=" text-white md:text-[16px] lg:text-[18px]">
										There are more than 100 regional trade agreements in
										the Western Hemisphere. The U.S. currently has 14
										Free Trade Agreements with 20 countries
									</p>
								</div>
								<div className="text-center">
									<h3 className="text-[50px] font-semibold text-secondary md:text-[55px] lg:text-[99px]">
										$1.9 Trillion
									</h3>
									<p className="-mt-4 text-[18px]  font-semibold text-white md:text-[20px] lg:text-[25px]">
										Active Buyers
									</p>
									<p className="text-[12px] text-white md:text-[16px] lg:text-[18px]">
										The US has an active internet user base of 284
										million, 256 million active digital buyers and a B2B
										e-Commerce market size of $1.9 trillion
									</p>
								</div>
							</div>
							<div className="flex justify-center">
								<Button variant="special">Join Now</Button>
							</div>
						</div>
					</div>
				</div>

				{/* B2B tools to simplify your operations */}
				<div className="bg-white">
					<div className="space-y-8 p-4 text-center text-primary-main md:p-8">
						<div>
							<h2 className="text-[24px] font-semibold md:text-[40px] lg:text-[50px]">
								B2B tools to simplify your operations
							</h2>
							<p className="text-[18px] md:font-semibold lg:text-[25px]">
								Innovative digital tools that transform the wholesale
								experience
							</p>
						</div>
						<Button variant="buyer">Buy Now</Button>
					</div>

					<div className="space-y-8">
						<WhyBuyOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/custom-store-front.png"
							title="Custom Storefront Set up a store that showcases your products."
							className="pl-8"
							containerClassName="md:pr-4 lg:pr-0 border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
								title="Digital Storefront"
								subtitle="Create a digital identity that helps you brand your business and showcase your capabilities - no design or coding required."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/smart-product-posting.png"
								title="Smart product posting"
								subtitle="Optimize your product listings for SEO with posting suggestions based on  titles, keywords, and more."
								imgClassName="hidden md:block"
								className="-ml-4 pt-4 md:-ml-0"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png"
								title="Dynamic Pricing"
								subtitle="Negotiate pricing with seller, browse multiple ladder pricing options, and [MOQs] Minimum Order Quantities to optimize each individual sale."
								imgClassName="hidden md:block"
								className="-ml-4 pt-4 md:-ml-0"
							/>
						</WhyBuyOperationTile>
						<WhyBuyOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/communication-center.png"
							title="Communication Center"
							subtitle="Connect freely to build lasting relationships"
							className="pl-8"
							containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/messaging-center.png"
								title="Messaging Center"
								subtitle="Interact with customers on your terms and  to foster loyalty and repeat sales and track leads and orders all in one place"
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/translation-tool.png"
								title="Translation tools"
								subtitle="Communicate seamlessly with conversations translated into  choice languages, so you can sell to a global buyer base."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
								title="Request for Quotation (RFQ)"
								subtitle="Post a RFQ and proactively find and connect with sellers with products you are sourcing."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
						</WhyBuyOperationTile>
						<WhyBuyOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/rfq.png"
							title="Request for Quotation (RFQ)"
							subtitle="Create a digital storefront and get your brand seen globally - no coding skills required."
							className="pl-8"
							containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/store-front.png"
								title="Digital Storefront"
								subtitle="Create a digital identity that helps you brand your business and showcase your capabilities - no design or coding required."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/smart-product-posting.png"
								title="Smart product posting"
								subtitle="Optimize your product listings for SEO with posting suggestions based on  titles, keywords, and more."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/dynamic-pricing.png"
								title="Dynamic Pricing"
								subtitle="Negotiate pricing with seller, browse multiple ladder pricing options, and [MOQs] Minimum Order Quantities to optimize each individual sale."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
						</WhyBuyOperationTile>
						<WhyBuyOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/marketing.png"
							title="Marketing"
							subtitle="Find the right buyers for your products and market directly to them with tools to increase exposure and conversions."
							className="pl-8"
							containerClassName="md:pr-4 lg:pr-0 lg:border-b-0 border-gray/40 pb-8 lg:pb-0 lg:flex-row-reverse border-b"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/sponsored-campaigns.png"
								title="Sponsored campaigns"
								subtitle="Increase traffic to your storefront and create interest for your products."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/keyword-advertising.png"
								title="Keyword Advertising"
								subtitle="Keyword Advertising is a value added service available to TWMP Members. This is a Precision Marketing Service With Massive Exposure"
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/pay-by-click.png"
								title="Pay by Click "
								subtitle="Pay only when a buyer clicks on your product."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/budget-control.png"
								title="Budget Control"
								subtitle="Meet your advertising expectations according to your desired budget. "
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/analytics.png"
								title="Analytics"
								subtitle="Meet your advertising expectations according to your desired budget."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
						</WhyBuyOperationTile>
						<WhyBuyOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/order-management.png"
							title="Order Management"
							subtitle={
								<>
									<p>Manage every step in one place</p>
									<p className="text-[18px]">
										Take advantage of on-platform tools that ensure a
										simple, seamless process for you and your buyers
									</p>
								</>
							}
							className="pl-8"
							containerClassName="md:pr-4 lg:pr-0 lg:border-b-0 border-gray/40 pb-8 lg:pb-0 lg:flex-row-reverse border-b"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/invoice.png"
								title="Invoice Creation "
								subtitle="Send beautifully branded invoices with minimum effort and maximum professionalism"
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/processing-protection.png"
								title="Processing Protection"
								subtitle="Accept secure customer payments through TWMP.com enabling confidence through buyer and seller"
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/payments.png"
								title="Payments"
								subtitle="Facilitate secure payments through financing services, wire transfer, credit card, or ACH, and transfer funds into your personal account to get paid."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/logistics-and-fulfillment.png"
								title="Logistics and Fulfillment"
								subtitle="Leverage flexible shipping rates that enable you to use TWMP.com Shipping or your own logistics provider for quotes and fulfillment. "
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
						</WhyBuyOperationTile>
						<WhyBuyOperationTile
							imageUrl="/static/images/why-sell-on-tradewinds-images/marketing.png"
							title="Analytics"
							subtitle="Continuously improve your store and sales"
							className="pl-8"
							containerClassName="md:pr-4 lg:pr-0 lg:flex-row-reverse border-b lg:border-b-0 border-gray/40 pb-8 lg:pb-0"
						>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/dashboards.png"
								title="Dashboards"
								subtitle="IVisualize your store’s metrics and historical data, and get intelligent suggestions based on platform information."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
							<WhyBuyOperationSubTile
								imageUrl="/static/images/why-sell-on-tradewinds-images/industry-analytics.png"
								title="Industry analytics"
								subtitle="Understand the state of your category and which products perform best through demand analysis, trend analysis price comparisons, and more."
								className="-ml-4 pt-4 md:-ml-0"
								imgClassName="hidden md:block"
							/>
						</WhyBuyOperationTile>
					</div>
				</div>
			</div>
		</>
	);
};

export default WhySellOnTradewindsPage;
