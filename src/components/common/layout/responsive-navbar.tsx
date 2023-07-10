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
import { useMainCategories } from 'hooks/useMainCategories';

const ResponsiveHeader = (props: any) => {
	const { t } = useTranslation('navigation');

	useMainCategories();

	return (
		<>
			<MobileHeader />
			<div className="hidden h-[26px] items-center justify-center bg-[#DEDFE0] sm:flex md:hidden">
				<SearchBar placeholder={' '} />
			</div>

			{/* Desktop navbar */}
			<Header />
		</>
	);
};

export default ResponsiveHeader;
