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
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsTile: React.FC<{
	totalReviewCount: number;
	product: any;
	selectedVariantId?: string;
	onVariantClick: (variantId: string) => any;
}> = (props) => {
	const {
		totalReviewCount,
		product = {},
		onVariantClick,
		selectedVariantId
	} = props;
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

	const displayPrice = getDisplayBulkPrice({
		product_price,
		is_bulk_pricing,
		bulk_pricing
	});

	const minOrderQuantity = inventory?.minimum_order_quantity || 0;

	const mainImageUrl = images[0]?.url;

	return (
		<div className="grid grid-cols-12 gap-8 bg-white">
			{/* Images container */}
			<ImageContainer
				className="col-span-12 md:first-letter:p-8 lg:col-span-5"
				imageUrl={mainImageUrl}
				alt=""
				thumbnails={images}
			/>

			{/* Product details */}
			<div className="col-span-12 space-y-4 px-4 md:py-8 md:px-24 lg:col-span-7 lg:p-8">
				{/* Product name and sku info */}
				<div className="flex items-center justify-between">
					<h1 className="text-[18px] font-semibold text-primary-main lg:text-[30px]">
						{getLocaleText({ en: product_name }, locale)}
					</h1>
					<p className="hidden text-[25px] font-semibold text-gray/40 md:block">
						{inventory?.sku}
					</p>
				</div>
				{/* Price and quantity info */}
				<div className="flex justify-between text-[12px] font-semibold text-primary-main lg:text-[21px]">
					<p>{displayPrice} /piece</p>
					{minOrderQuantity > 0 && (
						<p>{minOrderQuantity} Pieces /Min. Order</p>
					)}
				</div>
				{/* Keywords */}
				<div className="flex justify-between text-[12px] font-semibold text-primary-main lg:text-[13px]">
					{tags.map((tag: any, index: number) => (
						<span key={`${tag}_${index}`}>{tag}</span>
					))}
				</div>
				{/* Metadata list */}
				<div>
					{/* <MetadataList
						metadataList={metadataList}
						className="!grid-cols-2 md:grid-cols-3"
					/> */}

					<div
						className={`grid grid-cols-3 gap-4 text-[12px] text-gray`}
					>
						{/* country of origin */}
						<MetadataTile
							key={metadataList[0].title}
							imageUrl={metadataList[0].imageUrl}
							alt={metadataList[0].title}
							title={country_of_region}
						/>
						{/* isReadyToShip */}
						{!is_ready_to_ship && (
							<MetadataTile
								key={metadataList[1].title}
								imageUrl={metadataList[1].imageUrl}
								alt={metadataList[1].title}
								title={metadataList[1].title}
							/>
						)}
						{/* compare */}
						{/* <MetadataTile
							key={metadataList[2].title}
							icon={
								<div className="text-[32px]">
									{isInCompareList ? (
										<MdBookmark className="text-[#FC5267]" />
									) : (
										<MdOutlineBookmarkBorder className="text-accent-primary-main" />
									)}
								</div>
							}
							alt={metadataList[2].title}
							title={metadataList[2].title}
							onClick={onCompareClick}
							className="cursor-pointer"
						/> */}
						{/* Customizable */}
						<MetadataTile
							key={metadataList[3].title}
							imageUrl={metadataList[3].imageUrl}
							alt={metadataList[3].title}
							title={
								<p>
									Customizable{' '}
									<span className="text-secondary">
										{is_customizable ? 'YES' : 'NO'}
									</span>
								</p>
							}
						/>
						{/* variantCount */}
						<MetadataTile
							key={metadataList[4].title}
							imageUrl={metadataList[4].imageUrl}
							alt={metadataList[4].title}
							title={`Variant ${variants.length}`}
						/>
						<MetadataTile
							key={metadataList[5].title}
							imageUrl={metadataList[5].imageUrl}
							alt={metadataList[5].title}
							title={metadataList[5].title}
						/>
					</div>
				</div>
				{/* Rating, review count and verified Image */}
				<div className="hidden items-center space-x-8 pb-4 md:flex">
					<RatingStars
						startNum={product.rating}
						className="text-secondary"
					/>
					<div className="relative h-[32px] w-[132px]">
						<Image src="/rating.png" alt="" layout="fill" />
					</div>
					<p className="text-center text-[13px] text-secondary">
						{totalReviewCount} Reviews
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
							Product name:{' '}
							{getLocaleText({ en: product_name }, locale)}
						</span>{' '}
						<span>
							{getLocaleText({ en: product_description }, locale)}
						</span>
					</h2>
					<ul className="ml-8 list-disc text-[12px] text-gray md:text-[15px]">
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
					</ul>
					{/* <Button
						onClick={() => {
							if (!isAuth) {
								setIsLoginOpen();
							} else {
								router.push(
									`${BUYER_DASHBOARD_SUBMIT_RFQ}/?access_key=${customerData.access.token}`
								);
							}
						}}
						className="relative mt-4 hidden h-[22px] w-[139px] md:block"
					>
						<Image src="/submit-rfq-button.png" alt="" layout="fill" />
          </Button>
           */}
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
						className="relative mt-4 !flex h-[22px] items-center !rounded-lg border-2 px-0 text-accent-primary-main md:block"
					>
						<span className="flex h-full items-center bg-accent-primary-main px-1">
							<BiMessageAltDetail className="text-[24px] text-white" />
						</span>
						<span className="px-2">Submit RFQ</span>
					</Button>
				</div>

				{/* Additional info */}
				<div className="hidden space-y-4 rounded-md bg-gray/20 p-4 md:block">
					<div className="flex items-center space-x-8 text-[21px] text-primary-main">
						{is_bulk_pricing &&
							bulk_pricing?.map((bulkPrice: any) => (
								<p key={bulkPrice.range}>
									<span className="font-semibold">
										{bulkPrice.range}
									</span>{' '}
									piece = ${bulkPrice.price}
								</p>
							))}
					</div>
					{/* Variants */}
					<div className="flex space-x-8 ">
						{variants.map((variant: any) => {
							const { variant_id } = variant;
							const isSelected = selectedVariantId === variant_id;
							return (
								<Button
									key={variant.variant_id}
									onClick={() =>
										onVariantClick(isSelected ? '' : variant.variant_id)
									}
									className="px-0 text-[21px] font-semibold !text-primary-main"
								>
									{variant.variants_option}
								</Button>
							);
						})}
					</div>
					<p className="text-[21px] font-semibold text-primary-main">
						Quantity: {inventory?.quantity || 0}
					</p>
					<p className="text-[21px] text-primary-main">
						<span className="font-semibold">Customization:</span>{' '}
						<span>{is_customizable ? 'Yes' : 'No'}</span>
					</p>
				</div>
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ProductDetailsTile;
