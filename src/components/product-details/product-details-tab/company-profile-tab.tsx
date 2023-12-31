import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Third party packages
import { Tab } from '@headlessui/react';
import {
	DocumentDuplicateIcon,
	PlayCircleIcon,
	ShareIcon
} from '@heroicons/react/20/solid';
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'next-i18next';
import {
	MdChevronLeft,
	MdChevronRight,
	MdOutlineMessage
} from 'react-icons/md';

// lib
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';
import {
	getFeaturedProductsBySellerId,
	getProductsWithCollectionBySellerId,
	getSellerStorefrontDetailsSellerId
} from 'lib/product-details.lib';

// store
import { useAuthStore } from 'store/auth';

// util
import { getLocaleText } from 'utils/get_locale_text';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
const MessageVendorPopup = dynamic(
	() => import('components/common/popup/message-vendor.popup')
);
const VideoPreviewModal = dynamic(
	() => import('./video-preivew-modal')
);
const CollectionSliderOld = dynamic(
	() => import('../product-collection/collection-slider-old')
);

const CompanyProfileTab: React.FC<{
	seller: any;
}> = ({ seller }) => {
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
		setCanIShare(window?.navigator?.share !== undefined);
	}, []);

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
		if (!seller.id) return;

		getSellerStorefrontDetailsSellerId(seller.id).then((data) =>
			setStoreFrontDetails(data?.store_front || {})
		);

		getFeaturedProductsBySellerId(seller.id).then((data) =>
			setFeaturedProducts(data || [])
		);

		getProductsWithCollectionBySellerId(seller.id).then((data = []) => {
			setCollectionProducts(data || []);
		});
	}, [seller.id]);

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
			<MdOutlineMessage className="mr-1 block h-[40px] bg-accent-primary-main text-[24px] text-white lg:mr-2" />
			{t('message_vendor')}
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
				<div className="relative hidden md:block">
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
						<Tab.List className="hidden space-x-16 border-b border-gray/40 text-[18px] text-gray/40 md:block md:border-t-0 md:text-[15px] lg:text-[20px] lg:leading-[25px]">
							<Tab
								className={({ selected }: { selected: boolean }) =>
									`font-semibold ${selected ? 'text-primary-main' : ''}`
								}
							>
								{t('profile')}
							</Tab>
							<Tab
								className={({ selected }: { selected: boolean }) =>
									`font-semibold ${selected ? 'text-primary-main' : ''}`
								}
							>
								{t('products')}
							</Tab>
						</Tab.List>

						<Tab.Panels>
							{/* Seller info */}
							<Tab.Panel className="outline-none">
								{/* Only for mobile device */}
								<div className="md:hidden">
									<h3 className="border-b-2 border-[#C4C4C4] pb-[7px] text-[15px] font-semibold leading-[18.29px] text-gray">
										{t('company_profile')}
									</h3>
									<div className="relative mt-[8.57px] mb-2 h-[20.48px] w-[93.7px] sm:h-[20px] sm:w-[100px]">
										<Image
											src="/images/twmp-verified-horizontal.png"
											alt="twmp-verified-horizontal"
											fill={true}
										/>
									</div>
									<p className="text-[15px] font-semibold leading-[18.29px] text-gray">
										{getLocaleText(
											edges?.company?.business_name || {},
											locale
										)}
									</p>
								</div>

								<div>
									<div className="grid grid-cols-12 md:mt-8 md:gap-8">
										{/* Profile details */}
										<div className="col-span-12 space-y-4 sm:col-span-8">
											<p className="hidden  text-[15px] text-gray md:flex md:space-x-8 md:text-[12px] lg:text-[15px] xl:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:campany_name')}:
												</span>
												<span>
													{getLocaleText(
														edges?.company?.business_name || {},
														locale
													)}
												</span>
											</p>

											<p className="flex flex-col text-[12px] leading-[21px] text-gray md:flex-row md:space-x-8 md:text-[12px] lg:text-[15px] xl:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:country')}:
												</span>
												<span>
													{getLocaleText(
														edges?.country?.name || {},
														locale
													)}
												</span>
											</p>

											<div className="flex flex-col whitespace-pre-wrap text-[12px] leading-[21px] text-gray md:flex-row md:space-x-8 md:text-[12px] lg:text-[15px] xl:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:tw_page')}:
												</span>
												{/* <Link
													href={`/${seller?.store_slug || ''}`}
													className="cursor-pointer overflow-auto text-primary-main"
												>
													{`${process.env.SITE_URL}/${
														seller?.state_slug || ''
													}`}
												</Link> */}

												<div className="flex space-x-4">
													<Link
														href={`/${seller?.store_slug || ''}`}
														className="cursor-pointer overflow-auto text-primary-main"
													>
														Visit Store
													</Link>
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
												</div>
											</div>

											<p className="flex flex-col text-[12px] leading-[21px] text-gray md:flex-row md:space-x-8 md:text-[12px] lg:text-[15px] xl:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:established')}:
												</span>
												<span>{seller?.established}</span>
											</p>

											<p className="flex flex-col text-[12px] leading-[21px] text-gray md:flex-row md:space-x-8 md:text-[12px] lg:text-[15px] xl:text-[18px]">
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
												<span className="relative h-[20.48px] w-[93.7px] sm:h-[20px] sm:w-[100px] ">
													{seller?.certificates !== undefined && (
														<ImageWithErrorHandler
															src="/tradewinds-horizontal-logo.png"
															alt=""
															fill={true}
														/>
													)}
												</span>
											</p>

											{/* Member Since */}
											<p className="flex flex-col text-[12px] leading-[21px] text-gray md:flex-row md:space-x-8 md:text-[12px] lg:text-[15px] xl:text-[18px]">
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
										<div className="hidden sm:col-span-4 md:flex">
											<div className="flex justify-end ">
												<div className="relative mr-4 md:mt-8 lg:mt-[50px] lg:h-[50px] lg:w-[90px] xl:mt-8 xl:h-[72px] xl:w-[120px]">
													<ImageWithErrorHandler
														src="/twmp-verified.png"
														alt=""
														fill={true}
													/>
												</div>
											</div>
											<div className="relative mt-14 hidden h-[22px] lg:block">
												{messageVendorButton}
											</div>
										</div>
									</div>

									{/* <div className="my-8 md:hidden lg:block"> */}
									<div className="my-8 hidden lg:hidden">
										{messageVendorButton}
									</div>
								</div>

								{/* About */}
								<div className="mb-10 mt-4 sm:mt-[35px] md:text-[12px] lg:mt-16 lg:text-[15px] xl:text-[18px]">
									<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18.29px] text-gray md:leading-[15px] md:text-[[12px]] lg:text-[15px] lg:leading-[18px] xl:text-[18px] xl:leading-[21px] ">
										{t('common:about')}
									</h2>
									<p className="mt-1 text-[12px] leading-[14.63px] text-gray md:text-[12px] md:leading-[15px] lg:text-[15px] lg:leading-[18px] xl:text-[18px]  xl:leading-[21px]">
										{seller?.about_us || store_front?.about_information}
									</p>
								</div>

								{/* Company Photos */}
								{storeFrontDetails?.company_photos?.length !== 0 && (
									<div className="mb-10">
										<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18.29px] text-gray md:leading-[15px] md:text-[[12px]] lg:text-[15px] lg:leading-[18px] xl:text-[18px] xl:leading-[21px] ">
											{t('common:company_images')} 
										</h2>
										<div className="mt-4 flex space-x-4">
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
										<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18.29px] text-gray md:leading-[15px] md:text-[[12px]] lg:text-[15px] lg:leading-[18px] xl:text-[18px] xl:leading-[21px] ">
											{t('common:company_video')}
										</h2>
										<div className="mt-4 flex space-x-4">
											{storeFrontDetails?.company_videos?.map(
												(companyVideoUrl: string) => (
													<div
														key={companyVideoUrl}
														className="relative h-[140px] w-[140px] md:h-[200px] md:w-[219px]"
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
									<h2 className="border-b border-[#C4C4C4] text-[15px] font-semibold leading-[18.29px] text-gray md:leading-[15px] md:text-[[12px]] lg:text-[15px] lg:leading-[18px] xl:text-[18px] xl:leading-[21px] ">
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
}; // End of CompanyProfileTab component

export default CompanyProfileTab;
