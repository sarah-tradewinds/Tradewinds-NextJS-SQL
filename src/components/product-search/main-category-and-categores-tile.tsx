import { useRouter } from 'next/router';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import TrendingCategorySliderMobile from './trending-category-slider-mobile';

// store
import { useCategoryStore } from 'store/category-store';

interface MainCategoryAndCategoriesTileProps {
	mainCategory: {
		imageUrl: string;
		title: string;
		backgroundColor?: string;
	};
	selectedCategories: any[];
	selectedCategoryList: any[];
}

const MainCategoryAndCategoriesTile: React.FC<
	MainCategoryAndCategoriesTileProps
> = (props) => {
	const { selectedCategories, selectedCategoryList, mainCategory } =
		props;

	const router = useRouter();

	const { setMainCategory, setCategory } = useCategoryStore(
		(state) => ({
			setMainCategory: state.setMainCategory,
			setCategory: state.setCategory
		})
	);

	const navigateWithShallow = (query: { [key: string]: any }) => {
		const region = router.query.region;
		const country = router.query.country;
		if (region) {
			query.region = region;
		}

		if (country) {
			query.country = country;
		}

		router.push({ pathname: '/product-search', query }, undefined, {
			shallow: true
		});
	}; // End of navigateWithShallow function

	return (
		<div>
			<div
				className="flex h-[42px] w-full items-center justify-between px-[15px]"
				style={{ backgroundColor: mainCategory?.backgroundColor }}
			>
				<p className="w-[80%]s truncate text-[18px] font-semibold leading-[21.94px] text-gray">
					{mainCategory?.title}
				</p>

				<div className="relative h-[38px] w-[35.63px]">
					<ImageWithErrorHandler
						key={mainCategory?.imageUrl}
						src={mainCategory?.imageUrl}
						alt={mainCategory?.title}
						fill={true}
					/>
				</div>
			</div>

			<div className="bg-[#E5E5E5] py-1">
				<TrendingCategorySliderMobile
					categories={selectedCategories || []}
					selectedCategoryList={selectedCategoryList}
					onTilePressed={(subCategory) => {
						const { id: mainCategoryId, title } =
							subCategory?.edges?.main_category;
						setMainCategory(mainCategoryId || '', title?.en || '');
						const params = setCategory(
							subCategory.id,
							subCategory?.title?.en
						);
						navigateWithShallow(params?.payload);
					}}
				/>
			</div>
		</div>
	);
}; // End of MainCategoryAndCategoriesTile

export default MainCategoryAndCategoriesTile;
