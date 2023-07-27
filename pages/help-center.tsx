import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HelpCenter = () => {
	return (
		<div className="flex flex-col items-center bg-white py-8">
			<div className="w-full space-y-4 px-4 lg:w-1/2">
				<section>
					<h2 className="font-semibold text-primary-main">
						Help Center
					</h2>
					<p className="text-sm md:text-base">
						Contact: Support@tradewindsmarketplace.com
					</p>
				</section>

				{/* Account Questions */}
				<section className="space-y-4">
					<h1 className="font-semibold text-primary-main" id="faq">
						FAQ
					</h1>
					{/* Account Questions */}
					<div className="text-sm">
						<h2 className="font-semibold">Account Questions</h2>
						<div className="">
							<p className="">
								What should I do if I forgot my password?
							</p>
							<p>
								If you forget your password, simply use the &quot;forgot
								password&quot; function located below the sign- in
								button on the login screen. This will guide you through
								the process of resetting your password and regaining
								access to your account.
							</p>
						</div>
					</div>

					<div className="text-sm">
						<p className="">
							What can I do if my account was deactivated?
						</p>
						<p>
							If your account has been deactivated, please reach out to
							our Admin department via email at
							Admin@tradewindsmarketplace.com. Make sure to include your
							account number, the email used for your account, and any
							other relevant information. Our Admin team will assist you
							in resolving the deactivation issue and restoring your
							account if possible.
						</p>
					</div>
				</section>

				{/* Sourcing Questions */}
				<section className="space-y-4">
					{/* Sourcing Questions */}
					<div className="text-sm">
						<h2 className="font-semibold">Sourcing Questions</h2>
						<div className="">
							<p className="">How do I buy on TWMP?</p>
							<p>
								Buying on Tradewinds Marketplace is simple. You can
								browse through our categories or use the keyword search
								bar to find the desired product. If the item is
								available for direct purchase, you can add it to your
								cart, select the quantity, and proceed to checkout. For
								non-live buy products, you can message the seller to
								begin the negotiation process. The seller will provide
								you with a quote based on your negotiations, and you can
								confirm the quote by making a real-time payment.
							</p>
						</div>
					</div>

					<div className="text-sm">
						<p className="">How can I search for products on TWMP?</p>
						<p>
							You can search for products on Tradewinds Marketplace
							either by browsing through categories or by using the
							keyword search function. Additionally, you can explore
							similar products or check the product catalogs of sellers
							who offer items of interest.
						</p>
					</div>

					<div className="text-sm">
						<p className="">What is MOQ?</p>
						<p className="">
							MOQ stands for Minimum Order Quantity. It represents the
							minimum quantity of units that a seller is willing to
							sell. This requirement ensures that sellers can
							effectively manage their inventory and offer products in a
							cost-effective manner.
						</p>
					</div>

					<div className="text-sm">
						<p className="">How do I add a product to My Favorites?</p>
						<p>
							To add a product to your favorites, simply click on the
							star icon associated with the product. This action will
							save the product to your favorites list for future
							reference.
						</p>
					</div>

					<div className="text-sm">
						<p className="">
							How can I find the supplier&#39;s profile?
						</p>
						<p>
							You can find the supplier&#39;s profile by scrolling down
							on a product page and selecting the profile tab in the
							additional information section. There, you&#39;ll find
							information about the supplier, including their
							background, product offerings, and ratings.
						</p>
					</div>

					<div className="text-sm">
						<p className="">
							Can I know the product details, such as price, MOQ, and
							shipping fee?
						</p>
						<p>
							Yes, you can access product details such as price, MOQ,
							and shipping fee. This information is provided to you
							whether it&#39;s a live buy product/order or part of an
							invoiced deal. It ensures transparency and helps you make
							informed purchasing decisions.
						</p>
					</div>

					<div className="text-sm">
						<p className="">How do I post an RFQ?</p>
						<p>
							As a registered buyer, posting a Request for Quotation
							(RFQ) is easy. You can click on the &quot;Submit an
							RFQ&quot; button located on the main page, dashboard, or
							product search page. This will guide you through the
							process of creating and submitting your RFQ to potential
							sellers.
						</p>
					</div>
				</section>

				{/* Negotiation Questions */}
				<section className="space-y-4">
					{/* Negotiation Questions */}
					<div className="text-sm">
						<h2 className="font-semibold">Negotiation Questions</h2>
						<div className="">
							<p className="">
								Should I communicate with suppliers outside of TWMP?
							</p>
							<p>
								No, it is not recommended to communicate with suppliers
								outside of Tradewinds Marketplace. Doing so violates the
								user terms and conditions and can result in account
								termination for both buyers and sellers. It is important
								to conduct all communications and transactions within
								the platform to ensure protection against scammers and
								to safeguard your money and products.
							</p>
						</div>
					</div>

					<div className="text-sm">
						<p className="">How can I engage in negotiations?</p>
						<p>
							If you are involved in an RFQ deal, you can negotiate
							using the RFQ manager in your dashboard. If you have
							directly messaged the seller, you will communicate and
							negotiate through the message center in your dashboard. In
							either case, once you accept and make a payment on an
							invoice sent to you via the RFQ manager or message center,
							the paid invoice will be converted into an order. You can
							then track this order in the order management section of
							your dashboard.
						</p>
					</div>
				</section>

				{/* Ordering Questions */}
				<section className="space-y-4">
					{/* Ordering Questions */}
					<div className="text-sm">
						<h2 className="font-semibold">Ordering Questions</h2>
						<div className="">
							<p className="">How do I place an order?</p>
							<p>
								For live buy products, you can add the desired product
								to your cart and proceed to checkout. For invoice deals,
								you will need to negotiate with the supplier and confirm
								the quote provided. Once the quote is confirmed, you can
								make the payment, which converts the quote into an
								official invoice and order.
							</p>
						</div>
					</div>

					<div className="text-sm">
						<p className="">
							How does TWMP protect my online transaction?
						</p>
						<p>
							Tradewinds Marketplace safeguards your online transactions
							by holding the funds until the order is delivered to you
							and confirmed. This ensures that the seller fulfills their
							obligations before the payment is released.
						</p>
					</div>
					<div className="text-sm">
						<p className="">When will the supplier ship my order?</p>
						<p>
							For live buy products, sellers typically ship within 72
							hours. However, for custom items or products negotiated
							through an invoice deal, the shipping timeline is
							determined during the negotiation process and agreed upon
							by both the buyer and seller.
						</p>
					</div>
					<div className="text-sm">
						<p className="">When will I receive my order?</p>
						<p>
							You can keep track of the shipment and expected delivery
							date by using the tracking module located in the order
							section of your dashboard. This allows you to monitor all
							your shipments and pending deliveries in one place.
						</p>
					</div>
				</section>

				{/* After Sales Questions */}
				<section className="space-y-4" id="file-a-dispute">
					{/* After Sales Questions */}
					<div className="text-sm">
						<h2 className="font-semibold">After Sales Questions</h2>
						<div className="">
							<p className="">How do I open a dispute for my order?</p>
							<p>
								To open a dispute for your order, you can file an
								escalation on the order summary widget. This will
								initiate the dispute resolution process.
							</p>
						</div>
					</div>

					<div className="text-sm">
						<p className="">
							What is the dispute process for an order?
						</p>
						<p>
							Once you file an escalation, Tradewinds Marketplace&#39;s
							administration team will investigate the dispute. If the
							seller is unable to resolve the issue, Tradewinds
							Marketplace will make a determination based on the
							information provided and the platform&#39;s policies.
						</p>
					</div>
					<div className="text-sm">
						<p className="">How do I return products for my order?</p>
						<p>
							If you need to return products for your order, you should
							communicate with the seller directly. If the seller is
							unresponsive, you can return the items to the shipping
							address provided and provide all the necessary evidence to
							Tradewinds Marketplace&#39;s administration when filing an
							escalation or dispute.
						</p>
					</div>
					<div className="pt-8 text-sm">
						<p className="">When will my dispute case be solved?</p>
						<p>
							Dispute cases on Tradewinds Marketplace typically take
							around 3-4 weeks to investigate and reach a resolution.
							This timeline allows for a thorough examination of the
							case, including gathering all necessary information,
							reviewing evidence from both the buyer and seller, and
							ensuring a fair and comprehensive decision.
						</p>
					</div>
					<div className="text-sm">
						<p className="">How do I cancel a dispute for my order?</p>
						<p>
							If you wish to cancel a dispute for your order, you can do
							so through the order summary widget. At any stage of the
							dispute process, you have the option to settle and
							withdraw the dispute. This allows for a resolution without
							further escalation or investigation.
						</p>
					</div>
					<div className="text-sm">
						<p className="">
							How do I check the status of my dispute case?
						</p>
						<p>
							To check the status of your dispute case, you can refer to
							the order summary widget. It provides up-to-date
							information on the progress of your dispute, including any
							updates, communications, or actions taken. This allows you
							to stay informed and track the resolution process.
						</p>
					</div>
				</section>

				{/*  */}
				<div className="pt-16 text-center">
					If you have any additional questions or need further
					information, please don&#39;t hesitate to contact our care
					team at{' '}
					<a href="mailto:support@tradewindsmarketplace.com">
						Support@tradewindsmarketplace.com
					</a>
					. We are here to assist you and ensure that all your inquiries
					and concerns are addressed promptly and comprehensively.
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default HelpCenter;
