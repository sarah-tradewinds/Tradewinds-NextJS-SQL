// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useEffect, useState } from 'react';
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

	const megaMenuClassName = `grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	return (
		<div className={megaMenuClassName}>
			{!data ? <p>Loading...</p> : ''}

			{mainCategories && (
				<>
					{/* Main Categories */}
					<div
						className={`col-span-3 max-h-[438px] space-y-4 overflow-auto py-4 shadow-xl ${styles.megaMenuScrollbar}`}
						style={{ direction: 'rtl' }}
					>
						<ul className="space-y-4">
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

					{/* Sub and Sub-Sub Categories */}
					<ul className="col-span-9 h-full columns-4 bg-white pl-4 pb-2 dark:bg-bg-eco lg:columns-5">
						{selectedMainCategory.categories &&
							selectedMainCategory.categories.map((category: any) => {
								const { subCategory } = category;
								const subCategories = subCategory || [];
								return (
									<li
										key={category.slug}
										className="cursor-pointer border-r border-dashed border-r-gray/40 py-4 text-[15px]"
										onClick={() => {}}
									>
										<p className="pb-2 font-semibold text-primary-eco">
											{category.title?.en}
										</p>

										<ul>
											{subCategories.map((subCategory: any) => (
												<li
													key={subCategory.slug}
													className="cursor-pointer pb-2"
												>
													{subCategory.title?.en}
												</li>
											))}
										</ul>
									</li>
								);
							})}
					</ul>
				</>
			)}

			{/* Others */}
			{/* <div className="col-span-2 space-y-4 border-r border-r-gray/40 p-4">
				<p className="font-semibold tracking-wide">
					with a longer title
				</p>

				<div className="space-y-1">
					<p className="font-semibold tracking-wide">
						Hey Here is a new category
					</p>
					<ul className=" space-y-2">
						{categories.map((category: any) => (
							<li key={category.slug} className="cursor-pointer">
								{category.name}
							</li>
						))}
					</ul>
				</div>
			</div> */}

			{/* Banner and shop by country */}
			<div className="col-span-4">
				{/* <div className="relative h-[200px] w-full">
					<Image
						src="/yoga.avif"
						alt=""
						layout="fill"
						className="object-cover"
					/>
				</div> */}
				{/* List of countries */}
				{/* <div className="p-4">
					<p className="text-accent-secondary-main">Shop Country</p>
					<div className="flex flex-wrap">
						{countries.map((country) => (
							<div
								key={country.imageUrl}
								className="relative m-2 h-16 w-16"
							>
								<Image src={country.imageUrl} alt="" layout="fill" />
							</div>
						))}
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default MegaMenu;
