import Image from 'next/image';

interface SubCategoryTileProps {
	title: string;
	imageUrl: string;
	alt?: string;
	showBorder?: boolean;
}

const SubCategoryTile: React.FC<SubCategoryTileProps> = ({
	title,
	imageUrl,
	alt,
	showBorder
}) => {
	return (
		<div className="flex cursor-pointer items-center space-x-4">
			<div className="relative h-[44px] w-[51px]  md:h-[67px] md:w-[77px] lg:h-[67px] lg:w-[77px]">
				<Image src={imageUrl} alt={alt} layout="fill" />
			</div>
			<div className="relative">
				<p className="text-[15px] font-semibold text-gray md:text-[12px] lg:text-[18px]">
					{title}
				</p>
				{showBorder && (
					<p className="absolute left-1/2 -bottom-2 w-3/5 -translate-x-1/2 rounded-full border-b-4 border-secondary border-gray/40"></p>
				)}
			</div>
		</div>
	);
}; // End of SubCategoryTile component

export default SubCategoryTile;
