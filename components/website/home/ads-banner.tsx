interface AdsBannerProps {
	iframe_code: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({ iframe_code }) => {
	return (
		<div
			className="relative hidden h-[275px] w-full overflow-hidden md:block  lg:h-[375px]"
			dangerouslySetInnerHTML={{
				__html: iframe_code
			}}
		></div>
	);
};

export default AdsBanner;
