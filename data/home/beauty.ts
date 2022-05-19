interface beautyType {
	category: {
		title: string;
		image: { url: string };
		desc: string;
		btnTxt: string;
		bgHexColor?: string;
	};
	subCategories: {
		id: number;
		title: string;
		image: { url: string };
		clr: string;
	}[];
}

const beauty: beautyType = {
	category: {
		title: 'Beauty & Personal Care',
		image: { url: '/static/images/TWBeauty.png' },
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#E1DDDD'
	},
	subCategories: [
		{
			id: 1,
			title: 'Bath Supplies',
			image: { url: '/static/images/TWBeautyMini1.png' },
			clr: 'bg-homepage-bg'
		},
		{
			id: 2,
			title: 'Hair Care & Styling ',
			image: { url: '/static/images/TWBeautyMini2.png' },
			clr: 'bg-homepage-bg'
		},
		{
			id: 3,
			title: 'Fragrance & Deodorant ',
			image: { url: '/static/images/TWBeautyMini3.png' },
			clr: 'bg-homepage-bg'
		},
		{
			id: 4,
			title: 'Tattoo Ink ',
			image: { url: '/static/images/TWBeautyMini4.png' },
			clr: 'bg-homepage-bg'
		},
		{
			id: 5,
			title: 'Beauty Equipment',
			image: { url: '/static/images/TWBeautyMini5.png' },
			clr: 'bg-homepage-bg'
		},
		{
			id: 6,
			title: 'Eyes',
			image: { url: '/static/images/TWBeautyMini6.png' },
			clr: 'bg-homepage-bg'
		},
		{
			id: 7,
			title: 'Lipstick',
			image: { url: '/static/images/TWBeautyMini7.png' },
			clr: 'bg-homepage-bg'
		}
		// {
		//  id: 8,
		//  title: 'safty',
		//  image: {url: '/static/images/TWAgricultureMini7.png'
		// },
		// {
		//  id: 9,
		//  title: 'eco',
		//  image: {url: '/static/images/TWAgricultureMini7.png'
		// }
	]
};

export default beauty;
