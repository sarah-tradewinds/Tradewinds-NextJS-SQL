import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Link from 'next/link';

interface CardAProps {
	imageUrl: string;
	alt?: string;
	title: string;
	name: string;
	subtitle: string;
	href: string;
}

const CardA: React.FC<CardAProps> = (props) => {
	const { title, imageUrl, alt, name, subtitle, href } = props;

	return (
		<Link
			href={href}
			// className="flex w-full flex-1 cursor-pointer flex-col gap-2 rounded-md bg-white p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:h-[280px] md:h-[240px] md:w-[226px] lg:h-[352px] lg:w-[300px] lg:p-6 xl:w-[416px] pc:h-[300px]"
			className="flex cursor-pointer flex-col rounded-md bg-white p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[226px] md:p-0 lg:h-[352px] lg:w-[466px]"
		>
			<h2
				className="md:t-[3.76px] font-mont text-[15px] font-semibold capitalize leading-[18px] text-primary-main dark:text-accent-secondary-eco md:ml-[10.17px] md:text-[20px] md:leading-6
      lg:mx-[21px] lg:mt-[14px] lg:pt-[3px] lg:text-[25px] lg:leading-[30px]"
			>
				{title}
			</h2>
			<div className="relative hidden overflow-hidden md:ml-[11.14px] md:mr-[11.45px] md:mt-[3.19px] md:block md:h-[109.63px] md:w-[203.41px] lg:mx-[23px] lg:mt-[15px] lg:h-[201px] lg:w-[420px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt}
					fill={true}
					// className="object-cover"
				/>
			</div>
			<p className="font-mont text-xs capitalize leading-[15px] text-gray md:ml-[10.17px] md:mr-[14.36px] md:mt-[9.09px] md:text-[16px]  md:leading-5 lg:mx-[21px] lg:mt-[15px] lg:text-lg lg:leading-[22px]">
				<span className="font-mont font-bold text-primary-main dark:text-accent-secondary-eco">
					{/* {name} */}
					Name Here
				</span>
				Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit
				amet,
				{/* &nbsp; {subtitle}, */}
			</p>
		</Link>
	);
};

export default CardA;
