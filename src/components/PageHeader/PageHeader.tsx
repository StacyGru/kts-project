import React from "react";
import Text from "components/Text";
import styles from "./PageHeader.module.scss";

export type PageHeaderProps = {
	text: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
		text
	}) => {
	return (
		<Text
			className={styles.h1}
			view="title"
			tag="h1"
		>
			{text}
		</Text>
	);
}

export default PageHeader;