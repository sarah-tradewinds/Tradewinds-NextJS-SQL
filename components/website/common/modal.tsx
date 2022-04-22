import { Dialog } from '@headlessui/react';
import { useState } from 'react';

function Modal(props: any) {
	let [isOpen, setIsOpen] = useState(true);

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="fixed inset-0 z-10 overflow-y-auto"
		>
			<div className="flex min-h-screen items-center justify-center">
				<Dialog.Overlay className="fixed inset-0 bg-white opacity-80" />
				<div className="relative mt-24">{props.children}</div>
			</div>
		</Dialog>
	);
}

export default Modal;
