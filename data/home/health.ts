interface healthType {
	category: {
		title: string;
		slug: string;
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

const health: healthType = {
	category: {
		title: 'Health and Medical',
		slug: 'health-and-medical',
		image: '/static/Images/TWHealth.png',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
		btnTxt: 'source now',
		bgHexColor: '#BBD3DD'
	},
	subCategories: [
		{
			id: 1,
			title: 'Animal & Veterinary',
			img: '/static/Images/TWAnimalMini1.png',
			clr: 'bg-health'
		},
		{
			id: 2,
			title: 'Household Medical Devices',
			img: '/static/Images/TWAnimalMini2.png',
			clr: 'bg-health'
		},
		{
			id: 3,
			title: 'Professional Medical Devices',
			img: '/static/Images/TWAnimalMini3.png',
			clr: 'bg-health'
		},
		{
			id: 4,
			title: 'Emergency Medical Supplies & Training',
			//titleNew:'20% Off TODAY only ',
			img: '/static/Images/TWAnimalMini4.png',
			clr: 'bg-health'
		},
		{
			id: 5,
			title: 'Massage Products',
			img: '/static/Images/TWAnimalMini5.png',
			clr: 'bg-health'
		},
		{
			id: 6,
			title: 'Injection & Infusion Instrument',
			img: '/static/Images/TWAnimalMini6.png',
			clr: 'bg-health'
		},
		{
			id: 7,
			title: 'Dental Equipments',
			img: '/static/Images/TWAnimalMini6.png',
			clr: 'bg-health'
		}
	]
};

export default health;
