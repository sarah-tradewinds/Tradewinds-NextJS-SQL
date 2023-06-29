import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

// components
import CartIcon from '../elements/cart-icon';
import Button from '../form/button';
import SearchBar from '../searh-bar/search-bar';
import MobileHeader from './navbar/mobile-navbar.component';

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
import { useMainCategories } from 'hooks/useMainCategories';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { useHomeStore } from 'store/home';

const ResponsiveHeader = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

	const {
		setIsLoginOpen,
		setIsSelectSignUpOpen,
		isAuth,
		customerData,
		logout
	} = useAuthStore();

	const { isEco, setIsEco } = useHomeStore(({ isEco, setIsEco }) => ({
		isEco,
		setIsEco
	}));

	const removeCategoryFilter = useCategoryStore(
		(state) => state.removeCategoryFilter
	);

	const removeSelectedCountries = useCountriesStore(
		(state) => state.removeSelectedCountries
	);

	const { totalItemCartItem, resetCart } = useCartStore((state) => ({
		totalItemCartItem: state.totalItem,
		resetCart: state.resetCart
	}));

	const { t } = useTranslation('navigation');

	const router = useRouter();
	useMainCategories();

	let classes = `leading-[22px] pt-[11px] bg-white dark:bg-accent-primary-eco md:bg-[#DCDBDB] w-[240px] md:w-full md:h-[58px] slg:h-[59px] lg:h-[58px] md:pl-5 md:pr-4 lg:px-[35px] items-center ${
		!isOpen
			? 'hidden md:block'
			: 'fixed bottom-[51px] top-[50.6px] md:relative md:bottom-0 md:top-0'
	}`;

	const drawerHandler = () => {
		setIsOpen((pevState) => !pevState);
	};

	const cartIconAndUsername = (
		<div className="flex justify-center">
			<div
				className={`${
					isAuth
						? 'tablet:mx-4 tablet:mt-5 desktop:mr-[58px] desktop:ml-[90px]'
						: 'tablet:mx-[38px] tablet:mt-5 desktop:ml-[111.43px]'
				}`}
			>
				<CartIcon
					count={totalItemCartItem}
					onClick={() => router.push('/cart')}
					iconClassName="!text-[20px] tablet:!text-[24px] desktop:!text-[25.16px]"
					countClassName={`block ${
						isAuth
							? '!-top-1 !right-4 tablet:!-top-3 !desktop:-top-0 tablet:!right-2'
							: '!-top-3 tablet:!-top-5'
					}`}
				/>

				{/* Name and logout button */}
				{isAuth && (
					<div className="group relative cursor-pointer tablet:mr-10">
						<p
							className="overflow-ellipsis whitespace-nowrap text-xs text-white lg:!text-lg lg:leading-[22px] tablet:w-[64px] tablet:text-xs tablet:leading-[15px]"
							onMouseEnter={() => setShowLogout(true)}
						>
							{`Hi, ${customerData.name.substring(0, 10)}`}
						</p>

						<div className="absolute right-0 z-50 hidden w-[200px] bg-accent-primary-main p-2 text-white hover:bg-primary-main group-hover:block tablet:right-auto">
							<div
								className="flex cursor-pointer"
								onClick={() => {
									resetCart();
									logout();
									setShowLogout(false);
								}}
							>
								<FiLogOut size={20} className="mr-2" />{' '}
								{t('logout_text')}
							</div>
						</div>
					</div>
				)}
			</div>

			{isAuth ? (
				<div className="hidden tablet:ml-[6px] tablet:flex">
					<Button
						href={generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyers,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						})}
						variant="buyer"
						className="flex flex-col items-center justify-center rounded-none !px-0 !py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary lg:!mr-[6.57px] lg:!h-[76px] lg:!w-[94.43px] lg:!text-lg lg:leading-[22px] tablet:mr-[5.56px] tablet:!h-[70px] tablet:!w-[73px]"
					>
						<AiOutlineDashboard size={35} />
						<p className="tablet:text-[8px]">{t('common:dashboard')}</p>
					</Button>

					<Button
						href={generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
							action: BUYER_DASHBOARD_ACTIONS.create_rfq,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						})}
						variant="special"
						className="flex-col !items-center rounded-none !px-0 py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08] lg:!h-[76px] lg:!w-[94.43px] lg:!text-lg lg:leading-[22px] tablet:!h-[70px] tablet:!w-[73px]"
					>
						<div className="flex items-center justify-center text-center">
							<BiMessageDetail size={25} />
						</div>
						<p className="text-primary-main tablet:text-[8px] tablet:leading-[15px]">
							{t('navigation:submit_rfq_text')}
						</p>
					</Button>
				</div>
			) : (
				<div className="mr-[39px] hidden tablet:flex tablet:items-center">
					<button
						type="button"
						// className="rounded-sm border-[1px] bg-transparent px-5 py-2 text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary"
						className="flex flex-col items-center justify-center rounded-sm border bg-transparent text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary lg:!mr-[9px] lg:!w-[94px] lg:!border-2 lg:!border-secondary lg:!text-lg lg:leading-[22px] tablet:mr-[5.56px] tablet:!h-[42px] tablet:!w-[73px] tablet:!font-normal"
						onClick={setIsSelectSignUpOpen}
					>
						{t('sign_up_text')}
					</button>
					<Button
						variant="special"
						// className="rounded-sm border-[1px] border-secondary bg-secondary px-5 py-2 text-white transition duration-300 ease-in-out hover:border-white hover:bg-transparent"
						className="rounded-none !px-0 py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08] lg:!w-[94px] lg:!text-lg lg:leading-[22px] tablet:!h-[42px] tablet:!w-[73px] tablet:!font-normal"
						onClick={setIsLoginOpen}
					>
						{t('log_in_text')}
					</Button>
				</div>
			)}
		</div>
	);

	return (
		<>
			<MobileHeader />
			<div className="hidden h-[26px] items-center justify-center bg-[#DEDFE0] sm:flex md:hidden">
				<SearchBar placeholder={' '} />
			</div>
		</>
	);
};

export default ResponsiveHeader;
