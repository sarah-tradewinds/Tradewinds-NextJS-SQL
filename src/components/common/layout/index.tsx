import dynamic from 'next/dynamic';
import Link from 'next/link';

// Third party packages

// components
const Login = dynamic(() => import('../auth/login'));
const SignUpPage = dynamic(() => import('../auth/signup'));
// import Login from '../auth/login';
// import SignUpPage from '../auth/signup';
import Footer from './footer';
import NavBar from './navbar';

// icons
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import useRouteEvent from 'hooks/use-route-event.hooks';
import Image from 'next/image';
import { useEffect } from 'react';
import { BsSliders } from 'react-icons/bs';
import { IoSpeedometerOutline } from 'react-icons/io5';
import {
	MdOutlineHome,
	MdOutlineMessage,
	MdPerson
} from 'react-icons/md';

import ProductFilterSlider from 'components/product-search/product-filter-mobile/product-filter-slider';
import { getAddresses } from 'lib/customer/addres.lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';
import { useHomeStore } from 'store/home';
import Loader from '../elements/loader/loader';
import Button from '../form/button';
import Seo from '../seo';

const Layout: React.FC<{ seo: any }> = (props) => {
	const { children, seo } = props;

	const [isProductFilterSliderOpen, setIsProductFilterSliderOpen] =
		useState(false);

	const isEco = useHomeStore((state) => state.isEco);

	const {
		isAuthenticating,
		isAuth,
		setIsLoginOpen,
		customerData,
		autoLogin
	} = useAuthStore((state) => ({
		isAuth: state.isAuth,
		setIsLoginOpen: state.setIsLoginOpen,
		customerData: state.customerData,
		autoLogin: state.autoLogin,
		isAuthenticating: state.isAuthenticating
	}));

	const fetchCart = useCartStore((state) => state.fetchCart);

	const { route } = useRouter();
	const { routeChangeStart } = useRouteEvent();

	useEffect(() => {
		autoLogin();
	}, []);
	` `;

	useEffect(() => {
		if (customerData.buyerId) {
			fetchCart(customerData.buyerId);
			getAddresses(customerData.buyerId).then((addresses) => {
				for (const address of addresses) {
					if (address.is_billing_address) {
						localStorage.setItem('billing_address_id', address.id);
					} else {
						localStorage.setItem('shipping_address_id', address.id);
					}
				}
			});
		}
	}, [customerData.buyerId]);

	return (
		<>
			<Seo title={seo?.title} description={seo?.description} />

			<Loader
				isOpen={routeChangeStart || isAuthenticating}
				text="Authenticating..."
			/>

			<ProductFilterSlider
				isOpen={isProductFilterSliderOpen}
				onClose={() => setIsProductFilterSliderOpen(false)}
			/>

			<div className={isEco ? 'dark' : 'light'}>
				<NavBar />
				<SignUpPage />
				<Login />
				<main className="bg-bg-main pb-8 dark:bg-bg-eco">
					{children}
				</main>

				{/* Bottom navbar for small screen */}
				<div className="fixed bottom-0 left-0 right-0 z-[1000] h-[51px] bg-primary-main dark:bg-primary-eco md:hidden">
					<div className="flex items-center justify-between">
						{/* Home Icon */}
						<Link href="/" className="ml-4">
							<MdOutlineHome className="text-[32px] font-semibold text-white" />
						</Link>

						{route === '/product-search' && (
							<BsSliders
								className="text-[32px] font-semibold text-white"
								onClick={() =>
									setIsProductFilterSliderOpen(
										(prevState) => !prevState
									)
								}
							/>
						)}

						{/* Sign-in button */}
						{!isAuth && (
							<div
								onClick={setIsLoginOpen}
								className="mr-2 flex h-[51px] w-[58px] flex-col items-center justify-center bg-accent-primary-main"
							>
								<MdPerson className="h-[25px] w-[25px] text-white" />
								<p className="text-[12px] text-white">Sign In</p>
							</div>
						)}

						{/* Sign-in and dashboard button */}
						{isAuth && (
							<div className="flex">
								{/* Dashboard button */}
								<Button
									href={generateBuyerDashboardUrl({
										redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
										action: BUYER_DASHBOARD_ACTIONS.create_rfq,
										access_key: customerData.access.token,
										refresh_key: customerData.refresh.token
									})}
									variant="buyer"
									className="mr-2 h-[51px] w-[58px] flex-col rounded-none !p-0 !text-white"
								>
									<div className="relative hidden h-[48px] w-[35px]">
										<Image
											src="/static/icons/dashboard-icon.png"
											alt=""
											width={32}
											height={24}
										/>
									</div>

									<div>
										<IoSpeedometerOutline className="h-[24px] w-[35px]" />
									</div>
									<p className="text-[8px] text-white">Dashboard</p>
								</Button>

								{/* what is rfq button */}
								<Button
									href={generateBuyerDashboardUrl({
										redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
										action: BUYER_DASHBOARD_ACTIONS.create_rfq,
										access_key: customerData.access.token,
										refresh_key: customerData.refresh.token
									})}
									variant="special"
									className="h-[51px] !w-[72px] flex-col rounded-none !p-0"
								>
									<div className="flex items-center justify-center text-center">
										<MdOutlineMessage className="h-[25px] w-[25px] text-primary-main" />
									</div>
									<p className="text-[8px] text-primary-main">
										Submit RFQ
									</p>
								</Button>
							</div>
						)}
					</div>
				</div>

				<Footer />
			</div>
			{/* </SWRConfig> */}
		</>
	);
};

export default Layout;
