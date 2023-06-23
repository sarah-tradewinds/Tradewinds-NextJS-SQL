import {
	getAlignmentClassName,
	xAxisAlignment,
	yAxisAlignment
} from 'utils/common.util';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface ProductSearchTopBannerProps {
	imageUrl: string;
	text?: string;
	textColor?: string;
	horizontal?: xAxisAlignment;
	vertical?: yAxisAlignment;
}

const ProductSearchTopBanner: React.FC<ProductSearchTopBannerProps> = (
	props
) => {
	const {
		imageUrl,
		text,
		textColor,
		horizontal = 'left',
		vertical = 'top'
	} = props;

	return (
		<div className="relative h-[103px] w-full tablet:h-[111.99px] desktop:h-[227.59px]">
			{/* <Image */}
			<ImageWithErrorHandler
				key={imageUrl}
				src={imageUrl}
				alt={text || ''}
				fill={true}
				className={`${
					imageUrl === '/coming-soon.png' ? 'object-contain' : ''
				}`}
			/>

			{text && (
				<h4
					className={`${getAlignmentClassName(
						horizontal,
						vertical
					)} absolute font-semibold text-white tablet:w-[304px] tablet:text-[27.125px] tablet:leading-[33px] desktop:w-[618px] desktop:text-[55.125px] desktop:leading-[67px]`}
					style={{
						color: textColor
					}}
				>
					{text}
				</h4>
			)}
		</div>
	);
}; // End of ProductSearchTopBanner

export default ProductSearchTopBanner;
