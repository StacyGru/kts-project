import React from "react";
import Text from "components/Text";
import styles from "pages/Products/Products.module.scss";

const AboutUs = () => {
	return (
		<>
			<div className={styles.info__text}>
				<Text view="title" tag="h1">About us</Text>
			</div>
		</>
	);
}

export default AboutUs;