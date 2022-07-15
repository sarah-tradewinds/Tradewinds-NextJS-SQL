import { useRouter } from 'next/router';

// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useEffect, useState } from 'react';

// styles
import SpinnerIcon from 'components/website/common/elements/loader/spinner-icon';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { getDataById, getObjectKeys } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import styles from './mega-menu.module.css';

interface MegaMenuProps {
	className?: string;
	onClose?: () => any;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className, onClose } = props;

	const router = useRouter();
	const { locale } = router;

	const isEco = useHomeStore((state) => state.isEco);
	const [isMainCategoryLoading, setIsMainCategoryLoading] =
		useState(false);
	const [isCategoryLoading, setIsCategoryLoading] = useState(false);
	const [isSubCategoryLoading, setIsSubCategoryLoading] =
		useState(false);
	const [isSpecificCategoryLoading, setIsSpecificCategoryLoading] =
		useState(false);

	const {
		allCategories,
		selectedMainCategoryId,
		selectedCategoryIds,
		selectedSubCategoryIds,
		selectedCategoryAndSubCategoryAndSpecificCategoryIds,

		// set methods
		setSelectedMainCategoryId,
		setSelectedCategoryId,
		setSelectedSubCategoryId,
		setSelectedSpecificCategoryId,

		// fetch methods
		fetchMainCategories,
		fetchCategoriesByMainCategoryId,
		fetchSubCategoriesByCategoryId,
		fetchSpecificCategoriesBySubCategoryId
	} = useCategoryStore();

	const categoryIds = getObjectKeys(
		selectedCategoryAndSubCategoryAndSpecificCategoryIds
	);

	const subCategoryIds = getObjectKeys(
		selectedCategoryAndSubCategoryAndSpecificCategoryIds[categoryIds[0]]
	);

	// Fetching mainCategories
	useEffect(() => {
		if (allCategories.length <= 0) {
			setIsMainCategoryLoading(true);
			fetchMainCategories(isEco).then(() =>
				setIsMainCategoryLoading(false)
			);
		}
	}, [allCategories.length, isEco]);

	// Fetching categories based on main category id
	useEffect(() => {
		if (selectedMainCategoryId.id) {
			setIsCategoryLoading(true);

			fetchCategoriesByMainCategoryId(
				selectedMainCategoryId.id,
				isEco
			).then(() => setIsCategoryLoading(false));
		}
	}, [selectedMainCategoryId]);

	// Fetching sub-categories based on selectedCategoryIds
	useEffect(() => {
		const categoriesIds = getObjectKeys(
			selectedCategoryAndSubCategoryAndSpecificCategoryIds
		);
		if (categoriesIds.length > 0) {
			setIsSubCategoryLoading(true);
			fetchSubCategoriesByCategoryId(
				categoriesIds.toString(),
				isEco
			).then(() => setIsSubCategoryLoading(false));
		}
	}, [selectedCategoryIds.length]);

	// Fetching specific-categories based on selectedSubCategoryIds
	useEffect(() => {
		const subCategoryIds = getObjectKeys(
			selectedCategoryAndSubCategoryAndSpecificCategoryIds[
				categoryIds[0]
			]
		);
		if (subCategoryIds.length > 0) {
			setIsSpecificCategoryLoading(true);
			fetchSpecificCategoriesBySubCategoryId(
				subCategoryIds.toString(),
				isEco
			).then(() => setIsSpecificCategoryLoading(false));
		}
	}, [selectedSubCategoryIds.length]);

	const navigateHandler = () => {
		if (onClose) {
			onClose();
		}
		router.push('/product-search');
	}; // End of navigateHandler function

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	const categoryList =
		getDataById(allCategories, selectedMainCategoryId.id)?.categories ||
		[];

	// Fetching subCategories
	const selectedCategoryId = categoryIds[0];
	const subCategoryList =
		getDataById(categoryList, selectedCategoryId)?.subCategories || [];

	// Fetching specificCategories
	const selectedSubCategoryId = subCategoryIds[0];
	const specificCategoryList =
		getDataById(subCategoryList, selectedSubCategoryId)
			?.specificCategories || [];

	return (
		<div className={megaMenuClassName}>
			{allCategories.length <= 0 ? <MegaMenuLoader /> : ''}

			{/* Main Categories */}
			{allCategories && (
				<div
					className={`col-span-3 my-1 ml-4 h-[487px] space-y-4 overflow-auto pl-2 shadow-mega-menu ${styles.megaMenuScrollbar}`}
					style={{ direction: 'rtl' }}
				>
					<ul className="mr-1 h-full">
						{allCategories.map((mainCategory: any) => {
							const { id, slug } = mainCategory;

							const isSelected = id === selectedMainCategoryId.id;
							const mainCategoryTitle = getLocaleText(
								mainCategory.title || {},
								locale
							);

							return (
								<li
									key={id || slug}
									className={`flex cursor-pointer justify-between py-1 pl-4 text-left text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? 'font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() =>
										!isSelected
											? setSelectedMainCategoryId(id, mainCategoryTitle)
											: null
									}
									onClick={navigateHandler}
								>
									<span className="hover: text-2xl hover:text-primary-main">
										{isSelected && (
											<MdPlayArrow className="font-semibold" />
										)}
									</span>
									<span>{mainCategoryTitle}</span>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			{/* Categories */}
			{allCategories.length > 0 && selectedMainCategoryId.id && (
				<ul className="col-span-3 h-[487px] overflow-y-auto border-r border-dashed pt-1 pl-4 dark:bg-[#FCF5EB]">
					{isCategoryLoading && <MegaMenuLoader />}

					{categoryList.map((category: any) => {
						const { id, slug, title } = category;

						const isSelected = id === selectedCategoryId;

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer items-center justify-between py-1 text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() =>
									!isSelected ? setSelectedCategoryId(id, true) : null
								}
								onClick={navigateHandler}
							>
								<span>{getLocaleText(title || {}, locale)}</span>
								<span className="hover: text-2xl hover:text-primary-main">
									{isSelected && (
										<MdPlayArrow className="font-semibold" />
									)}
								</span>
							</li>
						);
					})}
				</ul>
			)}

			{/* Sub Categories */}
			{categoryList.length > 0 && selectedCategoryId && (
				<ul className="col-span-3 h-[487px] overflow-y-auto border-r border-dashed pl-4 dark:bg-[#FCF5EB]">
					{isSubCategoryLoading && <MegaMenuLoader />}

					{subCategoryList.map((subCategory: any) => {
						const { id, slug, title } = subCategory;

						const isSelected =
							selectedCategoryAndSubCategoryAndSpecificCategoryIds[
								selectedCategoryId
							][id];

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer items-center justify-between py-1 text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() =>
									!isSelected
										? setSelectedSubCategoryId(
												selectedCategoryId,
												id,
												true
										  )
										: null
								}
								onClick={navigateHandler}
							>
								<span>{getLocaleText(title || {}, locale)}</span>
								<span className="hover: text-2xl hover:text-primary-main">
									{isSelected && (
										<MdPlayArrow className="font-semibold" />
									)}
								</span>
							</li>
						);
					})}
				</ul>
			)}

			{/* Specific Categories */}
			{subCategoryList.length > 0 && selectedSubCategoryId && (
				<ul className="col-span-3 h-[487px] overflow-y-auto pl-4 dark:bg-[#FCF5EB]">
					{isSpecificCategoryLoading && <MegaMenuLoader />}

					{specificCategoryList.map((specificCategory: any) => {
						const { id, slug, title } = specificCategory;

						// const isSelected = selectedSubCategoryId;
						// id ===
						// 	selectedSpecificCategoryIds[
						// 		selectedSpecificCategoryIds.length - 1
						// 	];

						const isSelected =
							(
								selectedCategoryAndSubCategoryAndSpecificCategoryIds[
									selectedCategoryId
								][selectedSubCategoryId] || []
							).findIndex(
								(specificCategoryId: string) =>
									specificCategoryId === id
							) >= 0;

						[].findIndex;

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() =>
									!isSelected
										? setSelectedSpecificCategoryId(
												selectedCategoryId,
												selectedSubCategoryId,
												id,
												true
										  )
										: null
								}
								onClick={navigateHandler}
							>
								<span>{getLocaleText(title || {}, locale)}</span>
								<span className="hover: text-2xl hover:text-primary-main">
									{isSelected && (
										<MdPlayArrow className="font-semibold" />
									)}
								</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}; // End of MegaMenu component

export default MegaMenu;

const MegaMenuLoader = () => {
	return (
		<div className="flex h-full items-center justify-center">
			<SpinnerIcon className="!mr-0 md:h-16 md:w-16" />
		</div>
	);
};
