import type {
	GetStaticProps,
	GetStaticPropsContext,
	NextPage
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async (
	ctx: GetStaticPropsContext
) => ({
	props: {
		...(await serverSideTranslations(ctx.locale as string, [
			'common',
			'header'
		]))
	}
});

const Home: NextPage = () => {
	const { t } = useTranslation();

	return (
		<div className="container mx-auto">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="h-screen w-full grid place-items-center">
				<h1 className="text-7xl text-orange-600 font-semibold">
					{t('common:hello')}
				</h1>
			</main>
		</div>
	);
};

export default Home;

// 14-Mar
// 16-Mar
// 17-Mar
