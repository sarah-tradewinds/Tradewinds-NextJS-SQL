const ProductSearchFilterBar = () => {
	// let droDownParent =
	// 	"after:color-[#C4C4C4] relative float-left m-[50px/33%] min-w-[200px] after:pointer-events-none after:absolute after:right-[11px] after:top-[-31px] after:text-[35px] after:p-2 after:text-[#C4C4C4] after:content-['\2304']";
	let dropDownSelect =
		'focus:shadow-outline block w-full max-w-[250px] cursor-pointer border-[1px] border-solid border-[#C4C4C4] py-1 px-2 leading-tight focus:outline-none md:px-3 md:py-[5px]';

	return (
		<div className="sticky top-[188.5px] z-[1000] w-full sm:top-[112px] md:px-4 md:pt-2 lg:px-6 lg:pt-4">
			<div className="flex justify-between bg-white p-1 md:rounded-md md:p-2  lg:p-3">
				{/* Live Buy/ Ready to ship - checkbox */}
				<label className="flex cursor-pointer items-center">
					<input
						type="checkbox"
						className="!rounded-none md:scale-125"
					/>
					<span className="ml-2 text-[10px] font-semibold text-gray md:text-[12px] lg:text-[15px]">
						Live Buy/ Ready to ship
					</span>
				</label>
				{/* Customizable - checkbox */}
				<label className="flex cursor-pointer items-center">
					<input
						type="checkbox"
						className="!rounded-none md:scale-125"
					/>
					<p className="ml-2 text-[10px] font-semibold text-gray md:text-[12px] lg:text-[15px]">
						Customizable
					</p>
				</label>
				{/* Country - dropdown */}
				<div className="flex items-center">
					<label
						htmlFor="country"
						className="mr-2 text-[10px] font-semibold text-gray md:text-[12px] lg:text-[15px]"
					>
						Country
					</label>
					<select
						name="country"
						id="country"
						className={dropDownSelect}
					>
						<option value="">Select a country</option>
						<option value="afghanistan">Afghanistan</option>
						<option value="albania">Albania</option>
						<option value="algeria">Algeria</option>
						<option value="usa">United State</option>
					</select>
				</div>
				{/* Min. Order - dropdown */}
				<div className="flex w-full max-w-[250px] items-center">
					<label
						htmlFor="country"
						className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray md:text-[12px] lg:text-[15px]"
					>
						Min. Order
					</label>
					<select
						name="country"
						id="country"
						className={dropDownSelect}
					>
						<option value="">0 - 10</option>
						<option value="0 - 1">0 - 1</option>
						<option value="0 - 2">0 - 2</option>
						<option value="0 -  3">0 - 3</option>
						<option value="0 - 4">0 - 4</option>
					</select>
				</div>
				{/* Dollar - dropdown */}
				<div className="flex w-full max-w-[250px] items-center">
					<label
						htmlFor="country"
						className="mr-2  text-[10px] font-semibold text-gray md:text-[12px] lg:text-[15px]"
					>
						$$$
					</label>
					<select
						name="country"
						id="country"
						className={dropDownSelect}
					>
						<option className="text-gray" value="">
							$0 - $10
						</option>
						<option value="$0 - $1">$0 - $1</option>
						<option value="$0 - $2">$0 - $2</option>
						<option value="$0 - $3">$0 - $3</option>
						<option value="$0 - $4">$0 - $4</option>
					</select>
				</div>
			</div>
		</div>
	);
};
//end of ProductSearchFilterBar

export default ProductSearchFilterBar;
