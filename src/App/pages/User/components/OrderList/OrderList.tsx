import {DateTime} from "luxon";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Text from "components/Text";
import rootStore from "store/RootStore";
import styles from "./OrderList.module.scss";

const OrderList = () => {

	const orderListJSON = localStorage.getItem("orderList");
	const orderList = rootStore.order.orderList;

	useEffect(() => {
		if (orderListJSON) {
			rootStore.order.setOrderList(JSON.parse(orderListJSON));
		} else {
			rootStore.order.setOrderList([]);
		}
	}, [orderListJSON]);

	function toMoscowDateTime(dateTime: Date) {
		const luxonDateTime = DateTime.fromJSDate(dateTime).setZone('Europe/Moscow');
		return  luxonDateTime.toFormat('dd.MM.yyyy HH:mm');
	}

	if (orderList.length > 0) {
		return (
			<table className={styles["table"]}>
				<thead className={styles["table_thead"]}>
				<tr>
					<th>ID</th>
					<th>Date and time</th>
					<th>Sum</th>
					<th>Products</th>
				</tr>
				</thead>
				<tbody>
				{orderList.map((order) => (
						<tr key={order.id}>
							<td>{order.id}</td>
							<td>{toMoscowDateTime(new Date(order.dateTime))}</td>
							<td>${order.sum}</td>
							<td className={styles["table__products-td"]}>{order.items.map((item) => (
								<p key={item.product.id}>{item.product.title}: ${item.product.price} x{item.amount}</p>
							))}</td>
						</tr>
					)
				)}
				</tbody>
			</table>
		);
	}
	else {
		return (
			<Text
			view="p-18"
			color="secondary"
			>
				You have no orders yet
			</Text>
		);
	}
}

export default observer(OrderList);