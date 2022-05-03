// Third party packages
import { AiOutlinePlus } from 'react-icons/ai';

// data
import { Disclosure } from '@headlessui/react';
import { categories } from 'data/home/mega-menu';

const CategoriesFilter: React.FC = (props) => {
	return (
		<div className="mt-4 space-y-4">
			{categories.map((category) => {
				return (
					<Disclosure key={category.name}>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex items-center space-x-2">
									<AiOutlinePlus />
									<span className="text-[15px] font-semibold">
										{category.name}
									</span>
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 px-4 text-sm">
									<Disclosure>
										{({ open }) => (
											<>
												<Disclosure.Button className="flex items-center space-x-2">
													<AiOutlinePlus />
													<span className="text-[15px] font-semibold">
														Agriculture
													</span>
												</Disclosure.Button>
												<Disclosure.Panel className="ml-5 mt-4 text-[15px] font-semibold">
													Agriculture
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				);
			})}
		</div>
	);
};

export default CategoriesFilter;
