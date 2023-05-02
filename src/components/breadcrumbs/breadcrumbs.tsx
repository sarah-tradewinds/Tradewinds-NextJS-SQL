import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFilterValueFromQuery } from 'utils/common.util';
const Breadcrumbs = (props: any) => {
	const router = useRouter();
	const { pathname, query } = router;
	const { keyword } = router.query;
	console.log('query', query);
	const value = getFilterValueFromQuery(query);

	const mainId = value.main_category_id;
	const mainName = value.main_category;

	return (
		<nav aria-label="breadcrumbs">
			<div className=" hidden space-x-[5px] md:hidden lg:flex">
				<div className=" font-semibold">
					<Link href="/" shallow={true}>
						Categories
					</Link>
				</div>
				{query.main_category !== undefined && (
					<div>
						<span className=" mr-[5px]">{'>'}</span>
						<Link
							href={`/product-search?main_category=${query.main_category}`}
							shallow={true}
						>
							{value.main_category}
						</Link>
					</div>
				)}

				{query.category !== undefined && (
					<div>
						<span className=" mr-[5px]">{'>'}</span>
						<Link
							href={`/product-search?main_category=${query.main_category}&category=${query.category}&filters=${query.filters}`}
							shallow={true}
						>
							{value.category}
						</Link>
					</div>
				)}

				{query.sub_category !== undefined && (
					<div>
						<span className=" mr-[5px]">{'>'}</span>

						<Link
							href={`/product-search?main_category=${query.main_category}&category=${query.category}&sub_category=${query.sub_category}&filters=${query.filters}`}
							shallow={true}
						>
							{value.sub_category}
						</Link>
					</div>
				)}
				{query.sub_sub_category !== undefined && (
					<div>
						<span className=" mr-[5px]">{'>'}</span>
						<Link
							href={`/product-search?main_category=${query.main_category}&category=${query.category}&sub_category=${query.sub_category}&sub_sub_category=${query.sub_sub_category}&filters=${query.filters}`}
							shallow={true}
						>
							{value.sub_sub_category}
						</Link>
					</div>
				)}

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
