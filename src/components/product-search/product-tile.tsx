import Image from 'next/image';
import Link from 'next/link';

// components
import MetadataTile from './metadata/metadata-tile';

// data
import { metadataList } from 'data/product-search/metadata-list';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineMessage,
	MdOutlineShoppingCart
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Button from '../common/form/button';
import RatingStars from '../product-details/product-details-tab/product-review/rating-stars';
import KeywordSlider from './keyword-slider.components';

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

const ProductTile: React.FC<ProductTileProps> = (props) => {
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

	const messageVendorButton = (
		<Button
			onClick={onMessageVendorClick}
			// onClick={() => {
			// 	if (!isAuth) {
			// 		setIsLoginOpen();
			// 		return;
			// 	}

			// 	const buyerDashboardUrl = generateBuyerDashboardUrl({
			// 		redirect_to: BUYER_DASHBOARD_PAGES.message_vendor,
			// 		action: BUYER_DASHBOARD_ACTIONS.message_vendor,
			// 		access_key: customerData.access.token,
			// 		refresh_key: customerData.refresh.token
			// 	});
			// 	router.push(buyerDashboardUrl);
			// }}
			className="md:!h-[189px flex items-center border border-accent-primary-main !p-0 !pr-2 !text-accent-primary-main md:!text-xs lg:px-2"
		>
			<MdOutlineMessage className="mr-1 block h-[40px] bg-accent-primary-main text-[24px] text-white lg:mr-2" />
			Message Vendor
		</Button>
	);

	const metadataTileList = [
		// country of origin
		<MetadataTile
			key={country?.name}
			imageUrl={country?.imageUrl}
			alt={country?.name}
			title={country?.name}
		/>,
		// isReadyToShip
		isReadyToShip && (
			<MetadataTile
				key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				imageUrl={metadataList[1].imageUrl}
				alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			/>
		),
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[24px]">
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
			className="cursor-pointer"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
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
			title={`${t('common:variant')} ${variantCount}`}
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
						className={`text-[24px] ${
							isLive ? 'text-accent-primary-main' : 'text-gray/40'
						}`}
					>
						<MdOutlineShoppingCart />
					</div>
				}
				alt={t('common:save')}
				title={t('cart')}
				className={isLive ? 'cursor-pointer' : 'cursor-not-allowed'}
				onClick={isLive ? onCartClick : undefined}
			/>
		</div>
	];

	const metadataElements = (
		<div
			className={`grid grid-cols-3 gap-x-4 gap-y-4 text-[12px] text-gray  md:gap-y-0 lg:gap-y-4`}
		>
			{metadataTileList}
		</div>
	);

	return (
		<div
			className={`grid w-full grid-cols-12 overflow-hidden bg-white md:rounded-xl md:shadow-md lg:p-4 ${
				isEco ? 'border-2 border-accent-success' : ''
			}`}
		>
			<div className="col-span-12 space-y-4 lg:col-span-12">
				<div className="grid grid-cols-12 gap-4 md:gap-0">
					{/* Image Container */}
					<div className="relative col-span-5 pr-2 md:col-span-3">
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

					<div className="col-span-7 pl-2 md:col-span-9 md:pt-3">
						{/* Product Info and keywords*/}
						<Link
							href={`/product/${slug}`}
							className="text-[12px] text-primary-main md:hidden"
						>
							{name}
						</Link>
						{/* Product name, description and keywords container */}
						<div className="hidden space-y-4 md:block">
							<Link href={`/product/${slug}`}>
								<h2 className="md:text-[16px] lg:text-[15px]">
									<span className="font-semibold">{name}: </span>
									<span className="text-gray">
										{description.length > 4000
											? description.substring(0, 40000) + ' ...'
											: description}
									</span>
								</h2>
							</Link>
							{/* keywords */}
							{keywords.length > 0 && (
								<KeywordSlider keywords={keywords || []} />
							)}
						</div>

						{/* Product price, quantity and verified image */}
						<div className="mb-2 grid grid-cols-12">
							<div className="col-span-12 text-[12px] font-semibold text-primary-main md:col-span-7 md:py-2 md:text-[18px] lg:col-span-9 lg:text-[21px]">
								{/* Price and quantity */}
								<div className="border-b-gray/20 md:border-b-2 md:py-2">
									<h3 className="flex items-center space-x-2 md:space-x-8">
										{isSaleOn && !isBulkPricing ? (
											<>
												<span className="text-accent-error">
													Sale ${salePrice}/piece
												</span>
												<span className="text-gray line-through">
													${productPrice}/piece
												</span>
											</>
										) : (
											<>{displayPrice} / piece</>
										)}
									</h3>
									{minOrderQuantity > 0 && (
										<h4 className="-mt-1 font-normal md:font-semibold">
											{minOrderQuantity} {t('common:piece')} /
											{t('common:min_order')}
										</h4>
									)}
								</div>

								{/* Metadata for large screen*/}
								<div className={`hidden md:pt-4 lg:block`}>
									{metadataElements}
								</div>
							</div>

							{/* Tradewinds verified logo ratings and reviews */}
							<div className="col-span-12 mt-4 hidden pb-4 md:col-span-5 md:block md:px-2 lg:col-span-3 lg:px-2">
								<div className="grid h-full grid-cols-12">
									<div className="col-span-8 hidden md:hidden">
										{metadataElements}
									</div>

									<div className="col-span-12 md:col-span-12">
										<div className="mt-2 flex h-full items-center md:mt-0 md:flex-col md:justify-end lg:flex lg:space-y-4">
											{/* Verified Image */}
											<div className="relative hidden h-[64px] w-[108px] md:block">
												<Image
													src="/twmp-verified.png"
													alt=""
													fill={true}
												/>
											</div>

											{/* Rating and reviews */}
											<div className="flex flex-col items-center space-y-2 pl-2 pb-4 md:pl-0">
												<div className="w-[80px] md:hidden lg:block lg:w-[132px]">
													<RatingStars
														starNumber={5}
														className="text-secondary"
													/>
												</div>
												<p className="hidden text-center text-[13px] text-secondary md:block">
													{totalReviewCount} {t('common:reviews')}
												</p>
											</div>

											<div className="hidden md:block">
												{messageVendorButton}
											</div>

											<div className="ml-4 flex space-x-4 md:hidden">
												<div className="relative h-[32px] w-[48px]">
													<Image
														src="/twmp-verified.png"
														alt=""
														fill={true}
													/>
												</div>

												<div className="flex space-x-4">
													{metadataTileList[2]}
													{metadataTileList[5]}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* TMP */}

							{/* For small screen only */}
							<div className="col-span-12 mt-2 space-y-2 md:hidden">
								<MetadataTile
									imageUrl={metadataList[0].imageUrl}
									title={t('common:country_of_origin')}
								/>
								{metadataTileList[1]}
							</div>

							{/* Verified image container */}
							<div className="hidden justify-self-end md:col-span-4 md:hidden lg:col-span-3">
								<div className="relative h-[64px] w-[88px]">
									<Image src="/twmp-verified.png" alt="" fill={true} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/*Metadata and Reviews count and rating. For medium screen only */}
			<div className="bg-errors col-span-12 pb-4 md:col-span-8 md:-mt-20 md:block md:px-2 lg:col-span-3 lg:hidden lg:px-2">
				<div className="grid h-full grid-cols-12">
					<div className="col-span-12 hidden md:block lg:hidden">
						{metadataElements}
					</div>

					<div className="col-span-12 md:col-span-4 lg:col-span-12">
						<div className="mt-2 flex h-full items-center md:mt-0 md:flex-col md:justify-end lg:flex lg:space-y-4">
							{/* Verified Image */}
							<div className="relative hidden h-[64px] w-[108px] lg:block">
								<Image src="/twmp-verified.png" alt="" fill={true} />
							</div>

							{/* Rating and reviews */}
							<div className="flex flex-col items-center space-y-2 pl-2 md:hidden md:pl-0">
								<div className="w-[80px] md:hidden lg:block lg:w-[132px]">
									<RatingStars
										starNumber={5}
										className="text-secondary"
									/>
								</div>
								<p className="hidden text-center text-[13px] text-secondary md:block">
									{totalReviewCount} {t('common:reviews')}
								</p>
							</div>

							<div className="ml-4 flex space-x-4 md:hidden">
								<div className="relative h-[32px] w-[48px]">
									<Image src="/twmp-verified.png" alt="" fill={true} />
								</div>

								<div className="flex items-center space-x-4">
									{metadataTileList[2]}
									{metadataTileList[5]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductTile;
