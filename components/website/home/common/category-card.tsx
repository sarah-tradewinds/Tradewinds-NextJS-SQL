import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Button from 'components/website/common/form/button';

// store

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
			className={`relative flex flex-col py-4 pl-14 sm:bg-transparent sm:py-0 sm:pl-0 ${containerClassName}`}
		>
			<h2
				className={`mb-8 font-mont font-semibold text-primary-main dark:text-accent-secondary-eco lg:text-[25px] ${titleClassName}`}
			>
				{title}
			</h2>

			{/* Container */}
			<div
				className={`relative flex h-full flex-col justify-between space-y-4 rounded-lg bg-agri-main p-4 ${innerContainer}`}
				style={{ backgroundColor: bgHexColor }}
			>
				<p
					className={`mt-2 w-[64%] lg:text-[18px] ${nameAndDescriptionClassName}`}
				>
					<span className="font-semibold text-primary-main dark:text-accent-secondary-eco">
						{name} {` `}
					</span>
					<span className="text-gray">{description}</span>
				</p>

				{/* Image */}
				{/* {!hideImage && (
					<div className="absolute -top-12 right-0">
						<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]">
							<ImageWithErrorHandler
								src={imageUrl}
								alt={alt || slug}
								layout="fill"
							/>
						</div>
					</div>
				)} */}

				{!hideImage && (
					<div className="absolute bottom-0 right-0">
						<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]">
							<ImageWithErrorHandler
								src={imageUrl}
								alt={alt || slug}
								layout="fill"
							/>
						</div>
					</div>
				)}

				{/* {!hideImage && (
					<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]">
						<ImageWithErrorHandler
							src={imageUrl}
							alt={alt || slug}
							layout="fill"
						/>
					</div>
				)} */}

				{/* Action button */}
				{!hideButton && (
					<div>
						<Button
							href={onClick ? '' : slug}
							onClick={onClick}
							className={`bg-[${bgHexColor}]/70 flex h-[40px] w-[180px] items-center justify-center rounded-md border border-black/20 text-[18px] uppercase text-white`}
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
