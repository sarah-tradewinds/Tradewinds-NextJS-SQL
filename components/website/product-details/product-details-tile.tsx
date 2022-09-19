import Image from 'next/image';
import { useRouter } from 'next/router';

// components
import Button from 'components/website/common/form/button';
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
import ImageContainer from './product-details-images/image-contaier';
import RatingStars from './product-details-tab/product-review/rating-stars';

// utils
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'next-i18next';
import { useCartStore } from 'store/cart-store';
import { getLocaleText } from 'utils/get_locale_text';

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

	const { addToCart } = useCartStore((state) => ({
		addToCart: state.addToCart
	}));

	const router = useRouter();
	const { locale } = router;

	const {
		product_name,
		product_description,
		inventory,
		product_price,
		is_bulk_pricing,
		bulk_pricing = [],
		tags = [],
		variants = [],
		images = [],
		is_customizable,
		country_of_region,
		is_ready_to_ship,
		is_verified
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

	const minOrderQuantity = inventory?.minimum_order_quantity || 0;

	const metadataTileList = [
		// country of origin
		<MetadataTile
			key={metadataList[0].title}
			imageUrl={metadataList[0].imageUrl}
			alt={metadataList[0].title}
			title={country_of_region}
		/>,
		// isReadyToShip
		<MetadataTile
			key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			imageUrl={metadataList[1].imageUrl}
			alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
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
		/>,
		// variantCount
		<MetadataTile
			key={metadataList[4].title}
			imageUrl={metadataList[4].imageUrl}
			alt={metadataList[4].title}
			title={`${t('common:variant')} ${variants.length}`}
		/>,
		// save
		<MetadataTile
			key={t('common:save')}
			imageUrl={metadataList[5].imageUrl}
			alt={t('common:save')}
			title={t('common:save')}
		/>
	];

	return (
		<div className="grid grid-cols-12 gap-8 bg-white">
			{/* Images container */}
			<ImageContainer
				className="col-span-12 md:first-letter:p-8 lg:col-span-5"
				imageUrl={images[0]?.url}
				alt=""
				thumbnails={images}
			/>

			{/* Product details */}
			<div className="col-span-12 space-y-4 px-4 md:py-8 md:px-24 lg:col-span-7 lg:p-8">
				{/* Product name and sku info */}
				<div className="flex items-center justify-between">
					<h1 className="text-[18px] font-semibold text-primary-main lg:text-[30px]">
						{productName}
					</h1>
					<p className="hidden text-[25px] font-semibold text-gray/40 md:block">
						{inventory?.sku}
					</p>
				</div>
				{/* Price and quantity info */}
				<div className="flex justify-between text-[12px] font-semibold text-primary-main lg:text-[21px]">
					<p>
						{displayPrice} /{t('common:piece')}
					</p>
					{minOrderQuantity > 0 && (
						<p>
							{minOrderQuantity} {t('common:piece')} /
							{t('common:min_order')}
						</p>
					)}
				</div>
				{/* Keywords */}
				<div className="flex space-x-4 text-[12px] font-semibold text-primary-main md:space-x-16 lg:text-[13px]">
					{tags.map((tag: any, index: number) => {
						let tagName = tag;
						if (typeof tag === 'object') {
							tagName = getLocaleText(tag || {}, locale);
						}
						return <span key={`${tagName}_${index}`}>{tagName}</span>;
					})}
				</div>
				{/* Metadata list */}
				<div>
					<div
						className={`grid grid-cols-3 gap-4 text-[12px] text-gray`}
					>
						{/* country of origin */}
						{metadataTileList[0]}
						{/* {metadataTileList[1]} */}
						{/* isReadyToShip */}
						{!is_ready_to_ship && metadataTileList[1]}
						{/* Customizable */}
						{metadataTileList[2]}
						{/* variantCount */}
						{metadataTileList[3]}
						{/* save */}
						{metadataTileList[4]}
					</div>
				</div>

				{/* Rating, review count and verified Image */}
				<div className="hidden items-center space-x-8 pb-4 md:flex">
					<RatingStars
						starNumber={product.rating}
						className="text-secondary"
					/>
					<div className="relative h-[32px] w-[132px]">
						<Image src="/rating.png" alt="" layout="fill" />
					</div>
					<p className="text-center text-[13px] text-secondary">
						{totalReviewCount} {t('common:reviews')}
					</p>
					{is_verified && (
						<div className="relative h-[30px] w-[162px]">
							<Image
								src="/tradewinds-horizontal-logo.png"
								alt=""
								layout="fill"
							/>
						</div>
					)}
				</div>
				{/* Product name and bullet points */}
				<div className="border-t border-b-0 border-gray/40 py-6 md:border-b">
					<h2 className="text-[12px] text-gray md:text-[15px]">
						<span className="font-semibold">
							Product name: {productName}
						</span>{' '}
						<span>
							{getLocaleText(product_description || {}, locale)}
						</span>
					</h2>

					<div className="mt-4 flex items-center space-x-2">
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
						<div>
							<Button
								variant="special"
								onClick={onAddToCart}
								// onClick={() => {
								//   product.buyer_id = customerData.buyerId;
								//   onAddToCart
								// 	addToCart(product.id, product);
								// }}
							>
								{t('common:add_to_cart')}
							</Button>
						</div>
					</div>
				</div>

				{/* Additional info */}
				<div className="hidden space-y-4 rounded-md bg-gray/20 p-4 md:block">
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

					<p className="text-[21px] font-semibold text-primary-main">
						{t('common:quantity')}: {inventory?.quantity || 0}
					</p>
					<p className="text-[21px] text-primary-main">
						<span className="font-semibold capitalize">
							{t('common:customization')}:
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
