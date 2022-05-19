import Button from 'components/website/common/form/button';
import Image from 'next/image';

// store
import { useHomeStore } from 'store/home';

interface CategoryCardProps {
	title: string;
	slug?: string;
	description: string;
	buttonText: string;
	imageUrl: string;
	alt: string;
	bgHexColor?: string;
	containerClassName?: string;
	onClick?: () => any;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
	const isHidden = useHomeStore((state) => state.isHidden);

	const {
		title,
		slug,
		description,
		buttonText,
		imageUrl,
		alt,
		bgHexColor,
		containerClassName,
		onClick
	} = props;

	return (
		<div
			className={`relative flex flex-col bg-agri-main py-4 pl-14 sm:bg-transparent sm:py-0 sm:pl-0 ${containerClassName}`}
		>
			<h2 className="mb-4 font-mont font-semibold text-primary-main dark:text-accent-secondary-eco lg:text-[25px]">
				{title}
			</h2>

			{/* Container */}
			<div
				className={`relative mt-4 flex h-full flex-col justify-between space-y-4 rounded-lg bg-agri-main p-4`}
				style={{ backgroundColor: bgHexColor }}
			>
				<p className="mt-2 w-3/4 lg:text-[18px]">
					<span className="font-semibold text-primary-main dark:text-accent-secondary-eco">
						Name Here {` `}
					</span>
					<span className="text-gray">{description}</span>
				</p>

				{/* Image */}
				<div className="absolute -top-12 right-0">
					<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]">
						<Image src={imageUrl} alt={alt || slug} layout="fill" />
					</div>
				</div>

				{/* Action button */}
				<div>
					<Button
						href={onClick ? '' : slug}
						onClick={onClick}
						className={`bg-[${bgHexColor}]/70 flex h-[40px] w-[180px] items-center justify-center rounded-md border border-black/20 text-[18px] uppercase text-white`}
					>
						{buttonText || 'SOURCE NOW'}
					</Button>
					{/* <Link href={slug || '/'}>
						<a
							className={`bg-[${bgHexColor}]/70 flex h-[40px] w-[156px] items-center justify-center rounded-md border border-black/20 text-[18px] uppercase text-white`}
						>
							{buttonText || 'SOURCE NOW'}
						</a>
					</Link> */}
				</div>
			</div>
		</div>
	);
};

export default CategoryCard;
