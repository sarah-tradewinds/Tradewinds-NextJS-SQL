import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

// Third party packages
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

		namesByLetter[firstLetter].push(name);
	}
	const [value, setValue] = useState('');
	const gotToSearch = (searchTerm: string) => {
		router.push(
			`/product-search?categories=${encodeURIComponent(searchTerm)}`
		);
	};
	const Searchvalue = (event: any) => {
		setValue(event.target.value);
	};
	const onSearch = (searchTerm: any) => {
		setValue(searchTerm);
		gotToSearch(searchTerm);
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
		console.log('pavan', category);
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
			console.log('paramsparams', params);
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
			console.log('[sub-categ] =', params);
			navigateWithShallow(params?.payload);
		}

		// specific cat

		if (category?.IsSpecCat === true) {
			setMainCategory(
				category?.MainCatId || category?.main_category_id,
				category?.MainCatName || ''
			);
			const params = setSpecificCategory(
				category.category_id || '',
				category.CatName || '',
				category.sub_category_id || '',
				category.SubCatName || '',
				category.id,
				category.title.en || ''
			);
			navigateWithShallow(params?.payload);
		}
	};

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
				<div className=" ml-[9px] flex space-x-[6px] border-b  text-[18px] font-semibold   md:ml-[17px] md:flex md:space-x-[9px] lg:ml-[16px] lg:flex lg:space-x-[13px]">
					<div className=" h-[41px] w-[150px] rounded-t-lg bg-white pl-[9px] text-[18px] text-gray md:flex md:w-[322px] md:text-[25px] lg:mt-0 lg:flex lg:w-[446px] lg:text-[25px]">
						<div>Categories</div>
						<div className=" bg-blue z-10 lg:ml-[13px]">
							<div className=" mt-4 flex h-[29px] w-[288px] rounded-[3px] border border-gray/50   text-[15px]  font-normal text-gray md:mt-[9px] md:ml-[5px] md:flex md:h-[20px]  md:w-[162px] lg:mt-[5px]  lg:flex lg:h-[26px]  lg:w-[283px] ">
								<input
									onChange={Searchvalue}
									type="search"
									value={value}
									id="search"
									name="search"
									placeholder="Search....."
									className="w-[250px] pl-2 font-semibold text-gray outline-none md:w-[140px]  lg:w-[250px] "
								/>
								<HiOutlineSearch className=" mt-2 cursor-pointer text-gray md:mt-[3px] md:text-[13px]  lg:ml-[10px] lg:text-[16px]" />
							</div>
							<div className=" bg-white text-gray ">
								{allCategoryByAlphabets
									.filter((name: any) => {
										const searchTerm = value.toLowerCase();
										const category = name.title.en.toLowerCase();
										return (
											searchTerm && category.startsWith(searchTerm)
										);
									})
									.slice(0, 10)
									.map((name: any) => {
										return value ? (
											<div
												className="cursor-pointer text-[15px] lg:pl-4"
												onClick={() => onSearch(name.title.en)}
												key={name.title.en}
											>
												{name.title.en}
											</div>
										) : (
											' '
										);
									})}
							</div>
						</div>
					</div>
				</div>

				<div className="-mt-[6px] rounded-md bg-white  pt-[30px] md:p-0 lg:p-0">
					{/* List of alphabets */}
					<div className="flex items-center justify-between pl-[17px] pt-[7px] pr-[14px] md:mx-[38px] lg:space-x-16 lg:p-[16px]">
						{/* Line */}
						<div className="hidden h-[2px] w-[17px] rounded-full bg-gray md:block lg:w-full"></div>

						{/* List of alphabets */}

						<div className="float-left flex flex-wrap space-x-[11px] leading-[26px] md:flex-wrap md:space-x-2  md:text-[18px] lg:flex-nowrap lg:space-x-4 lg:text-[24px]">
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
								<div key={alphabet} className="mb-[20px] text-[15px]">
									<p
										id={alphabet}
										className="inline-block border-b-2  font-semibold"
									>
										{alphabet}
									</p>

									{/* Categories */}
									<div>
										{slicedAnUnslicedCategories.map((category: any) => {
											return (
												<p
													key={category.title.en}
													className="cursor-pointer hover:font-semibold hover:text-cyan hover:underline"
													onClick={() => {
														generateUrl(category);
													}}
												>
													{category.title.en}
												</p>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>

					{/* actions */}
					<div className="flex justify-end md:flex lg:flex">
						<Button
							onClick={() => setShowAll((prevState) => !prevState)}
						>
							{showAll ? (
								<HiMinusCircle className="text-[50px] text-cyan" />
							) : (
								<HiPlusCircle className="text-[50px] text-cyan" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
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
