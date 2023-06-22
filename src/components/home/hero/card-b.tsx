// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

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
		// <div className="flex h-[153px] w-[203px] flex-col rounded-md bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg tablet:h-[240px] tablet:w-[226px] tablet:p-0 lg:!h-[352px] lg:!w-[466px]">
		<div className="flex h-[153px] w-[203px] flex-col rounded-md bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[280px] desktop:!h-[352px] desktop:!w-[466px] tablet:h-[240px] tablet:w-[226px] tablet:p-0">
			<h2 className="tablet:leading[24px] font-mont text-[15px] font-bold capitalize leading-[18px] text-primary-main dark:text-accent-secondary-eco lg:ml-[18px] lg:mt-[8px] lg:!h-[66px] lg:pt-[3px] lg:text-[25px] lg:leading-[30px] tablet:ml-[10.48px] tablet:mt-[3px] tablet:pt-[3px] tablet:text-[20px]">
				{title}
			</h2>
			<div className="mt-2 flex h-full items-center tablet:mt-[6.04px]">
				<div>
					<div className="relative lg:mt-[10px] lg:ml-[21px] desktop:!h-[129.2px] desktop:!w-[147.2px] tablet:ml-[9.48px] tablet:h-[52.66px] tablet:w-[60px] ">
						<ImageWithErrorHandler
							src={imageUrl}
							alt={alt || ''}
							fill={true}
						/>
					</div>
				</div>

				<div className="flex-cols flex lg:ml-2">
					<p className="font-mont text-[12px] text-white lg:text-xs lg:leading-[20px] tablet:text-[13px] tablet:leading-4">
						{subtitle}
					</p>
					{/* <Button
						href={href}
						variant="buyer"
						className="!mt-2 !flex !min-h-[25.95px] !items-center !justify-center whitespace-nowrap !px-0 !py-0 shadow-lg transition-colors duration-300 ease-in-out hover:bg-accent-secondary-main/70 lg:!mt-3 lg:block lg:!h-[25.95px] lg:!w-[138.39px] lg:!text-[18px] lg:!leading-[22px]"
					>
						{buttonText || 'Learn More'}
					</Button> */}
				</div>
			</div>

			{/* <p className="font-mont text-gray tablet:mt-[16.92px] tablet:ml-[10.48px] tablet:mr-[14.05px] tablet:text-[16px] tablet:leading-5 lg:mt-[23px] lg:text-lg lg:leading-[22px] pc:hidden">
				<span className="text-home font-mont font-bold dark:text-accent-secondary-eco tablet:break-all"></span>
				{description}
			</p> */}
		</div>
	);
};

export default CardB;
