import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface CountryFlagTileProps {
	containerClassName?: string;
	imageUrl: string;
	title: string;
	onClick?: () => any;
}

const CountryFlagTile: React.FC<CountryFlagTileProps> = (props) => {
	const { containerClassName, imageUrl, title, onClick } = props;

	return (
		<div className={`relative ${containerClassName}`} onClick={onClick}>
			<div className="flex">
				<div className="relative h-[12px] w-[19px] sm:h-[25px] sm:w-[40px] md:h-[19px] md:w-[28px] lg:h-[19px] lg:w-[28px] desktop:h-[30px] desktop:w-[43px]">
					<ImageWithErrorHandler
						key={imageUrl}
						src={imageUrl}
						alt={title || ''}
						fill={true}
					/>
				</div>
				<p className=" pl-[5px] text-[14px] leading-[16.5px] text-gray sm:pl-[10px] sm:text-[16px] sm:leading-[19px] md:pl-[10px] md:text-[15px] md:leading-[18px] lg:pl-[12px] lg:text-[15px] lg:leading-[18px] desktop:pl-[25px] desktop:text-[21px] desktop:leading-[21px]">
					{title}
				</p>
			</div>
		</div>
	);
};

export default CountryFlagTile;
