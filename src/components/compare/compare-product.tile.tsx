// components
import Button from 'components/common/form/button';

// data
import MetadataTile from 'components/product-search/metadata/metadata-tile';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { metadataList } from 'data/product-search/metadata-list';
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import RatingStars from '../product-details/product-details-tab/product-review/rating-stars';

interface CompareProductTileProps {
	id: string;
	images: string[];
	alt?: string;
	name: string;
	description: string;
	isSaleOn?: boolean;
	salePrice: number;
	productPrice: number;
	displayPrice?: string;
	isBulkPricing?: boolean;
	isCustomizable?: boolean;
	minimumOrderQuantity: number;
	totalVariantCount?: number;
	totalReviewCount?: number;
	totalRateCount?: number;
	country?: {
		name: string;
		imageUrl: string;
	};
	className?: string;
	onProductRemove?: () => any;
}

const CompareProductTile: React.FC<CompareProductTileProps> = (
	props
) => {
	const {
		images,
		alt,
		name,
		description,
		isSaleOn,
		salePrice,
		productPrice,
		displayPrice,
		isBulkPricing,
		isCustomizable,
		minimumOrderQuantity,
		totalVariantCount,
		totalReviewCount,
		totalRateCount,
		country,
		className,
		onProductRemove
	} = props;

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const { t } = useTranslation();

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData
		})
	);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		drag: false,
		slides: { perView: 1 }
	});

	return (
		<div className={`relative space-y-2 p-4 lg:space-y-8 ${className}`}>
			<Button
				onClick={onProductRemove}
				className="absolute -right-4 top-0 !text-[24px] text-gray/40"
			>
				x
			</Button>

			{/* Image slider */}
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{images?.map((image) => (
						<div key={image} className="keen-slider__slide">
							<div className="relative h-[202px] w-[240px]">
								<ImageWithErrorHandler
									key={image || ''}
									src={image || ''}
									alt={alt || ''}
									fill={true}
								/>
							</div>
						</div>
					))}
					{(!images || images?.length === 0) && (
						<div className="relative h-[202px] w-[240px]">
							<ImageWithErrorHandler
								src={''}
								alt={alt || ''}
								fill={true}
							/>
						</div>
					)}
				</div>

				{/* Navigation button */}
				{loaded && instanceRef.current && (
					<div className="flex items-center">
						<Button
							className="!text-primary-main"
							onClick={(e: any) => {
								if (images && images?.length > 1) {
									e.stopPropagation() || instanceRef.current?.prev();
								}
							}}
							disabled={images && images?.length <= 1}
						>
							<MdChevronLeft className="h-[32px] w-[32px]" />
						</Button>

						<p className="text-center text-[13px] text-primary-main">
							See more images
						</p>

						<Button
							className="!h-[40px] !w-[40px] !text-primary-main"
							onClick={(e: any) => {
								if (images && images?.length > 1) {
									e?.stopPropagation() || instanceRef?.current?.next();
								}
							}}
							disabled={
								currentSlide ===
									instanceRef?.current?.track?.details?.slides?.length -
										1 ||
								(images && images?.length <= 1)
							}
						>
							<MdChevronRight className="h-[32px] w-[32px]" />
						</Button>
					</div>
				)}
			</div>

			{/* Product name and description */}
			<p className="text-[15px]">
				<span className="font-semibold">{name}: </span>
				<span>{description}</span>
			</p>

			{/* Price */}
			<div className="text-[18px] font-semibold text-primary-main lg:text-[21px]">
				<div>
					{isSaleOn && !isBulkPricing ? (
						<p className="space-x-2">
							<span className="text-accent-error">
								Sale ${salePrice}/piece
							</span>
							<span className="text-gray line-through">
								${productPrice}/piece
							</span>
						</p>
					) : (
						<>{displayPrice} / piece</>
					)}
				</div>
				<p>{minimumOrderQuantity} Pieces /Min. Order</p>
			</div>

			{/* Rating and metadata container */}
			<div className="flex flex-col items-center space-y-6 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 sm:space-x-4">
				<div>
					<ImageWithErrorHandler
						key="twmp-verified"
						src="/twmp-verified.png"
						alt=""
						width={88}
						height={60}
					/>
					<RatingStars
						starNumber={5}
						rating={totalRateCount}
						className="w-[14px]"
						selectedClassName="text-secondary"
						containerClassName="space-x-1 w-[120px]"
					/>
					<p className="text-center text-[12px] text-secondary">
						{totalReviewCount} Reviews
					</p>
				</div>
				<div className="space-y-2">
					<MetadataTile
						key={country?.name}
						imageUrl={country?.imageUrl}
						alt={country?.name}
						title={country?.name}
					/>
					<MetadataTile
						key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
						imageUrl={metadataList[1].imageUrl}
						alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
						title={`${t('common:live_buy')}/${t(
							'common:ready_to_ship'
						)}`}
					/>
					{/* Customizable */}
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
					/>
					{/*variantCount */}
					<MetadataTile
						key={metadataList[4].title}
						imageUrl={metadataList[4].imageUrl}
						alt={metadataList[4].title}
						title={`${t('common:variants')} ${totalVariantCount}`}
					/>
				</div>
			</div>

			{/* Action Button */}
			<div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:items-start lg:space-y-0">
				<Button
					variant="product"
					onClick={() => {
						if (!isAuth) {
							setIsLoginOpen();
							return;
						}
						const url = generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
							action: BUYER_DASHBOARD_ACTIONS.create_rfq,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						});
						window.open(url, '__blank');
					}}
					className="w-[124px] !px-2 !text-[12px] !font-medium lg:w-auto"
				>
					Message Seller
				</Button>
				<Button
					onClick={() => {
						if (!isAuth) {
							setIsLoginOpen();
							return;
						}
						const url = generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
							action: BUYER_DASHBOARD_ACTIONS.create_rfq,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						});
						window.open(url, '__blank');
					}}
					variant="special"
					className="w-[124px] !px-2 !text-[12px] !font-medium lg:w-auto"
				>
					Submit RFQ
				</Button>
			</div>

			{/* Save checkbox */}
			{/* <div className="flex justify-center lg:justify-start">
				<div className="flex w-[124px] items-center space-x-2">
					<Input id="save" type="checkbox" className="h-6 w-6" />
					<label
						htmlFor="save"
						className="mb-1 text-[13px] text-accent-primary-main"
					>
						Save
					</label>
				</div>
			</div> */}
		</div>
	);
};

export default CompareProductTile;
