// Third party packages
import {
	getCategoriesByMainCategoryId,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';
import { useEffect, useState } from 'react';
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

	const { data } = useSWR('/services/api/v1/main_category');

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

	// Set mainCategories
	useEffect(() => {
		if (data?.data) {
			setMainCategoryList(data.data);
		}
	}, [data?.data]);

	// Fetching categories based on selectedMainCategoryId
	useEffect(() => {
		if (selectedMainCategoryId) {
			getCategoriesByMainCategoryId(selectedMainCategoryId).then(
				(data) => setCategoryList(data)
			);
		}
	}, [selectedMainCategoryId]);

	// Fetching sub-categories based on selectedCategoryId
	useEffect(() => {
		if (selectedCategoryId) {
			getSubCategoriesByCategoryId(selectedCategoryId).then((data) =>
				setSubCategoryList(data)
			);
		}
	}, [selectedCategoryId]);

	// Fetching specific-categories based on selectedSubCategoryId
	useEffect(() => {
		if (selectedSubCategoryId) {
			getSpecificCategoriesBySubCategoryId(selectedSubCategoryId).then(
				(data) => setSpecificCategoryList(data)
			);
		}
	}, [selectedSubCategoryId]);

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
			{/* Main categories */}
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
						onClick={() => {
							if (isMainCategorySelected) {
								// emptying list
								setCategoryList([]);
								setSubCategoryList([]);
								setSpecificCategoryList([]);

								setSelectedMainCategoryId('');
								setSelectedCategoryId('');
								setSelectedSubCategoryId('');
								setSelectedSpecificCategoryId('');
							} else {
								setSelectedMainCategoryId(mainCategoryId);
							}
						}}
					>
						{/* Categories */}
						{categoryList?.map((category: any) => {
							const { id: categoryId, sub_category = [] } =
								category || {};

							// const isCategorySelected = ids[categoryId];
							const isCategorySelected =
								categoryId === selectedCategoryId;

							return (
								<CategoryCollapse
									key={categoryId}
									id={categoryId}
									isOpen={isCategorySelected}
									title={category?.title?.en}
									onClick={() => {
										if (isCategorySelected) {
											// emptying list
											setSubCategoryList([]);
											setSpecificCategoryList([]);

											setSelectedCategoryId('');
											setSelectedSubCategoryId('');
											setSelectedSpecificCategoryId('');
										} else {
											setSelectedCategoryId(categoryId);
										}
									}}
									className="ml-4"
								>
									{/* Sub Categories */}
									{subCategoryList?.map((subCategory: any) => {
										const { id: subCategoryId } = subCategory || {};

										// const isSubCategorySelected =
										// 	ids[categoryId] && ids[categoryId][subCategoryId];

										const isSubCategorySelected =
											subCategoryId === selectedSubCategoryId;

										return (
											<CategoryCollapse
												key={subCategoryId}
												id={subCategoryId}
												isOpen={isSubCategorySelected}
												title={subCategory?.title?.en}
												onClick={() => {
													if (isSubCategorySelected) {
														// emptying list
														setSpecificCategoryList([]);

														setSelectedSubCategoryId('');
														setSelectedSpecificCategoryId('');
													} else {
														setSelectedSubCategoryId(subCategoryId);
													}
												}}
												className="ml-4"
											>
												{/* Specific Categories */}
												{specificCategoryList?.map(
													(specificCategory: any) => {
														const { id: specificCategoryId } =
															specificCategory || {};

														let isSpecificCategorySelected = false;

														// if (
														// 	ids[categoryId] &&
														// 	ids[categoryId][subCategoryId] &&
														// 	ids[categoryId][subCategoryId]?.length > 0
														// ) {
														// 	isSubSubCategorySelected =
														// 		isElementSelected(
														// 			ids[categoryId][subCategoryId],
														// 			subSubCategoryId
														// 		);
														// }

														isSpecificCategorySelected =
															specificCategoryId ===
															selectedSpecificCategoryId;

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
