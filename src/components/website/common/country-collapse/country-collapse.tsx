import { useEffect, useState } from 'react';

// Third party packages
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

const CountryCollapse: React.FC<{
	leading?: any;
	title?: any;
	isOpen?: boolean;
	onClose?: () => any;
	containerClassName?: string;
	contentContainerClassName?: string;
	plusIcon?: any;
	minusIcon?: any;
}> = (props) => {
	const {
		isOpen,
		leading,
		title,
		children,
		onClose,
		containerClassName,
		contentContainerClassName,
		plusIcon,
		minusIcon
	} = props;

	const [isCountryCollapseOpen, setIsCountryCollapseOpen] =
		useState(isOpen);

	useEffect(() => {
		setIsCountryCollapseOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			<div
				className={`flex items-center bg-white px-2 ${containerClassName}`}
			>
				{/* Content */}
				<div
					className={`flex w-full items-center bg-white ${contentContainerClassName}`}
				>
					<p className=" text-[16px] font-semibold text-cyan">
						({leading})
					</p>

					<p className="text-[16px] font-semibold">{title}</p>
				</div>

				{/* actions */}
				<div
					onClick={() =>
						setIsCountryCollapseOpen((prevState) => !prevState)
					}
				>
					{isCountryCollapseOpen ? (
						<div>
							{minusIcon ? (
								minusIcon
							) : (
								<HiMinusCircle className="text-[32px] text-secondary" />
							)}
						</div>
					) : (
						<div>
							{plusIcon ? (
								plusIcon
							) : (
								<HiPlusCircle className="text-[32px] text-secondary" />
							)}
						</div>
					)}
				</div>
			</div>
			{isCountryCollapseOpen && <div>{children}</div>}
		</>
	);
}; // End of CountryCollapse component

export default CountryCollapse;
