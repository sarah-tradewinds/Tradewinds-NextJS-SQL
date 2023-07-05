interface PointProps {
	content: string;
}

const Point: React.FC<PointProps> = (props) => {
	const { content } = props;
	return (
		<div>
			<div className="flexitems-center h-[10px] w-[20px] justify-center">
				<div className="rotate-45 transform text-4xl ">.</div>
			</div>
			<p className=" ml-[10px]  "> {content}</p>
		</div>
	);
};

export default Point;
