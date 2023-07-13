import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import { NextPage } from 'next';
import Image from 'next/image';

const CategoriesNew: NextPage = () => {
	return (
		<div>
			<div className="relative w-full desktop:h-[234px]">
				<Image
					src="/images/categories-banner.png"
					alt="categories-banner"
					fill={true}
				/>
			</div>

			{/* Categories Card */}
			<div>
				{/* Main Category Data */}
				<div className="flex items-center space-x-2">
					<div className="bg-primary-eco desktop:h-[26px] desktop:w-[26px]"></div>
					<div className="relative desktop:h-[47px] desktop:w-[47px]">
						<ImageWithErrorHandler
							src=""
							alt="category-name"
							fill={true}
						/>
					</div>
				</div>

				{/* categories list */}
				<div>
					<div className="desktop:px- bg-error desktop:h-[312px] desktop:w-[720px] desktop:rounded-t-xl">
						<ul className="columns-2">
							{[
								1, 2, 3, 4, 5, 6, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 1, 2,
								34, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0
							]?.map((category) => (
								<li key={category} className="text-[#575858]">
									Agriculture Equipment {category}
								</li>
							))}
						</ul>
						<div className="h-[13px] w-full bg-primary-eco"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoriesNew;
