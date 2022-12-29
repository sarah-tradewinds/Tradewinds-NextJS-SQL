import create from 'zustand';

interface HomeState {
	isOpen: boolean;
	isEco: boolean;
	setIsEco: () => void;
	setIsOpen: () => void;
	isHidden: boolean;
	setIsHidden: () => void;
}

const useHomeStore = create<HomeState>((set) => ({
	isEco: false,
	isOpen: false,
	setIsEco: () => set((state) => ({ isEco: !state.isEco })),
	setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
	isHidden: true,
	setIsHidden: () => set((state) => ({ isHidden: !state.isHidden }))
}));

export { useHomeStore };
