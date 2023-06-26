import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import { WhyBuyOperationSubTile } from 'components/common/why-buy/why-buy-operation-tile';
import WhyBuyTile from 'components/common/why-buy/why-buy-tile';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');

	return (
		<>
			<Seo title="Why buy page" description="" />

			{/* Header section */}
			<div className="h-[263px] !bg-white bg-[url('/static/images/WhyBuyImages/why-buy-header.png')] bg-cover bg-no-repeat md:h-[318px] lg:h-[719px]">
				<div className="4k:py-16 pt-[153px] pl-[770px] ">
					<div className="4k:w-auto h-[113px] w-[660px] md:w-1/2">
						<p className=" w-[660px] text-[50px] font-semibold leading-[51px] text-gray ">
							{t('Why BUY on')}
							<br />
							{t('Tradewinds Marketplace?')}
						</p>
						{/* Content */}
						<p className=" mt-[25px] h-[204px] w-[348px] text-[25px] font-semibold text-primary-main  ">
							Verified Sellers <br />
							Cost-effective <br />
							Flexible payment options <br />
							Let the sellers come to you
						</p>
						<div className=" mt-[6px] ">
							<Button
								variant="special"
								className=" h-[60px] w-[319px] text-[25px] font-medium "
							>
								{t('common:join_now')}
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto">
				{/* Why Buy points section only display on large screen*/}
				<div className="flex h-[927px] w-full justify-center bg-primary-main bg-[url('/static/images/WhyBuyImages/why-buy.png')] bg-cover bg-no-repeat">
					<div className="  ">
						<div className=" grid grid-cols-2 gap-x-[120px]">
							<WhyBuyTile
								imageClassName=" w-[80px] h-[84px] mt-[61px]  "
								imageUrl="/static/images/WhyBuyImages/verified-seller.png"
								contentContainerClassName="w-[580px] mt-[28px] h-[219px]"
								title={t('Verified Seller')}
								subtitle={t(
									'Discover a vast selection of products from trusted sellers across various industries.'
								)}
							/>
							<WhyBuyTile
								imageClassName=" w-[98px] h-[98px] mt-[48px]"
								imageUrl="/static/images/WhyBuyImages/buy-with-confidence.png"
								contentContainerClassName="w-[572px] mt-[28px] h-[135px]"
								title={t('Buy with confidence')}
								subtitle={t(
									'At Tradewinds Marketplace, we prioritize your peace of mind when purchasing from new sellers online. Our platform employs robust tools and protocols to ensure a secure and reliable shopping experience, guaranteeing that you receive exactly what you ordered.'
								)}
							/>
							<WhyBuyTile
								imageClassName=" w-[112px] h-[112px]"
								imageUrl="/static/images/WhyBuyImages/sellers-come-to-you.png"
								contentContainerClassName="w-[548px] mt-[19px] h-[129px]"
								title={t('Let the sellers come to you')}
								subtitle={t(
									'Specify your requirements and submit them in the Request for Quotation (RFQ) marketplace. Receive quotes from multiple sellers, usually within 24 hours or less.'
								)}
							/>
							<WhyBuyTile
								imageClassName=" w-[82px] h-[112px] "
								imageUrl="/static/images/WhyBuyImages/fexible-payment.png"
								contentContainerClassName="w-[599px] mt-[20px] h-[19px]"
								title={t('Flexible payment options')}
								subtitle={t(
									'With TWMP, buyers can receive real-time financing assessments within seconds through our secure lending partners, Klarna and Afterpay.'
								)}
							/>
						</div>

						<div className=" mt-[82px] text-center">
							<Button
								variant="special"
								className=" h-[60px] w-[319px] text-[25px] font-medium "
							>
								{t('common:join_now')}
							</Button>
						</div>
					</div>
				</div>

				{/*  */}
				<div className=" bg-white pt-[28px] ">
					<div className="flex flex-col items-center font-semibold text-primary-main">
						<p className="text-[50px] ">{t('Features')}</p>
						<p className="text-[25px]">
							{t(
								'innovative_digital_tools_that_transform_the_wholesale_experience'
							)}
						</p>
					</div>

					<div className=" ml-[93px] mt-[54px] flex space-x-[99px] text-primary-main ">
						<div className=" relative  h-[578px] w-[704px] ">
							<ImageWithErrorHandler
								src="/static/images/WhyBuyImages/cart.png"
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
									Options, Maximize Your Potential, and Mitigate Risks
									of Overreliance.
								</span>
							</p>
							<p>
								<span className=" text-[24px] font-semibold">
									Explore a vast selection of products to suit your
									needs.
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
									sellers for price negotiation and customization
									options.
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
						<div className="  mt-[25px] ml-[47px] flex h-[552px] space-x-[157px] ">
							<div className="h-[552px] w-[520px] space-y-[25px]">
								<WhyBuyOperationSubTile
									// imgClassName="w-[34px] h-[26px] "
									imageUrl="/static/images/WhyBuyImages/messaging-center.png"
									title={t('Messaging Center')}
									subtitle={t(
										'Take control of Supplier interactions: Build Loyalty, track leads, and manage orders effortlessly in a centralized platform.'
									)}
								/>
								<WhyBuyOperationSubTile
									// imgClassName="w-[44px] h-[31px] "
									imageUrl="/static/images/WhyBuyImages/product-inquiries.png"
									title={t('Product inquiries')}
									subtitle={t(
										'Seamless Connectivity: Connect with Sellers, Negotiate Pricing, Inquire about Products, and Personalize your Orders through Direct Messaging.'
									)}
								/>
								<WhyBuyOperationSubTile
									// imgClassName="w-[35px] h-[32px]"
									imageUrl="/static/images/why-sell-on-tradewinds-images/rfq-icon.png"
									title={t('Request for Quotation (RFQ)')}
									subtitle={t(
										'Effortless Sourcing: Post an RFQ and proactively discover and connect with sellers offering the products you need.'
									)}
								/>
								<WhyBuyOperationSubTile
									// imgClassName="w-[35px] h-[32px]"
									imageUrl="/static/images/WhyBuyImages/translation-tool.png"
									title={t('Translation Tool')}
									subtitle={t(
										'You could send a message to a seller in English and your message will automatically be translated to Spanish. When they message you back, the text will automatically be translated to your preferred language, whether it be English, Mandarin, Italian, French, etc.'
									)}
								/>
							</div>
							<div className=" space-y-[30px]">
								<WhyBuyOperationSubTile
									// imgClassName="w-[39px] h-[39px]"
									imageUrl="/static/images/WhyBuyImages/order-management-icon.png"
									title={t('Order Management')}
									subtitle={t(
										'Simplify your Workflow: Streamline every step in a single platform and leverage on-platform tools for a seamless and efficient process.'
									)}
								/>
								<WhyBuyOperationSubTile
									// imgClassName="w-[39px] h-[39px]"
									imageUrl="/static/images/why-sell-on-tradewinds-images/invoice.png"
									title={t('Effortlessly Manage Invoices')}
									subtitle={t(
										'Streamline the process of receiving, negotiating, and accepting invoices with utmost professionalism and minimal effort'
									)}
								/>
								<WhyBuyOperationSubTile
									// imgClassName="w-[39px] h-[39px]"
									imageUrl="/static/images/why-sell-on-tradewinds-images/proccessing.png"
									title={t('Secure Processing')}
									subtitle={t(
										'Ensure the safety of your transactions with robust processing protection.'
									)}
								/>
								<WhyBuyOperationSubTile
									// imgClassName="w-[39px] h-[39px]"
									imageUrl="/static/images/WhyBuyImages/logistics-and-fulfillment-img.png"
									title={t('Simplified Logistics and Fulfillment')}
									subtitle={t(
										'Experience the convenience of flexible and cost-efficient shipping rates through Tradewinds Marketplace'
									)}
								/>
							</div>
						</div>
					</div>
					<div className=' container mx-auto mt-[48px] h-[822px]  w-[1506px] bg-[url("/static/images/WhyBuyImages/ready-to-grow-banner.png")] pt-[70px] pl-[164px] text-white '>
						<p className=" h-[122px] w-[389px] text-[50px] font-semibold leading-[61px] ">
							Ready to Grow Your Business?
						</p>
						<div className=" mt-[20px] h-[354px] w-[699px] text-[25px] leading-[30px]">
							<p>
								<span className=" font-semibold">Start Buying</span>
								<br />
								Create an account
								<br />
								Negotiate deals, buy right away or Post a RFQ
								<br />
								Respond to Suppliers
								<br /> Procure Orders and payment
								<br /> Receive Products
							</p>
							<p className=" mt-[25px]">
								<span className=" font-semibold">
									Manage your account
								</span>{' '}
								<br />
								Stay connected with Suppliers
								<br />
								Nurture your relationships
								<br />
								Optimize purchases
							</p>
						</div>
						<div className=" mt-[20px] ml-[51px]  ">
							<button className=" h-[26px] w-[138px] rounded-[5px] bg-cyan text-[18px]">
								Start Today
							</button>
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

export default WhyBuyPage;
