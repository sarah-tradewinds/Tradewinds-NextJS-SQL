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
			<h2 className="text-[18px] font-semibold text-primary-main">
				{title}
			</h2>

			<div>
				<div className="">
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
