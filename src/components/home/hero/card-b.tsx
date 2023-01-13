// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';

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
		// <div className="flex flex-1 flex-col justify-between gap-3  rounded-md bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:gap-0 md:h-[240px] md:w-[300px] lg:h-[356px] lg:w-[380px] lg:p-6 xl:w-[416px] pc:h-[300px]">
		<div className="justify-betweens flex flex-col rounded-md bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[226px] md:p-0 lg:h-[352px] lg:w-[466px]">
			<h2 className="md:leading[24px] font-mont text-[15px] font-bold capitalize leading-[18px] text-primary-main dark:text-accent-secondary-eco md:ml-[10.48px] md:mt-[3px] md:pt-[3px] md:text-[20px] lg:ml-[18px] lg:mt-[8px] lg:h-[66px] lg:pt-[3px] lg:text-[25px] lg:leading-[30px]">
				{title}
			</h2>
			<div className="mt-2 flex flex-row md:mt-[6.04px]">
				<div>
					{/* <div className="relative h-[40px] w-[60px] md:h-[56px] md:w-[64px] lg:h-[130px] lg:w-[150px] pc:hidden"> */}
					<div className="relative md:ml-[9.48px] md:h-[52.66px] md:w-[60px] lg:mt-[10px] lg:ml-[21px] lg:h-[129.2px] lg:w-[147.2px] ">
						<ImageWithErrorHandler
							src={imageUrl}
							alt={alt}
							fill={true}
						/>
					</div>
				</div>

				{/* <div className="flex flex-col gap-4 pl-2 lg:pl-4 pc:pl-0"> */}
				<div className="flex flex-col">
					<p className="font-mont text-[12px] text-white md:text-[13px] md:leading-4 lg:text-[21px] lg:leading-[26px]">
						{subtitle}
					</p>
					<Button
						href={href}
						variant="buyer"
						className="mt-3 whitespace-nowrap !px-0 !py-0 shadow-lg transition-colors duration-300 ease-in-out hover:bg-accent-secondary-main/70 lg:!mt-3 lg:block lg:h-[25.95px] lg:!w-[138.39px] lg:!text-[18px] lg:!leading-[22px]"
					>
						{buttonText || 'Learn More'}
					</Button>
				</div>
			</div>

			<p className="font-mont text-gray md:mt-[16.92px] md:ml-[10.48px] md:mr-[14.05px] md:text-[16px] md:leading-5 lg:mt-[23px] lg:text-lg lg:leading-[22px] pc:hidden">
				<span className="text-home font-mont font-bold dark:text-accent-secondary-eco md:break-all">
					Name Here
					{/* {name} */}
				</span>
				Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit
				amet,
				{/* &nbsp; {description} */}
			</p>
		</div>
	);
};

export default CardB;
