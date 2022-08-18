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
		<div className="grid grid-cols-4 gap-8">
			{addresses?.map((address) => {
				const { isSelected } = address;
				return (
					<AddressTile
						key={address.id}
						id={address.id}
						name="address"
						address={getLocaleText(
							address?.address_line_1 || {},
							router.locale
						)}
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
