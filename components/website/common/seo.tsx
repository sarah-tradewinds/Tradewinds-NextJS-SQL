import Head from 'next/head';

// Tracking code

interface SeoProps {
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string;
	meta_image_url?: string;
	canonical_url?: string;

	og_title?: string;
	og_description?: string;
	og_image_url?: string;
}

const Seo: React.FC<SeoProps> = (props) => {
	console.log('[Seo] component', props);

	const {
		meta_title = 'Online market place for seller and buyer - tradewinds',
		meta_description = 'Buy and sell any kind of product online.',
		meta_keywords = 'tradewinds, online shop',
		meta_image_url = '/tradewinds-horizontal-logo.png',
		canonical_url = 'https://tradewinds.vercel.app/',

		og_title = meta_title,
		og_description = meta_description,
		og_image_url = meta_image_url
	} = props;

	return (
		<Head>
			<meta charSet="utf-8" />
			<meta
				httpEquiv="Content-Type"
				content="text/html; charset=utf-8"
			/>
			<meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta name="theme-color" content="#044E86" />

			{/* <Primary Meta Tags */}
			<title>{meta_title}</title>
			<meta name="title" content={meta_title} />
			<meta name="description" content={meta_description} />
			<meta name="keywords" content={meta_keywords} />
			<link rel="canonical" href={canonical_url} />

			<meta name="mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-title" content="tradewinds" />
			<meta name="application-name" content="tradewinds" />

			{/*  Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:locale" content="En" />
			<meta property="og:site_name" content="tradewinds" />
			<meta property="og:title" content={og_title} />
			<meta property="og:description" content={og_description} />
			<meta property="og:url" content={canonical_url} />
			<meta property="og:image" content={og_image_url} />

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@tradewinds" />
			<meta name="twitter:creator" content="tradewinds.com" />
			<meta property="twitter:url" content={canonical_url} />
			<meta property="twitter:title" content={og_title} />
			<meta property="twitter:description" content={og_description} />
			<meta property="twitter:image" content={og_image_url} />

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
	);
}; // End of Seo component

export default Seo;
