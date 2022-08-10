import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const CompanyProfileTab: React.FC<{ seller: any }> = ({ seller }) => {
	const { t } = useTranslation();

	return (
		<div className="bg-bg-main">
			<div className="relative">
				<div className="relative h-[426px] w-full">
					<ImageWithErrorHandler src="/goat.png" alt="" layout="fill" />
				</div>

				<div className="absolute bottom-4 left-16 h-[94px] w-[121px] overflow-hidden rounded-t-lg p-4 shadow-md">
					<ImageWithErrorHandler
						src="/tmp-company-logo.png"
						alt=""
						layout="fill"
						className="h-[94px] w-[121px]"
					/>
				</div>

				<div className="absolute right-8 left-8 -bottom-[0px] h-[16px] bg-white"></div>
			</div>

			<div className="mx-8 bg-white p-8">
				<div>
					<h2 className="border-b border-t border-gray/40 text-[18px] font-semibold text-gray/40 md:border-t-0 md:text-[21px]">
						<span className="hidden text-primary-main md:inline-block">
							Profile
						</span>
						<span className="md:hidden">Company Profile </span>
					</h2>
					<div className="mt-2 space-y-2 md:hidden">
						<div className="relative h-[20px] w-[96px]">
							<Image
								src="/tradewinds-horizontal-logo.png"
								alt=""
								layout="fill"
							/>
						</div>
						<h2 className="text-[18px] font-semibold text-gray/40">
							Farmer Fran Tractor World
						</h2>
					</div>
					<div className="mt-8 grid grid-cols-12 gap-8">
						<div className="col-span-12 grid gap-4 md:col-span-8 md:grid-cols-3">
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

						<div className="relative hidden h-[72px] w-[120px] md:col-span-2 md:block">
							<Image src="/twmp-verified.png" alt="" layout="fill" />
						</div>

						{/* <div className="col-span-12 flex justify-center md:col-span-2 md:block ">
							<div className="relative h-[22px] w-[138px]">
								<Image src="/message-vendor.png" alt="" layout="fill" />
							</div>
						</div> */}
					</div>

					<div className="relative my-8 h-[22px] w-[138px]">
						<Image src="/message-vendor.png" alt="" layout="fill" />
					</div>
				</div>

				{/* About */}
				<div>
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
								<Image src="/video-square.png" alt="" layout="fill" />
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
								<Image src="/video-square.png" alt="" layout="fill" />
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
								<Image src="/video-square.png" alt="" layout="fill" />
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
								<Image src="/video-square.png" alt="" layout="fill" />
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
									Nicee green color
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; // End of CompanyProfileTab component

export default CompanyProfileTab;
