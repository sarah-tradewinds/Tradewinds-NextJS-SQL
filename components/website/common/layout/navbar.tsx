import dynamic from 'next/dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { BiMessageDetail } from 'react-icons/bi';
import {
	HiOutlineMenuAlt1,
	HiOutlineSearch,
	HiX
} from 'react-icons/hi';
const MegaMenu = dynamic(
	() => import('components/website/home/common/mega-menu/mega-menu')
);

// stores
import CartModal from 'components/website/cart/cart-modal';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { useHomeStore } from 'store/home';
import CartIcon from '../elements/cart-icon';
import LanguageDropdown from '../elements/lang-menu';
import NavLink from '../elements/nav-link';
import Button from '../form/button';
import SearchBar from '../searh-bar/search-bar';

const Header = () => {
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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

	const totalCartCount = useCartStore((state) => state.totalCartCount);

	const [isOpen, setIsOpen] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

	const { t } = useTranslation('navigation');

	const router = useRouter();

	const buttonRef = useRef(null); // useRef<HTMLButtonElement>(null)

	let classes = `bg-white dark:bg-accent-primary-eco md:bg-bg-main sm:h-[40px] h-[100vh] w-[60%] sm:w-full sm:grid sm:place-items-center sm:relative absolute opacity-100 transition-all ease-in-out duration-300 ${
		!isOpen ? 'pc:w-0 pc:opacity-0 pc: overflow-hidden' : ''
	}`;

	const drawerHandler = () => {
		setIsOpen((pevState) => !pevState);
	};

	return (
		<>
			<CartModal
				isOpen={isCartModalOpen}
				onClose={() => setIsCartModalOpen(false)}
			/>
			<header className="sticky top-0 z-[1000] w-full bg-primary-main dark:bg-primary-eco">
				<div
					className="mx-auto flex h-[80px] w-[96%] items-center justify-between"
					onClick={() => setShowLogout(false)}
				>
					<button
						type="button"
						className="flex sm:hidden"
						onClick={drawerHandler}
					>
						{!isOpen ? (
							<HiOutlineMenuAlt1 className="h-6 w-6 text-white" />
						) : (
							<HiX className="h-6 w-6 text-white" />
						)}
					</button>

					{/* Tradewinds logo */}
					<div
						className="relative h-[56px] w-[202px] md:h-[80px] md:w-[100px] lg:h-[56px] lg:w-[202px]"
						id="Logo"
					>
						<Link href="/">
							<a>
								{/* For mobile */}
								<div className="relative hidden h-full w-full md:block lg:hidden">
									<Image
										src="/TW-Create an account page-02.png"
										alt="Logo"
										layout="fill"
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
										layout="fill"
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
							</a>
						</Link>
					</div>

					{/* Search Input */}
					<SearchBar />
					<form
						className="hidden"
						onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
							e.preventDefault();
							const searchTerm = (
								e.currentTarget.elements.namedItem('searchBar') as any
							).value;
							router.push(`/product-search?query=${searchTerm}`);
						}}
					>
						<label
							className="hidden h-[40px] w-[40vw] items-center overflow-hidden rounded-full bg-accent-primary-main transition duration-300 ease-in-out hover:ring-1 hover:ring-accent-primary-main hover:ring-opacity-90 sm:flex lg:w-[48vw]"
							htmlFor="searchBar"
						>
							<input
								type="search"
								id="searchBar"
								name="searchBar"
								placeholder={t('search_product')}
								aria-label="Search"
								className="h-full w-[82%] border-none pl-2 pr-2 outline-none lg:w-[95%] lg:pl-4"
							/>
							<Button
								type="submit"
								className="flex h-6 w-[16%] cursor-pointer justify-center px-0 xl:w-[4%]"
							>
								{/* <HiOutlineSearch className="h-6 w-[16%] cursor-pointer text-center xl:w-[4%]" /> */}
								<HiOutlineSearch className="h-full w-[24px]" />
							</Button>
						</label>
					</form>

					<div>
						<CartIcon
							count={totalCartCount}
							onClick={() => setIsCartModalOpen(true)}
							iconClassName="pc:!text-[24px]"
						/>
						{isAuth && (
							<p
								className="text-white"
								onMouseEnter={() => setShowLogout(true)}
							>
								{`Hi, ${customerData.name.substring(0, 10)}`}
							</p>
						)}
					</div>

					{isAuth ? (
						<div className="hidden items-center justify-center gap-1 sm:flex">
							<div className="rounded-sm bg-transparent px-5 py-2 text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-[#033e6b]">
								{showLogout && (
									<div className="text-gray-700 absolute z-50 mt-3 inline-block w-[200px] bg-[#00AEEF] p-2 pt-3 hover:bg-[#057fac]">
										<div
											className="flex cursor-pointer"
											onClick={() => {
												logout();
												setShowLogout(false);
											}}
										>
											<FiLogOut size={20} className="mr-2" />{' '}
											{t('logout_text')}
										</div>
									</div>
								)}
							</div>

							<div className="flex justify-between space-x-4">
								<Button
									href={generateBuyerDashboardUrl({
										redirect_to: BUYER_DASHBOARD_PAGES.buyers,
										access_key: customerData.access.token,
										refresh_key: customerData.refresh.token
									})}
									variant="buyer"
									className="flex flex-col items-center justify-center rounded-none !px-4 py-3 transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary"
								>
									<AiOutlineDashboard size={35} />
									<p>Dashboard</p>
								</Button>

								<Button
									href={generateBuyerDashboardUrl({
										redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
										action: BUYER_DASHBOARD_ACTIONS.create_rfq,
										access_key: customerData.access.token,
										refresh_key: customerData.refresh.token
									})}
									variant="special"
									className="flex-col rounded-none !px-4 py-4 transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08]"
								>
									<div className="flex items-center justify-center text-center">
										<BiMessageDetail size={35} />
									</div>
									<p className="w-24 text-primary-main">
										{t('navigation:submit_rfq_text')}
									</p>
								</Button>
							</div>
						</div>
					) : (
						<div className="hidden items-center justify-center gap-4 sm:flex">
							<button
								type="button"
								className="rounded-sm border-[1px] bg-transparent px-5 py-2 text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary"
								onClick={setIsSignUpOpen}
							>
								{t('sign_up_text')}
							</button>
							<button
								type="button"
								className="rounded-sm border-[1px] border-secondary bg-secondary px-5 py-2 text-white transition duration-300 ease-in-out hover:border-white hover:bg-transparent"
								onClick={setIsLoginOpen}
							>
								{t('log_in_text')}
							</button>
						</div>
					)}

					{/* Mobile Right Side Icons */}
					<div className="flex gap-3 sm:hidden">
						<HiOutlineSearch className="h-6 w-6 text-white" />
					</div>
				</div>

				{/* Bottom nav */}
				<div className={classes}>
					<div
						className="m-4 flex w-full flex-col justify-between pt-4 sm:mx-auto sm:w-[96%] sm:flex-row sm:pt-0 md:m-0 md:ml-3
        "
					>
						<div className="flex">
							<div
								className="group hidden md:inline-block"
								onMouseEnter={() => setIsMegaMenuOpen(true)}
								onMouseLeave={() => setIsMegaMenuOpen(false)}
							>
								<div className="cursor-pointer font-semibold text-primary-main outline-none dark:text-accent-secondary-eco">
									{t('categories_text')}{' '}
									<span className="hidden md:inline">&gt;</span>
								</div>

								{isMegaMenuOpen && (
									<div className="fixed top-[112px] left-0 right-0 z-[9000000000000]">
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
							</nav>
						</div>

						<div className="relative w-[40px]">
							<LanguageDropdown />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
