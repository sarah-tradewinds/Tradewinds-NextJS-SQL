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
			className="block h-[153px] w-[203px] overflow-hidden rounded-md bg-white sm:h-[203px] sm:w-[245px]"
		>
			<h2 className="ml-[9.15px] pt-[7px] text-[15px] font-semibold text-primary-main sm:pt-[4px] sm:text-[18px]">
				{title}
			</h2>

			<div className="relative ml-[14px] mt-1 h-[101px] w-[168px] sm:ml-[12.27px] sm:h-[105.48px] sm:w-[220.42px]">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
					fill={true}
				/>
			</div>

			<p className="hidden text-[10px] text-primary-main sm:block sm:pl-[14.87px] sm:pr-[11.82px]">
				{subtitle}
			</p>
		</Link>
	);
};

export default CardA;
