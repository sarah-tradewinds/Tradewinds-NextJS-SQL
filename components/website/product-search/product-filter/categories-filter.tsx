// Third party packages
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

// data
import { useCategoryStore } from 'store/category-store';

const CategoriesFilter: React.FC = (props) => {
	const {
		selectedMainCategoryId,
		selectedCategoryIds,
		selectedSubCategoryIds,
		selectedSpecificCategoryIds,
		allCategories,

		setSelectedMainCategoryId,
		setSelectedCategoryId,
		setSelectedSubCategoryId,
		setSelectedSpecificCategoryId
	} = useCategoryStore();

	// const { data } = useSWR('/services/api/v1/main_category');

	const [mainCategoryList, setMainCategoryList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [subCategoryList, setSubCategoryList] = useState([]);
	const [specificCategoryList, setSpecificCategoryList] = useState([]);

	// // Set mainCategories
	// useEffect(() => {
	// 	if (data?.data) {
	// 		setMainCategoryList(data.data);
	// 	}
	// }, [data?.data]);

	// // Fetching categories based on selectedMainCategoryId
	// useEffect(() => {
	// 	if (selectedMainCategoryId) {
	// 		getCategoriesByMainCategoryId(selectedMainCategoryId).then(
	// 			(data) => setCategoryList(data)
	// 		);
	// 	}
	// }, [selectedMainCategoryId]);

	// // Fetching sub-categories based on selectedCategoryId
	// useEffect(() => {
	// 	const selectedCategoryId = [...selectedCategoryIds]
	// 		.pop()
	// 		?.toString();
	// 	if (selectedCategoryId) {
	// 		getSubCategoriesByCategoryId(selectedCategoryId).then((data) =>
	// 			setSubCategoryList(data)
	// 		);
	// 	}
	// }, [selectedCategoryIds]);

	// Fetching specific-categories based on selectedSubCategoryId
	// useEffect(() => {
	// 	const selectedSubCategoryId = [...selectedSubCategoryIds]
	// 		.pop()
	// 		?.toString();

	// 	if (selectedSubCategoryId) {
	// 		getSpecificCategoriesBySubCategoryId(selectedSubCategoryId).then(
	// 			(data) => setSpecificCategoryList(data)
	// 		);
	// 	}
	// }, [selectedSubCategoryIds]);

	console.log(
		'selectedMainCategoryId =',
		selectedMainCategoryId,
		allCategories
	);
	return (
		<div className="mt-4 space-y-2">
			{/* Main categories */}
			{allCategories.map((mainCategory: any) => {
				const { id: mainCategoryId, categories = [] } =
					mainCategory || {};

				const isMainCategorySelected =
					selectedMainCategoryId === mainCategoryId;

				return (
					<CategoryCollapse
						key={mainCategoryId}
						id={mainCategoryId}
						isOpen={isMainCategorySelected}
						title={mainCategory?.title?.en}
						onClick={() => setSelectedMainCategoryId(mainCategoryId)}
					>
						{/* Categories */}
						{categories?.map((category: any) => {
							const { id: categoryId, subCategories = [] } =
								category || {};

							const isCategorySelected =
								selectedCategoryIds.findIndex(
									(selectedCategoryId) =>
										selectedCategoryId === categoryId
								) >= 0;

							return (
								<CategoryCollapse
									key={categoryId}
									id={categoryId}
									isOpen={isCategorySelected}
									title={category?.title?.en}
									onClick={() => setSelectedCategoryId(categoryId)}
									className="ml-4"
								>
									{/* Sub Categories */}
									{subCategories?.map((subCategory: any) => {
										const {
											id: subCategoryId,
											specificCategories = []
										} = subCategory || {};

										const isSubCategorySelected =
											selectedSubCategoryIds.findIndex(
												(selectedSubCategoryId) =>
													selectedSubCategoryId === subCategoryId
											) >= 0;

										return (
											<CategoryCollapse
												key={subCategoryId}
												id={subCategoryId}
												isOpen={isSubCategorySelected}
												title={subCategory?.title?.en}
												onClick={() =>
													setSelectedSubCategoryId(subCategoryId)
												}
												className="ml-4"
											>
												{/* Specific Categories */}
												{specificCategories?.map(
													(specificCategory: any) => {
														const { id: specificCategoryId } =
															specificCategory || {};

														const isSpecificCategorySelected =
															selectedSpecificCategoryIds.findIndex(
																(selectedSpecificCategoryId) =>
																	selectedSpecificCategoryId ===
																	specificCategoryId
															) >= 0;

														return (
															<button
																key={specificCategoryId}
																className={`ml-4 text-left ${
																	isSpecificCategorySelected
																		? 'font-semibold'
																		: ''
																}`}
																onClick={() =>
																	setSelectedSpecificCategoryId(
																		specificCategoryId
																	)
																}
															>
																{specificCategory?.title?.en}
															</button>
														);
													}
												)}
											</CategoryCollapse>
										);
									})}
								</CategoryCollapse>
							);
						})}
					</CategoryCollapse>
				);
			})}
		</div>
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
				<AiOutlinePlus />
				<span>{title}</span>
			</label>
			{isOpen && <div>{children}</div>}
		</div>
	);
};

export default CategoriesFilter;
