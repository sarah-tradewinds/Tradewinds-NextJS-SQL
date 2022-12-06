import Button from 'components/website/common/form/button';
import { canCustomerGiveReviewOnThisProduct } from 'lib/product-details.lib';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { Modal } from '../../common/modal/modal';
import ProductReview from './product-review/product-review';
import UserReviewAndRatingTile from './user-review-and-rating-tile';

const ProductReviewsDetailsTab: React.FC<{
	productId: string;
	productName: string;
	reviews: any[];
	onReviewSubmit: (
		rating: number,
		review: string,
		reviewId?: string
	) => any;
	isLoading?: boolean;
}> = ({
	productName,
	reviews = [],
	onReviewSubmit,
	isLoading,
	productId
}) => {
	const [showReview, setShowReview] = useState(false);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [reviewId, setReviewId] = useState('');
	const [
		canCustomerWriteReviewForThisProduct,
		setCanCustomerWriteReviewForThisProduct
	] = useState(false);

	const { t } = useTranslation();

	const { isAuth, customerData, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			customerData: state.customerData,
			setIsLoginOpen: state.setIsLoginOpen
		})
	);

	useEffect(() => {
		if (isLoading) {
			setShowReview(false);
		}
	}, [isLoading]);

	useEffect(() => {
		if (!showReview) {
			setReviewId('');
			return;
		}

		const reviewData = reviews.find(
			(review: any) => review.user_id === customerData.id
		);

		if (reviewData) {
			setRating(reviewData.rating);
			setReview(reviewData.comments);
			setReviewId(reviewData.id);
		}
	}, [showReview]);

	useEffect(() => {
		canCustomerGiveReviewOnThisProduct(customerData.id, productId).then(
			(data: any) => {
				setCanCustomerWriteReviewForThisProduct(
					data.canCustomerWiteReviewForThisProduct
				);
			}
		);
	}, [customerData.id]);

	const onReviewSubmitHandler = () => {
		onReviewSubmit(rating, review, reviewId);
	};

	const writeReview = canCustomerWriteReviewForThisProduct && (
		<div className="md:px-8">
			<h3 className="mb-4 border-b-2 border-gray/40 pb-1 text-[18px] font-semibold text-gray/40 md:text-[21px]">
				Review this Product
			</h3>
			<Button
				className="border border-gray/40 !text-[15px] text-gray/40"
				onClick={() => {
					if (isAuth) {
						setShowReview(true);
					} else {
						setIsLoginOpen();
					}
				}}
			>
				Write a customer review
			</Button>
		</div>
	);

	return (
		<>
			{/* Review Input  */}
			<Modal
				open={showReview}
				className="h-50 left-8 top-1/2 -translate-y-1/2 transform lg:left-1/2 lg:-top-20 lg:-translate-x-1/2 lg:-translate-y-0"
				onClose={() => setShowReview(false)}
			>
				<ProductReview
					productName={productName}
					rating={rating}
					review={review}
					isLoading={isLoading}
					onRatingChange={setRating}
					onReviewChange={setReview}
					onSubmit={onReviewSubmitHandler}
					onCancel={(): any => setShowReview(false)}
				/>
			</Modal>

			<div className="space-y-4 bg-white p-8">
				{/* Customer reviews and rating count */}
				<div className="flex items-center space-x-4 border-b-2 border-t-2 border-gray/40 pb-2 md:border-t-0">
					<h2 className="hidden text-[21px] font-semibold text-gray/40 md:block">
						{t('common:customer_reviews')}
					</h2>
					<h2 className="text-[22px] font-semibold text-gray/40 md:hidden">
						{t('common:reviews')}
					</h2>
					<div className="relative hidden h-[24px] w-[108px] md:block">
						<Image src="/rating.png" alt="" fill={true} />
					</div>
					<p className=" hidden text-[13px] text-secondary md:block">
						146 {t('common:reviews')}
					</p>
				</div>

				<div className="grid grid-cols-12">
					{/* Reviews stats, Write reviews */}
					<div className="col-span-12 space-y-6 md:col-span-6 lg:col-span-5 2xl:col-span-3">
						{/* <div className="flex items-center space-x-4">
							<div className="relative h-[24px] w-[108px]">
								<Image src="/rating.png" alt="" fill={true} />
							</div>
							<p className="text-[13px] text-gray">5 out of 5</p>
            </div>
             */}

						{/* Rating bars */}
						<div className="hidden space-y-6 px-8 md:block">
							{[50, 30, 14, 5, 1].map((ratingStat) => (
								<div
									key={ratingStat}
									className="flex items-center space-x-2"
								>
									<p className="w-10 text-xs text-secondary">1000</p>
									<RatingBar childStyle={{ width: `${ratingStat}%` }} />
								</div>
							))}
						</div>

						{/* Write your reviews */}
						{reviews.length > 0 && writeReview}
					</div>

					{/* Rating and reviews list */}
					<div className="col-span-12 mt-8 space-y-8 md:col-span-6 md:mt-0 lg:col-span-7 2xl:col-span-9">
						{/* Write Reviews if reviews list not available */}
						{reviews.length === 0 && (
							<div className="flex h-full items-center justify-center ">
								{writeReview}
							</div>
						)}

						{reviews.map((review) => (
							<UserReviewAndRatingTile
								key={review.id}
								customerName={review.name}
								rating={review.rating}
								review={review.comments}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}; // End of ProductReviewsDetailsTab component

export default ProductReviewsDetailsTab;

const RatingBar: React.FC<{
	childClassName?: string;
	childStyle?: React.CSSProperties;
}> = ({ childClassName, childStyle }) => {
	return (
		<div className="relative h-[22px] w-[165px] overflow-hidden rounded-md border border-[#FC5267]">
			<div
				className={`h-full rounded-r-md bg-[#FC5267] ${childClassName}`}
				style={childStyle}
			></div>
		</div>
	);
};