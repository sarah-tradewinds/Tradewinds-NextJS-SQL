type HeroCarouselType = {
	id?: string;
	order: number;
	image: string;
	link?: string;
	title?: any;
	description?: any;
	action?: any;
};

type EcoCarouselType = {
	id: number;
	img: string;
};

type Category = {
	id?: string;
	title: string;
	slug?: string;
	image: string;
	desc: string;
	btnTxt: string;
	bgHexColor?: string;
};

type subCategories = {
	id: string | number;
	title: string;
	slug?: string;
	img: string;
	clr: string;
};

type CatSubCatSectionType = {
	category: Category;
	subCategories: subCategories[];
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
