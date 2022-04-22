// Third party packages
import { AiOutlinePlus } from 'react-icons/ai';

// data
import Collapse from 'components/website/common/collapse';

const CategoriesFilter: React.FC = (props) => {
	return (
		<div>
			<Collapse
				contentClassName="ml-0 py-2 px-1"
				leading={<AiOutlinePlus />}
				title={
					<span className="text-[15px] font-semibold">Agriculture</span>
				}
			>
				<div className="ml-4">
					<Collapse
						contentClassName="ml-0 py-2 px-1"
						leading={<AiOutlinePlus />}
						title={
							<span className=" text-[15px] font-semibold">
								Agriculture Equipment
							</span>
						}
					>
						<div className="ml-4">
							<Collapse
								contentClassName="ml-0 py-2 px-1"
								leading={<AiOutlinePlus />}
								title={
									<span className="text-[15px] font-semibold">
										Agricultural Greenhouses
									</span>
								}
							></Collapse>
						</div>
					</Collapse>
				</div>
			</Collapse>
			<Collapse
				contentClassName="ml-0 py-2 px-1"
				leading={<AiOutlinePlus />}
				title="Agriculture"
			>
				<div className="ml-4">
					<Collapse
						contentClassName="ml-0 py-2 px-1"
						leading={<AiOutlinePlus />}
						title="Equipment"
					>
						<div className="ml-4">
							<Collapse
								contentClassName="ml-0 py-2 px-1"
								leading={<AiOutlinePlus />}
								title="Agriculture"
							></Collapse>
						</div>
					</Collapse>
				</div>
			</Collapse>
			<Collapse
				contentClassName="ml-0 py-2 px-1"
				leading={<AiOutlinePlus />}
				title="Agriculture"
			>
				<div className="ml-4">
					<Collapse
						contentClassName="ml-0 py-2 px-1"
						leading={<AiOutlinePlus />}
						title="Equipment"
					>
						<div className="ml-4">
							<Collapse
								contentClassName="ml-0 py-2 px-1"
								leading={<AiOutlinePlus />}
								title="Agriculture"
							></Collapse>
						</div>
					</Collapse>
				</div>
			</Collapse>
			<Collapse
				contentClassName="ml-0 py-2 px-1"
				leading={<AiOutlinePlus />}
				title="Agriculture"
			>
				<div className="ml-4">
					<Collapse
						contentClassName="ml-0 py-2 px-1"
						leading={<AiOutlinePlus />}
						title="Equipment"
					>
						<div className="ml-4">
							<Collapse
								contentClassName="ml-0 py-2 px-1"
								leading={<AiOutlinePlus />}
								title="Agriculture"
							></Collapse>
						</div>
					</Collapse>
				</div>
			</Collapse>
			<Collapse
				contentClassName="ml-0 py-2 px-1"
				leading={<AiOutlinePlus />}
				title="Agriculture"
			>
				<div className="ml-4">
					<Collapse
						contentClassName="ml-0 py-2 px-1"
						leading={<AiOutlinePlus />}
						title="Equipment"
					>
						<div className="ml-4">
							<Collapse
								contentClassName="ml-0 py-2 px-1"
								leading={<AiOutlinePlus />}
								title="Agriculture"
							></Collapse>
						</div>
					</Collapse>
				</div>
			</Collapse>
			<Collapse
				contentClassName="ml-0 py-2 px-1"
				leading={<AiOutlinePlus />}
				title="Agriculture"
			>
				<div className="ml-4">
					<Collapse
						contentClassName="ml-0 py-2 px-1"
						leading={<AiOutlinePlus />}
						title="Equipment"
					>
						<div className="ml-4">
							<Collapse
								contentClassName="ml-0 py-2 px-1"
								leading={<AiOutlinePlus />}
								title="Agriculture"
							></Collapse>
						</div>
					</Collapse>
				</div>
			</Collapse>
		</div>
	);
};

export default CategoriesFilter;
