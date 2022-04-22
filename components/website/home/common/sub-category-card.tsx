import Image from 'next/image';
import Link from 'next/link';
import { SubCategoryType } from 'types/home';

type Props = {
	subCat: SubCategoryType;
	style?: any;
	containerClassName?: string;
};

const SubCategoryCard = ({
	subCat,
	style,
	containerClassName
}: Props) => {
	return (
		<Link href="/">
			<a
				style={style}
				className={`relative flex rounded border-2 border-gray/40 ${containerClassName}`}
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
								src="/static/Images/TWSafety.png"
								alt="Logo"
								layout="fill"
							/>
						</div>
						<div className="relative h-5 w-5">
							<Image
								src="/static/Images/TWEco.png"
								alt="Logo"
								layout="fill"
							/>
						</div>
					</div>
				</div>

				<div className="absolute bottom-0 right-0">
					<div className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px]">
						<Image src={subCat.img} alt="sub-cat-image" layout="fill" />
					</div>
				</div>
			</a>
		</Link>
	);
};

export default SubCategoryCard;
