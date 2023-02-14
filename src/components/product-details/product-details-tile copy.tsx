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
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'next-i18next';
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
		product_name,
		product_description,
		is_unlimited_quantity,
		inventory,
		product_price,
		sale_price,
		is_on_sale,
		is_bulk_pricing,
		bulk_pricing = [],
		tags = [],
		variants = [],
		images = [],
		is_customizable,
		is_live,
		is_ready_to_ship,
		is_verified,
		seller_country = [],
		total_rate_count = 0,
		total_review_count = 0
	} = product || {};

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		slides: { perView: 4, spacing: 16 }
	});

	const productName = getLocaleText(product_name || {}, locale);

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

	const metadataTileList = [
		// country of origin
		<MetadataTile
			key={country?.name}
			imageUrl={country?.imageUrl}
			alt={country?.name}
			title={country?.name}
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// isReadyToShip
		<MetadataTile
			key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			imageUrl={metadataList[1].imageUrl}
			alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
			imageUrl={metadataList[3].imageUrl}
			alt={t('common:customizable')}
			title={
				<p>
					<span className="capitalize">
						{t('common:customizable')}{' '}
					</span>
					<span className="text-secondary">
						{is_customizable ? t('common:yes') : t('common:no')}
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
			title={`${t('common:variant')} ${variants.length}`}
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// save
		<MetadataTile
			key={t('common:save')}
			imageUrl={metadataList[5].imageUrl}
			alt={t('common:save')}
			title={t('common:save')}
			titleClassName="md:text-[13px] md:leading-4"
		/>
	];

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

	return (
		<div className="grid grid-cols-12 gap-y-8 bg-white md:gap-8">
			{/* Images container */}
			<ImageContainer
				className="col-span-12 md:first-letter:p-8 lg:col-span-5"
				imageUrl={images[0]?.url}
				alt=""
				thumbnails={images}
			/>

			{/* Product details */}
			<div className="col-span-12 px-5 md:py-8 md:pl-20 lg:col-span-7 lg:p-8">
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
									Sale {sale_price}/piece
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
						<h4 className="text-xs font-semibold leading-[15px] md:text-[21px] md:leading-[26px]">
							{minOrderQuantity} {t('common:piece')} /
							{t('common:min_order')}
						</h4>
					)}
				</div>

				{/* Keywords */}
				<div className="flex space-x-4 md:space-x-16">
					{tags.map((tag: any, index: number) => {
						let tagName = tag;
						if (typeof tag === 'object') {
							tagName = getLocaleText(tag || {}, locale);
						}
						return (
							<span
								key={`${tagName}_${index}`}
								className="text-xs font-semibold leading-[15px] text-primary-main md:text-[13px] md:leading-4"
							>
								{tagName}
							</span>
						);
					})}
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
							{/* {totalReviewCount} {t('common:reviews')} */}
							{total_review_count} {t('common:reviews')}
						</p>
					</div>

					{!is_verified && (
						<div className="relative h-[30px] w-[162px]">
							<Image
								src="/tradewinds-horizontal-logo.png"
								alt=""
								fill={true}
							/>
						</div>
					)}
				</div>

				{/* Product name and bullet points */}
				<div className="mt-[15px] border-t-2 border-[#DEDFE0] pt-[13px] md:border-b-2 md:pt-[19px] md:pb-[25.64px]">
					<h2 className="text-xs leading-[22px] text-gray md:text-[15px]">
						<span className="font-semibold">{productName}:</span>{' '}
						<span>
							{getLocaleText(product_description || {}, locale)}
						</span>
					</h2>

					<div className="mt-[25px] hidden items-center space-x-2 md:flex">
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
							className="mt-4s relative !flex h-[22px] items-center !overflow-hidden !rounded-lg border-2 px-0 !text-accent-primary-main md:block"
						>
							<span className="flex h-full items-center bg-accent-primary-main px-1">
								<BiMessageAltDetail className="text-[24px] text-white" />
							</span>
							<span className="px-2">{t('common:submit_rfq')}</span>
						</Button>

						{/* cart */}
						<div title={!is_live ? 'Message Vendor' : ''}>
							<Button
								variant="special"
								className={
									!is_live ? '!cursor-not-allowed !opacity-60' : ''
								}
								onClick={is_live ? onAddToCart : undefined}
							>
								{t('common:add_to_cart')}
							</Button>
						</div>
					</div>
				</div>

				{/* Additional info */}
				<div className="hidden space-y-4 rounded-md bg-gray/20 p-4 md:mt-[21px] md:block">
					<div ref={sliderRef} className="keen-slider">
						{is_bulk_pricing &&
							bulk_pricing?.map((bulkPrice: any, index: any) => (
								<div
									key={`${bulkPrice.range}_${bulkPrice.price}_${index}`}
									className="keen-slider__slide"
								>
									<p>
										<span className="font-semibold">
											{bulkPrice.range}
										</span>{' '}
										{t('common:piece')}= ${bulkPrice.price}
									</p>
								</div>
							))}
					</div>

					{/* Variants */}
					<div ref={sliderRef} className="keen-slider">
						{variants.map((variant: any) => {
							const { variant_id } = variant;
							const isSelected = selectedVariantId === variant_id;
							return (
								<div key={variant_id} className="keen-slider__slide">
									<Button
										onClick={() =>
											onVariantClick(isSelected ? '' : variant_id)
										}
										className={`px-0 !text-[21px] ${
											isSelected ? 'font-semibold' : 'font-normal'
										} !text-primary-main`}
									>
										{variant.variants_option}
									</Button>
								</div>
							);
						})}
					</div>

					<p className="text-[21px] text-primary-main">
						<span className="font-semibold">
							{t('common:quantity')}:
						</span>{' '}
						<span>
							{is_unlimited_quantity && inventory?.quantity === 0
								? t('common:unlimited_quantity')
								: inventory?.quantity || 0}
						</span>
					</p>
					<p className="text-[21px] text-primary-main">
						<span className="font-semibold capitalize">
							{/* {t('common:customization')}: */}
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