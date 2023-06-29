import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Link from 'next/link';

interface CardAProps {
	imageUrl: string;
	alt?: string;
	title: string;
	subtitle: string;
	href: string;
}

const CardA: React.FC<CardAProps> = (props) => {
	const { title, imageUrl, alt, subtitle, href } = props;

	return (
		<Link
			href={href}
			className="block h-[153px] w-[203px] overflow-hidden rounded-md bg-white sm:h-[203px] sm:w-[245px] lg:!h-[244.24px] lg:!w-[325.92px] xl:!w-[405.73px] xl:!h-[305px] desktop:!w-[466px] desktop:!h-[352px]"
		>
			<h2 className="ml-[9.15px] pt-[7px] text-[15px] font-semibold text-primary-main sm:pt-[4px] sm:text-[18px] desktop:text-[25px] desktop:ml-[21px] desktop:pt-[14px] lg:text-[21px] lg:ml-[14.97px] lg:pt-[9.71px] xl:ml-[19.06px] xl:pt-[12px]">  
				{title}
			</h2>

			<div className="relative ml-[14px] mt-1 h-[101px] w-[168px] sm:ml-[12.27px] sm:h-[105.48px] sm:w-[220.42px] lg:w-[298.17px] lg:h-[140.78px] lg:ml-[16.37px] xl:w-[366.22px] xl:h-[175.81px] xl:ml-[20.38px] desktop:w-[420px] desktop:h-[201px] desktop:ml-[23px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
					fill={true}
				/>
			</div>

			<p className="hidden text-[10px] text-primary-main sm:block sm:pl-[14.87px] lg:text-[12.01px] lg:pl-[19.18px] sm:pr-[11.82px] xl:text-[15px] xl:pl-[23.87px] xl:mt-[6.12px] desktop:text-[18px] desktop:pl-[27px] desktop:mt-[7px]">
				{subtitle}
			</p>
		</Link>
	);
};

export default CardA;
