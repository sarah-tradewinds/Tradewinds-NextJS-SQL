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
