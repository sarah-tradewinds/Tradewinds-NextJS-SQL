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
				className={`lg:mb-[11px]s md:p-4d font-montserrat font-semibold text-primary-main dark:text-accent-secondary-eco md:mb-[11px] lg:p-0 lg:text-[25px] lg:leading-[30px] ${titleClassName}`}
			>
				{title}
			</h2>

			{/* Container */}
			<div
				className={`relative bg-agri-main p-4 font-montserrat md:h-full lg:h-full ${innerContainer}`}
				style={{ backgroundColor: bgHexColor }}
			>
				<p
					className={`lg:h-[162px] lg:w-[183px] lg:text-[18px] lg:leading-[22px] ${nameAndDescriptionClassName}`}
				>
					<span className="text-gray">{description}</span>
				</p>

				{/* {!hideImage && (
					<div className="absolute bottom-0 right-0">
						<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[250px] lg:w-[250px]">
							<ImageWithErrorHandler
								src={imageUrl}
								alt={alt || slug || ''}
								fill={true}
							/>
						</div>
					</div>
				)} */}

				{!hideImage && (
					<div className="absolute bottom-0 right-0">
						<div className="relative h-[60px] w-[60px] overflow-hidden md:h-[100px] md:w-[100px] lg:h-[235px] lg:w-[250px]">
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
					<div className="absolute md:bottom-[21.12px] md:left-[27px] lg:left-[27px] lg:bottom-[21.12px]">
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
