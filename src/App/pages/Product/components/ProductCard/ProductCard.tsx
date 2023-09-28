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
		<div className={styles.card}>
			<img
				src={product.images[0]}
				alt={product.title}
				className={styles.img_card}
			/>
			<div>
				<Text
					view="title"
					tag="h1"
					maxLines={parseInt("2")}
					className={styles.title}
				>
					{product.title}
				</Text>
				<Text
					view="p-20"
					color="secondary"
					weight="normal"
					maxLines={parseInt("3")}
					className={styles.description}
				>
					{product.description}
				</Text>
				<Text
					view="title"
					maxLines={parseInt("2")}
					className={styles.price}
				>
					${product.price}
				</Text>
				<div className={styles.buttons}>
					<Button>Buy Now</Button>
					<Button color="white">Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;