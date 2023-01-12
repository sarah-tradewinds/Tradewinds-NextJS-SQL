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
			className="gap-2s flex-1s flex cursor-pointer flex-col rounded-md bg-white transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg tablet:h-[240px] tablet:w-[226px] desktop:h-[352px] desktop:w-[466px]"
		>
			<h2
				className="tablet:t-[3.76px]  font-mont font-semibold capitalize text-primary-main dark:text-accent-secondary-eco tablet:ml-[10.17px] tablet:text-[20px] tablet:leading-6
      desktop:mx-[21px] desktop:mt-[14px] desktop:pt-[3px] desktop:text-[25px] desktop:leading-[30px]"
			>
				{title}
			</h2>
			<div className="relative hidden overflow-hidden tablet:ml-[11.14px] tablet:mr-[11.45px] tablet:mt-[3.19px] tablet:block tablet:h-[109.63px] tablet:w-[203.41px] desktop:mx-[23px] desktop:mt-[15px] desktop:h-[201px] desktop:w-[420px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt}
					fill={true}
					// className="object-cover"
				/>
			</div>
			<p className="font-mont capitalize text-gray tablet:ml-[10.17px] tablet:mr-[14.36px] tablet:mt-[9.09px] tablet:text-[16px]  tablet:leading-5 desktop:mx-[21px] desktop:mt-[15px] desktop:text-lg desktop:leading-[22px]">
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
