// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface CardBProps {
	imageUrl: string;
	alt?: string;
	title: string;
	name: string;
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
		name,
		subtitle,
		description,
		href,
		buttonText
	} = props;

	return (
		<div className="h-[153px] w-[203px] rounded-md bg-gradient-to-r from-[#E7CA00] to-[#E8A30E]">
			<h2 className="ml-[14px] mt-[5.5px] h-[48px] truncate text-[18px] font-semibold text-primary-main">
				{title}
			</h2>

			<div>
				<div className="relative ml-[11px] h-[76.75px] w-[72.32px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt={alt || ''}
						fill={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardB;
