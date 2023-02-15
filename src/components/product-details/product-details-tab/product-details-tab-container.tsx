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
	reviewAnalytics: any;
	seller: any;
	onReviewSubmit: (rating: number, review: string) => any;
	isReviewLoading?: boolean;
}> = (props) => {
	const {
		className,
		reviews = [],
		reviewAnalytics,
		product = {},
		seller = {},
		onReviewSubmit,
		isReviewLoading
	} = props;

	const { locale } = useRouter();
	const { t } = useTranslation();

	const { product_detail_items, certification, shipping, product_seo } =
		(product as any) || {};

	const selectedClassName =
		'font-semibold text-primary-main rounded-b-none rounded-t-md md:h-[47px] mt-1';
	const unSelectedClassName =
		'rounded-none rounded-t-md mb-2 text-[21px] font-normal text-[#C4C4C4] md:h-[43px]';

	return (
		<div
			className={`rounded bg-white md:mx-[17px] lg:mx-8 ${className}`}
		>
			<Tab.Group>
				<Tab.List className="hidden space-x-4 bg-bg-main md:flex">
					<Tab
						className={({ selected }) =>
							`bg-white px-4 outline-none md:text-[14px] md:leading-[17px] lg:text-[21px] lg:leading-[26px] ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						{t('common:product_details')}
					</Tab>
					<Tab
						className={({ selected }) =>
							`bg-white px-4 outline-none md:text-[14px] md:leading-[17px] lg:text-[21px] lg:leading-[26px] ${
								selected ? selectedClassName : unSelectedClassName
							}`
						}
					>
						{t('common:reviews')}/{t('common:videos')}
					</Tab>
					<Tab
						className={({ selected }) =>
							`bg-white px-4 outline-none md:text-[14px] md:leading-[17px] lg:text-[21px] lg:leading-[26px] ${
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
							product={product || {}}
							productDetailItems={product_detail_items || []}
							certifications={certification || []}
							shipping={shipping}
							seoTitle={getLocaleText(product_seo?.title || {}, locale)}
							seoDescription={getLocaleText(
								product_seo?.description || {},
								locale
							)}
						/>
					</Tab.Panel>
					<Tab.Panel className="outline-none">
						<ReviewsDetailsTab
							reviews={reviews}
							reviewAnalytics={reviewAnalytics}
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
