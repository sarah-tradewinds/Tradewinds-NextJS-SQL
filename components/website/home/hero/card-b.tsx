import Image from 'next/image';

// components
import Button from 'components/website/common/form/button';

interface CardBProps {
	imageUrl: string;
	alt?: string;
	title: string;
	name: string;
	subtitle: string;
	description: string;
	href: string;
	buttonText?: string;
}

const CardB: React.FC<CardBProps> = (props) => {
	const {
		title,
		imageUrl,
		alt,
		name,
		subtitle,
		description,
		href,
		buttonText
	} = props;

	return (
		// <div className="flex flex-1 flex-col justify-between gap-3 rounded bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:gap-0 lg:p-6  pc:h-[300px]">
		<div className="flex flex-1 flex-col justify-between gap-3  rounded bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:gap-0 md:h-[240px] md:w-[300px] lg:h-[356px] lg:w-[380px] lg:p-6 xl:w-[416px] pc:h-[300px]">
			<h2 className="font-mont text-[18px] font-bold capitalize text-primary-main dark:text-accent-secondary-eco lg:text-2xl">
				{title}
			</h2>
			<div className="flex flex-row">
				<div>
					<div className="relative h-[40px] w-[60px] md:h-[56px] md:w-[64px] lg:h-[130px] lg:w-[150px] pc:hidden">
						<Image
							src={imageUrl}
							alt={alt}
							layout="fill"
							className="object-cover"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-4 pl-2 lg:pl-4 pc:pl-0">
					<p className="font-mont text-[12px] text-white lg:text-[21px]">
						{subtitle}
					</p>
					<Button
						href={href}
						variant="buyer"
						className="lg:font-[16px] font-[12px] whitespace-nowrap shadow-lg transition-colors duration-300 ease-in-out hover:bg-accent-secondary-main/70"
					>
						{buttonText || 'Learn More'}
					</Button>
				</div>
			</div>
			<p className="font-mont text-base text-gray pc:hidden">
				<span className="text-home font-[18px] font-mont font-bold dark:text-accent-secondary-eco md:break-all">
					{name}
				</span>
				&nbsp; {description}
			</p>
		</div>
	);
};

export default CardB;
