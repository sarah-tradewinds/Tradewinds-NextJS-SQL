interface keyprops {
	imgUrl: string;
	imgClass: string;
	title: string;
	descriptionHead: string;
	description: string;
}

import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

const KeyAdvantageComponent: React.FC<keyprops> = (props) => {
	const { title, descriptionHead, imgClass, description, imgUrl } =
		props;
	return (
		<div>
			{/* Large screen only */}
			<div className=" hidden text-center sm:block md:block lg:block desktop:block ">
				<div className={`${imgClass} relative mx-auto `}>
					<ImageWithErrorHandler src={imgUrl} alt="" fill={true} />
				</div>
				<div className="sm:mt-[10px] sm:h-[156px] sm:w-[164px] md:mt-[13px] md:h-[174px] md:w-[213px] lg:mt-[19px] lg:h-[192px] lg:w-[271px] desktop:mt-[25px] desktop:h-[210px] desktop:w-[445px] ">
					<p className=" font-bold sm:text-[12px] md:text-[15px] lg:text-[20px] desktop:text-[35px]">
						{title}
					</p>
					<p className="sm:mt-[5px] sm:text-[10px] sm:leading-[12px] md:mt-[5px] md:text-[12px] md:leading-[15px] lg:mt-[8px] lg:text-[15px] lg:leading-[18px] desktop:mt-[10px] desktop:text-[18px] desktop:leading-[21px]">
						<span className=" font-semibold">{descriptionHead}</span>
						<br></br>
						{description}
					</p>
				</div>
			</div>
			{/* For Mobile */}
			<div className=" mt-[31px] block text-left sm:hidden md:hidden lg:hidden desktop:hidden ">
				<div className={`${imgClass} relative  `}>
					<ImageWithErrorHandler src={imgUrl} alt="" fill={true} />
				</div>
				<div className="mt-[10px] h-[101px] w-[250px]  ">
					<p className=" text-[12px] font-bold ">{title}</p>
					<p className="mt-[5px] text-[10px] leading-[12px] ">
						<span className=" font-semibold">{descriptionHead}</span>
						<br></br>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default KeyAdvantageComponent;
