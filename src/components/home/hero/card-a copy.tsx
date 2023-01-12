import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Link from 'next/link';
import { getTailwind } from 'utils/common.util';

interface CardAProps {
	imageUrl: string;
	alt?: string;
	title: string;
	name: string;
	subtitle: string;
	href: string;
}

const CardA: React.FC<CardAProps> = (props) => {
	const { title, imageUrl, alt, name, subtitle, href } = props;

	return (
		<Link
			href={href}
			// className="flex w-full flex-1 cursor-pointer flex-col gap-2 rounded-md bg-white p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:h-[280px] md:h-[240px] md:w-[226px] lg:h-[352px] lg:w-[300px] lg:p-6 xl:w-[416px] pc:h-[300px]"
			className={getTailwind(
				'flex cursor-pointer flex-col rounded-md bg-white transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg',
				{
					tablet: 'h-[240px] w-[226px]',
					desktop: 'h-[352px] w-[466px]'
				}
			)}
		>
			<h2
				className={getTailwind(
					'font-mont font-semibold capitalize text-primary-main dark:text-accent-secondary-eco',
					{
						tablet:
							'mt-[3.19px] ml-[11.14px] mr-[11.45px] text-[20px] leading-6',
						desktop: 'mx-[21px] mt-[14px] text-[25px] leading-[30px]'
					}
				)}
			>
				{title}
			</h2>
			<div
				className={getTailwind('hiddens relative block', {
					tablet:
						'mx-[11.43px] mt-[3.19px] block h-[109.63px] w-[203.41px]',
					desktop: 'mx-[23px] mt-[15px] h-[201px] w-[420px]'
				})}
			>
				<ImageWithErrorHandler
					src={imageUrl}
					alt={alt}
					fill={true}
					className="object-cover"
				/>
			</div>
			<p
				className={getTailwind(
					'font-mont capitalize leading-[22px] text-gray',
					{
						desktop: 'mx-[21px] mt-[15px] text-lg'
					}
				)}
			>
				<span className="font-mont font-bold text-primary-main dark:text-accent-secondary-eco">
					Name Here {name}
				</span>
				Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit
				amet, &nbsp; {subtitle},
			</p>
		</Link>
	);
};

export default CardA;
