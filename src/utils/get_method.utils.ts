export const getHttpMethod = (method: string) => {
	let httpMethod: 'get' | 'post' | 'put' | 'delete' = 'get';

	switch (method.toUpperCase()) {
		case 'GET':
			return (httpMethod = 'get');
		case 'POST':
			return (httpMethod = 'post');
		case 'PATCH':
			return (httpMethod = 'patch');
		case 'PUT':
			return (httpMethod = 'put');
		case 'DELETE':
			return (httpMethod = 'delete');
	}

	return httpMethod;
}; // End of getHttpMethod function
