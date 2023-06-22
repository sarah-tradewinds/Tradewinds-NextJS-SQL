import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/dist/client/router';
import { getLocaleText } from 'utils/get_locale_text';
import SubCategoryTile from './sub-category-tile';

interface TrendingCategorySliderMobileProps {
	categories: any[];
	selectedCategoryList: any;
	onTilePressed: (category: any) => void;
}

const TrendingCategorySliderMobile: React.FC<
	TrendingCategorySliderMobileProps
> = (props) => {
	const {
		categories = [],
		selectedCategoryList,
		onTilePressed
	} = props;

	const router = useRouter();

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: false,
		mode: 'snap',
		rtl: false,
		slides: { perView: 'auto' }
	});

	return (
		<div
			ref={ref}
			className="scrollbar-hide flex h-[36px] w-full snap-x space-x-4 overflow-x-auto"
		>
			{categories?.map((subCategory: any) => {
				const title = getLocaleText(
					subCategory.title || {},
					router.locale
				);

				return (
					<div key={subCategory.id} className="snap-center">
						<SubCategoryTile
							className="!w-full"
							imageClassName="!w-[37px] !h-[33px]"
							imageUrl={subCategory.image}
							title={title}
							titleClassName="!whitespace-nowrap"
							showBorder={selectedCategoryList?.includes(
								subCategory.id
							)}
							onTilePressed={() => onTilePressed(subCategory)}
						/>
					</div>
				);
			})}
		</div>
	);
}; // End of TrendingCategorySliderMobile

export default TrendingCategorySliderMobile;
