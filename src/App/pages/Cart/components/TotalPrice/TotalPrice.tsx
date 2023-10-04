import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "components/Button/Button";
import Text from "components/Text";
import {OrderModel} from "models/order/OrderModel";
import styles from "pages/Cart/Cart.module.scss";
import rootStore from "store/RootStore";

export type TotalPriceProps = {
	cartListLength: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({
		cartListLength
	}) => {

	const totalPrice = rootStore.cart.totalPrice;
	const navigate = useNavigate();
	const [newOrderItemId, setNewOrderItemId] = useState(1);

	useEffect(() => {
		const orderListJSON = localStorage.getItem("orderList");
		let orderList: OrderModel[] = [];
		if (orderListJSON) {
			orderList = JSON.parse(orderListJSON);
		}
		if (orderList && orderList.length > 0) {
			const maxId: number = Math.max(...orderList.map(order => order.id));
			setNewOrderItemId(maxId + 1);
		}
	}, []);

	function handleOrder() {
		const order: OrderModel = {
			id: newOrderItemId,
			dateTime: new Date(),
			items: rootStore.cart.cartList,
			sum: totalPrice
		}
		rootStore.order.addOrder(order);
		navigate("/user?activeTab=orders")
	}

	if (cartListLength > 0) {
		return (
			<div className={styles.total}>

				<div className={styles.total__price}>
					<Text
						view="p-20"
					>
						Total:
					</Text>
					<Text
						view="p-20"
						weight="bold"
					>
						${totalPrice}
					</Text>
				</div>

				<Button
					className={styles.total__button}
					onClick={handleOrder}
				>
					Order
				</Button>

			</div>
		);
	} else {
		return null;
	}
}

export default TotalPrice;