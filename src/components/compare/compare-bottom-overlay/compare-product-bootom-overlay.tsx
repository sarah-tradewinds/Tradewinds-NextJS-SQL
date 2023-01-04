// Third party packages
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp
} from 'react-icons/md';

// components
import Button from '../../common/form/button';

interface CompareProductBottomOverlayProps {
	isOpen: boolean;
	onClose: () => any;
}

const CompareProductBottomOverlay: React.FC<
	CompareProductBottomOverlayProps
> = (props) => {
	const { children, isOpen, onClose } = props;

	let overlayClassName = `fixed bottom-0 left-0 right-0 z-[5000000000] bg-black/60 transform transition-all duration-500`;
	if (!isOpen) {
		overlayClassName = `${overlayClassName} translate-y-full`;
	}
	if (isOpen) {
		overlayClassName = `${overlayClassName} translate-y-0`;
	}

	return (
		<div className={overlayClassName}>
			<div className="relative">
				{/* Show and Hide compare container */}
				<div className="absolute -top-10 left-1/2 z-[5000000000] flex w-[245px] -translate-x-1/2 justify-center rounded-tl rounded-tr bg-black/60 text-white">
					<Button onClick={onClose}>
						{isOpen ? (
							<MdOutlineKeyboardArrowDown className="text-[24px] " />
						) : (
							<MdOutlineKeyboardArrowUp className="text-[24px] " />
						)}
					</Button>
				</div>

				{/* Compare product list */}
				<div>{children}</div>
			</div>
		</div>
	);
}; // End of CompareProductBottomOverlay component

export default CompareProductBottomOverlay;
