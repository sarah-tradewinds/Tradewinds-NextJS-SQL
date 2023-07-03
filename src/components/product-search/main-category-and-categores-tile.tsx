import { useRouter } from 'next/router';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import TrendingCategorySliderMobile from './trending-category-slider-mobile';

// store
import { useCategoryStore } from 'store/category-store';

interface MainCategoryAndCategoriesTileProps {
	selectedCategories: any[];
	selectedCategoryList: any[];
}

const MainCategoryAndCategoriesTile: React.FC<
	MainCategoryAndCategoriesTileProps
> = (props) => {
	const { selectedCategories, selectedCategoryList } = props;

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
			<div className="flex h-[42px] items-center justify-between bg-green px-[15px]">
				<p className="text-[18px] font-semibold leading-[21.94px] text-gray">
					Agriculture
				</p>

				<div className="relative mt-[1px] h-[38px] w-[35.63px]">
					<ImageWithErrorHandler src={''} alt="" fill={true} />{' '}
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
