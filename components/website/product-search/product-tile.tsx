import Image from 'next/image';
import Link from 'next/link';

// components
import MetadataList from './metadata/metadata-list';
import MetadataTile from './metadata/metadata-tile';

// data
import { metadataList } from 'data/product-search/metadata-list';

interface ProductTileProps {
	name: string;
	slug: string;
	keywords: string[];
	description: string;
	imageUrl: string;
	alt?: string;
	minPrice: number;
	maxPrice: number;
	minOrderQuantity: number;
	totalReviewCount?: number;
}

const ProductTile: React.FC<ProductTileProps> = (props) => {
	const {
		name,
		slug,
		keywords,
		description,
		imageUrl,
		alt,
		minPrice,
		maxPrice,
		minOrderQuantity,
		totalReviewCount
	} = props;

	return (
		<div className="grid w-full grid-cols-12 overflow-hidden bg-white md:rounded-xl md:shadow-md lg:p-4">
			<div className="col-span-12 space-y-4 lg:col-span-9">
				<div className="grid grid-cols-12 gap-4 md:gap-0">
					{/* Product Image Container */}
					<div className="col-span-5 md:col-span-3">
						<Link href={`/product/${slug}`}>
							<a>
								<div className="relative h-full w-full">
									<Image
										src={imageUrl}
										alt={alt}
										layout="fill"
										className="object-contain"
									/>
								</div>
							</a>
						</Link>
					</div>

					{/* Content */}
					<div className="col-span-7 space-y-4 md:col-span-9 md:p-4">
						{/* Product Info and keywords*/}
						<div className="hidden space-y-4 md:block">
							<Link href={`/product/${slug}`}>
								<a>
									<h2 className="md:text-[16px] lg:text-[15px]">
										<span className="font-semibold">{name}: </span>
										<span className="text-gray">{description}</span>
									</h2>
								</a>
							</Link>
							<div className="flex justify-between font-semibold text-primary-main md:text-[12px] lg:text-[16px]">
								{keywords.map((keyword) => (
									<span key={keyword}>{keyword}</span>
								))}
							</div>
						</div>

						{/* Product price and verified image */}
						<div className="grid grid-cols-12">
							{/* Price and quantity */}
							<div className="col-span-12 border-b-gray/40 text-[12px] font-semibold text-primary-main md:col-span-8 md:border-b md:py-2 md:text-[18px] lg:col-span-12 lg:text-[21px]">
								<h3>
									${minPrice} - ${maxPrice} /piece
								</h3>
								<h4>{minOrderQuantity} Pieces /Min. Order</h4>
							</div>

							<div className="col-span-12 mt-2 space-y-2 md:hidden">
								<MetadataTile
									imageUrl={metadataList[0].imageUrl}
									title={metadataList[0].title}
								/>
								<MetadataTile
									imageUrl={metadataList[1].imageUrl}
									title={metadataList[1].title}
								/>
							</div>

							{/* Verified image container */}
							<div className="hidden justify-self-end md:col-span-4 md:block lg:col-span-3 lg:hidden">
								<div className="relative h-[55px] w-[85px]">
									<Image
										src="/twmp-verified.png"
										alt=""
										layout="fill"
									/>
								</div>
							</div>
						</div>

						{/* Metadata */}
						<MetadataList
							metadataList={metadataList}
							className="hidden lg:grid"
						/>
					</div>
				</div>
			</div>

			{/*Metadata and Reviews count and rating. For desktop */}
			<div className="col-span-12 px-2 pb-4 md:px-6 lg:col-span-3 ">
				<div className="grid h-full grid-cols-12">
					<div className="col-span-10 hidden md:block lg:hidden">
						<MetadataList metadataList={metadataList} />
					</div>

					<div className="col-span-12 md:col-span-2 lg:col-span-12">
						<div className="mt-2 flex h-full items-center md:mt-0 md:flex-col md:justify-end lg:flex lg:space-y-4">
							{/* Verified Image */}
							<div className="relative hidden h-[55px] w-[85px] lg:block">
								<Image src="/twmp-verified.png" alt="" layout="fill" />
							</div>
							{/* Rating and reviews */}
							<div className="flex flex-col items-center space-y-2 lg:pb-4">
								<div className="relative h-[13px] w-[80px] lg:h-[32px] lg:w-[132px]">
									<Image src="/rating.png" alt="" layout="fill" />
								</div>
								<p className="hidden text-center text-[13px] text-secondary md:block">
									{totalReviewCount} Reviews
								</p>
							</div>

							<div className="ml-4 flex space-x-4 md:hidden">
								<div className="relative h-[24px] w-[40px]">
									<Image
										src="/twmp-verified.png"
										alt=""
										layout="fill"
									/>
								</div>

								<div className="flex space-x-4">
									<MetadataTile
										imageUrl={metadataList[2].imageUrl}
										title={metadataList[2].title}
									/>
									<MetadataTile
										imageUrl={metadataList[5].imageUrl}
										title={metadataList[5].title}
									/>
								</div>
							</div>

							{/* Display on medium and desktop - Message Vendor button image */}
							<div className="relative hidden h-[15px] w-[90px] md:block lg:h-[22px] lg:w-[138px]">
								<Image
									src="/message-vendor-lg.png"
									alt=""
									layout="fill"
									className="lg:hidden"
								/>
								<Image
									src="/message-vendor.png"
									alt=""
									layout="fill"
									className="hidden lg:block"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductTile;
