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
		<div className="relative h-[103px] w-full md:h-[111.99px] lg:h-[227.59px]">
			{/* <Image */}
			<ImageWithErrorHandler
				key={imageUrl}
				src={imageUrl}
				alt={text}
				fill={true}
			/>

			{text && (
				<h4
					className={`${getAlignmentClassName(
						horizontal,
						vertical
					)} absolute font-semibold text-white md:w-[304px] md:text-[27.125px] md:leading-[33px] lg:w-[618px] lg:text-[55.125px] lg:leading-[67px]`}
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
