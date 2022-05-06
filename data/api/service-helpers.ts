const BASE_URL =
	'https://tradewinds-dev.eastus.cloudapp.azure.com/services/api';

const fetchService = async (
	url: any,
	options: any,
	multipart = false
) => {
	try {
		let optionsModified = options.Authorization
			? {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json; charset=utf-8',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods':
							'GET, POST, OPTIONS, PUT, PATCH, DELETE',
						'Access-Control-Allow-Headers':
							'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
						Authorization: options.Authorization
					}
			  }
			: {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json; charset=utf-8',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods':
							'GET, POST, OPTIONS, PUT, PATCH, DELETE',
						'Access-Control-Allow-Headers':
							'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
					}
			  };

		if (options && options.method === 'post') {
			if (multipart) {
				optionsModified = {
					...options,
					body: options?.body || {}
				};
			} else {
				optionsModified = {
					...options,
					...optionsModified,
					body: JSON.stringify(options?.body || {})
				};
			}
		} else {
			optionsModified = { ...options, ...optionsModified };
		}

		return fetch(`${BASE_URL}${url}`, optionsModified as any)
			.then((result) => {
				return handleResponse(result, false);
			})
			.catch((err) => {
				// console.log('Error in fetch', err);
				// const currentWindow = window.location.href;
				// window.location.replace(
				//   `/error?type=no_connection&redirecturl=${currentWindow}`
				// );
				return { success: false, message: 'Internal server error' };
			});
	} catch (e) {
		new Promise((_, reject) =>
			reject(new Error('Unable to Process Request'))
		);
	}
};

const handleResponse = (response: any, isLogin: boolean) => {
	const contentType = response.headers.get('content-type');
	if (contentType && contentType.indexOf('application/json') !== -1) {
		return Promise.resolve(response.json())
			.then((data) => {
				if (response.status === 401 && !isLogin) {
					const currentWindow = window.location.href;
					// window.location.replace(`/?redirecturl=${currentWindow}`);
				}
				return data;
			})
			.catch((error) => {
				console.error('handleResponse.json.Error:', error);
			});
	} else {
		return Promise.resolve(response.text())
			.then((text) => {
				return text;
			})
			.catch((error) => {
				console.error('handleResponse.text.Error:', error);
			});
	}
};

export default fetchService;
