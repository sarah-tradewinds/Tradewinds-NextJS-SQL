// components
import Loading from '../loading/loading';

interface LoaderProps {
	isOpen?: boolean;
	text?: string;
}

const Loader: React.FC<LoaderProps> = ({ isOpen, text }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/80">
			<div className="z-50 flex h-full w-full items-center justify-center">
				<Loading />
			</div>
		</div>
	);
}; // End of Loader function

export default Loader;
