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
	endCount?: number
) => {
	const list = [];
	for (let i = startCount || 0; i <= (endCount || count); i++) {
		list.push(i);
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
	const [_, main_category] = getIdAndName(
		(query.main_category || '') as string,
		'_'
	);

	const [__, category] = getIdAndName((query.category || '') as string);

	const [___, sub_category] = getIdAndName(
		(query.sub_category || '') as string
	);

	const [____, sub_sub_category] = getIdAndName(
		(query.sub_sub_category || '') as string
	);

	const [countryId, countryName] = getIdAndName(
		(query.country || '') as string
	);

	const {
		price_start,
		price_end,
		isCustomizable,
		isReadyToShip,
		minOrder,
		maxOrder,
		searchQuery
	} = query;

	return {
		main_category,
		category,
		sub_category,
		sub_sub_category,
		countryId,
		country_of_region: countryName,
		price_start,
		price_end,
		all: (searchQuery || '') as string,
		// is_eco: isEco || main_category ? false : filterBuyEco,
		is_customizable: isCustomizable === 'true' ? true : false,
		is_ready_to_ship: isReadyToShip === 'true' ? true : false,
		// is_live: isLive,
		minimum_order: minOrder,
		maximum_order: maxOrder
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
