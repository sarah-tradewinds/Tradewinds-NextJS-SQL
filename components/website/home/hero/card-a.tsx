import Image from 'next/image';

interface CardAProps {
	imageUrl: string;
	alt?: string;
	title: string;
	name: string;
	subtitle: string;
}

const CardA: React.FC<CardAProps> = (props) => {
	const { title, imageUrl, alt, name, subtitle } = props;

	return (
		<div className="flex w-[100%] flex-1 cursor-pointer flex-col gap-2 rounded bg-white p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:h-[280px] lg:h-[400px] lg:p-6 pc:h-[300px]">
			<h2 className="font-mont font-bold text-primary-main dark:text-accent-secondary-eco sm:text-[18px] lg:text-2xl">
				{title}
			</h2>
			<div className="relative hidden h-[70%] w-full md:block">
				<Image
					src={imageUrl}
					alt={alt}
					layout="fill"
					className="object-cover"
				/>
			</div>

			<p className="font-mont text-sm text-gray lg:text-base pc:text-[12px]">
				<span className="font-mont font-bold text-primary-main dark:text-accent-secondary-eco">
					{name}
				</span>
				&nbsp; {subtitle},
			</p>
		</div>
	);
};

export default CardA;
