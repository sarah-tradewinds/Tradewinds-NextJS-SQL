// Third party packages
import { AiOutlinePlus } from 'react-icons/ai';

// data
import { useState } from 'react';
import { useCategoryStore } from 'store/category-store';

const CategoriesFilter: React.FC<{
	onCategoryChange: (ids: { mainCategoryId: string }) => any;
}> = (props) => {
	const { onCategoryChange } = props;

	const {
		categories,
		selectedMainCategoryId,
		selectedCategoryIds,
		selectedSubCategoryIds,
		setSelectedMainCategoryId,
		setSelectedCategoryId,
		setSelectedSubCategoryId
	} = useCategoryStore();

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

	// const [selectedMainCategoryId, setSelectedMainCategoryId] =
	// 	useState('');
	// const [selectedCategoryId, setSelectedCategoryIds] = useState('');
	// const [selectedSubCategoryId, setSelectedSubCategoryIds] =
	// 	useState('');
	useState('');
	// const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] =
	// 	useState('');

	// useEffect(
	// 	() => {
	// 		onCategoryChange({
	// 			mainCategoryId: selectedMainCategoryId
	// 			// selectedCategoryId,
	// 			// selectedSubCategoryId,
	// 			// selectedSubSubCategoryId
	// 		});
	// 	},
	// 	[
	// 		// selectedMainCategoryId,
	// 		// selectedCategoryId,
	// 		// selectedSubCategoryId,
	// 		// selectedSubSubCategoryId
	// 	]
	// );

	const setMainCategoryId = (mainCategoryId: string) => {
		setSelectedMainCategoryId(mainCategoryId);
		setSelectedCategoryId('');
		setSelectedSubCategoryId('');
		setSelectedSubSubCategoryId('');
	}; // End of setMainCategoryId function

	return (
		<div className="mt-4 space-y-2">
			{categories.map((mainCategory: any) => {
				const { id: mainCategoryId, category = [] } =
					mainCategory || {};

				// const isMainCategorySelected =
				// 	selectedMainCategoryId === mainCategoryId;

				const isMainCategorySelected =
					selectedMainCategoryId === mainCategoryId;

				return (
					<CategoryCollapse
						key={mainCategoryId}
						id={mainCategoryId}
						isOpen={isMainCategorySelected}
						title={mainCategory?.title?.en}
						// onClick={() =>
						// 	setMainCategoryId(
						// 		isMainCategorySelected ? '' : mainCategoryId
						// 	)
						// }
						onClick={() => setSelectedMainCategoryId(mainCategoryId)}
					>
						{/* Categories */}
						{category?.map((categoryData: any) => {
							const { id: categoryId, sub_category = [] } =
								categoryData || {};
							// const isCategorySelected =
							//   selectedCategoryId === categoryId;
							const isCategorySelected = isElementSelected(
								selectedCategoryIds,
								categoryId
							);

							return (
								<CategoryCollapse
									key={categoryId}
									id={categoryId}
									isOpen={isCategorySelected}
									title={categoryData?.title?.en}
									onClick={() =>
										setSelectedCategoryId(
											isCategorySelected ? '' : categoryId
										)
									}
									className="ml-4"
								>
									{/* Sub Categories */}
									{sub_category?.map((subCategory: any) => {
										const { id: subCategoryId, sub_sub_category = [] } =
											subCategory || {};
										// const isSubCategorySelected =
										// 	selectedSubCategoryId === subCategoryId;

										const isSubCategorySelected = false;

										return (
											<CategoryCollapse
												key={subCategoryId}
												id={subCategoryId}
												isOpen={isSubCategorySelected}
												title={subCategory?.title?.en}
												onClick={() =>
													setSelectedSubCategoryId(
														isSubCategorySelected ? '' : subCategoryId
													)
												}
												className="ml-4"
											>
												{/* Sub Sub Categories */}
												{sub_sub_category?.map(
													(subSubCategory: any) => {
														const { id: subSubCategoryId } =
															subSubCategory || {};
														return (
															<button
																key={subSubCategoryId}
																// className={`ml-4 ${
																// 	selectedSubSubCategoryId ===
																// 	subSubCategory
																// 		? 'font-semibold'
																// 		: ''
																// }`}
																className={`ml-4`}
																title={subSubCategory?.title?.en}
																// onClick={() =>
																// 	setSelectedSubSubCategoryId(
																// 		selectedSubSubCategoryId
																// 			? ''
																// 			: subSubCategoryId
																// 	)
																// }
															></button>
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
