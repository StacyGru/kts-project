import {observer, useLocalObservable} from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Back from "pages/Product/components/Back";
import ProductCard from "pages/Product/components/ProductCard";
import RelatedItems from "pages/Product/components/RelatedItems";
import ProductStore from "store/ProductStore";

const Product = () => {
	const productStore = useLocalObservable(() => new ProductStore());
	const productList = productStore.productList;
	const product = productStore.productItem;
	const relatedItems = productStore.relatedItems;
	const { id } = useParams();

	useEffect(() => {
		window.scrollTo({
			top: 0,
		});
		if (id != null) {
			productStore.getProduct(parseInt(id));
		}
		productStore.getProductList();
	}, [id]);

	useEffect(() => {
		productStore.getRelatedItems();
	}, [productList]);

	return product && relatedItems ? (
		<>
			<Back/>

			<ProductCard
				product={product}
			/>

			<RelatedItems
				relatedItems={relatedItems}
			/>
		</>
	): null;
}

export default observer(Product);