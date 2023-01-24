import { useEffect, useState } from 'react';

const useDeviceSize = () => {
	const [deviceSize, setDeviceSize] = useState<
		'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	>();
	const [deviceWidth, setDeviceWidth] = useState<number>(0);
	const [deviceType, setDeviceType] = useState<
		'mobile' | 'tablet' | 'desktop'
	>('mobile');

	const hasWindow = typeof window !== 'undefined';

	const getWindowDimensions = () => {
		const width = hasWindow ? window.innerWidth : 0;
		const height = hasWindow ? window.innerHeight : 0;
		return {
			width,
			height
		};
	}; // End of getWindowDimensions

	//#Source https://bit.ly/2neWfJ2
	const detectDeviceType = () => {
		return /Android|webOS|iPhone|iPad|iPod|kindle|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
			? 'mobile'
			: 'desktop';
	};

	const handleResize = () => {
		setDeviceType(detectDeviceType());

		const { width } = getWindowDimensions();
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
	}; // End of handleResize

	useEffect(() => {
		if (hasWindow) {
			handleResize();
		}
	}, []);

	useEffect(() => {
		if (hasWindow) {
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [hasWindow]);

	return { deviceSize, deviceWidth, deviceType };
}; // End of useDeviceSize hook

export default useDeviceSize;
