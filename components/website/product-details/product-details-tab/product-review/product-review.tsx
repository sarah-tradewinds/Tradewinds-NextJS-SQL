import Button from 'components/website/common/form/button';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';

interface ReviewProps {
	onSubmit: (rating: number, review: string) => any;
	onCancel: () => any;
	isLoading?: boolean;
}

const ProductReview: React.FC<ReviewProps> = (props) => {
	const { onSubmit, onCancel, isLoading } = props;

	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');

	const handleRating = (rate: number) => {
		setRating(rate);
	};

	const submitReviewAndRating = () => {
		if (!review || !rating) {
			return;
		}
		onSubmit(rating, review);
	}; // End of submitReviewAndRating function

	return (
		<div className=" flex items-center justify-center ">
			<div className="mt-16 flex w-screen flex-col justify-center rounded-md bg-white p-8 shadow-md lg:w-[800px] lg:p-16">
				<div className="flex flex-col items-center border-gray/40 pr-24 ">
					<h2 className="mb-8 flex flex-col border-b border-gray/40 pb-4 text-center text-3xl font-semibold text-black lg:w-[600px] ">
						Product Review
					</h2>
					<h4 className="text-2xl">Big Yellow Badass Tractor</h4>
					<h4 className="text-2xl">Test buyer</h4>

					<div className="py-5">
						<StarRatings
							rating={rating}
							starRatedColor="#00AEEF"
							changeRating={handleRating}
							numberOfStars={5}
							name="rating"
						/>
					</div>

					<div className="flex w-full flex-col border-b border-gray/40 pb-8">
						<form className="w-full space-y-4">
							<span className="w-24 flex-auto ">Comments</span>

							<textarea
								name="review"
								value={review}
								rows={4}
								className="w-full space-y-4 border border-gray/40 p-2"
								onChange={({ target }) => setReview(target.value)}
							></textarea>

							<div className="flex flex-row">
								<Button
									variant="product"
									className="mr-1 w-full"
									onClick={submitReviewAndRating}
									disabled={isLoading}
								>
									Submit response
								</Button>
								<Button
									variant="special"
									className="ml-1 w-full"
									onClick={onCancel}
									disabled={isLoading}
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}; // End of ProductReview component

export default ProductReview;
