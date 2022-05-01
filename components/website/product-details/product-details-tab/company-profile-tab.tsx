import Image from 'next/image';

const CompanyProfileTab: React.FC = () => {
	return (
		<div className="space-y-16 bg-white p-8">
			{/* 	Farmer Fran Tractor World */}
			<div>
				<h2 className="border-b border-gray/40 text-[21px] font-semibold text-gray/40">
					Farmer Fran Tractor World
				</h2>
				<div className="grid grid-cols-12 gap-8">
					<div className="col-span-8 grid grid-cols-3 gap-4">
						<p className="flex space-x-8 text-[18px]">
							<span className="min-w-[148px] font-semibold">
								Country:
							</span>
							<span>Applicable</span>
						</p>
						<p className="flex space-x-8 text-[18px]">
							<span className="min-w-[148px] font-semibold">
								TW page:
							</span>
							<span>CE / EU</span>
						</p>
						<p className="flex space-x-8 text-[18px]">
							<span className="min-w-[148px] font-semibold">
								Established:
							</span>
							<span>Water Bottles</span>
						</p>
						<p className="flex space-x-8 text-[18px]">
							<span className="min-w-[148px] font-semibold">
								Certification:
							</span>
							<span>Water Bottles</span>
						</p>
						<p className="flex space-x-8 text-[18px]">
							<span className="min-w-[148px] font-semibold">
								Member Since:
							</span>
							<span>2022</span>
						</p>
						<p className="flex justify-between text-[18px]">
							<span className="font-semibold">Country:</span>
							<span>Applicable</span>
						</p>
					</div>

					<div className="relative col-span-2 h-[114px] w-[172px]">
						<Image src="/twmp-verified.png" alt="" layout="fill" />
					</div>
					<div className="relative col-span-2 h-[22px] w-[138px]">
						<Image src="/message-vendor.png" alt="" layout="fill" />
					</div>
				</div>
			</div>

			{/* About */}
			<div>
				<h2 className="border-b border-gray/40 text-[21px] font-semibold text-gray/40">
					About
				</h2>
				<p className="mt-1 text-[18px] text-gray/40">
					Reviewed in the United States on December 8, 2021 Verified
					Purchase Unfortunately, one of the skewers arrived without a
					hole to mount the handle. Fortunately, my spouse has an
					incredible workshop & was able to drill the holes needed to
					mount the handle. Otherwise, the male & female skewers were
					great quality and I know my friend will love them for her fire
					pit.
				</p>
			</div>

			{/* Photos/Videos */}
			<div>
				<h2 className="border-b border-gray/40 text-[21px] font-semibold text-gray/40">
					Photos/Videos
				</h2>
				<div className="mt-8 grid grid-cols-3 gap-8 lg:grid-cols-4 lg:px-8">
					<div>
						<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
							<Image src="/video-square.png" alt="" layout="fill" />
						</div>
						<p className="flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
							Video 1
						</p>
						<p className="text-[15px] text-gray/40">
							Special Notice Text
						</p>
					</div>
					<div>
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
					<div>
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
					<div>
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

			{/* Fetured Product */}
			<div>
				<h2 className="border-b border-gray/40 text-[21px] font-semibold text-gray/40">
					Fetured Product
				</h2>
				<div className="mt-8 grid grid-cols-3 gap-8 lg:grid-cols-4 lg:px-8">
					<div>
						<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
							<Image
								src="/vehicles/yellow-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
					<div>
						<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
							<Image
								src="/vehicles/yellow-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
					<div>
						<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
							<Image
								src="/vehicles/yellow-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
					<div>
						<div className="relative h-[170px] w-[196px] xl:h-[186px] xl:w-[215px]">
							<Image
								src="/vehicles/yellow-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}; // End of CompanyProfileTab component

export default CompanyProfileTab;
