import {
	ChevronDownIcon,
	ChevronLeftIcon
} from '@heroicons/react/20/solid';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import { useState } from 'react';

interface IProductOptionsValuesAccordion {
	productVariants: any[];
	showImage: boolean;
	optionAndValues: {
		id: string;
		name: string;
		values: any[];
	};
	selectedOptionAndValue?: {
		[key: string]: {
			optionId: string;
			optionName: string;
			value: {
				name: string;
			};
		};
	};
	onOptionAndValueSelect: (optionAndValue: any) => void;
}

const ProductOptionsValuesAccordion: React.FC<
	IProductOptionsValuesAccordion
> = (props) => {
	const {
		productVariants = [],
		optionAndValues,
		showImage,
		selectedOptionAndValue,
		onOptionAndValueSelect
	} = props;

	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	const { id, name, values = [] } = optionAndValues || {};

	// const valueLength = values?.length;
	const valueLength = values?.length;
	const showOnlyTheseOptionValues = [...values]?.splice(
		0,
		isAccordionOpen ? valueLength : 4
	);

	const filteredOptionAndValue = selectedOptionAndValue?.[id];
	const selectedOptionValue = filteredOptionAndValue?.value?.name || '';

	const isProductVariantInStockBySelectedOptionValues = (
		updatedSelectedOptionAndValueObject: any
	) => {
		const updatedSelectedOptionAndValue = Object.values(
			updatedSelectedOptionAndValueObject || {}
		);
		const variant = productVariants?.find((productVariant) => {
			const productAttributeOptions =
				productVariant?.edges?.product_attribute_options || [];

			// This matchCount track or count for, wheather in a variant all seletct option are matching or not
			let matchCount = 0;
			for (const productAttributeOption of productAttributeOptions) {
				for (const selectedOptionAndValue of updatedSelectedOptionAndValue) {
					if (
						(selectedOptionAndValue as any)?.value?.name ===
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

		const { available_quantity = 0, is_unlimited_quantity = false } =
			variant?.inventory || {};
		return available_quantity > 0 || is_unlimited_quantity || false;
	}; // End of isProductVariantInStockBySelectedOptionValues

	return (
		<>
			<div key={id}>
				{/* Option Name */}
				<div className="flex items-center justify-between">
					{/* Option name: Selected Value */}
					<p className="text-[12px] capitalize md:text-[10px] md:leading-[12.19px] lg:text-[12px] lg:leading-[14.63px] xl:text-[15px] xl:leading-[18.29ppx]">
						<span>{optionAndValues?.name}: </span>
						<span className="font-semibold capitalize">
							{selectedOptionValue}
						</span>
					</p>

					{valueLength > 4 && (
						<Button
							onClick={() =>
								setIsAccordionOpen((prevState) => !prevState)
							}
						>
							{isAccordionOpen ? (
								<ChevronDownIcon className="h-10 w-10 text-gray" />
							) : (
								<ChevronLeftIcon className="h-10 w-10 text-gray" />
							)}
						</Button>
					)}
				</div>

				{/* Option Values */}
				<div
					className={`grid grid-cols-4 ${
						showImage ? 'md:mt-4s mt-2' : 'mt-2'
					} lg:w-[570px]`}
				>
					{showOnlyTheseOptionValues?.map(
						(value: any, index: number) => {
							const isOptionValueSelected =
								value?.name === selectedOptionValue;

							const optionAndValue = {
								optionId: id,
								optionName: name,
								value
							};

							const isCurrentOptionInStock =
								isProductVariantInStockBySelectedOptionValues({
									...selectedOptionAndValue,
									[id]: optionAndValue
								});

							if (showImage) {
								return (
									<div
										key={index}
										className={`h-[55.12px] w-[55.12px] cursor-pointer overflow-hidden md:h-[66.14px] md:w-[66.14px] lg:h-[74.84px] lg:w-[74.84px] xl:h-[110px] xl:w-[110px] ${
											isOptionValueSelected
												? 'border-2 border-cyan'
												: 'border-cyan hover:border-2'
										}`}
										onClick={() =>
											onOptionAndValueSelect(optionAndValue)
										}
									>
										<ImageWithErrorHandler
											key={value?.imageUrl || ''}
											src={value?.imageUrl || ''}
											alt={value?.name || ''}
											width={111}
											height={110}
										/>
									</div>
								);
							}

							return (
								<button
									key={index}
									className={`text text-[12px] font-semibold uppercase leading-[14.63px] outline-none md:text-[10px] md:leading-[12.19px] lg:text-[12px] lg:leading-[14.63px] xl:text-[15px] xl:leading-[18.29px] ${
										isCurrentOptionInStock
											? 'text-gray'
											: 'cursor-not-allowed text-gray/40'
									} ${
										isOptionValueSelected
											? 'border-2 border-cyan'
											: 'border-cyan hover:border-2'
									}`}
									onClick={() =>
										isCurrentOptionInStock
											? onOptionAndValueSelect(optionAndValue)
											: null
									}
								>
									{value?.name}
								</button>
							);
						}
					)}
				</div>
			</div>
		</>
	);
}; // End of ProductOptionsValuesAccordion

export default ProductOptionsValuesAccordion;
