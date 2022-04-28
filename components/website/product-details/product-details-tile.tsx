import Image from 'next/image';

// components
import Button from 'components/website/common/form/button';
import MetadataList from 'components/website/product-search/metadata/metadata-list';
import { metadataList } from 'data/product-search/metadata-list';

const ProductDetailsTile: React.FC = (props) => {
	return (
		<div className="grid grid-cols-12 gap-8 bg-white">
			{/* Images container */}
			<div className="col-span-5 p-8">
				{/* Main Image */}
				<div className="relative h-[475px] w-full">
					<Image
						src="/vehicles/yellow-tractor.png"
						alt=""
						layout="fill"
					/>
				</div>
				{/* Thumbnails */}
				<div className="grid grid-cols-3 gap-4">
					<div className="relative h-[136px] w-full">
						<Image
							src="/vehicles/yellow-tractor.png"
							alt=""
							layout="fill"
						/>
					</div>
					<div className="relative h-[136px] w-full">
						<Image
							src="/vehicles/yellow-tractor.png"
							alt=""
							layout="fill"
						/>
					</div>
					<div className="relative h-[136px] w-full">
						<Image
							src="/vehicles/yellow-tractor.png"
							alt=""
							layout="fill"
						/>
					</div>
					<div className="relative h-[136px] w-full">
						<Image
							src="/vehicles/yellow-tractor.png"
							alt=""
							layout="fill"
						/>
					</div>
					<div className="relative h-[136px] w-full">
						<Image
							src="/vehicles/yellow-tractor.png"
							alt=""
							layout="fill"
						/>
					</div>
					<div className="relative h-[136px] w-full">
						<Image
							src="/vehicles/yellow-tractor.png"
							alt=""
							layout="fill"
						/>
					</div>
				</div>
			</div>

			{/* Product details */}
			<div className="col-span-7 space-y-4 p-8">
				{/* Product name and sku info */}
				<div className="flex items-center justify-between">
					<h1 className="text-[30px] font-semibold text-primary-main">
						Big Yellow Badass Tractor
					</h1>
					<p className="text-[25px] font-semibold text-gray/40">
						SKU#TW1255
					</p>
				</div>
				{/* Price and quantity info */}
				<div className="flex justify-between text-[21px] font-semibold text-primary-main">
					<p>$2.29 - $5.00 /piece</p>
					<p>100 Pieces /Min. Order</p>
				</div>
				{/* Keywords */}
				<div className="flex justify-between text-[13px] font-semibold text-primary-main">
					<span>Keyword 1</span>
					<span>Keyword 2</span>
					<span>Keyword 3</span>
					<span>Keyword 4</span>
				</div>
				{/* Metadata list */}
				<div>
					<MetadataList metadataList={metadataList} />
				</div>
				{/* Rating, review count and verified Image */}
				<div className="flex items-center space-x-8 pb-4">
					<div className="relative h-[32px] w-[132px]">
						<Image src="/rating.png" alt="" layout="fill" />
					</div>
					<p className="text-center text-[13px] text-secondary">
						{105} Reviews
					</p>
					<div className="relative h-[30px] w-[162px]">
						<Image
							src="/tradewinds-horizontal-logo.png"
							alt=""
							layout="fill"
						/>
					</div>
				</div>
				<div className="mb- border-y border-gray/40 py-6">
					<h2 className="text-gray">
						<span className="text-[15px] font-semibold">
							Product name:
						</span>{' '}
						product desciption adipiscing elit, sed diam nonummy nibh
						euismod tincidunt ut laoreet dolore magna aliquam erat
					</h2>
					<ul className="ml-8 list-disc text-[15px] text-gray">
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
					</ul>
					<Button className="relative mt-4 h-[22px] w-[139px]">
						<Image src="/submit-rfq-button.png" alt="" layout="fill" />
					</Button>
				</div>

				{/* Additional info */}
				<div className="space-y-4 rounded-md bg-gray/20 p-4">
					<div className="flex items-center space-x-8 text-[21px] text-primary-main">
						<p>
							<span className="font-semibold">0 -100</span> piece =
							$5.00
						</p>
						<p>
							<span className="font-semibold">100- 500 Pieces</span>{' '}
							piece = $3.00
						</p>
					</div>
					{/* Variants */}
					<div className="flex space-x-8 text-[21px] font-semibold text-primary-main">
						<span>Variant 1</span>
						<span>Variant 2</span>
						<span>Variant 3</span>
						<span>Variant 4</span>
					</div>
					<p className="text-[21px] font-semibold text-primary-main">
						Quantity:
					</p>
					<p className="text-[21px] text-primary-main">
						<span className="font-semibold">Customization:</span>{' '}
						<span>Yes</span>
					</p>
				</div>
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ProductDetailsTile;
