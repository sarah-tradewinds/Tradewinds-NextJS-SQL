// Third party packages
import Skeleton from 'react-loading-skeleton';

// utils
import { generateListByCount } from 'utils/common.util';

interface SkeletonProps {
	count?: number;
	isLoading?: boolean;
	className?: string;
	containerClassName?: string;
}

export const ContentSkeleton: React.FC<SkeletonProps> = ({
	count = 10,
	isLoading = true,
	className,
	containerClassName
}) => {
	if (!isLoading) return null;
	return (
		<div className={containerClassName}>
			{generateListByCount(count).map((id) => (
				<Skeleton key={id} width="80%" className={className} />
			))}
		</div>
	);
}; // End of ContentSkeleton
