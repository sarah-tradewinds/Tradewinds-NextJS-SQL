interface SpecsProps {
	title: string;
	specsList: {
		name: string;
		attributes: string[];
	}[];
}

const Specs: React.FC<SpecsProps> = ({ title, specsList }) => {
	return (
		<div>
			<p className="mb-2 text-[21px] font-semibold text-primary-main">
				{title}
			</p>

			<div>
				{specsList.map(({ name, attributes }, index) => {
					const isLastElement = specsList.length - 1 === index;

					return (
						<>
							<div className="bg-gray/20 py-2 px-4 text-[15px] font-bold text-black/80">
								{name}
							</div>
							<ul
								className={`flex justify-between  divide-gray/40 text-[15px] ${
									isLastElement ? '' : 'divide-x'
								}`}
							>
								{attributes.map((attribute) => (
									<li
										key={attribute}
										className="w-full py-2 text-center"
									>
										{attribute}
									</li>
								))}
							</ul>
						</>
					);
				})}
			</div>
		</div>
	);
}; // End of Specs

export default Specs;
