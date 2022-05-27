import Button from 'components/website/common/form/button';
import Image from 'next/image';
import { MdPerson } from 'react-icons/md';

interface UserReviewAndRatingTileProps {
	customerName: string;
	rating: number;
	review: string;
}

const UserReviewAndRatingTile: React.FC<
	UserReviewAndRatingTileProps
> = (props) => {
	const { customerName, rating, review } = props;

	return (
		<div className="space-y-2">
			{/* User pic, name and rating */}
			<div className="space-y-2">
				<div className="flex items-center space-x-2">
					<MdPerson className="rounded-full bg-gray/20 p-1 text-[24px] text-white" />
					<p className="text-[15px]">{customerName}</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="relative h-[24px] w-[108px]">
						<Image src="/rating.png" alt="" layout="fill" />
					</div>
					<p className="text-[13px] text-gray">{rating} out of 5</p>
				</div>
			</div>
			{/* User Review */}
			<p className="text-[13px] text-gray md:text-[18px]">{review}</p>

			<div className="flex justify-center md:hidden">
				<Button className="text-[15px] text-[#33A7DF]">More</Button>
			</div>
		</div>
	);
}; // End of UserReviewAndRatingTile component

export default UserReviewAndRatingTile;
