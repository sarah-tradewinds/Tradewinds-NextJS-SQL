import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-homepage-bg font-montserrat">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}