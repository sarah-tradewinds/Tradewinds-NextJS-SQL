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

	fetchCategories: () => any;
	setSelectedMainCategoryId: (id: string) => any;
	setSelectedCategoryId: (categoryId: string) => any;
	setSelectedSubCategoryId: (categoryId: string, id: string) => any;
	setSelectedSubSubCategoryId: (
		categoryId: string,
		subCategoryId: string,
		id: string
	) => any;
	selectedAndUnselectAllCategoryId: () => any;
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
	fetchCategories: async () => {
		const categories = await getCategories();
		const defaultMainCategory = categories[0];

		set({
			categories,
			selectedMainCategoryId: defaultMainCategory
				? defaultMainCategory.id
				: ''
		});
	},
	setSelectedMainCategoryId: (mainCategoryId: string) =>
		set(({ selectedMainCategoryId }) => ({
			selectedMainCategoryId:
				selectedMainCategoryId !== mainCategoryId ? mainCategoryId : '',
			ids: {}
		})),
	setSelectedCategoryId: (categoryId: string) =>
		set((state) => {
			const ids = { ...state.ids };
			const isKeyExist = ids[categoryId];
			if (isKeyExist) {
				delete ids[categoryId];
			} else {
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
