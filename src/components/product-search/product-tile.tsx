import Image from 'next/image';
import Link from 'next/link';

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
	totalRateCount?: number;
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
		isReadyToShip,
		isCustomizable,
		variantCount,
		onCartClick,
		onMessageVendorClick
	} = props;

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
			className="flex h-[20px] items-center space-x-1 rounded border-[0.594234px] border-primary-main outline-none lg:h-[22.98px] lg:w-[138.32px] lg:border-[1.23px]"
		>
			<div className="flex h-full w-[17.28px] justify-center bg-accent-primary-main lg:w-[26.4px]">
				<div className="relative h-[20px] w-[12.08px] lg:w-[18px]">
					<Image
						src="/message-vendor-icon.png"
						alt="message vendor icon"
						fill={true}
					/>
				</div>
			</div>

			<p className="text-[10px] text-accent-primary-main lg:w-full lg:text-xs">
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
			imageContainerClassName="!w-[14px] !h-[10px] lg:!w-[23px] lg:!h-[14px]"
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
				imageContainerClassName="lg:!w-[22px] lg:!h-[12.57px]"
			/>
		),
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[20px] md:text-[24] lg:text-[28px]">
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
			titleClassName="lg:text-cyan"
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
						className={`text-[20px] md:text-[24] lg:pl-[2px] lg:text-[24px] ${
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
				titleClassName="lg:text-cyan"
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
		<div className="relative bg-white md:h-[230px] md:w-full md:rounded-md lg:h-[312px]">
			<div className="flex md:ml-4 md:pt-3 md:pr-[14px] lg:space-x-2">
				{/* Image container */}
				<div className="relative md:h-[97px] md:min-w-[137px] lg:h-[189px] lg:min-w-[286px]">
					<Link href={`/product/${slug}`}>
						<div className="relative h-full w-full">
							<ImageWithErrorHandler
								key={imageUrl}
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

				{/* Name, descriptions and keywords */}
				<div className="w-full">
					<Link href={`/product/${slug}`}>
						<h2 className="min-h-[59px] line-clamp-3 md:text-[16px] md:leading-5 lg:text-[15px] lg:leading-[18px]">
							<span className="font-semibold">{name}: </span>
							<span className="text-gray">{description}</span>
						</h2>
					</Link>

					{/* Keywords, Price and quantity */}
					<div className="border-[#DEDFE0] md:w-[266.68px] md:border-b-[0.966234px] md:pb-2 lg:w-[552px] lg:border-b-2 lg:pb-4">
						{/* keywords */}
						<div className="md:mt-1 md:h-8 md:pb-5">
							{keywords.length > 0 && (
								<KeywordSlider keywords={keywords || []} />
							)}
						</div>

						<h3 className="flex items-center space-x-2 font-semibold md:space-x-8 md:text-[18px] md:leading-[22px] md:text-primary-main lg:text-[21px] lg:leading-[26px]">
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
								<>{displayPrice} /piece</>
							)}
						</h3>

						{minOrderQuantity > 0 && (
							<h4 className="font-normal md:text-[18px] md:font-semibold md:leading-[22px] md:text-primary-main lg:text-[21px] lg:leading-[26px]">
								{minOrderQuantity} {t('common:piece')} /
								{t('common:min_order')}
							</h4>
						)}
					</div>

					{/* Metadata - For desktop only */}
					<div className="hidden items-center justify-between lg:mt-[18px] lg:flex lg:w-[552px]">
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

			{/* Metadata - For tablet only */}
			<div className="flex items-center space-x-4 md:mt-[17px] md:w-[440px] md:pl-4 lg:hidden">
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

			<div className="absolute right-0 bottom-3 flex w-[126px] flex-col items-center space-y-2 lg:right-12 lg:bottom-6 lg:w-[138.32px]">
				{/* Verified Image */}
				<div className="relative h-[54.87px] w-[83.09px] lg:h-[82px] lg:w-[124px]">
					<Image src="/twmp-verified.png" alt="" fill={true} />
				</div>

				{/* Rating and reviews */}
				<div className="flex flex-col items-center space-y-1 lg:pt-[18px]">
					<div className="h-[13px] w-[81.71px] lg:h-[23.7px] lg:w-[149px]">
						<RatingStars
							starNumber={5}
							rating={totalRateCount}
							className="!h-[13px] !w-[13px] text-gray lg:!h-[23.7px] lg:!w-[23.7px]"
							containerClassName="space-x-1 lg:space-x-2"
							selectedClassName="text-secondary"
						/>
					</div>

					<p className="text-center text-xs leading-[15px] text-secondary lg:text-[13px] lg:leading-4">
						{totalReviewCount} {t('common:reviews')}
					</p>
				</div>

				<div className="lg:pt-6">{messageVendorButton}</div>
			</div>
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
						{/* Product name, description and keywords container */}
						<div className="space-y-4">
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
												<div className="w-[80px] md:hidden md:h-auto lg:block lg:w-[132px]">
													<RatingStars
														starNumber={5}
														className="text-secondary"
													/>
												</div>
												<p className="text-center text-[13px] text-secondary">
													{totalReviewCount} {t('common:reviews')}
												</p>
											</div>

											<div>{messageVendorButton}</div>
										</div>
									</div>
								</div>
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

			{/* For medium screen only - Metadata and Reviews count and rating.  */}
			<div className="md:pb- col-span-12 pb-2 md:col-span-8 md:-mt-20 md:block md:px-2 md:pb-4 lg:col-span-3 lg:hidden lg:px-2">
				<div className="grid h-full grid-cols-12">
					<div className="col-span-12 hidden md:block lg:hidden">
						{metadataElements}
					</div>

					<div className="col-span-12 md:col-span-4 lg:col-span-12">
						<div className="mt-2 flex h-full md:mt-0 md:flex-col md:items-center md:justify-end lg:flex lg:space-y-4">
							{/* Verified Image */}
							<div className="relative hidden h-[64px] w-[108px] lg:block">
								<Image src="/twmp-verified.png" alt="" fill={true} />
							</div>

							{/* Rating and reviews */}
							{/* <div className="flex h-[10.02px] w-[63px] flex-col pl-2 md:hidden md:items-center md:space-y-2 md:pl-0">
								<div className=" md:hidden md:w-[80px] lg:block lg:w-[132px]">
									<RatingStars
										starNumber={5}
										className="text-secondary"
									/>
								</div>
								<p className="hidden text-center text-[13px] text-secondary md:block">
									{totalReviewCount} {t('common:reviews')}
								</p>
							</div> */}

							<div className="flex w-[63px] items-center pl-[14px]">
								<div className="w-full">
									<RatingStars
										starNumber={5}
										className="!h-[10.02px] text-secondary"
									/>
								</div>
							</div>

							<div className="ml-4 flex space-x-4 md:hidden">
								{/* <div className="relative h-[32px] w-[48px]"> */}
								<div className="relative h-[23px] w-[36px]">
									<Image src="/twmp-verified.png" alt="" fill={true} />
								</div>

								<div className="flex items-start space-x-4 md:items-center">
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
