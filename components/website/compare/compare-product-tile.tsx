import Image from 'next/image';
import { MdOutlineClose } from 'react-icons/md';
import Button from '../common/form/button';

interface CompareProductTileProps {
	imageUrl: string;
	alt?: string;
	title: string;
	minPrice: number;
	maxPrice: number;
}

const CompareProductTile: React.FC<CompareProductTileProps> = (
	props
) => {
	const { imageUrl, alt, title, minPrice, maxPrice } = props;

	return (
		<div className="relative flex items-center space-x-2  bg-white p-2 lg:w-[180px] xl:w-[240px] 2xl:w-[250px]">
			<div className="relative h-[44px] w-[65px]">
				<Image src={imageUrl} alt={alt} layout="fill" />
			</div>
			<div className="w-[250px] space-y-2 text-[12px]">
				<p>{title}</p>
				<p className="font-semibold">
					${minPrice} - ${maxPrice}/piece
				</p>
			</div>

			{/* Close button */}
			<div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FC5267]">
				<Button>
					<MdOutlineClose className="text-white" />
				</Button>
			</div>
		</div>
	);
}; // End of CompareProductTile component

export default CompareProductTile;
