import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface EventStateProps {
	routeChangeStart: boolean;
	routeChangeComplete: boolean;
	routeChangeError: boolean;
}

const initialData = {
	routeChangeStart: false,
	routeChangeComplete: false,
	routeChangeError: false
};

const useRouteEvent = () => {
	const [routeChangeEventState, setRouteChangeEventState] =
		useState<EventStateProps>(initialData);

	const { events } = useRouter();

	useEffect(() => {
		const setInitialData = () => {
			setRouteChangeEventState(initialData);
		}; // End of setInitialData

		events.on('routeChangeStart', (url, data) => {
			setRouteChangeEventState((prevState) => ({
				...prevState,
				routeChangeStart: true,
				routeChangeComplete: false,
				routeChangeError: false
			}));
		});

		events.on('routeChangeComplete', (url, data) => {
			setRouteChangeEventState((prevState) => ({
				...prevState,
				routeChangeStart: false,
				routeChangeComplete: true
			}));
		});

		events.on('routeChangeError', (url, data) => {
			setRouteChangeEventState((prevState) => ({
				...prevState,
				routeChangeStart: false,
				routeChangeError: true
			}));
		});

		() => {
			events.off('routeChangeStart', setInitialData);
			events.off('routeChangeComplete', setInitialData);
			events.off('routeChangeError', setInitialData);
		};
	}, []);

	return { ...routeChangeEventState };
}; // End of useDeviceSize hook

export default useRouteEvent;
