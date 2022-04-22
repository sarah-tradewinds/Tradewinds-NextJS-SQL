import Image from 'next/image';

interface LocationHolderProps {
	containerClassName?: string;
	imageUrl: string;
	title: string;
}

const LocationHolder: React.FC<LocationHolderProps> = (props) => {
	const { containerClassName, imageUrl, title } = props;

	return (
		<div
			className={`relative h-[168px] w-[192px] rounded-md bg-secondary shadow md:h-[156px] md:w-[172px] lg:h-[256px] lg:w-[295px] ${containerClassName}`}
		>
			<div className="absolute left-1/2 -top-12 -translate-x-1/2 transform lg:-top-24">
				{/* Inner box */}
				<div className="relative h-[200px] w-[156px] md:h-[196px] md:w-[140px] lg:h-[300px] lg:w-[225px]">
					<Image
						src="/static/images/search-by-country-images/shape.png"
						alt={title}
						layout="fill"
					/>

					<div className="absolute top-8 left-0 right-0 bottom-0">
						<div className="flex justify-center p-2 md:-mt-6 lg:-mt-0">
							{/* Island Image */}
							<div className="relative h-[60px] w-[50px] lg:h-[110px] lg:w-[135px]">
								<Image src={imageUrl} alt={title} layout="fill" />
							</div>
						</div>

						<p className="p-2 text-center text-[15px] font-semibold text-gray lg:text-[24px]">
							{title}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LocationHolder;
