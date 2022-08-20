import { Tab } from '@headlessui/react';
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Button from 'components/website/common/form/button';
import SubCategoryCard from 'components/website/home/common/sub-category-card';
import SubCategorySlider from 'components/website/home/sub-category-slider';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { useKeenSlider } from 'keen-slider/react';
import {
	getFeaturedProductsBySellerId,
	getProductsWithCollectionBySellerId,
	getSellerStorefrontDetailsSellerId
} from 'lib/product-details.lib';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
	MdChevronLeft,
	MdChevronRight,
	MdOutlineMessage
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import { getLocaleText } from 'utils/get_locale_text';

const CompanyProfileTab: React.FC<{
	seller: any;
}> = ({ seller }) => {
	const { t } = useTranslation();

	const [storeFrontDetails, setStoreFrontDetails] = useState<any>({});
	const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
	const [collectionProducts, setCollectionProducts] = useState<any[]>(
		[]
	);

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData,
			autoLogin: state.autoLogin
		})
	);

	const { locale, push } = useRouter();

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		breakpoints: {
			'(min-width: 768px)': {
				slides: { perView: 4, spacing: 12 }
			},
			'(min-width: 1000px)': {
				slides: { perView: 5, spacing: 10 }
			}
		},
		slides: { perView: 2, spacing: 12 }
	});

	useEffect(() => {
		if (!seller.id) return;

		getSellerStorefrontDetailsSellerId(seller.id).then((data) =>
			setStoreFrontDetails(data || {})
		);

		getFeaturedProductsBySellerId(seller.id).then((data) =>
			setFeaturedProducts(data || [])
		);

		getProductsWithCollectionBySellerId(seller.id).then((data) =>
			setCollectionProducts(data || [])
		);
	}, [seller.id]);

	const { store_front } = storeFrontDetails;

	const messageVendorButton = (
		<Button
			onClick={() => {
				if (!isAuth) {
					setIsLoginOpen();
					return;
				}
				const buyerDashboardUrl = generateBuyerDashboardUrl({
					redirect_to: BUYER_DASHBOARD_PAGES.message_vendor,
					action: BUYER_DASHBOARD_ACTIONS.message_vendor,
					access_key: customerData.access.token,
					refresh_key: customerData.refresh.token
				});
				push(buyerDashboardUrl);
			}}
			className="flex items-center border border-accent-primary-main !p-0 !pr-2 !text-accent-primary-main lg:px-2"
		>
			<MdOutlineMessage className="mr-1 block h-[40px] bg-accent-primary-main text-[24px] text-white lg:mr-2" />
			Message Vendor
		</Button>
	);

	return (
		<>
			<div className="bg-bg-main">
				{/* Store front Banner Image and Logo */}
				<div className="relative">
					<div className="relative h-[426px] w-full">
						<ImageWithErrorHandler
							key={store_front?.store_banner?.url}
							src={store_front?.store_banner?.url}
							alt=""
							layout="fill"
						/>

						<p className="absolute top-0 p-8 text-[55px] font-semibold text-white pc:text-[23px]">
							Thirsty Llama Brewing
						</p>
					</div>

					<div className="absolute bottom-4 left-16 h-[94px] w-[121px] overflow-hidden rounded-t-lg p-4 shadow-md">
						<ImageWithErrorHandler
							key={store_front?.store_logo?.url}
							src={store_front?.store_logo?.url}
							alt=""
							layout="fill"
							className="h-[94px] w-[121px]"
						/>
					</div>
					<div className="absolute left-0 right-0 -bottom-[4px] h-[24px] bg-white md:right-8 md:left-8"></div>
				</div>

				<div className="bg-white p-8 md:mx-8">
					<Tab.Group>
						<Tab.List className="space-x-16 border-b border-gray/40 text-[18px] text-gray/40 md:border-t-0 md:text-[25px]">
							<Tab
								className={({ selected }: { selected: boolean }) =>
									`font-semibold ${selected ? 'text-primary-main' : ''}`
								}
							>
								Profile
							</Tab>
							<Tab
								className={({ selected }: { selected: boolean }) =>
									`font-semibold ${selected ? 'text-primary-main' : ''}`
								}
							>
								Products
							</Tab>
						</Tab.List>

						<Tab.Panels className="outline-none">
							{/* Seller info */}
							<Tab.Panel>
								<div>
									<div className="mt-8 grid grid-cols-12 gap-8">
										{/* Profile details */}
										<div className="col-span-12 space-y-4 sm:col-span-8">
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:country')}:
												</span>
												<span>{seller?.country}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:tw_page')}:
												</span>
												<span>{seller?.tw_page}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:established')}:
												</span>
												<span>{seller?.established}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:certification')}:
												</span>
												<span>{seller?.certificates?.toString()}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:member_since')}:
												</span>
												<span>
													{seller?.member_since
														? new Date(
																seller?.member_since
														  ).toLocaleDateString()
														: ''}
												</span>
											</p>
										</div>

										{/* Tradewinds logo and message vendor button */}
										<div className="hidden sm:col-span-4 md:block">
											<div className="flex justify-end ">
												<div className="relative mr-4 h-[72px] w-[120px] md:m-8">
													<Image
														src="/twmp-verified.png"
														alt=""
														layout="fill"
													/>
												</div>
											</div>
											<div className="relative mt-16 h-[22px] w-[138px] lg:hidden">
												{messageVendorButton}
											</div>
										</div>
									</div>

									<div className="my-8 md:hidden lg:block">
										{messageVendorButton}
									</div>
								</div>

								{/* About */}
								<div className="mb-10 mt-4 lg:mt-0">
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:about')}
									</h2>
									<p className="mt-1 text-[13px] text-gray md:text-[18px]">
										{seller?.about_us || store_front?.about_information}
									</p>
								</div>

								{/* Featured Product */}
								<div>
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:featured_product')}
									</h2>
									{featuredProducts?.length > 0 && (
										<div className="navigation-wrapper group relative">
											<div ref={sliderRef} className="keen-slider mt-8">
												{featuredProducts?.map((featuredProduct) => {
													return (
														<div
															key={featuredProduct.id}
															className="keen-slider__slide"
														>
															<div className="h-[185px]">
																<div className="relative h-[137px] w-[137px]">
																	<ImageWithErrorHandler
																		src={
																			featuredProduct?.images[0]
																				? featuredProduct?.images[0]
																						?.url
																				: ''
																		}
																		alt=""
																		layout="fill"
																	/>
																</div>
																<div>
																	{/* Product name */}
																	<p className="flex justify-between space-x-8 text-[15px] font-bold text-primary-main md:text-[18px]">
																		{getLocaleText(
																			featuredProduct.product_name ||
																				{},
																			locale
																		)}
																	</p>

																	{/* Product description */}
																	<p className="text-[15px] text-gray">
																		{getLocaleText(
																			featuredProduct.product_description ||
																				{},
																			locale
																		)}
																	</p>
																</div>
															</div>
														</div>
													);
												})}
											</div>
											{/* Navigation button */}
											{loaded && instanceRef.current && (
												<div className="hidden group-hover:block">
													<Button
														className={`absolute -left-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main`}
														onClick={(e: any) =>
															e.stopPropagation() ||
															instanceRef.current?.prev()
														}
													>
														<MdChevronLeft className="h-[32px] w-[32px]" />
													</Button>

													<Button
														className={`absolute right-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main`}
														onClick={(e: any) =>
															e.stopPropagation() ||
															instanceRef.current?.next()
														}
														disabled={
															currentSlide ===
															instanceRef?.current?.track?.details
																?.slides?.length -
																1
														}
													>
														<MdChevronRight className="h-[32px] w-[32px]" />
													</Button>
												</div>
											)}
										</div>
									)}
								</div>
							</Tab.Panel>

							{/* Collection Products Panel */}
							<Tab.Panel>
								{/* Product set 1 */}
								{collectionProducts.map((collectionProduct) => {
									const { name, product } = collectionProduct || {};

									const products = product.map((productData: any) => ({
										id: productData.id,
										title: productData?.product_name,
										slug: {
											en: `/product/${productData.id}`
										},
										clr: '',
										image: {
											url: productData?.images[0]
												? productData?.images[0]?.url
												: ''
										}
									}));

									return (
										<div
											key={name}
											className="mt-4 flex border-gray/40 pb-8 last:border-none sm:border-b"
										>
											{/* Collection card */}
											<div className="hidden lg:block">
												<div>
													<h2 className="font-mont font-semibold text-primary-main dark:text-accent-secondary-eco lg:text-[25px]">
														{name}
													</h2>
													<div className="h-[249px] w-[227px] bg-primary-main text-white dark:text-accent-secondary-eco">
														<p className="p-4">
															<span className="font-semibold">
																{name} {` `}
															</span>
															<span>
																lorem ipsum lorem ipsum lorem ipsum
																lorem ipsum lorem ipsum lorem ipsum
															</span>
														</p>
													</div>
												</div>
											</div>

											<div className="w-full">
												<p className="text-[13px] font-semibold text-primary-main sm:text-[18px] lg:hidden">
													{name}
												</p>
												<div className="hidden sm:block">
													<SubCategorySlider
														className="!mx-0"
														leftButtonClassName="lg:!left-8"
														rightButtonClassName="lg:!right-10"
														categories={products}
														slidesToShow={products?.length <= 7 ? 4 : 8}
														rows={products?.length <= 7 ? 1 : 2}
													/>
												</div>

												{/* For mobile only */}

												<div className="grid grid-cols-2 gap-4 sm:hidden">
													{products.map((product: any) => {
														return (
															<SubCategoryCard
																key={product.id}
																subCat={product}
																className="!h-[88px]"
															/>
														);
													})}
												</div>
											</div>
										</div>
									);
								})}
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}; // End of CompanyProfileTab component

export default CompanyProfileTab;
