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
