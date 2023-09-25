import styles from "pages/ProductList/ProductList.module.scss";
import Text from "components/Text";
import React from "react";

const AboutUs = () => {
	return (
		<>
			<div className={styles.text}>
				<Text view="title" tag="h1">About us</Text>
			</div>
		</>
	);
}

export default AboutUs;