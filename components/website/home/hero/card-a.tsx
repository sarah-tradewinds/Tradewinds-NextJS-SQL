import Image from 'next/image';
import Link from 'next/link';

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
		<Link href={href}>
			{/* <a className="flex w-[100%] flex-1 cursor-pointer flex-col gap-2 rounded bg-white p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:h-[280px] lg:h-[400px] lg:p-6 pc:h-[300px]"> */}
			<a className="flex w-full flex-1 cursor-pointer flex-col gap-2 rounded bg-white p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:h-[280px] md:h-[240px] md:w-[226px] lg:h-[352px] lg:w-[300px] lg:p-6 xl:w-[416px] pc:h-[300px]">
				<h2 className="font-mont font-bold text-primary-main dark:text-accent-secondary-eco sm:text-[18px] lg:text-2xl">
					{title}
				</h2>
				<div className="relative hidden h-[70%] w-full md:block">
					<Image
						src={imageUrl}
						alt={alt}
						layout="fill"
						className="object-cover"
						unoptimized={true}
					/>
				</div>

				<p className="font-mont text-sm text-gray lg:text-base pc:text-[12px]">
					<span className="font-mont font-bold text-primary-main dark:text-accent-secondary-eco">
						{name}
					</span>
					&nbsp; {subtitle},
				</p>
			</a>
		</Link>
	);
};

export default CardA;
