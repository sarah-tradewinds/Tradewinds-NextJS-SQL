import Button from 'components/website/common/form/button';
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
					<StarIcons startNum={rating} className="text-secondary" />
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

const StarIcons: React.FC<{ startNum: number; className?: string }> = ({
	startNum,
	className
}) => {
	const starList = [];
	for (let i = 1; i <= startNum; i++) {
		starList.push(
			<svg
				className={`h-8 w-8 ${className}`}
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
			</svg>
		);
	}

	return <div className="flex">{starList}</div>;
}; // End of StarIcons
