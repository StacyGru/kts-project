import React from "react";
import Button from "components/Button/Button";
import Input from "components/Input";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";
import styles from "pages/Products/Products.module.scss";

export type SearchProps = {
	handlePageChange: (page: number) => void,
	productStore: ProductStore,
	urlSearchParams: URLSearchParams
}

const Search: React.FC<SearchProps> = ({
		handlePageChange,
		productStore,
	  urlSearchParams
  }) => {

	function handleSearch() {
		const input = document.getElementById("search-input") as HTMLInputElement;
		if (input) {
			const value = input.value;
			rootStore.global.setSearchQuery(value);
			productStore.getProductList();
			handlePageChange(1);
		}
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
				width="1079px"
				placeholder="Search product"
				id="search-input"
				onKeyDown={handleKeyPress}
				defaultValue={urlSearchParams.get("search") ?? undefined}
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