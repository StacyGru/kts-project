import {observer} from "mobx-react-lite";
import React from "react";
import PageHeader from "components/PageHeader";
import Tabs from "pages/User/Tabs";

const User = () => {

	return (
		<>
			<PageHeader text="Profile"/>

			<Tabs/>
		</>
	);
}

export default observer(User);