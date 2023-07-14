import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { BiMessageDetail } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

// components
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import LanguageDropdown from 'components/common/elements/lang-menu';
import NavLink from 'components/common/elements/nav-link';
import Button from 'components/common/form/button';
import SearchBar from 'components/common/search-bar/search-bar';

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
import CartIcon from 'components/common/elements/cart-icon';
import { useMainCategories } from 'hooks/useMainCategories';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { useHomeStore } from 'store/home';

const Header = (props: any) => {
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
	console.log('isEco', isEco);

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

	const drawerHandler = () => {
		setIsOpen((pevState) => !pevState);
	};

	const cartIconAndUsername = (
		<div className="flex items-center justify-end">
			<div
				className={`flex flex-col items-center ${
					isAuth
						? 'md:mt-5s md:mx-4 desktop:mr-[58px] desktop:ml-[90px]'
						: 'md:mx-[38px]s md:mt-5s md:mr-[40.1px] desktop:ml-[111.43px]'
				}`}
			>
				<div className="md:mt-3">
					<CartIcon
						count={totalItemCartItem}
						onClick={() => router.push('/cart')}
						iconClassName={`xl:!w-6 xl:!h-6 ${
							isAuth ? 'md:!w-4 md:!h-4' : '!w-6 !h-6'
						}`}
						countClassName={`xl:!bg-secondary md:!-top-4 lg:!-top-5 ${
							isAuth ? 'md:!bg-transparent' : ''
						}`}
					/>
				</div>

				{/* Name and logout button */}
				{isAuth && (
					<div className="group relative cursor-pointer md:mr-8 xl:mr-14">
						<p
							className="overflow-ellipsis whitespace-nowrap text-xs text-white md:w-[64px] md:text-xs md:leading-[15px] lg:text-[14.41px] lg:leading-[17.57px]"
							onMouseEnter={() => setShowLogout(true)}
						>
							{`Hi, ${customerData.name.substring(0, 10)}`}
						</p>

						<div className="absolute right-0 z-50 hidden w-[200px] bg-accent-primary-main p-2 text-white hover:bg-primary-main group-hover:block md:right-auto">
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
				<div className="md:ml-[6px] md:flex md:h-[46px] lg:h-[61px] xl:h-[76px]">
					<Link
						href={generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyers,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						})}
						// variant="buyer"
						// className="flex flex-col items-center justify-center rounded-none !px-0 !py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary md:mr-[5.56px] md:!h-[45.6px] md:!w-[73px] lg:!mr-[6.57px] lg:!h-[76px] lg:!w-[94.43px] lg:!text-lg lg:leading-[22px]"
						className="md: flex flex-col items-center justify-center border-none bg-cyan text-white outline-none transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary md:mr-[5.56px] md:w-[56.66px] lg:w-[75.62px] xl:w-[94.43px]"
					>
						<div className="relative md:h-[12.04px] md:w-[22px] lg:h-[16.06px] lg:w-[29.36px] xl:h-[20.06px] xl:w-[36.66px] ">
							<ImageWithErrorHandler
								src="/icons/dashboard-icon.png"
								alt=""
								fill={true}
							/>
						</div>
						<p className="md:text-[8px]">{t('common:dashboard')}</p>
					</Link>

					<Link
						href={generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
							action: BUYER_DASHBOARD_ACTIONS.create_rfq,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						})}
						className="flex flex-col items-center rounded-none bg-secondary text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08] md:h-full md:w-[56.66px] lg:w-[75.62px] xl:w-[94.43px]"
					>
						<div className="flex items-center justify-center text-center lg:mt-[12px] xl:mt-[16px]">
							<BiMessageDetail size={25} />
						</div>
						<p className="text-primary-main md:text-[8px] md:leading-[15px]">
							{t('navigation:submit_rfq_text')}
						</p>
					</Link>
				</div>
			) : (
				<div className="flex items-center md:mr-[5.5px]">
					<button
						type="button"
						className="flex flex-col items-center justify-center rounded-sm border bg-transparent text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary md:mr-[5.56px] md:!h-[42px] md:!w-[73px] md:text-[10.8px] md:!font-normal lg:!mr-[9px] lg:!w-[94px] lg:!border-2 lg:!border-secondary lg:!text-lg lg:leading-[22px]"
						onClick={setIsSelectSignUpOpen}
					>
						{t('sign_up_text')}
					</button>
					<Button
						variant="special"
						className="rounded-none !px-0 py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08] md:!h-[42px] md:!w-[73px] md:text-[10.8px] md:!font-normal lg:!w-[94px] lg:!text-lg lg:leading-[22px]"
						onClick={setIsLoginOpen}
					>
						{t('log_in_text')}
					</Button>
				</div>
			)}
		</div>
	);

	return (
		<header
			className={`sticky top-0 z-[10000] hidden w-full md:block md:h-[80px] lg:h-[96px] xl:h-[120px]`}
		>
			<div
				className={`${
					isEco ? 'bg-primary-eco' : 'bg-gradient-to-r to-primary-main'
				} via-accent-primary-mains flex h-[45.6px] w-full  items-center justify-between from-[#37B34A] via-cyan to-primary-main md:pl-[5.4px] lg:h-[61px] lg:pl-[20px] xl:h-[76px] xl:pl-[47px] desktop:pl-[18px]`}
			>
				{/* Tradewinds logo */}
				<Link
					href="/"
					className="relative block md:h-[33.6px] md:w-[121.2px] lg:h-[44.84px] lg:w-[161.76px] xl:h-[56px] xl:w-[202px]"
				>
					<ImageWithErrorHandler
						src="/images/tradewinds-horizontal-logo.svg"
						alt="Logo"
						fill={true}
						className="cursor-pointer"
						onClick={() => {
							removeCategoryFilter();
							removeSelectedCountries();
							if (isEco) {
								setIsEco();
							}
						}}
					/>
				</Link>

				{/* Search Input */}
				<SearchBar placeholder=" " />

				<div>{cartIconAndUsername}</div>
			</div>

			{/* Bottom nav */}
			<div className="flex items-center overflow-hidden bg-[#DEDFE0] md:h-[33px] xl:h-[44px]">
				<div className="bg-errors flex w-full items-center justify-between">
					<div className="flex items-center md:ml-[5.9px]">
						<div
							className="group hidden md:inline-block"
							onMouseEnter={() => setIsMegaMenuOpen(true)}
							onMouseLeave={() => setIsMegaMenuOpen(false)}
						>
							<div className="nav-link flex items-center space-x-1 font-semibold outline-none dark:text-accent-secondary-eco">
								<span>{t('categories_text')} </span>
								<span className="hidden md:inline-block">&gt;</span>
							</div>

							{isMegaMenuOpen && (
								<div className="fixed top-[110px] left-0 right-0 z-[9000000000000]">
									<MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
								</div>
							)}
						</div>

						<nav className="flex items-center">
							<NavLink
								href="/eco"
								className="nav-link flex items-center space-x-1"
								activeClassName="underline font-semibold"
								onClick={() => {
									router.push(`/eco?is_eco=${true}`, undefined, {
										shallow: true
									});

									if (!isEco) {
										setIsEco();
									}
								}}
							>
								<ImageWithErrorHandler
									src="/static/images/eco_logo.png"
									alt="EcoLogo"
									width={13.8}
									height={13.2}
								/>
								<span>{t('eco_text')}</span>
							</NavLink>

							<NavLink
								href="/eco"
								className="nav-link md:hidden"
								activeClassName="underline font-semibold"
								onClick={() => {
									drawerHandler();
								}}
							>
								{t('eco_text')}
							</NavLink>

							<NavLink
								href={
									isEco
										? '/eco/why-sell-on-tradewinds'
										: '/why-sell-on-tradewinds'
								}
								className="nav-link"
								activeClassName="underline font-semibold"
								onClick={drawerHandler}
							>
								{t('why_sell_on_tw_text')}
							</NavLink>

							<NavLink
								href={isEco ? '/eco/why-buy' : '/why-buy'}
								className="nav-link"
								activeClassName="underline font-semibold"
								onClick={drawerHandler}
							>
								{t('why_buy_text')}
							</NavLink>

							<NavLink
								href="/shop-by-country"
								className="nav-link"
								activeClassName="underline font-semibold"
								onClick={drawerHandler}
							>
								{t('search_by_country_text')}
							</NavLink>

							<NavLink
								href="what-is-rfq"
								className="nav-link !border-r-0"
								activeClassName="underline font-semibold"
								onClick={drawerHandler}
							>
								{t('what_is_a_rfq_text')}
							</NavLink>
						</nav>
					</div>

					<div className="relative mr-4">
						<LanguageDropdown />
					</div>
				</div>

				<div className="md:inline-blocks ml-[35px] hidden">
					<Breadcrumbs productName={props.productName} />
				</div>
			</div>
		</header>
	);
};

export default Header;
