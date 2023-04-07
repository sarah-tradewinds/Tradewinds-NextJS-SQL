import { useRouter } from 'next/router';

// components
import Button from 'components/common/form/button';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { metadataList } from 'data/product-search/metadata-list';
import { BiMessageAltDetail } from 'react-icons/bi';
import { useAuthStore } from 'store/auth';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import MetadataTile from '../product-search/metadata/metadata-tile';
import RatingStars from './product-details-tab/product-review/rating-stars';

// utils
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import MessageVendorPopup from 'components/common/popup/message-vendor.popup';
import { useKeenSlider } from 'keen-slider/react';
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineShoppingCart
} from 'react-icons/md';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import ImageContainer from './product-details-images/image-contaier';

const ProductDetailsTile: React.FC<{
	totalReviewCount: number;
	product: any;
	selectedVariantId?: string;
	onVariantClick: (variantId: string) => any;
	onAddToCart: () => any;
}> = (props) => {
	const {
		totalReviewCount,
		product = {},
		onVariantClick,
		onAddToCart,
		selectedVariantId
	} = props;

	const [selected, setSelected] = useState<any>({});
	const [selectedColor, setSelectedColor] = useState('');
	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		slides: { perView: 4, spacing: 16 }
	});

	const { t } = useTranslation();

	const { isAuth, customerData, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData
		})
	);

	const router = useRouter();
	const { locale } = router;

	const {
		name,
		description,
		is_customizable,
		is_live,
		is_ready_to_ship,
		is_eco,
		seller_country = [],
		total_rate_count = 0,
		total_review_count = 0
	} = product || {};

	const { defaultVariant, variants, totalVariantCount } =
		getDefaultProductAndProductVariants(
			product?.edges?.product_variants || []
		);

	// let firstVariant: any = {};

	const productVariants: any[] = [];
	const productSizes: string[] = [];
	const materials: string[] = [];
	const styles: string[] = [];
	const titles: string[] = [];
	const colors: string[] = [];
	variants?.forEach((variant: any, index: number) => {
		const { product_attribute_options = [] } = variant?.edges || {};

		product_attribute_options?.forEach((attributeOption: any) => {
			const attributeName =
				attributeOption?.edges?.product_attribute?.name
					?.trim()
					?.toLowerCase();

			const attributeValue = attributeOption?.value
				?.trim()
				?.toLowerCase();

			switch (attributeName) {
				case 'size':
					variant.size = attributeValue;
					productSizes.push(attributeValue);
					break;
				case 'material':
					materials.push(attributeValue);
					break;
				case '':
					variant.style = attributeValue;
					styles.push(attributeValue);
					break;
				case 'title':
					variant.title = attributeValue;
					titles.push(attributeValue);
					break;
				case 'color':
					variant.color = attributeValue;
					colors.push(attributeValue);
					break;
				case 'colour':
					variant.color = attributeValue;
					colors.push(attributeValue);
					break;
			}
		}); // End of inner forEach loop

		console.log('variant?.name', variant?.name);
		if (!variant?.name?.en) {
			variant.name = {
				en: `${variant.color || ''} ${variant.size || ''}`
			};
		}
		// Pushing variant to list
		productVariants.push(variant);
	}); // End of forEach loop

	console.log('[colors] = ', { colors, productVariants });

	const {
		retail_price: product_price,
		is_bulk_pricing,
		bulk_pricing = [],
		inventory = {}
	} = defaultVariant || {};

	const productName = getLocaleText(name || {}, locale);

	const displayPrice = getDisplayBulkPrice({
		product_price,
		is_bulk_pricing,
		bulk_pricing
	});

	const country = seller_country
		? {
				name: getLocaleText(seller_country[0]?.name || '', locale),
				imageUrl: seller_country[0]?.url || ''
		  } || {}
		: {};

	const sellerCountry =
		product?.edges?.sellers?.edges?.country?.edges
			?.region_country?.[0] || {};

	const minOrderQuantity = inventory?.minimum_order_quantity || 0;

	const metadataTileLists = [
		// country of origin
		<MetadataTile
			key={sellerCountry?.name}
			imageUrl={sellerCountry?.image}
			alt={sellerCountry?.name}
			title={sellerCountry?.name}
			imageContainerClassName="!w-[14px] !h-[10px] lg:!w-[23px] lg:!h-[14px]"
			className="!space-x-1 md:!space-x-4"
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// isReadyToShip
		<MetadataTile
			key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			imageUrl={metadataList[1].imageUrl}
			alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			className="!space-x-1 md:!space-x-4"
			imageContainerClassName="lg:!w-[22px] lg:!h-[12.57px]"
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[20px] md:text-[24] lg:text-[28px]">
					{/* {isInCompareList ? ( */}
					{false ? (
						<MdBookmark className="text-[#FC5267]" />
					) : (
						<MdOutlineBookmarkBorder className="text-accent-primary-main" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			// onClick={onCompareClick}
			className="cursor-pointer !space-x-1 md:!space-x-4"
			titleClassName="md:text-cyan md:text-[13px] md:leading-4"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
			className="!space-x-1 md:!space-x-4"
			imageUrl={metadataList[3].imageUrl}
			alt={t('common:customizable')}
			title={
				<p>
					{t('common:customizable')}{' '}
					<span className="text-secondary">
						{is_customizable ? 'YES' : 'NO'}
					</span>
				</p>
			}
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// variantCount
		<MetadataTile
			key={metadataList[4].title}
			imageUrl={metadataList[4].imageUrl}
			alt={metadataList[4].title}
			title={`${t('common:variants')} ${productVariants?.length || 0}`}
			className="!space-x-1 md:!space-x-4"
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// add to cart
		<div
			key={t('common:save')}
			title={!is_live ? 'Use message vendor' : ''}
		>
			<MetadataTile
				key={t('common:save')}
				icon={
					<div
						className={`text-[20px] md:text-[24] lg:pl-[2px] lg:text-[24px] ${
							is_live ? 'text-accent-primary-main' : 'text-gray/40'
						}`}
					>
						<MdOutlineShoppingCart />
					</div>
				}
				alt={t('common:save')}
				title={t('cart')}
				className={`!space-x-1 md:!space-x-4 ${
					is_live ? 'cursor-pointer' : 'cursor-not-allowed'
				}`}
				onClick={is_live ? onAddToCart : undefined}
				titleClassName="md:text-cyan md:text-[13px] md:leading-4"
			/>
		</div>
	];

	const getUniqueList = (list: string[]) => [...new Set<string>(list)];

	const images = product?.images?.length
		? product?.images
		: defaultVariant?.images || [];
	const masterImageUrl = images?.[0];

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

					const conversationId = await createConversation(
						product?.seller_id
					);
					if (!conversationId) {
						return;
					}

					await sendMessageToSeller(conversationId, message);
					setIsMessageVendorPopupOpen(false);
				}}
			/>

			<div className="grid grid-cols-12 gap-y-8 bg-white md:gap-8">
				{/* Images container */}
				<ImageContainer
					key={masterImageUrl}
					className="col-span-12 md:first-letter:p-8 lg:col-span-5"
					imageUrl={masterImageUrl}
					alt=""
					thumbnails={images || []}
				/>

				{/* Product details */}
				<div className="col-span-12 overflow-y-auto px-5 md:py-8 md:pl-20 lg:col-span-7 lg:h-[786px] lg:p-8">
					{/* Product name and sku info */}
					<div className="flex items-center justify-between">
						<h1 className="text-[18px] font-semibold leading-[22px] text-primary-main md:text-[30px] md:leading-[37px]">
							{productName}
						</h1>
						<p className="hidden text-[25px] font-semibold text-gray/40 md:block">
							{inventory?.sku}
						</p>
					</div>

					{/* Price and quantity info */}
					<div className="my-2 flex justify-between text-[12px] font-semibold text-primary-main md:mt-[13px]">
						<h3 className="flex items-center space-x-8 text-xs font-semibold leading-[15px] md:text-[21px] md:leading-[26px]">
							{defaultVariant?.is_on_sale && !is_bulk_pricing ? (
								<>
									<span className="text-accent-error">
										Sale {defaultVariant?.sales_price}/piece
									</span>
									<span className="text-gray line-through">
										${product_price}/piece
									</span>
								</>
							) : (
								<>{displayPrice} /piece</>
							)}
						</h3>

						{minOrderQuantity > 0 && (
							<div className="text-xs font-semibold leading-[15px] md:text-[21px] md:leading-[26px]">
								<h4>
									{minOrderQuantity} {t('common:piece')} /
									{t('common:min_order')}
								</h4>
								<p>Lead Time: {inventory?.lead_time}</p>
							</div>
						)}
					</div>

					{/* Metadata list */}
					<div className="mt-2 grid grid-cols-2 gap-[15px] text-gray md:grid-cols-3">
						{/* country of origin */}
						{metadataTileLists[0]}
						{/* isReadyToShip */}
						{!is_ready_to_ship && metadataTileLists[1]}
						{/* Compare */}
						{metadataTileLists[2]}
						{/* Customizable */}
						{metadataTileLists[3]}
						{/* variantCount */}
						{metadataTileLists[4]}
						{/* Add to cart */}
						{metadataTileLists[5]}
					</div>

					{/* Rating, review count and verified Image */}
					<div className="mt-[28px] hidden items-center pb-4 md:flex">
						<div className="flex items-center md:mr-[79px]">
							<RatingStars
								starNumber={5}
								rating={total_rate_count}
								containerClassName="w-[149px] justify-between"
								className="h-[23.7px] w-[23.7px] text-gray"
								selectedClassName="text-secondary"
							/>
							<p className="text-center text-[13px] leading-4 text-secondary md:ml-[7px]">
								{total_review_count} {t('common:reviews')}
							</p>
						</div>

						{/* {!is_verified && ( */}
						<div className="relative h-[30px] w-[162px]">
							<ImageWithErrorHandler
								src="/tradewinds-horizontal-logo.png"
								alt=""
								fill={true}
							/>
						</div>
						{/* )} */}

						{is_eco && (
							<div className="ml-20 flex items-center space-x-2">
								<ImageWithErrorHandler
									src="/static/icons/eco-icon.png"
									alt="Eco icon"
									width={40}
									height={40}
								/>
								<span className="font-semibold text-green">ECO</span>
							</div>
						)}
					</div>

					{/* Product name and bullet points */}
					<div className="mt-[15px] border-t-2 border-[#DEDFE0] pt-[13px] md:border-b-2 md:pt-[19px] md:pb-[25.64px]">
						<h2 className="text-xs leading-[22px] text-gray md:text-[15px]">
							<span className="font-semibold">{productName}:</span>{' '}
							<span>{getLocaleText(description || {}, locale)}</span>
						</h2>

						{/* Actions */}
						<div className="mt-[25px] hidden items-center space-x-2 md:flex">
							{/* cart */}
							<div title={!is_live ? 'Message Vendor' : ''}>
								<Button
									variant="product"
									className={`!flex !items-center !space-x-2 !px-2 !text-[16px] !font-medium ${
										!is_live ? '!cursor-not-allowed !opacity-60' : ''
									}`}
									onClick={is_live ? onAddToCart : undefined}
								>
									<MdOutlineShoppingCart className="h-6 w-6" />
									<span>{t('common:add_to_cart')}</span>
								</Button>
							</div>

							{/* RFQ */}
							<Button
								onClick={() => {
									if (!isAuth) {
										setIsLoginOpen();
									} else {
										router.push(
											`${generateBuyerDashboardUrl({
												redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
												action: BUYER_DASHBOARD_ACTIONS.create_rfq,
												access_key: customerData.access.token,
												refresh_key: customerData.refresh.token
											})}`
										);
									}
								}}
								className="!flex !items-center !border-2 !border-success !px-2 !text-[16px] !font-normal !text-success md:block"
							>
								<BiMessageAltDetail className="h-6 w-6" />
								<span className="px-2">{t('common:submit_rfq')}</span>
							</Button>

							{/* Message Supplier */}
							<Button
								onClick={() => {
									if (!isAuth) {
										setIsLoginOpen();
									} else {
										setIsMessageVendorPopupOpen(true);
									}
								}}
								className="!flex !items-center !border-2 !border-success !px-2 !text-[16px] !font-normal !text-success md:block"
							>
								<BiMessageAltDetail className="h-6 w-6" />
								<span className="px-2">{t('Message supplier')}</span>
							</Button>
						</div>
					</div>

					{/* Additional info */}
					<div className="hidden space-y-4 md:mt-[21px] md:block">
						<div ref={sliderRef} className="keen-slider">
							{is_bulk_pricing &&
								bulk_pricing?.map((bulkPrice: any, index: any) => (
									<div
										key={`${bulkPrice.range}_${bulkPrice.price}_${index}`}
										className="keen-slider__slide"
									>
										<p className="text-primary-main md:text-lg ">
											<span className="font-semibold">
												{bulkPrice.range}
											</span>{' '}
											{t('common:piece')}= ${bulkPrice.price}
										</p>
									</div>
								))}
						</div>

						{/* Variants */}
						{productVariants?.length >= 0 && (
							<div className="mt-3 space-y-5">
								{/* Variants Dropdown */}
								<div className="flex items-center space-x-2">
									<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
										Variants:
									</p>
									<div className="w-full">
										{/* Variant Button */}
										<div className="flex items-center space-x-4">
											{productVariants?.length <= 3 && (
												<>
													<Button
														onClick={() => onVariantClick('')}
														className={`!text-[21px] ${
															selectedVariantId
																? '!px-0 font-normal '
																: '!h-10 bg-gradient-to-t from-success to-accent-primary-main !text-[16px] font-semibold !leading-4 !text-white'
														} !text-primary-main`}
													>
														Main
													</Button>

													{productVariants?.map((variant: any) => {
														console.log('variant', variant);
														const { id } = variant;
														const isSelected = selectedVariantId === id;
														return (
															<div
																key={id}
																className="keen-slider__slide"
															>
																<Button
																	onClick={() =>
																		onVariantClick(isSelected ? '' : id)
																	}
																	className={`!text-[21px] ${
																		isSelected
																			? '!h-10 bg-gradient-to-t from-success to-accent-primary-main !text-[16px] font-semibold !leading-4 !text-white'
																			: '!px-0 font-normal'
																	} !text-primary-main`}
																>
																	{getLocaleText(variant.name, locale)}
																</Button>
															</div>
														);
													})}
												</>
											)}
										</div>

										{/* Variant dropdown */}
										{productVariants?.length > 3 && (
											<Listbox value={selected} onChange={setSelected}>
												<div className="relative mt-1 w-[235px]">
													<Listbox.Button className="relative h-10 w-full rounded-md bg-accent-primary-main font-semibold text-white">
														<span className="block truncate">
															{selected.name ||
																`Variants (${productVariants?.length})`}
														</span>
														<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
															<ChevronUpDownIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													</Listbox.Button>

													<Transition
														as={Fragment}
														leave="transition ease-in duration-100"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
															{/* Main */}
															<Listbox.Option
																key="main"
																className={`relative cursor-pointer select-none py-2 px-4 ${
																	!selectedVariantId
																		? 'bg-amber-100 text-amber-900'
																		: 'text-gray-900'
																}`}
																value={{ variants_option: 'Main' }}
															>
																<div
																	className="flex items-center space-x-4"
																	onClick={() => onVariantClick('')}
																>
																	<span
																		className={`inline-block h-5 w-5 rounded-full ${
																			!selectedVariantId
																				? 'bg-accent-primary-main'
																				: 'bg-[#D9D9D9]'
																		}`}
																	></span>
																	<span
																		className={`block truncate text-[18px] leading-[22px] ${
																			!selectedVariantId
																				? 'font-medium text-accent-primary-main'
																				: 'font-normal'
																		}`}
																	>
																		Main
																	</span>
																</div>
															</Listbox.Option>

															{productVariants?.map((variant: any) => (
																<Listbox.Option
																	key={variant.id}
																	className={({ active }) =>
																		`relative cursor-pointer select-none py-2 px-4 ${
																			active
																				? 'bg-amber-100 text-amber-900'
																				: 'text-gray-900'
																		}`
																	}
																	value={variant}
																	onClick={() => {
																		console.log(variant.id);
																		onVariantClick(
																			selectedVariantId === variant.id
																				? ''
																				: variant.id
																		);
																	}}
																>
																	{({ selected }) => (
																		<div
																			className="flex items-center space-x-4"
																			onClick={() =>
																				onVariantClick(
																					selected ? '' : variant.id
																				)
																			}
																		>
																			<span
																				className={`inline-block h-5 w-5 rounded-full ${
																					selected
																						? 'bg-accent-primary-main'
																						: 'bg-[#D9D9D9]'
																				}`}
																			></span>
																			<span
																				className={`block truncate text-[18px] leading-[22px] ${
																					selected
																						? 'font-medium text-accent-primary-main'
																						: 'font-normal'
																				}`}
																			>
																				{variant.name}
																			</span>
																		</div>
																	)}
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</Listbox>
										)}
									</div>
								</div>

								{/* Size */}
								{getUniqueList(productSizes)?.length > 0 && (
									<div className="flex items-center space-x-2">
										<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
											Sizes:
										</p>
										<div className="flex space-x-4">
											{getUniqueList(productSizes)?.map((size: any) => (
												<button
													key={size}
													className="h-10 px-2 font-bold"
												>
													{size}
												</button>
											))}
										</div>
									</div>
								)}

								{/* Materials */}
								{getUniqueList(materials)?.length > 0 && (
									<div className="flex items-center space-x-2">
										<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
											Materials:
										</p>
										<div className="flex space-x-4">
											{getUniqueList(materials)?.map(
												(material: any) => (
													<button
														key={material}
														className="h-10 px-2 font-bold"
													>
														{material}
													</button>
												)
											)}
										</div>
									</div>
								)}

								{/* Styles */}
								{getUniqueList(styles)?.length > 0 && (
									<div className="flex items-center space-x-2">
										<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
											Styles:
										</p>
										<div className="flex space-x-4">
											{getUniqueList(styles)?.map((style: any) => (
												<button
													key={style}
													className="h-10 px-2 font-bold"
												>
													{style}
												</button>
											))}
										</div>
									</div>
								)}

								{/* Titles */}
								{getUniqueList(titles)?.length > 0 && (
									<div className="flex items-center space-x-2">
										<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
											Titles:
										</p>
										<div className="flex space-x-4">
											{getUniqueList(titles)?.map((title: any) => (
												<button
													key={title}
													className="h-10 px-2 font-bold"
												>
													{title}
												</button>
											))}
										</div>
									</div>
								)}

								{/* Colors */}
								{getUniqueList(colors)?.length > 0 && (
									<div className="flex items-center space-x-2">
										<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
											Colors:
										</p>
										<div className="space-x-4">
											{getUniqueList(colors)?.map((color: string) => {
												return (
													<button
														key={color}
														className={`h-10 w-10 rounded-full ${
															selectedColor === color
																? 'ring-2 ring-offset-4'
																: 'ring-1'
														}`}
														style={{
															backgroundColor: color
														}}
														onClick={() => {
															setSelectedColor((prevColor) => {
																if (prevColor === color) {
																	return '';
																}
																return color;
															});

															const variant = productVariants?.find(
																(variant: any) =>
																	variant.color === color
															);

															if (variant) {
																const variantId = variant.id;
																const isSelected =
																	selectedVariantId === variantId;
																onVariantClick(
																	isSelected ? '' : variantId
																);
															}
														}}
													></button>
												);
											})}
										</div>
									</div>
								)}
							</div>
						)}

						<p className="text-[21px] leading-[26px] text-primary-main">
							<span className="font-semibold capitalize">
								{t('common:customizable')}:
							</span>{' '}
							<span>
								{is_customizable ? t('common:yes') : t('common:no')}
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}; // End of ProductDetailsPage

export default ProductDetailsTile;
