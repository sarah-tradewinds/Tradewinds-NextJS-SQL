import { useRouter } from 'next/router';

// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useEffect, useRef, useState } from 'react';

// styles
import { useCategoryStore } from 'store/category-store';
import styles from './mega-menu.module.css';

interface MegaMenuProps {
	className?: string;
	onClose?: () => any;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className, onClose } = props;

	const router = useRouter();

	const {
		categories,
		setSelectedMainCategoryId,
		setSelectedCategoryId
	} = useCategoryStore();

	const mainCategories = categories;

	const [selectedMainCategory, setSelectedMainCategory] = useState({
		mainCategoryId: '',
		mainCategorySlug: '',
		categories: []
	});
	const [selectedCategory, setSelectedCategory] = useState({
		categoryId: '',
		categorySlug: '',
		subCategories: []
	});
	const [selectedSubCategory, setSelectedSubCategory] = useState({
		subCategoryId: '',
		subCategorySlug: '',
		specificCategories: []
	});
	const [selectedSpecificCategory, setSelectedSpecificCategory] =
		useState({
			specificCategoryId: '',
			specificCategorySlug: ''
		});

	useEffect(() => {
		if (mainCategories) {
			setSelectedMainCategory(mainCategories[0]?.slug);
			setSelectedMainCategory({
				mainCategoryId: mainCategories[0]?.id,
				mainCategorySlug: mainCategories[0]?.slug,
				categories: mainCategories[0]?.category || []
			});
		}
	}, [mainCategories]);

	const navigateHandler = () => {
		if (onClose) {
			onClose();
		}
		setSelectedMainCategoryId(selectedMainCategory.mainCategoryId);
		setSelectedCategoryId(selectedCategory.categoryId);
		router.push('/product-search');
	}; // End of navigateHandler function

	const megaMenuRef = useRef(null);

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	return (
		<div className={megaMenuClassName} ref={megaMenuRef}>
			{categories.length <= 0 ? <p>Loading...</p> : ''}

			{/* Main Categories */}
			{mainCategories && (
				<div
					className={`col-span-3 my-1 ml-4 h-[487px] space-y-4 overflow-auto pl-2 shadow-mega-menu ${styles.megaMenuScrollbar}`}
					style={{ direction: 'rtl' }}
				>
					<ul className="mr-1 h-full space-y-1 ">
						{mainCategories.map((mainCategory: any) => {
							const { id, slug, category } = mainCategory;

							const isSelected =
								id === selectedMainCategory.mainCategoryId;

							return (
								<li
									key={id || slug}
									className={`flex cursor-pointer justify-between pl-4 text-left text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? 'font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() =>
										setSelectedMainCategory({
											mainCategoryId: id,
											mainCategorySlug: slug,
											categories: category || []
										})
									}
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
			{selectedMainCategory.categories &&
				selectedMainCategory.categories.length > 0 && (
					<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto border-r border-dashed pt-1 pl-4 dark:bg-[#FCF5EB]">
						{selectedMainCategory.categories.map((category: any) => {
							const { id, slug, title, sub_category } = category;

							const isSelected = id === selectedCategory.categoryId;

							return (
								<li
									key={id || slug}
									className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() =>
										setSelectedCategory({
											categoryId: id,
											categorySlug: slug,
											subCategories: sub_category || []
										})
									}
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
			{selectedCategory.subCategories &&
				selectedCategory.subCategories.length > 0 && (
					<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto border-r border-dashed pl-4 dark:bg-[#FCF5EB]">
						{selectedCategory.subCategories.map((subCategory: any) => {
							const { id, slug, title, sub_sub_category } = subCategory;

							const isSelected =
								id === selectedSubCategory.subCategoryId;

							return (
								<li
									key={id || slug}
									className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() =>
										setSelectedSubCategory({
											subCategoryId: id,
											subCategorySlug: slug,
											specificCategories: sub_sub_category || []
										})
									}
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
			{selectedSubCategory.specificCategories &&
				selectedSubCategory.specificCategories.length > 0 && (
					<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto pl-4 dark:bg-[#FCF5EB]">
						{selectedSubCategory.specificCategories.map(
							(specificCategory: any) => {
								const { id, slug, title } = specificCategory;

								const isSelected = slug === selectedSpecificCategory;

								return (
									<li
										key={id || slug}
										className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
											isSelected
												? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
												: ''
										}`}
										onMouseEnter={() =>
											setSelectedSpecificCategory(slug)
										}
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
							}
						)}
					</ul>
				)}
		</div>
	);
};

export default MegaMenu;
