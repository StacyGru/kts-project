import React from "react";
import Text from "components/Text";
import {ProductModel} from "models/product";
import styles from "pages/Products/Products.module.scss";

export type TotalProps = {
	productList: ProductModel[]
}

const Total: React.FC<TotalProps> = ({
		productList
  }) => {
	return (
		<div className={styles.total}>
			<Text
				view="title"
				tag="h2"
				className={styles.total__h2}
			>
				Total Product
			</Text>
			<Text
				view="p-20"
				color="accent"
				weight="bold"
			>
				{productList.length}
			</Text>
		</div>
	);
}

export default Total;