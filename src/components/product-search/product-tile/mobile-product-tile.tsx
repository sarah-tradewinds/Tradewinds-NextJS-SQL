import Link from 'next/link';
import { useRouter } from 'next/router';

// Third party packages
import { useTranslation } from 'next-i18next';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import RatingStars from 'components/product-details/product-details-tab/product-review/rating-stars';
import MetadataTile from '../metadata/metadata-tile';

// data
import { metadataList } from 'data/product-search/metadata-list';

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
	onClick?: () => any;

	isInCompareList?: boolean;
	isLive?: boolean;
	isLiveBuy?: boolean;
	isReadyToShip?: boolean;
	isCustomizable?: boolean;
	variantCount: number;
	hideCartButton?: boolean;
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
		isLive,
		isLiveBuy,
		isReadyToShip,
		isCustomizable,
		variantCount,
		hideCartButton,
		onCartClick,
		onMessageVendorClick,
		onClick
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
			titleClassName="leading-[12.19px]"
			imageContainerClassName="!w-[13.13px] !h-[10px]"
		/>,
		// isReadyToShip
		isReadyToShip && (
			<MetadataTile
				key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				imageUrl={metadataList[1].imageUrl}
				alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				title={`${t('common:live_buy')} / ${t('common:ready_to_ship')}`}
				titleClassName="leading-[12.19px]"
				imageContainerClassName="!w-[13.13px] !h-[10px]"
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
						<MdOutlineBookmarkBorder className="text-bg_blue" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			titleClassName="text-bg_blue"
			onClick={onCompareClick}
			className="cursor-pointer"
		/>,
		// add to cart
		!hideCartButton && (
			<div
				key={t('common:save')}
				title={!isLive ? 'Use message vendor' : ''}
			>
				<MetadataTile
					key={t('common:save')}
					icon={
						<div
							className={`text-[20px] md:text-[24] ${
								isLiveBuy ? 'text-bg_blue' : 'text-gray/40'
							}`}
						>
							<MdOutlineShoppingCart />
						</div>
					}
					alt={t('common:save')}
					title={t('cart')}
					titleClassName="text-bg_blue"
					className={
						isLiveBuy ? 'cursor-pointer' : 'cursor-not-allowed'
					}
					onClick={onCartClick}
				/>
			</div>
		)
	];

	const isSalePriceAvailable = isSaleOn && !isBulkPricing;

	return (
		<div
			className={`w-full overflow-hidden rounded-md bg-white ${
				isEco ? 'border-1 border-accent-success' : ''
			} ${isSalePriceAvailable ? 'h-[155px]' : 'h-[118px]'}`}
		>
			{/* Image and Info */}
			<div className="flex ">
				{/* Image Container  */}
				<div className="relative flex w-[124px] items-center justify-center">
					<div className="relative ml-[8px] mt-[8px] mr-[34px] flex h-[81px] w-[79px] items-center justify-center">
						<ImageWithErrorHandler
							src={imageUrl}
							alt={alt || ''}
							width={79}
							height={81}
							onClick={onClick}
						/>
					</div>

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

				<div className="mt-[9px]">
					{/* Product Info and keywords*/}
					<Link
						href={`/product/${slug}`}
						className="text-[12px] leading-[14.63px] text-gray line-clamp-1"
					>
						{name}
					</Link>

					{/* Product name, description and keywords container */}
					<div>
						{/* Product Price */}
						<div className="flex text-[12px] font-semibold leading-[14.63px] text-primary-main">
							{isSalePriceAvailable ? (
								<p className="flex flex-col">
									<span className="">Sale ${salePrice}/piece</span>
									<span className=" line-through">
										${productPrice}/piece
									</span>
								</p>
							) : (
								<span className="text-gray">{displayPrice} /piece</span>
							)}
						</div>

						{/* Minimum Order Quantity */}
						{minOrderQuantity > 0 && (
							<h4 className="text-[12px] leading-[14.63px] text-gray">
								{minOrderQuantity} {t('common:piece')} /
								{t('common:min_order')}
							</h4>
						)}
					</div>

					<div className="mt-[7px] ml-[3px] flex flex-col space-y-[4px]">
						{metadataTileList[0]}
						{metadataTileList[1]}
					</div>
				</div>
			</div>

			{/* Remaining metadata */}
			<div className="flex items-center space-x-2">
				<RatingStars
					starNumber={5}
					rating={totalRateCount}
					containerClassName="space-x-[3.22px]"
					className="!h-[10.2px] !w-[10.2px] text-gray"
					selectedClassName="text-secondary"
				/>
				<div className="relative h-[23px] w-[36px]">
					<ImageWithErrorHandler
						src="/twmp-verified.png"
						alt=""
						fill={true}
					/>
				</div>
				<div className="flex items-center space-x-[10px] pl-1">
					{metadataTileList[2]}
					{metadataTileList[3]}
				</div>
			</div>
		</div>
	);
};

export default MobileProductTile;
