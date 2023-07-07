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
			<h2 className="ml-[14px] mt-[5.5px] text-[18px] font-semibold leading-[21.94px] text-primary-main dark:text-primary-eco sm:pt-[4px] lg:text-[21px] lg:leading-[25.6px] xl:ml-[29.85px] xl:text-[25px] xl:leading-[30.48px] desktop:ml-[34px]">
				{title}
			</h2>

			<div className="justify-centers mt-[12px] ml-[11px] flex items-center space-x-[12px] sm:mt-[29.51px] sm:justify-start sm:space-x-[24.11px] lg:mt-[16.4px] lg:ml-[14.69px] lg:space-x-[32.17px] xl:mt-[40.52px] xl:ml-[18.28px] xl:space-x-[40.05px] desktop:mt-[51px] desktop:ml-[21px] desktop:space-x-[46px]">
				<div className="relative h-[76.75px] w-[72.32px] lg:h-[96.52px] lg:w-[102.43px] xl:h-[127.91px] xl:w-[120.15px] desktop:h-[147.62px] desktop:w-[138px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt={alt || ''}
						fill={true}
					/>
				</div>

				<p className="w-[121.58px] text-[10px] text-white sm:block lg:w-[162.26px] lg:text-[14.41px] lg:leading-[17.57px] xl:w-[202px] xl:text-[18px] xl:leading-[21.94px] desktop:w-[232px] desktop:text-[21px] desktop:leading-[25.6px]">
					{subtitle}
				</p>
			</div>
		</div>
	);
};

export default CardB;
