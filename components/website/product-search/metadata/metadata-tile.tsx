import Image from 'next/image';

interface MetadataTileProps {
	imageUrl: string;
	alt?: string;
	title: string;
	className?: string;
}

const MetadataTile: React.FC<MetadataTileProps> = (props) => {
	const { imageUrl, alt, title } = props;

	return (
		<div className="flex items-center space-x-2">
			<div className="relative h-[12px] w-[12px] lg:h-[24px] lg:w-[24px]">
				<Image src={imageUrl} alt={alt} layout="fill" />
			</div>

			<span className="text-[10px] text-accent-primary-main md:text-[12px] lg:text-[13px]">
				{title}
			</span>
		</div>
	);
};

export default MetadataTile;
