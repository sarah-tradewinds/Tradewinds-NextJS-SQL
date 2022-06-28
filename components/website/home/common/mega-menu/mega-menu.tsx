import { useRouter } from 'next/router';

// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useEffect } from 'react';

// styles
import SpinnerIcon from 'components/website/common/elements/loader/spinner-icon';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { getDataById } from 'utils/common.util';
import styles from './mega-menu.module.css';

interface MegaMenuProps {
	className?: string;
	onClose?: () => any;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className, onClose } = props;

	const router = useRouter();

	const isEco = useHomeStore((state) => state.isEco);

	const {
		allCategories,
		selectedMainCategoryId,
		selectedCategoryIds,
		selectedSubCategoryIds,
		selectedSpecificCategoryIds,
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

	useEffect(() => {
		if (allCategories.length <= 0) {
			fetchMainCategories(isEco);
		}
	}, [allCategories.length, isEco]);

	// Fetching categories based on main category id
	useEffect(() => {
		if (selectedMainCategoryId) {
			fetchCategoriesByMainCategoryId(selectedMainCategoryId, isEco);
		}
	}, [selectedMainCategoryId]);

	// Fetching sub-categories based on selectedCategoryIds
	useEffect(() => {
		if (selectedCategoryIds.length > 0) {
			fetchSubCategoriesByCategoryId(
				selectedCategoryIds.toString(),
				isEco
			);
		}
	}, [selectedCategoryIds]);

	// Fetching specific-categories based on selectedSubCategoryIds
	useEffect(() => {
		if (selectedSubCategoryIds.length > 0) {
			fetchSpecificCategoriesBySubCategoryId(
				selectedSubCategoryIds.toString(),
				isEco
			);
		}
	}, [selectedSubCategoryIds]);

	const navigateHandler = () => {
		if (onClose) {
			onClose();
		}
		router.push('/product-search');
	}; // End of navigateHandler function

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	const categoryList =
		getDataById(allCategories, selectedMainCategoryId)?.categories ||
		[];

	// Fetching subCategories
	const selectedCategoryId =
		selectedCategoryIds[selectedCategoryIds.length - 1];
	const subCategoryList =
		getDataById(categoryList, selectedCategoryId)?.subCategories || [];

	// Fetching specificCategories
	const selectedSubCategoryId =
		selectedSubCategoryIds[selectedSubCategoryIds.length - 1];
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
					<ul className="mr-1 h-full space-y-1 ">
						{allCategories.map((mainCategory: any) => {
							const { id, slug } = mainCategory;

							const isSelected = id === selectedMainCategoryId;

							return (
								<li
									key={id || slug}
									className={`flex cursor-pointer justify-between pl-4 text-left text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? 'font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() => setSelectedMainCategoryId(id)}
									onClick={navigateHandler}
								>
									<span className="hover: text-2xl hover:text-primary-main">
										{isSelected && (
											<MdPlayArrow className="font-semibold" />
										)}
									</span>
									<span>{mainCategory.title?.en}</span>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			{/* Categories */}
			{allCategories.length > 0 && selectedMainCategoryId && (
				<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto border-r border-dashed pt-1 pl-4 dark:bg-[#FCF5EB]">
					{categoryList.length <= 0 ? <MegaMenuLoader /> : ''}

					{categoryList.map((category: any) => {
						const { id, slug, title } = category;

						const isSelected = id === selectedCategoryId;

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() => setSelectedCategoryId(id)}
								onClick={navigateHandler}
							>
								<span>{title?.en}</span>
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
				<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto border-r border-dashed pl-4 dark:bg-[#FCF5EB]">
					{subCategoryList.length <= 0 ? <MegaMenuLoader /> : ''}

					{subCategoryList.map((subCategory: any) => {
						const { id, slug, title } = subCategory;

						const isSelected = id === selectedSubCategoryId;

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() => setSelectedSubCategoryId(id)}
								onClick={navigateHandler}
							>
								<span>{title?.en}</span>
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
				<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto pl-4 dark:bg-[#FCF5EB]">
					{specificCategoryList.length <= 0 ? <MegaMenuLoader /> : ''}

					{specificCategoryList.map((specificCategory: any) => {
						const { id, slug, title } = specificCategory;

						const isSelected =
							selectedSpecificCategoryIds.findIndex(
								(selectedSpecificCategoryId) =>
									selectedSpecificCategoryId === id
							) >= 0;

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() => setSelectedSpecificCategoryId(id)}
								onClick={navigateHandler}
							>
								<span>{title?.en}</span>
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
};

export default MegaMenu;

const MegaMenuLoader = () => {
	return (
		<div className="flex h-full items-center justify-center">
			<SpinnerIcon className="!mr-0 md:h-16 md:w-16" />
		</div>
	);
};
