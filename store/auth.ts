import create from 'zustand';

export interface CustomerDataProps {
	id: string;
	name: string;
	token: {
		access: string;
		refresh: string;
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
		token: {
			access: '',
			refresh: ''
		}
	},
	isSignUpOpen: false,
	isLoginOpen: false,
	setCustomerData: (customerData) => {
		// localStorage.setItem('tw-email', customerData.email);
		localStorage.setItem('tw-access_token', customerData.token.access);
		localStorage.setItem(
			'tw-refresh_token',
			customerData.token.refresh
		);
		set({
			isAuth: true,
			customerData
		});
	},
	setIsSignUpOpen: () =>
		set((state) => ({ isSignUpOpen: !state.isSignUpOpen })),
	setIsLoginOpen: () =>
		set((state) => ({ isLoginOpen: !state.isLoginOpen }))
}));
