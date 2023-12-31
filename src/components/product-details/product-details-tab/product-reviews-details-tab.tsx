import Button from 'components/common/form/button';
import { canCustomerGiveReviewOnThisProduct } from 'lib/product-details.lib';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';

// auth
import { useAuthStore } from 'store/auth';

// components
import { Modal } from '../../common/modal/modal';

const ProductReview = dynamic(
	() => import('./product-review/product-review')
);
const RatingStars = dynamic(
	() => import('./product-review/rating-stars')
);
const UserReviewAndRatingTile = dynamic(
	() => import('./user-review-and-rating-tile')
);

const ProductReviewsDetailsTab: React.FC<{
	productId: string;
	productName: string;
	reviews: any[];
	reviewAnalytics: any;
	onReviewSubmit: (
		rating: number,
		review: string,
		reviewId?: string
	) => any;
	isLoading?: boolean;
}> = ({
	productName,
	reviews = [],
	reviewAnalytics = {},
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

		const reviewData = reviews?.find(
			(review: any) => review.user_id === customerData.userId
		);

		if (reviewData) {
			setRating(reviewData.rating);
			setReview(reviewData.comments);
			setReviewId(reviewData.id);
		}
	}, [showReview]);

	useEffect(() => {
		canCustomerGiveReviewOnThisProduct(productId).then((data: any) => {
			setCanCustomerWriteReviewForThisProduct(
				data.canCustomerWiteReviewForThisProduct
			);
		});
	}, [productId]);

	const onReviewSubmitHandler = () => {
		onReviewSubmit(rating, review, reviewId);
	};

	const writeReview = canCustomerWriteReviewForThisProduct && (
		<div className="md:px-8">
			<h3 className="border-[#C4C4C4] pb-2 text-lg font-semibold leading-[22px] text-gray md:border-b-2 md:text-[21px]">
				{t('review_this_product')}
			</h3>

			<div className="mt-[6px] flex md:justify-center">
				<button
					className="h-[21.47px] w-[247.03px]  rounded-md border border-[#C4C4C4] text-[15px] leading-[15px] text-[#C4C4C4]"
					onClick={() => {
						if (isAuth) {
							setShowReview(true);
						} else {
							setIsLoginOpen();
						}
					}}
				>
					{t('write_a_customer_review')}
				</button>
			</div>
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

			<div className="space-y-4 bg-white p-4 md:p-8">
				{/* Customer reviews and rating count */}
				<div className="flex items-center border-b-2 border-[#C4C4C4] pb-2 md:space-x-4 md:border-t-0">
					<h2 className="hidden font-semibold text-gray/40 md:block lg:text-[15px] xl:text-[21px]">
						{t('common:customer_reviews')}
					</h2>
					<h2 className="text-[15px] font-semibold leading-[18.29px] text-gray md:hidden">
						{t('common:reviews')}
					</h2>
					<div className="relative hidden w-[124px] md:block">
						<RatingStars
							starNumber={5}
							rating={reviewAnalytics?.average_rating}
							selectedClassName="text-secondary"
						/>
					</div>
					<p className="hidden text-[13px] text-secondary md:block">
						{reviewAnalytics.total_review} {t('common:reviews')}
					</p>
				</div>

				<div className="grid grid-cols-12">
					{/* Reviews stats, Write reviews */}
					<div className="col-span-12 space-y-6 md:col-span-6 lg:col-span-5 2xl:col-span-3">
						{/* only for mobile */}
						<div className="md:hidden">
							<div className="flex">
								<RatingStars
									starNumber={5}
									containerClassName="justify-between w-[110.23px]"
									className="!h-[23.14px] !w-[23.7px] text-gray"
									selectedClassName="text-secondary"
								/>
								<p className="ml-[10.77px] text-[13px] leading-4 text-gray">
									{t('5_out_of_5')}
								</p>
							</div>
						</div>

						{/* Rating bars only for medium and desktop */}
						<div className="hidden space-y-6 px-8 md:block">
							<RatingBar
								leading="5 star"
								totalReview={reviewAnalytics?.star_1?.total_count}
								childStyle={{
									width: `${reviewAnalytics?.star_1?.percentage}%`
								}}
							/>
							<RatingBar
								leading="4 star"
								totalReview={reviewAnalytics?.star_2?.total_count}
								childStyle={{
									width: `${reviewAnalytics?.star_2?.percentage}%`
								}}
							/>
							<RatingBar
								leading="3 star"
								totalReview={reviewAnalytics?.star_3?.total_count}
								childStyle={{
									width: `${reviewAnalytics?.star_3?.percentage}%`
								}}
							/>
							<RatingBar
								leading="2 star"
								totalReview={reviewAnalytics?.star_4?.total_count}
								childStyle={{
									width: `${reviewAnalytics?.star_4?.percentage}%`
								}}
							/>
							<RatingBar
								leading="1 star"
								totalReview={reviewAnalytics?.star_5?.total_count}
								childStyle={{
									width: `${reviewAnalytics?.star_5?.percentage}%`
								}}
							/>
						</div>

						{/* Write your reviews */}
						{writeReview}
					</div>

					{/* Rating and reviews list */}
					<div className="col-span-12 mt-8 space-y-8 md:col-span-6 md:mt-0 lg:col-span-7 2xl:col-span-9">
						{/* Write Reviews if reviews list not available */}
						{reviews?.map((review: any) => {
							const { first_name = '', last_name = '' } =
								review?.edges?.user || {};

							const userFullName = `${first_name} ${last_name}`;

							return (
								<UserReviewAndRatingTile
									key={review.id}
									customerName={userFullName}
									rating={review.rating}
									review={review.comment || ''}
								/>
							);
						})}

						{reviews?.length > 3 && (
							<div className="flex justify-center md:hidden">
								<Button className="!text-[15px] !leading-[18px] !text-[#33A7DF]">
									{t('more')}
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}; // End of ProductReviewsDetailsTab component

export default ProductReviewsDetailsTab;

const RatingBar: React.FC<{
	leading?: string;
	totalReview?: number;
	childClassName?: string;
	childStyle?: React.CSSProperties;
}> = ({ leading, totalReview = 0, childClassName, childStyle }) => {
	return (
		<div className="flex items-center space-x-1">
			<p className="w-12 font-medium text-accent-primary-main">
				{leading}
			</p>
			<div className="h-[22px] w-[165px] overflow-hidden rounded-md border-2 border-[#FC5267]">
				<div
					className={`h-full w-0 rounded bg-[#FC5267] ${childClassName}`}
					style={childStyle}
				></div>
			</div>
			<p className="pl-2 font-medium text-accent-primary-main">
				{totalReview}
			</p>
		</div>
	);
};
