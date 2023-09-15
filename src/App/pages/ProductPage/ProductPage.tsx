import styles from "./ProductPage.module.scss";
import Text from "components/Text";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Button from "components/Button";
import Card from "components/Card";
import SideArrowIcon from "components/Icons/SideArrowIcon/SideArrowIcon.tsx";

type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: string;
	updatedAt: string;
	category: {
		id: number;
		name: string;
		image: string;
		creationAt: string;
		updatedAt: string;
	};
};

const ProductPage = () => {

	const [product, setProduct] = useState<Product>();
	const [productList, setProductList] = useState<Product>([]);
	const [relatedItems, setRelatedItems] = useState<Product>([]);
	const navigate = useNavigate();
  const { id } = useParams();

	const getProduct = async () => {
		const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
		if (response.status === 200) {
			setProduct(response.data);
		} else {
			console.error('Ошибка при получении данных. Статус:', response.status);
		}
	};
	const getProductList = async () => {
		const response = await axios.get('https://api.escuelajs.co/api/v1/products');
		if (response.status === 200) {
			setProductList(response.data);
		} else {
			console.error('Ошибка при получении данных. Статус:', response.status);
		}
	};

  useEffect(() => {
		getProduct();
	  getProductList();
	}, [id])

	useEffect(() => {
		if (productList.length > 0) {
			const related = getRelatedItems(productList, 3);
			const relatedArray: Product[] = Object.values(related);
			setRelatedItems(relatedArray);
		}
	}, [productList]);

	const getRelatedItems = useCallback((obj: [], n: number): Product[] => {
		const newObj: [] = obj.filter(item => item.id !== product.id);
		const keys = Object.keys(newObj);

		for (let i = keys.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[keys[i], keys[j]] = [keys[j], keys[i]];
		}

		const selectedKeys = keys.slice(0, n);

		const result: Record<string, Product> = {};
		for (const key of selectedKeys) {
			result[key] = newObj[key];
		}

		return result;
	}, [product]);

	return product && relatedItems ? (
		<>
			<div onClick={() => navigate(-1)} className={styles.back}>
				<SideArrowIcon width={32} height={32} color="primary" className={styles.svg}/>
				<Text view="p-20">Назад</Text>
			</div>

			<div className={styles.card}>
				<img src={product.images} alt={product.title} className={styles.img_card}/>
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
						<Card image={product.images}
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

export default ProductPage;