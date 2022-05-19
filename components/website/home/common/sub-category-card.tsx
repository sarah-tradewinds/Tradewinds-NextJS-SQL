import Image from 'next/image';
import { SubCategoryType } from 'types/home';

type Props = {
	subCat: SubCategoryType;
	slug?: any;
	style?: any;
	onClick?: () => any;
	containerClassName?: string;
};

const SubCategoryCard = ({
	subCat,
	slug,
	style,
	onClick,
	containerClassName
}: Props) => {
	return (
		<div
			style={style}
			className={`relative flex cursor-pointer rounded border-2 border-gray/40 ${containerClassName}`}
			onClick={onClick}
		>
			<div className="flex flex-col justify-between p-2">
				{/* Content */}
				<div className="pr-4 ">
					<h2 className="font-semibold text-primary-main dark:text-accent-secondary-eco md:text-[14px] lg:text-[18px]">
						{subCat.title}
					</h2>
					<p className="text-primary-main md:text-[12px] lg:text-[15px]">
						{subCat.clr}
					</p>
				</div>
				{/* Icon */}
				<div className="hidden gap-2 md:flex">
					<div className="relative h-5 w-5">
						<Image
							src="/static/images/TWSafety.png"
							alt="Logo"
							layout="fill"
						/>
					</div>
					<div className="relative h-5 w-5">
						<Image
							src="/static/images/TWEco.png"
							alt="Logo"
							layout="fill"
						/>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 right-0 bg-secondary">
				<div className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] lg:h-[104px] lg:w-[104px]">
					<Image
						src={subCat.image?.url || '/vehicles/green-tractor.png'}
						alt="sub-cat-image"
						layout="fill"
					/>
				</div>
			</div>
		</div>
	);
};

export default SubCategoryCard;
