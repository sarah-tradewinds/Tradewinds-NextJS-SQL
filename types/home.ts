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
	title: string;
	slug: { en: string };
	image: { url: string };
	desc: string;
	btnTxt: string;
	bgHexColor?: string;
};

type subCategories = {
	id: string | number;
	title: string;
	slug: { en: string };
	image: { url: string };
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
