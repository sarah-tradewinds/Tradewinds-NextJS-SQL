interface fashionType {
	category: {
		title: string;
		image: string;
		desc: string;
		btnTxt: string;
		bgHexColor?: string;
	};
	subCategories: {
		id: number;
		title: string;
		img: string;
		clr: string;
	}[];
}

const fashion: fashionType = {
	category: {
		title: 'Fashion Accessories',
		image: '/static/images/TWFashion.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#EBDEDA'
	},
	subCategories: [
		{
			id: 1,
			title: 'Fashion Accessories',
			img: '/static/images/TWFashionMini1.png',
			clr: 'bg-fashion'
		},
		{
			id: 2,
			title: 'Belts & Accessories ',
			img: '/static/images/TWFashionMini2.png',
			clr: 'bg-fashion'
		},
		{
			id: 3,
			title: 'Hair Accessories',
			img: '/static/images/TWFashionMini3.png',
			clr: 'bg-fashion'
		},
		{
			id: 4,
			title: 'Belt Buckles',
			img: '/static/images/TWFashionMini4.png',
			clr: 'bg-fashion'
		},
		{
			id: 5,
			title: 'Gloves & Mittens ',
			img: '/static/images/TWFashionMini5.png',
			clr: 'bg-fashion'
		},
		{
			id: 6,
			title: 'Hats & Caps',
			img: '/static/images/TWFashionMini6.png',
			clr: 'bg-fashion'
		},
		{
			id: 7,
			title: 'Sports Caps ',
			img: '/static/images/TWFashionMini7.png',
			clr: 'bg-fashion'
		}
		// {
		// 	id: 8,
		// 	title: 'safty',
		// 	img: '/static/images/TWAgricultureMini7.png'
		// },
		// {
		// 	id: 9,
		// 	title: 'eco',
		// 	img: '/static/images/TWAgricultureMini7.png'
		// }
	]
};

export default fashion;
