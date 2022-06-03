// components
import SpinnerIcon from './spinner-icon';

interface LoaderProps {
	isOpen?: boolean;
	text?: string;
}

const Loader: React.FC<LoaderProps> = ({ isOpen, text }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[50000000000000000] bg-black/40">
			<div className="z-[50000000000000000]s flex h-full w-full items-center justify-center">
				<div className="flex flex-col items-center justify-center rounded-md bg-white p-8 shadow-md">
					<div className="flex h-72 w-72 items-center justify-center">
						<SpinnerIcon />
					</div>
					<p className="font-semibold tracking-wider">{text}</p>
				</div>
			</div>
		</div>
	);
}; // End of Loader function

export default Loader;
