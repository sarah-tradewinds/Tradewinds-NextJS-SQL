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
			className="block h-[153px] w-[203px] overflow-hidden rounded-md bg-white transition-all hover:-translate-y-[2px] sm:h-[203px] sm:w-[245px] lg:!h-[250.24px] lg:!w-[325.92px] xl:!h-[305px] xl:!w-[405.73px] desktop:!h-[352px] desktop:!w-[466px]"
		>
			<h2 className="ml-[9.15px] pt-[7px] text-[15px] font-semibold text-gray dark:text-gray sm:pt-[4px] sm:text-[18px] sm:leading-[21px] lg:ml-[14.97px] lg:pt-[6px] lg:text-[21px] lg:leading-[23px] xl:ml-[19.06px] xl:pt-[12px] desktop:ml-[21px] desktop:pt-[14px] desktop:text-[25px] desktop:leading-[30.48px]">
				{title}
			</h2>

			<div className="relative ml-[14px] mt-1 h-[101px] w-[168px] sm:ml-[12.27px] sm:h-[105.48px] sm:w-[220.42px] lg:ml-[16.37px] lg:h-[135px] lg:w-[300.04px] xl:ml-[21.77px] xl:h-[169.14px] xl:w-[366.22px] desktop:ml-[23px] desktop:h-[195.21px] desktop:w-[420px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
					width={420}
					height={196}
				/>
			</div>

			<p className="hidden text-[10px] text-gray dark:text-gray sm:block sm:pl-[14.87px] sm:pr-[11.82px] lg:mt-1 lg:pl-[17.49px] lg:text-[11px] lg:leading-[13px] xl:mt-[6.12px] xl:pl-[23.87px] xl:text-[15px] xl:leading-[18.29px] desktop:mt-[7px] desktop:pl-[27px] desktop:text-[17.5px] desktop:leading-[20.5px]">
				{subtitle}
			</p>
		</Link>
	);
};

export default CardA;
