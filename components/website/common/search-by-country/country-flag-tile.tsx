import Image from 'next/image';

interface CountryFlagTileProps {
	containerClassName?: string;
	imageUrl: string;
	title: string;
}

const CountryFlagTile: React.FC<CountryFlagTileProps> = (props) => {
	const { containerClassName, imageUrl, title } = props;

	return (
		<div className={`relative ${containerClassName}`}>
			<div className="flex">
				<div className="relative h-[27px] w-[43px]">
					<Image src={imageUrl} alt={title} layout="fill" />
				</div>
				<p className="pl-4 text-[20px] text-gray">{title}</p>
			</div>
		</div>
	);
};

export default CountryFlagTile;
