import { useRouter } from 'next/router';

// Third party packages
import { ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineShoppingCart
} from 'react-icons/md';

// components
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import RatingStars from '../product-details/product-details-tab/product-review/rating-stars';
import MetadataTile from './metadata/metadata-tile';

// data
import { metadataList } from 'data/product-search/metadata-list';

// store
import { useAuthStore } from 'store/auth';

interface ProductTileProps {
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
	minOrderQuantityUnit: string;
	totalReviewCount?: number;
	totalRateCount?: number;
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
			className="mr-1 flex h-[30px] items-center space-x-1 overflow-hidden rounded border-[0.594234px] border-primary-main outline-none  xl:w-[138.32px] xl:border-[1.23px]"
		>
			<div className="flex h-full w-6 justify-center rounded-l bg-accent-primary-main xl:w-[26.4px]">
				{/* <div className="relative h-[20px] w-[12.08px] xl:w-[18px]">
					<ImageWithErrorHandler
						src="/message-vendor-icon.png"
						alt="message vendor icon"
						fill={true}
					/>
				</div> */}
				<ChatBubbleLeftRightIcon className="w-5 text-white" />
			</div>

			<p className="py-1 pr-1 text-[10px] text-accent-primary-main desktop:w-full desktop:text-xs">
				{t('message_vendor')}
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
			titleClassName="lg:!text-[10px] sm:!text-[12px] sm:!leading-[14.63px] xl:!text-[13px] xl:!leading-[15.85px]"
			imageContainerClassName="!w-[14px] !h-[10px] xl:!w-[23px] xl:!h-[14px] desktop:!w-[23px] desktop:!h-[14px]"
			className="!space-x-1"
		/>,
		// isReadyToShip
		<div
			key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			className={!isReadyToShip ? 'invisible' : ''}
		>
			<MetadataTile
				key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				imageUrl={metadataList[1].imageUrl}
				alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				titleClassName="lg:!text-[10px] sm:!text-[12px] sm:!leading-[14.63px] xl:!text-[13px] xl:!leading-[15.85px]"
				className="!space-x-1"
				imageContainerClassName="desktop:!w-[22px] desktop:!h-[12.57px]"
			/>
		</div>,
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[20px] md:text-[24] desktop:text-[28px]">
					{isInCompareList ? (
						<MdBookmark className="text-[#FC5267]" />
					) : (
						<MdOutlineBookmarkBorder className="text-bg_blue" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			onClick={onCompareClick}
			className="cursor-pointer !space-x-1"
			titleClassName="xl:text-cyan lg:!text-[10px] text-bg_blue xl:!text-[13px] xl:!leading-[15.85px]"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
			className="!space-x-1"
			imageContainerClassName="xl:!w-[22px] xl:!h-[20px]"
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
			titleClassName="lg:!text-[10px] sm:!text-[12px] sm:!leading-[14.63px] xl:!text-[13px] xl:!leading-[15.85px]"
		/>,
		// variantCount
		<MetadataTile
			key={metadataList[4].title}
			imageUrl={metadataList[4].imageUrl}
			alt={metadataList[4].title}
			title={`${t('common:variants')} ${variantCount}`}
			titleClassName="lg:!text-[10px] sm:!text-[12px] sm:!leading-[14.63px] xl:!text-[13px] xl:!leading-[15.85px]"
			className="!space-x-1"
		/>,
		// add to cart
		<div
			key={t('common:save')}
			title={!isLive ? 'Use message vendor' : ''}
			className={hideCartButton ? 'invisible' : ''}
		>
			<MetadataTile
				key={t('common:save')}
				icon={
					<div
						className={`text-[20px] md:text-[24] desktop:pl-[2px] desktop:text-[24px] ${
							isLive ? 'text-bg_blue' : 'text-gray/40'
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
				onClick={onCartClick}
				titleClassName="xl:text-cyan lg:!text-[10px] sm:!text-[12px] text-bg_blue sm:!leading-[14.63px] xl:!text-[13px] xl:!leading-[15.85px]"
			/>
		</div>
	];

	return (
		<div
			className={`relative overflow-hidden rounded-md bg-white sm:h-[230px] xl:h-[280px] desktop:h-[312px] ${
				isEco ? 'border border-accent-success' : ''
			}`}
		>
			<div className="flex xl:mt-[25px]">
				{/* Image container */}
				<div className="w-[188px]s relative flex items-center justify-center">
					<div className="flex items-center justify-center overflow-hidden sm:ml-[21px] sm:mt-[16px] sm:mr-[28px] sm:h-[139px] sm:w-[139px] lg:h-[171.93px] lg:w-[171.93px] xl:ml-[26px] xl:mr-[54px] xl:h-[200px] xl:w-[200px]">
						<img
							key={imageUrl}
							src={imageUrl}
							alt={alt || ''}
							className="h-full w-full cursor-pointer object-contain"
							onClick={onClick}
						/>
					</div>
					{isEco && (
						<div className="absolute top-2 left-2 desktop:top-0">
							<ImageWithErrorHandler
								src="/icons/eco-icon.svg"
								alt="eco-icon"
								width={32}
								height={32}
							/>
						</div>
					)}
				</div>

				{/* Name, descriptions and keywords */}
				<div className="ml-[28px]s mt-[10px] w-full lg:w-[372.19px] xl:w-[452px] desktop:w-[552px]">
					<h2
						onClick={onClick}
						className="cursor-pointer text-gray line-clamp-3 sm:text-[16px] sm:leading-[19.5px] lg:text-[15px] desktop:h-[76.9px]"
					>
						<span className="font-semibold">{name}: </span>
						<span>{description}</span>
					</h2>

					{/* Price and quantity */}
					<div className="mt-[18px] w-[266.68px] border-b-[0.97px] border-[#DEDFE0] pb-[13px] lg:w-full">
						<h3 className="text-[18px] font-semibold leading-[21.94px] text-primary-main">
							{isSaleOn && !isBulkPricing ? (
								<>
									<span className="text-error">
										{t('sale')} ${salePrice}/{minOrderQuantityUnit}
									</span>
									<span className="ml-2 inline-block line-through">
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
							<h4 className="text-[18px] font-semibold leading-[21.94px] text-primary-main">
								{minOrderQuantity} {minOrderQuantityUnit} /
								{t('common:min_order')}
							</h4>
						)}
					</div>

					{/* Metadata - For desktop only */}
					<div className="hidden grid-cols-3 gap-y-3 lg:mt-[12.14px] lg:grid">
						{metadataTileList[0]}
						{metadataTileList[3]}
						{metadataTileList[1]}
						{metadataTileList[4]}
						{metadataTileList[2]}
						{metadataTileList[5]}
					</div>
					{/* <div className="hidden items-center justify-between space-x-1 lg:mt-[12.14px] lg:flex">
						<div className="flex flex-col">
							{metadataTileList[0]}
							{metadataTileList[3]}
						</div>
						<div className="flex flex-col">
							{metadataTileList[1]}
							{metadataTileList[4]}
						</div>
						<div className=" flex flex-col">
							{metadataTileList[2]}
							{metadataTileList[5]}
						</div>
					</div> */}
				</div>
			</div>

			{/* Metadata - For sm and tablet only */}
			<div className="grid grid-cols-3 gap-y-3 sm:mt-[10px] sm:ml-[25px] sm:w-[72%] lg:hidden">
				{metadataTileList[0]}
				{metadataTileList[3]}
				{metadataTileList[1]}
				<div className={isLive ? '' : '-mt-5'}>
					{metadataTileList[4]}
				</div>
				{metadataTileList[2]}
				{metadataTileList[5]}
			</div>
			{/* <div className="flex items-center space-x-2 sm:mt-[10px] sm:ml-[25px] sm:w-[72%] lg:hidden">
				<div className="flex flex-col space-y-2">
					{metadataTileList[0]}
					{metadataTileList[3]}
				</div>
				<div className="flex flex-col space-y-1">
					{metadataTileList[1]}
					<div className={isLive ? '' : '-mt-5'}>
						{metadataTileList[4]}
					</div>
				</div>
				<div className="flex flex-col space-y-1">
					{metadataTileList[2]}
					{metadataTileList[5]}
				</div>
			</div> */}

			<div className="absolute right-0 bottom-[19.37px] flex w-[126px] flex-col items-center space-y-2 xl:right-[32px] xl:bottom-[29.02px] desktop:right-[68px] desktop:w-[138.32px]">
				{/* Verified Image */}
				<div className="relative h-[54.87px] w-[83.09px] lg:h-[55.29px] lg:w-[83.61px] xl:h-[82px] xl:w-[124px]">
					<ImageWithErrorHandler
						src="/images/twmp-verified.svg"
						alt=""
						fill={true}
					/>
				</div>

				{/* Rating and reviews */}
				<div className="flex flex-col items-center space-y-1 lg:pt-[16.18px] xl:pt-[24px]">
					<div className="h-[13px] w-[81.71px] desktop:h-[23.7px] desktop:w-[149px]">
						<RatingStars
							starNumber={5}
							rating={totalRateCount}
							className="!h-[13px] !w-[13px] text-gray lg:!h-[15.98px] lg:!w-[15.98px] desktop:!h-[23.7px] desktop:!w-[23.7px]"
							containerClassName="space-x-1 desktop:space-x-2"
							selectedClassName="text-secondary"
						/>
					</div>

					<p className="text-center text-xs leading-[15px] text-secondary desktop:text-[13px] desktop:leading-4">
						{totalReviewCount} {t('common:reviews')}
					</p>
				</div>

				<div className="lg:pt-[30.8px] xl:pt-[46px]">
					{messageVendorButton}
				</div>
			</div>
		</div>
	);
};

export default ProductTile;
