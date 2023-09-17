import React, {useCallback, useEffect, useState} from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, {Option} from "components/MultiDropdown";
import Text from "components/Text";
import Card from "components/Card";
import styles from "./ProductList.module.scss";
import {Link} from "react-router-dom";
import Pagination from "../../../components/Pagination";
import {observer, useLocalObservable} from "mobx-react-lite";
import ProductStore from "../../../store/ProductStore";

const ProductList = () => {
	const productStore = useLocalObservable(() => new ProductStore());
	const productList = productStore.resultList;
	const currentPage = productStore.currentPage;
	const currentList = productStore.currentList;
	const totalPages = productStore.totalPages;
	const categoryList = productStore.categoryList;
	const selectedFilters = productStore.selectedFilters;

	const handlePageChange = useCallback((page: number) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		productStore.setPage(page);
		productStore.saveCurrentPageToLocalStorage();
	}, [currentPage, currentList]);

	const handleMultiDropdownChange = (newValue: Option[]) => {
		productStore.setFilters(newValue);
	};

	useEffect(() => {
		productStore.getProductList();
		productStore.getCategoryList();
	}, [productStore]);

	useEffect(() => {
		productStore.restoreCurrentPageFromLocalStorage();
	}, [productList, currentPage]);

	function handleSearch() {
		const input = document.getElementById("search-input") as HTMLInputElement;
		if (input) {
			const value = input.value;
			productStore.setSearchQuery(value);
			handlePageChange(1);
		}
	}

	function handleKeyPress(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSearch();
		}
	}

	return currentList && categoryList ? (
		<>

			<div className={styles.text}>
				<Text view="title" tag="h1">Product</Text>
				<Text view="p-20" color="secondary">We display products based on the latest products we have, if you want<br/>
					to see our old products please enter the name of the item</Text>
			</div>

			<div className={styles.search}>
				<Input width="1079px" placeholder="Search product" id="search-input" onKeyDown={handleKeyPress}/>
				<Button onClick={handleSearch} id="search-button">Find now</Button>
			</div>
			<MultiDropdown
				options={categoryList}
				selectedOptions={selectedFilters}
				onChange={handleMultiDropdownChange}
				getValues={(values: Option[]) => `${values.map(({ value }) => value).join(', ')}`}
			/>

			<div className={styles.total}>
				<Text view="title" tag="h2" className={styles.h2}>Total Product</Text>
				<Text view="p-20" color="accent" weight="bold">{productList.length}</Text>
			</div>

			<div className={styles.products}>
				{currentList.map((product) => (
					<Link to={`product/${product.id}`} key={product.id} className={styles.link}>
						<Card image={product.images[0]} className={styles.card}
									captionSlot={product.category.name} title={product.title}
									subtitle={product.description}
									contentSlot={`$${product.price}`} actionSlot="Add to Cart"
						/>
					</Link>
				))}
			</div>

			{totalPages > 1
				? <Pagination currentPage={currentPage} totalPages={productStore.totalPages} onPageChange={handlePageChange} />
				: null
			}

		</>
	) : null;
}

export default observer(ProductList);