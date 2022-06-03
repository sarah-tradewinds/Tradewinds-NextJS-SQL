import {
	autoLoginCustomer,
	logoutCustomer
} from 'lib/customer/auth.lib';
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
	isAuthenticating: boolean;
	isAuth: boolean;
	customerData: CustomerDataProps;
	isSignUpOpen: boolean;
	isLoginOpen: boolean;
	autoLogin: () => any;
	setCustomerData: (customerData: CustomerDataProps) => any;
	setIsSignUpOpen: () => any;
	setIsLoginOpen: () => any;
	logout: () => any;
}

const initialCustomerData = {
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
};

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticating: false,
	isAuth: false,
	customerData: initialCustomerData,
	isSignUpOpen: false,
	isLoginOpen: false,
	autoLogin: async () => {
		set({
			isAuthenticating: true
		});
		const data = await autoLoginCustomer();
		set({
			isAuth: data.isLoggedIn,
			customerData: data.customerData,
			isAuthenticating: false
		});
	},
	setCustomerData: (customerData) => {
		set({
			isAuth: true,
			customerData
		});
	},
	setIsSignUpOpen: () =>
		set((state) => ({ isSignUpOpen: !state.isSignUpOpen })),
	setIsLoginOpen: () => {
		set((state) => ({ isLoginOpen: !state.isLoginOpen }));
	},
	logout: async () => {
		await logoutCustomer();
		set({
			isAuth: false,
			customerData: initialCustomerData
		});
	}
}));
