import Image from 'next/image';

import { metadataList } from 'data/product-search/metadata-list';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { MdBookmark, MdOutlineBookmarkBorder } from 'react-icons/md';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Button from '../common/form/button';
import MetadataTile from '../product-search/metadata/metadata-tile';

// store

interface CartItemProps {
	id: string;
	slug: string;
	productName: string;
	description: string;
	quantity: number;
	total: number;
	productPrice: number;
	isSaleOn?: boolean;
	salePrice: number;
	displayPrice: string;
	isBulkPricing: boolean;
	minOrderQuantity: number;
	imageUrl: string;
	totalReviewCount: number;
	onUpdate: (quantity: number, productId: string) => any;
	onRemove?: () => any;
}

const CartItem: React.FC<CartItemProps> = (props) => {
	const {
		id,
		slug,
		productName,
		description,
		quantity,
		total,
		productPrice,
		isSaleOn,
		salePrice,
		displayPrice,
		minOrderQuantity,
		isBulkPricing,
		imageUrl,
		totalReviewCount,
		onUpdate,
		onRemove
	} = props;

	const [productQuantity, setProductQuantity] = useState(quantity || 1);

	const { t } = useTranslation();

	const metadataTileList = [
		// country of origin
		<MetadataTile
			key={metadataList[0].title}
			imageUrl={metadataList[0].imageUrl}
			alt={metadataList[0].title}
			title={'countryOfOrigin'}
		/>,
		// isReadyToShip
		id && (
			<MetadataTile
				key={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				imageUrl={metadataList[1].imageUrl}
				alt={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
				title={`${t('common:live_buy')}/${t('common:ready_to_ship')}`}
			/>
		),
		// compare
		<MetadataTile
			key={metadataList[2].title}
			icon={
				<div className="text-[32px]">
					{id ? (
						<MdBookmark className="text-[#FC5267]" />
					) : (
						<MdOutlineBookmarkBorder className="text-accent-primary-main" />
					)}
				</div>
			}
			alt={t('common:compare')}
			title={t('common:compare')}
			onClick={() => {}}
			className="cursor-pointer"
		/>,
		// Customizable
		<MetadataTile
			key={t('common:customizable')}
			imageUrl={metadataList[3].imageUrl}
			alt={t('common:customizable')}
			title={
				<p>
					{t('common:customizable')}{' '}
					<span className="text-secondary">{id ? 'YES' : 'NO'}</span>
				</p>
			}
		/>,
		// variantCount
		<MetadataTile
			key={metadataList[4].title}
			imageUrl={metadataList[4].imageUrl}
			alt={metadataList[4].title}
			title={`${t('common:variant')} ${10}`}
		/>,
		// save
		<MetadataTile
			key={t('common:save')}
			imageUrl={metadataList[5].imageUrl}
			alt={t('common:save')}
			title={t('common:save')}
		/>
	];

	const metadataElements = (
		<div className={`grid grid-cols-3 gap-4 text-[12px] text-gray`}>
			{metadataTileList}
		</div>
	);

	const quantityChangeHandler = (e: any) => {
		const value = e.target.value;
		if (isNaN(value)) {
			return;
		}

		setProductQuantity(value);
	}; // End of quantityChangeHandler

	return (
		<div className="grid grid-cols-12">
			<div className="col-span-12">
				<div className="grid grid-cols-12">
					{/* Image */}
					<div className="col-span-5 md:col-span-3">
						<div>
							<Link href={`/product/${slug}`}>
								<a>
									<div className="relative h-[81px] w-[114px] md:h-[101px] md:w-[143px] lg:h-[205px] lg:w-[290px]">
										<ImageWithErrorHandler
											key={imageUrl}
											src={imageUrl}
											alt={'alt'}
											fill={true}
											className="object-contain"
										/>
									</div>
								</a>
							</Link>
						</div>

						{/* For small screen only */}
						<div className="mt-2 flex items-center justify-between p-2">
							<div>
								<div className="relative h-[10px] w-[63px]">
									<Image src="/rating.png" alt="" fill={true} />
								</div>
								<p className="hidden text-center text-[13px] text-secondary md:block">
									{totalReviewCount} {t('common:reviews')}
								</p>
							</div>
							<div className="relative h-[19px] w-[30px]">
								<Image src="/twmp-verified.png" alt="" fill={true} />
							</div>
						</div>
					</div>

					{/* Content and metadata */}
					<div className="col-span-7 space-y-4 md:col-span-9">
						<div className="grid grid-cols-12">
							<div className="col-span-7">
								{/* Title and description */}
								<div className="hidden md:block">
									<Link href={`/product/${slug}`}>
										<a>
											<h2 className="md:text-[16px] lg:text-[15px]">
												<span className="font-semibold">
													{productName}:{' '}
												</span>
												<span className="text-gray">{description}</span>
											</h2>
										</a>
									</Link>
								</div>

								<div className="mt-2 hidden text-primary-main md:block">
									{/* <p>
										{t('common:price_per_unit')}: ${productPrice}
									</p> */}

									<h3 className="flex items-center space-x-8">
										{isSaleOn && !isBulkPricing ? (
											<>
												<span className="text-accent-error">
													Sale {salePrice}/piece
												</span>
												<span className="text-gray line-through">
													${productPrice}/piece
												</span>
											</>
										) : (
											<>{displayPrice} / piece</>
										)}
									</h3>
									<p>
										{minOrderQuantity} {t('common:pieces')} /
										{t('common:min_order')}
									</p>
								</div>
							</div>

							{/* Quantity input and total amount */}
							<div className="col-span-12 mt-2 md:col-span-5 md:flex md:justify-between">
								<div className="">
									<div>
										<span className="text-[15px] font-semibold text-primary-main md:text-[21px]">
											{t('cart:qty')}:
										</span>
										<input
											value={productQuantity}
											onChange={quantityChangeHandler}
											className="h-[38px] w-[53px] border p-2 outline-none"
										/>
									</div>

									<Button
										onClick={() =>
											onUpdate(+(productQuantity || 0), id)
										}
									>
										<p className="text-right text-[12px] font-semibold text-accent-primary-main md:text-[18px]">
											{t('cart:update')}
										</p>
									</Button>
								</div>
								<p className="text-[15px] font-semibold text-primary-main md:text-[21px]">
									{t('cart:total')}: ${total}
								</p>
							</div>

							{/* for small screen */}
							<div className="col-span-12 text-[12px] text-accent-primary-main md:hidden">
								<p>{productName}</p>
								<p className="font-semibold">
									{t('common:price_per_unit')}: ${productPrice}
								</p>
								<p>
									{minOrderQuantity} {t('common:pieces')} /
									{t('common:min_order')}
								</p>
							</div>
						</div>

						{/* metadata */}
						<div className="col-span-12 hidden md:block">
							{metadataElements}
						</div>
						<div className="col-span-12 space-y-2 md:hidden">
							{metadataTileList[0]}
							{metadataTileList[1]}
						</div>
					</div>
				</div>
			</div>

			{/* Delete, save, ratings and isVerified */}
			<div className="col-span-12 mt-2 items-center justify-between md:mt-4 md:flex">
				<Button className="ml-6 hidden !border !text-primary-main md:block">
					{t('common:message_vendor')}
				</Button>
				<div className="flex justify-center space-x-4 text-accent-primary-main md:justify-start">
					<p
						onClick={onRemove}
						className="cursor-pointer border-r pr-4"
					>
						{t('cart:delete')}
					</p>
					<p onClick={() => {}} className="cursor-pointer">
						{t('cart:save_for_later')}
					</p>
				</div>
				<div className="hidden items-center space-x-32 md:flex">
					<div>
						<div className="relative h-[13px] w-[80px] lg:h-[32px] lg:w-[132px]">
							<Image src="/rating.png" alt="" fill={true} />
						</div>
						<p className="text-center text-[13px] text-secondary">
							{totalReviewCount} {t('common:reviews')}
						</p>
					</div>
					<div className="relative h-[55px] w-[85px]">
						<Image src="/twmp-verified.png" alt="" fill={true} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
