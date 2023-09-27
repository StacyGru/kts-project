import React, {useEffect} from "react";
import MultiDropdown, {Option} from "components/MultiDropdown/MultiDropdown";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";

export type FiltersProps = {
	categoryList: Option[],
	selectedFilters: Option[],
	productStore: ProductStore,
	handlePageChange: (page: number) => void
}

const Filters: React.FC<FiltersProps> = ({
		categoryList,
		selectedFilters,
		productStore,
    handlePageChange
	}) => {

	useEffect(() => {
		rootStore.global.getCategoryList();
	}, []);

	const handleMultiDropdownChange = (newValue: Option[]) => {
		rootStore.global.setFilters(newValue);
		productStore.getProductList();
		handlePageChange(1);
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