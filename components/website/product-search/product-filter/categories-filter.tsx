// Third party packages
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
		selectedCategoryAndSubCategoryAndSpecificCategoryIds,

		setSelectedMainCategoryId,
		setSelectedCategoryId,
		setSelectedSubCategoryId,
		setSelectedSpecificCategoryId
	} = useCategoryStore();

	const categoryIdList: string[] = [];
	const subCategoryIdList: string[] = [];
	const specificCategoryIdList: string[] = [];
	for (let categoryId in selectedCategoryAndSubCategoryAndSpecificCategoryIds) {
		categoryIdList.push(categoryId);
		const subCategoryObject =
			selectedCategoryAndSubCategoryAndSpecificCategoryIds[categoryId];
		for (let subCategoryId in subCategoryObject) {
			subCategoryIdList.push(subCategoryId);
			const specificCategoryIds = subCategoryObject[subCategoryId];
			specificCategoryIdList.push(...specificCategoryIds);
		}
	}

	// const categoryIds = getObjectKeys(
	// 	selectedCategoryAndSubCategoryAndSpecificCategoryIds
	// );

	// const subCategoryIds = getObjectKeys(
	// 	selectedCategoryAndSubCategoryAndSpecificCategoryIds[categoryIds[0]]
	// );

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
						onClick={() =>
							setSelectedMainCategoryId(
								isMainCategorySelected ? '' : mainCategoryId
							)
						}
					>
						{/* Categories */}
						{categories?.map((category: any) => {
							const { id: categoryId, subCategories = [] } =
								category || {};

							// const isCategorySelected =
							// 	categoryIds.findIndex(
							// 		(selectedCategoryId) =>
							// 			selectedCategoryId === categoryId
							// 	) >= 0;

							const isCategorySelected =
								categoryIdList.findIndex(
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

										// const isSubCategorySelected =
										// 	subCategoryIds.findIndex(
										// 		(selectedSubCategoryId) =>
										// 			selectedSubCategoryId === subCategoryId
										// 	) >= 0;

										const isSubCategorySelected =
											subCategoryIdList.findIndex(
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
													setSelectedSubCategoryId(
														categoryId,
														subCategoryId
													)
												}
												className="ml-4"
											>
												{/* Specific Categories */}
												{specificCategories?.map(
													(specificCategory: any) => {
														const { id: specificCategoryId } =
															specificCategory || {};

														// const isSpecificCategorySelected =
														// 	selectedSpecificCategoryIds.includes(
														// 		specificCategoryId
														// 	);

														const isSpecificCategorySelected =
															specificCategoryIdList.includes(
																specificCategoryId
															);

														return (
															<button
																key={specificCategoryId}
																className={`ml-4 text-left ${
																	isSpecificCategorySelected
																		? 'font-semibold'
																		: ''
																}`}
																onClick={() => {
																	setSelectedSpecificCategoryId(
																		categoryId,
																		subCategoryId,
																		specificCategoryId
																	);
																}}
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
				<span>
					<AiOutlinePlus />
				</span>
				<span>{title}</span>
			</label>
			{isOpen && <div>{children}</div>}
		</div>
	);
};

export default CategoriesFilter;
