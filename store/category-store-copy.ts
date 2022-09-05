// Third party packages
import { applyFiltersByUrl } from 'utils/nav-actions.utils';
import create from 'zustand';

// lib

const categoryIds = {
	categoryId: {
		subCategoriesId: {
			specificCategoryIds: [0]
		}
	}
};

interface CategoryState {
	// Property
	selectedMainCategoryId: {
		id: string;
		name: string;
	};
	selectedCategoryAndSubCategoryAndSpecificCategoryIds: any;

	// methods
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
		categoryName: string
	) => any;
	setSelectedSubCategoryId: (
		categoryId: string,
		categoryName: string,
		subCategoryId: string,
		subCategoryName: string
	) => any;
	setSelectedSpecificCategoryId: (
		categoryId: string,
		categoryName: string,
		subCategoryId: string,
		subCategoryName: string,
		specificCategoryId: string,
		specificCategoryName: string
	) => any;
	setInitialIds: (query: any) => any;
	removeCategoryFilter: () => any;
}

export const useCategoryStoreCopy = create<CategoryState>((set) => ({
	selectedMainCategoryId: {
		id: '',
		name: ''
	},
	selectedCategoryAndSubCategoryAndSpecificCategoryIds: {},
	setInitialIds: (query: any) => {
		const [mainCategoryId, mainCategoryName] = getIdAndName(
			(query.main_category || '') as string
		);

		const filters = query?.filters || '';
		const parsedFilters = filters ? JSON.parse(filters) || {} : {};

		// console.log({
		// 	id: mainCategoryId,
		// 	name: mainCategoryName
		// });

		set({
			selectedMainCategoryId: {
				id: mainCategoryId,
				name: mainCategoryName
			},
			selectedCategoryAndSubCategoryAndSpecificCategoryIds:
				parsedFilters
		});
	},
	setSelectedAllCategoryId: (
		mainCategoryId,
		categoryId,
		subCategoryId,
		specificCategoryId
	) => {
		set({
			selectedMainCategoryId: {
				id: mainCategoryId,
				name: ''
			},
			selectedCategoryAndSubCategoryAndSpecificCategoryIds: [categoryId]
		});
	},
	setSelectedMainCategoryId: (mainCategoryId: string, name: string) => {
		if (!mainCategoryId) {
			return;
		}

		const selectedMainCategoryId = {
			id: mainCategoryId,
			name
		};

		set({
			selectedMainCategoryId,
			selectedCategoryAndSubCategoryAndSpecificCategoryIds: {}
		});

		return `main_category=${selectedMainCategoryId?.id}_${selectedMainCategoryId.name}`;
	},
	setSelectedCategoryId: (categoryId, categoryName) => {
		if (!categoryId) return;

		const categoryIdWithName = `${categoryId}_${categoryName}`;

		let selectedMainCategory = {
			id: '',
			name: ''
		};
		let copySelectedCategoryAndSubCategoryAndSpecificCategoryIds: any =
			{};

		set(
			({
				selectedMainCategoryId,
				selectedCategoryAndSubCategoryAndSpecificCategoryIds
			}) => {
				selectedMainCategory = selectedMainCategoryId;

				copySelectedCategoryAndSubCategoryAndSpecificCategoryIds =
					selectedCategoryAndSubCategoryAndSpecificCategoryIds || {};

				const isCategoryIdExists =
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					];

				if (isCategoryIdExists) {
					delete copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					];
				} else {
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					] = {};
				}

				return {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds
				};
			}
		);

		return getIdsInString(
			selectedMainCategory.id,
			selectedMainCategory.name,
			copySelectedCategoryAndSubCategoryAndSpecificCategoryIds
		);
	},
	setSelectedSubCategoryId: (
		categoryId,
		categoryName,
		subCategoryId,
		subCategoryName
	) => {
		const categoryIdWithName = `${categoryId}_${categoryName}`;
		const subCategoryIdWithName = `${subCategoryId}_${subCategoryName}`;

		let selectedMainCategory = {
			id: '',
			name: ''
		};
		let copySelectedCategoryAndSubCategoryAndSpecificCategoryIds: any =
			{};

		set(
			({
				selectedMainCategoryId,
				selectedCategoryAndSubCategoryAndSpecificCategoryIds
			}) => {
				selectedMainCategory = selectedMainCategoryId;
				copySelectedCategoryAndSubCategoryAndSpecificCategoryIds = {
					...(selectedCategoryAndSubCategoryAndSpecificCategoryIds ||
						{})
				};

				let categoryIdObject =
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					];

				let subCategoryIdObject;
				if (categoryIdObject) {
					subCategoryIdObject = categoryIdObject[subCategoryIdWithName];
				} else {
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					] = {};
				}

				if (subCategoryIdObject) {
					delete copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					][subCategoryIdWithName];
				} else {
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					][subCategoryIdWithName] = [];
				}

				return {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds
				};
			}
		);

		return getIdsInString(
			selectedMainCategory.id,
			selectedMainCategory.name,
			copySelectedCategoryAndSubCategoryAndSpecificCategoryIds
		);
	},
	setSelectedSpecificCategoryId: (
		categoryId,
		categoryName,
		subCategoryId,
		subCategoryName,
		specificCategoryId,
		specificCategoryName
	) => {
		const categoryIdWithName = `${categoryId}_${categoryName}`;
		const subCategoryIdWithName = `${subCategoryId}_${subCategoryName}`;
		const specificCategoryIdWithName = `${specificCategoryId}_${specificCategoryName}`;

		let selectedMainCategory = {
			id: '',
			name: ''
		};
		let copySelectedCategoryAndSubCategoryAndSpecificCategoryIds: any =
			{};

		set(
			({
				selectedMainCategoryId,
				selectedCategoryAndSubCategoryAndSpecificCategoryIds
			}) => {
				selectedMainCategory = selectedMainCategoryId;
				copySelectedCategoryAndSubCategoryAndSpecificCategoryIds = {
					...(selectedCategoryAndSubCategoryAndSpecificCategoryIds ||
						{})
				};
				let categoryIdsObject =
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					];

				let specificCategoryIdList;
				if (categoryIdsObject) {
					specificCategoryIdList =
						categoryIdsObject[subCategoryIdWithName];
				}

				if (
					specificCategoryIdList &&
					specificCategoryIdList.length > 0
				) {
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					][subCategoryIdWithName] = specificCategoryIdList.filter(
						(selectedSpecificCategoryId: string) =>
							selectedSpecificCategoryId !== specificCategoryIdWithName
					);
				} else {
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					][subCategoryIdWithName] = [specificCategoryIdWithName];
				}

				return {
					selectedCategoryAndSubCategoryAndSpecificCategoryIds
				};
			}
		);

		return getIdsInString(
			selectedMainCategory.id,
			selectedMainCategory.name,
			copySelectedCategoryAndSubCategoryAndSpecificCategoryIds
		);
	},

	removeCategoryFilter: () => {
		localStorage.removeItem('main_category_id');
		localStorage.removeItem('category_ids');
		set(() => {
			return {
				selectedMainCategoryId: { id: '', name: '' },
				selectedCategoryAndSubCategoryAndSpecificCategoryIds: {}
			};
		});
	}
}));

