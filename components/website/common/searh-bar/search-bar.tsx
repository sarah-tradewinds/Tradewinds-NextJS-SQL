// Third party components
import { getSearchSuggestions } from 'lib/common.lib';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';

// components
import Button from '../form/button';
import Overlay from '../modal/modal';

const SearchBar: React.FC = () => {
	const [searchText, setSearchText] = useState('');
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const searchInputRef = useRef(null);

	const router = useRouter();

	const removeCategoryFilter = useCategoryStore(
		(state) => state.removeCategoryFilter
	);
	const removeSelectedCountries = useCountriesStore(
		(state) => state.removeSelectedCountries
	);

	const getSearchSuggestionsHandler = async (
		searchKeyword?: string
	) => {
		const searchQuery = searchKeyword || searchText;

		// If text is not available then I am not going to call API
		if (!searchQuery) {
			setSuggestions([]);
			return;
		}
		if (searchQuery.length <= 2) {
			return;
		}

		const data = await getSearchSuggestions(searchQuery);
		setSuggestions(data);
	}; // End of getSearchSuggestionsHandler function

	useEffect(() => {
		const { query } = router.query;
		if (!query) {
			resetAllState();
		}
	}, [router.query?.query]);

	useEffect(() => {
		const setTimeoutHandler = setTimeout(
			getSearchSuggestionsHandler,
			400
		);

		return () => clearTimeout(setTimeoutHandler);
	}, [searchText]);

	const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchTerm = (
			e.currentTarget.elements.namedItem('searchBar') as any
		).value;
		// router.push(`/product-search?query=${searchTerm}`);
	};

	const onSearchTextChange = (e: any) => {
		e.preventDefault();
		const searchTerm = e.target.value;
		setSearchText(searchTerm);
	}; // End of onSearchTextChange function

	const onSuggestionSelectHandler = (suggestion: string) => {
		setSuggestions([]);
		setShowSuggestion(false);
		setSearchText(suggestion);
		if (searchInputRef && searchInputRef.current) {
			(searchInputRef.current as any).blur();
		}
		removeCategoryFilter();
		removeSelectedCountries();
		router.push(`product-search?searchQuery=${suggestion}`);
	}; // End of onSuggestionSelectHandler function

	const onFocusHandler = () => {
		getSearchSuggestionsHandler(searchText);
		setShowSuggestion(true);
	}; // End of onFocusHandler function

	const onBlurHandler = () => {
		// setSuggestions([]);
		// setShowSuggestion(false);
	}; // End of onBlurHandler function

	const resetAllState = () => {
		setSearchText('');
		setSuggestions([]);
		setShowSuggestion(false);
	}; // End of resetAllState function

	return (
		<div>
			<form className="relative" onSubmit={searchHandler}>
				<label
					className="hidden h-[40px] w-[40vw] items-center overflow-hidden rounded-full bg-accent-primary-main transition duration-300 ease-in-out hover:ring-1 hover:ring-accent-primary-main hover:ring-opacity-90 sm:flex xl:w-[48vw] 2xl:w-[32vw]"
					htmlFor="searchBar"
				>
					<input
						type="search"
						id="searchBar"
						ref={searchInputRef}
						name="searchBar"
						value={searchText}
						// placeholder={t('search_product')}
						onChange={onSearchTextChange}
						onFocus={onFocusHandler}
						onBlur={onBlurHandler}
						aria-label="Search"
						className="h-full w-[82%] border-none pl-2 pr-2 outline-none lg:w-[95%] lg:pl-4"
					/>
					<Button
						type="submit"
						className="flex h-6 w-[16%] cursor-pointer justify-center px-0 lg:w-[4vw] xl:w-[3vw]"
					>
						<HiOutlineSearch className="h-full w-[24px]" />
					</Button>
				</label>

				{/* suggestion list */}
				{showSuggestion && suggestions.length > 0 && (
					<div className="absolute left-4 z-[9000000000000000] w-[78%] rounded-b border-t border-gray/40 bg-white lg:w-[93%]">
						<div className="px-4 pb-2">
							{suggestions.map((suggestion) => {
								if (!suggestion) {
									return null;
								}
								return (
									<Button
										key={suggestion}
										onClick={() =>
											onSuggestionSelectHandler(suggestion)
										}
										className="block min-h-[32px] !py-0 px-0 font-normal !text-gray"
									>
										{suggestion}
									</Button>
								);
							})}
						</div>
					</div>
				)}
			</form>

			<Overlay
				open={showSuggestion}
				onClick={() => setShowSuggestion(false)}
				className="!top-[80px] z-[1001] bg-black/80"
			/>
		</div>
	);
}; // End of SearchBar component

export default SearchBar;
