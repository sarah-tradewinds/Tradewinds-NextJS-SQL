import create from 'zustand';

interface AuthState {
	isAuth: boolean;
	isSignUpOpen: boolean;
	isLoginOpen: boolean;
	setIsSignUpOpen: () => any;
	setIsLoginOpen: () => any;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuth: false,
	isSignUpOpen: false,
	isLoginOpen: false,
	setIsSignUpOpen: () =>
		set((state) => ({ isSignUpOpen: !state.isSignUpOpen })),
	setIsLoginOpen: () =>
		set((state) => ({ isLoginOpen: !state.isLoginOpen }))
}));
