interface packsType {
	category: {
		title: string;
		image: string;
		desc: string;
		btnTxt: string;
	};
	subCategories: {
		id: number;
		title: string;
		img: string;
		clr: string;
	}[];
}

const packs: packsType = {
	category: {
		title: 'Agriculture',
		image: '/static/images/TWveg.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now'
	},
	subCategories: [
		{
			id: 1,
			clr: '#fff',
			title: 'Equ',
			img: '/static/images/TWAgricultureMini1.png'
		},
		{
			id: 2,
			clr: '#fff',
			title: 'beans',
			img: '/static/images/TWAgricultureMini2.png'
		},
		{
			id: 3,
			clr: '#fff',
			title: 'nuts',
			img: '/static/images/TWAgricultureMini3.png'
		},
		{
			id: 4,
			clr: '#fff',
			title: 'cigar',
			img: '/static/images/TWAgricultureMini4.png'
		},
		{
			id: 5,
			clr: '#fff',
			title: 'flower',
			img: '/static/images/TWAgricultureMini5.png'
		},
		{
			id: 6,
			clr: '#fff',
			title: 'pot',
			img: '/static/images/TWAgricultureMini6.png'
		},
		{
			id: 7,
			clr: '#fff',
			title: 'chain',
			img: '/static/images/TWAgricultureMini7.png'
		},
		{
			id: 8,
			clr: '#fff',
			title: 'safty',
			img: '/static/images/TWAgricultureMini7.png'
		},
		{
			id: 9,
			clr: '#fff',
			title: 'eco',
			img: '/static/images/TWAgricultureMini7.png'
		}
	]
};

export default packs;
