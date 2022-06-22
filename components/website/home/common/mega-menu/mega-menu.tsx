import { useRouter } from 'next/router';

// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useEffect, useRef, useState } from 'react';

// styles
import {
	getCategoriesByMainCategoryId,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';
import useSWR from 'swr';
import styles from './mega-menu.module.css';

interface MegaMenuProps {
	className?: string;
	onClose?: () => any;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className, onClose } = props;

	const router = useRouter();

	const {
		data: { data: mainCategoryList }
	} = useSWR('/services/api/v1/main_category');

	const [selectedMainCategoryId, setSelectedMainCategoryId] =
		useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [selectedSubCategoryId, setSelectedSubCategoryId] =
		useState('');
	const [selectedSpecificCategoryId, setSelectedSpecificCategoryId] =
		useState('');

	const [categoryList, setCategoryList] = useState([]);
	const [subCategoryList, setSubCategoryList] = useState([]);
	const [specificCategoryList, setSpecificCategoryList] = useState([]);

	// Fetching categories based on selectedMainCategoryId
	useEffect(() => {
		if (selectedMainCategoryId) {
			getCategoriesByMainCategoryId(selectedMainCategoryId).then(
				(data) => setCategoryList(data)
			);
		}
	}, [selectedMainCategoryId]);

	// Fetching sub-categories based on selectedCategoryId
	useEffect(() => {
		if (selectedCategoryId) {
			getSubCategoriesByCategoryId(selectedCategoryId).then((data) =>
				setSubCategoryList(data)
			);
		}
	}, [selectedCategoryId]);

	// Fetching specific-categories based on selectedSubCategoryId
	useEffect(() => {
		if (selectedSubCategoryId) {
			getSpecificCategoriesBySubCategoryId(selectedSubCategoryId).then(
				(data) => setSpecificCategoryList(data)
			);
		}
	}, [selectedSubCategoryId]);

	const navigateHandler = () => {
		if (onClose) {
			onClose();
		}
		setSelectedMainCategoryId(selectedCategoryId);
		setSelectedCategoryId(selectedCategoryId);
		router.push('/product-search');
	}; // End of navigateHandler function

	const megaMenuRef = useRef(null);

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	return (
		<div className={megaMenuClassName} ref={megaMenuRef}>
			{mainCategoryList.length <= 0 ? <p>Loading...</p> : ''}

			{/* Main Categories */}
			{mainCategoryList && (
				<div
					className={`col-span-3 my-1 ml-4 h-[487px] space-y-4 overflow-auto pl-2 shadow-mega-menu ${styles.megaMenuScrollbar}`}
					style={{ direction: 'rtl' }}
				>
					<ul className="mr-1 h-full space-y-1 ">
						{mainCategoryList.map((mainCategory: any) => {
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
			{categoryList.length > 0 && (
				<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto border-r border-dashed pt-1 pl-4 dark:bg-[#FCF5EB]">
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
			{subCategoryList.length > 0 && (
				<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto border-r border-dashed pl-4 dark:bg-[#FCF5EB]">
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
			{specificCategoryList.length > 0 && (
				<ul className="col-span-3 h-[487px] space-y-1 overflow-y-auto pl-4 dark:bg-[#FCF5EB]">
					{specificCategoryList.map((specificCategory: any) => {
						const { id, slug, title } = specificCategory;

						const isSelected = id === selectedSpecificCategoryId;

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
