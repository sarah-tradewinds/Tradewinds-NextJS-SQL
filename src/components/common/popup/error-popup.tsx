import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ImageWithErrorHandler from '../elements/image-with-error-handler';
import Button from '../form/button';

interface ErrorPopupProps {
	title: string;
	titleClassName?: string;
	description: string;
	isOpen?: boolean;
	actions?: React.ReactNode[];
	onClose: () => any;
}

const ErrorPopup: React.FC<ErrorPopupProps> = (props) => {
	const {
		title,
		titleClassName,
		description,
		isOpen,
		actions,
		onClose
	} = props;

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
								<Dialog.Panel className="h-[156px] w-[611px] transform overflow-hidden rounded-2xl bg-white  shadow-xl transition-all">
									<div className="ml-[158px] mt-[17px] md:ml-[292px] lg:ml-[292px]">
										<ImageWithErrorHandler
											src="/static/icons/alert_icon.png"
											alt="Empty Cart"
											width={27}
											height={27}
										/>
									</div>
									<Dialog.Title
										as="h3"
										className={`text-lg font-medium leading-6 text-error ${titleClassName}`}
									>
										{title}
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-sm text-gray/80">
											{description}
										</p>
									</div>

									<div className="mt-4">
										{actions?.length === 0 ? (
											<Button
												onClick={onClose}
												className="!bg-accent-primary-main"
											>
												Okay
											</Button>
										) : (
											actions
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}; // End of ErrorPopup

export default ErrorPopup;
