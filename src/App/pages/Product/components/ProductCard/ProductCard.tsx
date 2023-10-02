import {observer} from "mobx-react-lite";
import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "components/Button/Button";
import styles_button from "components/Button/Button.module.scss";
import Text from "components/Text";
import {ProductModel} from "models/product";
import styles from "pages/Product/Product.module.scss";
import rootStore from "store/RootStore";

export type ProductCardProps = {
	product: ProductModel
}

const ProductCard: React.FC<ProductCardProps> = ({
		product
	}) => {

	const cartList = rootStore.cart.cartList;
	const inCart = !!cartList.find((item) => item.id === product.id);
	const navigate = useNavigate();

	function handleButtonClick(product: ProductModel, event: React.MouseEvent) {
		event.stopPropagation();
		if (cartList.find((item) => item.id === product.id)) {
			navigate("/cart");
			window.scrollTo({
				top: 0,
			});
		} else {
			rootStore.cart.addToCart(product);
		}
	}

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

				<Button
					onClick={(event) => handleButtonClick(product, event)}
					className={`${styles["product-card__button"]} ${inCart ? styles_button["button--in_cart"] : null}`}
				>
					{inCart ? "In cart" : "Add to cart"}
				</Button>
			</div>
		</div>
	);
}

export default observer(ProductCard);