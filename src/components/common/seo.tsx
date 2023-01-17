import Head from 'next/head';

// Third party packages
import useDeviceSize from 'hooks/use-device-size.hooks';
import { NextSeo, NextSeoProps } from 'next-seo';

const Seo: React.FC<NextSeoProps> = (props) => {
	const { deviceWidth } = useDeviceSize();

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					httpEquiv="Content-Type"
					content="text/html; charset=utf-8"
				/>
				<meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
				<meta
					name="viewport"
					// content="width=device-width, initial-scale=1.0"
					content={`width=device-width, initial-scale=${
						deviceWidth < 744 ? '1' : '0.8'
					}`}
				/>
				<meta name="theme-color" content="#044E86" />

				{/* Favicon */}
				<link
					rel="shortcut icon"
					type="image/x-icon"
					href="/favicon/favicon.ico"
					hrefLang="en-in"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest"></link>
			</Head>

			<NextSeo
				title="Online market place for seller and buyer - tradewinds"
				description="Buy and sell any kind of product online."
				{...props}
			/>
		</>
	);
}; // End of Seo component

export default Seo;
