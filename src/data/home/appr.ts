interface apprType {
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

const appr: apprType = {
	category: {
		title: 'Apparel',
		image: '/static/images/TWApparel.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#C4C4C4'
	},
	subCategories: [
		{
			id: 1,
			title: 'Bath Supplies',
			img: '/static/images/TWBabyMini1.png',
			clr: '#fff'
		},
		{
			id: 2,
			title: 'Hair Care & Styling ',
			img: '/static/images/TWBabyMini2.png',
			clr: '#fff'
		},
		{
			id: 3,
			title: 'Fragrance & Deodorant ',
			img: '/static/images/TWBabyMini3.png',
			clr: '#fff'
		},
		{
			id: 4,
			title: 'Tattoo Ink ',
			img: '/static/images/TWBabyMini4.png',
			clr: '#fff'
		},
		{
			id: 5,
			title: 'Beauty Equipment',
			img: '/static/images/TWBabyMini5.png',
			clr: '#fff'
		},
		{
			id: 6,
			title: 'Eyes',
			img: '/static/images/TWBabyMini6.png',
			clr: '#fff'
		},
		{
			id: 7,
			title: 'Lipstick',
			img: '/static/images/TWBabyMini7.png',
			clr: '#fff'
		}
		// {
		// 	id: 8,
		// 	title: 'safty',
		// 	img: '/static/images/TWAgricultureMini7.png'
		// },
		// {
		// 	id: 9,
		// 	title: 'eco',
		// 	img: '/static/images/TWAgri cultureMini7.png'
		// }
	]
};

export default appr;
