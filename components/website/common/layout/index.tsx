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
import { BUYER_DASHBOARD_SUBMIT_RFQ } from 'data/buyer-urls.data';
import {
	MdOutlineHome,
	MdOutlineMessage,
	MdPerson
} from 'react-icons/md';
import { useAuthStore } from 'store/auth';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import Button from '../form/button';
import Seo from '../seo';

const Layout: React.FC = (props) => {
	const { children } = props;

	const isEco = useHomeStore((state) => state.isEco);
	const { isLoading, categoriesLength } = useCategoryStore((state) => ({
		isLoading: state.isLoading,
		categoriesLength: state.categories.length
	}));

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData
		})
	);

	return (
		<>
			<Seo />

			{/* <Loader isOpen={categoriesLength <= 0} /> */}

			<SWRConfig
				value={{
					fetcher: (url: string, init) =>
						fetch(`${process.env.API_BASE_URL}${url}`, init).then(
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
										href={`${BUYER_DASHBOARD_SUBMIT_RFQ}?customer_data=${customerData.id}`}
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
