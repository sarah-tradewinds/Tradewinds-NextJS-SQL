import Button from 'components/website/common/form/button';
import {
  WhyBuyOperationSubTile,
  WhyBuyOperationTile
} from 'components/website/common/why-buy/why-buy-operation-tile';
import WhyBuyTile from 'components/website/common/why-buy/why-buy-tile';
import { NextPage } from 'next';

const WhyBuyPage: NextPage = () => {
	return (
		<div className="">
			{/* Header section */}
			<div className="h-[263px] bg-[url('/static/images/WhyBuyImages/why-buy-header.png')] bg-cover bg-no-repeat md:h-[318px] lg:h-[680px]">
				<div className="flex justify-end p-16">
					<div className="md:w-1/2">
						<h1 className="text-[35px] font-semibold text-white md:text-[40px] lg:w-3/4 lg:text-[50px] lg:leading-[51px] lg:text-gray">
							Why BUY on Tradewinds Marketplace?
						</h1>
						{/* Content */}
						<div className="hidden grid-cols-2 gap-4 lg:grid">
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									Verified Sellers
								</h2>
								<p className="text-sm">
									Wide assortment of product from reliable sellers in
									multiple industries.
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									Buy with confidence
								</h2>
								<p className="text-sm">
									Buying from a new seller over the internet can feel a
									bit risky at first. TWMP.com uses several tools and
									protocols to make sure that you get what you ordered.
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">Net Terms</h2>
								<p className="text-sm">
									TWMP offers Real-time financing assessment within
									seconds for each buyer covering $30k+ through secure
									lending institutions.
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									Cost-effective
								</h2>
								<p className="text-sm">
									Lower cost to maximize your profit
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									Bring your ideas to life
								</h2>
								<p className="text-sm">
									Start/grow your business with confidence.
								</p>
							</div>
							<div className="w-80">
								<h2 className="text-accent-primary-main">
									Let the sellers come to you
								</h2>
								<p className="text-sm">
									Detail what you`&apos;`re looking for and share it in
									the Request for Quotation (RFQ) marketplace.
									You`&apos;`ll get quotes from multiple sellers - often
									in 24 hours or less!
								</p>
							</div>
						</div>
						<div className="mt-4 hidden text-center lg:block">
							<Button variant="buyer">Join Now</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Display only on small and medium */}
			<div className="lg:hidden">
				{/* Buyer platform features */}
				<div className="space-y-4 bg-white p-6 md:space-y-8 md:p-8 lg:hidden">
					<div className="md:text-center ">
						<h2 className="text-[18px] font-semibold text-primary-main">
							Buyer Platform Features
						</h2>
						<p> Browse and Choose from Millions of products</p>
					</div>

					<div className="grid gap-4 md:grid-cols-3 md:gap-8">
						<p className="text-[12px]">
							<span className="font-semibold text-primary-main">
								Millions of products to choose from TWMP
							</span>
							<span className="text-gray">
								provides a wide variety of products to choose from
								giving buyers the flexibility to choose the seller and
								items best suited for them.
							</span>
						</p>
						<p className="text-[12px]">
							<span className="font-semibold text-primary-main">
								Millions of products to choose from TWMP
							</span>
							<span className="text-gray">
								provides a wide variety of products to choose from
								giving buyers the flexibility to choose the seller and
								items best suited for them.
							</span>
						</p>
						<p className="text-[12px]">
							<span className="font-semibold text-primary-main">
								Millions of products to choose from TWMP
							</span>
							<span className="text-gray">
								provides a wide variety of products to choose from
								giving buyers the flexibility to choose the seller and
								items best suited for them.
							</span>
						</p>
					</div>
					<div className="flex justify-center">
						<Button variant="buyer">Join Now</Button>
					</div>
				</div>

				<div className="flex h-[426px] flex-col items-center justify-center bg-primary-main bg-[url('/static/images/WhyBuyImages/why-buy.png')] bg-cover bg-no-repeat px-4 md:space-y-8">
					<h2 className="text-[18px] font-semibold text-white">
						Connect freely to build lasting relationships
					</h2>
					<div className="grid gap-4 md:grid-cols-3">
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/messaging-center-orange.png"
							title="Messaging Center"
							subtitle="Interact with suppliers on your terms to foster loyalty, repeat purchases and track leads and orders all in one place."
							contentContainerClassName="!text-left"
							imageClassName="hidden md:block"
						/>
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/product-inquiries-orange.png"
							title="Product inquiries"
							subtitle="Each sale is a conversation that starts with an inquiry, so you can message sellers directly to negotiate prices or customize your products."
							contentContainerClassName="!text-left"
							imageClassName="hidden md:block"
						/>
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/rfq-orange.png"
							title="Request for Quotation (RFQ)"
							subtitle="Post a RFQ and proactively find and connect with sellers with products you are sourcing."
							contentContainerClassName="!text-left"
							imageClassName="hidden md:block"
						/>
					</div>
					<div className="hidden justify-center md:flex">
						<Button variant="special">Join Now</Button>
					</div>
				</div>

				{/* Utilize Resourceful Tools Sections*/}
				<div className="space-y-4 bg-white px-8 py-8 md:space-y-8 md:px-16">
					<h2 className="text-[18px] font-semibold text-primary-main md:text-center">
						Utilize Resourceful Tools
					</h2>
					<WhyBuyOperationSubTile
						imageUrl="/static/images/WhyBuyImages/translation-tool.png"
						title="Translation Tool"
						subtitle="The most valuable tool for global expansion is the automatic translation of storefronts and private messages. The platform currently supports multiple languages, which helps knock out the issue of language barrier. This means that you could send a message to a seller in English and your message will automatically be translated to Spanish. When they message you back, the text will automatically be translated to your preferred language, whether it be English, Mandarin, Italian, French, etc.."
						imgClassName="hidden md:block"
						className="-ml-8 md:ml-0"
					/>
					<WhyBuyOperationSubTile
						imageUrl="/static/images/WhyBuyImages/currency-conversions.png"
						title="Currency conversions"
						subtitle="You can see listings in your preferred currency, so you don’t have to manually calculate the conversions."
						imgClassName="hidden md:block"
						className="-ml-8 md:ml-0"
					/>
					<div className="hidden justify-center md:flex">
						<Button variant="product">Join Now</Button>
					</div>
				</div>

				{/* Manage every step in one place */}
				<div className="space-y-8 bg-accent-primary-main p-8">
					<h2 className="text-[18px] font-semibold text-white md:text-center">
						Manage every step in one place
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/dollar.png"
							title="Processing Protection"
							subtitle="Initiate secure payments through TWMP.com enabling confidence through buyer and seller."
							contentClassName="!text-white"
							imgClassName="hidden md:block w-[33px] h-[39px]"
							className="-ml-8 md:-ml-0"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/dollar.png"
							title="Processing Protection"
							subtitle="Initiate secure payments through TWMP.com enabling confidence through buyer and seller."
							contentClassName="!text-white"
							imgClassName="hidden md:block w-[33px] h-[39px]"
							className="-ml-8 md:-ml-0"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/invoice.png"
							title="Receive Invoices"
							subtitle="Receive, negotiate, and accept invoices with minimum effort and maximum professionalism."
							contentClassName="!text-white"
							imgClassName="hidden md:block w-[33px] h-[39px]"
							className="-ml-8 md:-ml-0"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/flight.png"
							title="Logistics and Fulfillment"
							subtitle="Enjoy flexible and cost-efficient shipping rates with TWMP.com"
							contentClassName="!text-white"
							imgClassName="hidden md:block w-[33px] h-[39px]"
							className="-ml-8 md:-ml-0"
						/>
					</div>
					<div className="hidden justify-center md:flex">
						<Button variant="buyer" className="bg-gray">
							Join Now
						</Button>
					</div>
				</div>
			</div>

			{/* Why Buy points section only display on large screen*/}
			<div className="hidden justify-center bg-primary-main bg-[url('/static/images/WhyBuyImages/why-buy.png')] bg-cover bg-no-repeat lg:flex">
				<div className="w-3/4  p-8">
					<h2 className="my-8 text-center text-[50px] text-white">
						Why Buy in the Western Hemisphere?
					</h2>

					<div className="mt-16 grid grid-cols-2 gap-16">
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/timezone.png"
							title="Time Zone Compatibility"
							subtitle="Minimum time zone differences significantly help simplify communication and coordination."
						/>
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/cultural.png"
							title="Cultural Closeness"
							subtitle="Nearshoring allows you to access a bilingual community of professionals with a similar cultural background to ease communication."
						/>
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/free-trade.png"
							title="Free Trade"
							subtitle="There are more than 100 regional trade agreements
						in the Western Hemisphere. The U.S. currently has 14 Free
						Trade Agreements with 20 countries."
						/>
						<WhyBuyTile
							imageUrl="/static/images/WhyBuyImages/swift-trun-around.png"
							title="Swift Turn Around"
							subtitle="Since Latin America and The Caribbean are proximally closer to the USA your products will be delivered faster."
						/>
					</div>

					<div className="mt-8 text-center">
						<Button variant="special">Join Now</Button>
					</div>
				</div>
			</div>

			{/*  */}
			<div className="hidden bg-white p-16 lg:block">
				<div className="flex flex-col items-center text-primary-main">
					<h2 className="text-[50px] ">
						Streamline your percurment operations
					</h2>
					<p className="font-semibold">
						Innovative digital tools that transform the wholesale
						experience
					</p>

					<div className="mt-8 text-center">
						<Button variant="buyer">Buy Now</Button>
					</div>
				</div>

				<div className="space-y-16">
					<WhyBuyOperationTile
						imageUrl="/static/images/WhyBuyImages/cart.png"
						title="Enhance buy power"
						subtitle="Browse and Choose from Millions of products."
						className="pl-8"
						displayBorder={true}
					>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/store.png"
							title="Millions of products to choose from"
							subtitle="TWMP provides a wide variety of products to choose from giving buyers the flexibility to choose the seller and items  best suited for them."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/buying-options.png"
							title="Buying Options"
							subtitle="Buyers can choose to order ready to ship products, which is as simple as adding items to a cart, entering your payment information and placing your order or message sellers directly to negotiate prices or customize your products."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/dynamic-pricing.png"
							title="Dynamic Pricing"
							subtitle="Negotiate pricing with seller, browse multiple ladder pricing options, and [MOQs] Minimum Order Quantities to optimize each individual sale."
							className="mt-2"
						/>
					</WhyBuyOperationTile>

					<WhyBuyOperationTile
						imageUrl="/static/images/WhyBuyImages/iot.png"
						title="Communication Center"
						subtitle="Browse and Choose from Millions of products."
						className="pl-8"
						containerClassName="flex-row-reverse"
						displayBorder={true}
					>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/messaging-center.png"
							title="Messaging Center"
							subtitle="Interact with suppliers on your terms to foster loyalty, repeat purchases and track leads and orders all in one place."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/product-inquiries.png"
							title="Product inquiries"
							subtitle="ach sale is a conversation that starts with an inquiry, so you can message sellers directly to negotiate prices or customize your products."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/rfq.png"
							title="Request for Quotation (RFQ)"
							subtitle="Post a RFQ and proactively find and connect with sellers with products you are sourcing."
							className="mt-2"
						/>
					</WhyBuyOperationTile>

					<WhyBuyOperationTile
						imageUrl="/static/images/WhyBuyImages/tools.png"
						title="Tools"
						subtitle="The very nature of TWMP.com is the usefulness for businesses who are looking to source global, and the platform has special tools for buyers who want to conduct business across borders."
						className="pl-8"
						displayBorder={true}
					>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/translation-tool.png"
							title="Translation Tool"
							subtitle="You could send a message to a seller in English and your message will automatically be translated to Spanish. When they message you back, the text will automatically be translated to your preferred language, whether it be English, Mandarin, Italian, French, etc."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/currency-conversions.png"
							title="Currency conversions"
							subtitle="You can see listings in your preferred currency, so you don’t have to manually calculate the conversions."
							className="mt-2"
						/>
					</WhyBuyOperationTile>

					<WhyBuyOperationTile
						imageUrl="/static/images/WhyBuyImages/order.png"
						title="Order Management"
						subtitle="Manage every step in one place Take advantage of on-platform tools that ensure a simple, seamless process for you."
						className="pl-8"
						containerClassName="flex-row-reverse"
					>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/receive-invoices.png"
							title="Receive Invoices"
							subtitle="Receive, negotiate and accept invoices with minimum effort and maximum professionalism."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/processing-protection.png"
							title="Processing Protection"
							subtitle="Initiate secure payments through TWMP.com enabling confidence through buyer and seller."
							className="mt-2"
						/>
						<WhyBuyOperationSubTile
							imageUrl="/static/images/WhyBuyImages/processing-protection.png"
							title="Logistics and Fulfillment"
							subtitle="Enjoy flexible and cost efficient shipping rates with TWMP.com"
							className="mt-2"
						/>
					</WhyBuyOperationTile>
				</div>
			</div>
		</div>
	);
};

export default WhyBuyPage;
