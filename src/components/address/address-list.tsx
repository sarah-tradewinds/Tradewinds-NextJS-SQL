import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';
import AddressTile from './address-tile';

interface AddressListProps {
	addresses: any[];
	onChange: (currentState: boolean, id: string) => any;
}

const AddressList: React.FC<AddressListProps> = (props) => {
	const { addresses, onChange } = props;

	const router = useRouter();

	return (
		<div className="xl:grid-cols-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{addresses?.map((address) => {
				const { isSelected } = address;
				console.log('address', address);

				return (
					<AddressTile
						key={address.id}
						id={address.id}
						type="address"
						name={getLocaleText(
							address?.first_name || {},
							router.locale
						)}
						streetAddress={getLocaleText(
							address?.address_line1 || {},
							router.locale
						)}
						locality=""
						city={getLocaleText(
							address?.edges?.city?.name || {},
							router.locale
						)}
						state={getLocaleText(
							address?.edges?.state?.name || {},
							router.locale
						)}
						zipCode={address?.postal_code?.toString() || ''}
						country={getLocaleText(
							address?.edges?.country?.name || {},
							router.locale
						)}
						phoneNumber={address?.phone}
						isSelected={isSelected}
						onChange={(currentState) =>
							onChange(currentState, address.id)
						}
					/>
				);
			})}
		</div>
	);
};

export default AddressList;
