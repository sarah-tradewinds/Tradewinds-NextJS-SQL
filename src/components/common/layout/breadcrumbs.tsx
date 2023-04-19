import Link from 'next/link';
import { ReactNode } from 'react';

// Third party packages

// import Link from 'next/link';

// const BreadCrumbs: React.FC = () => {
// 	return (
// 		<div>
// 			<section className="bg-blue-100 py-5 sm:py-7">
// 				<div className="max-w-screen-xl container mx-auto px-4">
// 					<ol className="text-gray-600 inline-flex flex-wrap items-center space-x-1 md:space-x-3">
// 						<li className="inline-flex items-center">
// 							<Link
// 								href=""
// 								className="text-gray-600 hover:text-blue-600"
// 							>
// 								Categories
// 							</Link>
// 						</li>
// 					</ol>
// 				</div>
// 			</section>
// 		</div>
// 	);
// };

// export default BreadCrumbs;

export type CrumbItem = {
	label: ReactNode; // e.g., Python
	path: string; // e.g., /development/programming-languages/python
};
export type BreadcrumbsProps = {
	items: CrumbItem[];
};
// ...omitted for brevity
// components/breadcrumbs/Breadcrumbs.ts
const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
	return (
		<div className="flex items-start gap-2">
			{items.map((crumb, i) => {
				const isLastItem = i === items.length - 1;
				if (!isLastItem) {
					return (
						<>
							<Link
								href={crumb.path}
								key={i}
								className="text-indigo-500 hover:text-indigo-400 hover:underline"
							>
								{crumb.label}
							</Link>
							{/* separator */}
							<span> / </span>
						</>
					);
				} else {
					return crumb.label;
				}
			})}
		</div>
	);
};
export default Breadcrumbs;
