// components
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generateListByCount } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import SubCategoryTile from './sub-category-tile';

interface SubCategoryListProps {
	subCategories: any[];
	className?: string;
	onClick: () => any;
	onTilePressed: (subCategoryId: string) => any;
	selectedSubCategoryIds?: string[];
	isLoading?: boolean;
}

const SubCategoryList: React.FC<SubCategoryListProps> = ({
	subCategories,
	className,
	onClick,
	onTilePressed,
	selectedSubCategoryIds,
	isLoading
}) => {
	const [screenSize, setScreenSize] = useState<null | number>(null);
	const [isTablet, setIsTablet] = useState<boolean>(false);

	const { locale } = useRouter();

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		setIsTablet(
			window.innerWidth > 700 && window.innerWidth < 1024 ? true : false
		);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isTablet, screenSize]);

	if (isLoading) {
		return (
			<div className="mt-8 grid items-center gap-8 md:grid-cols-2 lg:grid-cols-4">
				{generateListByCount(6).map((id) => (
					<div key={id} className="flex items-center space-x-2">
						<Skeleton width="48px" height="48px" />
						<div className="w-full">
							<Skeleton />
						</div>
					</div>
				))}
				<Skeleton />
			</div>
		);
	}

	return (
		<div
			className={`mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4 ${className}`}
		>
			{subCategories
				.slice(0, isTablet ? 5 : 7)
				.map((subCategory, index) => (
					<SubCategoryTile
						key={subCategory.name}
						title={getLocaleText(subCategory?.title || {}, locale)}
						imageUrl={
							subCategory?.image?.url || '/sub-category/beans.png'
						}
						showBorder={
							selectedSubCategoryIds
								? selectedSubCategoryIds?.includes(subCategory.id)
								: false
						}
						onTilePressed={() => onTilePressed(subCategory.id)}
					/>
				))}

			<button
				onClick={onClick}
				className="text-[18px] font-semibold text-gray"
			>
				See all
			</button>
		</div>
	);
}; // End of SubCategoryList component

export default SubCategoryList;
