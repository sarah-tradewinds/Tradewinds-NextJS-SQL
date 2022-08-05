interface ModalProps {
	open: boolean;
	className?: string;
	overlayClassName?: string;
	onClose: () => any;
}

export const Modal: React.FC<ModalProps> = (props) => {
	const { children, open, onClose, className, overlayClassName } =
		props;

	const modalClassName = `fixed z-[3001] ${className}`;

	if (!open) {
		return null;
	}

	return (
		<>
			<Overlay
				open={open}
				onClick={onClose}
				className={`z-[2000] bg-white/80 ${overlayClassName}`}
			/>
			<div className={modalClassName}>{children}</div>
		</>
	);
};

export const Overlay: React.FC<{
	open: boolean;
	className?: string;
	onClick?: () => any;
}> = (props) => {
	const { children, className, open, onClick } = props;

	let overlayClassName = `fixed top-0 bottom-0 left-0 right-0 ${className}`;

	if (!open) {
		return null;
	}

	return (
		<div className={overlayClassName} onClick={onClick}>
			{children}
		</div>
	);
};

export default Overlay;
