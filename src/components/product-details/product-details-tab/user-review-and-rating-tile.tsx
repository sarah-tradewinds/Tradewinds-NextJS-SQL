import { MdPerson } from 'react-icons/md';
import RatingStars from './product-review/rating-stars';

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
					<RatingStars
						starNumber={5}
						rating={rating}
						className="!h-[17.12px] !w-[17.74px]"
						selectedClassName="text-secondary"
					/>
					<p className="text-[13px] text-gray">{rating} out of 5</p>
				</div>
			</div>
			{/* User Review */}
			<p className="text-[13px] text-gray md:text-[18px]">{review}</p>
		</div>
	);
}; // End of UserReviewAndRatingTile component

export default UserReviewAndRatingTile;
