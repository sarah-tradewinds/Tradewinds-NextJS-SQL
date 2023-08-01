import Image from 'next/image';
import { Fragment, useState } from 'react';

// Third party packages
import { Dialog, Transition } from '@headlessui/react';
import useSWR from 'swr';

// components
import Button from 'components/common/form/button';
import Input from 'components/common/form/input';

// Lib
import { EnvelopeIcon, UserIcon } from '@heroicons/react/20/solid';
import { CountryDropdown } from 'components/common/auth/signup';
import { getHomeCountries } from 'lib/home.lib';
import { axiosInstance } from 'utils/axios-instance.utils';

const ContactUsPopup = (props: {
	isOpen?: boolean;
	onClose: () => void;
}) => {
	const { isOpen, onClose } = props;
	const defaultData = {
		first_name: '',
		last_name: '',
		email: '',
		country: '',
		message: ''
	};
	const [isSending, setIsSending] = useState(false);
	const [isMessageSent, setIsMessageSent] = useState(false);
	const [contactInputData, setContactInputData] = useState<{
		[key: string]: string;
	}>(defaultData);

	// Fetching Countries
	const { data: countries, isValidating: isCountriesValidating } =
		useSWR('/region_country/all', getHomeCountries);

	const onChangeHandler = (event: any) => {
		const { name, value, type } = event?.currentTarget;

		setContactInputData((prevState) => ({
			...prevState,
			[name]: value
		}));
	}; // End of onChangeHandler

	const sendContact = async (e: any) => {
		e.preventDefault();
		if (isSending) {
			return;
		}

		try {
			setIsSending(true);
			setIsMessageSent(false);
			await axiosInstance.post('/contact-request', contactInputData);
			setIsMessageSent(true);
			setContactInputData(defaultData);
		} catch (error) {
		} finally {
			setIsSending(false);
		}
	}; // End of sendContact

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-[50000]" onClose={onClose}>
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
					<div className="flex min-h-full items-center justify-center text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-gradient-to-r from-[#37B34A] via-cyan to-primary-main  text-left align-middle shadow-xl transition-all">
								<div className="relative mb-8 mt-8 h-20 md:w-96">
									<Image
										src="/images/tradewinds-horizontal-logo.svg"
										alt="tradewinds logo"
										fill={true}
									/>
								</div>

								{isMessageSent && (
									<div className="mb-8 flex flex-col items-center space-y-8">
										<Dialog.Title
											as="h3"
											className="text-gray-900 text-center text-lg font-medium leading-6 text-white"
										>
											Thank you, we will contact you back shortly
										</Dialog.Title>
										<Button onClick={onClose} className="bg-black">
											Close
										</Button>
									</div>
								)}

								{!isMessageSent && (
									<div className="flex justify-center">
										<form
											onSubmit={sendContact}
											className="mx-4 mt-4 space-y-4 md:mb-8"
										>
											<Input
												name="first_name"
												placeholder="First Name"
												className="w-full border-transparent shadow hover:shadow-md"
												icon={
													<UserIcon className="h-5 w-5 text-black" />
												}
												required={true}
												onChange={onChangeHandler}
											/>
											<Input
												name="last_name"
												placeholder="Last Name"
												className="w-full border-transparent shadow hover:shadow-md"
												icon={
													<UserIcon className="h-5 w-5 text-black" />
												}
												required={true}
												onChange={onChangeHandler}
											/>
											<Input
												type="email"
												name="email"
												placeholder="Email"
												className="w-full border-transparent shadow hover:shadow-md"
												icon={
													<EnvelopeIcon className="h-5 w-5 text-black" />
												}
												required={true}
												onChange={onChangeHandler}
											/>
											<CountryDropdown
												inputClassName="h-10"
												inputContainerClassName="bg-white !border-transparent shadow hover:shadow-md"
												onSelect={(selectedCountry) => {
													setContactInputData((prevState) => ({
														...prevState,
														country: selectedCountry?.name?.en || ''
													}));
												}}
											/>
											<textarea
												name="message"
												placeholder="Subject Body"
												className="min-h-[160px] w-full rounded-md p-2"
												required={true}
												onChange={onChangeHandler}
											/>
											<Button
												type="submit"
												variant="buyer"
												className="w-full shadow hover:shadow-md"
											>
												{isSending ? 'Loading ...' : 'Contact Us'}
											</Button>

											<Button onClick={onClose} className="w-full">
												Cancel
											</Button>
										</form>
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}; // End of ContactUsPopup

export default ContactUsPopup;
