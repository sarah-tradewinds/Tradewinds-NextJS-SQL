import dynamic from 'next/dynamic';

import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
	HiOutlineMenuAlt1,
	HiOutlineSearch,
	HiOutlineShoppingCart,
	HiX
} from 'react-icons/hi';
const MegaMenu = dynamic(
	() => import('components/website/home/common/mega-menu/mega-menu')
);

// stores
import { useRouter } from 'next/router';
import {
	AiOutlineDashboard,
	AiOutlineShoppingCart
} from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from 'store/auth';

const Header = () => {
	const authStore = useAuthStore();
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const [showLogout, setShowLogout] = useState(false);
	const [userData, setUserData] = useState({
		userId: '',
		firstName: '',
		lastName: ''
	});
	const buttonRef = useRef(null); // useRef<HTMLButtonElement>(null)

	let classes = `bg-white dark:bg-accent-primary-eco md:bg-bg-main sm:h-[40px] h-[100vh] w-[60%] sm:w-full sm:grid sm:place-items-center sm:relative absolute opacity-100 transition-all ease-in-out duration-300 ${
		!isOpen ? 'pc:w-0 pc:opacity-0 pc: overflow-hidden' : ''
	}`;

	useEffect(() => {
		setUserData({
			firstName: localStorage.getItem('tw-firstName') || '',
			lastName: localStorage.getItem('tw-lastName') || '',
			userId: localStorage.getItem('tw-userId') || ''
		});
	}, []);

	const drawerHandler = () => {
		setIsOpen((pevState) => !pevState);
	};

	const onHover = (
		isOpen: boolean,
		action: 'onMouseEnter' | 'onMouseLeave',
		location: 'button' | 'menu'
	) => {
		console.log('Mega-menu button clicked', isOpen, action, location);
		if (!isOpen && action === 'onMouseEnter') {
			(buttonRef?.current as any)?.click();
		}
		if (isOpen && action === 'onMouseLeave' && location === 'menu') {
			(buttonRef?.current as any)?.click();
		}
	};

	return (
		<header className="sticky top-0 z-[1000] w-full bg-primary-main dark:bg-primary-eco">
			<div
				className="mx-auto flex h-[50px] w-[96%] items-center justify-between sm:h-[80px]"
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
				<div
					className="relative h-[28px] w-[101px] sm:h-[56px] sm:w-[202px]"
					id="Logo"
				>
					<Link href="/">
						<a>
							<Image
								src="/static/images/tradewinds_logo.png"
								alt="Logo"
								layout="fill"
								className="cursor-pointer"
							/>
						</a>
					</Link>
				</div>

				<label
					className="hidden h-[40px] w-[40vw] items-center overflow-hidden rounded-full bg-accent-primary-main transition duration-300 ease-in-out hover:ring-1 hover:ring-accent-primary-main hover:ring-opacity-90 sm:flex lg:w-[56vw]"
					htmlFor="searchBar"
				>
					<input
						type="search"
						id="searchBar"
						placeholder="Product Search Placeholder"
						aria-label="Search"
						className="h-full w-[82%] border-none pl-2 pr-2 outline-none lg:w-[95%] lg:pl-4"
						// className="h-8 w-[95%] border-none pl-4 outline-none"
					/>
					<HiOutlineSearch className="h-6 w-[16%] cursor-pointer text-center text-white xl:w-[4%]" />
				</label>

				{userData?.userId ? (
					<div className="hidden items-center justify-center gap-1 sm:flex">
						<div className="rounded-sm bg-transparent px-5 py-2 text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-[#033e6b]">
							<div className="flex items-center justify-center text-center">
								<AiOutlineShoppingCart size={35} />
							</div>
							<div
								className="w-[100%]"
								onMouseEnter={() => setShowLogout(true)}
							>
								{`Hi, ${userData?.firstName}`}
							</div>

							{showLogout && (
								<div className="text-gray-700 absolute z-50 mt-3 inline-block w-[200px] bg-[#00AEEF] p-2 pt-3 hover:bg-[#057fac]">
									<div
										className="flex cursor-pointer"
										onClick={() => {
											localStorage.removeItem('tw-userId');
											setShowLogout(false);
											router.reload();
										}}
									>
										<FiLogOut size={20} className="mr-2" /> Logout
									</div>
								</div>
							)}
						</div>
						<div className=" items-center justify-center rounded-sm bg-transparent bg-[#00AEEF] px-5 py-2 text-center text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary">
							<div className="flex  items-center justify-center text-center">
								<AiOutlineDashboard size={35} />
							</div>
							<div className="w-[100%]">Dashboard</div>
						</div>
						<div className=" items-center justify-center rounded-sm  bg-secondary px-5 py-2 text-center text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-[#e48f08]">
							<div className="flex  items-center justify-center text-center">
								<BiMessageDetail size={35} />
							</div>
							<div className="w-[100%]">Submit RFQ</div>
						</div>
					</div>
				) : (
					<div className="hidden items-center justify-center gap-4 sm:flex">
						<button
							type="button"
							className="rounded-sm border-[1px] bg-transparent px-5 py-2 text-white transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary"
							onClick={authStore.setIsSignUpOpen}
						>
							Sign Up
						</button>
						<button
							type="button"
							className="rounded-sm border-[1px] border-secondary bg-secondary px-5 py-2 text-white transition duration-300 ease-in-out hover:border-white hover:bg-transparent"
							onClick={authStore.setIsLoginOpen}
						>
							Log In
						</button>
					</div>
				)}

				{/* Mobile Right Side Icons */}
				<div className="flex gap-3 sm:hidden">
					<HiOutlineShoppingCart className="h-6 w-6 text-white" />
					<HiOutlineSearch className="h-6 w-6 text-white" />
				</div>
			</div>

			<div className={classes}>
				<div
					className="m-4 flex w-full flex-col pt-4 sm:mx-auto sm:w-[96%] sm:flex-row sm:pt-0 md:m-0 md:ml-3
        "
				>
					<Popover className="relative hidden md:inline-block">
						{(options: any) => {
							console.log('options', options);
							return (
								<>
									<Popover.Button
										ref={buttonRef}
										onMouseEnter={() =>
											onHover(options?.open, 'onMouseEnter', 'button')
										}
										onMouseLeave={() =>
											onHover(options?.open, 'onMouseLeave', 'button')
										}
										className="font-semibold text-primary-main outline-none dark:text-accent-secondary-eco"
									>
										Categories{' '}
										<span className="hidden md:inline">&gt;</span>
									</Popover.Button>

									<Transition
										enter="transition duration-100 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
									>
										<Popover.Panel
											className="fixed left-0 right-0 z-10 mt-2 bg-secondary"
											onMouseEnter={() =>
												onHover(options?.open, 'onMouseEnter', 'menu')
											}
											onMouseLeave={() =>
												onHover(options?.open, 'onMouseLeave', 'menu')
											}
										>
											<MegaMenu />
										</Popover.Panel>
									</Transition>
								</>
							);
						}}
					</Popover>

					<nav className="flex cursor-pointer flex-col items-start justify-start md:flex-row md:divide-x">
						<Link href="/eco">
							<a
								className="nav-link hidden items-center justify-center gap-2 md:flex"
								id="bg-eco"
							>
								<Image
									src="/static/images/eco_logo.png"
									alt="EcoLogo"
									width={20}
									height={20}
									className=""
								/>
								Eco
							</a>
						</Link>

						<Link href="/eco">
							<a
								className="nav-link md:hidden"
								id="bg-eco"
								onClick={drawerHandler}
							>
								Eco
							</a>
						</Link>
						<Link href="/why-sell-on-tradewinds">
							<a onClick={drawerHandler} className="nav-link">
								Why Sell on TW?
							</a>
						</Link>

						<Link href="/why-buy">
							<a onClick={drawerHandler} className="nav-link">
								Why Buy?
							</a>
						</Link>

						<Link href="/search-by-country">
							<a onClick={drawerHandler} className="nav-link">
								Search by Country
							</a>
						</Link>

						<Link href="what-is-rfq">
							<a onClick={drawerHandler} className="nav-link">
								What is a RFQ?
							</a>
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
