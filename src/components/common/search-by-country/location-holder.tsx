import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface LocationHolderProps {
	containerClassName?: string;
	imageUrl: string;
	color?: string;
	title: string;
	count?: number;
}

const LocationHolder: React.FC<LocationHolderProps> = (props) => {
	const { containerClassName, imageUrl, color, title, count } = props;

	return (
		<div
			className={`relative w-[192px] md:w-[172px] lg:w-[211px] desktop:w-[295px] ${containerClassName}`}
		>
			<div
				style={{ backgroundColor: color }}
				className={`relative h-[168px] w-[192px] rounded-md shadow md:h-[156px] md:w-[172px] lg:h-[188px] lg:w-[211px] desktop:h-[256px] desktop:w-[295px]`}
			>
				<div className="absolute left-1/2 -top-12 -translate-x-1/2 transform lg:-top-[70px] desktop:-top-[95px]">
					{/* Inner box */}
					<div className="relative h-[200px] w-[156px] md:h-[196px] md:w-[140px] lg:h-[219px]  lg:w-[161px] desktop:h-[300px]  desktop:w-[225px]">
						<ImageWithErrorHandler
							src="/static/images/search-by-country-images/shape.png"
							alt={title || ''}
							fill={true}
						/>

						<div className="absolute left-0 right-0 bottom-0 lg:top-[36px] desktop:top-[50px]">
							<div className="flex justify-center p-2 md:-mt-6 lg:-mt-0 desktop:-mt-0">
								{/* Island Image */}
								<div className="relative h-[60px] w-[50px] lg:h-[110px] lg:w-[169px] desktop:h-[110px] desktop:w-[169px]">
									<ImageWithErrorHandler
										src={imageUrl}
										alt={title || ''}
										fill={true}
									/>
								</div>
							</div>

							<p className="p-2 text-center text-[15px] font-semibold text-gray lg:text-[18px] lg:leading-[21px] desktop:text-[24px] desktop:leading-[30px]">
								{title}
							</p>
						</div>
					</div>
				</div>
			</div>
			<p className=" w-full border-gray/40 text-center text-[18px] text-cyan lg:my-[10px] desktop:my-[13px]">
				({count})
			</p>
		</div>
	);
};

export default LocationHolder;
