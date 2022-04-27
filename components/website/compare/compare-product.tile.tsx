import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import MetadataList from 'components/website/product-search/metadata/metadata-list';
import VerifiedAndRating from 'components/website/product-search/verified-and-rating';
import { metadataList } from 'data/product-search/metadata-list';
import Image from 'next/image';

const CompareProductTile: React.FC = (props) => {
	return (
		<div className="relative w-[400px] space-y-8 border p-4">
			<Button className="absolute -right-4 top-0 !text-[24px]  text-gray/40">
				x
			</Button>
			<div className="relative h-[202px] w-[315px]">
				<Image
					src="/vehicles/red-tractor.png"
					alt="red-tractor"
					layout="fill"
				/>
			</div>

			<p className="text-[15px]">
				<span className="font-semibold">Product name:</span> product
				desciption adipiscing elit, sed diam nonummy nibh euismod
				tincidunt ut laoreet dolore magna aliquam erat{' '}
			</p>
			<div className="text-[21px] font-semibold text-primary-main">
				<p>$2.29 - $5.00 /piece</p>
				<p>100 Pieces /Min. Order</p>
			</div>

			{/* Rating and metadata container */}
			<div className="flex justify-between">
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
			<div className="flex justify-between">
				<Button variant="buyer">Message Seller</Button>
				<Button variant="special">Submit RFQ</Button>
			</div>

			{/* Save checkbox */}
			<div className="flex items-center space-x-2">
				<Input id="save" type="checkbox" className="h-6 w-6" />
				<label
					htmlFor="save"
					className="mb-1 text-[13px] text-accent-primary-main"
				>
					Save
				</label>
			</div>
		</div>
	);
};

export default CompareProductTile;
