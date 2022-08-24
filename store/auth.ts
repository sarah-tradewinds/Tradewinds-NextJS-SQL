import {
	autoLoginCustomer,
	getCustomerBuyerDetails,
	logoutCustomer
} from 'lib/customer/auth.lib';
import create from 'zustand';

export interface CustomerDataProps {
	id: string;
	buyerId: string;
	name: string;
	phone?: string;
	email?: string;
	tradewinds_email?: string;

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
	buyerId: '',
	name: 'Guest',
	phone: '',
	email: '',
	tradewinds_email: '',
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
		try {
			const data = await autoLoginCustomer();
			const userId = data?.customerData?.id;
			data.customerData.buyerId = '';
			if (userId) {
				const { id, user_id } = await getCustomerBuyerDetails(userId);
				data.customerData.buyerId = id;
				data.customerData.tradewinds_email = user_id?.trade_winds_email;
			}
			set({
				isAuth: data.isLoggedIn,
				customerData: data.customerData,
				isAuthenticating: false
			});
		} catch (error) {
			set({
				isAuthenticating: false
			});
		}
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
