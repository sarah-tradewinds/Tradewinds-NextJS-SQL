import { useRouter } from 'next/router';

// Third party packages
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

// lib
import {
	getCategoriesByMainCategoryId,
	getMainCategories,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';

// utils
import {
	getIdAndName,
	useCategoryStoreCopy
} from 'store/category-store-copy';
import { getLocaleText } from 'utils/get_locale_text';

const CategoriesFilterCopy: React.FC = (props) => {
	const { push, locale, query } = useRouter();

	const { main_category } = query;
	const [main_category_id] = getIdAndName(
		(main_category || '') as string
	);

	const {
		setSelectedMainCategoryId,
		setSelectedCategoryId,
		setSelectedSubCategoryId,
		setSelectedSpecificCategoryId
	} = useCategoryStoreCopy();

	// Fetching all main-categories
	const { data: mainCategories } = useSWR(
		`main_category?is_eco${false}`,
		() => getMainCategories(false)
	);

	// Fetching categories based on main_category_id
	const { data: categories } = useSWR(
		`/category/categories/${main_category_id}`,
		() => getCategoriesByMainCategoryId(main_category_id as string)
	);

	return (
		<div className="mt-4 space-y-2">
			{/* Main categories */}
			{mainCategories?.length <= 0 && <Skeleton count={24} />}

			{mainCategories?.map((mainCategory: any) => {
				const { id: mainCategoryId } = mainCategory || {};

				const mainCategoryTitle = getLocaleText(
					mainCategory?.title || {},
					locale
				);

				const isMainCategorySelected =
					main_category_id === mainCategoryId;

				return (
					<CategoryCollapse
						key={mainCategoryId}
						id={mainCategoryId}
						isOpen={isMainCategorySelected}
						title={mainCategoryTitle}
						onClick={() => {
							const params = setSelectedMainCategoryId(
								mainCategoryId,
								mainCategoryTitle
							);
							push(`/product-search-copy?${params}`);
						}}
					>
						{/* Categories */}
						{categories?.map((category: any) => {
							const { id: categoryId } = category || {};

							return (
								<CategoryList
									key={categoryId}
									id={categoryId}
									title={getLocaleText(category?.title || {}, locale)}
								/>
							);
						})}
					</CategoryCollapse>
				);
			})}
		</div>
	);
};

// CategoryList
const CategoryList: React.FC<{
	id: string;
	title: string;
	onClick?: () => any;
	className?: string;
}> = (props) => {
	const { id, title } = props;
	const { push, locale, query } = useRouter();

	const { setSelectedCategoryId } = useCategoryStoreCopy();

	const { category } = query;

	const [category_id] = getIdAndName((category || '') as string);

	const categoryIds = (category_id as string)?.split(',') || [];
	const isCategorySelected = categoryIds.includes(id);

	// Fetching sub-categories based on category_id
	const { data: subCategories } = useSWR(
		`/sub_category/sub_categories/${id}`,
		isCategorySelected
			? () => getSubCategoriesByCategoryId(id as string)
			: null
	);

	return (
		<CategoryCollapse
			key={id}
			id={id}
			isOpen={isCategorySelected}
			title={title}
			onClick={() => {
				const params = setSelectedCategoryId(id, title);
				push(`/product-search-copy?${params}`);
			}}
			className="ml-4"
		>
			{/* Sub Categories */}
			{subCategories?.map((subCategory: any) => {
				const { id: subCategoryId } = subCategory || {};

				const subCategoryTitle = getLocaleText(
					subCategory?.title || {},
					locale
				);

				return (
					<SubCategoryList
						key={subCategoryId}
						categoryId={id}
						categoryTitle={title}
						id={subCategoryId}
						title={subCategoryTitle}
					/>
				);
			})}
		</CategoryCollapse>
	);
};

const SubCategoryList: React.FC<{
	categoryId: string;
	categoryTitle: string;
	id: string;
	title: string;
	onClick?: () => any;
	className?: string;
}> = (props) => {
	const {
		id: subCategoryId,
		title: subCategoryTitle,
		categoryId,
		categoryTitle
	} = props;
	const { push, locale, query } = useRouter();

	const { setSelectedSubCategoryId, setSelectedSpecificCategoryId } =
		useCategoryStoreCopy();

	const { sub_category, sub_sub_category_id } = query;
	const [sub_category_id] = getIdAndName(
		(sub_category || '') as string
	);

	const subCategoryIds = (sub_category_id as string)?.split(',') || [];
	const isSubCategorySelected = subCategoryIds.includes(subCategoryId);

	// Fetching specific-categories based on sub_category_id
	const { data: specificCategories } = useSWR(
		`/specific_category/sub_sub_categories/${subCategoryId}`,
		isSubCategorySelected
			? () =>
					getSpecificCategoriesBySubCategoryId(subCategoryId as string)
			: null
	);

	return (
		<CategoryCollapse
			key={subCategoryId}
			id={subCategoryId}
			isOpen={isSubCategorySelected}
			title={subCategoryTitle}
			onClick={() => {
				const params = setSelectedSubCategoryId(
					categoryId,
					categoryTitle,
					subCategoryId,
					subCategoryTitle
				);
				push(`/product-search-copy?${params}`);
			}}
			className="ml-4"
		>
			{/* Specific Categories */}
			{specificCategories?.map((specificCategory: any) => {
				const { id: specificCategoryId } = specificCategory || {};

				const specificCategoryIds =
					(sub_sub_category_id as string)?.split(',') || [];
				const isSpecificCategorySelected =
					specificCategoryIds.includes(specificCategoryId);

				const specificCategoryTitle = getLocaleText(
					specificCategory?.title || {},
					locale
				);

				return (
					<button
						key={specificCategoryId}
						className={`ml-4 text-left ${
							isSpecificCategorySelected ? 'font-semibold' : ''
						}`}
						onClick={() => {
							const params = setSelectedSpecificCategoryId(
								categoryId,
								categoryTitle,
								subCategoryId,
								subCategoryTitle,
								specificCategoryId,
								specificCategoryTitle
							);
							push(`/product-search-copy?${params}`);
						}}
					>
						{specificCategoryTitle}
					</button>
				);
			})}
		</CategoryCollapse>
	);
};

const CategoryCollapse: React.FC<{
	id: string;
	title: string;
	isOpen: boolean;
	onClick?: () => any;
	className?: string;
}> = ({ id, title, isOpen, onClick, children, className }) => {
	return (
		<div className={className}>
			<input id={id} type="checkbox" className="hidden" />
			<label
				htmlFor={id}
				onClick={onClick}
				className={`flex cursor-pointer items-center space-x-2 text-left text-[18px] ${
					isOpen ? 'font-semibold' : ''
				}`}
			>
				<span>{isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
				<span>{title}</span>
			</label>
			{isOpen && <div>{children}</div>}
		</div>
	);
};

export default CategoriesFilterCopy;
