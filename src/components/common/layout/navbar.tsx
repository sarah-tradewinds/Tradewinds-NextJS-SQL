import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';

// components
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import CartIcon from '../elements/cart-icon';
import LanguageDropdown from '../elements/lang-menu';
import NavLink from '../elements/nav-link';
import Button from '../form/button';
import SearchBar from '../searh-bar/search-bar';
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
import { MdClose, MdMenu } from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { useHomeStore } from 'store/home';
import ImageWithErrorHandler from '../elements/image-with-error-handler';

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
						? 'md:mx-4 md:mt-5 desktop:mr-[58px] desktop:ml-[90px]'
						: 'md:mx-[38px] md:mt-5 desktop:ml-[111.43px]'
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
				<div className="hidden md:flex tablet:ml-[6px]">
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
						<p className="md:text-[8px]">{t('common:dashboard')}</p>
					</Button>

					<Button
						href={generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
							action: BUYER_DASHBOARD_ACTIONS.create_rfq,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						})}
						variant="special"
						className="flex-col !items-center rounded-none !px-0 py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08] md:!h-[70px] md:!w-[73px] lg:!h-[76px] lg:!w-[94.43px] lg:!text-lg lg:leading-[22px]"
					>
						<div className="flex items-center justify-center text-center">
							<BiMessageDetail size={25} />
						</div>
						<p className="text-primary-main md:text-[8px] md:leading-[15px]">
							{t('navigation:submit_rfq_text')}
						</p>
					</Button>
				</div>
			) : (
				<div className="mr-[39px] hidden md:flex md:items-center">
					<button
						type="button"
						// className="rounded-sm border-[1px] bg-transparent px-5 py-2 text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary"
						className="flex flex-col items-center justify-center rounded-sm border bg-transparent text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary md:mr-[5.56px] md:!h-[42px] md:!w-[73px] md:!font-normal lg:!mr-[9px] lg:!w-[94px] lg:!border-2 lg:!border-secondary lg:!text-lg lg:leading-[22px]"
						onClick={setIsSelectSignUpOpen}
					>
						{t('sign_up_text')}
					</button>
					<Button
						variant="special"
						// className="rounded-sm border-[1px] border-secondary bg-secondary px-5 py-2 text-white transition duration-300 ease-in-out hover:border-white hover:bg-transparent"
						className="rounded-none !px-0 py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08] md:!h-[42px] md:!w-[73px] md:!font-normal lg:!w-[94px] lg:!text-lg lg:leading-[22px]"
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
			className={`sticky top-0 z-[10000] h-[50.07px] w-full md:h-[111px] lg:h-[119.68px] ${
				isEco
					? 'bg-primary-eco'
					: 'bg-gradient-to-r from-success via-accent-primary-main to-primary-main'
				// :'bg-primary-main'
			}`}
		>
			<div className="h-full">
				<div
					className="md:px-auto flex h-full items-center justify-between px-[21.46px] md:h-[70px] md:px-0 lg:h-[76px]"
					onClick={() => setShowLogout(false)}
				>
					{/* Menu icon */}
					<button
						type="button"
						className="flex md:hidden"
						onClick={drawerHandler}
					>
						{!isOpen ? (
							<MdMenu className="h-5 w-5 text-white" />
						) : (
							<MdClose className="h-5 w-5 text-white" />
						)}
					</button>

					{/* Tradewinds logo */}
					<div
						className={`md:mt-[6px] md:mb-[7.44] lg:mr-[112px] lg:h-[56px] lg:w-[202px] ${
							isAuth ? 'md:ml-8' : 'ml-8 md:mr-[24.51px] md:ml-5'
						}`}
					>
						<div
							className="relative h-[28px] w-[101px] md:h-[57px] md:w-[69.49px] lg:h-[56px] lg:w-[202px]"
							id="logo"
						>
							<Link href="/">
								{/* For mobile and medium*/}
								<div className="relative hidden h-full w-full md:block lg:hidden">
									<ImageWithErrorHandler
										src="/tradewind-logo.png"
										alt="Logo"
										fill={true}
										className="cursor-pointer"
										onClick={() => {
											if (isEco) {
												setIsEco();
											}
										}}
									/>
								</div>

								{/* For desktop */}
								<div className="md:hidden lg:block">
									<ImageWithErrorHandler
										src="/static/images/tradewinds_logo.png"
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
								</div>
							</Link>
						</div>
					</div>

					{/* Search Input */}
					<div className="hidden md:block">
						<SearchBar />
					</div>

					{/* Mobile Right Search Icons for mobile only */}
					<div className="flex items-center md:mr-4 md:hidden">
						<HiOutlineSearch className="mr-4 h-4 w-4 text-white md:h-6 md:w-6" />
						{cartIconAndUsername}
					</div>

					{/* Cart Icon and Login user name */}
					<div className="hidden md:block">{cartIconAndUsername}</div>
				</div>

				{/* Bottom nav */}
				<div className={classes}>
					<div className="m-4s flex w-full flex-col justify-between p-4 md:flex-row md:items-center md:p-0">
						<div className="flex md:items-center">
							<div
								className="group hidden md:inline-block"
								onMouseEnter={() => setIsMegaMenuOpen(true)}
								onMouseLeave={() => setIsMegaMenuOpen(false)}
							>
								<div className="flex cursor-pointer items-center space-x-1 font-semibold text-primary-main outline-none dark:text-accent-secondary-eco md:text-xs md:leading-[15px] lg:text-[18px] lg:leading-[22px]">
									<span>{t('categories_text')} </span>
									<span className="hidden md:inline-block">&gt;</span>
								</div>

								{isMegaMenuOpen && (
									<div className="fixed top-[110px] left-0 right-0 z-[9000000000000]">
										<MegaMenu
											onClose={() => setIsMegaMenuOpen(false)}
										/>
									</div>
								)}
							</div>

							<nav className="flex w-full cursor-pointer flex-col items-start justify-start md:flex-row md:items-center md:divide-x">
								<NavLink
									href="/eco"
									className="nav-link hidden items-center justify-center gap-2 md:flex"
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
										width={20}
										height={20}
									/>
									{t('eco_text')}
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
									href="/why-sell-on-tradewinds"
									className="nav-link"
									activeClassName="underline font-semibold"
									onClick={drawerHandler}
								>
									{t('why_sell_on_tw_text')}
								</NavLink>

								<NavLink
									href="/why-buy"
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
									className="nav-link"
									activeClassName="underline font-semibold"
									onClick={drawerHandler}
								>
									{t('what_is_a_rfq_text')}
								</NavLink>

								{/* For mobile only */}
								<div className="flex w-full flex-col space-y-4 sm:hidden">
									<NavLink
										href={generateBuyerDashboardUrl({
											redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
											action: BUYER_DASHBOARD_ACTIONS.create_rfq,
											access_key: customerData.access.token,
											refresh_key: customerData.refresh.token
										})}
										className="nav-link"
										activeClassName="underline font-semibold"
										onClick={drawerHandler}
									>
										{t('dashboard')}
									</NavLink>

									<NavLink
										href="/"
										className="nav-link border-0"
										activeClassName="capitalize underline font-semibold"
										onClick={() => {
											logout();
											resetCart();
											drawerHandler();
										}}
									>
										{t('logout')}
									</NavLink>
								</div>
							</nav>
						</div>

						<div className="relative">
							<LanguageDropdown />
						</div>
					</div>

					<div className="ml-[35px] hidden md:inline-block">
						<Breadcrumbs productName={props.productName} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
