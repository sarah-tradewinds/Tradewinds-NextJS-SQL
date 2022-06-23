// Third party packages
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

// data
import { useCategoryStore } from 'store/category-store';
import useSWR from 'swr';

const CategoriesFilter: React.FC = (props) => {
	const {
		categories,
		ids,
		// selectedMainCategoryId,
		// setSelectedMainCategoryId,
		// setSelectedCategoryId,
		// setSelectedSubCategoryId,
		setSelectedSubSubCategoryId
	} = useCategoryStore();

	const {
		// data: { data: mainCategoryList }
		data
	} = useSWR('/services/api/v1/main_category');

	const [selectedMainCategoryId, setSelectedMainCategoryId] =
		useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [selectedSubCategoryId, setSelectedSubCategoryId] =
		useState('');
	const [selectedSpecificCategoryId, setSelectedSpecificCategoryId] =
		useState('');

	const [mainCategoryList, setMainCategoryList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [subCategoryList, setSubCategoryList] = useState([]);
	const [specificCategoryList, setSpecificCategoryList] = useState([]);

	const isElementSelected = (
		list: string[],
		selectedElement: string
	) => {
		const elementIndex = list.findIndex(
			(element) => element === selectedElement
		);
		if (elementIndex >= 0) {
			return true;
		}
		return false;
	}; // End of isElementSelected function

	return (
		<div className="mt-4 space-y-2">
			{mainCategoryList.map((mainCategory: any) => {
				const { id: mainCategoryId, category = [] } =
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
						{category?.map((categoryData: any) => {
							const { id: categoryId, sub_category = [] } =
								categoryData || {};

							const isCategorySelected = ids[categoryId];

							return (
								<CategoryCollapse
									key={categoryId}
									id={categoryId}
									isOpen={isCategorySelected}
									title={categoryData?.title?.en}
									onClick={() => setSelectedCategoryId(categoryId)}
									className="ml-4"
								>
									{/* Sub Categories */}
									{sub_category?.map((subCategory: any) => {
										const { id: subCategoryId, sub_sub_category = [] } =
											subCategory || {};

										const isSubCategorySelected =
											ids[categoryId] && ids[categoryId][subCategoryId];

										return (
											<CategoryCollapse
												key={subCategoryId}
												id={subCategoryId}
												isOpen={isSubCategorySelected}
												title={subCategory?.title?.en}
												onClick={() =>
													setSelectedSubCategoryId(
														categoryId
														// subCategoryId
													)
												}
												className="ml-4"
											>
												{/* Sub Sub Categories */}
												{sub_sub_category?.map(
													(subSubCategory: any) => {
														const { id: subSubCategoryId } =
															subSubCategory || {};

														let isSubSubCategorySelected = false;

														if (
															ids[categoryId] &&
															ids[categoryId][subCategoryId] &&
															ids[categoryId][subCategoryId]?.length > 0
														) {
															isSubSubCategorySelected =
																isElementSelected(
																	ids[categoryId][subCategoryId],
																	subSubCategoryId
																);
														}

														return (
															<button
																key={subSubCategoryId}
																className={`ml-4 text-left ${
																	isSubSubCategorySelected
																		? 'font-semibold'
																		: ''
																}`}
																onClick={() =>
																	setSelectedSubSubCategoryId(
																		categoryId,
																		subCategoryId,
																		subSubCategoryId
																	)
																}
															>
																{subSubCategory?.title?.en}
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
