import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

// components
import Button from 'components/common/form/button';

// lib
import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Seo from 'components/common/seo';
import { alphabets } from 'data/common.data';
import { getAllCategoryByAlphabets } from 'lib/categories.lib';
import { useCategoryStore } from 'store/category-store';
import { getLocaleText } from 'utils/get_locale_text';

const CategoriesPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ allCategoryByAlphabets }) => {
	const [showAll, setShowAll] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	console.log('allCategoryByAlphabets=', allCategoryByAlphabets);

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

		namesByLetter[firstLetter].push(name);
	}

	const [value, setValue] = useState('');
	const Searchvalue = (event: any) => {
		setValue(event.target.value);
	};

	const {
		setMainCategory,
		setCategory,
		setSubCategory,
		setSpecificCategory
	} = useCategoryStore();

	const navigateWithShallow = (query: { [key: string]: any }) => {
		router.push({ pathname: '/product-search', query }, undefined, {
			shallow: true
		});
	}; // End of navigateWithShallow function

	const generateUrl = (category: any) => {
		//maincat
		if (category?.IsMainCat === true) {
			const { value } = setMainCategory(
				category?.id,
				category?.title?.en || ''
			);

			navigateWithShallow({
				main_category: value
			});
		}

		// cat
		if (category?.IsCat === true) {
			setMainCategory(
				category?.MainCatId || category?.main_category_id,
				category?.MainCatName || ''
			);
			const params = setCategory(category.id, category.title.en || '');
			navigateWithShallow(params?.payload);
		}

		//subCat
		if (category?.IsSubCat === true) {
			setMainCategory(
				category?.MainCatId || category?.main_category_id,
				category?.MainCatName || ''
			);
			const params = setSubCategory(
				category.category_id || '',
				category.CatName || '',
				category.id,
				category.title.en || ''
			);
			navigateWithShallow(params?.payload);
		}

		// specific cat
		if (category?.IsSpecCat === true) {
			setMainCategory(
				category?.MainCatId || category?.main_category_id,
				category?.MainCatName || ''
			);
			const params = setSpecificCategory(
				category.category_id || category.CatId,
				category.CatName || '',
				category.sub_category_id || '',
				category.SubCatName || '',
				category.id,
				category.title.en || ''
			);
			navigateWithShallow(params?.payload);
		}
	};

	const searchBar = (
		<Combobox
			value={searchQuery}
			onChange={(v) => {
				console.log('sss', v);
			}}
		>
			<div className="relative mt-1">
				<div className="relative">
					<Combobox.Input
						placeholder="Search....."
						className="h-[27.55px] w-[273.59px] rounded-md border-[0.74px] border-[#DCDBDB] px-4 outline-none sm:h-[17.97px] sm:w-[145.57px] sm:rounded-sm md:h-[20px] md:w-[162px] md:border-[0.78px] lg:h-[20px] lg:w-[162px] lg:border-[1.04px]"
						displayValue={(categoryByAlphabets: any) =>
							categoryByAlphabets?.title?.en
						}
						onChange={({ target }) =>
							setSearchQuery(target?.value || '')
						}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 hidden items-center pr-2 sm:flex">
						<MagnifyingGlassIcon
							className="h-[11.73px] w-[11.26px] text-gray lg:h-[17.43px] lg:w-[16.73px]"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>

				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Combobox.Options className="absolute mt-1 max-h-60 w-full space-y-1 overflow-auto rounded-md bg-white p-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{!searchQuery && (
							<div className="text-gray-700 relative cursor-default select-none py-2 px-4">
								{t('nothing_found')}
							</div>
						)}

						{allCategoryByAlphabets
							.filter((categoryByAlphabets: any) => {
								const searchTerm = searchQuery.toLowerCase();
								const category =
									categoryByAlphabets.title.en.toLowerCase();
								return searchTerm && category.startsWith(searchTerm);
							})
							.slice(0, 10)
							.map((categoryByAlphabets: any) => (
								<div
									key={categoryByAlphabets?.id}
									className="cursor-pointer text-[15px] lg:pl-4"
									onClick={() => {
										generateUrl(categoryByAlphabets);
									}}
								>
									{getLocaleText(
										categoryByAlphabets.title,
										router?.locale
									)}
								</div>
							))}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);

	const actionButton = (
		<Button onClick={() => setShowAll((prevState) => !prevState)}>
			{showAll ? (
				<HiMinusCircle className="text-[50px] text-cyan desktop:text-[27px]" />
			) : (
				<HiPlusCircle className="text-[50px] text-cyan desktop:text-[27px]" />
			)}
		</Button>
	);

	return (
		<>
			<Seo title="A-Z Categories" />
			<div className="relative overflow-x-hidden">
				{/* Image */}
				<div className="relative 3xl:container ">
					<div className="h-[280px] w-full bg-[url(/images/6500-categories-banner.svg)] bg-center bg-no-repeat md:h-[440px] lg:h-[706px]"></div>

					<div className="absolute top-8 ml-[15px] sm:top-[74px] desktop:mt-[90px] desktop:ml-[116px]">
						<p className="text-[25px] font-semibold leading-[30.26px] text-white sm:text-[43px] sm:leading-[52.04px] desktop:text-[59.05px] desktop:leading-[71.46px]">
							{t('over_6,500_products')}
						</p>

						<p className="w-[216px] text-[15px] font-semibold leading-[18.15px] text-white sm:text-[18px] sm:leading-[21.78px] md:w-auto  desktop:text-[29.13px] desktop:leading-[35.25px]">
							{t('source_from_around_the_world_in_one_place')}
						</p>
					</div>
				</div>

				{/* content */}
				<div className="relative md:container md:w-[698px] lg:w-[931.58px] xl:w-[1236px]">
					<div className="-mt-16 md:-mt-48 lg:-mt-96">
						<div className="pl-2 sm:pl-[50px]">
							<div className="flex h-[38.95px] w-[142.49px] items-center justify-center rounded-t-xl bg-white sm:h-[36.84px] sm:w-[289.34px] sm:justify-between sm:px-2 md:h-[41px] md:w-[322px] lg:h-[54.72px] lg:w-[322px] desktop:h-[41px] desktop:w-[446px]">
								<button className="text-[17.1px] font-semibold leading-[20.69px] text-gray sm:text-[20px] sm:leading-[24.2px] md:text-[25px] md:leading-[30.26px] lg:w-[33.37px] lg:leading-[40.38px] desktop:text-[25px] desktop:leading-[30.26px]">
									Categories
								</button>
								<div className="hidden sm:block">{searchBar}</div>
							</div>
						</div>

						<div className="rounded-t-lg bg-white">
							{/* Search bar */}
							<div className="relative mb-[6.65px] flex justify-center pt-4 sm:hidden">
								{searchBar}
							</div>

							{/* Alphabets and categories */}
							<div className="bg-white pl-[18px] sm:mx-[4.49px] sm:pl-0">
								{/* Alphabets */}
								<div className="flex flex-wrap sm:items-center sm:justify-center">
									<div className="hidden h-[0.9px] w-[15.28px] bg-gray sm:mr-2 sm:block  md:mr-3 desktop:h-[1px] desktop:w-[140px]"></div>
									{alphabets.map((alphabet, index) => {
										return (
											<Link
												key={alphabet}
												href={`#${alphabet}`}
												onClick={() => {
													if (!showAll && index >= 2) {
														setShowAll(true);
													}
												}}
												className="mr-2 mt-1 inline-block border-b-2 border-gray text-[17px] leading-[25.65px] text-gray sm:text-[18px] sm:leading-[19.77px] md:mr-3 lg:text-[26.69px] lg:leading-[29.36px] desktop:text-[24px] desktop:leading-[22px]"
											>
												{alphabet}
											</Link>
										);
									})}
									<div className="hidden h-[0.9px] w-[15.28px] bg-gray sm:mr-2 sm:block  md:mr-3 desktop:h-[1px] desktop:w-[140px]"></div>
									<div className="hidden desktop:block">
										{actionButton}
									</div>
								</div>

								{/* Categories in Alphabetic order */}
								<div className="mt-[14.5px] sm:mt-[28.63px] sm:ml-[48px] sm:columns-2 xl:mt-[35px] xl:columns-4">
									{alphabetList.map((alphabet, index) => {
										const categories = namesByLetter[alphabet] || [];

										if (categories.length <= 2) return null;

										const slicedAnUnslicedCategories = showAll
											? categories
											: [...categories].slice(0, 29);

										return (
											<div
												key={alphabet}
												className={`${
													index > 0 ? 'mt-5' : ''
												} text-[15px] leading-[20.9px] text-gray sm:text-[18px] sm:leading-[19.77px] md:leading-[22px] lg:leading-[29.36px] desktop:leading-[22px]`}
											>
												<p
													id={alphabet}
													className="inline-block border-b-2 border-gray font-semibold"
												>
													{alphabet}
												</p>

												{/* Categories */}
												<div className="mt-1">
													{slicedAnUnslicedCategories.map(
														(category: any) => {
															return (
																<p
																	key={category.title.en}
																	className="cursor-pointer hover:text-cyan hover:underline"
																	onClick={() => {
																		generateUrl(category);
																	}}
																>
																	{category.title.en}
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
								<div className="relative h-14">
									<div className="absolute -right-8">
										{actionButton}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}; // End of CategoriesPage

export const getServerSideProps: GetServerSideProps = async ({
	locale,
	query
}) => {
	const allCategoryByAlphabets = await getAllCategoryByAlphabets(
		Boolean(query.is_eco)
	);

	return {
		props: {
			...(await serverSideTranslations(locale || 'en')),
			allCategoryByAlphabets
		}
	};
};

export default CategoriesPage;
