import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, {Option} from "components/MultiDropdown";
import Text from "components/Text";
import Card from "components/Card";
import styles from "./ProductList.module.scss";
import {Link} from "react-router-dom";
import Pagination from "../../../components/Pagination";

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

const ProductList = () => {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const [productList, setProductList] = useState<Product>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const totalPages = Math.ceil(productList.length / 9);
	const [currentList, setCurrentList] = useState<Product>([]);

	const handlePageChange = useCallback((page: number) => {
		console.log('ferb')
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		setCurrentPage(page);
		const keys: string[] = Object.keys(productList);
		const currentKeys: string[] = keys.slice(page * 9 - 9, page * 9);
		const currentItems: never[] = [];
		currentKeys.forEach((key) => {
			currentItems[key] = productList[key];
		});
		setCurrentList(currentItems);
	}, [currentPage, currentList]);

	const handleMultiDropdownChange = (newValue: Option[]) => {
		setSelectedOptions(newValue);
	};

	const OPTIONS = [
		{ key: 'msk', value: 'Moscow' },
		{ key: 'spb', value: 'Saint Petersburg' },
		{ key: 'ekb', value: 'Ekaterinburg' },
	];

	const getProductList = async () => {
		const response = await axios.get('https://api.escuelajs.co/api/v1/products');
		if (response.status === 200) {
			setProductList(response.data);
		} else {
			console.error('Ошибка при получении данных. Статус:', response.status);
		}
	};

	useEffect(() => {
		getProductList();
	}, []);

	useEffect(() => {
		handlePageChange(currentPage);
	}, [productList, currentPage]);


	return currentList ? (
		<>

			<div className={styles.text}>
				<Text view="title" tag="h1">Product</Text>
				<Text view="p-20" color="secondary">We display products based on the latest products we have, if you want<br/>
					to see our old products please enter the name of the item</Text>
			</div>

			<div className={styles.search}>
				<Input width="1079px" placeholder="Search product"/>
				<Button>Find now</Button>
			</div>
			<MultiDropdown
				options={OPTIONS}
				value={selectedOptions}
				onChange={handleMultiDropdownChange}
				getTitle={(values: Option[]) => `Filters: ${values.map(({ value }) => value).join(', ')}`}
			/>

			<div className={styles.total}>
				<Text view="title" tag="h2" className={styles.h2}>Total Product</Text>
				<Text view="p-20" color="accent" weight="bold">{productList.length}</Text>
			</div>

			<div className={styles.products}>
				{currentList.map((product) => (
					<Link to={`product/${product.id}`} key={product.id} className={styles.link}>
						<Card image={product.images} className={styles.card}
									captionSlot={product.category.name} title={product.title}
									subtitle={product.description}
									contentSlot={`$${product.price}`} actionSlot="Add to Cart"
						/>
					</Link>
				))}
			</div>

			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

		</>
	) : null;
}

export default ProductList;