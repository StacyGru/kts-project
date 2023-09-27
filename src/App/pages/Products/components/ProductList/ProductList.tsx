import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Card from "components/Card";
import {Option} from "components/MultiDropdown";
import {ProductModel} from "models/product";
import styles from "pages/Products/Products.module.scss";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";

export type ProductListProps = {
	productList: ProductModel[],
	currentPage: number,
	productStore: ProductStore
}

const urlSearchParams = new URLSearchParams(window.location.search);

const ProductList: React.FC<ProductListProps> = ({
		productList,
		currentPage,
		productStore
	}) => {

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
			rootStore.global.setPage(pageNumber);
		}
		if (urlSearchParams.get("search")) {
			const searchParam = urlSearchParams.get("search");
			const searchString = searchParam !== null ? searchParam : "";
			rootStore.global.setSearchQuery(searchString);
		}
		if (urlSearchParams.get("filters")) {
			const filtersParam = urlSearchParams.get("filters");
			const filtersString = filtersParam !== null ? filtersFromStringToOption(filtersParam) : [];
			rootStore.global.setFilters(filtersString);
		}
		productStore.getProductList();
	}, []);

	return (
		<>
			{productList.slice(currentPage * 9 - 9, currentPage * 9).map((product) => (
				<Link to={`product/${product.id}`} key={product.id} className={styles.link}>
					<Card image={product.images[0]} className={styles.card}
					      captionSlot={product.category.name} title={product.title}
					      subtitle={product.description}
					      contentSlot={`$${product.price}`} actionSlot="Add to Cart"
					/>
				</Link>
			))}
		</>
	);
}

export default ProductList;