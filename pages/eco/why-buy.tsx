import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Seo from 'components/common/seo';
import FeatureCommunication from 'components/eco/why-buy/feature-communication';
import ProductQualifications from 'components/eco/why-buy/product-qualifications';
import Banner from 'components/eco/why-buy/whybuy-banner';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');

	return (
		<>
			<Seo title="Why buy page" description="" />

			<div className="overflow-x-hidden bg-header-bar sm:bg-header-bar md:bg-bg_light_pink lg:bg-bg_light_pink desktop:bg-bg_light_pink">
				{/* Header section */}
				<Banner />
				<div className=" sm:-mt-[45px] md:-mt-[23px] lg:-mt-[52px] desktop:-mt-[91px] ">
					<ProductQualifications />
				</div>
				<div className=" sm:container sm:mx-auto sm:justify-center">
					<FeatureCommunication />
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default WhyBuyPage;
