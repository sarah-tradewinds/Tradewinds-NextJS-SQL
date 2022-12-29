// Third party packages
import {
	getCategoriesByMainCategoryId,
	getMainCategories,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';
import create from 'zustand';

interface CategoryState {
	isLoading?: boolean;
	selectedMainCategoryId: string;
	selectedCategoryIds: string[];
	selectedSubCategoryIds: string[];
	selectedSpecificCategoryIds: string[];
	allEcoCategories: {}[];

	fetchMainCategories: () => any;
	setSelectedMainCategoryId: (id: string) => any;
	setSelectedCategoryId: (categoryId: string) => any;
	setSelectedSubCategoryId: (subCategoryId: string) => any;
	setSelectedSpecificCategoryId: (specificCategoryId: string) => any;
	removeCategoryFilter: () => any;
}

const updateElementByIndex = (
	list: string[],
	elementId: string
): string[] => {
	const elementIndex = list.findIndex(
		(selectedId) => selectedId === elementId
	);

	const updatedList: string[] = [...list];
	if (elementIndex < 0) {
		updatedList.push(elementId);
	} else if (elementIndex >= 0) {
		updatedList.splice(elementIndex, 1);
	}
	return updatedList;
}; // End of updateElementByIndex function

export const useCategoryStore = create<CategoryState>((set) => ({
	selectedMainCategoryId: '',
	selectedCategoryIds: [],
	selectedSubCategoryIds: [],
	selectedSpecificCategoryIds: [],
	allEcoCategories: [],

	fetchMainCategories: async () => {
		const mainCategories = await getMainCategories();
		set({
			allEcoCategories: mainCategories
		});
	},
	setSelectedMainCategoryId: async (mainCategoryId: string) => {
		const categories = await getCategoriesByMainCategoryId(
			mainCategoryId
		);

		set(({ allEcoCategories, selectedMainCategoryId }) => {
			const newMainCategoryId: string =
				selectedMainCategoryId !== mainCategoryId ? mainCategoryId : '';

			localStorage.setItem('main_category', newMainCategoryId);
			localStorage.removeItem('category');

			const updatedAllCategories = allEcoCategories.map(
				(mainCategory: any) => {
					if (mainCategory.id === mainCategoryId) {
						mainCategory.categories = categories;
						mainCategory.isSelected = true;
					} else {
						mainCategory.categories = mainCategory.categories || [];
						mainCategory.isSelected = false;
					}
					return mainCategory;
				}
			);

			return {
				selectedMainCategoryId: newMainCategoryId,
				selectedCategoryIds: [],
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: [],
				allEcoCategories: updatedAllCategories
			};
		});
	},
	setSelectedCategoryId: async (categoryId: string) => {
		const subCategories = await getSubCategoriesByCategoryId(
			categoryId
		);

		set(
			({
				allEcoCategories,
				selectedMainCategoryId,
				selectedCategoryIds
			}) => {
				const updatedAllCategories = allEcoCategories.map(
					(allCategory: any) => {
						if (
							allCategory.id === selectedMainCategoryId &&
							allCategory.categories?.length > 0
						) {
							const updatedCategories = allCategory.categories.map(
								(category: any) => {
									if (category.id === categoryId) {
										category.subCategories = subCategories;
										category.isSelected = !category.isSelected;
									} else {
										category.subCategories =
											category.subCategories || [];
										category.isSelected = category.isSelected;
									}
									return category;
								}
							);
							allCategory.categories = updatedCategories;
						}
						return allCategory;
					}
				);

				const updatedSelectedCategoryIds = updateElementByIndex(
					selectedCategoryIds,
					categoryId
				);

				localStorage.setItem(
					'category',
					updatedSelectedCategoryIds.toString()
				);

				return {
					selectedCategoryIds: updatedSelectedCategoryIds,
					selectedSubCategoryIds: [],
					selectedSpecificCategoryIds: [],
					allEcoCategories: updatedAllCategories
				};
			}
		);
	},
	setSelectedSubCategoryId: async (subCategoryId: string) => {
		const specificCategories =
			await getSpecificCategoriesBySubCategoryId(subCategoryId);

		set(
			({
				allEcoCategories,
				selectedMainCategoryId,
				selectedCategoryIds,
				selectedSubCategoryIds
			}) => {
				const updatedAllCategories = allEcoCategories.map(
					(allCategory: any) => {
						if (
							allCategory.id === selectedMainCategoryId &&
							allCategory.categories?.length > 0
						) {
							const lastCategoryId =
								selectedCategoryIds[selectedCategoryIds.length - 1];
							const updatedCategories = allCategory.categories.map(
								(category: any) => {
									if (
										category.id === lastCategoryId &&
										category.subCategories?.length > 0
									) {
										const updatedSuCategories =
											category.subCategories.map((subCategory: any) => {
												if (subCategory.id === subCategoryId) {
													subCategory.specificCategories =
														specificCategories;
												} else {
													subCategory.specificCategories =
														subCategory.specificCategories || [];
												}
												return subCategory;
											});
										category.subCategories = updatedSuCategories;
									}
									return category;
								}
							);
							allCategory.categories = updatedCategories;
						}
						return allCategory;
					}
				);

				const updatedSelectedSubCategoryIds = updateElementByIndex(
					selectedSubCategoryIds,
					subCategoryId
				);

				return {
					selectedSubCategoryIds: updatedSelectedSubCategoryIds,
					selectedSpecificCategoryIds: [],
					allEcoCategories: updatedAllCategories
				};
			}
		);
	},
	setSelectedSpecificCategoryId: (specificCategoryId: string) =>
		set(({ selectedSpecificCategoryIds }) => {
			const updatedSelectedSpecificCategoryIds = updateElementByIndex(
				selectedSpecificCategoryIds,
				specificCategoryId
			);

			return {
				selectedSpecificCategoryIds: updatedSelectedSpecificCategoryIds
			};
		}),
	removeCategoryFilter: () => {
		localStorage.removeItem('main_category');
		localStorage.removeItem('category');
		set((state) => {
			return {
				selectedMainCategoryId: '',
				selectedCategoryIds: [],
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: []
			};
		});
	}
}));
