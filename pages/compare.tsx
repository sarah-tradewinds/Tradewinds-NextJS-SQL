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
import Collapse from 'components/website/common/collapse';
import Button from 'components/website/common/form/button';
import Seo from 'components/website/common/seo';
import CompareProductTile from 'components/website/compare/compare-product.tile';
import Specs from 'components/website/compare/specs/specs';
import { specs1, specs2 } from 'data/specs';

// store
import { useProductCompareStore } from 'store/product-compare-store';

// utils
import { getLocaleText } from 'utils/get_locale_text';

const ComparePage: NextPage = (props) => {
	const [isSpecCollapseOpen, setIsSpecCollapseOpen] = useState(true);

	const router = useRouter();
	const { compareProducts, removeProductFromCompareList } =
		useProductCompareStore();

	const [ref] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: 1,
			spacing: 8
		},
		breakpoints: {
			'(min-width: 768px)': {
				slides: { perView: 3, spacing: 8 }
			}
		}
	});

	return (
		<>
			<Seo title="Compare page" description="" />

			<div className="rounded bg-white p-4">
				<div>
					<div>
						<Button
							onClick={router.back}
							className="text-[12px] font-semibold !text-primary-main"
						>
							{`<`} Back to Products
						</Button>
						<h1 className="text-[30px] font-bold text-primary-main">
							Compare Products
						</h1>
						<Button className="text-primary-main">
							<MdOutlineBookmarkBorder />
							<p className="text-[18px] font-bold">
								Save comparison set
							</p>
						</Button>
					</div>

					<div className="lg:hidden">
						<div ref={ref} className="keen-slider">
							{compareProducts.map((compareProduct) => {
								const { id } = compareProduct;
								return (
									<div key={id} className="keen-slider__slide">
										<CompareProductTile
											key={compareProduct.id}
											id={id}
											name={getLocaleText(
												compareProduct.product_name || {},
												router.locale
											)}
											description={getLocaleText(
												compareProduct.product_description || {},
												router.locale
											)}
											minimumOrderQuantity={0}
											imageUrl={
												compareProduct?.images
													? compareProduct?.images[0].url
													: ''
											}
											minPrice={10}
											maxPrice={50}
											// onRemoveCompareProduct={() => {
											// 	if (onRemoveCompareProduct) {
											// 		onRemoveCompareProduct(product.id);
											// 	}
											// }}

											onProductRemove={() =>
												removeProductFromCompareList(id)
											}
										/>
									</div>
								);
							})}
						</div>
					</div>

					<div className="hidden grid-cols-3 gap-4 divide-x-2 divide-gray/20 lg:grid lg:grid-cols-4">
						{compareProducts.map((compareProduct) => {
							const { id } = compareProduct;
							return (
								<CompareProductTile
									key={compareProduct.id}
									id={id}
									name={getLocaleText(
										compareProduct.product_name || {},
										router.locale
									)}
									description={getLocaleText(
										compareProduct.product_description || {},
										router.locale
									)}
									minimumOrderQuantity={0}
									imageUrl={
										compareProduct?.images
											? compareProduct?.images[0].url
											: ''
									}
									minPrice={10}
									maxPrice={50}
									// onRemoveCompareProduct={() => {
									// 	if (onRemoveCompareProduct) {
									// 		onRemoveCompareProduct(product.id);
									// 	}
									// }}

									onProductRemove={() =>
										removeProductFromCompareList(id)
									}
								/>
							);
						})}
					</div>

					{/* Spec */}
					<div className="mx-4 mt-16">
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
							<div className="space-y-2">
								<Specs title="Key Specs" specsList={specs1} />
								<Specs title="Specs section 2" specsList={specs2} />
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
