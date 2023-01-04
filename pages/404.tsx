import { GetStaticProps } from 'next';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Seo from 'components/common/seo';
// import Seo from 'components/common/seo';

export default function Custom404() {
	return (
		<>
			<Seo title="Home page" description="" />
			<h1>404 - Page Not Found</h1>;
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});
