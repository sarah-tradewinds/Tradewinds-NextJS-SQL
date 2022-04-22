import Image from 'next/image';

const AdsBanner: React.FC = () => {
	return (
		<div className="relative hidden h-[275px] w-full md:block lg:h-[375px]">
			<Image src="/Ads-Section.png" alt="" layout="fill" />
		</div>
	);
};

export default AdsBanner;
