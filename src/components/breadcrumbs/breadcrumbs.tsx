import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFilterValueFromQuery } from 'utils/common.util';

const Breadcrumbs = (props: any) => {
	const { productName } = props;

	const router = useRouter();
	const { query } = router;
	const value = getFilterValueFromQuery(query);

	let { main_category, category, sub_category, sub_sub_category } =
		value;
	category = category?.split(',')?.[0] || '';
	sub_category = sub_category?.split(',')?.[0] || '';
	sub_sub_category = sub_sub_category?.split(',')?.[0] || '';

	return (
		<>
			{main_category && (
				<div
					className=" flex space-x-[5px] text-[13px] font-normal leading-4 text-primary-main"
					aria-label="breadcrumbs"
				>
					<div className=" font-semibold">
						<Link href="/" shallow={true}>
							Categories
						</Link>
					</div>

					{main_category && (
						<div>
							<span className=" mr-[5px]">{'>'}</span>
							<Link
								href={`/product-search?main_category=${query.main_category}`}
								shallow={true}
							>
								{main_category}
							</Link>
						</div>
					)}

					{category && (
						<div>
							<span className=" mr-[5px]">{'>'}</span>
							<Link
								href={`/product-search?main_category=${query.main_category}&category=${query.category}&filters=${query.filters}`}
								shallow={true}
							>
								{category}
							</Link>
						</div>
					)}

					{sub_category && (
						<div>
							<span className=" mr-[5px]">{'>'}</span>

							<Link
								href={`/product-search?main_category=${query.main_category}&category=${query.category}&sub_category=${query.sub_category}&filters=${query.filters}`}
								shallow={true}
							>
								{sub_category}
							</Link>
						</div>
					)}

					{sub_sub_category && (
						<div>
							<span className=" mr-[5px]">{'>'}</span>
							<Link
								href={`/product-search?main_category=${query.main_category}&category=${query.category}&sub_category=${query.sub_category}&sub_sub_category=${query.sub_sub_category}&filters=${query.filters}`}
								shallow={true}
							>
								{sub_sub_category}
							</Link>
						</div>
					)}

					<div>
						{/* <span className=" mr-[5px]">
						{props.productname !== undefined && '>'}
					</span> */}
						{productName}
					</div>
				</div>
			)}
		</>
	);
};
export default Breadcrumbs;
