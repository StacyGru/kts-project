import React from "react";
import {useNavigate} from "react-router-dom";
import SideArrowIcon from "components/icons/SideArrowIcon";
import Text from "components/Text";
import styles from "pages/Product/Product.module.scss";

const Back = () => {

	const navigate = useNavigate();
	
	return (
		<div
			onClick={() => navigate(-1)}
			className={styles.back}
		>
			<SideArrowIcon
				width={32}
				height={32}
				color="primary"
			/>
			<Text view="p-20">
				Back
			</Text>
		</div>
	);
}

export default Back;