export const getIdAndName = (idWithNameParam: string) => {
	const idWithNames = idWithNameParam?.split(',') || [];

	const ids = [];
	const names = [];
	let idWithName = '';

	for (const idWithName of idWithNames) {
		const [id, name] = idWithName.split('_') || [];
		ids.push(id);
		names.push(name);
	}

	return [ids?.toString(), names?.toString(), idWithName];
}; // End of getIdAndName function

export const getIdsInString = (
	main_category_id: string,
	main_category: string,
	selectedCategoryAndSubCategoryAndSpecificCategoryIds: any
): string => {
	const categoryIdList: string[] = [];
	const categoryNameList: string[] = [];
	const subCategoryIdList: string[] = [];
	const specificCategoryIdList: string[] = [];

	for (let categoryIdWithName in selectedCategoryAndSubCategoryAndSpecificCategoryIds) {
		const [categoryId, categoryName] =
			categoryIdWithName.split('_') || [];
		categoryIdList.push(categoryIdWithName);
		categoryNameList.push(categoryName);

		const subCategoryObject =
			selectedCategoryAndSubCategoryAndSpecificCategoryIds[
				categoryIdWithName
			];

		for (let subCategoryId in subCategoryObject) {
			subCategoryIdList.push(subCategoryId);
			const specificCategoryIds = subCategoryObject[subCategoryId];
			specificCategoryIdList.push(...specificCategoryIds);
		}
	}

	return `${applyFiltersByUrl({
		main_category: `${main_category_id}_${main_category}`,
		category: categoryIdList?.toString(),
		sub_category: subCategoryIdList?.toString(),
		sub_sub_category: specificCategoryIdList?.toString()
	})}&filters=${JSON.stringify(
		selectedCategoryAndSubCategoryAndSpecificCategoryIds
	)}`;

	// return `${applyFiltersByUrl({
	// 	main_category_id,
	// 	main_category,
	// 	// category_id: categoryIdList?.toString(),
	// 	// sub_category_id: subCategoryIdList?.toString(),
	// 	// sub_sub_category_id: specificCategoryIdList?.toString()
	// 	category: categoryNameList?.toString(),
	// 	sub_category: subCategoryIdList?.toString(),
	// 	sub_sub_category: specificCategoryIdList?.toString()
	// })}`;
};
