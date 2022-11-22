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
	size?: 'sm' | 'lg';
}

const RFQCard: React.FC<RFQCardProps> = (props) => {
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

	let rfqCardContainerClassName =
		'flex items-center space-x-16 rounded-md bg-secondary p-8 lg:space-x-24';
	let imageClassName = '';

	if (size === 'sm') {
		rfqCardContainerClassName = `${rfqCardContainerClassName} h-[204px]`;
		imageClassName = `${imageClassName} h-[87px] w-[81px]`;
	} else {
		rfqCardContainerClassName = `${rfqCardContainerClassName} h-[312px] w-full`;
		imageClassName = `${imageClassName} h-[129px] w-[121px] lg:h-[184px] lg:w-[172px]`;
	}

	return (
		<div className={rfqCardContainerClassName}>
			<div className={`relative ${imageClassName}`}>
				<ImageWithErrorHandler
					src="/static/rfq-box.png"
					alt="rfq box"
					fill={true}
				/>
			</div>

			<div>
				<div
					className={`pb-4 text-[16px] font-semibold text-white lg:text-[25px] ${
						size === 'lg' ? 'border-b-2' : ''
					}`}
				>
					<p>Submit an RFQ for anything!</p>
					<ul
						className={`list-disc lg:text-[25px] ${
							size === 'sm'
								? 'grid grid-cols-2 text-[16px] font-normal'
								: 'ml-8 text-[15px]'
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
						className="flex items-center bg-white !px-2 !text-secondary"
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
}; // End of RFQCard

export default RFQCard;
