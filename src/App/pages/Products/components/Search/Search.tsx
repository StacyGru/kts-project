import React, {useState} from "react";
import Button from "components/Button/Button";
import Input from "components/Input";
import styles from "pages/Products/Products.module.scss";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";

export type SearchProps = {
	handlePageChange: (page: number) => void,
	productStore: ProductStore,
	urlSearchParams: URLSearchParams,
}

const Search: React.FC<SearchProps> = ({
		handlePageChange,
		productStore,
	  urlSearchParams,
  }) => {

	const [searchString, setSearchString] = useState(urlSearchParams.get("search") ?? "");

	function handleSearch() {
		rootStore.queryParams.setSearchQuery(searchString);
		productStore.getProductList();
		handlePageChange(1);
	}

	function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSearch();
		}
	}

	return (
		<div className={styles.search}>
			<Input
				placeholder="Search product"
				id="search-input"
				onKeyDown={handleKeyPress}
				value={searchString}
				onChange={(value) => setSearchString(value)}
				flexGrow="1"
			/>
			<Button
				onClick={handleSearch}
				id="search-button"
			>
				Find now
			</Button>
		</div>
	);
}

export default Search;