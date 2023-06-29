// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface CardBProps {
	imageUrl: string;
	alt?: string;
	title: string;
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
		subtitle,
		description,
		href,
		buttonText
	} = props;

	return (
		<div className="h-[153px] w-[203px] overflow-hidden rounded-md bg-gradient-to-r from-[#E7CA00] to-[#E8A30E] sm:h-[203px] sm:w-[245px] lg:w-[325.92px] lg:h-[244.24px] xl:w-[405.73px] xl:h-[305px] desktop:w-[466px] desktop:h-[352px]">
			<h2 className="ml-[14px] mt-[5.5px] h-[48px] truncate text-[18px] font-semibold text-primary-main sm:pt-[4px] xl:text-[25px]">
				{title}
			</h2>

			<div className="flex">
				<div className="relative ml-[11px] h-[76.75px] w-[72.32px] xl:w-[120.15px] xl:h-[127.91px] desktop:w-[138px] desktop:h-[147.62px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt={alt || ''}
						fill={true}
					/>
				</div>

				<p className="sm:text-[10px] ml-[24.11px] hidden h-[74.86px]s w-[121.58px] truncates text-white sm:block xl:text-[18px] desktop:text-[21] xl:w-[202px] desktop:w-[232px]">
					{subtitle}
				</p>
			</div>
		</div>
	);
};

export default CardB;
