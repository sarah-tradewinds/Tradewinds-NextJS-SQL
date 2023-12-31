import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Seo from 'components/common/seo';
import Banner from 'components/eco/why-buy/banner';
import FeatureCommunicationCenter from 'components/eco/why-buy/feature-communication';

import { useAuthStore } from 'store/auth';

const WhyBuyPage: NextPage = () => {
	const { t } = useTranslation('why_buy');
	const { setIsSignUpOpen } = useAuthStore();

	return (
		<>
			<Seo title="Why buy page" description="" />
			<div className=" bg-bg-main ">
				{/* Header section */}
				<div className=" 3xl:container 3xl:mx-auto">
					<Banner />
				</div>

				<div className=" -mt-[0px] flex justify-center sm:-mt-[26px] md:container md:mx-auto  md:-mt-[26px] lg:-mt-[47px] desktop:-mt-[70px]">
					<FeatureCommunicationCenter />
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
