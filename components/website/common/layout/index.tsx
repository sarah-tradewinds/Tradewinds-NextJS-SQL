import dynamic from 'next/dynamic';
import Link from 'next/link';

// Third party packages
import { SWRConfig } from 'swr';

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
import { useEffect } from 'react';
import {
	MdOutlineHome,
	MdOutlineMessage,
	MdPerson
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import Loader from '../elements/loader/loader';
import Button from '../form/button';
import Seo from '../seo';

const Layout: React.FC<{ seo: any }> = (props) => {
	const { children, seo } = props;

	const isEco = useHomeStore((state) => state.isEco);
	const { isLoading, categoriesLength } = useCategoryStore((state) => ({
		isLoading: state.isLoading,
		categoriesLength: state.allCategories.length
	}));

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

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<>
			<Seo title={seo?.title} description={seo?.description} />

			<Loader isOpen={isAuthenticating} text="Authenticating..." />

			<SWRConfig
				value={{
					fetcher: (url: string, init) =>
						fetch(`${process.env.SITE_URL}/api/v1${url}`, init).then(
							(res) => res.json()
						)
				}}
			>
				<div className={isEco ? 'dark' : 'light'}>
					<NavBar />
					<SignUpPage />
					<Login />
					<main className="bg-bg-main dark:bg-bg-eco">{children}</main>

					{/* Bottom navbar for small screen */}
					<div className="fixed bottom-0 left-0 right-0 z-[1000] bg-primary-main dark:bg-primary-eco md:hidden">
						<div className="flex items-center justify-between">
							<Link href="/">
								<a className="ml-4">
									<MdOutlineHome className="text-[25px] font-semibold text-white" />
								</a>
							</Link>

							<div className="flex">
								{!isAuth && (
									<div
										onClick={setIsLoginOpen}
										className="mr-2 flex w-[84px] flex-col items-center justify-center bg-accent-primary-main"
									>
										<MdPerson className="h-[25px] w-[25px] text-white" />
										<p className="text-[12px] text-white">Sign In</p>
									</div>
								)}
								{isAuth && (
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
											<MdOutlineMessage
												size={35}
												className="h-[25px] w-[25px] text-primary-main"
											/>
										</div>
										<p className="text-2s text-[12px] text-primary-main">
											Submit RFQ
										</p>
									</Button>
								)}
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</SWRConfig>
		</>
	);
};

export default Layout;
