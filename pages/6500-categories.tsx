import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { Tab } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CategoriesPage: NextPage = () => {
	const { t } = useTranslation();

	const alphabets = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];

	const trendings = {
		A: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		B: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		C: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		D: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		E: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		F: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		G: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		H: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		I: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		K: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		L: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		M: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		N: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		O: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		P: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		Q: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		R: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		S: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		T: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		U: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		V: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		W: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		X: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		Y: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		],
		Z: [
			'Abrasives',
			'Access Control Systems & Products',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Action Figure',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products',
			'Abrasives',
			'Access Control Systems & Products'
		]
	};

	const trendingElements1: any[] = [];
	const trendingElements2: any[] = [];
	const trendingElements3: any[] = [];
	const trendingElements4: any[] = [];
	const trendingElements5: any[] = [];
	for (const alphabet in trendings) {
		const trendingList = (trendings as any)[alphabet] || [];
		const elem = (
			<div key={alphabet} className="mb-8">
				<p className="inline-block border-b-2 text-[15px] font-semibold">
					{alphabet}
				</p>

				<div>
					{trendingList.map((trending: string) => {
						return (
							<p
								key={trending}
								className="cursor-pointer hover:font-semibold hover:text-cyan hover:underline"
							>
								{trending}
							</p>
						);
					})}
				</div>
			</div>
		);

		if (trendingElements1.length <= 6) {
			trendingElements1.push(elem);
		} else if (trendingElements2.length <= 6) {
			trendingElements2.push(elem);
		} else if (trendingElements3.length <= 6) {
			trendingElements3.push(elem);
		} else if (trendingElements4.length <= 6) {
			trendingElements4.push(elem);
		} else if (trendingElements5.length <= 6) {
			trendingElements5.push(elem);
		}
	} // End of for loop

	return (
		<div className="relative bg-cyan">
			<div className="relative">
				<div className="absolutes h-[320px] w-full bg-[url(/trending.png)] lg:h-[420px]">
					{/* <Image src="/trending.png" alt="trending" layout="fill" /> */}
				</div>

				<div className="absolute top-1/2 -translate-y-1/2 transform pl-4">
					<h2 className="bg-gradient-to-r from-green to-primary-main bg-clip-text font-semibold  text-transparent md:text-[43px] lg:text-[75px]">
						Over 6,500 products
					</h2>
					<p className="bg-gradient-to-r from-green to-primary-main bg-clip-text font-semibold text-transparent md:text-[18px] lg:text-[37px] ">
						Source from around the world in one place
					</p>
				</div>
			</div>

			<div className="md:p-4">
				<Tab.Group>
					<Tab.List className="mx-2 justify-center md:ml-16 pc:flex">
						<Tab className="mr-4 rounded-t-lg bg-white px-4 text-[25px] font-semibold">
							Catagories
						</Tab>
						<Tab className="rounded-t-lg bg-white px-4 text-[25px] font-semibold opacity-60">
							Products
						</Tab>
					</Tab.List>

					<Tab.Panels>
						<Tab.Panel>
							<div className="rounded-md bg-white">
								<div className="flex items-center justify-between p-4 lg:space-x-16 lg:p-8">
									{/* Line */}
									<div className="hidden h-[2px] w-[17px] rounded-full bg-green md:block lg:w-full"></div>

									{/* List of alphabets */}
									<div className="flex flex-wrap md:flex-nowrap lg:space-x-4">
										{alphabets.map((alphabet) => {
											return (
												<p
													key={alphabet}
													className="mx-2 cursor-pointer border-b-2 border-green bg-gradient-to-r from-green to-primary-eco bg-clip-text text-[18px] text-transparent lg:text-[24px]"
												>
													{alphabet}
												</p>
											);
										})}
									</div>

									{/* Line */}
									<div className="hidden h-[2px] w-[17px] rounded-full bg-primary-main md:block lg:w-full"></div>
								</div>

								{/* Trending */}
								{/* <div className="grid grid-cols-4 px-8">
									<div>{trendingElements1}</div>
									<div>{trendingElements2}</div>
									<div>{trendingElements3}</div>
									<div>{trendingElements4}</div>
									<div>{trendingElements5}</div>
								</div> */}

								<div className="columns-1 gap-8 p-8 md:columns-3 lg:columns-5">
									{alphabets.map((alphabet, index) => {
										const trendingList =
											(trendings as any)[alphabet] || [];

										if (trendingList.length <= 0) return null;
										return (
											<div key={alphabet} className="mb-8">
												<p className="inline-block border-b-2 text-[15px] font-semibold">
													{alphabet}
												</p>

												<div>
													{trendingList.map((trending: string) => {
														return (
															<p
																key={trending}
																className="cursor-pointer hover:font-semibold hover:text-cyan hover:underline"
															>
																{trending}
															</p>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</Tab.Panel>
						<Tab.Panel>Content 2</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}; // End of CategoriesPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default CategoriesPage;
