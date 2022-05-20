// components
import SpinnerIcon from './spinner-icon';

interface LoaderProps {
	isOpen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isOpen }) => {
	// useEffect(() => {
	// 	if (window && isOpen) {
	// 		addEventListener('scroll', () => {});
	// 		// window.onscroll = function () {
	// 		// 	window.scrollTo(0, 0);
	// 		// };
	// 	}

	// 	// if (!isOpen) {
	// 	// 	removeEventListener('scroll', () => {});
	// 	// }

	// 	() => removeEventListener('scroll', () => {});
	// }, [isOpen]);

	console.log('isOpen =', isOpen);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[50000000000000000] bg-black/40">
			<div className="z-[50000000000000000]s flex h-full w-full items-center justify-center">
				<div className="flex h-72 w-72 items-center justify-center rounded-md bg-white p-8 shadow-md">
					<SpinnerIcon />
				</div>
			</div>
		</div>
	);
}; // End of Loader function

export default Loader;
