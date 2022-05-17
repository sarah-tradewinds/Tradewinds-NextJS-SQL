// Third party packages
import { AiOutlinePlus } from 'react-icons/ai';

// data
import { useEffect, useState } from 'react';
import { useCategoryStore } from 'store/category-store';

const CategoriesFilter: React.FC<{
	onCategoryChange: (ids: { mainCategoryId: string }) => any;
}> = (props) => {
	const { onCategoryChange } = props;

	const { categories } = useCategoryStore();

	const [selectedMainCategoryId, setSelectedMainCategoryId] =
		useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [selectedSubCategoryId, setSelectedSubCategoryId] =
		useState('');
	useState('');
	const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] =
		useState('');

	useEffect(() => {
		onCategoryChange({
			mainCategoryId: selectedMainCategoryId
			// selectedCategoryId,
			// selectedSubCategoryId,
			// selectedSubSubCategoryId
		});
	}, [
		selectedMainCategoryId,
		selectedCategoryId,
		selectedSubCategoryId,
		selectedSubSubCategoryId
	]);

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

				const isMainCategorySelected =
					selectedMainCategoryId === mainCategoryId;
				return (
					<CategoryCollapse
						key={mainCategoryId}
						id={mainCategoryId}
						isOpen={isMainCategorySelected}
						title={mainCategory?.title?.en}
						onClick={() =>
							setMainCategoryId(
								isMainCategorySelected ? '' : mainCategoryId
							)
						}
					>
						{/* Categories */}
						{category?.map((categoryData: any) => {
							const { id: categoryId, sub_category = [] } =
								categoryData || {};
							const isCategorySelected =
								selectedCategoryId === categoryId;
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
										const isSubCategorySelected =
											selectedSubCategoryId === subCategoryId;
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
																className={`ml-4 ${
																	selectedSubSubCategoryId ===
																	subSubCategory
																		? 'font-semibold'
																		: ''
																}`}
																title={subSubCategory?.title?.en}
																onClick={() =>
																	setSelectedSubSubCategoryId(
																		selectedSubSubCategoryId
																			? ''
																			: subSubCategoryId
																	)
																}
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
