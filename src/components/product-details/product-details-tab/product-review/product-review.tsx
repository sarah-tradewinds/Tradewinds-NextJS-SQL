// Third party packages
import ReactStars from 'react-stars';

// components
import Button from 'components/common/form/button';

interface ReviewProps {
	productName: string;
	rating: number;
	review: string;
	onRatingChange: (rating: number) => any;
	onReviewChange: (review: string) => any;
	onSubmit: () => any;
	onCancel: () => any;
	isLoading?: boolean;
}

const ProductReview: React.FC<ReviewProps> = (props) => {
	const {
		productName,
		rating,
		review,
		onRatingChange,
		onReviewChange,
		onSubmit,
		onCancel,
		isLoading
	} = props;

	return (
		<div className="mt-16 rounded-md bg-white p-8 shadow-md lg:w-[740px] lg:p-16">
			<div className="flex flex-col items-center  border-gray/40">
				<div className="text-center">
					<h2 className="mb-8 border-b border-gray/40 pb-4 text-center text-3xl font-semibold text-black lg:w-[600px] ">
						Product Review
					</h2>
					<h4 className="text-2xl">{productName}</h4>
					{/* <h4 className="text-2xl">Test buyer</h4> */}
				</div>

				<div className="py-5">
					<ReactStars
						value={rating}
						count={5}
						onChange={onRatingChange}
						size={80}
						color2="#F6AB33"
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
							onChange={({ target }) => onReviewChange(target.value)}
						></textarea>

						<div className="flex flex-row">
							<Button
								variant="product"
								className="mr-1 w-full"
								onClick={onSubmit}
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
	);
}; // End of ProductReview component

export default ProductReview;
