import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsTab: React.FC<{
	productDetailItems: [];
	certifications: [];
	shipping: any;
	productDetailsContainerClassName?: string;
	certificationContainerClassName?: string;
	dimensionContainerClassName?: string;
}> = ({
	productDetailItems,
	certifications,
	shipping,
	productDetailsContainerClassName,
	certificationContainerClassName,
	dimensionContainerClassName
}) => {
	const { locale } = useRouter();
	const { t } = useTranslation();

	const isShippingDetailsAvailable =
		!shipping?.package_length &&
		!shipping?.package_width &&
		!shipping?.package_height &&
		!shipping?.package_weight
			? false
			: true;

	return (
		<div className="space-y-8 bg-white p-4 md:space-y-16 md:p-8">
			<div>
				<p className="border-b-2 border-t-2 border-gray/40 text-[18px] font-semibold text-gray md:border-t-0 md:text-[21px]">
					{t('common:product_details')}
				</p>

				{/* Product details body */}
				{productDetailItems.length > 0 ? (
					<div
						className={`flex flex-col p-4 md:flex-row md:justify-between ${productDetailsContainerClassName}`}
					>
						<div className="space-y-2">
							{productDetailItems?.map((productDetailItem: any) => {
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
					</div>
				) : (
					<p className="mt-8 text-xl">
						Product Details is not available
					</p>
				)}
			</div>

			{/* Product certification  Details */}
			<div className={certificationContainerClassName}>
				<p className="border-b-2 border-gray/40 text-[15px] font-semibold text-gray md:text-[21px]">
					{t('common:product_certifications')}
				</p>
				{certifications.length > 0 ? (
					<div className="flex justify-between p-4">
						<div className="space-y-2">
							{certifications?.map((certificate: any) => (
								<p
									key={certificate?.name}
									className="flex items-center justify-between space-x-2 text-[15px] text-gray md:text-[18px]"
								>
									<span className="font-semibold capitalize">
										{certificate?.name}:
									</span>
									<span className="text-sm font-semibold text-accent-primary-main hover:underline">
										<a
											href={certificate?.certificate?.url}
											target="_blank"
											rel="noreferrer"
										>
											View
										</a>
									</span>
								</p>
							))}
						</div>
					</div>
				) : (
					<p className="mt-8 text-xl">
						Product Certifications is not available
					</p>
				)}
			</div>

			{/* Shipping Details */}
			<div className={dimensionContainerClassName}>
				<p className="border-b-2 border-gray/40 text-[15px] font-semibold text-gray md:text-[21px]">
					{t('common:shipping_details')}
				</p>
				{isShippingDetailsAvailable ? (
					<div className="flex justify-between p-4">
						<div className="space-y-2">
							{shipping?.package_length && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:package')} {t('common:length')}:
									</span>
									<span>{shipping?.package_length}</span>
								</p>
							)}
							{shipping?.package_width && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:package')} {t('common:width')}:
									</span>
									<span>{shipping?.package_width}</span>
								</p>
							)}
							{shipping?.package_height && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:package')} {t('common:height')}:
									</span>
									<span>{shipping?.package_height}</span>
								</p>
							)}
							{shipping?.package_weight && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:package')} {t('common:weight')}:
									</span>
									<span>{shipping?.package_weight}</span>
								</p>
							)}
						</div>
					</div>
				) : (
					<p className="mt-8 text-xl">
						Shipping Details is not available
					</p>
				)}
			</div>
		</div>
	);
};

export default ProductDetailsTab;