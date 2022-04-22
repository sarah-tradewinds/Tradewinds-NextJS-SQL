import Link from 'next/link';

// components
import Login from '../auth/login';
import SignUpPage from '../auth/signup';
import Footer from './footer';
import NavBar from './navbar';

// icons
import {
	MdOutlineHome,
	MdOutlineMessage,
	MdPerson
} from 'react-icons/md';
import { useHomeStore } from 'store/home';

const Layout: React.FC = ({ children }: { children: JSX.Element }) => {
	const isEco = useHomeStore((state) => state.isEco);

	return (
		<div className={isEco ? 'dark' : 'light'}>
			<NavBar />
			<SignUpPage />
			<Login />
			<main className="bg-bg-main dark:bg-bg-eco">{children}</main>

			{/* Bottom navbar for small screen */}
			<div className="fixed bottom-0 left-0 right-0 z-[1000] bg-primary-main md:hidden">
				<div className="flex items-center justify-between">
					<Link href="/">
						<a className="ml-4">
							<MdOutlineHome className="text-[25px] font-semibold text-white" />
						</a>
					</Link>

					<div className="flex">
						<div className="mr-2 flex w-[84px] flex-col items-center justify-center bg-accent-primary-main">
							<MdPerson className="h-[25px] w-[25px] text-white" />
							<p className="text-[12px] text-white">Sign In</p>
						</div>
						<div className="flex w-[84px] flex-col items-center justify-center bg-secondary py-4">
							<MdOutlineMessage className="h-[25px] w-[25px] text-primary-main" />
							<p className="text-[12px] text-primary-main">
								Submit RFQ
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
