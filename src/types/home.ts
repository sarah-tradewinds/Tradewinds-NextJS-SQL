import { LocalesType } from './common.types';

type HeroCarouselType = {
	id?: string;
	order: number;
	image: string;
	link?: string;
	title?: any;
	description?: any;
	action?: any;
	btn_text?: string;
	color?: string;
	horizonatal_alignment?: string;
	vertical_alignment?: string;
};

type EcoCarouselType = {
	id: number;
	img: string;
};

type Category = {
	id?: string;
	title: LocalesType;
	slug: { en: string };
	// image: { url: string };
	image: string;
	description: LocalesType;
	btnTxt: string;
	color?: string;
	panel_color?: string;
	source_now_text_color?: string;
};

type subCategories = {
	id: string | number;
	title: string | { en: string };
	slug: { en: string };
	image: string;
	clr: string;
	is_eco?: boolean;
};

type CatSubCatSectionType = {
	main_category: Category;
	categories: subCategories[];
};

// TODO: Need to remove this
type testTType = {
	category: Category;
	subCategories: subCategories[];
};

export type {
	CatSubCatSectionType,
	EcoCarouselType,
	HeroCarouselType,
	subCategories as SubCategoryType
};
