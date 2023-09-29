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
		<div className="relative h-[103px] w-full md:h-[116px] lg:h-[228px] desktop:h-[227.59px]">
			{/* <Image */}
			<ImageWithErrorHandler
				key={imageUrl}
				src={imageUrl}
				alt={text || ''}
				fill={true}
				sizes="(min-width: 1512px) 1512px, (min-width: 1280px) 1280px,  (min-width: 1024px) 1024px, (min-width: 768px) 768px , (min-width: 640px) 640px, 300px"
			/>

			{text && (
				<h4
					className={`${getAlignmentClassName(
						horizontal,
						vertical
					)} absolute font-semibold text-white md:w-[304px] md:text-[27.125px] md:leading-[33px] desktop:w-[618px] desktop:text-[55.125px] desktop:leading-[67px]`}
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
