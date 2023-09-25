import MultiDropdown, {Option} from "components/MultiDropdown/MultiDropdown";
import React, {useEffect} from "react";
import globalStore from "store/RootStore/GlobalStore/GlobalStore";
import ProductStore from "store/ProductStore";

export type FiltersProps = {
	categoryList: Option[],
	selectedFilters: Option[],
	productStore: ProductStore
}

const Filters: React.FC<FiltersProps> = ({
		categoryList,
		selectedFilters,
		productStore
	}) => {

	useEffect(() => {
		globalStore.getCategoryList();
	}, []);

	const handleMultiDropdownChange = (newValue: Option[]) => {
		globalStore.setFilters(newValue);
		productStore.getProductList();
	};

	return (
		<MultiDropdown
			multiselect={false}
			options={categoryList}
			selectedOptions={selectedFilters}
			onChange={handleMultiDropdownChange}
			getValues={(values: Option[]) => `${values.map(({ value }) => value).join(', ')}`}
		/>
	);
}

export default Filters;