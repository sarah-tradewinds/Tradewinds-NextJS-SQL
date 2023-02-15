import Image from 'next/image';
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
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineShoppingCart
} from 'react-icons/md';
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
		is_unlimited_quantity,
		sale_price,
		is_on_sale,
		tags = [],
		variants = [],
		is_customizable,
		is_live,
		is_ready_to_ship,
		is_verified,
		is_eco,
		seller_country = [],
		color: colors = [],
		size: sizes = [],
		material: materials = [],
		style: styles = [],
		title: titles = [],
		total_rate_count = 0,
		total_review_count = 0
	} = product || {};

	const productVariantList = product?.edges?.product_variants || [];
	const [firstVariant] = product?.edges?.product_variants || [];

	const {
		retail_price: product_price,
		is_bulk_pricing,
		bulk_pricing = [],
		inventory = {}
	} = firstVariant || {};

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
	const minOrderQuantity = inventory?.minimum_order_quantity || 0;

	const metadataTileLists = [
		// country of origin
		<MetadataTile
			key={country?.name}
			imageUrl={country?.imageUrl}
			alt={country?.name}
			title={country?.name}
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
			title={`${t('common:variants')} ${variants?.length || 0}`}
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
				// onClick={is_live ? onCartClick : undefined}
				titleClassName="md:text-cyan md:text-[13px] md:leading-4"
			/>
		</div>
	];

	const productVariants = variants?.filter((variant: any) => {
		const getColorWithoutHexValue = (color: string) =>
			color?.replace('#', '')?.toLowerCase();

		if (selectedColor) {
			return (
				getColorWithoutHexValue(variant?.color) ===
				getColorWithoutHexValue(selectedColor)
			);
		}

		return true;
	});

	const productSizes: string[] = [
		...new Set<string>(
			productVariants?.map((variant: any) =>
				variant?.size?.toLowerCase()
			) || []
		)
	];

	const images = firstVariant?.images || [];

	return (
		<div className="grid grid-cols-12 gap-y-8 bg-white md:gap-8">
			{/* Images container */}
			<ImageContainer
				className="col-span-12 md:first-letter:p-8 lg:col-span-5"
				imageUrl={images?.[0]}
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
						{is_on_sale && !is_bulk_pricing ? (
							<>
								<span className="text-accent-error">
									Sale {firstVariant?.sales_price}/piece
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
						<Image
							src="/tradewinds-horizontal-logo.png"
							alt=""
							fill={true}
						/>
					</div>
					{/* )} */}

					{is_eco && (
						<div className="ml-20 flex items-center space-x-2">
							<Image
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
							<div className="flex items-center space-x-2">
								<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
									Variants:
								</p>
								<div className="w-full">
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
													const { variant_id } = variant;
													const isSelected =
														selectedVariantId === variant_id;
													return (
														<div
															key={variant_id}
															className="keen-slider__slide"
														>
															<Button
																onClick={() =>
																	onVariantClick(
																		isSelected ? '' : variant_id
																	)
																}
																className={`!text-[21px] ${
																	isSelected
																		? '!h-10 bg-gradient-to-t from-success to-accent-primary-main !text-[16px] font-semibold !leading-4 !text-white'
																		: '!px-0 font-normal'
																} !text-primary-main`}
															>
																{variant.variants_option}
															</Button>
														</div>
													);
												})}
											</>
										)}
									</div>

									{productVariants?.length > 3 && (
										<Listbox value={selected} onChange={setSelected}>
											<div className="relative mt-1 w-[235px]">
												<Listbox.Button className="relative h-10 w-full rounded-md bg-accent-primary-main font-semibold text-white">
													<span className="block truncate">
														{selected.variants_option ||
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
																key={variant.variant_id}
																className={({ active }) =>
																	`relative cursor-pointer select-none py-2 px-4 ${
																		active
																			? 'bg-amber-100 text-amber-900'
																			: 'text-gray-900'
																	}`
																}
																value={variant}
																onClick={() => {
																	console.log(variant.variant_id);
																	onVariantClick(
																		selectedVariantId ===
																			variant.variant_id
																			? ''
																			: variant.variant_id
																	);
																}}
															>
																{({ selected }) => (
																	<div
																		className="flex items-center space-x-4"
																		onClick={() =>
																			onVariantClick(
																				selected
																					? ''
																					: variant.variant_id
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
																			{variant.variants_option}
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
							{productSizes?.length > 0 && (
								<div className="flex items-center space-x-2">
									<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
										Sizes:
									</p>
									<div className="flex space-x-4">
										{productSizes?.map((size: any) => (
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
							{materials?.length > 0 && (
								<div className="flex items-center space-x-2">
									<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
										Materials:
									</p>
									<div className="flex space-x-4">
										{materials?.map((material: any) => (
											<button
												key={material}
												className="h-10 px-2 font-bold"
											>
												{material}
											</button>
										))}
									</div>
								</div>
							)}

							{/* Styles */}
							{styles?.length > 0 && (
								<div className="flex items-center space-x-2">
									<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
										Styles:
									</p>
									<div className="flex space-x-4">
										{styles?.map((style: any) => (
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
							{titles?.length > 0 && (
								<div className="flex items-center space-x-2">
									<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
										Titles:
									</p>
									<div className="flex space-x-4">
										{titles?.map((title: any) => (
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
							{colors?.length > 0 && (
								<div className="flex items-center space-x-2">
									<p className="text-[21px] font-semibold leading-[26px] text-primary-main">
										Colors:
									</p>
									<div className="space-x-4">
										{colors?.map((color: string) => {
											return (
												<button
													key={color}
													className={`h-10 w-10 rounded-full ${
														selectedColor === color
															? 'ring-2 ring-offset-4'
															: ''
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

														const variant = variants?.find(
															(variant: any) => variant.color === color
														);

														if (variant) {
															const variantId = variant.variant_id;
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
	);
}; // End of ProductDetailsPage

export default ProductDetailsTile;
