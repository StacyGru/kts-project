import Text from "components/Text";
import styles from "pages/Products/Products.module.scss";
import React from "react";
import {ProductModel} from "models/product";

export type TotalProps = {
	productList: ProductModel[]
}

const Total: React.FC<TotalProps> = ({
		productList
  }) => {
	return (
		<>
			<Text view="title" tag="h2" className={styles.h2}>Total Product</Text>
			<Text view="p-20" color="accent" weight="bold">{productList.length}</Text>
		</>
	);
}

export default Total;