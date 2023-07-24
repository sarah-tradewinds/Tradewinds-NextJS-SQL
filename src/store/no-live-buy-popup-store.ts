import create from 'zustand';

interface HomeState {
	isNoLiveBuyPopupOpen: boolean;
	setIsNoLiveBuyPopupOpen: (payload?: boolean) => void;
}

const useNoLiveBuyPopupStore = create<HomeState>((set) => ({
	isNoLiveBuyPopupOpen: false,
	setIsNoLiveBuyPopupOpen: (payload) =>
		set((state) => ({
			isNoLiveBuyPopupOpen:
				payload !== undefined ? payload : !state.isNoLiveBuyPopupOpen
		}))
}));

export default useNoLiveBuyPopupStore;
