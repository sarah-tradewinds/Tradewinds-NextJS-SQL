interface beautyType {
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

const beauty: beautyType = {
	category: {
		title: 'Beauty & Personal Care',
		image: '/static/Images/TWBeauty.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#E1DDDD'
	},
	subCategories: [
		{
			id: 1,
			title: 'Bath Supplies',
			img: '/static/Images/TWBeautyMini1.png',
			clr: 'bg-homepage-bg'
		},
		{
			id: 2,
			title: 'Hair Care & Styling ',
			img: '/static/Images/TWBeautyMini2.png',
			clr: 'bg-homepage-bg'
		},
		{
			id: 3,
			title: 'Fragrance & Deodorant ',
			img: '/static/Images/TWBeautyMini3.png',
			clr: 'bg-homepage-bg'
		},
		{
			id: 4,
			title: 'Tattoo Ink ',
			img: '/static/Images/TWBeautyMini4.png',
			clr: 'bg-homepage-bg'
		},
		{
			id: 5,
			title: 'Beauty Equipment',
			img: '/static/Images/TWBeautyMini5.png',
			clr: 'bg-homepage-bg'
		},
		{
			id: 6,
			title: 'Eyes',
			img: '/static/Images/TWBeautyMini6.png',
			clr: 'bg-homepage-bg'
		},
		{
			id: 7,
			title: 'Lipstick',
			img: '/static/Images/TWBeautyMini7.png',
			clr: 'bg-homepage-bg'
		}
		// {
		// 	id: 8,
		// 	title: 'safty',
		// 	img: '/static/Images/TWAgricultureMini7.png'
		// },
		// {
		// 	id: 9,
		// 	title: 'eco',
		// 	img: '/static/Images/TWAgricultureMini7.png'
		// }
	]
};

export default beauty;
