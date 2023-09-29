import React from "react";
import {Link} from "react-router-dom";
import Card from "components/Card";
import {ProductModel} from "models/product";
import styles from "./ProductGrid.module.scss";

export type ProductGridProps = {
	productList:  ProductModel[]
}

const ProductGrid: React.FC<ProductGridProps> = ({
		productList
  }) => {
	return (
		<div className={styles["product-grid"]}>
			{productList.map((product) => (
				<Link
					to={`/product/${product.id}`}
					key={product.id}
					className={styles["product-grid__link"]}
				>
					<Card
						image={product.images[0]}
						captionSlot={product.category.name} title={product.title}
						subtitle={product.description}
						contentSlot={`$${product.price}`} actionSlot="Add to Cart"
					/>
				</Link>
				))}
	</div>
	);
}

export default ProductGrid;