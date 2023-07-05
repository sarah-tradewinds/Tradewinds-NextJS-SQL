import {
	WhyBuyOperationTailContent,
	WhyBuyOperationTailImage
} from './why-buy-operation-tail';

function ProductQualifications() {
	return (
		<div>
			<div className=" container left-1/2  z-50 mx-auto h-[444px]  w-[1330px] justify-center space-y-[20px] rounded-[12px] bg-primary-eco pl-[37px] pt-[37px] pr-[52px]  text-center text-[25px] leading-[30px]  text-beauty ">
				<p>
					Embrace Sustainability and Sell with Purpose on Tradewinds
					Eco. As a seller on Tradewinds Eco, you have the unique
					opportunity to showcase your environmentally focused products
					and make a positive impact on our planet.
				</p>
				<p>
					Our dedicated division promotes conscious commerce by
					upholding rigorous environmental standards and featuring
					brands that prioritize sustainability. By joining Tradewinds
					Eco, you become part of a community that values ethical
					practices and fosters a healthier planet. With our global
					reach and extensive buyer network, you can effectively reach
					eco-conscious consumers who are actively seeking sustainable
					options.
				</p>
				<p>
					Together, let&apos;s drive change and revolutionize the way we
					do business. Join Tradewinds Eco today and be at the forefront
					of the sustainable revolution.
				</p>
			</div>
			<div className="container mx-auto mb-[100px] mt-[74px]">
				<p className="mx-auto h-[58px] w-[753px] text-center text-[50px] font-semibold leading-[60px] text-dark_brown">
					Product Qualifications
				</p>
				<p className=" mx-auto mt-[15px] h-[81px] w-[1241px] text-[25px] leading-[30px] text-gray ">
					We&apos;re driven by the belief that sustainability is the
					only future — and what we do now matters. TWMP hosts
					sustainable, high-performing brands that meet our seven-point
					standard:
				</p>
				<div className=" container mx-auto mt-[51px] flex justify-center space-x-[100px]">
					<div className="flex space-x-[20px]">
						<div className=" mt-[12px] space-y-[45px]">
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/organic.png"
								alt="organic"
								imgClassname="relative w-[32px] h-[31px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/biodegradable.png"
								alt="Biodegradable"
								imgClassname="relative w-[34px] h-[34px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/nontoxic.png"
								alt="Nontoxic"
								imgClassname="relative w-[33px] h-[33px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/sustainanble-img.png"
								alt="Sustainably sourced"
								imgClassname="relative  w-[36px] h-[36px] "
							/>
						</div>
						<div className=" h-[302px] w-[374px] space-y-[40px]">
							<WhyBuyOperationTailContent
								content="Organic"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px] "
							/>
							<WhyBuyOperationTailContent
								content="Biodegradable"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
							/>
							<WhyBuyOperationTailContent
								content="Nontoxic"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
							/>
							<WhyBuyOperationTailContent
								content="Sustainably sourced"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
							/>
						</div>
					</div>
					<div className="flex space-x-[20px]">
						<div className=" mt-[10px] space-y-[45px]">
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/cruelty-free .png"
								alt="cruelty-free "
								imgClassname="relative w-[36px] h-[36px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/renewable.png"
								alt="renewable"
								imgClassname="relative w-[34px] h-[34px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/ethically-sustainably-produced.png"
								alt="Ethically"
								imgClassname="relative w-[42px] h-[38px] "
							/>
						</div>
						<div className=" h-[258px] w-[390px] space-y-[40px]">
							<WhyBuyOperationTailContent
								content="Cruelty-free"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px] "
							/>
							<WhyBuyOperationTailContent
								content="Renewable"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
							/>
							<WhyBuyOperationTailContent
								content="Ethically and sustainably produced"
								contentClassName="text-gray text-[35px] font-semibold leading-[42px]"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductQualifications;
