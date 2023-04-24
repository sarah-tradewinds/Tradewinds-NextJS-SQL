import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFilterValueFromQuery } from 'utils/common.util';
const Breadcrumbs = (props: any) => {
	const router = useRouter();
	const { pathname, query } = router;
	const { keyword } = router.query;
	console.log('query', { keyword });
	const value = getFilterValueFromQuery(query);

	const mainId = value.main_category_id;
	const mainName = value.main_category;

	return (
		<nav aria-label="breadcrumbs">
			<div className=" flex space-x-[5px]">
				<div className=" font-semibold">
					<Link href="/" shallow={true}>
						Categories
					</Link>
				</div>
				<div>
					<span className=" mr-[5px]">
						{query.main_category !== undefined && '>'}
					</span>
					<Link
						href={`/product-search?main_category=${query.main_category}`}
						shallow={true}
					>
						{/* &gt; */}
						{value.main_category}
					</Link>
				</div>
				<div>
					<span className=" mr-[5px]">
						{query.category !== undefined && '>'}
					</span>
					<Link
						href={`/product-search?main_category=${query.main_category}&category=${query.category}&filters=${query.filters}`}
						shallow={true}
					>
						{value.category}
					</Link>
				</div>
				<div>
					<span className=" mr-[5px]">
						{props.productname !== undefined && '>'}
					</span>
					{props.productname}
				</div>
			</div>
		</nav>
	);
};
export default Breadcrumbs;
