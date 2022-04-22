import Layout from 'components/website/common/layout';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
	<>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</>
);

export default appWithTranslation(MyApp);
