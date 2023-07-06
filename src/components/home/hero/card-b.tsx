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
		<div className="h-[153px] w-[203px] overflow-hidden rounded-md bg-gradient-to-r from-[#E7CA00] to-[#E8A30E] sm:h-[203px] sm:w-[245px] lg:h-[244.24px] lg:w-[325.92px] xl:h-[305px] xl:w-[405.73px] desktop:h-[352px] desktop:w-[466px]">
			<h2 className="ml-[14px] mt-[5.5px] text-[15px] font-semibold leading-[18.29px] text-primary-main dark:text-primary-eco sm:pt-[4px] xl:text-[25px]">
				{title}
			</h2>

			<div className="flex">
				<div className="relative ml-[11px] h-[76.75px] w-[72.32px] border xl:h-[127.91px] xl:w-[120.15px] desktop:h-[147.62px] desktop:w-[138px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt={alt || ''}
						fill={true}
					/>
				</div>

				<p className="h-[74.86px]s truncates ml-[24.11px] hidden w-[121.58px]  text-white sm:block sm:text-[10px] xl:w-[202px] xl:text-[18px] desktop:w-[232px] desktop:text-[21]">
					{subtitle}
				</p>
			</div>
		</div>
	);
};

export default CardB;
