import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubCategoryType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';

type Props = {
	subCat: SubCategoryType;
	slug?: any;
	style?: any;
	showImageInFront?: boolean;
	onClick?: () => any;
	containerClassName?: string;
	className?: string;
	titleClassName?: string;
};

const SubCategoryCard = ({
	subCat,
	slug,
	style,
	showImageInFront,
	onClick,
	containerClassName,
	className,
	titleClassName
}: Props) => {
	const { locale } = useRouter();

	const subCategoryTitle = getLocaleText(subCat?.title || {}, locale);

	return (
		<div
			style={style}
			className={`relative flex cursor-pointer rounded border-2 border-gray/40 ${containerClassName}`}
			onClick={onClick}
		>
			{showImageInFront && (
				<div className="relative h-[60px] w-[60px] overflow-hidden md:h-[80px] md:w-[80px] lg:h-[104px] lg:w-[104px]">
					<ImageWithErrorHandler
						src={subCat.image?.url}
						alt="sub-cat-image"
						layout="fill"
					/>
				</div>
			)}

			<div className={`flex flex-col justify-between p-2 ${className}`}>
				{/* Content */}
				<div className="pr-4 ">
					<h2
						className={`font-semibold text-primary-main dark:text-accent-secondary-eco md:text-[14px] lg:text-[18px] ${titleClassName}`}
					>
						{subCategoryTitle}
					</h2>
					<p className="text-primary-main md:text-[12px] lg:text-[15px]">
						{subCat?.clr}
					</p>
				</div>
				{/* Icon or Image */}
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

			{!showImageInFront && (
				<div className="absolute bottom-0 right-0">
					<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]">
						<ImageWithErrorHandler
							src={subCat?.image?.url}
							alt="sub-cat-image"
							layout="fill"
							className="h-full w-full"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default SubCategoryCard;
