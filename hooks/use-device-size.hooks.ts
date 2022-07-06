import { useEffect, useState } from 'react';

const useDeviceSize = () => {
	const [deviceSize, setDeviceSize] = useState<
		'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	>();
	const [deviceWidth, setDeviceWidth] = useState<number>();

	useEffect(() => {
		const width = window.innerWidth;
		setDeviceWidth(width);
		if (width >= 640) {
			setDeviceSize('sm');
		}
		if (width >= 768) {
			setDeviceSize('md');
		}
		if (width >= 1024) {
			setDeviceSize('lg');
		}
		if (width >= 1280) {
			setDeviceSize('xl');
		}
		if (width >= 1536) {
			setDeviceSize('2xl');
		}
	}, []);

	return { deviceSize, deviceWidth };
}; // End of useDeviceSize hook

export default useDeviceSize;
