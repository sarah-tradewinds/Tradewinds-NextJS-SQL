interface PointProps {
	content: string;
}

const Point: React.FC<PointProps> = (props) => {
	const { content } = props;
	return (
		<div>
			<div className="flexitems-center h-[10px] w-[20px] justify-center  ">
				<div className="rotate-45 transform pr-[40px] text-4xl sm:pr-[40px] md:pr-[40px]  lg:pr-[40px] desktop:pr-[30px]">
					.
				</div>
			</div>
			<p className=" ml-[10px] leading-[22px] desktop:text-[18px] ">
				{' '}
				{content}
			</p>
		</div>
	);
};

export default Point;
