import { Fragment } from 'react';

// Third party packages
import { Dialog, Transition } from '@headlessui/react';

// components
import Button from '../form/button';

interface VendorMessageInputProps {
	isOpen?: boolean;
	onClose: () => any;
}

const VendorMessageInput: React.FC<VendorMessageInputProps> = ({
	isOpen,
	onClose
}) => {
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
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
						<div className="fixed inset-0 bg-black bg-opacity-25" />
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
								<div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
									<div className="flex justify-end p-2">close</div>
									<div className="px-6 pb-4">
										<div className="border-b border-gray/25 pb-2">
											<span className="text-sm text-gray/40">
												From:{' '}
											</span>
											<input className="outline-none focus:border-b" />
										</div>
										<div className="mt-2">
											<textarea className="h-[180px] w-full resize-none border-gray/40 outline-none focus:border-b"></textarea>
										</div>
										<div className="flex justify-end">
											<Button variant="buyer">Send Message</Button>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default VendorMessageInput;
