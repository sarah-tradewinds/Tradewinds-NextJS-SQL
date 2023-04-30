import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

// Third party packages
import { Tab } from '@headlessui/react';
import Button from 'components/common/form/button';
import { alphabets } from 'data/common.data';
import { getAllCategoryByAlphabets } from 'lib/categories.lib';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	HiMinusCircle,
	HiOutlineSearch,
	HiPlusCircle
} from 'react-icons/hi';

// lib
import { useCategoryStore } from 'store/category-store';

const CategoriesPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ allCategoryByAlphabets }) => {
	const [showAll, setShowAll] = useState(false);

	const { t } = useTranslation();

	const router = useRouter();
	const removeCategoryFilter = useCategoryStore(
		(state) => state.removeCategoryFilter
	);

	const alphabetList = showAll ? alphabets : [...alphabets].slice(0, 3);

	const namesByLetter: any = {};
	// loop through the names array
	for (let name of allCategoryByAlphabets) {
		// get the first letter of the name
		const firstLetter = name.title.en[0];

		if (!namesByLetter[firstLetter]) {
			namesByLetter[firstLetter] = [];
		}

		namesByLetter[firstLetter].push(name?.title?.en);
	}
	return (
		<div className="relative mx-auto w-[322px] font-inter md:w-[744px] lg:w-[1512px]">
			<div className="relative ">
				<div className="absolutes h-[368px] w-full bg-[url(/hero-image-6500-banner.png)] md:h-[478px] lg:h-[706px]"></div>
				<div className="absolute ml-[15px] -mt-[322px] md:-mt-[422px] md:ml-[26px] lg:ml-[114px] lg:-mt-[630px] ">
					<p className="  to-primary-main bg-clip-text text-[29px] font-semibold text-white md:text-[43px] lg:text-[59px]  lg:leading-[71px]">
						Over 6,500 products
					</p>

					<p className=" w-[213px] to-primary-main bg-clip-text text-[16px] font-semibold text-white md:w-[398px] md:text-[18px]  lg:w-[686px] lg:text-[30px] ">
						Source from around the world in one place
					</p>
				</div>
			</div>
			<div className=" relative z-[3] mx-auto -mt-[55px] mb-32 md:-mt-[250px] md:w-[702px]  lg:-mt-[375px]  lg:w-[1469px] ">
				<Tab.Group>
					<Tab.List className="ml-[9px] flex space-x-[6px] border-b border-gray/40 bg-transparent text-[18px] font-semibold  text-gray/40  md:ml-[17px] md:flex md:space-x-[9px] lg:ml-[16px] lg:flex lg:space-x-[13px]">
						<Tab
							className={({ selected }: { selected: boolean }) =>
								`font-semibold ${
									selected
										? ' rounded-t-lg border-none bg-white text-gray'
										: ''
								}`
							}
						>
							<div className="h-[41px] w-[150px] rounded-t-lg bg-white/50  text-[18px] md:w-[322px] md:text-[25px] lg:w-[446px] lg:text-[25px]">
								Catagories
								<input
									type="search"
									id="gsearch"
									name="gsearch"
									placeholder="Search....."
									className=" ml-[13px] hidden rounded-md border border-gray/40 bg-transparent pl-[9px] text-[15px] font-normal text-gray md:inline md:h-[20px] md:w-[162px] lg:inline lg:h-[26px] lg:w-[283px]"
								/>
							</div>
						</Tab>
						<Tab
							className={({ selected }: { selected: boolean }) =>
								`font-semibold ${
									selected ? ' rounded-t-lg bg-white text-gray' : ''
								}`
							}
						>
							<div className="h-[41px] w-[150px] rounded-t-lg bg-white/50  text-[18px]  md:w-[299px] md:text-[25px] lg:w-[429px] lg:text-[25px]">
								Products
								<input
									type="search"
									id="gsearch"
									name="gsearch"
									placeholder="Search....."
									className="ml-[13px] hidden rounded-md border border-gray/40 bg-transparent pl-[9px] text-[15px] font-normal text-gray md:inline md:h-[20px] md:w-[162px] lg:inline lg:h-[26px] lg:w-[283px]"
								/>
							</div>
						</Tab>
					</Tab.List>

					<Tab.Panels>
						<Tab.Panel>
							<div className="-mt-[6px] rounded-md bg-white  pt-[9px]">
								{/* This only for mobile */}
								<div className=" ml-[11px] h-[29px] w-[288px] rounded-sm border border-gray md:hidden lg:hidden">
									<Button
										type="submit"
										className="-mt-[10px] -ml-[24px] h-[38px] w-[38px] cursor-pointer"
									>
										<HiOutlineSearch className="cursor-pointer text-[17px] text-gray " />
									</Button>
									<input
										type="search"
										id="gsearch"
										name="gsearch"
										placeholder="Search....."
										className="  active:  border border-transparent border-t-transparent text-[15px] font-normal text-gray "
									/>
								</div>
								{/* List of alphabets */}
								<div className="flex items-center justify-between pl-[16px] pt-[7px] pr-[14px] md:mx-[20px] lg:space-x-16 lg:p-[16px]">
									{/* Line */}
									<div className="hidden h-[2px] w-[17px] rounded-full bg-gray md:block lg:w-full"></div>

									{/* List of alphabets */}

									<div className="float-left flex flex-wrap space-x-[11px] md:flex-wrap md:space-x-2  md:text-[18px] lg:flex-nowrap lg:space-x-4 lg:text-[24px]">
										{alphabets.map((alphabet, index) => {
											return (
												<Link
													href={`#${alphabet}`}
													key={alphabet}
													onClick={() => {
														if (!showAll && index >= 2) {
															setShowAll(true);
														}
													}}
													className="mx-2 cursor-pointer border-b-2 border-gray  to-primary-eco bg-clip-text  text-gray md:text-[18px] lg:text-[24px]"
												>
													{alphabet}
												</Link>
											);
										})}
									</div>

									{/* Line */}
									<div className="hidden h-[2px] w-[17px] rounded-full bg-gray md:block lg:w-full"></div>
								</div>

								<div className=" md:mx[20px] mx-[20px] mt-[16px] columns-1 text-[15px] md:columns-3 lg:mx-[27px] lg:mt-[17px] lg:columns-5 lg:gap-[45px]">
									{alphabetList.map((alphabet, index) => {
										const categories = namesByLetter[alphabet] || [];

										if (categories.length <= 2) return null;

										const slicedAnUnslicedCategories = showAll
											? categories
											: [...categories].slice(0, 29);

										return (
											<div key={alphabet} className="mb-[20px]">
												<p
													id={alphabet}
													className="inline-block border-b-2 text-[15px] font-semibold"
												>
													{alphabet}
												</p>

												{/* Categories */}
												<div>
													{slicedAnUnslicedCategories.map(
														(category: string) => {
															return (
																<p
																	key={category}
																	className="cursor-pointer hover:font-semibold hover:text-cyan hover:underline"
																	onClick={() => {
																		removeCategoryFilter();
																		router.push(
																			`/product-search?categories=${encodeURIComponent(
																				category
																			)}`
																		);
																	}}
																>
																	{category}
																</p>
															);
														}
													)}
												</div>
											</div>
										);
									})}
								</div>

								{/* actions */}
								<div className="flex justify-end md:flex lg:flex">
									<Button
										onClick={() =>
											setShowAll((prevState) => !prevState)
										}
									>
										{showAll ? (
											<HiMinusCircle className="text-[50px] text-cyan" />
										) : (
											<HiPlusCircle className="text-[50px] text-cyan" />
										)}
									</Button>
								</div>
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
			{/* <div className="border-teal-500 flex items-center border py-2 lg:h-[26px] lg:w-[283px]">
				<input
					className="text-gray-700 mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight focus:outline-none"
					type="text"
					placeholder="Search"
				/>
				<Button
					type="submit"
					// className="flex h-6 w-[16%] cursor-pointer justify-center px-0 md:!w-[33px] lg:w-[4vw] xl:w-[3vw]"
					// className="flex cursor-pointer items-center justify-center !rounded-r-full !px-0 !py-0 md:!w-[33px] lg:!w-[32.24px]"
				>
					<HiOutlineSearch className="text-gray md:h-[15.72px] md:w-[15.72px]" />
				</Button>
			</div> */}
		</div>
		// <div className="relative ">
		// 	<div className="relative ">
		// 		<div className="absolutes h-[320px] w-full bg-[url(/hero-image-6500-banner.png)] lg:h-[360px]">
		// 			{/* <Image src="/trending.png" alt="trending" fill={true} /> */}
		// 		</div>

		// 		<div className="absolute ml-[114px] lg:-mt-[290px] ">
		// 			<p className="  to-primary-main  bg-clip-text font-semibold text-white md:text-[43px] lg:text-[59px]  lg:leading-[71px]">
		// 				Over 6,500 products
		// 			</p>
		// 			<p className=" to-primary-main bg-clip-text font-semibold text-white  md:text-[18px] lg:text-[30px] ">
		// 				Source from around the world in one place
		// 			</p>
		// 		</div>
		// 	</div>

		// 	<div className="z-1  md:p-4 lg:w-[1469px] ">
		// 		<Tab.Group>
		// 			<Tab.List className="  md:ml-16 pc:flex">
		// 				<Tab className="  rounded-t-lg bg-white text-[25px] font-semibold lg:h-[41px] lg:w-[446px]">
		// 					Catagories
		// 					<input type="text" />
		// 				</Tab>
		// 				<Tab className="  rounded-t-lg bg-white text-[25px] font-semibold lg:h-[41px] lg:w-[446px]">
		// 					Products
		// 					<input type="text" />
		// 				</Tab>
		// 			</Tab.List>

		// 			<Tab.Panels>
		// 				<Tab.Panel>
		// 					<div className="rounded-md bg-white">
		// 						{/* List of alphabets */}
		// 						<div className="flex items-center justify-between p-4 lg:space-x-16 lg:p-8">
		// 							{/* Line */}
		// 							<div className="hidden h-[2px] w-[17px] rounded-full bg-green md:block lg:w-full"></div>

		// 							{/* List of alphabets */}
		// 							<div className="flex flex-wrap md:flex-nowrap lg:space-x-4">
		// 								{alphabets.map((alphabet, index) => {
		// 									return (
		// 										<Link
		// 											href={`#${alphabet}`}
		// 											key={alphabet}
		// 											onClick={() => {
		// 												if (!showAll && index >= 2) {
		// 													setShowAll(true);
		// 												}
		// 											}}
		// 											className="mx-2 cursor-pointer border-b-2 border-green bg-gradient-to-r from-green to-primary-eco bg-clip-text text-[18px] text-transparent lg:text-[24px]"
		// 										>
		// 											{alphabet}
		// 										</Link>
		// 									);
		// 								})}
		// 							</div>

		// 							{/* Line */}
		// 							<div className="hidden h-[2px] w-[17px] rounded-full bg-primary-main md:block lg:w-full"></div>
		// 						</div>

		// 						{/* List of all categories by alphabets */}
		// 						<div className="columns-1 gap-8 p-8 md:columns-3 lg:columns-5">
		// 							{alphabetList.map((alphabet, index) => {
		// 								const categories =
		// 									(allCategoryByAlphabets as any)[alphabet] || [];

		// 								if (categories.length <= 0) return null;

		// 								const slicedAnUnslicedCategories = showAll
		// 									? categories
		// 									: [...categories].slice(0, 24);

		// 								return (
		// 									<div key={alphabet} className="mb-8">
		// 										<p
		// 											id={alphabet}
		// 											className="inline-block border-b-2 text-[15px] font-semibold"
		// 										>
		// 											{alphabet}
		// 										</p>

		// 										{/* Categories */}
		// 										<div>
		// 											{slicedAnUnslicedCategories.map(
		// 												(category: string) => {
		// 													return (
		// 														<p
		// 															key={category}
		// 															className="cursor-pointer hover:font-semibold hover:text-cyan hover:underline"
		// 															onClick={() => {
		// 																removeCategoryFilter();
		// 																router.push(
		// 																	`/product-search?categories=${encodeURIComponent(
		// 																		category
		// 																	)}`
		// 																);
		// 															}}
		// 														>
		// 															{category}
		// 														</p>
		// 													);
		// 												}
		// 											)}
		// 										</div>
		// 									</div>
		// 								);
		// 							})}
		// 						</div>

		// 						{/* actions */}
		// 						<div className="flex justify-end">
		// 							<Button
		// 								onClick={() =>
		// 									setShowAll((prevState) => !prevState)
		// 								}
		// 							>
		// 								{showAll ? (
		// 									<HiMinusCircle className="text-[32px] text-cyan" />
		// 								) : (
		// 									<HiPlusCircle className="text-[32px] text-cyan" />
		// 								)}
		// 							</Button>
		// 						</div>
		// 					</div>
		// 				</Tab.Panel>
		// 			</Tab.Panels>
		// 		</Tab.Group>
		// 	</div>
		// </div>
	);
}; // End of CategoriesPage

export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	const allCategoryByAlphabets = await getAllCategoryByAlphabets();

	return {
		props: {
			...(await serverSideTranslations(locale || 'en')),
			allCategoryByAlphabets
		}
	};
};

export default CategoriesPage;
