import { NextRouter } from 'next/router';
import { getIdAndName } from 'store/category-store';
import { generateQueryString } from './generate_query_string.utils';

export const getDataById = (
	list: any[],
	id: string,
	propertyName?: string
) => {
	return list.find((data: any) => data[propertyName || 'id'] === id);
}; // End of getDataById function

export const getCountriesName = (
	list: any[],
	propertyName?: string
) => {
	return list.map((data: any) => data[propertyName || 'name']);
}; // End of getCountriesName function

export const getObjectKeys = (givenObject: any) => {
	let myObject = {};
	if (typeof givenObject === 'object') {
		myObject = givenObject;
	}

	return Object.keys(myObject || {});
};

export const generateListByCount = (
	count: number,
	startCount?: number,
	endCount?: number,
	child?: any
) => {
	const list = [];
	for (let i = startCount || 0; i <= (endCount || count); i++) {
		list.push(child || i);
	}
	return list;
}; // End of generateListByCount

export type yAxisAlignment = 'top' | 'center' | 'middle' | 'bottom';
export type xAxisAlignment = 'left' | 'center' | 'middle' | 'right';

export const getAlignmentClassName = (
	xAxis: xAxisAlignment,
	yAxis: yAxisAlignment
) => {
	let xAxisAlignmentClassName = 'left-4';
	if (xAxis === 'center' || xAxis === 'middle') {
		xAxisAlignmentClassName = 'left-1/2 transform -translate-x-1/2';
	} else if (xAxis === 'right') {
		xAxisAlignmentClassName = 'right-4';
	}

	let yAxisAlignmentClassName = 'top-4';
	if (yAxis === 'center' || yAxis === 'middle') {
		yAxisAlignmentClassName = 'top-1/2 transform -translate-y-1/2';
	} else if (yAxis === 'bottom') {
		yAxisAlignmentClassName = 'bottom-4';
	}

	return `${xAxisAlignmentClassName} ${yAxisAlignmentClassName}`;
};

export const getFilterValueFromQuery = (query: any) => {
	const [main_category_id, main_category] = getIdAndName(
		(query.main_category || '') as string,
		'_'
	);

	const [category_id, category] = getIdAndName(
		(query.category || '') as string
	);

	const [sub_category_id, sub_category] = getIdAndName(
		(query.sub_category || '') as string
	);

	const [specific_category_id, sub_sub_category] = getIdAndName(
		(query.sub_sub_category || '') as string
	);

	const [countryId, countryName] = getIdAndName(
		(query.country || '') as string
	);

	const {
		price_start,
		price_end,
		isCustomizable = undefined,
		is_live_buy = undefined,
		minOrder,
		maxOrder,
		searchQuery,
		trendingProduct,
		sort_price
	} = query;

	return {
		main_category_id,
		main_category,
		category_id,
		category,
		sub_category_id,
		sub_category,
		specific_category_id,
		sub_sub_category,
		countryId,
		country_of_region: countryName,
		country: trendingProduct ? countryName : '',
		price_start,
		price_end,
		query: (searchQuery || '') as string,
		is_customizable: isCustomizable === 'true' ? true : false,
		is_live_buy: is_live_buy === 'true' ? true : false,
		minimum_order: minOrder,
		maximum_order: maxOrder,
		sort_price: sort_price
	};
}; // End of getFilterValueFromQuery

export const getProductSearchURL = (
	router: NextRouter,
	payload: any,
	reset?: boolean
) => {
	const { push, query } = router;

	let queryString = generateQueryString({
		...query,
		...payload
	});

	if (queryString) {
		queryString = `?${queryString}`;
	}

	return push(`/product-search${reset ? '' : queryString}`, undefined, {
		shallow: true
	});
}; // End of getProductSearchURL

interface IClassNameBasedOnSize {
	sm?: string;
	md?: string;
	lg?: string;
	xl?: string;
	'2xl'?: string;
	'4k'?: string;
	mobile?: string;
	tablet?: string;
	desktop?: string;
}

export const getTailwind = (
	className: string,
	classNameBasedOnSize?:
		| { [key: string]: string }
		| IClassNameBasedOnSize
) => {
	const classNames: string[] = [];

	// if (className) {
	//  classNames.push(className?.trim());
	// }

	classNames.push(className);

	if (classNameBasedOnSize) {
		for (const key in classNameBasedOnSize) {
			const classNameForSize: string[] = [];

			const classNameDataList =
				classNameBasedOnSize[
					key as keyof IClassNameBasedOnSize
				]?.trim();

			classNameDataList
				?.split(' ')
				.forEach((classNameData) =>
					classNameForSize.push(`${key}:${classNameData}`)
				);
			classNames.push(classNameForSize.join(' '));
		}
	}

	return classNames.join(' ') || '';
}; // End of getTailwind

export const getDefaultProductAndProductVariants = (
	productVariant: any[]
) => {
	let defaultVariant: any = {};
	const variants = [];
	for (const variant of productVariant) {
		if (variant.is_default) {
			defaultVariant = variant;
		} else {
			variants.push(variant);
		}
	} // End of for loop

	return {
		defaultVariant,
		variants,
		totalVariantCount: variants?.length || 0
	};
}; // End of getDefaultProductAndProductVariants
