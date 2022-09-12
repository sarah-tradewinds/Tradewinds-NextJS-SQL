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
		<div className="grid grid-cols-3 gap-8 lg:grid-cols-4">
			{addresses?.map((address) => {
				const { isSelected, zip, country } = address;

				return (
					<AddressTile
						key={address.id}
						id={address.id}
						type="address"
						name={address?.first_name}
						streetAddress={getLocaleText(
							address?.address_line_1 || {},
							router.locale
						)}
						locality=""
						city={getLocaleText(address?.city || {}, router.locale)}
						state={getLocaleText(address?.state || {}, router.locale)}
						zipCode={zip}
						country={country?.name}
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
