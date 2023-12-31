import {
	autoLoginCustomer,
	logoutCustomer
} from 'lib/customer/auth.lib';
import create from 'zustand';

export interface CustomerDataProps {
	userId: string;
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
	isSelectSignUpOpen: boolean;
	isLoginOpen: boolean;
	freeTrailOpen: boolean;

	autoLogin: () => any;
	setCustomerData: (customerData: CustomerDataProps) => any;
	setIsSignUpOpen: () => any;
	setIsSelectSignUpOpen: () => any;
	setIsLoginOpen: () => any;
	logout: () => any;
	setFreeTrailClose: (isOpen?: boolean) => any;
}

const initialCustomerData = {
	userId: '',
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
	isSelectSignUpOpen: false,
	isLoginOpen: false,
	freeTrailOpen: false,

	autoLogin: async () => {
		set({
			isAuthenticating: true
		});

		const rawCustomerInfo = localStorage.getItem('customerData');

		if (rawCustomerInfo) {
			set({
				isAuth: true,
				customerData: JSON.parse(rawCustomerInfo),
				isAuthenticating: false
			});
			return;
		}

		try {
			const { customerData, isLoggedIn } =
				(await autoLoginCustomer()) || {};

			if (typeof window !== 'undefined') {
				localStorage.setItem('access_token', customerData.access.token);
			}

			set({
				isAuth: isLoggedIn || false,
				customerData: customerData,
				isAuthenticating: false
			});
		} catch (error) {
			set({
				isAuthenticating: false
			});
		}
	},
	setCustomerData: (customerData) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('access_token', customerData.access.token);
		}

		set({
			isAuth: true,
			customerData
		});
	},

	setIsSignUpOpen: () => {
		set((state) => ({ isSignUpOpen: !state.isSignUpOpen }));
	},
	setIsSelectSignUpOpen: () => {
		set((state) => ({ isSelectSignUpOpen: !state.isSelectSignUpOpen }));
	},
	setIsLoginOpen: () => {
		set((state) => ({ isLoginOpen: !state.isLoginOpen }));
	},
	logout: async () => {
		await logoutCustomer();
		localStorage.removeItem('customerData');
		localStorage.removeItem('access_token');
		set({
			isAuth: false,
			customerData: initialCustomerData
		});
	},
	setFreeTrailClose: (isOpen?: boolean) => {
		set((state) => {
			const updatedFreeTrailOpen = !state.freeTrailOpen;
			localStorage.setItem(
				'is_free_trial_popup_shown',
				JSON.stringify(true)
			);

			// console.log('freeTrailOpen-freeTrailOpen =', {
			// 	updatedFreeTrailOpen
			// });

			return {
				freeTrailOpen:
					isOpen !== undefined ? isOpen : updatedFreeTrailOpen
			};
		});
	}
}));
