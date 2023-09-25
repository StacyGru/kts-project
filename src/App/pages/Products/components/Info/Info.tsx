import Text from "components/Text";
import React from "react";

const Info = () => {
	return (
		<>
			<Text view="title" tag="h1">Products</Text>
			<Text view="p-20" color="secondary">We display products based on the latest products we have, if you want<br/>
				to see our old products please enter the name of the item</Text>
		</>
	);
}

export default Info;