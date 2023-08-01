// Third party packages
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

// store
import { useHomeStore } from 'store/home';

const Footer: React.FC = () => {
	const isEco = useHomeStore(({ isEco }) => isEco);

	const { t } = useTranslation('footer');

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<footer className="bg-accent-primary-main font-montserrat dark:bg-header-bar md:bg-header-bar lg:sm:bg-accent-primary-main">
			<div className="relative flex h-[80px] flex-col items-center justify-center bg-cyan dark:bg-header-bar md:items-center md:justify-center">
				<button
					onClick={goToTop}
					className="mb-6 text-center font-semibold text-white dark:text-primary-eco"
				>
					{t('back_to_top')}
				</button>
				<div className="absolute -bottom-7 rounded-full bg-[#30AAE1] p-2 dark:bg-header-bar ">
					<img
						alt="..."
						src={
							isEco
								? '/eco-tradewinds.png'
								: '/static/images/EcoPage/footer_logo_latest.png'
						}
						className=""
					/>
				</div>
			</div>

			<div className=" h-[1597px] w-full bg-primary-main text-lg  text-white dark:bg-primary-eco md:h-[747px] lg:h-[517px] lg:bg-primary-main">
				{/* <div className="ml-7 mr-[20px] grid-cols-3 grid-rows-2 pt-[57px] text-lg md:grid lg:mb-[40px] lg:flex lg:justify-between lg:pl-[74px] lg:pr-[74px]"> */}
				<div className="grid gap-y-8 pt-14 pl-8 pb-24 sm:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col">
						<p className=" text-xl font-bold">{t('help_center')} </p>
						<Link href="/help-center">FAQ</Link>
						<Link href="/help-center#file-a-dispute">
							{t('file_a_dispute')}
						</Link>
						<Link href="/help-center#privacy-policy">
							{t('privacy_policy')}
						</Link>
					</div>

					<div className="flex flex-col">
						<p className=" text-xl font-bold">{t('about_us')} </p>
						<Link href="/about-us">About TWMP</Link>
						<Link href="/about-us#mission">Mission</Link>
						<Link href="/about-us#about-tradewinds-eco">
							About Tradewinds ECO
						</Link>
						<Link href="/sitemap.xml">Sitemap</Link>
					</div>

					<div className="flex flex-col">
						<p className=" text-xl font-bold">Source on Tradewinds</p>
						<Link
							href={isEco ? '/eco/why-buy' : '/why-buy'}
							className=" hover:text-accent-primary-main"
						>
							Why Buy on Tradewinds
						</Link>

						<Link href="/why-buy">Buyer Platform Features</Link>
						<Link
							href={
								isEco
									? '/6500-categories?is_eco=${true}'
									: '/6500-categories'
							}
							className=" hover:text-accent-primary-main"
						>
							All Categories : A-Z
						</Link>
						<Link href="/what-is-rfq"> Request for Quotation</Link>
					</div>

					<div className="flex flex-col">
						<p className="mt-2 text-xl font-bold">Sell on TWMP.com</p>

						<Link
							href={
								isEco
									? '/eco/why-sell-on-tradewinds'
									: '/why-sell-on-tradewinds'
							}
							className=" hover:text-accent-primary-main"
						>
							Why sell on TWMP
						</Link>
						<Link href="/why-sell-on-tradewinds">
							Seller platform features
						</Link>
					</div>
				</div>

				<div className=" ml-7 mr-[20px] mb-12 flex flex-col space-y-6 text-left text-lg md:mr-[30px] md:-mt-10 md:text-center lg:-mt-[30px] lg:h-[200px] lg:text-center">
					<div>
						<p>
							<span className="text-[18px] font-semibold md:text-xl md:font-bold">
								Tradewindsmarketplace Site:
							</span>{' '}
							International - Español - Português - Deutsch - Français -
							Italiano - Pусский - 한국어 - 日本語 - اللغة العربية -
							ภาษาไทย - Türk - Nederlands - tiếng Việt - Indonesian -
							עברית
						</p>
					</div>
					<div>
						<p>
							<span className="text-[18px] font-semibold md:text-xl md:font-bold">
								Product Listing Policy -
							</span>{' '}
							Intellectual Property Protection - Privacy Policy - Terms
							of Use - User Information Legal Enquiry Guide
						</p>
					</div>
					<div>
						<p className="text-[18px] font-semibold md:text-xl md:font-bold">
							© 2020-2023 Tradewindsmarketplace.com. All rights
							reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
