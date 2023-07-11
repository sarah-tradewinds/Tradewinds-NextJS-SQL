// Third party components
import { getSearchSuggestions } from 'lib/common.lib';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useCountriesStore } from 'store/countries-store';
import { useCategoryStore } from 'store/eco/category-store';

// components
import { useTranslation } from 'next-i18next';
import { useHomeStore } from 'store/home';
import Button from '../form/button';
import Overlay from '../modal/modal';

interface SearchBarProps {
	placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const [searchText, setSearchText] = useState('');
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const searchInputRef = useRef(null);

	const { placeholder } = props;

	const router = useRouter();
	const { t } = useTranslation();

	const isEco = useHomeStore((state) => state.isEco);

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

		const data = await getSearchSuggestions(searchQuery, isEco);
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

	const gotToSearch = (searchTerm: string) => {
		// router.push(`/product-search?searchQuery=${searchTerm}`);

		router.push({
			pathname: '/product-search',
			query: {
				searchQuery: searchTerm
			}
		});
	};

	const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchTerm = (
			e.currentTarget.elements.namedItem('searchBar') as any
		).value;

		setShowSuggestion(false);

		gotToSearch(searchTerm);
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
		gotToSearch(suggestion);
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

	const highlighter = (text: string) => {
		const searchWords = searchText?.toLowerCase()?.split(' ');
		const words = text?.split(' ');

		const highlighted = [];
		for (const word of words) {
			if (searchWords.includes(word?.toLowerCase())) {
				highlighted.push(<strong>{` ${word} `}</strong>);
			} else {
				highlighted.push(<>{` ${word} `}</>);
			}
		}

		return <p>{highlighted}</p>;
	};

	return (
		<div>
			<form className="relative" onSubmit={searchHandler}>
				<label
					className="hidden items-center overflow-hidden rounded-full transition duration-300 ease-in-out hover:ring-1 hover:ring-accent-primary-main hover:ring-opacity-90 sm:flex sm:h-[19px] sm:w-[364px] md:w-[232.8px] lg:h-[27.82px] lg:w-[310.7px] xl:h-[31.45px] xl:w-[387px] desktop:w-[746.9px]"
					htmlFor="searchBar"
				>
					<input
						type="search"
						id="searchBar"
						ref={searchInputRef}
						name="searchBar"
						value={searchText}
						onChange={onSearchTextChange}
						onFocus={onFocusHandler}
						onBlur={onBlurHandler}
						aria-label="Search"
						className="h-full border-none pl-2 outline-none sm:w-[350px] md:w-[213px] lg:w-[284.88px] xl:w-[354.76px] desktop:w-[714.66px]"
						autoComplete="off"
						placeholder={placeholder || 'Search product'}
					/>
					<button
						type="submit"
						className="flex cursor-pointer items-center justify-center rounded-r-full bg-accent-primary-main outline-none sm:h-[18.4px] sm:w-[19.34px] lg:h-full lg:w-[25.82px] xl:w-[32.24px]"
					>
						<HiOutlineSearch className="text-white sm:h-[9.4px] sm:w-[9.4px] lg:h-[12.59px] lg:w-[12.594px] xl:h-[15.72px] xl:w-[15.72px]" />
					</button>
				</label>

				{/* suggestion list */}
				{showSuggestion && suggestions.length > 0 && (
					<div className="absolute left-4 z-[9000000000000000] w-[78%] rounded-b border-t border-gray/40 bg-white lg:w-[93%]">
						<div className="space-y-3 px-4 pb-2">
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
										className="block min-h-[32px] !py-0 px-0 !text-left font-normal !text-gray"
									>
										{highlighter(suggestion)}
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
