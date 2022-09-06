// Third party packages
import { Tab } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';
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

	const { locale } = useRouter();
	const { t } = useTranslation();

	const { product_detail_item, certification, shipping } =
		(product as any) || {};

	console.log(product);

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
							`bg-white px-4 py-2 outline-none ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						{t('common:product_details')}
					</Tab>
					<Tab
						className={({ selected }) =>
							`bg-white px-4 py-2 outline-none ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						{t('common:reviews')}/{t('common:videos')}
					</Tab>
					<Tab
						className={({ selected }) =>
							`bg-white px-4 py-2 outline-none ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						{t('common:company_profile')}
					</Tab>
				</Tab.List>

				{/* Tab body */}
				<Tab.Panels>
					<Tab.Panel className="outline-none">
						<ProductDetailsTab
							productDetailItems={product_detail_item || []}
							certifications={certification || []}
							shipping={shipping}
						/>
					</Tab.Panel>
					<Tab.Panel className="outline-none">
						<ReviewsDetailsTab
							reviews={reviews}
							onReviewSubmit={onReviewSubmit}
							isLoading={isReviewLoading}
							productName={getLocaleText(
								product.product_name || {},
								locale
							)}
							productId={product.id}
						/>
					</Tab.Panel>
					<Tab.Panel className="outline-none">
						<CompanyProfileTab seller={seller} />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default ProductDetailsTabContainer;
