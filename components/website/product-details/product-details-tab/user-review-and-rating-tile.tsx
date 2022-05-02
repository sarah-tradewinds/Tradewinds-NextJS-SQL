import Button from 'components/website/common/form/button';
import Image from 'next/image';
import { MdPerson } from 'react-icons/md';

const UserReviewAndRatingTile: React.FC = () => {
	return (
		<div className="space-y-2">
			{/* User pic, name and rating */}
			<div className="space-y-2">
				<div className="flex items-center space-x-2">
					<MdPerson className="rounded-full bg-gray/20 p-1 text-[24px] text-white" />
					<p className="text-[15px]">Fred. S</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="relative h-[24px] w-[108px]">
						<Image src="/rating.png" alt="" layout="fill" />
					</div>
					<p className="text-[13px] text-gray">5 out of 5</p>
				</div>
			</div>
			{/* User Review */}
			<p className="text-[13px] text-gray md:text-[18px]">
				Reviewed in the United States on December 8, 2021 Verified
				Purchase Unfortunately, one of the skewers arrived without a
				hole to mount the handle. Fortunately, my spouse has an
				incredible workshop & was able to drill the holes needed to
				mount the handle. Otherwise, the male & female skewers were
				great quality and I know my friend will love them for her fire
				pit.
			</p>

			<div className="flex justify-center md:hidden">
				<Button className="text-[15px] text-[#33A7DF]">More</Button>
			</div>
		</div>
	);
}; // End of UserReviewAndRatingTile component

export default UserReviewAndRatingTile;
