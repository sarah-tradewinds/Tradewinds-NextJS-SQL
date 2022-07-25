import Image from 'next/image';

import { metadataList } from 'data/product-search/metadata-list';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { MdBookmark, MdOutlineBookmarkBorder } from 'react-icons/md';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Button from '../common/form/button';
import MetadataTile from '../product-search/metadata/metadata-tile';

// store

interface CartItemProps {
	id: string;
	productName: string;
	productPrice: number;
	imageUrl: string;
	quantity: number;
	description: string;
	displayPrice: string;
	minOrderQuantity: number;
	totalReviewCount: number;
}

const CartItem: React.FC<CartItemProps> = (props) => {
	const {
		id,
		productName,
		productPrice,
		imageUrl,
		quantity,
		description,
		displayPrice,
		minOrderQuantity,
		totalReviewCount
	} = props;

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

	const slug = 'product-id';
	const name = 'product name';

	return (
		<div className="grid grid-cols-12">
			<div className="col-span-12">
				<div className="grid grid-cols-12">
					<div className="col-span-3">
						<Link href={`/product/${slug}`}>
							<a>
								<div className="relative h-[205px] w-[290px]">
									<ImageWithErrorHandler
										src={imageUrl || '/vehicles/eegnr - tractor.png'}
										alt={'alt'}
										layout="fill"
										className="object-contain"
									/>
								</div>
							</a>
						</Link>
					</div>

					{/* Content and metadata */}
					<div className="col-span-9 space-y-4">
						<div className="grid grid-cols-12">
							<div className="col-span-8">
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

								<div className="mt-2 space-y-2 text-primary-main">
									<p>Price Per unit: $29,000.000</p>
									<p>100 Pieces /Min. Order</p>
								</div>
							</div>

							{/* Quantity input and total amount */}
							<div className="col-span-4 mt-2 flex justify-between">
								<div>
									<span className="text-[21px] font-semibold text-primary-main">
										Qty:
									</span>
									<input className="h-[38px] w-[53px] border p-2 outline-none" />
								</div>
								<p className="text-[21px] font-semibold text-primary-main">
									Total: $25,000.00
								</p>
							</div>
						</div>

						{/* metadata */}
						<div col-span-12>{metadataElements}</div>
					</div>
				</div>
			</div>

			{/* Delete, save, ratings and isVerified */}
			<div className="col-span-12 mt-4 flex items-center justify-between">
				<Button className="ml-6 !border !text-primary-main">
					Message Vendor
				</Button>
				<div className="flex space-x-4 text-accent-primary-main">
					<p className="border-r pr-2">Delete</p>
					<p className="">Save for later</p>
				</div>
				<div className="flex items-center space-x-32">
					<div>
						<div className="relative h-[13px] w-[80px] lg:h-[32px] lg:w-[132px]">
							<Image src="/rating.png" alt="" layout="fill" />
						</div>
						<p className="hidden text-center text-[13px] text-secondary md:block">
							{totalReviewCount} {t('common:reviews')}
						</p>
					</div>
					<div className="relative hidden h-[55px] w-[85px] lg:block">
						<Image src="/twmp-verified.png" alt="" layout="fill" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
