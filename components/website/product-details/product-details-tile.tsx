import Image from 'next/image';

// components
import Button from 'components/website/common/form/button';
import MetadataList from 'components/website/product-search/metadata/metadata-list';
import { metadataList } from 'data/product-search/metadata-list';
import ImageContainer from './product-details-images/image-contaier';

const ProductDetailsTile: React.FC = (props) => {
	const thumbnails = [
		{
			imageUrl: '/vehicles/yellow-tractor.png',
			alt: ''
		},
		{
			imageUrl: '/vehicles/yellow-tractor.png',
			alt: ''
		},
		{
			imageUrl: '/vehicles/yellow-tractor.png',
			alt: ''
		},
		{
			imageUrl: '/vehicles/yellow-tractor.png',
			alt: ''
		},
		{
			imageUrl: '/vehicles/yellow-tractor.png',
			alt: ''
		},
		{
			imageUrl: '/vehicles/yellow-tractor.png',
			alt: ''
		}
	];

	return (
		<div className="grid grid-cols-12 gap-8 bg-white">
			{/* Images container */}
			<ImageContainer
				className="col-span-12 md:first-letter:p-8 xl:col-span-5"
				imageUrl="/vehicles/yellow-tractor.png"
				alt=""
				thumbnails={thumbnails}
			/>

			{/* Product details */}
			<div className="col-span-12 space-y-4 py-8 px-4 md:px-24 lg:p-8 xl:col-span-7">
				{/* Product name and sku info */}
				<div className="flex items-center justify-between">
					<h1 className="text-[18px] font-semibold text-primary-main lg:text-[30px]">
						Big Yellow Badass Tractor
					</h1>
					<p className="hidden text-[25px] font-semibold text-gray/40 md:block">
						SKU#TW1255
					</p>
				</div>
				{/* Price and quantity info */}
				<div className="flex justify-between text-[12px] font-semibold text-primary-main lg:text-[21px]">
					<p>$2.29 - $5.00 /piece</p>
					<p>100 Pieces /Min. Order</p>
				</div>
				{/* Keywords */}
				<div className="flex justify-between text-[12px] font-semibold text-primary-main lg:text-[13px]">
					<span>Keyword 1</span>
					<span>Keyword 2</span>
					<span>Keyword 3</span>
					<span>Keyword 4</span>
				</div>
				{/* Metadata list */}
				<div>
					<MetadataList
						metadataList={metadataList}
						className="!grid-cols-2 md:grid-cols-3"
					/>
				</div>
				{/* Rating, review count and verified Image */}
				<div className="hidden items-center space-x-8 pb-4 md:flex">
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
				{/* Product name and bullet points */}
				<div className="border-t border-b-0 border-gray/40 py-6 md:border-b">
					<h2 className="text-[12px] text-gray md:text-[15px]">
						<span className="font-semibold">Product name:</span> product
						desciption adipiscing elit, sed diam nonummy nibh euismod
						tincidunt ut laoreet dolore magna aliquam erat
					</h2>
					<ul className="ml-8 list-disc text-[12px] text-gray md:text-[15px]">
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
						<li>Bullet point</li>
					</ul>
					<Button className="relative mt-4 hidden h-[22px] w-[139px] md:block">
						<Image src="/submit-rfq-button.png" alt="" layout="fill" />
					</Button>
				</div>

				{/* Additional info */}
				<div className="hidden space-y-4 rounded-md bg-gray/20 p-4 md:block">
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
