import Image from 'next/image';

// components
import Button from 'components/website/common/form/button';
import MetadataList from 'components/website/product-search/metadata/metadata-list';
import VerifiedAndRating from '../product-search/verified-and-rating';

// data
import { metadataList } from 'data/product-search/metadata-list';
import Input from '../common/form/input';

interface CompareProductTileProps {
	id: string;
	imageUrl: string;
	alt?: string;
	name: string;
	description: string;
	minPrice: number;
	maxPrice: number;
	minimumOrderQuantity: number;
	className?: string;
	onProductRemove?: () => any;
}

const CompareProductTile: React.FC<CompareProductTileProps> = (
	props
) => {
	const {
		imageUrl,
		alt,
		name,
		description,
		maxPrice,
		minPrice,
		minimumOrderQuantity,
		className,
		onProductRemove
	} = props;

	return (
		<div className={`relative space-y-4 p-4 lg:space-y-8 ${className}`}>
			<Button
				onClick={onProductRemove}
				className="absolute -right-4 top-0 !text-[24px] text-gray/40"
			>
				x
			</Button>
			<div className="relative h-[202px] w-[240px]">
				<Image src={imageUrl} alt={alt} layout="fill" />
			</div>

			{/* Content */}
			<p className="text-[15px]">
				<span className="font-semibold">{name}:</span>
				<span>{description}</span>
			</p>
			<div className="text-[18px] font-semibold text-primary-main lg:text-[21px]">
				<p>
					${minPrice} - ${maxPrice} /piece
				</p>
				<p>{minimumOrderQuantity} Pieces /Min. Order</p>
			</div>

			{/* Rating and metadata container */}
			<div className="flex flex-col items-center space-y-6 lg:flex-row lg:items-start lg:justify-between lg:space-y-0 lg:space-x-4">
				<VerifiedAndRating rating={4} totalReviewCount={105} />
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
