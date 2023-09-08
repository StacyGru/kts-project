import axios from "axios";
import {useEffect, useState} from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, {Option} from "components/MultiDropdown";
import Text from "components/Text";
import Card from "../../../components/Card";
import styles from "./ProductList.module.scss";

const ProductList = () => {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const [data, setData] = useState<any>([]);

	const handleMultiDropdownChange = (newValue: Option[]) => {
		setSelectedOptions(newValue);
	};

	const OPTIONS = [
		{ key: 'msk', value: 'Moscow' },
		{ key: 'spb', value: 'Saint Petersburg' },
		{ key: 'ekb', value: 'Ekaterinburg' },
	];

	useEffect(() => {
		axios.get('https://api.escuelajs.co/api/v1/products').then((response) => {
			setData(response.data);
		});
		console.log(data);
	}, [])

	return data && (
		<>

			<div className={`${styles.text}`}>
				<Text view="title" tag="h1">Product</Text>
				<Text view="p-20" color="secondary">We display products based on the latest products we have, if you want<br/>
					to see our old products please enter the name of the item</Text>
			</div>

			<div className={`${styles.search}`}>
				<Input width="1079px" placeholder="Search product"/>
				<Button>Find now</Button>
			</div>
			<MultiDropdown
				options={OPTIONS}
				value={selectedOptions}
				onChange={handleMultiDropdownChange}
				getTitle={(values: Option[]) => `Filters: ${values.map(({ value }) => value).join(', ')}`}
			/>

			<div className={`${styles.total}`}>
				<Text view="title" tag="h2" className={`${styles.h2}`}>Total Product</Text>
				<Text view="p-20" color="accent" weight="bold">{data.length}</Text>
			</div>

			<div className={`${styles.products}`}>
				{data.map((product) => (
					<Card image={product.images} className={`${styles.card}`}
								captionSlot={product.category.name} title={product.title}
								subtitle={product.description}
								contentSlot={`$${product.price}`} actionSlot="Add to Cart"
					/>
				))}
			</div>

		</>
	);
}

export default ProductList;