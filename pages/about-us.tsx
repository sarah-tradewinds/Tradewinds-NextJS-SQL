import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AboutUsPage: NextPage = () => {
	return (
		<div className="flex flex-col items-center bg-white py-8">
			<div className="w-full space-y-4 px-4 lg:w-1/2">
				<section className="space-y-4">
					<div>
						<h2 className="text-error">About TWMP</h2>
						<p className="text-sm">
							At Tradewinds Marketplace, we are dedicated to
							revolutionizing global trade by diversifying opportunities
							and empowering businesses worldwide. With our
							comprehensive suite of tools and innovative platform, we
							connect sellers and buyers from around the globe, enabling
							them to expand their reach, forge valuable partnerships,
							and thrive in the global economy.
						</p>
					</div>

					<p className="text-sm">
						Our mission is to break down barriers and create a more
						inclusive and sustainable trading environment. Through our
						visionary approach to diversifying global trade, we empower
						businesses to explore new markets, reduce reliance on a
						single source, and mitigate risks associated with
						disruptions. Our suite of tools, including the Storefront
						Catalog, Communication Center, Order Management, RFQ tool,
						and Analytics, provide sellers with the necessary resources
						to streamline operations, optimize supply chains, and drive
						business growth.
					</p>
					<p className="text-sm" id="mission">
						At Tradewinds Marketplace, we are committed to
						sustainability through our dedicated division, Tradewinds
						Eco. By curating a collection of eco-friendly products and
						promoting conscious commerce, we aim to make a positive
						impact on the environment while offering buyers sustainable
						options for their business needs.
					</p>
					<p className="text-sm">
						Join us in reshaping the future of global trade. Discover
						the power of Tradewinds Marketplace to diversify your
						business, access a global network of buyers and sellers, and
						make a difference in the world of commerce. Together,
						let&#39;s unlock new possibilities and create a more
						connected and sustainable future.
					</p>
				</section>

				{/* Mission */}
				<section className="space-y-4">
					<div>
						<h2 className="text-error">Mission</h2>
						<p className="text-sm">
							At Tradewinds Marketplace, our mission is to empower
							businesses worldwide by diversifying global trade. We are
							dedicated to providing a platform that connects buyers and
							sellers from diverse regions, cultures, and industries.
						</p>
					</div>

					<p className="text-sm" id="about-tradewinds-eco">
						We believe that by embracing diversity and promoting
						cross-border trade, we can drive economic growth, create
						opportunities for businesses of all sizes, and contribute to
						a more interconnected and sustainable global economy.
					</p>
					<p className="text-sm">
						Through our commitment to diversifying global trade, we aim
						to empower businesses to explore new markets, forge valuable
						partnerships, and achieve their fullest potential on a
						global scale.
					</p>
				</section>

				{/* About Tradewinds ECO */}
				<section className="space-y-4">
					<div>
						<h2 className="text-error">About Tradewinds ECO</h2>
						<p className="text-sm">
							At Tradewinds Eco, we are on a mission to connect the
							world to eco-friendly products and inspire conscious
							commerce. With a vision of a future where businesses are
							investors in the quality of the earth, we strive to make a
							positive environmental impact through our curated
							collection of trusted, high-quality products.
						</p>
					</div>

					<p className="text-sm">
						Tradewinds Eco is more than just a marketplace; we are a
						catalyst for change. By offering a diverse range of
						eco-friendly options, we enable businesses to make informed
						choices that contribute to a healthier planet. Our
						commitment to sustainability drives us to source products
						that meet rigorous environmental standards, ensuring that
						each purchase is a step towards a more sustainable future.
					</p>
					<p className="text-sm">
						We believe that conscious commerce can create a lasting
						impact. By choosing eco-friendly products on Tradewinds Eco,
						businesses become agents of change, supporting ethical
						manufacturing practices and reducing their carbon footprint.
						Together, we can enjoy a healthier planet and create a
						better world for future generations.
					</p>
					<p className="text-sm">
						Join us in our journey to inspire conscious commerce and
						explore the possibilities of Tradewinds Eco. Together,
						let&#39;s make a difference and shape a future where
						businesses thrive while preserving our precious environment.
					</p>
				</section>

				<section className="space-y-4 pt-8">
					<h1 className="font-semibold">
						Sustainable Product Qualifications: Driving the Future of
						Conscious Consumption
					</h1>
					<p className="text-sm">
						At Tradewinds ECO, we are guided by the firm belief that
						sustainability is the key to our future. We understand that
						the choices we make today have a lasting impact. That&#39;s
						why we carefully curate a collection of brands that align
						with our seven-point standard, ensuring that every product
						meets the highest sustainability qualifications:
					</p>
					<ul className="ml-8 list-disc text-sm">
						<li>
							Organic: Products made with organic materials, promoting
							environmental health.
						</li>
						<li>
							Biodegradable: Items that naturally break down over time,
							minimizing waste.
						</li>
						<li>
							Nontoxic: Products that are free from harmful chemicals,
							ensuring safety for both people and the planet.
						</li>
						<li>
							Ethically and sustainably produced: Items created through
							fair labor practices and environmentally responsible
							manufacturing methods.
						</li>
						<li>
							Sustainably sourced: Materials sourced in a way that
							protects ecosystems and supports long-term ecological
							balance.
						</li>
						<li>
							Cruelty-free: Products that are not tested on animals,
							promoting compassion and ethical practices.
						</li>
						<li>
							Renewable: Items made from renewable resources, reducing
							reliance on finite materials.
						</li>
					</ul>
					<p className="text-sm">
						By adhering to these qualifications, we empower our
						customers to make conscious choices and contribute to a more
						sustainable future.
					</p>
				</section>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default AboutUsPage;
