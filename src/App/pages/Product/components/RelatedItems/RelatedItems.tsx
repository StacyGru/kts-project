import React from "react";
import Text from "components/Text";
import {ProductModel} from "models/product";
import Carousel from "pages/Product/components/Carousel";

export type RelatedItemsProps = {
	relatedItems: ProductModel[]
}

const RelatedItems: React.FC<RelatedItemsProps> = ({
		relatedItems  
	}) => {

	return (
		<>
			<Text
				view="title"
				tag="h2"
			>
				Related Items
			</Text>

			<Carousel
				blocks={relatedItems}
			/>
		</>
	);
}

export default RelatedItems;