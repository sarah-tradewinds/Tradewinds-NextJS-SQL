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
		image: '/static/Images/TWveg.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now'
	},
	subCategories: [
		{
			id: 1,
			clr: '#fff',
			title: 'Equ',
			img: '/static/Images/TWAgricultureMini1.png'
		},
		{
			id: 2,
			clr: '#fff',
			title: 'beans',
			img: '/static/Images/TWAgricultureMini2.png'
		},
		{
			id: 3,
			clr: '#fff',
			title: 'nuts',
			img: '/static/Images/TWAgricultureMini3.png'
		},
		{
			id: 4,
			clr: '#fff',
			title: 'cigar',
			img: '/static/Images/TWAgricultureMini4.png'
		},
		{
			id: 5,
			clr: '#fff',
			title: 'flower',
			img: '/static/Images/TWAgricultureMini5.png'
		},
		{
			id: 6,
			clr: '#fff',
			title: 'pot',
			img: '/static/Images/TWAgricultureMini6.png'
		},
		{
			id: 7,
			clr: '#fff',
			title: 'chain',
			img: '/static/Images/TWAgricultureMini7.png'
		},
		{
			id: 8,
			clr: '#fff',
			title: 'safty',
			img: '/static/Images/TWAgricultureMini7.png'
		},
		{
			id: 9,
			clr: '#fff',
			title: 'eco',
			img: '/static/Images/TWAgricultureMini7.png'
		}
	]
};

export default packs;
