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
		<div className="sticky top-[88px] z-[1000] h-[103px]  w-full sm:top-[128px] md:h-[234px]">
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
					)} absolute p-1 text-xl font-semibold text-white md:w-[480px] md:text-[27px]`}
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
