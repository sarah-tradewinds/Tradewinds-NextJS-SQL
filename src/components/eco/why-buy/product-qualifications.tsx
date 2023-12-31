import { useTranslation } from 'next-i18next';
import {
	WhyBuyOperationTailContent,
	WhyBuyOperationTailImage
} from './why-buy-operation-tail';

function ProductQualifications() {
	const { t } = useTranslation('why_buy');
	return (
		<div>
			{/* Large screen */}
			<div className=" container left-1/2 z-50 mx-auto hidden justify-center rounded-[12px]  bg-primary-eco text-center text-beauty sm:hidden md:block md:h-[280px] md:w-[680px] md:space-y-[13px] md:pr-[27px] md:pt-[12px] md:pl-[19px] md:text-[15px] md:leading-[18px] lg:block lg:h-[313px] lg:w-[907px] lg:space-y-[15px] lg:pr-[36px] lg:pt-[16px] lg:pl-[25px] lg:text-[18px] lg:leading-[21px] desktop:block desktop:h-[444px] desktop:w-[1330px] desktop:space-y-[20px] desktop:pr-[52px] desktop:pt-[37px] desktop:pl-[37px] desktop:text-[25px] desktop:leading-[30px] ">
				<p>
					{t(
						'embrace_sustainability_and_sell_with_purpose_on_Tradewinds_Eco._As_a_seller on Tradewinds Eco, you have the unique opportunity'
					)}
				</p>
				<p>
					{t(
						'our_dedicated_division_promotes_conscious_commerce_by_upholding_rigorous_environmental_standards_and_featuring'
					)}
				</p>
				<p>
					{t(
						"together,_let's_drive_change_and_revolutionize_the_way_we_do_business._Join_Tradewinds_Eco_today_and_be at the forefront of the sustainable revolution."
					)}
				</p>
			</div>
			{/* Mobile and tablet */}
			<div className=" left-1/2 z-50 block h-full w-screen justify-center space-y-[20px] rounded-[0px] bg-primary-eco pb-8 pr-[19px] pt-[13px] pl-[16px] text-left text-[12px] leading-[14px] text-beauty sm:container sm:mx-auto sm:block sm:h-[190px] sm:w-[566px]  sm:space-y-[15px] sm:rounded-[12px] sm:pr-[22px] sm:pt-[10px] sm:pl-[15px] sm:text-center sm:text-[12px] sm:leading-[15px] md:hidden lg:hidden desktop:hidden ">
				<p>
					{t(
						'welcome_to_Tradewinds Marketplace,_your_ultimate_destination_for_global_trade_success._we_understand_the_importance of expanding your business beyond borders and reaching customers around the world. With our innovative platform, we provide a dynamic marketplace where sellers can thrive, and buyers can discover exceptional products.'
					)}
				</p>
				<p>
					{t(
						"whether_you're_a_seasoned_seller_looking_to_expand_your_market_reach_or_a_budding_entrepreneur_ready_to_take_your_business to new heights, Tradewinds Marketplace offers the tools, resources, and support you need to succeed. Get ready to unlock endless possibilities and embark on an exciting journey of global business growth."
					)}
				</p>
			</div>
			<div className="mx-auto mt-[22px] mb-[31px] sm:container  sm:mb-[44px] sm:mt-[23px] md:mt-[35px] md:mb-[40px] lg:mt-[53px] lg:mb-[42px] desktop:mt-[79px] desktop:mb-[81px]">
				<p className="mx-auto h-[31px] text-center text-[15px] font-semibold leading-[18px] text-dark_brown sm:h-[23px] sm:text-[15px] sm:leading-[18px] md:h-[27px] md:text-[18px] md:leading-[21px] lg:h-[41px] lg:text-[50px] lg:leading-[30px] desktop:h-[58px] desktop:w-[753px] desktop:leading-[60px]">
					{t('product_qualifications')}
				</p>
				<p className=" mt-[0px] w-full px-5 text-center text-[12px] leading-[15px] text-gray sm:mx-auto sm:mt-[6px] sm:h-[34px] sm:w-[564px] sm:text-[12px] sm:leading-[15px] md:mt-[7px] md:h-[40px] md:w-[602px] md:text-[12px] md:leading-[14px] lg:mt-[10px] lg:h-[59px] lg:w-[907px] lg:text-[18px] lg:leading-[21px] desktop:mt-[15px] desktop:h-[81px] desktop:w-[1241px] desktop:text-[25px] desktop:leading-[30px] ">
					{t(
						"we're_driven_by_the_belief_that_sustainability_is_the_only_future — and_what_we_do_now_matters._TWMP hosts sustainable, high-performing brands that meet our seven-point standard:"
					)}
				</p>
				<div className=" container mx-auto ml-[67px] mt-[24px] block justify-center space-x-0 sm:!ml-0 sm:mt-[34px] sm:!flex sm:space-x-[45px] md:mt-[20px] md:space-x-[52px] lg:mt-[30px] lg:space-x-[106px] desktop:mt-[51px] desktop:space-x-[100px]">
					<div className=" flex space-x-[7px] sm:space-x-[7px] md:space-x-[9px] lg:space-x-[20px] desktop:space-x-[20px]">
						<div className="mt-[6px] space-y-[17.5px] sm:mt-[6px] sm:space-y-[17.5px] md:mt-[6px] md:space-y-[21.5px] lg:mt-[6px] lg:space-y-[22px] desktop:mt-[12px] desktop:space-y-[45px]">
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/organic.png"
								alt="organic"
								imgClassname="relative w-[12px] h-[12px] sm:w-[12px] sm:h-[12px] md:w-[14px] md:h-[14px] lg:w-[21px] lg:h-[21px] desktop:w-[32px] desktop:h-[31px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/biodegradable.png"
								alt="Biodegradable"
								imgClassname="relative w-[13px] h-[13px] sm:w-[13px] sm:h-[13px] md:w-[15px] md:h-[15px] lg:w-[23px] lg:h-[23px] desktop:w-[34px] desktop:h-[34px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/nontoxic.png"
								alt="Nontoxic"
								imgClassname="relative w-[13px] h-[13px] sm:w-[13px] sm:h-[13px] md:w-[14px] md:h-[14px] lg:w-[23px] lg:h-[23px] desktop:w-[33px] desktop:h-[33px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/sustainanble-img.png"
								alt="Sustainably sourced"
								imgClassname="relative w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[24px] lg:h-[24px] desktop:w-[36px] desktop:h-[36px] "
							/>
						</div>
						<div className=" h-[112px] w-[142px] space-y-[16px] sm:h-[112px] sm:w-[142px] sm:space-y-[16px] md:h-[126px] md:w-[161px] md:space-y-[20px] lg:h-[168px] lg:w-[214px] lg:space-y-[22px] desktop:h-[302px] desktop:w-[374px] desktop:space-y-[40px]">
							<WhyBuyOperationTailContent content={t('organic')} />
							<WhyBuyOperationTailContent
								content={t('biodegradable')}
							/>
							<WhyBuyOperationTailContent content={t('nontoxic')} />
							<WhyBuyOperationTailContent
								content={t('sustainably_sourced')}
							/>
						</div>
					</div>
					<div className="mt-[14px] flex space-x-[7px] sm:!mt-0 sm:space-x-[7px] md:space-x-[9px] lg:space-x-[20px] desktop:space-x-[20px]">
						<div className="mt-[0px] space-y-[19px] sm:mt-[6px] sm:space-y-[17px] md:mt-[6px] md:space-y-[20px] lg:mt-[6px] lg:space-y-[22px] desktop:mt-[10px] desktop:space-y-[45px]">
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/cruelty-free .png"
								alt="cruelty-free "
								imgClassname="relative w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[24px] lg:h-[24px] desktop:w-[36px] desktop:h-[36px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/renewable.png"
								alt="renewable"
								imgClassname="relative w-[14px] h-[14px] sm:w-[14px] sm:h-[13px] md:w-[15px] md:h-[15px] lg:w-[23px] lg:h-[23px] desktop:w-[34px] desktop:h-[34px] "
							/>
							<WhyBuyOperationTailImage
								imageUrl="/eco/why-buy/ethically-sustainably-produced.png"
								alt="Ethically"
								imgClassname="relative w-[16px] h-[15px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px] lg:w-[29px] lg:h-[26px] desktop:w-[42px] desktop:h-[38px] "
							/>
						</div>
						<div className="h-[112px] w-[152px] space-y-[16px] sm:h-[112px] sm:w-[152px] sm:space-y-[16px] md:h-[126px] md:w-[168px] md:space-y-[20px] lg:h-[144px] lg:w-[223px] lg:space-y-[22px] desktop:h-[258px] desktop:w-[390px] desktop:space-y-[40px]">
							<WhyBuyOperationTailContent content={t('cruelty_free')} />
							<WhyBuyOperationTailContent content={t('renewable')} />
							<WhyBuyOperationTailContent
								content={t('ethically_and_sustainably_produced')}
							/>
						</div>
					</div>
				</div>
				<div className=" hidden text-center sm:mt-[53px] sm:block md:mt-[44px] md:block lg:mt-[55px] lg:block desktop:hidden">
					<button
						// onClick={setIsSignUpOpen}
						className=" bg-secondary font-medium text-white sm:h-[25px] sm:w-[135px] sm:rounded-[5px] sm:text-[10px] md:h-[29px] md:w-[156px] md:rounded-[8px] md:text-[12px] lg:h-[39px] lg:w-[209px] lg:rounded-[10px] lg:text-[16px] desktop:h-[60px] desktop:w-[319px] desktop:rounded-[10px] desktop:text-[25px] "
					>
						{t('common:join_now')}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductQualifications;
