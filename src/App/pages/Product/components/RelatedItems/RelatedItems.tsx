import React from "react";
import ProductGrid from "components/ProductGrid";
import Text from "components/Text";
import {ProductModel} from "models/product";

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
			<ProductGrid
				productList={relatedItems}
			/>
		</>
	);
}

export default RelatedItems;