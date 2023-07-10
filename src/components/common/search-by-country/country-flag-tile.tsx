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
				<div className="relative lg:h-[19px] lg:w-[28px] desktop:h-[30px] desktop:w-[43px]">
					<ImageWithErrorHandler
						key={imageUrl}
						src={imageUrl}
						alt={title || ''}
						fill={true}
					/>
				</div>
				<p className=" text-gray lg:pl-[12px] lg:text-[15px] lg:leading-[18px] desktop:pl-[25px] desktop:text-[21px] desktop:leading-[21px]">
					{title}
				</p>
			</div>
		</div>
	);
};

export default CountryFlagTile;
