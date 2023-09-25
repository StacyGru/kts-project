import styles from "./ProductPage.module.scss";
import Text from "components/Text";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, { useEffect } from "react";
import Button from "components/Button";
import Card from "components/Card";
import SideArrowIcon from "components/Icons/SideArrowIcon/SideArrowIcon";
import {observer, useLocalObservable} from "mobx-react-lite";
import ProductStore from "store/ProductStore";

const ProductPage = () => {
	const productStore = useLocalObservable(() => new ProductStore());
	const productList = productStore.productList;
	const product = productStore.productItem;
	const relatedItems = productStore.relatedItems;
	const navigate = useNavigate();
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
			<div onClick={() => navigate(-1)} className={styles.back}>
				<SideArrowIcon width={32} height={32} color="primary" className={styles.svg}/>
				<Text view="p-20">Назад</Text>
			</div>

			<div className={styles.card}>
				<img src={product.images[0]} alt={product.title} className={styles.img_card}/>
				<div>
					<Text view="title" tag="h1" maxLines={parseInt("2")} className={styles.title}>{product.title}</Text>
					<Text view="p-20" color="secondary" weight="normal" maxLines={parseInt("3")} className={styles.description}>
						{product.description}</Text>
					<Text view="title" maxLines={parseInt("2")} className={styles.price}>${product.price}</Text>
					<div className={styles.buttons}>
						<Button>Buy Now</Button>
						<Button color="white">Add to Cart</Button>
					</div>
				</div>
			</div>

			<Text view="title" tag="h2" className={styles.related_items_title}>Related Items</Text>
			<div className={styles.related_items_block}>
				{relatedItems.map((product) => (
					<Link to={`product/${product.id}`} key={product.id} className={styles.link}>
						<Card image={product.images[0]}
						      captionSlot={product.category.name} title={product.title}
						      subtitle={product.description}
						      contentSlot={`$${product.price}`} actionSlot="Add to Cart"
						/>
					</Link>
				))}
			</div>
		</>
	) : null;
}

export default observer(ProductPage);