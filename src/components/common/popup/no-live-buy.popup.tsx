import { Fragment, useState } from 'react';

// Third party packages
import { Dialog, Transition } from '@headlessui/react';

// components
import { MinusCircleIcon } from '@heroicons/react/20/solid';
import ImageWithErrorHandler from '../elements/image-with-error-handler';

interface NoLiveBuyPopupProps {
	open?: boolean;
	className?: string;
	onClose: () => any;
	onSendClick?: (message: string) => any;
}

const NoLiveBuyPopup: React.FC<NoLiveBuyPopupProps> = (props) => {
	const { open, className, onClose } = props;
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

					<div
						className={`inset-0s fixed left-1/2 z-20 -translate-x-1/2 overflow-y-auto ${className}`}
					>
						<div className="flex h-[301px] min-h-full w-[248px] items-center justify-center text-center sm:h-[329.04px] sm:w-[445px] lg:h-[364.54px] lg:w-[493px] xl:h-[437px] xl:w-[591px]">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="h-full w-full transform overflow-hidden bg-white px-2 shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-gray-900 text-right text-lg font-medium leading-6"
									>
										<button onClick={onClose} className="outline-none">
											<MinusCircleIcon className="h-[13px] w-[13px] text-gray sm:h-[14.98px] sm:w-[14.05px] lg:h-[16.6px] lg:w-[15.56px] xl:h-[19.9px] xl:w-[18.66px]" />
										</button>
									</Dialog.Title>

									<div className="mt-2 flex flex-col items-center space-y-[26px] pl-[27px] pr-[21px] sm:space-y-[11.35px]">
										<div className="flex flex-col items-center ">
											<div className="relative h-[49.34px] w-[49.91px] sm:h-[53.93px] sm:w-[53.46px] lg:h-[59.75px] lg:w-[59.23px] xl:h-[71.63px] xl:w-[71px]">
												<ImageWithErrorHandler
													src="/images/no-live-buy-welcome.svg"
													alt="no live buy welcome"
													fill={true}
												/>
											</div>
											<p className="text-[18.82px] font-semibold leading-[22.95px] text-primary-main sm:mt-[6.3px] lg:text-[20.85px] lg:leading-[25.42px] xl:mt-[8.37px] xl:text-[25px] xl:leading-[30.48px]">
												Welcome!
											</p>
											<p className="mt-[5px] text-center text-[12.05px] leading-[14.69px] text-primary-main sm:mt-[16.69px] lg:text-[13.35px] lg:leading-[16.27px] xl:mt-[23px] xl:text-[16px] xl:leading-[19.5px]">
												The{' '}
												<span className="font-semibold">live buy</span>{' '}
												feature is currently{' '}
												<span className="font-semibold">
													not available.
												</span>
											</p>
										</div>

										<div className="text-center text-[9.04px] leading-[11.01px] text-primary-main sm:w-[221.37px] lg:w-[245.25px] lg:text-[10.01px] lg:leading-[12.2px] xl:w-[294px] xl:text-[12px] xl:leading-[14.63px]">
											<p>
												TWMP is currently onboarding more sells to offer
												you the best experience possible.
											</p>
											<p className="mt-4">
												You will receive and email soon letting you know
												live buy is active.
											</p>
											<div className="mt-6">
												<p className="font-semibold">Thank you</p>
												<p>for your patients your TradeWinds team.</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}; // End of NoLiveBuyPopup

export default NoLiveBuyPopup;
