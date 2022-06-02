import create from 'zustand';

export interface CustomerDataProps {
	id: string;
	name: string;
	access: {
		token: string;
		expireIn: string;
	};
	refresh: {
		token: string;
		expireIn: string;
	};
}

interface AuthState {
	isAuth: boolean;
	customerData: CustomerDataProps;
	isSignUpOpen: boolean;
	isLoginOpen: boolean;
	setCustomerData: (customerData: CustomerDataProps) => any;
	setIsSignUpOpen: () => any;
	setIsLoginOpen: () => any;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuth: false,
	customerData: {
		id: '',
		name: '',
		access: {
			token: '',
			expireIn: ''
		},
		refresh: {
			token: '',
			expireIn: ''
		}
	},
	isSignUpOpen: false,
	isLoginOpen: false,
	setCustomerData: (customerData) => {
		// localStorage.setItem('tw-access_token', customerData.access.token);
		// localStorage.setItem(
		//  'tw-refresh_token',
		//  customerData.refresh.token
		// );
		console.log(customerData);
		set({
			isAuth: true,
			customerData
		});
	},
	setIsSignUpOpen: () =>
		set((state) => ({ isSignUpOpen: !state.isSignUpOpen })),
	setIsLoginOpen: () => {
		set((state) => ({ isLoginOpen: !state.isLoginOpen }));
	}
}));
