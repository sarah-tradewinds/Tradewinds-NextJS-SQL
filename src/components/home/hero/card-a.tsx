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
			// className="flex h-full w-full cursor-pointer flex-col rounded-md bg-white p-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[226px] md:px-3 md:pb-3 lg:h-[352px] lg:w-![466px]"
			className="tablet-h-[240px] flex h-full w-full cursor-pointer flex-col space-y-1 rounded-md bg-white p-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[280px] desktop:!h-[352px] desktop:!w-[466px] tablet:w-[226px] tablet:px-3 tablet:pb-3"
		>
			<h2 className="font-mont text-[15px] font-semibold capitalize leading-[18px] text-primary-main dark:text-accent-secondary-eco desktop:py-2 desktop:text-[25px] desktop:leading-[30px] tablet:text-[20px] tablet:leading-6">
				{title}
			</h2>
			<div className="relative mt-1 hidden h-[86px] w-[180px] overflow-hidden desktop:mt-[15px] desktop:!h-[201px] lg:!w-[420px] tablet:mt-[3.19px] tablet:block tablet:h-[109.63px] tablet:w-[203.41px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
					fill={true}
				/>
			</div>
			<p className="tablet:ml-[10.17px]s overflow-hidden font-mont text-xs capitalize leading-[15px] text-[#044E86] lg:mx-[10px] lg:mt-[15px] lg:!h-auto lg:text-lg lg:leading-[22px] tablet:mr-[14.36px] tablet:mt-[9.09px] tablet:h-[76px] tablet:text-[16px] tablet:leading-5">
				{subtitle}
			</p>
		</Link>
	);
};

export default CardA;
