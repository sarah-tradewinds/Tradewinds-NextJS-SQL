import dynamic from 'next/dynamic';
import Image from 'next/image';
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
import { useCartStore } from 'store/cart-store';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { useHomeStore } from 'store/home';

const Header = () => {
	const {
		setIsLoginOpen,
		setIsSignUpOpen,
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

	const { cartProducts, resetCartState } = useCartStore((state) => ({
		cartProducts: state.cartProducts,
		resetCartState: state.resetCartState
	}));

	const [isOpen, setIsOpen] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

	const { t } = useTranslation('navigation');

	const router = useRouter();
	useMainCategories();

	// let classes = `bg-white dark:bg-accent-primary-eco md:bg-bg-main sm:h-[40px] h-[100vh] w-[60%] sm:w-full sm:grid sm:place-items-center sm:relative absolute opacity-100 transition-all ease-in-out duration-300 md:h-[41px] ${
	//  !isOpen ? 'pc:w-0 pc:opacity-0 pc:overflow-hidden' : ''
	// }`;

	let classes = `bg-white dark:bg-accent-primary-eco md:bg-[#DCDBDB] w-[180.97px] md:w-full md:h-[41px] lg:h-[43.68px] md:pl-5 md:pr-4 lg:px-[35px] md:flex items-center ${
		!isOpen
			? 'pc:w-0 pc:opacity-0 pc:overflow-hidden'
			: 'fixed bottom-[51px] top-[50.6px]'
	}`;

	const drawerHandler = () => {
		setIsOpen((pevState) => !pevState);
	};

	const cartIconAndUsername = (
		<div className="flex justify-center">
			<div
				className={`${
					isAuth
						? 'md:mx-4 md:mt-5 lg:mr-[58px] lg:ml-[111.1px]'
						: 'md:mx-[38px] md:mt-5 lg:ml-[111.43px]'
				}`}
			>
				<CartIcon
					count={cartProducts?.length || 0}
					onClick={() => router.push('/cart')}
					iconClassName="text-[11.74px] md:text-[19px] lg:text-[25.16px]"
					countClassName={`hidden md:block ${
						isAuth ? 'md:!-top-3 !lg:-top-0 !right-2' : ''
					}`}
				/>

				{/* Name and logout button */}
				{isAuth && (
					<div className="group relative cursor-pointer">
						<p
							className="overflow-ellipsis whitespace-nowrap text-white md:w-[64px] md:text-xs md:leading-[15px] lg:!text-lg lg:leading-[22px]"
							onMouseEnter={() => setShowLogout(true)}
						>
							{`Hi, ${customerData.name.substring(0, 10)}`}
						</p>

						<div className="absolute right-0 z-50 hidden w-[200px] bg-accent-primary-main p-2 text-white hover:bg-primary-main group-hover:block md:right-auto">
							<div
								className="flex cursor-pointer"
								onClick={() => {
									resetCartState();
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
				<div className="hidden md:ml-[6px] md:flex">
					<Button
						href={generateBuyerDashboardUrl({
							redirect_to: BUYER_DASHBOARD_PAGES.buyers,
							access_key: customerData.access.token,
							refresh_key: customerData.refresh.token
						})}
						variant="buyer"
						className="flex flex-col items-center justify-center rounded-none !px-0 !py-0 transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary md:mr-[5.56px] md:!h-[70px] md:!w-[73px] lg:!mr-[6.57px] lg:!h-[76px] lg:!w-[94.43px] lg:!text-lg lg:leading-[22px]"
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
						onClick={setIsSignUpOpen}
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
			className={`sticky top-0 z-[10000] h-[50.6px] w-full md:h-[111px] lg:h-[119.68px] ${
				isEco
					? 'bg-primary-eco'
					: 'bg-gradient-to-r from-success via-accent-primary-main to-primary-main'
			}`}
		>
			{/* <div className="2xl:container 2xl:mx-auto"> */}
			<div className="h-full">
				<div
					className="mx-autos md:px-auto flex h-[50.6px] items-center justify-between px-[21.46px] md:h-[70px] md:px-0 lg:h-[76px]"
					onClick={() => setShowLogout(false)}
				>
					{/* Menu icon */}
					<button
						type="button"
						className="flex md:hidden"
						onClick={drawerHandler}
					>
						{!isOpen ? (
							<MdMenu className="h-6 w-6 text-white" />
						) : (
							<MdClose className="h-6 w-6 text-white" />
						)}
					</button>

					{/* Tradewinds logo */}
					<div
						className={`md:mt-[6px] md:mb-[7.44] md:ml-[17px] lg:mr-[112px] lg:h-[56px] lg:w-[202px] ${
							isAuth ? '' : 'md:mr-[24.51px]'
						}`}
					>
						<div
							className="relative h-[28px] w-[101px] md:h-[57px] md:w-[69.49px] lg:h-[56px] lg:w-[202px]"
							id="logo"
						>
							<Link href="/">
								{/* For mobile and medium*/}
								<div className="relative hidden h-full w-full md:block lg:hidden">
									<Image
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
									<Image
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
					<SearchBar />

					{/* Mobile Right Search Icons */}
					<div className="flex items-center md:mr-4 md:hidden">
						{/* <HiOutlineSearch className="h-[7.9px] w-[7.37px] text-white md:h-6 md:w-6" /> */}
						<HiOutlineSearch className="mr-4 h-4 w-4 text-white md:h-6 md:w-6" />
						{cartIconAndUsername}
					</div>

					{/* Cart Icon and Login user name */}
					<div className="hidden md:block">{cartIconAndUsername}</div>
				</div>

				{/* Bottom nav */}
				<div className={classes}>
					<div
						// className="m-4 flex w-full flex-col justify-between pt-4 sm:mx-auto sm:w-[96%] sm:flex-row sm:pt-0 md:m-0 md:ml-3"
						className="m-4 flex w-full flex-col justify-between pt-4 md:m-0 md:flex-row md:items-center md:pt-0"
					>
						<div className="flex">
							<div
								className="group hidden md:inline-block"
								onMouseEnter={() => setIsMegaMenuOpen(true)}
								onMouseLeave={() => setIsMegaMenuOpen(false)}
							>
								<div className="cursor-pointer font-semibold text-primary-main outline-none dark:text-accent-secondary-eco md:text-xs md:leading-[15px] md:text-[#575858] lg:text-[18px] lg:leading-[22px]">
									{t('categories_text')}{' '}
									<span className="hidden md:inline">&gt;</span>
								</div>

								{isMegaMenuOpen && (
									<div className="fixed top-[110px] left-0 right-0 z-[9000000000000]">
										<MegaMenu
											onClose={() => setIsMegaMenuOpen(false)}
										/>
									</div>
								)}
							</div>

							<nav className="flex cursor-pointer flex-col items-start justify-start md:flex-row md:divide-x">
								<NavLink
									href="/eco"
									className="nav-link hidden items-center justify-center gap-2 md:flex"
									activeClassName="underline font-semibold"
								>
									<Image
										src="/static/images/eco_logo.png"
										alt="EcoLogo"
										width={20}
										height={20}
										className=""
									/>
									{t('eco_text')}
								</NavLink>

								<NavLink
									href="/eco"
									className="nav-link md:hidden"
									activeClassName="underline font-semibold"
									onClick={drawerHandler}
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
											resetCartState();
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
				</div>
			</div>
		</header>
	);
};

export default Header;
