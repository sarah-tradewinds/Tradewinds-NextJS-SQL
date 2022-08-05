interface AddressTileProps {
	id: string;
	name: string;
	address: string;
	isSelected?: boolean;
	onChange: (currentState: boolean) => any;
}

const AddressTile: React.FC<AddressTileProps> = (props) => {
	const { id, name, address, isSelected, onChange } = props;
	return (
		<div
			className={`cursor-pointer rounded-md bg-white px-4 pb-4 pt-2 shadow-md ${
				isSelected
					? 'outline outline-accent-primary-main'
					: 'border border-gray/20'
			}`}
			onClick={() => onChange(isSelected || false)}
		>
			<div className="flex justify-end">
				<input
					type="radio"
					id={id}
					name={name}
					checked={isSelected}
					className="h-[24px] w-[24px] cursor-pointer"
				/>
			</div>
			<address>{address}</address>
		</div>
	);
};

export default AddressTile;
