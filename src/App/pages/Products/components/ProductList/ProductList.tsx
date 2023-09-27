import {Link} from "react-router-dom";
import styles from "pages/Products/Products.module.scss";
import Card from "components/Card";
import React, {useEffect} from "react";
import {ProductModel} from "models/product";
import ProductStore from "store/ProductStore";

export type ProductListProps = {
	productList: ProductModel[],
	currentPage: number,
	productStore: ProductStore
}

const ProductList: React.FC<ProductListProps> = ({
		productList,
		currentPage,
		productStore
	}) => {

	useEffect(() => {
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