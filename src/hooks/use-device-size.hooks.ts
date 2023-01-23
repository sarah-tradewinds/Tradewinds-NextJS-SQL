import { useEffect, useState } from 'react';

const useDeviceSize = () => {
	const [deviceSize, setDeviceSize] = useState<
		'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	>();
	const [deviceWidth, setDeviceWidth] = useState<number>(0);
	const [deviceType, setDeviceType] = useState<
		'mobile' | 'tablet' | 'desktop'
	>('mobile');

	//#Source https://bit.ly/2neWfJ2
	const detectDeviceType = () => {
		return /Android|webOS|iPhone|iPad|iPod|kindle|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
			? 'mobile'
			: 'desktop';
	};

	const handleResize = () => {
		window.addEventListener('resize', () => {
			setDeviceType(detectDeviceType());

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
		}); // End of event Listener
	}; // End of handleResize

	useEffect(() => {
		if (typeof window !== 'undefined') {
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	return { deviceSize, deviceWidth, deviceType };
}; // End of useDeviceSize hook

export default useDeviceSize;
