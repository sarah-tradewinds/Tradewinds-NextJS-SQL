// Third party package

import Button from 'components/common/form/button';

interface CategoryCardProps {
	title: string;
	name?: string;
	slug?: string;
	description: string;
	buttonText: string;
	imageUrl: string;
	alt: string;
	hideImage?: boolean;
	hideButton?: boolean;
	bgHexColor?: string;
	actionButtonBgColor?: string;
	containerClassName?: string;
	innerContainer?: string;
	titleClassName?: string;
	nameAndDescriptionClassName?: string;
	onClick?: () => any;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
	const {
		title,
		name,
		slug,
		description,
		imageUrl,
		alt,
		hideImage,
		buttonText,
		hideButton,
		bgHexColor,
		actionButtonBgColor,
		containerClassName,
		titleClassName,
		innerContainer,
		nameAndDescriptionClassName,
		onClick
	} = props;

	return (
		<div className={`relative flex flex-col ${containerClassName}`}>
			<h2
				className={`lg:mb-[11px]s tablet:p-4d font-montserrat font-semibold text-primary-main dark:text-accent-secondary-eco lg:p-0 lg:text-[25px] lg:leading-[30px] tablet:mb-[11px] ${titleClassName}`}
			>
				{title}
			</h2>

			{/* Container */}
			<div
				className={`relative bg-agri-main p-4 font-montserrat tablet:h-full desktop:h-full ${innerContainer}`}
				style={{ backgroundColor: bgHexColor }}
			>
				<p
					className={`lg:h-[162px] lg:w-[183px] lg:text-[18px] lg:leading-[22px] ${nameAndDescriptionClassName}`}
				>
					<span className="text-gray">{description}</span>
				</p>

				{!hideImage && (
					<div className="absolute bottom-0 right-0">
						<div className="relative h-[60px] w-[60px] overflow-hidden lg:!h-[235px] lg:!w-[250px] tablet:h-[100px] tablet:w-[100px]">
							<div className="absolute bottom-0 right-0">
								<img
									src={imageUrl}
									alt={alt || slug || ''}
									className="h-auto w-auto object-contain"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Action button */}
				{!hideButton && (
					<div className="absolute lg:left-[27px] lg:bottom-[21.12px] tablet:bottom-[21.12px] tablet:left-[27px]">
						<Button
							href={onClick ? '' : slug}
							onClick={onClick}
							className={`whitespace-nowrap !px-2 !py-0 font-montserrat capitalize text-white lg:!min-h-[25.95px] lg:!w-[138.39px] lg:!rounded-lg lg:text-lg lg:!font-normal lg:!leading-[22px]`}
							style={{
								backgroundColor: actionButtonBgColor
							}}
						>
							{buttonText || 'SOURCE NOW'}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryCard;
