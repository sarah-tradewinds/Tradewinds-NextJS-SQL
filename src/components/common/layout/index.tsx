import dynamic from 'next/dynamic';
import Link from 'next/link';
import Footer from './footer';

// Third party packages

// components
const Login = dynamic(() => import('../auth/login'));
const SignUpPage = dynamic(() => import('../auth/signup'));
const SelectSignUpPage = dynamic(() => import('../auth/select-signup'));

// icons
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import useRouteEvent from 'hooks/use-route-event.hooks';
import { useEffect } from 'react';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { MdOutlineMessage, MdPerson } from 'react-icons/md';

import ProductFilterSlider from 'components/product-search/product-filter-mobile/product-filter-slider';
import useDeviceSize from 'hooks/use-device-size.hooks';
import { getCart } from 'lib/cart.lib';
import { getAddresses } from 'lib/customer/addres.lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import { useHomeStore } from 'store/home';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../elements/image-with-error-handler';
import Loader from '../elements/loader/loader';
import Button from '../form/button';
import Seo from '../seo';

const Layout: React.FC<{ productName?: string; seo: any }> = (
	props
) => {
	const { children, seo, productName } = props;

	const [isProductFilterSliderOpen, setIsProductFilterSliderOpen] =
		useState(false);

	const isEco = useHomeStore((state) => state.isEco);
	const { locale } = useRouter();

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

	// const fetchCart = useCartStore((state) => state.fetchCart);
	const setCart = useCartStore((state) => state.setCart);

	const { route } = useRouter();
	const { routeChangeStart } = useRouteEvent();
	const { deviceWidth, deviceType } = useDeviceSize();

	// useEffect(() => {
	// 	const [bodyTag] = Array.from(document.getElementsByTagName('body'));
	// 	if (bodyTag) {
	// 		if (deviceWidth >= 744) {
	// 			// (bodyTag.style as any).zoom = '80%';
	// 			(document.body.style as any).zoom = '80%';
	// 		} else {
	// 			// (bodyTag.style as any).zoom = '100%';
	// 			(document.body.style as any).zoom = '100%';
	// 		}
	// 	}
	// }, [deviceWidth]);

	useEffect(() => {
		autoLogin();
	}, []);

	useEffect(() => {
		if (customerData.buyerId) {
			getCart().then((cart) => {
				console.log('[getCart] =', cart);
				const cartId = cart?.id;
				if (!cartId) {
					return;
				}
				console.log('[getCart] =', cart.item);

				const cartItems = cart.item || [];
				setCart(
					cartId,
					cartItems,
					cart.subtotal || 0,
					cartItems.length
				);
			});

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
	}, [customerData.buyerId, isAuth]);

	return (
		<>
			<Seo
				title={getLocaleText(seo?.title || {}, locale)}
				description={getLocaleText(seo?.description || {}, locale)}
			/>

			<Loader
				isOpen={routeChangeStart || isAuthenticating}
				text="Authenticating..."
			/>

			<ProductFilterSlider
				isOpen={isProductFilterSliderOpen}
				onClose={() => setIsProductFilterSliderOpen(false)}
			/>

			<div className={isEco ? 'dark' : 'light'}>
				{/* <NavBar productName={productName} /> */}
				<SelectSignUpPage />
				<SignUpPage />
				<Login />
				<main className="md:scale-[0.85]s md:transforms bg-bg-main pb-8 dark:bg-bg-eco">
					{children}
				</main>

				{/* Bottom navbar for small screen */}
				<div className="fixed bottom-0 left-0 right-0 z-[1000] h-[51px] bg-primary-main dark:bg-primary-eco md:hidden">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							{/* Home Icon */}
							<Link href="/" className="ml-4">
								<ImageWithErrorHandler
									src="/static/icons/home-icon.png"
									alt="home icon"
									width={29}
									height={20}
									onClick={() =>
										setIsProductFilterSliderOpen(
											(prevState) => !prevState
										)
									}
								/>
							</Link>

							{route === '/product-search' && (
								<ImageWithErrorHandler
									src="/static/icons/product-filter-icon.png"
									alt="product filter icon"
									width={24.72}
									height={19.47}
									onClick={() =>
										setIsProductFilterSliderOpen(
											(prevState) => !prevState
										)
									}
								/>
							)}
						</div>

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
										<ImageWithErrorHandler
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
