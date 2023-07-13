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
import { MdClose, MdMenu } from 'react-icons/md';

// components
const Sidebar = dynamic(() => import('./sidebar.component'));

// actions
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';

// stores
import CartIcon from 'components/common/elements/cart-icon';
import Button from 'components/common/form/button';
import { useMainCategories } from 'hooks/useMainCategories';
import Image from 'next/image';

import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';
import { useHomeStore } from 'store/home';

const MobileHeader = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showLogout, setShowLogout] = useState(false);

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

	const drawerHandler = () => {
		setIsOpen((pevState) => !pevState);
	};

	const cartIconAndUsername = (
		<div className="flex justify-center ">
			<div
				className={`${
					isAuth
						? 'md:mx-4 md:mt-5 desktop:mr-[58px] desktop:ml-[90px]'
						: 'mt-2 md:mx-[38px] md:mt-5 desktop:ml-[111.43px]'
				}`}
			>
				<CartIcon
					count={totalItemCartItem}
					onClick={() => router.push('/cart')}
					iconClassName="!text-[20px] md:!text-[24px]"
					countClassName={`${
						isAuth
							? '!-top-1 !right-4 md:!-top-3 !desktop:-top-0 md:!right-2'
							: '!-top-3 md:!-top-5'
					}`}
				/>

				{/* Name and logout button */}
				{isAuth && (
					<div className="group relative cursor-pointer md:mr-10">
						<p
							className="overflow-ellipsis whitespace-nowrap text-xs text-white md:w-[64px] md:text-xs md:leading-[15px] lg:!text-lg lg:leading-[22px]"
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
						className="flex flex-col items-center justify-center rounded-sm border bg-transparent text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary md:mr-[5.56px] md:!h-[42px] md:!w-[73px] md:!font-normal lg:!mr-[9px] lg:!w-[94px] lg:!border-2 lg:!border-secondary lg:!text-lg lg:leading-[22px]"
						onClick={setIsSelectSignUpOpen}
					>
						{t('sign_up_text')}
					</button>
					<Button
						variant="special"
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
		<header className="sticky top-0 z-[10000] flex h-[50.06px] w-full items-center justify-between bg-gradient-to-r from-[#37B34A] via-cyan to-primary-main px-5 dark:bg-primary-eco md:hidden">
			{/* Menu icon */}
			<button
				type="button"
				className="flex md:ml-4 md:hidden"
				onClick={drawerHandler}
			>
				{!isOpen ? (
					<MdMenu className="h-5 w-5 text-white" />
				) : (
					<MdClose className="h-5 w-5 text-white" />
				)}
			</button>
			{/* Tradewinds logo */}
			<Link
				href="/"
				className="relative mx-10 block h-[28px] w-[101px]"
			>
				<Image
					src="/images/tradewinds-horizontal-logo.svg"
					alt="Logo"
					fill={true}
					onClick={() => {
						if (isEco) {
							setIsEco();
						}
					}}
				/>
			</Link>
			{/* Search Icon and Cart Icon */}
			<div className="flex items-center">
				<HiOutlineSearch className="mr-[19.66px] h-4 w-4 text-white sm:hidden" />
				{cartIconAndUsername}
			</div>

			{/* Sidebar */}
			<Sidebar isOpen={isOpen} onClose={drawerHandler} />
		</header>
	);
};

export default MobileHeader;
