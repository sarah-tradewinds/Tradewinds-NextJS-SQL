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
			// className="flex h-full w-full cursor-pointer flex-col rounded-md bg-white p-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[226px] md:px-3 md:pb-3 lg:h-[352px] lg:w-[466px]"
			className="flex h-full w-full cursor-pointer flex-col space-y-1 rounded-md bg-white p-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:h-[240px] md:w-[280px] md:px-3 md:pb-3 lg:h-[352px] lg:w-[466px]"
		>
			<h2 className="lg:pt-[3px]s lg:mt-[14px]s font-mont text-[15px] font-semibold capitalize leading-[18px] text-primary-main dark:text-accent-secondary-eco md:text-[20px] md:leading-6 lg:pt-2 lg:text-[25px] lg:leading-[30px]">
				{title}
			</h2>
			<div className="md:w-[203.41px]s relative mt-1 hidden h-[86px] w-[180px] overflow-hidden md:mt-[3.19px] md:block md:h-[109.63px] md:w-full lg:mt-[15px] lg:h-[201px] lg:w-[420px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
					fill={true}
				/>
			</div>
			<p className="md:ml-[10.17px]s font-mont text-xs capitalize leading-[15px] text-[#044E86] md:mr-[14.36px] md:mt-[9.09px] md:text-[16px]  md:leading-5 lg:mx-[10px] lg:mt-[15px] lg:text-lg lg:leading-[22px]">
				{subtitle},
			</p>
		</Link>
	);
};

export default CardA;
