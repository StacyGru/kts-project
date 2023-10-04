import {observer} from "mobx-react-lite";
import React from "react";
import {useNavigate} from "react-router-dom";
import Text from "components/Text";
import {CartModel} from "models/cart/CartModel";
import {ProductModel} from "models/product";
import CartItem from "pages/Cart/components/CartItem";
import rootStore from "store/RootStore";
import styles from "./CartList.module.scss";

export type CartListProps = {
	cartList: CartModel[]
}

const CartList: React.FC<CartListProps> = ({
		cartList
	}) => {

	const navigate = useNavigate();

	function handleCardClick(product: ProductModel) {
		navigate(`/product/${product.id}`);
	}

	function handleButtonClick(product: ProductModel, event: React.MouseEvent) {
		event.stopPropagation();
		rootStore.cart.deleteFromCartList(product);
	}

	if (cartList.length > 0) {
		return (
			<div className={styles["cart-list"]}>
				{cartList.map((item) => (
					<CartItem
						key={item.product.id}
						image={item.product.images[0]}
						captionSlot={item.product.category.name}
						title={item.product.title}
						subtitle={item.product.description}
						contentSlot={`$${item.product.price}`}
						onClickButton={(event) => handleButtonClick(item.product, event)}
						onClick={() => handleCardClick(item.product)}
						item={item}
					/>
				))}
			</div>
		);
	} else {
		return (
			<Text
				view="p-20"
				color="secondary"
				className={styles["text-empty"]}
			>
				Your cart is empty
			</Text>
		);
	}
}

export default observer(CartList);