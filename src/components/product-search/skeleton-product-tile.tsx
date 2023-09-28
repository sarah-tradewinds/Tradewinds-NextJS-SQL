import Skeleton from 'react-loading-skeleton';

const SkeletonProductTile: React.FC = () => {
	const metaDataSkeleton = (
		<div className="flex space-x-1">
			<Skeleton className="w-2 sm:w-6" />
			<Skeleton className="w-10 sm:w-24" />
		</div>
	);

	return (
		<div className="grid w-full grid-cols-12 overflow-hidden rounded-md bg-white p-2 md:rounded-xl md:shadow-md lg:p-4">
			{/* Product Image Container */}
			<div className="col-span-4">
				<Skeleton height="120px" />
			</div>

			{/* Content */}
			<div className="col-span-8 mx-2">
				<div>
					<Skeleton className="h-3" />
					<Skeleton className="h-3" />
					<Skeleton className="h-3" />
				</div>

				{/* Metadata for large screen*/}
				<div className="mt-2 grid grid-cols-3 sm:gap-x-2">
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
