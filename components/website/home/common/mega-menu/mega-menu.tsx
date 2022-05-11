// Third party packages
import { MdKeyboardArrowLeft, MdPlayArrow } from 'react-icons/md';

// data
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

// styles
import { Disclosure } from '@headlessui/react';
import styles from './mega-menu.module.css';

interface MegaMenuProps {
	className?: string;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className } = props;

	const { data } = useSWR('/categories?page=1&limit=100');

	const mainCategories = data?.data;

	const [selectedMainCategory, setSelectedMainCategory] = useState({
		slug: '',
		categories: []
	});

	useEffect(() => {
		if (mainCategories) {
			setSelectedMainCategory({
				slug: '' || mainCategories[0]?.slug,
				categories: mainCategories[0]?.category || []
			});
		}
	}, [mainCategories]);

	const megaMenuRef = useRef(null);

	useEffect(() => {
		console.log(megaMenuRef);
	});

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	return (
		<div className={megaMenuClassName} ref={megaMenuRef}>
			{!data ? <p>Loading...</p> : ''}

			{mainCategories && (
				<>
					{/* Main Categories */}
					<div
						className={`col-span-3 my-1 ml-4 max-h-[438px] space-y-4 overflow-auto pl-2 ${styles.megaMenuScrollbar}`}
						style={{ direction: 'rtl' }}
					>
						<ul className="mr-1 space-y-1 shadow-mega-menu">
							{mainCategories.map((mainCategory: any) => {
								const { slug } = mainCategory;

								const isSelected = slug === selectedMainCategory.slug;

								return (
									<li
										key={slug}
										className={`flex cursor-pointer justify-between pl-4 text-[15px] hover:text-primary-eco ${
											isSelected
												? ' bg-bg-eco/60 font-semibold text-primary-eco'
												: ''
										}`}
										onClick={() =>
											setSelectedMainCategory({
												slug: slug,
												categories: mainCategory.category
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

							{/* TMP */}
							{mainCategories.map((mainCategory: any) => {
								const { slug } = mainCategory;

								const isSelected = slug === selectedMainCategory.slug;

								return (
									<li
										key={slug}
										className={`flex cursor-pointer justify-between pl-4 text-[15px] hover:text-primary-eco ${
											isSelected
												? ' bg-bg-eco font-semibold text-primary-eco'
												: ''
										}`}
										onClick={() =>
											setSelectedMainCategory({
												slug: slug,
												categories: mainCategory.category
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

							{/* TMP */}
							{mainCategories.map((mainCategory: any) => {
								const { slug } = mainCategory;

								const isSelected = slug === selectedMainCategory.slug;

								return (
									<li
										key={slug}
										className={`flex cursor-pointer justify-between pl-4 text-[15px] hover:text-primary-eco ${
											isSelected
												? ' bg-bg-eco font-semibold text-primary-eco'
												: ''
										}`}
										onClick={() =>
											setSelectedMainCategory({
												slug: slug,
												categories: mainCategory.category
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

							{/* TMP */}
							{mainCategories.map((mainCategory: any) => {
								const { slug } = mainCategory;

								const isSelected = slug === selectedMainCategory.slug;

								return (
									<li
										key={slug}
										className={`flex cursor-pointer justify-between pl-4 text-[15px] hover:text-primary-eco ${
											isSelected
												? ' bg-bg-eco font-semibold text-primary-eco'
												: ''
										}`}
										onClick={() =>
											setSelectedMainCategory({
												slug: slug,
												categories: mainCategory.category
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

					{/* Sub, Sub-Sub Categories and specific category*/}
					<ul className="col-span-9 h-full columns-4 bg-white pl-4 pb-2 dark:bg-bg-eco lg:columns-5">
						{selectedMainCategory.categories &&
							selectedMainCategory.categories.map((category: any) => {
								const { subCategory } = category;
								const subCategories = subCategory || [];
								return (
									<li
										key={category.slug}
										className="cursor-pointer border-r border-dashed border-r-gray/40 py-1 text-[15px]"
										onClick={() => {}}
									>
										<p className="pb-2 font-semibold text-primary-eco">
											{category.title?.en}
										</p>

										<ul>
											{subCategories.map((subCategory: any) => {
												const { specificCategories = subCategories } =
													subCategory || {};

												return (
													<li
														key={subCategory.slug}
														className="cursor-pointer pb-2"
													>
														{/* Specific category */}
														<Disclosure>
															{({ open }) => (
																<>
																	<Disclosure.Button className="flex items-center">
																		<MdKeyboardArrowLeft
																			className={`${
																				open
																					? '-rotate-90 transform'
																					: ''
																			} h-5 w-5`}
																		/>
																		<span>{subCategory.title?.en}</span>
																	</Disclosure.Button>

																	<Disclosure.Panel>
																		{specificCategories.map(
																			(specificCategory: any) => (
																				<button
																					key={specificCategory.id}
																					className="pl-6"
																				>
																					{specificCategory.title?.en}
																				</button>
																			)
																		)}
																	</Disclosure.Panel>
																</>
															)}
														</Disclosure>
													</li>
												);
											})}
										</ul>
									</li>
								);
							})}
					</ul>
				</>
			)}
		</div>
	);
};

export default MegaMenu;
