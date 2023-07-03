import { useRouter } from 'next/router';

// components
import MetadataTile from './metadata/metadata-tile';

// data
import { metadataList } from 'data/product-search/metadata-list';
import { useTranslation } from 'next-i18next';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineShoppingCart
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import RatingStars from '../product-details/product-details-tab/product-review/rating-stars';

interface ProductTileProps {
	isEco?: boolean;
	name: string;
	slug: string;
	keywords: string[];
	description: string;
	imageUrl: string;
	alt?: string;
	countryOfOrigin: string;
	country?: {
		name: string;
		imageUrl: string;
	};
	productPrice: number;
	isSaleOn?: boolean;
	salePrice: number;
	displayPrice: string;
	isBulkPricing: boolean;
	minOrderQuantity: number;
	minOrderQuantityUnit: string;
	totalReviewCount?: number;
	totalRateCount?: number;
	onCompareClick?: () => any;
	onCartClick?: () => any;
	onMessageVendorClick?: () => any;
	onClick?: () => any;
	isInCompareList?: boolean;
	isVerified?: boolean;
	isLive?: boolean;
	isReadyToShip?: boolean;
	isCustomizable?: boolean;
	variantCount: number;
}

const ProductTile: React.FC<ProductTileProps> = (props) => {
	const {
		isEco,
		name,
		slug,
		keywords,
		description,
		imageUrl,
		alt,
		country,
		productPrice,
		salePrice,
		isBulkPricing,
		isSaleOn,
		displayPrice,
		minOrderQuantity,
		minOrderQuantityUnit,
		totalRateCount,
		totalReviewCount,
		onCompareClick,
		isInCompareList,
		isLive,
		isReadyToShip,
		isCustomizable,
		variantCount,
		onCartClick,
		onMessageVendorClick,
		onClick
	} = props;

	const router = useRouter();
	const { pathname, query } = router;

	const main_category = query?.main_category;
	const category = query?.category;
	const filters = query?.filters;

	const { t } = useTranslation();

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData,
			autoLogin: state.autoLogin
		})
	);

	const messageVendorButton = (
		<button
			onClick={onMessageVendorClick}
			className="flex h-[20px] items-center space-x-1 rounded border-[0.594234px] border-primary-main outline-none desktop:h-[22.98px] desktop:w-[138.32px] desktop:border-[1.23px]"
		>
			<div className="flex h-full w-[17.28px] justify-center bg-accent-primary-main desktop:w-[26.4px]">
				<div className="relative h-[20px] w-[12.08px] desktop:w-[18px]">
					<ImageWithErrorHandler
						src="/message-vendor-icon.png"
						alt="message vendor icon"
						fill={true}
					/>
				</div>
			</div>

			<p className="text-[10px] text-accent-primary-main desktop:w-full desktop:text-xs">
				Message Vendor
			</p>
		</button>
	);

	const metadataTileList = [
		// country of origin
		<MetadataTile
			key={country?.name}
			imageUrl={country?.imageUrl}
			alt={country?.name}
			title={country?.name}
			imageContainerClassName="!w-[14px] !h-[10px] desktop:!w-[23px] desktop:!h-[14px]"
			className="!space-x-1"
		/>,
		// isReadyToShip
		isReadyToShip && (
			<MetadataTile
				key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				imageUrl={metadataList[1].imageUrl}
				alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				className="!space-x-1"
				imageContainerClassName="desktop:!w-[22px] desktop:!h-[12.57px]"
			/>
		),
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[20px] tablet:text-[24] desktop:text-[28px]">
					{isInCompareList ? (
						<MdBookmark className="text-[#FC5267]" />
					) : (
						<MdOutlineBookmarkBorder className="text-accent-primary-main" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			onClick={onCompareClick}
			className="cursor-pointer !space-x-1"
			titleClassName="desktop:text-cyan"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
			className="!space-x-1"
			imageUrl={metadataList[3].imageUrl}
			alt={t('common:customizable')}
			title={
				<p>
					{t('common:customizable')}{' '}
					<span className="text-secondary">
						{isCustomizable ? 'YES' : 'NO'}
					</span>
				</p>
			}
		/>,
		// variantCount
		<MetadataTile
			key={metadataList[4].title}
			imageUrl={metadataList[4].imageUrl}
			alt={metadataList[4].title}
			title={`${t('common:variants')} ${variantCount}`}
			className="!space-x-1"
		/>,
		// add to cart
		<div
			key={t('common:save')}
			title={!isLive ? 'Use message vendor' : ''}
		>
			<MetadataTile
				key={t('common:save')}
				icon={
					<div
						className={`text-[20px] tablet:text-[24] desktop:pl-[2px] desktop:text-[24px] ${
							isLive ? 'text-accent-primary-main' : 'text-gray/40'
						}`}
					>
						<MdOutlineShoppingCart />
					</div>
				}
				alt={t('common:save')}
				title={t('cart')}
				className={`!space-x-1 ${
					isLive ? 'cursor-pointer' : 'cursor-not-allowed'
				}`}
				onClick={isLive ? onCartClick : undefined}
				titleClassName="desktop:text-cyan"
			/>
		</div>
	];
	const isSalePriceAvailable = isSaleOn && !isBulkPricing;

	return (
		<div
			className={`relative overflow-hidden rounded-md bg-white sm:h-[230px] ${
				isEco ? 'border-2 border-accent-success' : ''
			}`}
		>
			<div className="flex">
        {/* Image container */}
        <div className="relative flex items-center justify-cener w-[188px] h-[177px]s">
          <div className="overflow-hidden sm:h-[139px] sm:w-[139px]">
            <img
              key={imageUrl}
              src={imageUrl}
              alt={alt || ''}
              className="cursor-pointer object-contain"
              onClick={onClick}
            />
          </div>
          {isEco && (
            <div className="absolute top-2 left-2 desktop:top-0">
              <ImageWithErrorHandler
                src="/static/icons/eco-icon.png"
                alt="eco-icon"
                width={32}
                height={32}
              />
            </div>
          )}
        </div>

				{/* Name, descriptions and keywords */}
				<div className="ml-[28px] mt-[8px] w-full">
					<h2
						onClick={onClick}
						className="cursor-pointer line-clamp-3 sm:text-[16px] sm:leading-[19.5px]"
					>
						<span className="font-semibold">{name}: </span>
						<span className="text-gray">{description}</span>
					</h2>
            
					{/* Price and quantity */}
					<div className="mt-[18px] border-b-[0.97px] w-[266.68px] border-[#DEDFE0] pb-[13px]">
						<h3 className="text-[18px] font-semibold leading-[21.94px] text-primary-main">
							{isSaleOn && !isBulkPricing ? (
								<>
									<span className="text-accent-error">
										Sale ${salePrice}/{minOrderQuantityUnit}
									</span>
									<span className="inline-block ml-2 text-gray line-through">
										${productPrice}/{minOrderQuantityUnit}
									</span>
								</>
							) : (
								<>
									{displayPrice} /{minOrderQuantityUnit}
								</>
							)}
            </h3>

						{minOrderQuantity > 0 && (
							<h4 className="text-[18px] leading-[21.94px] font-semibold text-primary-main">
								{minOrderQuantity} {minOrderQuantityUnit} /
								{t('common:min_order')}
							</h4>
						)}
					</div>

					{/* Metadata - For desktop only */}
					<div className="hidden lg:flex items-center justify-between">
						<div className="flex flex-col space-y-4">
							{metadataTileList[0]}
							{metadataTileList[3]}
						</div>
						<div className="flex flex-col space-y-4">
							{metadataTileList[1]}
							{metadataTileList[4]}
						</div>
						<div className="flex flex-col space-y-3">
							{metadataTileList[2]}
							{metadataTileList[5]}
						</div>
					</div>
				</div>
			</div>

			{/* Metadata - For sm and tablet only */}
			<div className="flex items-center space-x-4 sm:mt-[17px] sm:ml-[25px]">
				<div className="flex flex-col space-y-2">
					{metadataTileList[0]}
					{metadataTileList[3]}
				</div>
				<div className="flex flex-col space-y-1">
					{metadataTileList[1]}
					{metadataTileList[4]}
				</div>
				<div className="flex flex-col space-y-1">
					{metadataTileList[2]}
					{metadataTileList[5]}
				</div>
			</div>

			<div className="absolute right-0 bottom-[19.37px] flex w-[126px] flex-col items-center space-y-2 desktop:right-12 desktop:bottom-6 desktop:w-[138.32px]">
				{/* Verified Image */}
				<div className="relative h-[54.87px] w-[83.09px] desktop:h-[82px] desktop:w-[124px]">
					<ImageWithErrorHandler
						src="/twmp-verified.png"
						alt=""
						fill={true}
					/>
				</div>

				{/* Rating and reviews */}
				<div className="flex flex-col items-center space-y-1 desktop:pt-[18px]">
					<div className="h-[13px] w-[81.71px] desktop:h-[23.7px] desktop:w-[149px]">
						<RatingStars
							starNumber={5}
							rating={totalRateCount}
							className="!h-[13px] !w-[13px] text-gray desktop:!h-[23.7px] desktop:!w-[23.7px]"
							containerClassName="space-x-1 desktop:space-x-2"
							selectedClassName="text-secondary"
						/>
					</div>

					<p className="text-center text-xs leading-[15px] text-secondary desktop:text-[13px] desktop:leading-4">
						{totalReviewCount} {t('common:reviews')}
					</p>
				</div>

				<div className="desktop:pt-6">{messageVendorButton}</div>
			</div>
		</div>
	);
};

export default ProductTile;
