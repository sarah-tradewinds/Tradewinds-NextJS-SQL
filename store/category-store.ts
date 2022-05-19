// Third party packages
import { getCategories } from 'lib/common.lib';
import create from 'zustand';

// const c = {
// 	['categoryId']: {
// 		['subCategoryId1']: [],
// 		['subCategoryId2']: [],
// 		['subCategoryId3']: []
// 	}
// };

interface CategoryState {
	categories: any[];
	selectedMainCategoryId: string;
	ids: any;

	fetchCategories: (
		mainCategoryId?: string,
		categoryId?: string
	) => any;
	setSelectedMainCategoryId: (id: string) => any;
	setSelectedCategoryId: (categoryId: string) => any;
	setSelectedSubCategoryId: (categoryId: string, id: string) => any;
	setSelectedSubSubCategoryId: (
		categoryId: string,
		subCategoryId: string,
		id: string
	) => any;
	selectedAndUnselectAllCategoryId: () => any;
	setDefaultMainCategoryAndCategoryId: (
		mainCategoryId: string,
		categoryId: string
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
	categories: [],
	selectedMainCategoryId: '',
	ids: {},
	fetchCategories: async (
		mainCategoryId?: string,
		categoryId?: string
	) => {
		const categories = await getCategories();
		const defaultMainCategory = categories[0];

		let ids = {};
		if (defaultMainCategory?.category[0]) {
			ids = {
				[defaultMainCategory?.category[0]?.id]: {}
			};
			categories[0].category[0].isSelected = true;
		}

		set({
			categories,
			selectedMainCategoryId: mainCategoryId || defaultMainCategory?.id,
			ids
		});
	},
	setDefaultMainCategoryAndCategoryId: (
		mainCategoryId: string,
		categoryId: string
	) =>
		set((state) => {
			let ids = {};
			if (categoryId) {
				ids = {
					[categoryId]: {}
				};
			}

			const categories = state.categories.map((mainCategory) => {
				if (mainCategory.id === mainCategoryId) {
					mainCategory.category?.map((categoryData: any) => {
						if (categoryData.id === categoryId) {
							categoryData.isSelected = true;
						}
					});
				}
				return mainCategory;
			});

			return {
				categories,
				selectedMainCategoryId:
					mainCategoryId || state.selectedMainCategoryId,
				ids
			};
		}),
	setSelectedMainCategoryId: (mainCategoryId: string) =>
		set(({ selectedMainCategoryId }) => {
			const newMainCategoryId =
				selectedMainCategoryId !== mainCategoryId ? mainCategoryId : '';

			return {
				selectedMainCategoryId: newMainCategoryId,
				ids: {}
			};
		}),
	setSelectedCategoryId: (categoryId: string) =>
		set((state) => {
			const ids = { ...state.ids };
			const isKeyExist = ids[categoryId];
			if (isKeyExist) {
				delete ids[categoryId];
			} else {
				localStorage.setItem('category', categoryId);
				ids[categoryId] = {};
			}

			return {
				categories: state.categories.map((mainCategory) => {
					if (state.selectedMainCategoryId === mainCategory.id) {
						mainCategory?.category.map((categoryData: any) => {
							if (categoryData.id === categoryId) {
								categoryData.isSelected = categoryData.isSelected
									? false
									: true;
							}
						});
					}

					return mainCategory;
				}),
				ids
			};
		}),
	setSelectedSubCategoryId: (
		categoryId: string,
		subCategoryId: string
	) =>
		set((state) => {
			const ids = { ...state.ids };
			const isCategoryExist = ids[categoryId];
			if (isCategoryExist) {
				const isSubCategoryExist = ids[categoryId][subCategoryId];
				if (isSubCategoryExist) {
					delete ids[categoryId][subCategoryId];
				} else {
					ids[categoryId][subCategoryId] = [];
				}
			}
			return {
				ids: ids
			};
		}),
	setSelectedSubSubCategoryId: (
		categoryId: string,
		subCategoryId: string,
		subSubCategoryId: string
	) =>
		set((state) => {
			const ids = { ...state.ids };
			const isCategoryExist = ids[categoryId];
			if (isCategoryExist) {
				const isSubCategoryExist = ids[categoryId][subCategoryId];
				if (isSubCategoryExist) {
					const updatedDatedData = updateElementByIndex(
						state.ids[categoryId][subCategoryId],
						subSubCategoryId
					);
					ids[categoryId][subCategoryId] = updatedDatedData;
				}
			}

			return {
				ids
			};
		}),
	selectedAndUnselectAllCategoryId: () =>
		set((state) => {
			let ids = {};
			const mainCategory = state.categories.find(
				(mainCategory) =>
					mainCategory.id === state.selectedMainCategoryId
			);
			if (mainCategory) {
				mainCategory?.category?.forEach((categoryData: any) => {
					(ids as any)[categoryData.id] = {};
					categoryData.isSelected = true;
				});
			}
			ids = {
				...ids,
				...state.ids
			};

			return { ids };
		})
}));

export const getMainCategoryById = (
	list: any[],
	mainCategoryId: string
) => {
	return list.find((category: any) => category.id === mainCategoryId);
};
