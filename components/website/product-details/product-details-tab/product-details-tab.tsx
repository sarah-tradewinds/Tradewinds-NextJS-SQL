import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsTab: React.FC<{
	productDetailItems: [];
	shipping: any;
}> = ({ productDetailItems, shipping }) => {
	const { locale } = useRouter();
	const { t } = useTranslation();

	return (
		<div className="space-y-8 bg-white p-4 md:space-y-16 md:p-8">
			<div>
				<p className="border-b-2 border-t-2 border-gray/40 text-[18px] font-semibold text-gray md:border-t-0 md:text-[21px]">
					{t('common:product_details')}
				</p>
				{/* Product details body */}
				<div className="flex flex-col p-4 md:flex-row md:justify-between">
					<div className="space-y-2">
						{productDetailItems.map((productDetailItem: any) => {
							const key = getLocaleText(
								productDetailItem.key || {},
								locale
							);
							const value = getLocaleText(
								productDetailItem.value || {},
								locale
							);
							return (
								<p
									key={key}
									className="flex justify-between  space-x-8 text-[15px] text-gray md:text-[18px]"
								>
									<span className="font-semibold">{key}: </span>
									<span>{value}</span>{' '}
								</p>
							);
						})}
					</div>

					{/* <div className="space-y-2">
						<p className="flex justify-between  space-x-8 text-[15px] text-gray md:text-[18px]">
							<span className="font-semibold">CERTIFICATION:</span>
							<span> CE / EU</span>
						</p>
						<p className="flex justify-between  space-x-8 text-[15px] text-gray md:text-[18px]">
							<span className="font-semibold">Variants:</span>
							<div>
								<span>Variants 1</span>
								<span>Variants 2</span>
								<span>Variants 3</span>
							</div>
						</p>
					</div> */}
				</div>
			</div>

			{/* Shipping Details */}
			<div>
				<p className="border-b-2 border-gray/40 text-[15px] font-semibold text-gray md:text-[21px]">
					{t('common:shipping_details')}
				</p>
				<div className="flex justify-between p-4">
					<div className="space-y-2">
						<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
							<span className="font-semibold">
								{t('common:package')} {t('common:length')}:
							</span>
							<span>{shipping?.package_length}</span>
						</p>
						<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
							<span className="font-semibold">
								{t('common:package')} {t('common:width')}:
							</span>
							<span>{shipping?.package_width}</span>
						</p>
						<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
							<span className="font-semibold">
								{t('common:package')} {t('common:height')}:
							</span>
							<span>{shipping?.package_height}</span>
						</p>
						<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
							<span className="font-semibold">
								{t('common:package')} {t('common:weight')}:
							</span>
							<span>{shipping?.package_weight}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsTab;
