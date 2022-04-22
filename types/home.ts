type HeroCarouselType = {
	order: number;
	img: string;
	link?: string;
};

type EcoCarouselType = {
	id: number;
	img: string;
};

type Category = {
	title: string;
	slug?: string;
	image: string;
	desc: string;
	btnTxt: string;
	bgHexColor?: string;
};

type subCategories = {
	id: number;
	title: string;
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
