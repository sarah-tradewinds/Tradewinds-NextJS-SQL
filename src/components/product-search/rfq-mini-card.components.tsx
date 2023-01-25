// Third party packages

// components

// stores
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth';

interface RFQCardProps {
	size?: 'xs' | 'sm' | 'lg' | 'xl';
}

const MiniRFQCard: React.FC<RFQCardProps> = (props) => {
	const { size } = props;

	const router = useRouter();
	const { t } = useTranslation();

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData
		})
	);

	let rfqCardContainerClassName = `bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] ${
		size === 'xl'
			? // ? 'space-y-8 lg:rounded-lg bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] p-4 lg:space-y-12'
			  'space-y-8 lg:rounded-lg p-4 md:h-[321px] lg:h-[475px] lg:space-y-12'
			: 'flex md:items-center md:space-x-6 space-x-4 lg:rounded-md bg-secondary py-2 md:p-8 lg:space-x-10'
	}`;
	let imageClassName = '';

	if (size === 'xs') {
		rfqCardContainerClassName = `${rfqCardContainerClassName} h-[125px] lg:h-[140px] md:h-[124.52px] lg:h-[113px] md:rounded-lg`;
		imageClassName = `${imageClassName} ml-2 mt-[22px] md:mt-0 w-[50.05px] h-[53.76px] lg:h-[87px] lg:w-[81px] md:w-[81px] md:h-[87px] h-[87px] w-[81px] md:h-[107px] md:w-[101px]`;
	} else if (size === 'sm') {
		rfqCardContainerClassName = `${rfqCardContainerClassName} h-[180px]`;
		imageClassName = `${imageClassName} h-[87px] w-[81px]`;
	} else if (size === 'xl') {
		rfqCardContainerClassName = `${rfqCardContainerClassName} h-[512px]`;
		imageClassName = `${imageClassName} lg:h-[104px] lg:w-[172px]`;
	} else {
		rfqCardContainerClassName = `${rfqCardContainerClassName} h-[312px] w-full`;
		imageClassName = `${imageClassName} h-[129px] w-[121px] lg:h-[184px] lg:w-[172px]`;
	}

	return (
		<div className={rfqCardContainerClassName}>
			{/* Image and heading */}
			<div
				className={`${
					size === 'xl'
						? 'lg:mt-2 lg:flex lg:place-items-end lg:space-x-2'
						: ''
				}`}
			>
				<div className={`relative  ${imageClassName}`}>
					<ImageWithErrorHandler
						src="/static/rfq-box.png"
						alt="rfq box"
						fill={true}
					/>
				</div>

				<div
					className={` ${
						size === 'xl'
							? 'pb-4 text-[16px] font-semibold leading-5 text-white lg:text-[25px]'
							: 'hidden'
					}`}
				>
					<p>Submit an RFQ for anything!</p>
				</div>
			</div>

			<div
				className={`${
					size === 'xs'
						? 'lg:flex lg:w-full lg:items-center lg:justify-between'
						: ''
				} ${size === 'xl' ? 'grid grid-cols-1 lg:space-y-12' : ''}`}
			>
				<div
					className={`pb-2 text-[16px] font-semibold leading-5 text-white md:pt-2 lg:text-[25px] lg:leading-[30px] ${
						size === 'lg' ? 'border-b-2' : ''
					}`}
				>
					<p className={`${size === 'xl' ? 'hidden' : 'block'}`}>
						Submit an RFQ for anything!s
					</p>

					<ul
						className={`list-disc text-[32px] lg:pl-4 lg:text-[21px] lg:leading-[26px] ${
							size === 'xs'
								? 'ml-3 grid grid-cols-1 text-[13px] font-normal md:grid-cols-12 md:text-[16px] md:leading-5 lg:grid-cols-2 lg:gap-x-24'
								: 'ml-8 text-[12px]'
						} ${
							size === 'xl'
								? 'grid grid-cols-1 font-normal lg:text-[22px]'
								: ''
						}`}
					>
						<li className="md:col-span-8 lg:col-span-1">One request</li>
						<li className="hidden md:col-span-4 md:list-item lg:col-span-1">
							Responded
						</li>
						<li className="md:col-span-8 lg:col-span-1">
							Receive multiple quotes
						</li>
						{/* <li className="hidden md:list-item lg:hidden">Responded</li> */}
						<li className="hidden md:col-span-4 md:list-item lg:col-span-1">
							Close the deal
						</li>
					</ul>
				</div>

				<div
					className={`flex md:justify-center lg:justify-start ${
						size === 'lg' ? 'mt-8 ' : ''
					}`}
				>
					<Button
						onClick={() => {
							if (!isAuth) {
								setIsLoginOpen();
							} else {
								router.push(
									`${generateBuyerDashboardUrl({
										redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
										action: BUYER_DASHBOARD_ACTIONS.create_rfq,
										access_key: customerData.access.token,
										refresh_key: customerData.refresh.token
									})}`
								);
							}
						}}
						className={`${
							size === 'xs'
								? 'flex !h-[29.74px] !w-[187px] items-center bg-white !px-2 !text-secondary md:!min-h-[29.74px] md:!w-[187px] md:!min-w-[187px] md:!px-0 md:!py-0 lg:!max-h-[39px] lg:!min-h-[39px] lg:!min-w-[245.2px] lg:!pl-2'
								: 'flex items-center bg-white !px-2 !text-secondary'
						} ${
							size === 'xl' ? 'lg:flex lg:w-full lg:justify-center' : ''
						}`}
					>
						<div className="relative h-[31px] w-[36px] md:h-[23.64px] md:w-[27.45px] lg:h-[31px] lg:w-[36px]">
							<ImageWithErrorHandler
								src="/static/rfq-orange.png"
								alt="rfq orange icon"
								fill={true}
							/>
						</div>
						<p className="px-2 md:pl-[14px] md:text-[16px] md:leading-5 lg:w-full lg:text-[21px] lg:leading-[26px]">
							{t('common:submit_rfq')}
						</p>
					</Button>
				</div>
			</div>
		</div>
	);
}; // End of MiniRFQCard

export default MiniRFQCard;
