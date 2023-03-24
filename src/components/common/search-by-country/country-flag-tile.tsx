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
				<div className="relative h-[27px] w-[43px]">
					<ImageWithErrorHandler
						key={imageUrl}
						src={imageUrl}
						alt={title || ''}
						fill={true}
					/>
				</div>
				<p className="pl-4 text-[20px] text-gray">{title}</p>
			</div>
		</div>
	);
};

export default CountryFlagTile;
