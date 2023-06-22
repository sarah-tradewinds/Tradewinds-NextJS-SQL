import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
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
	containerClassName = '',
	className,
	titleClassName
}: Props) => {
	const { locale } = useRouter();

	const subCategoryTitle = getLocaleText(subCat?.title || {}, locale);

	return (
		<div
			className={`relative flex cursor-pointer ${containerClassName}`}
			style={style}
			onClick={onClick}
		>
			{showImageInFront && (
				<div className="relative h-[60px] w-[60px] overflow-hidden tablet:h-[80px] tablet:w-[80px] 900px:h-[104px] 900px:w-[104px]">
					<ImageWithErrorHandler
						src={subCat.image}
						alt="sub-cat-image"
						fill={true}
					/>
				</div>
			)}

			<div className={`flex flex-col justify-between p-2 ${className}`}>
				{/* Content */}
				<div className="pr-4">
					<h2
						className={`font-semibold text-primary-main dark:text-accent-secondary-eco lg:text-[16px] lg:leading-5 tablet:text-[14px] ${titleClassName}`}
					>
						{subCategoryTitle}
					</h2>
					<p className="text-primary-main lg:text-[15px] tablet:text-[12px]">
						{subCat?.clr}
					</p>
				</div>

				{/* Icon or Image */}
				<div className="hidden gap-2 tablet:flex">
					<div className="relative h-5 w-5 lg:h-[22px] lg:w-[21.08px]">
						<ImageWithErrorHandler
							src="/static/images/TWSafety.png"
							alt="Logo"
							fill={true}
						/>
					</div>
					{subCat.is_eco && (
						<div className="relative h-5 w-5 lg:h-[22px] lg:w-[23px]">
							<ImageWithErrorHandler
								src="/static/images/TWEco.png"
								alt="Logo"
								fill={true}
							/>
						</div>
					)}
				</div>
			</div>

			{!showImageInFront && (
				<div className="absolute bottom-0 right-0">
					<div className="relative h-[60px] w-[60px] lg:h-[120px] lg:w-[120px]">
						<ImageWithErrorHandler
							src={subCat?.image}
							alt="sub-cat-image"
							fill={true}
							className="h-full w-full"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default SubCategoryCard;
