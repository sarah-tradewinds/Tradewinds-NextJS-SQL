import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
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
		containerClassName,
		titleClassName,
		innerContainer,
		nameAndDescriptionClassName,
		onClick
	} = props;

	return (
		<div
			className={`py-4s pl-14s sm:bg-transparents sm:py-0s sm:pl-0s flexs flex-cols relative ${containerClassName}`}
		>
			<h2
				className={`font-montserrat font-semibold text-primary-main dark:text-accent-secondary-eco lg:mb-[11px] lg:text-[25px] lg:leading-[30px] ${titleClassName}`}
			>
				{title}
			</h2>

			{/* Container */}
			<div
				className={`relative flex flex-col justify-between space-y-4 overflow-hidden rounded-lg bg-agri-main p-4 font-montserrat lg:h-[236.3px] ${innerContainer}`}
				style={{ backgroundColor: bgHexColor }}
			>
				<p
					className={`lg:h-[162px] lg:w-[183px] lg:text-[18px] lg:leading-[22px] ${nameAndDescriptionClassName}`}
				>
					{/* <span className="font-semibold text-primary-main dark:text-accent-secondary-eco">
						{name} {` `}
					</span> */}
					<span className="text-gray">{description}</span>
				</p>

				{!hideImage && (
					<div className="absolute bottom-0 right-0">
						{/* <div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]"> */}
						<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[263px] lg:w-[164px]">
							<ImageWithErrorHandler
								src={imageUrl}
								alt={alt || slug}
								fill={true}
							/>
						</div>
					</div>
				)}

				{/* Action button */}
				{!hideButton && (
					<div className="absolute lg:left-[27px] lg:bottom-[22.05px]">
						<Button
							href={onClick ? '' : slug}
							onClick={onClick}
							// className={`bg-[${bgHexColor}]/70 flex items-center justify-center rounded-md border border-black/20 text-[18px] uppercase text-white`}
							className={`whitespace-nowrap !bg-gray !px-0 !py-0 capitalize text-white lg:!h-[24.62px] lg:!w-[138.39px] lg:text-lg lg:!font-normal lg:!leading-[22px]`}
							style={{
								backgroundColor: bgHexColor
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
