import Button from '../common/form/button';

interface AddressTileProps {
	id: string;
	type: string;
	name: string;
	streetAddress: string;
	locality: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	phoneNumber: string;
	isSelected?: boolean;
	containerClassName?: string;
	onChange: (currentState: boolean) => any;
}

const AddressTile: React.FC<AddressTileProps> = (props) => {
	const {
		id,
		type,
		name,
		streetAddress,
		locality,
		city,
		state,
		zipCode,
		country,
		phoneNumber,
		isSelected,
		containerClassName,
		onChange
	} = props;

	return (
		<div
			className={`flex cursor-pointer flex-col justify-between rounded-md bg-white px-4 pb-4 pt-2 shadow-md ${
				isSelected
					? 'outline outline-accent-primary-main'
					: 'border border-gray/20'
			} ${containerClassName}`}
			// onClick={() => onChange(isSelected || false)}
		>
			<div>
				<div className="flex justify-end">
					<input
						type="radio"
						id={id}
						name={type}
						checked={isSelected}
						className="h-[24px] w-[24px] cursor-pointer"
						onChange={() => onChange(isSelected || false)}
					/>
				</div>
				<ul className="text-sm font-medium">
					<li className="font-semibold">{name}</li>
					<li>{streetAddress}</li>
					<li>{locality}</li>
					<li className="uppercase">{`${city}, ${state} ${zipCode}`}</li>
					<li>{country}</li>
					<li>Phone number: {phoneNumber}</li>
				</ul>
			</div>

			<div className="mt-2 flex justify-between">
				<Button className="!p-0 !text-primary-main">EDIT</Button>
				<Button className="!p-0 !text-error">REMOVE</Button>
			</div>
		</div>
	);
};

export default AddressTile;
