import { useRouter } from 'next/router';

// components
import Button from 'components/common/form/button';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { metadataList } from 'data/product-search/metadata-list';
import { BiMessageAltDetail } from 'react-icons/bi';
import { useAuthStore } from 'store/auth';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import MetadataTile from '../product-search/metadata/metadata-tile';
import RatingStars from './product-details-tab/product-review/rating-stars';

// utils
import {
	ChevronDownIcon,
	ChevronLeftIcon
} from '@heroicons/react/20/solid';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import MessageVendorPopup from 'components/common/popup/message-vendor.popup';
import { useKeenSlider } from 'keen-slider/react';
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import {
	MdBookmark,
	MdOutlineBookmarkBorder,
	MdOutlineShoppingCart
} from 'react-icons/md';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import ImageContainer from './product-details-images/image-contaier';
import ProductOptionsValuesAccordion from './product-options-values-accordion';

const ProductDetailsTile: React.FC<{
	totalReviewCount: number;
	product: any;
	selectedVariantId?: string;
	onVariantClick: (variantId: string) => any;
	onAddToCart: () => any;
}> = (props) => {
	const {
		totalReviewCount,
		product = {},
		onVariantClick,
		onAddToCart,
		selectedVariantId
	} = props;

	const [selected, setSelected] = useState<any>({});
	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		slides: { perView: 4, spacing: 16 }
	});
	const [
		isProductDescriptionSectionExpanded,
		setIsProductDescriptionSectionExpanded
	] = useState(false);

	const { t } = useTranslation();

	const { isAuth, customerData, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData
		})
	);

	const router = useRouter();
	const { locale } = router;

	const {
		name,
		description,
		is_customizable,
		is_live,
		is_ready_to_ship,
		is_eco,
		seller_country = [],
		total_rate_count = 0,
		total_review_count = 0,
		product_features = []
	} = product || {};

	const { defaultVariant, variants, totalVariantCount } =
		getDefaultProductAndProductVariants(
			product?.edges?.product_variants || []
		);

	// const productVariants: any[] = [];
	// const productSizes: string[] = [];
	// const materials: string[] = [];
	// const styles: string[] = [];
	// const titles: string[] = [];
	// const colors: string[] = [];
	// variants?.forEach((variant: any, index: number) => {
	// const { product_attribute_options = [] } = variant?.edges || {};

	// product_attribute_options?.forEach((attributeOption: any) => {
	// 	// const attributeName =
	// 	// 	attributeOption?.edges?.product_attribute?.name
	// 	// 		?.trim()
	// 	// 		?.toLowerCase();

	// 	// const attributeValue = attributeOption?.value
	// 	// 	?.trim()
	// 	// 	?.toLowerCase();

	// 	// switch (attributeName) {
	// 	// 	case 'size':
	// 	// 		variant.size = attributeValue;
	// 	// 		// productSizes.push(attributeValue);
	// 	// 		break;
	// 	// 	case 'material':
	// 	// 		// materials.push(attributeValue);
	// 	// 		break;
	// 	// 	case '':
	// 	// 		variant.style = attributeValue;
	// 	// 		// styles.push(attributeValue);
	// 	// 		break;
	// 	// 	case 'title':
	// 	// 		variant.title = attributeValue;
	// 	// 		// titles.push(attributeValue);
	// 	// 		break;
	// 	// 	case 'color':
	// 	// 		variant.color = attributeValue;
	// 	// 		// colors.push(attributeValue);
	// 	// 		break;
	// 	// 	case 'colour':
	// 	// 		variant.color = attributeValue;
	// 	// 		// colors.push(attributeValue);
	// 	// 		break;
	// 	// }
	// }); // End of inner forEach loop

	// console.log('variant?.name', variant?.name);
	// if (!variant?.name?.en) {
	// 	variant.name = {
	// 		en: `${variant.color || ''} ${variant.size || ''}`
	// 	};
	// }
	// Pushing variant to list
	// productVariants.push(variant);
	// });// End of forEach loop

	const selectedVariant =
		variants?.find((variant) => variant?.id === selectedVariantId) ||
		defaultVariant;

	const {
		retail_price: product_price,
		is_bulk_pricing,
		bulk_pricing = [],
		inventory = {}
		// } = selectedVariantId ? selectedVariant : defaultVariant || {};
	} = selectedVariant || {};
	console.log(
		'selectedVariant-selectedVariant-selectedVariant =',
		selectedVariant
	);

	const productName = getLocaleText(name || {}, locale);

	const displayPrice = getDisplayBulkPrice({
		product_price,
		is_bulk_pricing,
		bulk_pricing
	});

	const country = seller_country
		? {
				name: getLocaleText(seller_country[0]?.name || '', locale),
				imageUrl: seller_country[0]?.url || ''
		  } || {}
		: {};

	const sellerCountry =
		product?.edges?.sellers?.edges?.country?.edges
			?.region_country?.[0] || {};
	const countryName =
		getLocaleText(sellerCountry?.name || {}, locale) || '';

	const minOrderQuantity = inventory?.minimum_order_quantity || 0;
	const isInStock =
		inventory?.available_quantity > 0 ||
		selectedVariant?.is_unlimited_quantity ||
		false;

	const metadataTileLists = [
		// country of origin
		<MetadataTile
			key={countryName}
			imageUrl={sellerCountry?.image}
			alt={countryName}
			title={countryName}
			imageContainerClassName="!w-[14px] !h-[10px] lg:!w-[23px] lg:!h-[14px]"
			className="!space-x-1 md:!space-x-4"
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// isReadyToShip
		<MetadataTile
			key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			imageUrl={metadataList[1].imageUrl}
			alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			className="!space-x-1 md:!space-x-4"
			imageContainerClassName="lg:!w-[22px] lg:!h-[12.57px]"
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[20px] md:text-[24] lg:text-[28px]">
					{/* {isInCompareList ? ( */}
					{false ? (
						<MdBookmark className="text-[#FC5267]" />
					) : (
						<MdOutlineBookmarkBorder className="text-accent-primary-main" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			// onClick={onCompareClick}
			className="cursor-pointer !space-x-1 md:!space-x-4"
			titleClassName="md:text-cyan md:text-[13px] md:leading-4"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
			className="!space-x-1 md:!space-x-4"
			imageUrl={metadataList[3].imageUrl}
			alt={t('common:customizable')}
			title={
				<p>
					{t('common:customizable')}{' '}
					<span className="text-secondary">
						{is_customizable ? 'YES' : 'NO'}
					</span>
				</p>
			}
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// variantCount
		<MetadataTile
			key={metadataList[4].title}
			imageUrl={metadataList[4].imageUrl}
			alt={metadataList[4].title}
			title={`${t('common:variants')} ${totalVariantCount || 0}`}
			className="!space-x-1 md:!space-x-4"
			titleClassName="md:text-[13px] md:leading-4"
		/>,
		// add to cart
		<div
			key={t('common:save')}
			title={!is_live ? 'Use message vendor' : ''}
		>
			<MetadataTile
				key={t('common:save')}
				icon={
					<div
						className={`text-[20px] md:text-[24] lg:pl-[2px] lg:text-[24px] ${
							is_live && isInStock
								? 'text-accent-primary-main'
								: 'text-gray/40'
						}`}
					>
						<MdOutlineShoppingCart />
					</div>
				}
				alt={t('common:save')}
				title={t('cart')}
				className={`!space-x-1 md:!space-x-4 ${
					is_live && isInStock ? 'cursor-pointer' : 'cursor-not-allowed'
				}`}
				onClick={is_live && isInStock ? onAddToCart : undefined}
				titleClassName="md:text-cyan md:text-[13px] md:leading-4"
			/>
		</div>
	];

	const images = product?.images?.length
		? product?.images
		: selectedVariant?.images || [];
	const masterImageUrl = images?.[0];

	const options: { [key: string]: any } = {};
	for (const variant of variants) {
		const productAttributeAndOptions =
			variant?.edges?.product_attribute_options || [];

		for (const productAttributeAndOption of productAttributeAndOptions) {
			const productAttribute =
				productAttributeAndOption?.edges?.product_attribute;
			const attributeId = productAttribute?.id;

			const optionAndValues = {
				id: attributeId,
				name: productAttribute?.name,
				values: [
					productAttributeAndOption?.value?.trim()?.toLowerCase()
				]
			};

			const isOptionExist = options?.[attributeId];
			if (!isOptionExist) {
				options[attributeId] = optionAndValues;
				continue;
			}

			const selectedOption = options[attributeId];
			const values = [
				...selectedOption?.values,
				...optionAndValues?.values
			];
			const uniqueValues = [...new Set(values)];
			options[attributeId] = {
				...selectedOption,
				values: uniqueValues || []
			};
		}

		console.log('[productAttributeOptions] =', variant);
	} // End of for-loop

	const [selectedOptionAndValue, setSelectedOptionAndValue] = useState<{
		[key: string]: {
			optionId: string;
			optionName: string;
			value: {
				name: string;
			};
		};
	}>();

	const optionsAndValueListObject: any = {};
	const optionList = { ...options };
	for (const key in optionList) {
		const optionsAndValueLists = optionList[key] || [];
		const {
			id: optionId,
			name: optionName,
			values = []
		} = optionsAndValueLists;
		if (!optionsAndValueListObject[optionId]) {
			optionsAndValueListObject[optionId] = {
				id: optionId,
				name: optionName,
				values: []
			};
		}

		// Looping through all the option values.
		for (const value of values) {
			const optionValue = {
				name: value?.toLowerCase(),
				imageUrl: ''
			};

			// Variants Loop
			for (const variant of variants) {
				const productAttributeOptions =
					variant?.edges?.product_attribute_options?.map(
						(productAttributeAndOption: any) =>
							productAttributeAndOption?.value?.toLowerCase()
					) || [];

				if (productAttributeOptions?.includes(value?.toLowerCase())) {
					optionValue.imageUrl = variant?.images?.[0] || '';
					break;
				}
			} // End of variant for-loop
			const existingOptionValues =
				optionsAndValueListObject[key].values;
			optionsAndValueListObject[key].values = [
				...existingOptionValues,
				optionValue
			];
		} // End of values for-loop
	} // End of optionsAndValueListObject for-loop

	const firstSelectedOptionAndValues =
		optionsAndValueListObject[product?.product_attribute_id];
	delete optionsAndValueListObject[product?.product_attribute_id];
	const updatedOptionsAndValueLists = [
		firstSelectedOptionAndValues,
		...Object.values(optionsAndValueListObject || {})
	];

	const onOptionAndValueSelect = (optionAndValue: any) => {
		const findAndSetVariantBySelectedOptionValues = (
			updatedSelectedOptionAndValueObject: any
		) => {
			const updatedSelectedOptionAndValue = Object.values(
				updatedSelectedOptionAndValueObject || {}
			);
			const variant = variants?.find((productVariant) => {
				const productAttributeOptions =
					productVariant?.edges?.product_attribute_options || [];

				// This matchCount track or count for, weather in a variant all selected option are matching or not
				let matchCount = 0;
				for (const productAttributeOption of productAttributeOptions) {
					for (const selectedOptionAndValue of updatedSelectedOptionAndValue) {
						const selectedOptionAndValueData =
							selectedOptionAndValue as any;

						const productAttributeId =
							productAttributeOption?.edges?.product_attribute?.id;

						if (
							productAttributeId ===
								selectedOptionAndValueData?.optionId &&
							selectedOptionAndValueData?.value?.name ===
								productAttributeOption.value
						) {
							// console.log(
							// 	'selectedOptionAndValue as any)?.value?.name === productAttributeOption.value',
							// 	{
							// 		productAttributeId,
							// 		name: (selectedOptionAndValue as any)?.value?.name,
							// 		productAttributeOptionName:
							// 			productAttributeOption?.value
							// 	}
							// );
						}

						if (
							// productAttributeId ===
							// 	selectedOptionAndValueData?.optionId &&
							// selectedOptionAndValueData?.value?.name ===
							// 	productAttributeOption.value

							productAttributeId ===
								selectedOptionAndValueData?.optionId &&
							selectedOptionAndValueData?.value?.name ===
								productAttributeOption.value
						) {
							matchCount += 1;
						}
					}
				}
				const updatedSelectedOptionAndValueLength =
					updatedSelectedOptionAndValue.length;

				return (
					matchCount === updatedSelectedOptionAndValueLength &&
					updatedSelectedOptionAndValueLength > 0
				);
			});

			onVariantClick(
				selectedVariantId === variant?.id ? '' : variant?.id
			);
		}; // End of findAndSetVariantBySelectedOptionValues

		setSelectedOptionAndValue((prevSelectedOptionAndValue) => {
			const selectedOptionId = optionAndValue?.optionId;

			const prevSelectedOptionsAndValue = {
				...prevSelectedOptionAndValue
			};

			let updatedSelectedOptionAndValueObj = {};
			if (
				prevSelectedOptionsAndValue?.[selectedOptionId]?.value?.name ===
				optionAndValue?.value?.name
			) {
				delete prevSelectedOptionsAndValue[selectedOptionId];

				findAndSetVariantBySelectedOptionValues(
					prevSelectedOptionsAndValue || {}
				);
				return prevSelectedOptionsAndValue;
			}

			const updatedSelectedOptionAndValueObject = {
				...prevSelectedOptionsAndValue,
				[selectedOptionId]: optionAndValue
			};

			findAndSetVariantBySelectedOptionValues(
				updatedSelectedOptionAndValueObject || {}
			);

			return updatedSelectedOptionAndValueObject;
		});
	}; // End of onOptionAndValueSelect

	const productDescription =
		getLocaleText(description || {}, locale) || '';

	return (
		<>
			<MessageVendorPopup
				open={isMessageVendorPopupOpen}
				onClose={() => setIsMessageVendorPopupOpen(false)}
				onChange={() => {}}
				onSendClick={async (message) => {
					if (!isAuth) {
						setIsLoginOpen();
						return;
					}

					const conversationId = await createConversation(
						product?.edges?.sellers?.edges?.user?.id
					);
					if (!conversationId) {
						return;
					}

					await sendMessageToSeller(conversationId, message);
					setIsMessageVendorPopupOpen(false);
				}}
			/>

			<div className="grid grid-cols-12 gap-y-8 bg-white md:gap-8">
				{/* Images container */}
				<ImageContainer
					key={masterImageUrl}
					className="col-span-12 md:first-letter:p-8 lg:col-span-5"
					imageUrl={masterImageUrl}
					alt=""
					thumbnails={images || []}
				/>

				{/* Product details */}
				<div className="col-span-12 overflow-y-auto px-5 md:py-8 md:pl-20 lg:col-span-7 lg:h-[786px] lg:p-8">
					{/* Product name and sku info */}
					<div className="flex items-center justify-between">
						<h1 className="text-[18px] font-semibold leading-[22px] text-primary-main md:text-[30px] md:leading-[37px]">
							{productName}
						</h1>
						<p className="hidden text-[25px] font-semibold text-gray/40 md:block">
							{inventory?.sku}
						</p>
					</div>

					{/* Price and quantity info */}
					<div className="my-2 flex justify-between text-[12px] font-semibold text-primary-main md:mt-[13px]">
						<h3 className="flex items-center space-x-8 text-xs font-semibold leading-[15px] md:text-[21px] md:leading-[26px]">
							{selectedVariant?.is_on_sale && !is_bulk_pricing ? (
								<>
									<span className="text-accent-error">
										Sale {selectedVariant?.sales_price}/piece
									</span>
									<span className="text-gray line-through">
										${product_price}/piece
									</span>
								</>
							) : (
								<>{displayPrice} /piece</>
							)}
						</h3>

						{minOrderQuantity > 0 && (
							<div className="text-xs font-semibold leading-[15px] md:text-[21px] md:leading-[26px]">
								<h4>
									{minOrderQuantity} {t('common:piece')} /
									{t('common:min_order')}
								</h4>
								<p>Lead Time: {product?.lead_time}</p>
							</div>
						)}
					</div>

					{/* Metadata list */}
					<div className="mt-2 grid grid-cols-2 gap-[15px] text-gray md:grid-cols-3">
						{/* country of origin */}
						{metadataTileLists[0]}
						{/* isReadyToShip */}
						{!is_ready_to_ship && metadataTileLists[1]}
						{/* Compare */}
						{metadataTileLists[2]}
						{/* Customizable */}
						{metadataTileLists[3]}
						{/* variantCount */}
						{metadataTileLists[4]}
						{/* Add to cart */}
						{metadataTileLists[5]}
					</div>

					{/* Rating, review count and verified Image */}
					<div className="mt-[28px] hidden items-center pb-4 md:flex">
						<div className="flex items-center md:mr-[79px]">
							<RatingStars
								starNumber={5}
								rating={total_rate_count}
								containerClassName="w-[149px] justify-between"
								className="h-[23.7px] w-[23.7px] text-gray"
								selectedClassName="text-secondary"
							/>
							<p className="text-center text-[13px] leading-4 text-secondary md:ml-[7px]">
								{total_review_count} {t('common:reviews')}
							</p>
						</div>

						{/* {!is_verified && ( */}
						<div className="relative h-[30px] w-[162px]">
							<ImageWithErrorHandler
								src="/tradewinds-horizontal-logo.png"
								alt=""
								fill={true}
							/>
						</div>
						{/* )} */}

						{is_eco && (
							<div className="ml-20 flex items-center space-x-2">
								<ImageWithErrorHandler
									src="/static/icons/eco-icon.png"
									alt="Eco icon"
									width={40}
									height={40}
								/>
								<span className="font-semibold text-green">ECO</span>
							</div>
						)}
					</div>

					{/* Product name and description */}
					<div className="mt-[15px] border-t-2 border-[#DEDFE0] pt-[13px] md:border-b-2 md:pt-[19px] md:pb-[25.64px]">
						<div className="flex items-start">
							<h2 className="overflow-clips h-[49px]s text-xs leading-[22px] text-gray md:text-[15px]">
								{productDescription?.length > 150
									? productDescription?.substring(
											0,
											isProductDescriptionSectionExpanded
												? productDescription?.length
												: 150
									  )
									: productDescription}

								{productDescription?.length > 150 && (
									<button
										className="pl-2 text-[15px] font-bold text-cyan"
										onClick={() =>
											setIsProductDescriptionSectionExpanded(
												(prevState) => !prevState
											)
										}
									>
										{isProductDescriptionSectionExpanded
											? 'Less'
											: 'More'}
									</button>
								)}
							</h2>

							{productDescription?.length > 150 && (
								<Button
									onClick={() =>
										setIsProductDescriptionSectionExpanded(
											(prevState) => !prevState
										)
									}
								>
									{isProductDescriptionSectionExpanded ? (
										<ChevronDownIcon className="h-10 w-10 text-gray" />
									) : (
										<ChevronLeftIcon className="h-10 w-10 text-gray" />
									)}
								</Button>
							)}
						</div>

						{/* Actions */}
						<div className="mt-[25px] hidden items-center space-x-2 md:flex">
							{/* cart */}
							<div title={!is_live ? 'Message Vendor' : ''}>
								<Button
									variant="product"
									className={`!flex !items-center !space-x-2 !px-2 !text-[16px] !font-medium ${
										!is_live ? '!cursor-not-allowed !opacity-60' : ''
									}`}
									onClick={is_live ? onAddToCart : undefined}
								>
									<MdOutlineShoppingCart className="h-6 w-6" />
									<span>{t('common:add_to_cart')}</span>
								</Button>
							</div>

							{/* RFQ */}
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
								className="!flex !items-center !border-2 !border-success !px-2 !text-[16px] !font-normal !text-success md:block"
							>
								<BiMessageAltDetail className="h-6 w-6" />
								<span className="px-2">{t('common:submit_rfq')}</span>
							</Button>

							{/* Message Supplier */}
							<Button
								onClick={() => {
									if (!isAuth) {
										setIsLoginOpen();
									} else {
										setIsMessageVendorPopupOpen(true);
									}
								}}
								className="!flex !items-center !border-2 !border-success !px-2 !text-[16px] !font-normal !text-success md:block"
							>
								<BiMessageAltDetail className="h-6 w-6" />
								<span className="px-2">{t('Message supplier')}</span>
							</Button>
						</div>
					</div>

					{/* Additional info */}
					<div className="md:mt-[21px]s hidden space-y-4 md:block">
						{/* Bulk Pricing */}
						<div ref={sliderRef} className="keen-slider">
							{is_bulk_pricing &&
								bulk_pricing?.map((bulkPrice: any, index: any) => (
									<div
										key={`${bulkPrice.range}_${bulkPrice.price}_${index}`}
										className="keen-slider__slide"
									>
										<p className="text-primary-main md:text-lg ">
											<span className="font-semibold">
												{bulkPrice.start_range}-{bulkPrice.end_range}
												{/* {bulkPrice.range} */}
											</span>{' '}
											{t('common:piece')}= ${bulkPrice.price}
										</p>
									</div>
								))}
						</div>

						{/* Variants Options And Values */}
						{updatedOptionsAndValueLists?.map(
							(optionAndValueList: any, index: number) => {
								const {
									id,
									name,
									values = []
								} = optionAndValueList || {};
								const showImage = index === 0;

								const filteredOptionAndValue =
									selectedOptionAndValue?.[id];
								console.log(
									'filteredOptionAndValue =',
									filteredOptionAndValue
								);
								const selectedOptionValue =
									filteredOptionAndValue?.value?.name || '';

								return (
									<ProductOptionsValuesAccordion
										key={index}
										productVariants={variants || []}
										showImage={showImage}
										selectedOptionAndValue={selectedOptionAndValue}
										optionAndValues={optionAndValueList}
										onOptionAndValueSelect={onOptionAndValueSelect}
									/>
								);
							}
						)}

						{/* Product Feature */}
						{product_features?.length > 0 && (
							<div>
								<p className="text-[15px] font-semibold leading-[22px] text-[#575858]">
									Product features:
								</p>
								<ul className="ml-6 list-disc text-[15px] leading-[22px] text-[#575858]">
									{product_features?.map((productFeature: any) => (
										<li key={productFeature?.en}>
											{getLocaleText(productFeature, locale)}
										</li>
									))}
								</ul>
							</div>
						)}

						<p className="text-[21px] leading-[26px] text-primary-main">
							<span className="font-semibold capitalize">
								{t('common:customizable')}:
							</span>{' '}
							<span>
								{is_customizable ? t('common:yes') : t('common:no')}
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}; // End of ProductDetailsPage

export default ProductDetailsTile;
