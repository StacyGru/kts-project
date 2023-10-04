import React, {useEffect} from "react";
import {Option} from "components/MultiDropdown";
import ProductGrid from "components/ProductGrid";
import {ProductModel} from "models/product";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";

export type ProductListProps = {
	productList: ProductModel[],
	currentPage: number,
	productStore: ProductStore,
}

const urlSearchParams = new URLSearchParams(window.location.search);

const ProductList: React.FC<ProductListProps> = ({
		productList,
		currentPage,
		productStore,
	}) => {

	const productsPerPage: number = 12;

	function filtersFromStringToOption(filters: string): Option[] {
		const optionStrings = filters.split(';');
		return optionStrings.map(item => {
			const [key, value] = item.split(',');
			return {key: parseInt(key), value};
		});
	}

	useEffect(() => {
		if (urlSearchParams.get("page")) {
			const pageParam = urlSearchParams.get("page");
			const pageNumber = pageParam !== null ? parseInt(pageParam) : 1;
			rootStore.queryParams.setPage(pageNumber);
		}
		if (urlSearchParams.get("search")) {
			const searchParam = urlSearchParams.get("search");
			const searchString = searchParam !== null ? searchParam : "";
			rootStore.queryParams.setSearchQuery(searchString);
		}
		if (urlSearchParams.get("filters")) {
			const filtersParam = urlSearchParams.get("filters");
			const filtersString = filtersParam !== null ? filtersFromStringToOption(filtersParam) : [];
			rootStore.queryParams.setFilters(filtersString);
		}
		productStore.getProductList();
	}, []);

	return (
		<ProductGrid
			productList={productList.slice(currentPage * productsPerPage - productsPerPage, currentPage * productsPerPage)}
		/>
	);
}

export default ProductList;