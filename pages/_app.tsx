import type { AppProps } from 'next/app';

// Third party packages
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// components
import Layout from 'components/common/layout';

// Third party styles
import 'keen-slider/keen-slider.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

// react slick style
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// local style
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();

	return (
		<>
			{router.pathname === '/verify' ||
			router.pathname === '/forgot-password' ? (
				<Component {...pageProps} />
			) : (
				<Layout
					seo={pageProps.seo}
					productName={pageProps?.productName}
				>
					<Component {...pageProps} />
				</Layout>
			)}
		</>
	);
};

export default appWithTranslation(MyApp);
