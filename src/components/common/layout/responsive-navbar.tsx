import dynamic from 'next/dynamic';

// Third party packages
import { useTranslation } from 'next-i18next';

// components
const MobileHeader = dynamic(
	() => import('./navbar/mobile-navbar.component')
);
const Header = dynamic(() => import('./navbar/navbar.component'));
const SearchBar = dynamic(
	() => import('components/common/search-bar/search-bar')
);

// stores
import useDeviceSize from 'hooks/use-device-size.hooks';
import { useMainCategories } from 'hooks/useMainCategories';

const ResponsiveHeader = (props: any) => {
	const { t } = useTranslation('navigation');
	const { deviceWidth } = useDeviceSize();

	useMainCategories();

	return (
		<>
			{deviceWidth < 768 && <MobileHeader />}
			{deviceWidth >= 640 && (
				<div className="hidden h-[26px] items-center justify-center bg-[#DEDFE0] sm:flex md:hidden">
					<SearchBar placeholder={' '} />
				</div>
			)}
			{/* Desktop navbar */}
			{deviceWidth >= 768 && <Header />}
		</>
	);
};

export default ResponsiveHeader;
