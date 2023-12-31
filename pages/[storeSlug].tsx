// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

import { Tab } from '@headlessui/react';
import {
	DocumentDuplicateIcon,
	PlayCircleIcon,
	ShareIcon
} from '@heroicons/react/20/solid';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import MessageVendorPopup from 'components/common/popup/message-vendor.popup';
import CollectionSliderOld from 'components/product-details/product-collection/collection-slider-old';
import VideoPreviewModal from 'components/product-details/product-details-tab/video-preivew-modal';
import { useKeenSlider } from 'keen-slider/react';
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';
import {
	getFeaturedProductsBySellerId,
	getProductsWithCollectionBySellerId,
	getSellerDetailsByStoreSlug,
	getSellerStorefrontDetailsSellerId
} from 'lib/product-details.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
	MdChevronLeft,
	MdChevronRight,
	MdOutlineMessage
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import { getLocaleText } from 'utils/get_locale_text';
const SellerProfileTab: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ seller = {} }) => {
	const { t } = useTranslation();

	const [storeFrontDetails, setStoreFrontDetails] = useState<any>({});
	const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
	const [collectionProducts, setCollectionProducts] = useState<any[]>(
		[]
	);
	const [selectedCompanyVideoUrl, setSelectedCompanyVideoUrl] =
		useState('');

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);
	const [isStoreUrlCopied, setIsStoreUrlCopied] = useState(false);
	const [canIShare, setCanIShare] = useState(false);

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
			'(min-width: 744px)': {
				slides: { perView: 4, spacing: 12 }
			},
			'(min-width: 1512px)': {
				slides: { perView: 5, spacing: 10 }
			}
		},
		slides: { perView: 2, spacing: 12 }
	});

	useEffect(() => {
		let setTimeoutHandler: any = null;
		if (isStoreUrlCopied) {
			setTimeoutHandler = setTimeout(() => {
				setIsStoreUrlCopied(false);
			}, 500);
		}

		return () => {
			if (setTimeoutHandler) clearTimeout(setTimeoutHandler);
		};
	}, [isStoreUrlCopied]);

	useEffect(() => {
		if (!seller?.id) return;

		getSellerStorefrontDetailsSellerId(seller?.id).then((data) =>
			setStoreFrontDetails(data?.store_front || {})
		);

		getFeaturedProductsBySellerId(seller?.id).then((data) =>
			setFeaturedProducts(data || [])
		);

		getProductsWithCollectionBySellerId(seller?.id).then(
			(data = []) => {
				setCollectionProducts(data || []);
			}
		);
	}, [seller?.id]);

	const { store_front, edges } = seller || {};
	console.log('seller =', seller);

	const messageVendorButton = (
		<Button
			onClick={() => {
				if (!isAuth) {
					setIsLoginOpen();
					return;
				}
				setIsMessageVendorPopupOpen(true);
			}}
			className="flex items-center border border-accent-primary-main !p-0 !pr-2 !text-accent-primary-main lg:px-2"
		>
			<MdOutlineMessage className="mr-1 block h-[40px]  bg-accent-primary-main text-[24px] text-white lg:mr-2" />
			Message Vendor
		</Button>
	);

	return (
		<>
			<MessageVendorPopup
				open={isMessageVendorPopupOpen}
				onClose={() => setIsMessageVendorPopupOpen(false)}
				onChange={() => {}}
				onSendClick={async (message) => {
					if (!isAuth) {
						setIsLoginOpen();
						return;
					}

					const conversationId = await createConversation(seller?.id);
					if (!conversationId) {
						return;
					}

					await sendMessageToSeller(conversationId, message);

					setIsMessageVendorPopupOpen(false);
				}}
			/>

			<VideoPreviewModal
				videoUrl={selectedCompanyVideoUrl}
				isOpen={selectedCompanyVideoUrl != ''}
				onClose={() => setSelectedCompanyVideoUrl('')}
			/>

			<div className="bg-bg-main">
				{/* Store front Banner Image and Logo */}
				<div className="relative">
					<div className="relative h-[426px] w-full">
						<ImageWithErrorHandler
							key={store_front?.store_banner}
							src={store_front?.store_banner}
							alt=""
							fill={true}
						/>
					</div>

					<div className="absolute bottom-4 left-16 h-[94px] w-[121px] overflow-hidden rounded-t-lg p-4 shadow-md">
						<ImageWithErrorHandler
							key={store_front?.store_logo}
							src={store_front?.store_logo}
							alt=""
							fill={true}
							className="h-[94px] w-[121px]"
						/>
					</div>
					<div className="absolute left-0 right-0 -bottom-[4px] h-[24px] bg-white md:right-8 md:left-8"></div>
				</div>

				<div className="bg-white p-4 md:mx-8">
					<Tab.Group>
						<Tab.List className="space-x-16 border-b border-gray/40 text-[18px] text-gray/40 md:border-t-0 md:text-[25px] lg:leading-[30px]">
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

						<Tab.Panels>
							{/* Seller info */}
							<Tab.Panel className="outline-none">
								<div>
									<div className="mt-8 grid grid-cols-12 md:gap-8">
										{/* Profile details */}
										<div className=" ml-[23px] grid h-[157px] w-[1250px] grid-cols-2 grid-rows-3  text-lg sm:col-span-8">
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className=" font-semibold md:min-w-[148px]">
													{t('common:country')}:
												</span>
												<span>
													{getLocaleText(
														edges?.country?.name || {},
														locale
													)}
												</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:tw_page')}:
												</span>

												<button
													type="button"
													onClick={async () => {
														const storeUrl = `${process.env.SITE_URL}/${seller?.store_slug}`;

														try {
															if (!canIShare) {
																await navigator?.clipboard?.writeText(
																	storeUrl
																);
																setIsStoreUrlCopied(true);
																return;
															}

															window?.navigator?.share({
																text: `Share ${seller?.store_name}`,
																url: storeUrl
															});
														} catch (error) {}
													}}
													className="flex items-center space-x-2 rounded-md bg-primary-main px-2 py-1 text-xs text-white"
												>
													<span>
														{canIShare
															? 'Share Your Store'
															: isStoreUrlCopied
															? 'Copied'
															: 'Copy Store URL'}
													</span>
													{canIShare ? (
														<ShareIcon className="w-5" />
													) : (
														<DocumentDuplicateIcon className="w-5" />
													)}
												</button>
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
												<span>
													{seller?.certificates
														?.map(
															(certificate: any) =>
																certificate?.name || ''
														)
														?.join(', ')}
												</span>
												<span className="relative h-[30px] w-[162px] ">
													{seller?.certificates !== undefined && (
														<ImageWithErrorHandler
															src="/tradewinds-horizontal-logo.png"
															alt=""
															fill={true}
														/>
													)}
												</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:member_since')}:
												</span>
												<span>
													{seller?.created_at
														? new Date(
																seller?.created_at
														  ).toLocaleDateString()
														: ''}
												</span>
											</p>
										</div>

										{/* Tradewinds logo and message vendor button */}
										<div className="relative hidden h-[76px] w-[120px] md:m-8">
											<ImageWithErrorHandler
												className=" -mt-[30px] lg:ml-[375px]"
												src="/twmp-verified.png"
												alt=""
												fill={true}
											/>
										</div>
										<div className="hidden sm:col-span-4 md:flex">
											<div className="relative  ml-[23px] hidden h-[33px] w-[220px] lg:block">
												{messageVendorButton}
											</div>
										</div>
									</div>

									{/* <div className="my-8 md:hidden lg:block"> */}
									<div className="my-8 lg:hidden">
										{messageVendorButton}
									</div>
								</div>

								{/* About */}
								<div className="mb-10 mt-4 lg:mt-16">
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:about')}
									</h2>
									<p className="mt-1 text-[13px] text-gray md:text-[18px]">
										{seller?.about_us || store_front?.about_information}
									</p>
								</div>

								{/* Company Photos */}
								{storeFrontDetails?.company_photos?.length !== 0 && (
									<div className="mb-10">
										<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18px] text-gray/40 md:text-xl md:leading-6 lg:text-[21px] lg:leading-[26px]">
											{t('common:company_images')} 
										</h2>
										<div className=" mt-4 ml-[23px] flex space-x-4">
											{storeFrontDetails?.company_photos?.map(
												(companyPhoto: string) => (
													<div
														key={companyPhoto}
														className="relative h-[200px] w-[219px] rounded-md"
													>
														<ImageWithErrorHandler
															key={companyPhoto}
															src={companyPhoto}
															alt=""
															fill={true}
														/>
													</div>
												)
											)}
										</div>
									</div>
								)}

								{/* Company Video */}
								{storeFrontDetails?.company_videos?.[0] !==
									'Error occurred' && (
									<div className="mb-10">
										<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18px] text-gray/40 md:text-xl md:leading-6 lg:text-[21px] lg:leading-[26px]">
											{t('common:company_video')}
										</h2>
										<div className="mt-4 ml-[23px] flex space-x-4">
											{storeFrontDetails?.company_videos?.map(
												(companyVideoUrl: string) => (
													<div
														key={companyVideoUrl}
														className="relative h-[200px] w-[219px]"
													>
														<video
															autoPlay={false}
															className="h-full w-full rounded-md object-cover"
														>
															<source src={companyVideoUrl}></source>
														</video>

														<span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
															<PlayCircleIcon
																className="h-20 w-20 cursor-pointer text-white"
																onClick={() =>
																	setSelectedCompanyVideoUrl(
																		companyVideoUrl
																	)
																}
															/>
														</span>
													</div>
												)
											)}
										</div>
									</div>
								)}

								{/* Featured Product */}
								<div>
									<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18px] text-gray/40 md:text-xl md:leading-6 lg:text-[21px] lg:leading-[26px]">
										{t('common:featured_product')}
									</h2>
									{featuredProducts?.length > 0 && (
										<div className="navigation-wrapper group relative">
											<div
												ref={sliderRef}
												className="keen-slider mt-8 pl-14"
											>
												{featuredProducts?.map((featuredProduct) => {
													return (
														<div
															key={featuredProduct.id}
															className="keen-slider__slide cursor-pointer"
															onClick={() =>
																push(`/product/${featuredProduct.id}`)
															}
														>
															<div className="md:w-[150px] lg:w-[219px]">
																<div className="relative h-[137px] w-[137px] md:w-[150px] lg:h-[219px] lg:w-[219px]">
																	<ImageWithErrorHandler
																		src={
																			featuredProduct?.images[0]
																				? featuredProduct?.images[0]
																						?.url
																				: ''
																		}
																		alt=""
																		fill={true}
																	/>
																</div>

																{/* content */}
																<div className="mt-1 h-[47.57px]">
																	{/* Product name */}
																	<p className="text-[15px] font-bold text-primary-main md:text-[18px] md:leading-[22px]">
																		{getLocaleText(
																			featuredProduct.product_name ||
																				{},
																			locale
																		)}
																	</p>

																	{/* Product description */}
																	<p className="text-[15px] leading-[18px] text-gray">
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
												<div>
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
							<Tab.Panel className="outline-none">
								{collectionProducts?.map((collectionProduct) => {
									const { id, name } = collectionProduct || {};

									const collectionName = getLocaleText(
										name || {},
										locale
									);

									return (
										<div
											key={id}
											className="border-[#C4C4C4] last:border-none md:border-b"
										>
											<CollectionSliderOld
												key={id}
												name={collectionName}
												dataList={
													collectionProduct?.edges?.products || []
												}
											/>
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
}; // End of SellerProfileTab component

export default SellerProfileTab;

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale
}) => {
	const notFound = {
		props: {},
		notFound: true
	};

	try {
		const storeSlug = (params as any).storeSlug;
		const seller = (await getSellerDetailsByStoreSlug(storeSlug)) || {};
		console.log('sellersellersellersellersellersellerseller =', seller);
		// seller.id = sellerId;
		return {
			props: {
				seller,
				...(await serverSideTranslations(locale || 'en'))
			}
		};
	} catch (error) {
		console.log('Error occurred', error);
		return notFound;
	}
};

//End og getServerSideProps
