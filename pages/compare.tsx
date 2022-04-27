import { NextPage } from 'next';
import { useRouter } from 'next/router';

// components
import Button from 'components/website/common/form/button';
import CompareProductTile from 'components/website/compare/compare-product.tile';
import { MdOutlineBookmarkBorder } from 'react-icons/md';

const ComparePage: NextPage = (props) => {
	const router = useRouter();

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

				<div className="grid grid-cols-4 gap-8 ">
					<CompareProductTile />
					<CompareProductTile />
					<CompareProductTile />
					<CompareProductTile />
				</div>
			</div>
		</div>
	);
};

export default ComparePage;
