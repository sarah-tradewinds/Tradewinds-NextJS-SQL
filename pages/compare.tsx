import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

// Third party packages
import { useKeenSlider } from 'keen-slider/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import {
	MdOutlineBookmarkBorder,
	MdOutlineKeyboardArrowDown
} from 'react-icons/md';

// components
import Collapse from 'components/common/collapse';
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import CompareProductTile from 'components/compare/compare-product.tile';

// store
import { useProductCompareStore } from 'store/product-compare-store';

// utils
import ProductDetailsTab from 'components/product-details/product-details-tab/product-details-tab';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';

const ComparePage: NextPage = (props) => {
	const [isSpecCollapseOpen, setIsSpecCollapseOpen] = useState(true);

	const router = useRouter();
	const { locale } = router;
	const { compareProducts, removeProductFromCompareList } =
		useProductCompareStore();

	const [ref] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: 1,
			spacing: 8
		},
		breakpoints: {
			'(min-width: 768px)': {
				slides: { perView: 2, spacing: 8 }
			}
		}
	});

	const compareProductsLength = compareProducts.length;
	let colSpan = 'col-span-12';
	if (compareProductsLength === 2) {
		colSpan = 'col-span-6';
	} else if (compareProductsLength === 3) {
		colSpan = 'col-span-4';
	} else if (compareProductsLength === 4) {
		colSpan = 'col-span-3';
	}

	console.log('compareProducts-compareProducts =', { compareProducts });

	const compareProductTiles = (isSlider?: boolean) => {
		return compareProducts.map((compareProduct: any, index) => {
			const { id, product_seo, edges } = compareProduct;

			const { defaultVariant, totalVariantCount } =
				getDefaultProductAndProductVariants(
					edges?.product_variants || []
				);

			const {
				retail_price = 0,
				sales_price = 0,
				is_on_sale,
				is_bulk_pricing,
				bulk_pricing = [],
				inventory = {}
			} = defaultVariant || {};

			const displayPrice = getDisplayBulkPrice({
				product_price: is_on_sale ? sales_price : retail_price,
				is_bulk_pricing,
				bulk_pricing
			});

			const sellerCountry =
				compareProduct?.edges?.sellers?.edges?.country?.edges
					?.region_country?.[0] || {};

			return (
				<div
					key={compareProduct.id}
					className={isSlider ? 'keen-slider__slide' : ''}
				>
					<CompareProductTile
						key={compareProduct.id}
						id={id}
						name={getLocaleText(
							compareProduct.product_name || {},
							locale
						)}
						description={getLocaleText(
							compareProduct.product_description || {},
							locale
						)}
						productPrice={retail_price}
						salePrice={sales_price}
						isSaleOn={is_on_sale || false}
						isBulkPricing={is_bulk_pricing}
						displayPrice={displayPrice}
						minimumOrderQuantity={
							inventory?.minimum_order_quantity || 0
						}
						images={defaultVariant?.images || []}
						isCustomizable={compareProduct.is_customizable}
						country={{
							name: getLocaleText(sellerCountry?.name || '', locale),
							imageUrl: sellerCountry?.image || '/coming-soon.png'
						}}
						totalVariantCount={totalVariantCount}
						totalReviewCount={compareProduct.total_review_count || 0}
						totalRateCount={compareProduct.total_rate_count || 0}
						onProductRemove={() => removeProductFromCompareList(id)}
						className={
							compareProducts?.length - 1 === index
								? ''
								: 'border-r-2 border-gray/20'
						}
					/>

					<div className="mt-8">
						<p className="ml-8 text-[24px] font-semibold text-primary-main">
							<span
								className={index === 0 ? 'opacity-100' : 'opacity-0'}
							>
								All Specs
							</span>
						</p>
						<ProductDetailsTab
							product={compareProduct || {}}
							productDetailItems={
								compareProduct?.product_detail_items || []
							}
							certifications={compareProduct?.certification || []}
							shipping={{}}
							seoTitle={getLocaleText(product_seo?.title || {}, locale)}
							seoDescription={getLocaleText(
								product_seo?.description || {},
								locale
							)}
							productDetailsContainerClassName="h-[280px] overflow-y-auto"
							certificationContainerClassName="h-[280px] overflow-y-auto"
							dimensionContainerClassName="h-[280px] overflow-y-auto"
						/>
					</div>
				</div>
			);
		});
	}; // End of compareProductTiles

	return (
		<>
			<Seo title="Compare page" description="" />

			<div className="rounded bg-white p-4">
				<div>
					{/* Back, And Compare Buttons */}
					<div>
						<Button
							onClick={router.back}
							className="!px-0 text-[12px] font-semibold !text-primary-main"
						>
							{`<`} Back to Products
						</Button>
						<h1 className="font-bold !text-primary-main sm:text-[30px]">
							Compare Products
						</h1>
						<Button className="flex items-center !px-0">
							<MdOutlineBookmarkBorder
								size={32}
								className="text-accent-primary-main"
							/>
							<p className="text-[18px] font-semibold text-primary-main">
								Save comparison set
							</p>
						</Button>
					</div>

					{/* For mobile */}
					<div className="lg:hidden">
						<div ref={ref} className="keen-slider">
							{compareProductTiles(true)}
						</div>
					</div>

					{/* For desktop */}
					<div
						className={`hidden gap-4  lg:grid grid-cols-${compareProducts.length}`}
					>
						{compareProductTiles()}
					</div>

					{/* Spec */}
					<div className="mx-4 mt-16 hidden">
						<Collapse
							initialValue={true}
							leading={
								<Button
									onClick={() =>
										setIsSpecCollapseOpen((prevState) => !prevState)
									}
									className="mb-4 flex items-center !px-0 !text-[30px] !font-bold !text-primary-main"
								>
									<MdOutlineKeyboardArrowDown className="-ml-4 text-[64px]" />
									<span>All Specs</span>
								</Button>
							}
						>
							<div className="grid grid-cols-12">
								{compareProducts.map((compareProduct) => (
									<div key={compareProduct.id} className={colSpan}>
										<ProductDetailsTab
											product={compareProduct || {}}
											productDetailItems={
												compareProduct?.product_detail_item || []
											}
											certifications={
												compareProduct?.certification || []
											}
											shipping={compareProduct?.product_dimension || {}}
											seoTitle={getLocaleText(
												compareProduct?.seo?.title || {},
												locale
											)}
											seoDescription={getLocaleText(
												compareProduct?.seo?.description || {},
												locale
											)}
											productDetailsContainerClassName="h-[280px] overflow-y-auto"
											certificationContainerClassName="h-[280px] overflow-y-auto"
											dimensionContainerClassName="h-[280px] overflow-y-auto"
										/>
									</div>
								))}
							</div>
						</Collapse>
					</div>
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default ComparePage;
