import React, {useCallback, useEffect} from "react";
import styles from "./Products.module.scss";
import {useNavigate} from "react-router-dom";
import Pagination from "components/Pagination";
import {observer, useLocalObservable} from "mobx-react-lite";
import ProductStore from "store/ProductStore";
import globalStore from "store/RootStore/GlobalStore";
import {Option} from "components/MultiDropdown";
import Info from "pages/Products/components/Info";
import Search from "pages/Products/components/Search";
import Filters from "pages/Products/components/Filters";
import Total from "pages/Products/components/Total";
import ProductList from "pages/Products/components/ProductList";

const Products = () => {
	const productStore = useLocalObservable(() => new ProductStore());
	const productList = productStore.productList;

	const totalPages = productStore.totalPages;
	const categoryList = globalStore.categoryList;
	const navigate = useNavigate();

	const currentPage = globalStore.currentPage;
	const searchQuery = globalStore.searchQuery;
	const selectedFilters = globalStore.selectedFilters;

	const urlSearchParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		if (urlSearchParams.get("page")) {
			const pageParam = urlSearchParams.get("page");
			const pageNumber = pageParam !== null ? parseInt(pageParam) : 1;
			globalStore.setPage(pageNumber);
		}
		if (urlSearchParams.get("search")) {
			const searchParam = urlSearchParams.get("search");
			const searchString = searchParam !== null ? searchParam : "";
			globalStore.setSearchQuery(searchString);
		}
		if (urlSearchParams.get("filters")) {
			const filtersParam = urlSearchParams.get("filters");
			const filtersString = filtersParam !== null ? filtersFromStringToOption(filtersParam) : [];
			globalStore.setFilters(filtersString);
		}
	}, []);

	useEffect(() => {
		let queryParams: string = `/?page=${currentPage}`;
		if (searchQuery !== "") {
			queryParams += `&search=${searchQuery}`;
		}
		if (selectedFilters.length > 0) {
			queryParams += `&filters=${filtersFromOptionToString(selectedFilters)}`;
		}
		navigate(queryParams);
	}, [currentPage, searchQuery, selectedFilters]);

	const handlePageChange = useCallback((page: number) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		globalStore.setPage(page);
		navigate(`?page=${page}`);
	}, [currentPage]);

	function filtersFromStringToOption(filters: string): Option[] {
		const optionStrings = filters.split(';');
		return optionStrings.map(item => {
			const [key, value] = item.split(',');
			return {key: parseInt(key), value};
		});
	}

	function filtersFromOptionToString(filters: Option[]): string {
		return filters.map((filter) => `${filter.key},${filter.value}`)[0];
	}

	return productList && categoryList ? (
		<>

			<div className={styles.text}>
				<Info/>
			</div>

			<div className={styles.search}>
				<Search
					handlePageChange={handlePageChange}
					productStore={productStore}
					urlSearchParams={urlSearchParams}
				/>
			</div>
			<Filters
				categoryList={categoryList}
				selectedFilters={selectedFilters}
				productStore={productStore}
			/>

			<div className={styles.total}>
				<Total
					productList={productList}
				/>
			</div>

			<div className={styles.products}>
				<ProductList
					productList={productList}
					currentPage={currentPage}
					productStore={productStore}
				/>
			</div>

			{totalPages > 1
				? <Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
				/>
				: null
			}

		</>
	) : null;
}

export default observer(Products);