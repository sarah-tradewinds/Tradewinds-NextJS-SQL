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
					className="mb-6 text-center font-semibold text-white dark:text-accent-secondary-eco"
				>
					{t('back_to_top')}
				</button>
				<div className="absolute -bottom-7 rounded-full bg-[#30AAE1] p-2 dark:bg-bg-eco ">
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
				<div className="ml-7 mr-[20px] grid-cols-3 grid-rows-2 pt-[57px] text-lg md:grid lg:mb-[40px] lg:flex lg:justify-between lg:pl-[74px] lg:pr-[74px]">
					<div className=" mb-[28px] h-[116px] w-[203px]">
						<p className=" text-xl font-bold">Customer services</p>
						<p>Help Center</p>
						<p>File a dispute</p>
						<p>Policies & rules</p>
					</div>
					<div className=" mb-[28px] h-[146px] w-[166px]">
						<p className=" text-xl font-bold">About us</p>
						<p>About TWMP.com</p>
						<p>About TWMP ECO</p>
						<p>TWMP non-profit</p>
						<p> Sitemap</p>
					</div>
					<div className=" mb-[28px] h-[176px] w-[245px]">
						<p className=" text-xl font-bold">Source on Tradewinds</p>
						<Link
							href={isEco ? '/eco/why-buy' : '/why-buy'}
							className=" hover:text-accent-primary-main"
						>
							{' '}
							Why Buy on Tradewinds
						</Link>

						<p> Buyer Platform Features</p>
						<Link
							href={
								isEco
									? '/6500-categories?is_eco=${true}'
									: '/6500-categories'
							}
							className=" hover:text-accent-primary-main"
						>
							{' '}
							All Categories
						</Link>
						<p> Request for Quotation</p>
						<p>Ready to Ship</p>
					</div>
					<div className=" mb-[28px] h-[86px] w-[211px]">
						<p className=" text-xl font-bold">Sell on TWMP.com</p>

						<Link
							href={
								isEco
									? '/eco/why-sell-on-tradewinds'
									: '/why-sell-on-tradewinds'
							}
							className=" hover:text-accent-primary-main"
						>
							{' '}
							Why sell on TWMP
						</Link>
						<p>Seller platform features</p>
					</div>
					<div className=" mb-[28px] h-[218px] w-[223px]">
						<p className=" text-xl font-bold">Help Center</p>
						<p>Account Questions</p>
						<p>Sourcing Questions</p>
						<p> Negotiation Questions</p>
						<p>Ordering Questions</p>
						<p>After Sales Questions</p>
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
