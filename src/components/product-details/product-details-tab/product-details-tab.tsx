import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsTab: React.FC<{
	product: any;
	productDetailItems: [];
	certifications: [];
	shipping: any;
	seoTitle?: string;
	seoDescription?: string;
	productDetailsContainerClassName?: string;
	certificationContainerClassName?: string;
	dimensionContainerClassName?: string;
}> = ({
	product,
	productDetailItems,
	certifications,
	shipping,
	seoTitle,
	seoDescription,
	productDetailsContainerClassName,
	certificationContainerClassName,
	dimensionContainerClassName
}) => {
	const { locale } = useRouter();
	const { t } = useTranslation();

	const {
		main_category,
		category,
		sub_category,
		specific_category,
		product_dimension
	} = product || {};

	const isProductDimensionAvailable =
		!product_dimension?.product_length &&
		!product_dimension?.product_width &&
		!product_dimension?.product_height &&
		!product_dimension?.product_weight
			? false
			: true;

	// const isShippingDetailsAvailable =
	// 	!shipping?.package_length &&
	// 	!shipping?.package_width &&
	// 	!shipping?.package_height &&
	// 	!shipping?.package_weight
	// 		? false
	// 		: true;

	return (
		<div className="space-y-8 bg-white p-4 md:space-y-8 md:p-8">
			{/* DESCRIPTIVE DETAILS */}
			<div>
				<p className="border-b-2 border-t-2 border-[#C4C4C4] pb-2 text-lg font-semibold leading-[22px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray">
					{t('DESCRIPTIVE DETAILS')}
				</p>

				{/* Product details body */}
				<div
					className={`space-y-8 md:p-4 ${productDetailsContainerClassName}`}
				>
					{/* <p className="mt-4 text-xl font-semibold text-gray">
						{seoTitle}
					</p> */}

					<p className="flex justify-between  space-x-8 text-[15px] text-gray md:text-[18px]">
						{seoDescription}
					</p>
				</div>
			</div>

			{/* product_details */}
			<div>
				<p className="border-b-2 border-t-2 border-[#C4C4C4] pb-2 text-lg font-semibold leading-[22px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray">
					{t('common:product_details')}
				</p>

				{/* Product details body */}
				{productDetailItems.length > 0 &&
				(productDetailItems as any)?.[0]?.key?.en ? (
					<div
						className={`flex flex-col md:flex-row md:justify-between md:p-4 ${productDetailsContainerClassName}`}
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
					<p className="mt-4 md:mt-8">
						Product Details is not available
					</p>
				)}
			</div>

			{/* PRODUCT INFORMATION */}
			<div>
				<p className="border-b-2 border-t-2 border-[#C4C4C4] pb-2 text-lg font-semibold leading-[22px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray">
					{t('PRODUCT INFORMATION')}
				</p>

				{/* Product information body */}
				<ul
					className={`space-y-8 md:p-4 ${productDetailsContainerClassName}`}
				>
					{/* IS ECO */}
					{product?.is_eco && (
						<li className="flex items-center">
							<span className="w-[200px] text-gray">ECO:</span>
							<Image
								src="/static/icons/eco-icon.png"
								alt="eco icon"
								width={40}
								height={40}
							/>
						</li>
					)}
					{/* Main Category */}
					<li className="flex items-center">
						<span className="w-[200px] text-gray">Main Category:</span>
						<span className="text-black">{main_category?.name}</span>
					</li>
					{/* Category */}
					{category?.name && (
						<li className="flex items-center">
							<span className="w-[200px] text-gray">Category:</span>
							<span className="text-black">{category?.name}</span>
						</li>
					)}
					{/* Sub Category */}
					{sub_category?.name && (
						<li className="flex items-center">
							<span className="w-[200px] text-gray">Sub Category:</span>
							<span className="text-black">{sub_category?.name}</span>
						</li>
					)}
					{/* Specific Category */}
					{specific_category?.name && (
						<li className="flex items-center">
							<span className="w-[200px] text-gray">
								Specific Category:
							</span>
							<span className="text-black">
								{specific_category?.name}
							</span>
						</li>
					)}
					{/* Certificates */}
					{(certifications as any)?.[0]?.name && (
						<li className="flex">
							<span className="w-[200px] text-gray">
								{t('common:product_certifications')}:
							</span>
							{(certifications as any)?.[0]?.name && (
								<div className="space-y-4">
									{certifications?.map((certificate: any) => (
										<div
											key={certificate?.name}
											className="flex items-center justify-between space-x-4 text-[15px] text-gray md:text-[18px]"
										>
											<span className="font-semibold capitalize">
												{certificate?.name}:
											</span>
											<div className="relative h-[30px] w-[162px]">
												<Image
													src="/tradewinds-horizontal-logo.png"
													alt=""
													fill={true}
												/>
											</div>
										</div>
									))}
								</div>
							)}
						</li>
					)}
				</ul>
			</div>

			{/* PRODUCT DIMENSIONS  */}
			<div className={dimensionContainerClassName}>
				<p className="border-b-2 border-[#C4C4C4] pb-1 text-lg font-semibold leading-[22px] text-gray md:text-[21px] md:uppercase md:leading-6">
					{t('PRODUCT DIMENSIONS')}
				</p>
				{isProductDimensionAvailable ? (
					<div className="flex justify-between md:p-4">
						<div className="space-y-2">
							{product_dimension?.product_length && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:length')}:
									</span>
									<span>{product_dimension?.product_length}</span>
								</p>
							)}
							{product_dimension?.product_width && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:width')}:
									</span>
									<span>{product_dimension?.product_width}</span>
								</p>
							)}
							{product_dimension?.product_height && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:height')}:
									</span>
									<span>{product_dimension?.product_height}</span>
								</p>
							)}
							{product_dimension?.product_weight && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:weight')}:
									</span>
									<span>{product_dimension?.product_weight}</span>
								</p>
							)}
							{product_dimension?.notes && (
								<p className="flex justify-between space-x-8 text-[15px] text-gray md:text-[18px]">
									<span className="font-semibold">{t('Notes')}:</span>
									<span>{product_dimension?.notes}</span>
								</p>
							)}
						</div>
					</div>
				) : (
					<p className="mt-4 md:mt-8">
						Product Dimensions is not available
					</p>
				)}
			</div>

			{/* Product certification  Details */}
			{/* <div className={certificationContainerClassName}>
				<p className="border-b-2 border-[#C4C4C4] pb-1 text-lg font-semibold leading-[22px] text-gray md:text-[21px] md:uppercase md:leading-6">
					{t('common:product_certifications')}
				</p>
				{certifications.length > 0 &&
				(certifications as any)?.[0]?.name ? (
					<div className="flex justify-between md:p-4">
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
					<p className="mt-4 md:mt-8">
						Product Certifications is not available
					</p>
				)}
			</div> */}

			{/* Shipping Details */}
			{/* <div className={dimensionContainerClassName}>
				<p className="border-b-2 border-[#C4C4C4] pb-1 text-lg font-semibold leading-[22px] text-gray md:text-[21px] md:uppercase md:leading-6">
					{t('common:shipping_details')}
				</p>
				{isShippingDetailsAvailable ? (
					<div className="flex justify-between md:p-4">
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
					<p className="mt-4 md:mt-8">
						Shipping Details is not available
					</p>
				)}
			</div> */}
		</div>
	);
};

export default ProductDetailsTab;
