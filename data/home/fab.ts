interface fabType {
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

const fab: fabType = {
	category: {
		title: 'Fabric & Textile Raw Material',
		image: '/static/Images/TWFabric.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#00B2C7'
	},
	subCategories: [
		{
			id: 1,
			clr: 'bg-fab',
			title: 'Fabric ',
			img: '/static/Images/TWFabricMini1.png'
		},
		{
			id: 2,
			clr: 'bg-fab',
			title: 'Fabric ',
			img: '/static/Images/TWFabricMini1.png'
		},
		{
			id: 3,
			clr: 'bg-fab',
			title: 'Yarn',
			img: '/static/Images/TWFabricMini2.png'
		},
		{
			id: 4,
			clr: 'bg-fab',
			title: 'Down & Feather ',
			img: '/static/Images/TWFabricMini3.png'
		},
		{
			id: 5,
			clr: 'bg-fab',
			title: 'Down & Feather',
			img: '/static/Images/TWFabricMini4.png'
		},
		{
			id: 6,
			clr: 'bg-fab',
			title: 'Denim Fabric',
			img: '/static/Images/TWFabricMini5.png'
		},
		{
			id: 7,
			clr: 'bg-fab',
			title: 'Textile Accessories',
			img: '/static/Images/TWFabricMini6.png'
		},
		{
			id: 8,
			clr: 'bg-fab',
			title: 'ECO-Friendly Fabric',
			img: '/static/Images/TWFabricMini7.png'
		},
		{
			id: 9,
			clr: 'bg-fab',
			title: 'eco',
			img: '/static/Images/TWAgricultureMini7.png'
		}
	]
};

export default fab;
