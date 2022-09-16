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

export const generateListByCount = (count: number) => {
	const list = [];
	for (let i = 0; i <= count; i++) {
		list.push(i);
	}
	return list;
}; // End of generateListByCount

type yAxisAlignment = 'top' | 'center' | 'middle' | 'bottom';
type xAxisAlignment = 'left' | 'center' | 'middle' | 'right';
export const getAlignmentClassName = (
	xAxis: xAxisAlignment,
	yAxis: yAxisAlignment
) => {
	let xAxisAlignmentClassName = 'left-0';
	if (xAxis === 'center' || xAxis === 'middle') {
		xAxisAlignmentClassName = 'left-1/2 transform -translate-x-1/2';
	} else if (xAxis === 'right') {
		xAxisAlignmentClassName = 'right-0';
	}

	let yAxisAlignmentClassName = 'top-0';
	if (yAxis === 'center' || yAxis === 'middle') {
		yAxisAlignmentClassName = 'top-1/2 transform -translate-y-1/2';
	} else if (yAxis === 'bottom') {
		yAxisAlignmentClassName = 'bottom-0';
	}

	return `${xAxisAlignmentClassName} ${yAxisAlignmentClassName}`;
};
