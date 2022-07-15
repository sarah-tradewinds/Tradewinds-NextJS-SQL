// Third party packages
import {
	getCategoriesByMainCategoryId,
	getMainCategories,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';
import create from 'zustand';

const categoryIds = {
	categoryId: {
		subCategoriesId: {
			specificCategoryIds: [0]
		}
	}
};

interface CategoryState {
	isLoading?: boolean;
	// Property
	selectedMainCategoryId: {
		id: string;
		name: string;
	};
	selectedCategoryIds: string[];
	selectedSubCategoryIds: string[];
	selectedSpecificCategoryIds: string[];
	selectedCategoryAndSubCategoryAndSpecificCategoryIds: any;
	allCategories: any[];

	setSelectedAllCategoryId: (
		mainCategoryId: string,
		categoryId: string,
		subCategoryId: string,
		specificCategoryId: string,
		isMegaMenu?: boolean
	) => any;
	setSelectedMainCategoryId: (id: string, name: string) => any;
	setSelectedCategoryId: (
		categoryId: string,
		isMegaMenu?: boolean
	) => any;
	setSelectedSubCategoryId: (
		categoryId: string,
		subCategoryId: string,
		isMegaMenu?: boolean
	) => any;
	setSelectedSpecificCategoryId: (
		categoryId: string,
		subCategoryId: string,
		specificCategoryId: string,
		isMegaMenu?: boolean
	) => any;
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
	selectedMainCategoryId: {
		id: '',
		name: ''
	},
	selectedCategoryIds: [],
	selectedSubCategoryIds: [],
	selectedSpecificCategoryIds: [],
	selectedCategoryAndSubCategoryAndSpecificCategoryIds: {},
	allCategories: [],

	setSelectedAllCategoryId: (
		mainCategoryId,
		categoryId,
		subCategoryId,
		specificCategoryId,
		isMegaMenu
	) => {
		set({
			selectedMainCategoryId: {
				id: mainCategoryId,
				name: ''
			},
			selectedCategoryIds: [categoryId],
			selectedSubCategoryIds: [subCategoryId],
			selectedSpecificCategoryIds: [specificCategoryId],
			allCategories: [
				{
					[categoryId]: {
						[subCategoryId]: {
							[specificCategoryId]: []
						}
					}
				}
			]
		});
	},
	setSelectedMainCategoryId: (mainCategoryId: string, name: string) => {
		if (!mainCategoryId) {
			return;
		}

		set(({ allCategories }) => {
			// localStorage.setItem('main_category_id', mainCategoryId);
			// localStorage.removeItem('category_ids');
			const updatedAllCategories = allCategories.map((mainCategory) => {
				delete mainCategory.categories;
				return mainCategory;
			});

			return {
				selectedMainCategoryId: {
					id: mainCategoryId,
					name: name
				},
				selectedCategoryAndSubCategoryAndSpecificCategoryIds: {},
				selectedCategoryIds: [],
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: [],
				allCategories: updatedAllCategories
			};
		});
	},
	setSelectedCategoryId: (categoryId, isMegaMenu) => {
		if (!categoryId) return;
		set(
			({
				selectedCategoryIds,
				selectedCategoryAndSubCategoryAndSpecificCategoryIds
			}) => {
				const isCategoryIdExists =
					selectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryId
					];

				if (isMegaMenu) {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds = {
						[categoryId]: {}
					};
				}

				if (!isMegaMenu) {
					if (isCategoryIdExists) {
						delete selectedCategoryAndSubCategoryAndSpecificCategoryIds[
							categoryId
						];
					} else {
						selectedCategoryAndSubCategoryAndSpecificCategoryIds[
							categoryId
						] = {};
					}
				}

				const categoryIdKeys = updateElementByIndex(
					selectedCategoryIds,
					categoryId
				);

				// localStorage.setItem('category_ids', categoryIdKeys.toString());

				console.log('[setSelectedCategoryId] got called');

				return {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds,
					selectedCategoryIds: categoryIdKeys
				};
			}
		);
	},
	setSelectedSubCategoryId: (categoryId, subCategoryId, isMegaMenu) => {
		// if (!categoryId && !isMegaMenu) return;

		set(
			({
				selectedSubCategoryIds,
				selectedCategoryAndSubCategoryAndSpecificCategoryIds
			}) => {
				let categoryIdObject =
					selectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryId
					];

				let subCategoryIdObject;
				if (categoryIdObject) {
					subCategoryIdObject = categoryIdObject[subCategoryId];
				} else {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryId
					] = {};
				}

				if (isMegaMenu) {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds = {
						[categoryId]: { [subCategoryId]: [] }
					};
				}

				if (!isMegaMenu) {
					if (subCategoryIdObject) {
						delete selectedCategoryAndSubCategoryAndSpecificCategoryIds[
							categoryId
						][subCategoryId];
					} else {
						selectedCategoryAndSubCategoryAndSpecificCategoryIds[
							categoryId
						][subCategoryId] = [];
					}
				}

				const subCategoryIds = updateElementByIndex(
					selectedSubCategoryIds,
					subCategoryId
				);

				return {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds,
					selectedSubCategoryIds: subCategoryIds
				};
			}
		);
	},
	setSelectedSpecificCategoryId: (
		categoryId,
		subCategoryId,
		specificCategoryId,
		isMegaMenu
	) =>
		set(
			({
				selectedSpecificCategoryIds,
				selectedCategoryAndSubCategoryAndSpecificCategoryIds
			}) => {
				let categoryIdsObject =
					selectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryId
					];

				let specificCategoryIdList;
				if (categoryIdsObject) {
					specificCategoryIdList = categoryIdsObject[subCategoryId];
				}

				if (isMegaMenu) {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds = {
						[categoryId]: {
							[subCategoryId]: [specificCategoryId]
						}
					};
				}

				if (!isMegaMenu) {
					if (
						specificCategoryIdList &&
						specificCategoryIdList.length > 0
					) {
						selectedCategoryAndSubCategoryAndSpecificCategoryIds[
							categoryId
						][subCategoryId] = specificCategoryIdList.filter(
							(selectedSpecificCategoryId: string) =>
								selectedSpecificCategoryId !== specificCategoryId
						);
					} else {
						selectedCategoryAndSubCategoryAndSpecificCategoryIds[
							categoryId
						][subCategoryId] = [specificCategoryId];
					}
				}

				const specificCategoryIds = updateElementByIndex(
					selectedSpecificCategoryIds,
					specificCategoryId
				);

				return {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds,
					selectedSpecificCategoryIds: specificCategoryIds
				};
			}
		),

	removeCategoryFilter: () => {
		localStorage.removeItem('main_category_id');
		localStorage.removeItem('category_ids');
		set(() => {
			return {
				selectedMainCategoryId: { id: '', name: '' },
				selectedCategoryIds: [],
				selectedSubCategoryIds: [],
				selectedSpecificCategoryIds: []
			};
		});
	},

	fetchMainCategories: async (isEco?: boolean) => {
		const mainCategories = await getMainCategories(isEco);
		set(() => {
			// const localMainCategoryId =
			// 	localStorage.getItem('main_category_id');

			// let defaultMainCategoryId: string = localMainCategoryId || '';
			// if (!localMainCategoryId) {
			// 	defaultMainCategoryId = mainCategories[0]?.id?.toString();
			// localStorage.setItem('main_category_id', defaultMainCategoryId);
			// }

			return {
				// selectedMainCategoryId: defaultMainCategoryId,
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
				const updatedAllCategories: any[] = allCategories.map(
					(allCategory: any) => {
						if (
							allCategory.id === selectedMainCategoryId.id &&
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
				selectedCategoryIds
			}) => {
				const updatedAllCategories = allCategories.map(
					(allCategory: any) => {
						if (
							allCategory.id === selectedMainCategoryId.id &&
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
