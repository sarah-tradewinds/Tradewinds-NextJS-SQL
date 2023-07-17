import dynamic from 'next/dynamic';

// Third party packages
import { useTranslation } from 'next-i18next';
import { useHomeStore } from 'store/home';

// components
const MegaMenu = dynamic(
	() => import('components/home/common/mega-menu/mega-menu')
);

// actions
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';

// stores
import NavLink from 'components/common/elements/nav-link';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';

interface SidebarProps {
	isOpen?: boolean;
	onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { isOpen, onClose } = props;
	const { isEco, setIsEco } = useHomeStore(({ isEco, setIsEco }) => ({
		isEco,
		setIsEco
	}));

	const { isAuth, customerData, logout } = useAuthStore((state) => ({
		isAuth: state.isAuth,
		logout: state.logout,
		customerData: state.customerData
	}));

	const resetCart = useCartStore((state) => state.resetCart);

	const { t } = useTranslation('navigation');

	let sidebarClassName =
		'fixed top-[78px] shadow-xl z-10 flex h-[365px] w-[181px] flex-col space-y-4 rounded-r-md bg-white px-2 pt-4 pb-4 transform transition-all duration-300';
	if (isOpen) {
		sidebarClassName = `${sidebarClassName} -translate-x-[22px] opacity-100`;
	} else {
		sidebarClassName = `${sidebarClassName} -translate-x-[224px] opacity-0`;
	}

	return (
		<nav className={sidebarClassName}>
			<NavLink
				href="/categories"
				className="mobile-nav-link"
				activeClassName="underline font-semibold"
				onClick={onClose}
			>
				{t('categories_text')}
			</NavLink>
			<NavLink
				href="/eco"
				className="mobile-nav-link"
				activeClassName="underline font-semibold"
				onClick={onClose}
			>
				{t('eco_text')}
			</NavLink>
			<NavLink
				href={
					isEco
						? '/eco/why-sell-on-tradewinds'
						: '/why-sell-on-tradewinds'
				}
				className="mobile-nav-link"
				activeClassName="underline font-semibold"
				onClick={onClose}
			>
				{t('why_sell_on_tw_text')}
			</NavLink>

			<NavLink
				href={isEco ? '/eco/why-buy' : '/why-buy'}
				className="mobile-nav-link"
				activeClassName="underline font-semibold"
				onClick={onClose}
			>
				{t('why_buy_text')}
			</NavLink>

			<NavLink
				href="/shop-by-country"
				className="mobile-nav-link"
				activeClassName="underline font-semibold"
				onClick={onClose}
			>
				{t('search_by_country_text')}
			</NavLink>

			<NavLink
				href="what-is-rfq"
				className="mobile-nav-link"
				activeClassName="underline font-semibold"
				onClick={onClose}
			>
				{t('what_is_a_rfq_text')}
			</NavLink>

			<div className="flex w-full flex-col space-y-4">
				<NavLink
					href={generateBuyerDashboardUrl({
						redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
						action: BUYER_DASHBOARD_ACTIONS.create_rfq,
						access_key: customerData.access.token,
						refresh_key: customerData.refresh.token
					})}
					className="mobile-nav-link"
					activeClassName="underline font-semibold"
					onClick={onClose}
				>
					{t('dashboard')}
				</NavLink>

				{isAuth && (
					<NavLink
						className="mobile-nav-link border-b-0 capitalize"
						activeClassName="capitalize underline font-semibold"
						onClick={() => {
							logout();
							resetCart();
							onClose?.();
						}}
					>
						{t('logout')}
					</NavLink>
				)}
			</div>
		</nav>
	);
};

export default Sidebar;
