import React from "react";
import Button from "components/Button/Button";
import Text from "components/Text";
import styles from "pages/Cart/Cart.module.scss";
import rootStore from "store/RootStore";

export type TotalPriceProps = {
	cartListLength: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({
		cartListLength
	}) => {

	const totalPrice = rootStore.cart.totalPrice;

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