import { useRouter } from 'next/router';

// Third party packages
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

// utils
import { ContentSkeleton } from 'components/website/common/elements/skeleton/content.skeleton';
import {
	useCategoriesByMainCategoryId,
	useMainCategories,
	useSpecificCategoriesBySubCategoryId,
	useSubCategoriesByCategoryId
} from 'hooks/useMainCategories';
import { getIdAndName, useCategoryStore } from 'store/category-store';
import { getLocaleText } from 'utils/get_locale_text';

const CategoriesFilter: React.FC = (props) => {
	const { push, locale, query } = useRouter();

	const { main_category } = query;
	const [main_category_id] = getIdAndName(
		(main_category || '') as string
	);

	const setMainCategory = useCategoryStore(
		(state) => state.setMainCategory
	);

	// Fetching all main-categories
	const { mainCategories, isMainCategoriesLoading } =
		useMainCategories();

	// Fetching categories based on main_category_id
	const { categories, isCategoriesLoading } =
		useCategoriesByMainCategoryId(main_category_id);

	return (
		<div className="mt-4 space-y-2">
			{/* Main categories */}
			<ContentSkeleton isLoading={isMainCategoriesLoading} />

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
							const params = setMainCategory(
								mainCategoryId,
								mainCategoryTitle
							);
							push(`/product-search?${params}`);
						}}
					>
						<ContentSkeleton
							isLoading={isCategoriesLoading}
							containerClassName="pl-6"
						/>

						{/* Categories */}
						{categories?.map((category: any) => {
							const { id: categoryId } = category || {};

							return (
								<CategoryList
									key={categoryId}
									id={categoryId}
									title={category?.title}
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
	title: any;
	onClick?: () => any;
	className?: string;
}> = (props) => {
	const { id, title } = props;
	const { push, locale, query } = useRouter();

	const { setCategory } = useCategoryStore();

	const { category } = query;
	const [category_id] = getIdAndName((category || '') as string);

	const categoryIds = (category_id as string)?.split(',') || [];
	const isCategorySelected = categoryIds.includes(id);

	// Fetching sub-categories based on category_id
	const { subCategories, isSubCategoriesLoading } =
		useSubCategoriesByCategoryId(id);

	const categoryName = title?.en;

	return (
		<CategoryCollapse
			key={id}
			id={id}
			isOpen={isCategorySelected}
			title={getLocaleText(title || {}, locale)}
			onClick={() => {
				const params = setCategory(id, categoryName);
				push(`/product-search?${params}`);
			}}
			className="ml-4"
		>
			<ContentSkeleton
				isLoading={isSubCategoriesLoading}
				containerClassName="pl-6"
			/>

			{/* Sub Categories */}
			{subCategories?.map((subCategory: any) => {
				const { id: subCategoryId } = subCategory || {};

				return (
					<SubCategoryList
						key={subCategoryId}
						categoryId={id}
						categoryTitle={categoryName}
						id={subCategoryId}
						title={subCategory?.title}
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
	title: any;
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

	const { setSubCategory, setSpecificCategory } = useCategoryStore();

	const { sub_category, sub_sub_category } = query;
	const [sub_category_id] = getIdAndName(
		(sub_category || '') as string
	);

	const [sub_sub_category_id] = getIdAndName(
		(sub_sub_category || '') as string
	);

	const subCategoryIds = (sub_category_id as string)?.split(',') || [];
	const isSubCategorySelected = subCategoryIds.includes(subCategoryId);

	// Fetching specific-categories based on sub_category_id
	const { specificCategories, isSpecificCategoriesLoading } =
		useSpecificCategoriesBySubCategoryId(subCategoryId);

	const subCategoryName = subCategoryTitle?.en;

	return (
		<CategoryCollapse
			key={subCategoryId}
			id={subCategoryId}
			isOpen={isSubCategorySelected}
			title={getLocaleText(subCategoryTitle || {}, locale)}
			onClick={() => {
				const params = setSubCategory(
					categoryId,
					categoryTitle,
					subCategoryId,
					subCategoryName
				);
				push(`/product-search?${params}`);
			}}
			className="ml-4"
		>
			<ContentSkeleton
				isLoading={isSpecificCategoriesLoading}
				containerClassName="pl-6"
			/>

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
							const params = setSpecificCategory(
								categoryId,
								categoryTitle,
								subCategoryId,
								subCategoryName,
								specificCategoryId,
								specificCategory?.title?.en
							);
							push(`/product-search?${params}`);
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

export default CategoriesFilter;
