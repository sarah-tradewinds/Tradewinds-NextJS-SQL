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
		<div className="relative h-[103px] w-full md:h-[234px]">
			{/* <Image */}
			<ImageWithErrorHandler
				key={imageUrl}
				src={imageUrl}
				alt={text}
				layout="fill"
			/>

			{text && (
				<h4
					className={`${getAlignmentClassName(
						horizontal,
						vertical
					)} absolute text-[40px] font-semibold text-white md:w-[480px]`}
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
