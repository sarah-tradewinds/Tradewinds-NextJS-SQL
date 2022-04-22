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
		image: '/static/Images/TWApparel.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#C4C4C4'
	},
	subCategories: [
		{
			id: 1,
			title: 'Bath Supplies',
			img: '/static/Images/TWBabyMini1.png',
			clr: '#fff'
		},
		{
			id: 2,
			title: 'Hair Care & Styling ',
			img: '/static/Images/TWBabyMini2.png',
			clr: '#fff'
		},
		{
			id: 3,
			title: 'Fragrance & Deodorant ',
			img: '/static/Images/TWBabyMini3.png',
			clr: '#fff'
		},
		{
			id: 4,
			title: 'Tattoo Ink ',
			img: '/static/Images/TWBabyMini4.png',
			clr: '#fff'
		},
		{
			id: 5,
			title: 'Beauty Equipment',
			img: '/static/Images/TWBabyMini5.png',
			clr: '#fff'
		},
		{
			id: 6,
			title: 'Eyes',
			img: '/static/Images/TWBabyMini6.png',
			clr: '#fff'
		},
		{
			id: 7,
			title: 'Lipstick',
			img: '/static/Images/TWBabyMini7.png',
			clr: '#fff'
		}
		// {
		// 	id: 8,
		// 	title: 'safty',
		// 	img: '/static/Images/TWAgricultureMini7.png'
		// },
		// {
		// 	id: 9,
		// 	title: 'eco',
		// 	img: '/static/Images/TWAgri cultureMini7.png'
		// }
	]
};

export default appr;
