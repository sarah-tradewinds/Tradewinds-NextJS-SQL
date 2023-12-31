// Third party packages
import { applyFiltersByUrl } from 'utils/nav-actions.utils';
import create from 'zustand';

interface CategoryState {
	// Property
	selectedMainCategoryId: {
		id: string;
		name: string;
	};
	selectedCategoryAndSubCategoryAndSpecificCategoryIds: any;

	setMainCategory: (id: string, name: string) => any;
	setCategory: (categoryId: string, categoryName: string) => any;
	setSubCategory: (
		categoryId: string,
		categoryName: string,
		subCategoryId: string,
		subCategoryName: string
	) => any;
	setSpecificCategory: (
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

export const useCategoryStore = create<CategoryState>((set) => ({
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
		let parsedFilters = {};
		try {
			parsedFilters = filters ? JSON.parse(filters) || {} : {};
		} catch (error) {}

		set({
			selectedMainCategoryId: {
				id: mainCategoryId,
				name: mainCategoryName
			},
			selectedCategoryAndSubCategoryAndSpecificCategoryIds:
				parsedFilters
		});
	},
	setMainCategory: (mainCategoryId: string, name: string) => {
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

		const value = `${selectedMainCategoryId?.id}_${selectedMainCategoryId.name}`;
		return {
			url: `main_category=${selectedMainCategoryId?.id}_${selectedMainCategoryId.name}`,
			value
		};
	},
	setCategory: (categoryId, categoryName) => {
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
	setSubCategory: (
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
	setSpecificCategory: (
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

				if (!categoryIdsObject) {
					copySelectedCategoryAndSubCategoryAndSpecificCategoryIds[
						categoryIdWithName
					] = {
						[subCategoryIdWithName]: [specificCategoryIdWithName]
					};
				} else if (
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
		set(() => {
			return {
				selectedMainCategoryId: { id: '', name: '' },
				selectedCategoryAndSubCategoryAndSpecificCategoryIds: {}
			};
		});
		return `/product-search`;
	}
}));

export const getIdAndName = (
	idWithNameParam: string,
	separator?: string
) => {
	let idWithNames: any[] = [];
	if (typeof idWithNameParam === 'string') {
		idWithNames = idWithNameParam?.split(separator || ',') || [];
	} else if (typeof idWithNameParam) {
		idWithNames = idWithNameParam || [];
	}

	if (separator === '_') {
		return idWithNames;
	}

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
): { url: string; payload: { [key: string]: any } } => {
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

	const data = applyFiltersByUrl({
		main_category: `${main_category_id}_${main_category}`,
		category: categoryIdList?.toString(),
		sub_category: subCategoryIdList?.toString(),
		sub_sub_category: specificCategoryIdList?.toString()
	});

	return {
		url: `${data?.url}&filters=${JSON.stringify(
			selectedCategoryAndSubCategoryAndSpecificCategoryIds
		)}`,
		payload: {
			...data?.payload,
			...selectedCategoryAndSubCategoryAndSpecificCategoryIds
		}
	};

	// return `${applyFiltersByUrl({
	// 	main_category: `${main_category_id}_${main_category}`,
	// 	category: categoryIdList?.toString(),
	// 	sub_category: subCategoryIdList?.toString(),
	// 	sub_sub_category: specificCategoryIdList?.toString()
	// })}&filters=${JSON.stringify(
	// 	selectedCategoryAndSubCategoryAndSpecificCategoryIds
	// )}`;
};
