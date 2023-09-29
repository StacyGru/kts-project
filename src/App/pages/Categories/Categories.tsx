import styles from "pages/Products/Products.module.scss";
import Text from "components/Text";
import React from "react";

const Categories = () => {
	return (
		<>
			<div className={styles.info__text}>
				<Text view="title" tag="h1">Categories</Text>
			</div>
		</>
	);
}

export default Categories;