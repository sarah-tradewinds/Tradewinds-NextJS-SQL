import { NextPage } from 'next';
import { useRouter } from 'next/router';

// components
import Collapse from 'components/website/common/collapse';
import Button from 'components/website/common/form/button';
import CompareProductTile from 'components/website/compare/compare-product.tile';
import Specs from 'components/website/compare/specs/specs';
import { specs1, specs2 } from 'data/specs';
import { useState } from 'react';
import {
	MdOutlineBookmarkBorder,
	MdOutlineKeyboardArrowDown
} from 'react-icons/md';
import { useProductStore } from 'store/product-store';

// data

const ComparePage: NextPage = (props) => {
	const router = useRouter();

	const [isSpecCollapseOpen, setIsSpecCollapseOpen] = useState(true);

	const { products, removeProductFromCompareList } = useProductStore();

	const compareProducts = products.filter(
		(product) => product.isInCompareList
	);

	return (
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
						<p className="text-[18px] font-bold">Save comparison set</p>
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-4 divide-x-2 divide-gray/20 lg:grid-cols-4">
					{compareProducts.map((compareProduct) => {
						const { id } = compareProduct;

						return (
							<CompareProductTile
								key={id}
								{...compareProduct}
								onProductRemove={() => removeProductFromCompareList(id)}
							/>
						);
					})}
					{/* <CompareProductTile />
					<CompareProductTile />
					<CompareProductTile className="hidden lg:block" /> */}
				</div>

				{/* Spec */}
				<div className="mx-4 mt-16">
					<Collapse
						isOpen={isSpecCollapseOpen}
						title={
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
	);
};

export default ComparePage;
