import { Tab } from '@headlessui/react';
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import CategoryCard from 'components/website/home/common/category-card';
import SubCategoryCard from 'components/website/home/common/sub-category-card';
import SubCategorySlider from 'components/website/home/sub-category-slider';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const CompanyProfileTab: React.FC<{ seller: any }> = ({ seller }) => {
	const { t } = useTranslation();

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

								{/* Photos/Videos */}
								<div>
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:photos')}/{t('common:videos')}
									</h2>
									<div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
										<div>
											<div className="relative h-[118px] w-[136px] md:h-[170px] md:w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/video-square.png"
													alt=""
													layout="fill"
												/>
											</div>
											<div className="hidden md:block">
												<p className="flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
													Video 1
												</p>
												<p className="text-[15px] text-gray/40">
													Special Notice Text
												</p>
											</div>
										</div>
										<div>
											<div className="relative h-[118px] w-[136px] md:h-[170px] md:w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/video-square.png"
													alt=""
													layout="fill"
												/>
											</div>
											<div className="hidden md:block">
												<p className="f ont-bold flex justify-between space-x-8 text-[18px] text-primary-main">
													Video 1
												</p>
												<p className="text-[15px] text-gray/40">
													Special Notice Text
												</p>
											</div>
										</div>
										<div className="hidden md:block">
											<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/video-square.png"
													alt=""
													layout="fill"
												/>
											</div>
											<p className="f ont-bold flex justify-between space-x-8 text-[18px] text-primary-main">
												Video 1
											</p>
											<p className="text-[15px] text-gray/40">
												Special Notice Text
											</p>
										</div>
										<div className="hidden md:block">
											<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/video-square.png"
													alt=""
													layout="fill"
												/>
											</div>
											<p className="f ont-bold flex justify-between space-x-8 text-[18px] text-primary-main">
												Video 1
											</p>
											<p className="text-[15px] text-gray/40">
												Special Notice Text
											</p>
										</div>
									</div>
								</div>

								{/* Featured Product */}
								<div>
									<h2 className="border-b border-gray/40 text-[18px] font-semibold text-gray/40 md:text-[21px]">
										{t('common:featured_product')}
									</h2>
									<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
										<div className="flex flex-col-reverse md:flex-col">
											<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/vehicles/yellow-tractor.png"
													alt=""
													layout="fill"
												/>
											</div>
											<div>
												<p className="flex justify-between space-x-8 text-[15px] font-bold text-primary-main md:text-[18px]">
													Green Tractor 1
												</p>
												<p className="text-[15px] text-gray/40">
													Nicee green color
												</p>
											</div>
										</div>
										<div className="flex flex-col-reverse md:flex-col">
											<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/vehicles/yellow-tractor.png"
													alt=""
													layout="fill"
												/>
											</div>
											<div>
												<p className="flex justify-between space-x-8 text-[15px] font-bold text-primary-main md:text-[18px]">
													Green Tractor 1
												</p>
												<p className="text-[15px] text-gray/40">
													Nicee green color
												</p>
											</div>
										</div>
										<div className="flex flex-col-reverse md:flex-col">
											<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/vehicles/yellow-tractor.png"
													alt=""
													layout="fill"
												/>
											</div>
											<div>
												<p className="flex justify-between space-x-8 text-[15px] font-bold text-primary-main md:text-[18px]">
													Green Tractor 1
												</p>
												<p className="text-[15px] text-gray/40">
													Nicee green color
												</p>
											</div>
										</div>
										<div className="flex flex-col-reverse md:flex-col">
											<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
												<Image
													src="/vehicles/yellow-tractor.png"
													alt=""
													layout="fill"
												/>
											</div>
											<div>
												<p className="flex justify-between space-x-8 text-[15px] font-bold text-primary-main md:text-[18px]">
													Green Tractor 1
												</p>
												<p className="text-[15px] text-gray/40">
													Nice green color
												</p>
											</div>
										</div>
									</div>
								</div>
							</Tab.Panel>

							{/* Products Panel */}
							<Tab.Panel>
								{/* Product set 1 */}
								<div className="mt-4 grid grid-cols-12">
									<div className="col-span-4 hidden lg:block">
										<CategoryCard
											title="Product set 1"
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
										Product set 1
									</p>
									<div className="col-span-12 lg:col-span-8">
										<div className="hidden md:block">
											<SubCategorySlider
												className="!mx-0"
												leftButtonClassName="lg:!left-8"
												rightButtonClassName="lg:!right-10"
												categories={categories}
											/>
										</div>

										{/* For mobile only */}
										<div className="grid grid-cols-2 gap-4 md:hidden">
											{categories.map((cat) => (
												<SubCategoryCard
													key={cat.id}
													subCat={cat}
													className="!h-[88px]"
												/>
											))}
										</div>
									</div>
								</div>

								{/* Product set 2 */}
								<div className="grid grid-cols-12 border-gray/40 pt-8 md:mt-8 md:border-t">
									<div className="col-span-4 hidden lg:block">
										<CategoryCard
											title="Product set 2"
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

									<p className="col-span-12 text-[13px] font-semibold text-green md:hidden">
										Product set 2
									</p>
									<div className="col-span-12 lg:col-span-8">
										<div className="hidden md:block">
											<SubCategorySlider
												className="!mx-0"
												leftButtonClassName="lg:!left-8"
												rightButtonClassName="lg:!right-10"
												categories={categories}
											/>
										</div>

										{/* For mobile only */}
										<div className="grid grid-cols-2 gap-4 md:hidden">
											{categories.map((cat) => (
												<SubCategoryCard
													key={cat.id}
													subCat={cat}
													className="!h-[88px]"
												/>
											))}
										</div>
									</div>
								</div>
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}; // End of CompanyProfileTab component

export default CompanyProfileTab;
