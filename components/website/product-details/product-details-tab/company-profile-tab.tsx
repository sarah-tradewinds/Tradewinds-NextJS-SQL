import { Tab } from '@headlessui/react';
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import CategoryCard from 'components/website/home/common/category-card';
import SubCategoryCard from 'components/website/home/common/sub-category-card';
import SubCategorySlider from 'components/website/home/sub-category-slider';
import {
	getFeaturedProductsBySellerId,
	getProductsWithCollectionBySellerId
} from 'lib/product-details.lib';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLocaleText } from 'utils/get_locale_text';

const CompanyProfileTab: React.FC<{
	seller: any;
}> = ({ seller }) => {
	const { t } = useTranslation();

	const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

	const [collectionProducts, setCollectionProducts] = useState<any[]>(
		[]
	);

	const { locale } = useRouter();

	useEffect(() => {
		if (!seller.id) return;

		getFeaturedProductsBySellerId(
			'62cfcfbada1e2599faefee24' || seller.id
		).then((data) => setFeaturedProducts(data || []));

		getProductsWithCollectionBySellerId(
			'62cfcfbada1e2599faefee24' || seller.id
		).then((data) => setCollectionProducts(data || []));
	}, [seller.id]);

	const categories = [
		{
			id: '1',
			slug: { en: '/' },
			title: { en: 'Product 1' },
			image: { url: '/public/' },
			clr: ''
		},
		{
			id: '1',
			slug: { en: '/' },
			title: { en: 'Product 1' },
			image: { url: '/public/' },
			clr: ''
		},
		{
			id: '1',
			slug: { en: '/' },
			title: { en: 'Product 1' },
			image: { url: '/public/' },
			clr: ''
		},
		{
			id: '1',
			slug: { en: '/' },
			title: { en: 'Product 1' },
			image: { url: '/public/' },
			clr: ''
		},
		{
			id: '1',
			slug: { en: '/' },
			title: { en: 'Product 1' },
			image: { url: '/public/' },
			clr: ''
		},
		{
			id: '1',
			slug: { en: '/' },
			title: { en: 'Product 1' },
			image: { url: '/public/' },
			clr: ''
		}
	];

	return (
		<>
			<div className="bg-bg-main">
				{/* Banner Image */}
				<div className="relative">
					<div className="relative h-[426px] w-full">
						<ImageWithErrorHandler
							src="/goat.png"
							alt=""
							layout="fill"
						/>

						<p className="absolute top-0 p-8 text-[55px] font-semibold text-white pc:text-[23px]">
							Thirsty Llama Brewing
						</p>
					</div>

					<div className="absolute bottom-4 left-16 h-[94px] w-[121px] overflow-hidden rounded-t-lg p-4 shadow-md">
						<ImageWithErrorHandler
							src="/tmp-company-logo.png"
							alt=""
							layout="fill"
							className="h-[94px] w-[121px]"
						/>
					</div>
					<div className="absolute left-0 right-0 -bottom-[4px] h-[24px] bg-white md:right-8 md:left-8"></div>
				</div>

				<div className="bg-white p-8 md:mx-8">
					<Tab.Group>
						<Tab.List className="space-x-4 border-b border-gray/40 text-[18px] text-gray/40 md:border-t-0 md:text-[21px]">
							<Tab
								className={({ selected }: { selected: boolean }) =>
									selected ? 'font-semibold text-primary-main' : ''
								}
							>
								Profile
							</Tab>
							<Tab
								className={({ selected }: { selected: boolean }) =>
									selected ? 'font-semibold text-primary-main' : ''
								}
							>
								Products
							</Tab>
						</Tab.List>

						<Tab.Panels>
							{/* Seller info */}
							<Tab.Panel>
								<div>
									<div className="mt-8 grid grid-cols-12 gap-8">
										{/* Profile details */}
										<div className="col-span-12 space-y-4 sm:col-span-8">
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:country')}:
												</span>
												<span>{seller?.country}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:tw_page')}:
												</span>
												<span>{seller?.tw_page}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:established')}:
												</span>
												<span>{seller?.established}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:certification')}:
												</span>
												<span>{seller?.certificates?.toString()}</span>
											</p>
											<p className="flex flex-col text-[15px] md:flex-row md:space-x-8 md:text-[18px]">
												<span className="font-semibold md:min-w-[148px]">
													{t('common:member_since')}:
												</span>
												<span>
													{seller?.member_since
														? new Date(
																seller?.member_since
														  ).toLocaleDateString()
														: ''}
												</span>
											</p>
										</div>

										{/* Tradewinds logo and message vendor button */}
										<div className="hidden sm:col-span-4 md:block">
											<div className="flex justify-end ">
												<div className="relative mr-4 h-[72px] w-[120px] md:m-8">
													<Image
														src="/twmp-verified.png"
														alt=""
														layout="fill"
													/>
												</div>
											</div>
											<div className="relative mt-16 h-[22px] w-[138px] lg:hidden">
												<Image
													src="/message-vendor.png"
													alt=""
													layout="fill"
												/>
											</div>
										</div>
									</div>

									<div className="my-8 flex justify-center md:hidden lg:block">
										<div className="relative h-[22px] w-[138px]">
											<Image
												src="/message-vendor.png"
												alt=""
												layout="fill"
											/>
										</div>
									</div>
								</div>

								{/* About */}
								<div className="mt-4 lg:mt-0">
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:about')}
									</h2>
									<p className="mt-1 text-[13px] text-gray/40 md:text-[18px]">
										{seller?.about_us}
									</p>
								</div>

								{/* Featured Product */}
								<div>
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:featured_product')}
									</h2>
									<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
										{featuredProducts.map((featuredProduct) => {
											return (
												<div
													key={featuredProduct.id}
													className="flex flex-col-reverse md:flex-col"
												>
													<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
														<ImageWithErrorHandler
															src={
																featuredProduct?.images[0]
																	? featuredProduct?.images[0]?.url
																	: ''
															}
															alt=""
															layout="fill"
														/>
													</div>
													<div>
														{/* Product name */}
														<p className="flex justify-between space-x-8 text-[15px] font-bold text-primary-main md:text-[18px]">
															{getLocaleText(
																featuredProduct.product_name || {},
																locale
															)}
														</p>

														{/* Product description */}
														<p className="text-[15px] text-gray/40">
															{getLocaleText(
																featuredProduct.product_description ||
																	{},
																locale
															)}
														</p>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</Tab.Panel>

							{/* Collection Products Panel */}
							<Tab.Panel>
								{/* Product set 1 */}
								{collectionProducts.map((collectionProduct) => {
									const { name, product } = collectionProduct || {};

									const products = product.map((productData: any) => ({
										id: productData.id,
										title: productData?.product_name,
										slug: {
											en: `/product/${productData.id}`
										},
										clr: '',
										image: {
											url: productData?.images[0]
												? productData?.images[0]?.url
												: ''
										}
									}));

									return (
										<div key={name} className="mt-4 grid grid-cols-12">
											{/* Collection card */}
											<div className="col-span-4 hidden lg:block">
												<CategoryCard
													title={name}
													name="Name here"
													description="Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit amet, "
													alt=""
													imageUrl=""
													bgHexColor=""
													buttonText=""
													containerClassName="h-full"
													hideImage={true}
													hideButton={true}
												/>
											</div>

											<p className="col-span-12 text-[13px] font-semibold text-primary-main md:hidden">
												{name}
											</p>
											<div className="col-span-12 lg:col-span-8">
												<div className="hidden md:block">
													<SubCategorySlider
														className="!mx-0"
														leftButtonClassName="lg:!left-8"
														rightButtonClassName="lg:!right-10"
														categories={products}
													/>
												</div>

												{/* For mobile only */}
												<div className="grid grid-cols-2 gap-4 md:hidden">
													{products.map((product: any) => {
														return (
															<SubCategoryCard
																key={product.id}
																subCat={product}
																className="!h-[88px]"
															/>
														);
													})}
												</div>
											</div>
										</div>
									);
								})}
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}; // End of CompanyProfileTab component

export default CompanyProfileTab;
