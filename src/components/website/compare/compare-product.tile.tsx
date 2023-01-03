// components
import Button from 'components/website/common/form/button';
import MetadataList from 'components/website/product-search/metadata/metadata-list';

// data
import { metadataList } from 'data/product-search/metadata-list';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Input from '../common/form/input';
import RatingStars from '../product-details/product-details-tab/product-review/rating-stars';

interface CompareProductTileProps {
	id: string;
	images: { url?: string }[];
	alt?: string;
	name: string;
	description: string;
	isSaleOn?: boolean;
	salePrice: number;
	productPrice: number;
	displayPrice?: string;
	isBulkPricing?: boolean;
	minimumOrderQuantity: number;
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
		minimumOrderQuantity,
		className,
		onProductRemove
	} = props;

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

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
						<div key={image.url} className="keen-slider__slide">
							<div className="relative h-[202px] w-[240px]">
								<ImageWithErrorHandler
									src={image.url || ''}
									alt={alt}
									fill={true}
								/>
							</div>
						</div>
					))}
					{(!images || images?.length === 0) && (
						<div className="relative h-[202px] w-[240px]">
							<ImageWithErrorHandler src={''} alt={alt} fill={true} />
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
								Sale {salePrice}/piece
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
				{/* <VerifiedAndRating rating={4} totalReviewCount={105} /> */}
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
						rating={5}
						className="w-[14px]"
						selectedClassName="text-secondary"
						containerClassName="space-x-1 w-[120px]"
					/>
					<p className="text-center text-[12px] text-secondary">
						146 Reviews
					</p>
				</div>
				<MetadataList
					metadataList={[
						metadataList[0],
						metadataList[1],
						metadataList[3],
						metadataList[4]
					]}
					className="!grid-cols-1"
				/>
			</div>

			{/* Action Button */}
			<div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:items-start lg:space-y-0">
				<Button
					variant="buyer"
					className="w-[124px] !px-2 !text-[12px] !font-medium lg:w-auto"
				>
					Message Seller
				</Button>
				<Button
					variant="special"
					className="w-[124px] !px-2 !text-[12px] !font-medium lg:w-auto"
				>
					Submit RFQ
				</Button>
				{/* Save checkbox */}
			</div>

			<div className="flex justify-center lg:justify-start">
				<div className="flex w-[124px] items-center space-x-2">
					<Input id="save" type="checkbox" className="h-6 w-6" />
					<label
						htmlFor="save"
						className="mb-1 text-[13px] text-accent-primary-main"
					>
						Save
					</label>
				</div>
			</div>
		</div>
	);
};

export default CompareProductTile;