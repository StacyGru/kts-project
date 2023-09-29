import React from "react";
import Button from "components/Button/Button";
import Text from "components/Text";
import {ProductModel} from "models/product";
import styles from "pages/Product/Product.module.scss";

export type ProductCardProps = {
	product: ProductModel
}

const ProductCard: React.FC<ProductCardProps> = ({
		product
	}) => {

	return (
		<div className={styles["product-card"]}>
			<img
				src={product.images[0]}
				alt={product.title}
				className={styles["product-card__img"]}
			/>
			<div>
				<Text
					view="title"
					tag="h1"
					maxLines={parseInt("2")}
					className={styles["product-card__title"]}
				>
					{product.title}
				</Text>
				<Text
					view="p-20"
					color="secondary"
					weight="normal"
					maxLines={parseInt("3")}
					className={styles["product-card__description"]}
				>
					{product.description}
				</Text>
				<Text
					view="title"
					maxLines={parseInt("2")}
				>
					${product.price}
				</Text>
				<div className={styles["product-card__buttons"]}>
					<Button>Buy Now</Button>
					<Button color="white">Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;