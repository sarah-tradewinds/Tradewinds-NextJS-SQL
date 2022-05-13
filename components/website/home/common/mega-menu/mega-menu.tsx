// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

// styles
import styles from './mega-menu.module.css';

interface MegaMenuProps {
	className?: string;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className } = props;

	const { data } = useSWR('/categories?page=1&limit=100');

	const mainCategories = data?.data;

	const [selectedMainCategory, setSelectedMainCategory] = useState({
		mainCategorySlug: '',
		categories: []
	});
	const [selectedCategory, setSelectedCategory] = useState({
		categorySlug: '',
		subCategories: []
	});
	const [selectedSubCategory, setSelectedSubCategory] = useState({
		subCategorySlug: '',
		specificCategories: []
	});
	const [selectedSpecificCategory, setSelectedSpecificCategory] =
		useState('');

	useEffect(() => {
		if (mainCategories) {
			setSelectedMainCategory(mainCategories[0]?.slug);
			setSelectedMainCategory({
				mainCategorySlug: mainCategories[0]?.slug,
				categories: mainCategories[0]?.category || []
			});
		}
	}, [mainCategories]);

	const megaMenuRef = useRef(null);

	console.log('selectedMainCategory =', selectedMainCategory);

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	return (
		<div className={megaMenuClassName} ref={megaMenuRef}>
			{!data ? <p>Loading...</p> : ''}

			{/* Main Categories */}
			{mainCategories && (
				<div
					className={`col-span-3 my-1 ml-4 h-[487px] space-y-4 overflow-auto pl-2 ${styles.megaMenuScrollbar}`}
					style={{ direction: 'rtl' }}
				>
					<ul className="mr-1 h-full space-y-1 shadow-mega-menu">
						{mainCategories.map((mainCategory: any) => {
							const { slug, category } = mainCategory;

							const isSelected =
								slug === selectedMainCategory.mainCategorySlug;

							return (
								<li
									key={slug}
									className={`flex cursor-pointer justify-between pl-4 text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? ' bg-bg-eco/60 font-semibold dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() =>
										setSelectedMainCategory({
											mainCategorySlug: slug,
											categories: category || []
										})
									}
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
			{selectedMainCategory.categories && (
				<ul className="col-span-3 mr-1 space-y-1 pl-4">
					{selectedMainCategory.categories.map((category: any) => {
						const { slug, title, subCategory } = category;

						const isSelected = slug === selectedCategory.categorySlug;

						return (
							<li
								key={slug}
								className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' bg-bg-eco/60 font-semibold dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() =>
									setSelectedCategory({
										categorySlug: slug,
										subCategories: subCategory || []
									})
								}
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
			{selectedCategory.subCategories && (
				<ul className="col-span-3 mr-1 space-y-1 pl-4">
					{selectedCategory.subCategories.map((subCategory: any) => {
						const { slug, title, subSubCategory } = subCategory;

						const isSelected =
							slug === selectedSubCategory.subCategorySlug;

						return (
							<li
								key={slug}
								className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? ' bg-bg-eco/60 font-semibold dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() =>
									setSelectedSubCategory({
										subCategorySlug: slug,
										specificCategories: subSubCategory || []
									})
								}
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
			{selectedSubCategory.specificCategories && (
				<ul className="col-span-3 mr-1 space-y-1 pl-4">
					{selectedSubCategory.specificCategories.map(
						(specificCategory: any) => {
							const { slug, title } = specificCategory;

							const isSelected = slug === selectedSpecificCategory;

							return (
								<li
									key={slug}
									className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
										isSelected
											? ' bg-bg-eco/60 font-semibold dark:text-primary-eco'
											: ''
									}`}
									onMouseEnter={() => setSelectedSpecificCategory(slug)}
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
