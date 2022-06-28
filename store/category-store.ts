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
	isCategoryEco: boolean;
	selectedMainCategoryId: string;
	selectedCategoryIds: string[];
	selectedSubCategoryIds: string[];
	selectedSpecificCategoryIds: string[];
	allCategories: any[];

	setIsCategoryEco: (isEco: boolean) => any;
	setSelectedMainCategoryId: (id: string) => any;
	setSelectedCategoryId: (categoryId: string) => any;
	setSelectedSubCategoryId: (subCategoryId: string) => any;
	setSelectedSpecificCategoryId: (specificCategoryId: string) => any;
	removeCategoryFilter: () => any;

	fetchMainCategories: (isEco?: boolean) => any;
	fetchCategoriesByMainCategoryId: (
		mainCategoryId: string,
		isEco?: boolean
	) => any;
	fetchSubCategoriesByCategoryId: (
		categoryId: string,
		isEco?: boolean
	) => any;
	fetchSpecificCategoriesBySubCategoryId: (
		subCategoryId: string,
		isEco?: boolean
	) => any;
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
	isCategoryEco: false,
	categories: [],
	selectedMainCategoryId: '',
	selectedCategoryIds: [],
	selectedSubCategoryIds: [],
	selectedSpecificCategoryIds: [],
	allCategories: [],

	setIsCategoryEco: (isEco: boolean) => {
		set(({ isCategoryEco }) => ({ isCategoryEco: !isCategoryEco }));
	},

	setSelectedMainCategoryId: (mainCategoryId: string) => {
		set(({ allCategories }) => {
			if (mainCategoryId) {
				localStorage.setItem('main_category_id', mainCategoryId);
			} else {
				localStorage.removeItem('main_category_id');
			}
			localStorage.removeItem('category_ids');

			const updatedAllCategories = allCategories.map((mainCategory) => {
				delete mainCategory.categories;
				return mainCategory;
			});

			return {
				selectedMainCategoryId: mainCategoryId,
				selectedCategoryIds: [],
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: [],
				allCategories: updatedAllCategories
			};
		});
	},
	setSelectedCategoryId: (categoryId: string) => {
		set(({ allCategories, selectedCategoryIds }) => {
			const updatedSelectedCategoryIds = updateElementByIndex(
				selectedCategoryIds,
				categoryId
			);

			localStorage.setItem(
				'category_ids',
				updatedSelectedCategoryIds.toString()
			);

			return {
				selectedCategoryIds: updatedSelectedCategoryIds,
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: []
			};
		});
	},
	setSelectedSubCategoryId: (subCategoryId: string) => {
		set(({ selectedSubCategoryIds }) => {
			const updatedSelectedSubCategoryIds = updateElementByIndex(
				selectedSubCategoryIds,
				subCategoryId
			);

			return {
				selectedSubCategoryIds: updatedSelectedSubCategoryIds,
				selectedSpecificCategoryIds: []
			};
		});
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
	},

	fetchMainCategories: async (isEco?: boolean) => {
		const mainCategories = await getMainCategories(isEco);
		set(() => {
			const localMainCategoryId =
				localStorage.getItem('main_category_id');

			let defaultMainCategoryId: string = localMainCategoryId || '';
			if (!localMainCategoryId) {
				defaultMainCategoryId = mainCategories[0]?.id?.toString();
				localStorage.setItem('main_category_id', defaultMainCategoryId);
			}
			return {
				selectedMainCategoryId: defaultMainCategoryId,
				allCategories: mainCategories
			};
		});
	},
	fetchCategoriesByMainCategoryId: async (
		mainCategoryId: string,
		isEco?: boolean
	) => {
		const categories = await getCategoriesByMainCategoryId(
			mainCategoryId
		);

		set(({ allCategories }) => {
			const updatedAllCategories = allCategories.map(
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

			console.log('updatedAllCategories =', updatedAllCategories);

			return {
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: [],
				allCategories: updatedAllCategories
			};
		});
	},
	fetchSubCategoriesByCategoryId: async (categoryId: string) => {
		const subCategories = await getSubCategoriesByCategoryId(
			categoryId
		);
		set(
			({
				allCategories,
				selectedMainCategoryId,
				selectedCategoryIds
			}) => {
				const updatedAllCategories = allCategories.map(
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

				return {
					selectedSubCategoryIds: [],
					selectedSpecificCategoryIds: [],
					allCategories: updatedAllCategories
				};
			}
		);
	},
	fetchSpecificCategoriesBySubCategoryId: async (
		subCategoryId: string
	) => {
		const specificCategories =
			await getSpecificCategoriesBySubCategoryId(subCategoryId);

		set(
			({
				allCategories,
				selectedMainCategoryId,
				selectedCategoryIds,
				selectedSubCategoryIds
			}) => {
				const updatedAllCategories = allCategories.map(
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

				return {
					selectedSpecificCategoryIds: [],
					allCategories: updatedAllCategories
				};
			}
		);
	}
}));
