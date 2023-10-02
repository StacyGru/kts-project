import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ProductCard from "components/ProductCard";
import {ProductModel} from "models/product";
import rootStore from "store/RootStore";
import styles from "./ProductGrid.module.scss";

export type ProductGridProps = {
	productList:  ProductModel[]
}

const ProductGrid: React.FC<ProductGridProps> = ({
		productList
  }) => {
	const navigate = useNavigate();
	const cartListJSON = localStorage.getItem("cartList");
	const cartList = rootStore.cart.cartList;

	useEffect(() => {
		if (cartListJSON) {
			rootStore.cart.setCartList(JSON.parse(cartListJSON));
		}
	}, []);

	function handleCardClick(product: ProductModel) {
		navigate(`/product/${product.id}`);
	}

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

	return cartList && (
		<div className={styles["product-grid"]}>
			{productList.map((product) => (
				<ProductCard
					key={product.id}
					image={product.images[0]}
					captionSlot={product.category.name}
					title={product.title}
					subtitle={product.description}
					contentSlot={`$${product.price}`}
					inCart={!!cartList.find((item) => item.id === product.id)}
					onClickButton={(event) => handleButtonClick(product, event)}
					onClick={() => handleCardClick(product)}
				/>
				))}
	</div>
	);
}

export default observer(ProductGrid);