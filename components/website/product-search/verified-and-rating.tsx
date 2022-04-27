import Image from 'next/image';

interface VerifiedAndRatingProps {
	isVerified?: boolean;
	rating: number;
	totalReviewCount: number;
	hideButton?: boolean;
}

const VerifiedAndRating: React.FC<VerifiedAndRatingProps> = (props) => {
	const { isVerified, rating, totalReviewCount, hideButton } = props;

	return (
		<div>
			<div className="mt-6 flex flex-col items-center justify-center space-y-4">
				<div className="relative h-[88px] w-[132px]">
					<Image src="/twmp-verified.png" alt="" layout="fill" />
				</div>
				<div>
					<div className="relative h-[32px] w-[132px]">
						<Image src="/rating.png" alt="" layout="fill" />
					</div>
					<p className="text-center text-[13px] text-secondary">
						{totalReviewCount} Reviews
					</p>
				</div>
			</div>

			{hideButton && (
				<button className="rounded-md border border-accent-primary-main p-2 font-semibold text-accent-primary-main">
					Message Vendor
				</button>
			)}
		</div>
	);
};

export default VerifiedAndRating;
