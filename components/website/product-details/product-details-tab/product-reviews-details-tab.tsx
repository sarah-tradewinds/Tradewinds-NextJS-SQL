import Button from 'components/website/common/form/button';
import Image from 'next/image';
import UserReviewAndRatingTile from './user-review-and-rating-tile';

const ProductReviewsDetailsTab: React.FC = () => {
	return (
		<div className="space-y-4 bg-white p-8">
			{/* Customer reviews and rating count */}
			<div className="flex items-center space-x-4 border-b-2 border-gray/40 pb-2">
				<h2 className="text-[21px] font-semibold text-gray/40">
					Customer Reviews
				</h2>
				<div className="relative h-[24px] w-[108px]">
					<Image src="/rating.png" alt="" layout="fill" />
				</div>
				<p className="text-[13px] text-secondary">146 Reviews</p>
			</div>

			<div className="grid grid-cols-12">
				<div className="space-y-6 md:col-span-6 lg:col-span-5 2xl:col-span-3">
					<div className="flex items-center space-x-4">
						<div className="relative h-[24px] w-[108px]">
							<Image src="/rating.png" alt="" layout="fill" />
						</div>
						<p className="text-[13px] text-gray">5 out of 5</p>
					</div>
					{/* Rating bars */}
					<div className="space-y-6 px-8">
						<RatingBar childClassName="w-[80%]" />
						<RatingBar childClassName="w-[90%]" />
						<RatingBar childClassName="w-[60%]" />
						<RatingBar childClassName="w-[20%]" />
						<RatingBar childClassName="w-[40%]" />
					</div>

					{/* Write your reviews */}
					<div className="px-8">
						<h3 className="mb-4 border-b-2 border-gray/40 pb-1 text-[21px] font-semibold text-gray/40">
							Review this Product
						</h3>
						<Button className="border border-gray/40 !text-[15px] text-gray/40">
							Write a customer review
						</Button>
					</div>
				</div>

				{/* Rating and reviews details */}
				<div className="space-y-8 md:col-span-6 lg:col-span-7 2xl:col-span-9">
					<UserReviewAndRatingTile />
					<UserReviewAndRatingTile />
					<UserReviewAndRatingTile />
				</div>
			</div>
		</div>
	);
}; // End of ProductReviewsDetailsTab component

export default ProductReviewsDetailsTab;

const RatingBar: React.FC<{ childClassName: string }> = ({
	childClassName
}) => {
	return (
		<div className="h-[22px] w-[165px] overflow-hidden rounded-md border border-[#FC5267]">
			<div
				className={`h-full rounded-r-md bg-[#FC5267] ${childClassName}`}
			></div>
		</div>
	);
};
