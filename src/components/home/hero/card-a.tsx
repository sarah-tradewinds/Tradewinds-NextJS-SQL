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
			className="block h-[153px] w-[203px] rounded-md bg-white"
		>
			<h2 className="ml-[9.15px] mt-[7px] text-[15px] font-semibold text-primary-main">
				{title}
			</h2>

			<div className="relative ml-[14px] mt-1 h-[101px] w-[168px] ">
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt || ''}
					fill={true}
				/>
			</div>
		</Link>
	);
};

export default CardA;
