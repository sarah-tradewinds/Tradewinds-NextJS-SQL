// Third party packages

// components

// stores
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Button from 'components/website/common/form/button';
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

	let rfqCardContainerClassName = `${
		size === 'xl'
			? 'space-y-8 lg:rounded-md bg-secondary p-4 lg:space-y-12'
			: 'flex items-center space-x-16 lg:rounded-md bg-secondary p-8 lg:space-x-24'
	}`;
	let imageClassName = '';

	if (size === 'xs') {
		rfqCardContainerClassName = `${rfqCardContainerClassName} lg:h-[140px] h-[180px]`;
		imageClassName = `${imageClassName} lg:h-[87px] lg:w-[81px] h-[107px] w-[101px]`;
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
			<div
				className={`${
					size === 'xl'
						? 'lg:mt-2 lg:flex lg:place-items-end lg:space-x-2'
						: ''
				}`}
			>
				<div className={`relative ${imageClassName}`}>
					<ImageWithErrorHandler
						src="/static/rfq-box.png"
						alt="rfq box"
						fill={true}
					/>
				</div>
				<div
					className={` ${
						size === 'xl'
							? 'pb-4 text-[16px] font-semibold text-white lg:text-[25px]'
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
					className={`pb-4 text-[16px] font-semibold text-white lg:text-[25px] ${
						size === 'lg' ? 'border-b-2' : ''
					}`}
				>
					<p className={`${size === 'xl' ? 'hidden' : 'block'}`}>
						Submit an RFQ for anything!
					</p>
					<ul
						className={`list-disc text-[32px] lg:text-[20px] ${
							size === 'xs'
								? 'grid grid-cols-2 text-[13px] font-normal'
								: 'ml-8 text-[12px]'
						} ${
							size === 'xl'
								? 'grid grid-cols-1 font-normal lg:text-[22px]'
								: ''
						}`}
					>
						<li>One request</li>
						<li>Receive multiple quotes</li>
						<li>Responded</li>
						<li>Close the deal</li>
					</ul>
				</div>

				<div
					className={`flex justify-center lg:justify-start ${
						size === 'lg' ? 'mt-8 ' : ' mt-2'
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
								? 'flex items-center bg-white !px-2 !text-secondary lg:max-h-6'
								: 'flex items-center bg-white !px-2 !text-secondary'
						} ${
							size === 'xl' ? 'lg:flex lg:w-full lg:justify-center' : ''
						}`}
					>
						<div className="relative h-[31px] w-[36px]">
							<ImageWithErrorHandler
								src="/static/rfq-orange.png"
								alt="rfq orange icon"
								fill={true}
							/>
						</div>
						<span className="px-2">{t('common:submit_rfq')}</span>
					</Button>
				</div>
			</div>
		</div>
	);
}; // End of MiniRFQCard

export default MiniRFQCard;
