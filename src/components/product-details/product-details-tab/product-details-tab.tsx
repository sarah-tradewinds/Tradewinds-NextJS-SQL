import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
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
		main_categories,
		categories,
		sub_categories,
		specific_categories
	} = product?.edges || {};

	const { defaultVariant } = getDefaultProductAndProductVariants(
		product?.edges?.product_variants || []
	);
	const product_dimension =
		product?.product_dimension ||
		defaultVariant?.product_dimension ||
		{};

	const isProductDimensionAvailable =
		!product_dimension?.product_length &&
		!product_dimension?.product_width &&
		!product_dimension?.product_height &&
		!product_dimension?.product_weight
			? false
			: true;

	const headingClassName =
		'border-b-2 border-[#C4C4C4] text-[15px] capitalize font-semibold leading-[18.29px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray lg:border-t-2';

	return (
		<div className="space-y-8 bg-white p-4 pt-[48px] md:space-y-8 md:p-8">
			{/* DESCRIPTIVE DETAILS */}
			<div>
				<p
					// className="border-b-2 border-[#C4C4C4] pb-2 text-lg font-semibold leading-[22px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray"
					className={headingClassName}
				>
					{t('Descriptive Details')}
				</p>

				{/* Product details body */}
				<div
					className={`mt-1 space-y-8 md:p-4 ${productDetailsContainerClassName}`}
				>
					<p className="flex justify-between space-x-8 text-[12px] text-gray md:text-[18px]">
						{seoDescription}
					</p>
				</div>
			</div>

			{/* product details */}
			<div>
				<p
					// className="border-b-2 border-[#C4C4C4] text-[15px] font-semibold leading-[18.29px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray lg:border-t-2"
					className={headingClassName}
				>
					{t('common:product_details')}
				</p>

				{/* Product details body */}
				{productDetailItems.length > 0 &&
				(productDetailItems as any)?.[0]?.key?.en ? (
					<div
						className={`flex flex-col md:flex-row md:justify-between md:p-4 ${productDetailsContainerClassName}`}
					>
						<div className="ml-1 mt-[7px] space-y-1">
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
										className="flex flex-col text-[12px] leading-[21px] text-gray md:flex-row md:justify-between md:space-x-8 md:text-[18px]"
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
				<p
					// className="border-b-2 border-t-2 border-[#C4C4C4] pb-2 text-lg font-semibold leading-[22px] text-primary-main md:border-t-0 md:text-xl md:text-[21px] md:uppercase md:leading-6 md:text-gray"
					className={headingClassName}
				>
					{t('Product Information')}
				</p>

				{/* Product information body */}
				<ul
					className={`mt-1 space-y-2 text-[12px] leading-[18.29px] md:p-4 lg:text-[18px] lg:leading-[38px] ${productDetailsContainerClassName}`}
				>
					{/* IS ECO */}
					{product?.is_eco && (
						<li className="flex items-center space-x-2 md:space-x-0">
							<span className="text-gray md:w-[200px] md:font-semibold">
								ECO:
							</span>
							<div className="relative h-[30px] w-[30px]">
								<ImageWithErrorHandler
									src="/static/icons/eco-icon.png"
									alt="eco icon"
									// width={40}
									// height={40}
									fill={true}
								/>
							</div>
						</li>
					)}

					{/* Main Category */}
					<li className="flex flex-col md:flex-row md:items-center md:space-x-0">
						<span className="text-gray md:w-[200px] md:font-semibold">
							Main Category:
						</span>
						<span className="text-black">
							{getLocaleText(main_categories?.title || {}, locale)}
						</span>
					</li>

					{/* Category */}
					{categories?.title && (
						<li className="flex flex-col md:flex-row md:items-center md:space-x-0">
							<span className="text-gray md:w-[200px] md:font-semibold">
								Category:
							</span>
							<span className="text-black">
								{getLocaleText(categories?.title || {}, locale)}
							</span>
						</li>
					)}

					{/* Sub Category */}
					{sub_categories?.title && (
						<li className="flex flex-col md:flex-row md:items-center md:space-x-0">
							<span className="text-gray md:w-[200px] md:font-semibold">
								Sub Category:
							</span>
							<span className="text-black">
								{getLocaleText(sub_categories?.title || {}, locale)}
							</span>
						</li>
					)}

					{/* Specific Category */}
					{specific_categories?.title && (
						<li className="flex flex-col md:flex-row md:items-center md:space-x-0">
							<span className="text-gray md:w-[200px] md:font-semibold">
								Specific Category:
							</span>
							<span className="text-black">
								{getLocaleText(
									specific_categories?.title || {},
									locale
								)}
							</span>
						</li>
					)}

					{/* eco verifications */}
					{product?.is_eco && product?.eco_verifications?.length > 0 && (
						<div>
							<p className="text-gray md:font-semibold">
								Eco Verifications:
							</p>
							<div className="space-y-2 pl-4">
								{product?.eco_verifications?.map(
									(ecoVerification: any) => {
										const { verification_type } = ecoVerification;

										return (
											<div
												key={verification_type}
												className="flex items-center space-x-4"
											>
												<div className="w-[280px] md:w-[306px]">
													{verification_type}
												</div>
												<div className="relative hidden h-[30px] w-[162px] md:block">
													<ImageWithErrorHandler
														src="/tradewinds-horizontal-logo.png"
														alt=""
														fill={true}
													/>
												</div>
											</div>
										);
									}
								)}
							</div>
						</div>
					)}

					{/* Certificates */}
					{(certifications as any)?.[0]?.name && (
						<li className="flex">
							<span className="text-gray md:w-[200px] md:font-semibold">
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
											<div className="relative hidden h-[30px] w-[162px] md:block">
												<ImageWithErrorHandler
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
				<p
					// className="border-b-2 border-[#C4C4C4] pb-1 text-lg font-semibold leading-[22px] text-primary-main md:text-[21px] md:uppercase md:leading-6 md:text-gray"
					className={headingClassName}
				>
					{t('Product Dimensions')}
				</p>
				{isProductDimensionAvailable ? (
					<div className="mt-1 flex justify-between md:p-4">
						<div className="space-y-2">
							{product_dimension?.product_length && (
								<p className="flex justify-between space-x-8 text-[12px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:length')}:
									</span>
									<span>
										{product_dimension?.product_length}{' '}
										{product_dimension?.length_unit}
									</span>
								</p>
							)}
							{product_dimension?.product_width && (
								<p className="flex justify-between space-x-8 text-[12px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:width')}:
									</span>
									<span>
										{product_dimension?.product_width}{' '}
										{product_dimension?.width_unit}
									</span>
								</p>
							)}
							{product_dimension?.product_height && (
								<p className="flex justify-between space-x-8 text-[12px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:height')}:
									</span>
									<span>
										{product_dimension?.product_height}{' '}
										{product_dimension?.height_unit}
									</span>
								</p>
							)}
							{product_dimension?.product_weight && (
								<p className="flex justify-between space-x-8 text-[12px] text-gray md:text-[18px]">
									<span className="font-semibold">
										{t('common:product')} {t('common:weight')}:
									</span>
									<span>
										{product_dimension?.product_weight}{' '}
										{product_dimension?.weight_unit}
									</span>
								</p>
							)}
							{product_dimension?.notes && (
								<p className="flex justify-between space-x-8 text-[12px] text-gray md:text-[18px]">
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
		</div>
	);
};

export default ProductDetailsTab;
