// Third party packages
import { getCategories } from 'lib/common.lib';
import create from 'zustand';

interface CategoryState {
	categories: any;
	fetchCategories: () => any;
}

export const useCategoryStore = create<CategoryState>((set) => ({
	categories: [],
	fetchCategories: async () => {
		const categories = await getCategories();
		set({ categories });
	}
}));
