import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Text from "components/Text";
import CartList from "pages/Cart/components/CartList";
import TotalPrice from "pages/Cart/components/TotalPrice";
import rootStore from "store/RootStore";
import styles from "./Cart.module.scss";

const Cart = () => {
	const cartListJSON = localStorage.getItem("cartList");
	const cartList = rootStore.cart.cartList;

	useEffect(() => {
		if (cartListJSON) {
			rootStore.cart.setCartList(JSON.parse(cartListJSON));
		} else {
			rootStore.cart.setCartList([]);
		}
	}, [cartListJSON]);

	return (
		<>
			<Text
				className={styles.h1}
				view="title"
				tag="h1"
			>
				Cart
			</Text>

			<CartList cartList={cartList}/>

			<TotalPrice
				cartListLength={cartList.length}
			/>
		</>
	);
}

export default observer(Cart);