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
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

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

	return (
		<div className="relative ">
			<div className="relative ">
				<div className="absolutes h-[320px] w-full bg-[url(/hero-image-6500-banner.png)] lg:h-[360px]">
					{/* <Image src="/trending.png" alt="trending" fill={true} /> */}
				</div>

				<div className="absolute ml-[114px] lg:-mt-[360px]">
					<h2 className="bg-gradient-to-r  to-primary-main bg-clip-text font-semibold text-white   md:text-[43px] lg:text-[59px]">
						Over 6,500 products
					</h2>
					<p className="bg-gradient-to-r to-primary-main bg-clip-text font-semibold text-white  md:text-[18px] lg:text-[30px] ">
						Source from around the world in one place
					</p>
				</div>
			</div>

			<div className="-mt-[60px] md:p-4 lg:w-[1469px] ">
				<Tab.Group>
					<Tab.List className="  md:ml-16 pc:flex">
						<Tab className=" z-50 rounded-t-lg bg-white text-[25px] font-semibold lg:h-[41px] lg:w-[446px]">
							Catagories
							<input type="text" />
						</Tab>
					</Tab.List>

					<Tab.Panels>
						<Tab.Panel>
							<div className="rounded-md bg-white">
								{/* List of alphabets */}
								<div className="flex items-center justify-between p-4 lg:space-x-16 lg:p-8">
									{/* Line */}
									<div className="hidden h-[2px] w-[17px] rounded-full bg-green md:block lg:w-full"></div>

									{/* List of alphabets */}
									<div className="flex flex-wrap md:flex-nowrap lg:space-x-4">
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
													className="mx-2 cursor-pointer border-b-2 border-green bg-gradient-to-r from-green to-primary-eco bg-clip-text text-[18px] text-transparent lg:text-[24px]"
												>
													{alphabet}
												</Link>
											);
										})}
									</div>

									{/* Line */}
									<div className="hidden h-[2px] w-[17px] rounded-full bg-primary-main md:block lg:w-full"></div>
								</div>

								{/* List of all categories by alphabets */}
								<div className="columns-1 gap-8 p-8 md:columns-3 lg:columns-5">
									{alphabetList.map((alphabet, index) => {
										const categories =
											(allCategoryByAlphabets as any)[alphabet] || [];

										if (categories.length <= 0) return null;

										const slicedAnUnslicedCategories = showAll
											? categories
											: [...categories].slice(0, 24);

										return (
											<div key={alphabet} className="mb-8">
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
								<div className="flex justify-end">
									<Button
										onClick={() =>
											setShowAll((prevState) => !prevState)
										}
									>
										{showAll ? (
											<HiMinusCircle className="text-[32px] text-cyan" />
										) : (
											<HiPlusCircle className="text-[32px] text-cyan" />
										)}
									</Button>
								</div>
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
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
