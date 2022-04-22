import Image from 'next/image';
const CardB = () => {
	return (
		<div className="flex flex-1 flex-col justify-between gap-3 rounded bg-secondary p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:gap-0 lg:p-6  pc:h-[300px]">
			<h2 className="font-mont text-[18px] font-bold text-primary-main dark:text-accent-secondary-eco lg:text-2xl">
				What Is a RFQ?
			</h2>
			<div className="flex flex-row">
				<div>
					<div className="relative h-[40px] w-[60px] md:h-[56px] md:w-[64px] lg:h-[130px] lg:w-[150px] pc:hidden">
						<Image
							src="/static/images/TWVector.png"
							alt=""
							layout="fill"
							className="object-cover"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-4 pl-2 lg:pl-4 pc:pl-0">
					<p className="font-mont text-[12px] text-white lg:text-[21px]">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Modi, fuga?
					</p>
					<button className="lg:font-[16px] font-[12px] rounded bg-accent-secondary-main font-montserrat text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-accent-secondary-main/70 sm:w-full sm:py-2 lg:w-6/12 lg:p-1 pc:w-4/12 pc:py-[0.4rem] pc:text-xs">
						Learn More
					</button>
				</div>
			</div>
			<p className="font-mont text-base text-gray pc:hidden">
				<span className="text-home font-[18px] font-mont font-bold dark:text-accent-secondary-eco md:break-all">
					Name Here
				</span>
				&nbsp; Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor
				sit amet,
			</p>
		</div>
	);
};

export default CardB;
