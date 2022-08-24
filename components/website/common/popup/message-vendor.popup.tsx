import { Fragment, useState } from 'react';

// Third party packages
import { Dialog, Transition } from '@headlessui/react';

// components
import Button from '../form/button';

interface MessageVendorPopupProps {
	open?: boolean;
	onClose: () => any;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
	onSendClick?: (message: string) => any;
}

const MessageVendorPopup: React.FC<MessageVendorPopupProps> = (
	props
) => {
	const { open, onClose, onChange, onSendClick } = props;
	const [message, setMessage] = useState('');

	return (
		<>
			<Transition appear show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-gray-900 text-lg font-medium leading-6"
									>
										Send Message To Vendor
									</Dialog.Title>

									<div className="mt-2">
										<textarea
											className="w-full resize-none overflow-hidden border-b border-gray/40 p-4 outline-none"
											placeholder="Type your message here..."
											rows={4}
											onChange={(e) => {
												onChange(e);
												setMessage(e.target.value || '');
											}}
										></textarea>
									</div>

									<div className="mt-4">
										<Button
											variant="buyer"
											onClick={() => {
												if (onSendClick) onSendClick(message);
											}}
										>
											Send
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}; // End of MessageVendorPopup

export default MessageVendorPopup;
