// Third party packages
import { Tab } from '@headlessui/react';
import CompanyProfileTab from './company-profile-tab';
import ProductDetailsTab from './product-details-tab';
import ReviewsDetailsTab from './product-reviews-details-tab';

const ProductDetailsTabContainer: React.FC<{
	className?: string;
	product: any;
	reviews: any[];
	seller: any;
	onReviewSubmit: (rating: number, review: string) => any;
	isReviewLoading?: boolean;
}> = (props) => {
	const {
		className,
		reviews = [],
		product = {},
		seller = {},
		onReviewSubmit,
		isReviewLoading
	} = props;

	const { id, product_detail_item, shipping } = (product as any) || {};

	const selectedClassName =
		'font-semibold text-primary-main rounded-b-none rounded-t-md';
	const unSelectedClassName =
		'rounded-none rounded-t-md mb-2 text-[21px] font-normal text-gray';

	return (
		<div className={`mx-8 rounded bg-white ${className}`}>
			<Tab.Group>
				<Tab.List className="flex space-x-4 bg-gray/20">
					<Tab
						className={({ selected }) =>
							`bg-white px-4 py-2 ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						Product Details
					</Tab>
					<Tab
						className={({ selected }) =>
							`bg-white px-4 py-2 ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						Reviews / Videos
					</Tab>
					<Tab
						className={({ selected }) =>
							`bg-white px-4 py-2 ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						Company Profile
					</Tab>
				</Tab.List>

				{/* Tab body */}
				<Tab.Panels>
					<Tab.Panel>
						<ProductDetailsTab
							productDetailItem={product_detail_item}
							shipping={shipping}
						/>
					</Tab.Panel>
					<Tab.Panel>
						<ReviewsDetailsTab
							reviews={reviews}
							onReviewSubmit={onReviewSubmit}
							isLoading={isReviewLoading}
							productName={product.product_name}
							productId={product.id}
						/>
					</Tab.Panel>
					<Tab.Panel>
						<CompanyProfileTab seller={seller} />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default ProductDetailsTabContainer;
