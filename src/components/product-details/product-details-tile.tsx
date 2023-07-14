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
import Image from 'next/image';
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

	// const [selected, setSelected] = useState<any>({});
	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		// slides: { perView: 4, spacing: 16 }
		loop: false,
		mode: 'snap',
		rtl: false,
		slides: { perView: 'auto' }
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

	const selectedVariant =
		variants?.find((variant) => variant?.id === selectedVariantId) ||
		defaultVariant;

	const {
		retail_price: product_price,
		is_bulk_pricing,
		bulk_pricing = [],
		inventory = {}
	} = selectedVariant || {};
	console.log(
		'selectedVariant-selectedVariant-selectedVariant =',
		selectedVariant
	);

	const productName = (
		getLocaleText(name || {}, locale) || ''
	)?.toLowerCase();

	const displayPrice = getDisplayBulkPrice({
		product_price,
		is_bulk_pricing,
		bulk_pricing
	});

	// const country = seller_country
	// 	? {
	// 			name: getLocaleText(seller_country[0]?.name || '', locale),
	// 			imageUrl: seller_country[0]?.url || ''
	// 	  } || {}
	// 	: {};

	const sellerCountry =
		product?.edges?.sellers?.edges?.country?.edges
			?.region_country?.[0] || {};
	const countryName =
		getLocaleText(sellerCountry?.name || {}, locale) || '';

	const minOrderQuantity =
		inventory?.minimum_order_quantity ||
		defaultVariant?.inventory?.minimum_order_quantity_unit ||
		0;
	const minOrderQuantityUnit = (
		inventory?.minimum_order_quantity_unit ||
		defaultVariant?.inventory?.minimum_order_quantity_unit ||
		''
	)?.toLowerCase();
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

	// const images = product?.images?.length
	// 	? product?.images
	// 	: selectedVariant?.images || [];

	// const masterImageUrl = images?.[0];

	const images = defaultVariant?.images || [];
	const masterImageUrl = selectedVariant?.images?.[0] || '';

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
				for (const selectedOptionAndValue of updatedSelectedOptionAndValue) {
					for (const productAttributeOption of productAttributeOptions) {
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
							matchCount += 1;
							console.log(
								'selectedOptionAndValue as any)?.value?.name === productAttributeOption.value',
								{
									productAttributeId,
									name: (selectedOptionAndValue as any)?.value?.name,
									productAttributeOptionName:
										productAttributeOption?.value,
									productAttributeOptions,
									updatedSelectedOptionAndValue,
									productVariant
								}
							);
							break;
						}
					}
				}
				const updatedSelectedOptionAndValueLength =
					updatedSelectedOptionAndValue.length;

				console.log(
					'variantvariantvariantvariantvariantvariant-variant-variant =',
					{ updatedSelectedOptionAndValueLength, matchCount }
				);

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

	// Start Handlers
	const sendMessageVendorHandler = () => {}; // End of sendMessageVendorHandler

	// const sendMessageVendorHandler = () => {

	// }// End of sendMessageVendorHandler
	// End Handlers

	const messageVendor = (
		<button
			onClick={() => setIsMessageVendorPopupOpen(true)}
			className="relative mt-[14.18px] flex h-[32.5px] w-[239.67px] items-center justify-center rounded-lg border-[1.74px] border-[#33A7DF] sm:mt-0 sm:h-[12.17px] sm:w-[89.75px] sm:rounded-sm md:h-[14.6px] md:w-[107.69px] lg:h-[15.65px] lg:w-[114.85px] xl:h-[23px]  xl:w-[169.64px] desktop:rounded-md"
		>
			<div className="absolute left-0 top-0 bottom-0 flex h-full w-[32px] items-center justify-center bg-cyan sm:w-[16px]">
				<div className="relative h-[22.02px] w-[24px] sm:h-[8.32px] sm:w-[9.77px]">
					<Image
						src="/icons/message-vendor-white-outline-icon.svg"
						alt="message-vendor-white-outline-icon"
						fill={true}
					/>
				</div>
			</div>

			<p className="ml-[24px] text-[19.6px] font-semibold leading-[23.89px] text-cyan sm:ml-[16.28px] sm:text-[7.34px] sm:leading-[8.95px] lg:text-[9.44px] lg:leading-[11.51px] xl:text-[13.87px] xl:leading-[16.91px]">
				Message Vendor
			</p>
		</button>
	);

	const submitRFQ = (
		<button
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
			className="relative flex items-center rounded-lg border-[1.74px] border-[#33A7DF] sm:rounded-sm lg:h-[15.65px] lg:w-[114.85px] xl:h-[23px] xl:w-[169.64px] desktop:rounded-md"
		>
			<div className="absolute top-0 bottom-0 flex h-full w-[31.08px] items-center justify-center bg-cyan sm:w-[9.77px] lg:w-[16px]">
				<div className="relative h-[22.02px] w-[24px] sm:h-[8.32px] sm:w-[9.77px]">
					<Image
						src="/icons/message-vendor-white-outline-icon.svg"
						alt="message-vendor-white-outline-icon"
						fill={true}
					/>
				</div>
			</div>

			<span className="ml-[62.17px] text-[19.6px] font-semibold leading-[23.89px] text-cyan sm:ml-[16.28px] sm:text-[7.34px] sm:leading-[8.95px] lg:ml-[32px] lg:text-[9.44px] lg:leading-[11.51px] xl:text-[13.87px] xl:leading-[16.91px]">
				Submit RFQ
			</span>
		</button>
	);

	const baseButtonClass =
		'flex h-[32.5px] w-[239.67px] items-center justify-center sm:h-[12.17px] md:w-[107.69px] md:h-[14.6px] sm:w-[89.75px] lg:w-[114.85px] lg:h-[15.65px] rounded-lg sm:rounded-sm desktop:rounded-md xl:w-[169.64px] xl:h-[23px]';

	const actionButtons = (
		<div className="-mt-4 flex flex-col items-center space-y-[22.01px] sm:flex-row sm:space-x-[30.35px] sm:space-y-0">
			{/* Message Vendor */}
			<div className="hidden sm:block">{messageVendor}</div>

			{/* Submit RFQ button */}
			<button
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
				className={`${baseButtonClass} bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] sm:h-[12.17px]`}
			>
				<div className="flex items-center space-x-[8.79px]">
					<div className="relative h-[24.02px] w-[31.08px] sm:h-[8.99px] sm:w-[11.64px]">
						<Image
							src="/icons/rfq-white-outline-icon.svg"
							alt="rfq-white-outline-icon"
							fill={true}
						/>
					</div>

					<span className="text-[19.6px] font-semibold leading-[23.89px] text-white sm:text-[7.34px] sm:leading-[8.95px] lg:text-[9.44px] lg:leading-[11.51px] xl:text-[13.87px] xl:leading-[16.91px]">
						Submit an RFQ
					</span>
				</div>
			</button>

			{/* ADD to Cart button */}
			<button
				onClick={onAddToCart}
				className={`${baseButtonClass} border-[1.41px] border-[#37B04A]`}
			>
				<div className="flex items-center space-x-[8.79px]">
					<div className="relative h-[24.02px] w-[31.08px] sm:h-[8.99px] sm:w-[11.64px] lg:h-[11.57px] lg:w-[14.29px]">
						<Image
							src="/icons/cart-green-outline-icon.svg"
							alt="cart-icon"
							fill={true}
						/>
					</div>
					<span className="text-[19.6px] font-semibold leading-[23.89px] text-[#37B04A] sm:text-[7.34px] sm:leading-[8.95px] lg:text-[9.44px] lg:leading-[11.51px] xl:text-[13.87px] xl:leading-[16.91px]">
						Add to Cart
					</span>
				</div>
			</button>
		</div>
	);

	const productFeatures = (
		<ul className="ml-6 list-disc">
			{product_features?.map((productFeature: any) => (
				<li
					key={productFeature?.en}
					className="text-[12px] leading-[22px] text-[#575858] md:text-[10px] md:leading-[13.23px] lg:text-[12px] lg:leading-[14.97px] xl:text-[15px] xl:leading-[22px]"
				>
					{getLocaleText(productFeature, locale)}
				</li>
			))}
		</ul>
	);

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

			<div className="justify-end bg-white sm:flex sm:flex-row-reverse md:flex-row md:justify-start">
				{/* Images container */}
				<ImageContainer
					key={masterImageUrl}
					className="pt-[7px] md:pt-[5px] desktop:ml-[48px]"
					imageUrl={masterImageUrl}
					alt=""
					thumbnails={images || []}
					onThumbnailImagePressed={() => {
						if (selectedVariantId != defaultVariant?.id) {
							onVariantClick('');
							setSelectedOptionAndValue({});
						}
					}}
				/>

				{/* Product details */}
				<div className="mt-[16px] ml-[13px] mr-[13px] sm:w-[345px] md:ml-[40.49px] md:mr-[19.35px] md:w-[392.04px] lg:mr-[41.61px] lg:!w-[540px] xl:!w-[652px] 840px:w-auto desktop:ml-[164px]">
					{/* Product name and sku info */}
					<div className="flex items-center justify-between">
						<h1 className="text-[18px] font-semibold capitalize leading-[21.94px] text-gray sm:text-[15px] sm:leading-[18.29px] md:text-[18px] md:leading-[21.94px] lg:text-[20px] lg:leading-[24.38px] xl:text-[30px] xl:leading-[36.57px]">
							{productName}
						</h1>
						<p className="hidden font-semibold uppercase  text-gray/40 lg:block lg:text-[20px] lg:leading-[24.38px] xl:text-[30px] xl:leading-[36.57px]">
							{inventory?.sku}
						</p>
					</div>

					{/* Price and quantity info */}
					<div className="my-2 flex justify-between text-[12px] font-semibold text-primary-main sm:mt-0 sm:items-center sm:justify-start sm:space-x-4 sm:text-[10.83px] sm:leading-[13.21px] md:mt-[13px]">
						<h3 className="flex items-center space-x-8 text-xs font-semibold capitalize leading-[15px] sm:space-x-2 md:text-[13px] md:leading-[15.85px] lg:text-[15px] lg:leading-[18.29px] xl:text-[21px] xl:leading-[25.6px]">
							{selectedVariant?.is_on_sale && !is_bulk_pricing ? (
								<>
									<span className="text-accent-error">
										Sale ${selectedVariant?.sales_price}/
										{minOrderQuantityUnit}
									</span>
									<span className="text-primary-main line-through xl:text-gray">
										${product_price}/{minOrderQuantityUnit}
									</span>
								</>
							) : (
								<>
									{displayPrice} /{minOrderQuantityUnit}
								</>
							)}
						</h3>

						{minOrderQuantity > 0 && (
							<div className="text-xs font-semibold capitalize leading-[15px] text-primary-main sm:flex sm:items-center sm:space-x-2 sm:text-[10.83px] sm:leading-[13.21px] md:space-x-4 md:text-[13px] md:leading-[15.85px] lg:text-[15px] lg:leading-[18.29px] xl:text-[21px] xl:leading-[25.6px] xl:text-gray">
								<h4>
									{minOrderQuantity} {minOrderQuantityUnit} /
									{t('common:min_order')}
								</h4>
								<p className="hidden sm:block">
									Lead Time: {product?.lead_time}
								</p>
							</div>
						)}
					</div>

					{/* Metadata list */}
					<div className="mt-2 grid grid-cols-2 gap-[15px] text-gray sm:grid-cols-3 sm:gap-[8px] md:grid-cols-3">
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
					<div className="mt-[28px] hidden items-center md:mt-[10.25px] md:flex md:justify-between lg:pr-[32px]">
						<div className="md:mr-[79px]s flex items-center">
							<RatingStars
								starNumber={5}
								rating={total_rate_count}
								containerClassName="w-[149px] md:w-[89.59px] lg:w-[101.37px] lg:h-[16.13px] xl:w-[149px] xl:h-[23.7px] justify-betweens md:space-x-[4.58px]"
								className="h-[23.7px] w-[23.7px] text-gray md:h-[14.25px] md:w-[14.25px]"
								selectedClassName="text-secondary"
							/>
							<p className="text-center text-[13px] leading-4 text-secondary md:ml-[7px] md:text-[7.82px] md:leading-[9.53px] lg:text-[8.84px] lg:leading-[10.78px] xl:text-[13px] xl:leading-[15.85px]">
								{total_review_count} {t('common:reviews')}
							</p>
						</div>

						{/* <div className="hidden lg:block">{submitRFQ}</div> */}

						{/* {!is_verified && ( */}
						<div className="relative h-[30px] w-[162px] md:h-[17.42px] md:w-[97.43px]">
							<ImageWithErrorHandler
								src="/tradewinds-horizontal-logo.png"
								alt=""
								fill={true}
							/>
						</div>
						{/* )} */}

						{/* {is_eco && (
							<div className="ml-20 flex items-center space-x-2">
								<ImageWithErrorHandler
									src="/static/icons/eco-icon.png"
									alt="Eco icon"
									width={40}
									height={40}
								/>
								<span className="font-semibold text-green">ECO</span>
							</div>
						)} */}
					</div>

					{/* Message Vendor button only for mobile*/}
					<div className="flex justify-center sm:hidden">
						{messageVendor}
					</div>

					{/* Product name and description */}
					<div className="mt-[15px] border-b border-[#DEDFE0] pt-[13px] pb-[25.64px] sm:border-none sm:pb-0 md:border-t-[1.2px] md:pt-[19px]">
						<div className="flex items-start">
							{/* For Small Screen */}
							<div className="sm:hidden">
								<h2 className="text-[12px] leading-[22px] text-gray">
									<span className="font-semibold">{productName}:</span>
									<span>{productDescription}</span>
								</h2>
								{productFeatures}
							</div>

							{/* For Large Screen */}
							<h2 className="h-[49px]s hidden whitespace-pre-wrap text-xs leading-[22px] text-gray sm:block md:block md:text-[10px] md:leading-[13.23px] lg:text-[12px] lg:leading-[14.97px] xl:text-[15px] xl:leading-[22px]">
								<span className="font-semibold capitalize">
									{productName}:{' '}
								</span>
								<span>
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
											className="pl-2 font-bold text-cyan"
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
								</span>
							</h2>

							{productDescription?.length > 150 && (
								<button
									onClick={() =>
										setIsProductDescriptionSectionExpanded(
											(prevState) => !prevState
										)
									}
									className="hidden outline-none sm:block"
								>
									{isProductDescriptionSectionExpanded ? (
										<ChevronDownIcon className="h-10 w-10 text-gray sm:h-5 sm:w-5" />
									) : (
										<ChevronLeftIcon className="h-10 w-10 text-gray sm:h-5 sm:w-5" />
									)}
								</button>
							)}
						</div>

						{/* Actions */}
						<div className="mt-[25px] hidden items-center space-x-2 md:mt-[12.96px]">
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

					{/* Action Buttons only for medium and large device */}
					<div className="hidden border-b border-[#DEDFE0] pb-[19.3px] sm:mt-[33.77px] sm:block">
						{actionButtons}
					</div>

					{/* Additional info */}
					<div className="md:block">
						{/* Bulk Pricing */}
						{is_bulk_pricing && (
							<div className="mb-2 sm:w-[345px] md:w-[392.04px] lg:!w-[540px] xl:!w-[580px] 840px:w-auto">
								<div ref={sliderRef} className="keen-slider">
									{bulk_pricing?.map((bulkPrice: any, index: any) => (
										<div
											key={`${bulkPrice.range}_${bulkPrice.price}_${index}`}
											className="keen-slider__slide !min-w-max"
										>
											<p className="mr-2 whitespace-nowrap text-primary-main md:text-lg">
												<span className="font-semibold">
													{bulkPrice.start_range}-{bulkPrice.end_range}
												</span>{' '}
												{t('common:piece')}= ${bulkPrice.price}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Variants Options And Values */}
						<div className="">
							{updatedOptionsAndValueLists?.map(
								(optionAndValueList: any, index: number) => {
									if (!optionAndValueList) {
										return null;
									}

									const { id } = optionAndValueList || {};
									const showImage = index === 0;

									// const filteredOptionAndValue =
									// 	selectedOptionAndValue?.[id];

									const isLastItem =
										updatedOptionsAndValueLists?.length === index + 1;

									return (
										<div
											key={index}
											className={`mt-1 border-b border-[#DEDFE0] pb-[15.95px] md:border-b-[1.2px] lg:border-b-[1.36px] xl:border-b-2 ${
												isLastItem ? '!border-none' : ''
											}`}
										>
											<ProductOptionsValuesAccordion
												key={index}
												productVariants={variants || []}
												showImage={showImage}
												selectedOptionAndValue={selectedOptionAndValue}
												optionAndValues={optionAndValueList}
												onOptionAndValueSelect={onOptionAndValueSelect}
											/>
										</div>
									);
								}
							)}
						</div>

						{/* Action Buttons */}
						<div className="space-y-[22.01px]s flex flex-col items-center sm:hidden">
							{actionButtons}
						</div>

						{/* Product Feature */}
						{product_features?.length > 0 && (
							<div className="hidden sm:block md:pb-[16px]">
								<p className="font-semibold leading-[22px] text-[#575858] sm:text-[12px] sm:leading-[14.63px] md:text-[10px] md:leading-[13.23px] lg:text-[15px]">
									Product features:
								</p>
								<div>{productFeatures}</div>
							</div>
						)}

						{/* <p className="hidden text-[21px] leading-[26px] text-primary-main xl:block">
							<span className="font-semibold capitalize">
								{t('common:customizable')}:
							</span>{' '}
							<span>
								{is_customizable ? t('common:yes') : t('common:no')}
							</span>
						</p> */}
					</div>
				</div>
			</div>
		</>
	);
}; // End of ProductDetailsPage

export default ProductDetailsTile;
