import { Modal } from 'components/common/modal/modal';
import { useAuthStore } from 'store/auth';

interface Props {}

function ProductSort(props: Props) {
	const {} = props;
	const { isProductSort, setIsProductSort } = useAuthStore();
	const pClass = ' cursor-pointer border-b border-black/50';
	return (
		<Modal
			open={isProductSort}
			// className="top-14  !z-[51000] transform md:top-40  md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			// className="top-14  !z-[51000] transform md:top-40  md:mx-20 lg:left-1/2 lg:top-1/2 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
			className=" h-[130px] w-[200px] space-y-2 border border-black/50 bg-white px-[20px]"
			// overlayClassName="!z-[51000]"
			onClose={setIsProductSort}
		>
			<p className={`${pClass}`}>Price: Low to High</p>
			<p className={`${pClass}`}>Price: High to Low</p>
			<p className={`${pClass}`}>MOQ: Low to High</p>
			<p className=" cursor-pointer">MOQ: High to Low</p>
		</Modal>
	);
}

export default ProductSort;
