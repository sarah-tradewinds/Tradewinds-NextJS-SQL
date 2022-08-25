import { LocalesType } from './common.types';

type HeroCarouselType = {
	id?: string;
	order: number;
	image: {
		url: string;
	};
	link?: string;
	title?: any;
	description?: any;
	action?: any;
	btn_text?: string;
};

type EcoCarouselType = {
	id: number;
	img: string;
};

type Category = {
	id?: string;
	title: LocalesType;
	slug: { en: string };
	image: { url: string };
	description: LocalesType;
	btnTxt: string;
	bgHexColor?: string;
};

type subCategories = {
	id: string | number;
	title: string | { en: string };
	slug: { en: string };
	image: { url: string };
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
	HeroCarouselType,
	EcoCarouselType,
	CatSubCatSectionType,
	subCategories as SubCategoryType
};
