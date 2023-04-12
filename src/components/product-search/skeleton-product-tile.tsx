import Skeleton from 'react-loading-skeleton';

const SkeletonProductTile: React.FC = () => {
	const metaDataSkeleton = (
		<div className="flex space-x-2">
			<Skeleton width={24} />
			<Skeleton width={160} />
		</div>
	);

	return (
		<div className="grid w-full grid-cols-12 overflow-hidden bg-white md:rounded-xl md:shadow-md lg:p-4">
			{/* Product Image Container */}
			<div className="col-span-2">
				<Skeleton height="100%" />
			</div>

			{/* Content */}
			<div className="col-span-7 pl-4">
				<Skeleton width="80%" />
				<Skeleton width="80%" />
				<div className="flex space-x-2">
					<Skeleton width={200} />
					<Skeleton width={200} />
				</div>
				<Skeleton width={200} />

				{/* Metadata for large screen*/}
				<div className="mt-2 grid grid-cols-3">
					{metaDataSkeleton}
					{metaDataSkeleton}
					{metaDataSkeleton}
					{metaDataSkeleton}
					{metaDataSkeleton}
					{metaDataSkeleton}
				</div>
			</div>
		</div>
	);
};

export default SkeletonProductTile;
