import { NextPage } from 'next';
import Image from 'next/image';

// components
import Button from 'components/website/common/form/button';
import CategorySubCategoriesSection from 'components/website/home/category-sub-categories-section';
import ProductDetailsTile from 'components/website/product-details/product-details-tile';

// data
import { AgriData } from 'data/home';

const ProductDetailsPage: NextPage = (props) => {
	return (
		<div className=" space-y-8 pb-16">
			<ProductDetailsTile />

			{/* Tabs */}
			<div className="mx-8 rounded bg-white">
				{/* Tab Buttons */}
				<div className="flex space-x-4 bg-gray/20">
					<Button className="rounded-none rounded-t-md bg-white !text-primary-main">
						Product Details
					</Button>
					<div>
						<Button className="mb-2 rounded-none rounded-t-md bg-white text-[21px] font-normal !text-gray">
							Reviews / Videos
						</Button>
					</div>
					<div>
						<Button className="mb-2 rounded-none rounded-t-md bg-white text-[21px] font-normal !text-gray">
							Company Profile{' '}
						</Button>
					</div>
				</div>

				{/* Tab Body */}
				<div className="space-y-16 p-8">
					{/* PRODUCT DETAILS */}
					<div>
						<p className="border-b-2 border-gray/40 text-[21px] font-semibold text-gray">
							PRODUCT DETAILS
						</p>
						<div className="flex justify-between p-4">
							<div className="space-y-2">
								<p className="flex justify-between  space-x-8 text-[18px] text-gray">
									<span className="font-semibold">Model Number:</span>
									<span>XXXXXXX</span>
								</p>
								<p className="flex justify-between  space-x-8 text-[18px] text-gray">
									<span className="font-semibold">SKU:</span>
									<span>XXXXXXX</span>
								</p>
								<p className="flex justify-between  space-x-8 text-[18px] text-gray">
									<span className="font-semibold">
										Place of Origin:
									</span>
									<span>XXXXXXX</span>
								</p>
								<p className="flex justify-between space-x-8 text-[18px]  text-gray">
									<span className="font-semibold">Ready to ship:</span>
									<span>Yes/ No</span>
								</p>
								<p className="flex justify-between space-x-8 text-[18px]  text-gray">
									<span className="font-semibold">Lead time:</span>
									<span>XXXXXXX</span>
								</p>
								<p className="flex justify-between space-x-8 text-[18px]  text-gray">
									<span className="font-semibold">MOQ:</span>
									<span>XXXXXXX</span>
								</p>
							</div>
							<div className="space-y-2">
								<p className="flex justify-between  space-x-8 text-[18px] text-gray">
									<span className="font-semibold">CERTIFICATION:</span>
									<span> CE / EU</span>
								</p>
								<p className="flex justify-between  space-x-8 text-[18px] text-gray">
									<span className="font-semibold">Variants:</span>
									<div>
										<span>Variants 1</span>
										<span>Variants 2</span>
										<span>Variants 3</span>
									</div>
								</p>
							</div>
						</div>
					</div>

					{/* SUPPLY ABILITY */}
					<div>
						<p className="border-b-2 border-gray/40 text-[21px] font-semibold text-gray">
							SUPPLY ABILITY
						</p>
						<div className="flex justify-between p-4">
							<div className="space-y-2">
								<p className="flex justify-between space-x-8 text-[18px]  text-gray">
									<span className="font-semibold">DRINKWARE TYPE:</span>
									<span>Water Bottles</span>
								</p>
							</div>
						</div>
					</div>

					{/* Shipping Details */}
					<div>
						<p className="border-b-2 border-gray/40 text-[21px] font-semibold text-gray">
							Shipping Details
						</p>
						<div className="flex justify-between p-4">
							<div className="space-y-2">
								<p className="flex justify-between space-x-8 text-[18px]  text-gray">
									<span className="font-semibold">
										Shipping Dimension:
									</span>
									<span>000x000x000xxxx</span>
								</p>
								<p className="flex justify-between space-x-8 text-[18px]  text-gray">
									<span className="font-semibold">
										Product Dimension:
									</span>
									<span>000x000x000xxxx</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Similar Product */}
			<div className="mx-4 rounded bg-white p-4">
				<h3 className="text-[25px] font-semibold text-primary-main">
					Similar Product
				</h3>
				<div className="flex justify-between 2xl:px-8">
					<div>
						<div className="relative h-[205px] w-[240px]">
							<Image
								src="/vehicles/green-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="f ont-bold flex justify-between space-x-8 text-[18px] text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
					<div>
						<div className="relative h-[205px] w-[298px]">
							<Image
								src="/vehicles/green-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="f ont-bold flex justify-between space-x-8 text-[18px] text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
					<div>
						<div className="relative h-[205px] w-[298px]">
							<Image
								src="/vehicles/green-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="flex justify-between space-x-8 text-[18px]  font-bold text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
					<div>
						<div className="relative h-[205px] w-[298px]">
							<Image
								src="/vehicles/green-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="flex justify-between space-x-8 text-[18px]  font-bold text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
				</div>
			</div>

			{/* Categories */}
			<div className="mx-4 rounded bg-white">
				<CategorySubCategoriesSection catSubCat={AgriData} />
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ProductDetailsPage;
