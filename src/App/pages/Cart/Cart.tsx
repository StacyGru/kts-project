import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import PageHeader from "components/PageHeader";
import CartList from "pages/Cart/components/CartList";
import TotalPrice from "pages/Cart/components/TotalPrice";
import rootStore from "store/RootStore";

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
			<PageHeader text="Cart"/>

			<CartList cartList={cartList}/>

			<TotalPrice
				cartListLength={cartList.length}
			/>
		</>
	);
}

export default observer(Cart);