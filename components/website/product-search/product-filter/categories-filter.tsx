// Third party packages
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';

// data
import { useCategoryStore } from 'store/category-store';
import { getLocaleText } from 'utils/get_locale_text';

const CategoriesFilter: React.FC = (props) => {
	const { locale } = useRouter();

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
						title={getLocaleText(mainCategory?.title || {}, locale)}
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
									title={getLocaleText(category?.title || {}, locale)}
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
											subCategoryIdList.findIndex(
												(selectedSubCategoryId) =>
													selectedSubCategoryId === subCategoryId
											) >= 0;

										return (
											<CategoryCollapse
												key={subCategoryId}
												id={subCategoryId}
												isOpen={isSubCategorySelected}
												title={getLocaleText(
													subCategory?.title || {},
													locale
												)}
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
																{getLocaleText(
																	specificCategory?.title || {},
																	locale
																)}
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
