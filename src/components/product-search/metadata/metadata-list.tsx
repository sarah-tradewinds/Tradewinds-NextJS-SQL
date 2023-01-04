import MetadataTile from './metadata-tile';

interface MetadataListProps {
	metadataList: any[];
	className?: string;
}

const MetadataList: React.FC<MetadataListProps> = (props) => {
	const { metadataList, className } = props;

	return (
		<div
			className={`grid grid-cols-3 gap-4 text-[12px] text-gray ${className}`}
		>
			{metadataList.map((metadata) => (
				<MetadataTile
					key={metadata.title}
					imageUrl={metadata.imageUrl}
					alt={metadata.title}
					title={metadata.title}
				/>
			))}
		</div>
	);
}; // End of MetadataList component

export default MetadataList;
