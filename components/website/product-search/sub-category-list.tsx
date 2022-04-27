// components
import { useEffect, useState } from 'react';
import SubCategoryTile from './sub-category-tile';

interface SubCategoryListProps {
	subCategories: any[];
	className?: string;
}

const SubCategoryList: React.FC<SubCategoryListProps> = ({
	subCategories,
	className
}) => {
	const [screenSize, setScreenSize] = useState<null | number>(null);
	const [isTablet, setIsTablet] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		setIsTablet(
			window.innerWidth > 700 && window.innerWidth < 1024 ? true : false
		);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isTablet, screenSize]);

	return (
		<div
			className={`mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4 ${className}`}
		>
			{subCategories
				.slice(0, isTablet ? 5 : 7)
				.map((subCategory, index) => (
					<SubCategoryTile
						key={subCategory.name}
						title={subCategory.name}
						imageUrl={subCategory.imageUrl}
					/>
				))}

			<button className="text-[18px] font-semibold text-gray">
				See all
			</button>
		</div>
	);
}; // End of SubCategoryList component

export default SubCategoryList;