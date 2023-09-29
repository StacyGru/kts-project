import {observer, useLocalObservable} from "mobx-react-lite";
import React, {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Option} from "components/MultiDropdown";
import Pagination from "components/Pagination";
import Filters from "pages/Products/components/Filters";
import Info from "pages/Products/components/Info";
import ProductList from "pages/Products/components/ProductList";
import Search from "pages/Products/components/Search";
import Total from "pages/Products/components/Total";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";

const Products = () => {
	const productStore = useLocalObservable(() => new ProductStore());
	const productList = productStore.productList;

	const totalPages = productStore.totalPages;
	const categoryList = rootStore.global.categoryList;
	const navigate = useNavigate();

	const currentPage = rootStore.global.currentPage;
	const searchQuery = rootStore.global.searchQuery;
	const selectedFilters = rootStore.global.selectedFilters;

	const urlSearchParams = new URLSearchParams(window.location.search);

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
		rootStore.global.setPage(page);
		navigate(`?page=${page}`);
	}, [currentPage]);

	function filtersFromOptionToString(filters: Option[]): string {
		return filters.map((filter) => `${filter.key},${filter.value}`)[0];
	}

	return productList && categoryList ? (
		<>
			<Info/>

			<Search
				handlePageChange={handlePageChange}
				productStore={productStore}
				urlSearchParams={urlSearchParams}
			/>

			<Filters
				categoryList={categoryList}
				selectedFilters={selectedFilters}
				productStore={productStore}
				handlePageChange={handlePageChange}
			/>

			<Total
				productList={productList}
			/>

			<ProductList
				productList={productList}
				currentPage={currentPage}
				productStore={productStore}
			/>

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