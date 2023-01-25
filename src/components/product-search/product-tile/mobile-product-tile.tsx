import Link from 'next/link';

// components
import MetadataTile from '../metadata/metadata-tile';

// data
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import RatingStars from 'components/product-details/product-details-tab/product-review/rating-stars';
import { metadataList } from 'data/product-search/metadata-list';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineShoppingCart
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';

interface MobileProductTileProps {
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
	totalRateCount?: number;
	totalReviewCount?: number;
	onCompareClick?: () => any;
	onCartClick?: () => any;
	onMessageVendorClick?: () => any;
	isInCompareList?: boolean;
	isVerified?: boolean;
	isLive?: boolean;
	isReadyToShip?: boolean;
	isCustomizable?: boolean;
	variantCount: number;
}

const MobileProductTile: React.FC<MobileProductTileProps> = (props) => {
	const {
		isEco,
		name,
		slug,
		keywords,
		description,
		imageUrl,
		alt,
		countryOfOrigin,
		country,
		productPrice,
		salePrice,
		isBulkPricing,
		isSaleOn,
		displayPrice,
		minOrderQuantity,
		totalRateCount,
		totalReviewCount,
		onCompareClick,
		isInCompareList,
		isVerified,
		isLive,
		isReadyToShip,
		isCustomizable,
		variantCount,
		onCartClick,
		onMessageVendorClick
	} = props;

	const router = useRouter();
	const { t } = useTranslation();

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData,
			autoLogin: state.autoLogin
		})
	);

	const metadataTileList = [
		// country of origin
		<MetadataTile
			key={country?.name}
			imageUrl={country?.imageUrl}
			alt={country?.name}
			title={country?.name}
			imageContainerClassName="!w-[14px] !h-[10px]"
		/>,
		// isReadyToShip
		isReadyToShip && (
			<MetadataTile
				key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				imageUrl={metadataList[1].imageUrl}
				alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				title={`${t('common:live_buy')} / ${t('common:ready_to_ship')}`}
			/>
		),
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[20px] md:text-[24]">
					{isInCompareList ? (
						<MdBookmark className="text-[#FC5267]" />
					) : (
						<MdOutlineBookmarkBorder className="text-accent-primary-main" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			titleClassName="text-accent-primary-main"
			onClick={onCompareClick}
			className="cursor-pointer"
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
						className={`text-[20px] md:text-[24] ${
							isLive ? 'text-accent-primary-main' : 'text-gray/40'
						}`}
					>
						<MdOutlineShoppingCart />
					</div>
				}
				alt={t('common:save')}
				title={t('cart')}
				titleClassName="text-accent-primary-main"
				className={isLive ? 'cursor-pointer' : 'cursor-not-allowed'}
				onClick={isLive ? onCartClick : undefined}
			/>
		</div>
	];

	return (
		<div
			className={`h-[118px] w-full bg-white ${
				isEco ? 'border-2 border-accent-success' : ''
			}`}
		>
			<div className="flex space-x-2">
				{/* Image Container  */}
				<div className="relative h-[78px] !w-[120px]">
					<Link href={`/product/${slug}`}>
						<div className="relative h-full w-full md:mt-5 md:h-[97px] lg:mt-0 lg:h-full">
							<ImageWithErrorHandler
								src={imageUrl}
								alt={alt}
								fill={true}
								className="object-contain"
							/>
						</div>
					</Link>

					{isEco && (
						<div className="absolute top-2 left-2 lg:top-0">
							<ImageWithErrorHandler
								src="/static/icons/eco-icon.png"
								alt="eco-icon"
								width={32}
								height={32}
							/>
						</div>
					)}
				</div>

				<div className="w-auto">
					{/* Product Info and keywords*/}
					<Link
						href={`/product/${slug}`}
						className="text-[12px] leading-[15px] text-primary-main"
					>
						{name}
					</Link>

					{/* Product name, description and keywords container */}
					<div className="-mt-1s">
						<h3 className="flex items-center text-xs font-semibold leading-[15px]">
							{isSaleOn && !isBulkPricing ? (
								<>
									<span className="text-accent-error">
										Sale ${salePrice}/piece
									</span>
									<span className="pl-2 text-gray line-through">
										${productPrice}/piece
									</span>
								</>
							) : (
								<span className="text-primary-main">
									{displayPrice} /piece
								</span>
							)}
						</h3>

						{minOrderQuantity > 0 && (
							<h4 className="text-xs leading-[15px] text-primary-main">
								{minOrderQuantity} {t('common:piece')} /
								{t('common:min_order')}
							</h4>
						)}
					</div>

					<div className="mt-[5px]">
						{metadataTileList[0]}
						{metadataTileList[1]}
					</div>
				</div>
			</div>

			{/* Remaining metadata */}
			<div className="flex items-center space-x-2">
				<div className="ml-2 w-[63px]">
					<RatingStars
						starNumber={5}
						rating={totalRateCount}
						className="text-gray"
						selectedClassName="text-secondary"
					/>
				</div>
				<div className="relative h-[23px] w-[36px]">
					<Image src="/twmp-verified.png" alt="" fill={true} />
				</div>
				{metadataTileList[2]}
				{metadataTileList[3]}
			</div>
		</div>
	);
};

export default MobileProductTile;
