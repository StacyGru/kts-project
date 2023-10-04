import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Button from "components/Button/Button";
import styles_button from "components/Button/Button.module.scss";
import Image from "components/Image";
import Text from "components/Text";
import OrderList from "pages/User/components/OrderList";
import rootStore from "store/RootStore";
import styles from "./Tabs.module.scss";

const Tabs = () => {
	const [activeTab, setActiveTab] = useState('info');
	const JWTJSON = localStorage.getItem("JWT");
	const user = rootStore.user.user;
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (JWTJSON) {
			rootStore.user.setTokens(JSON.parse(JWTJSON));
			rootStore.user.getUser();
			const tab = searchParams.get("activeTab");
			if (tab) {
				setActiveTab(tab);
			} else {
				navigate("?activeTab=info");
			}
		} else {
			navigate("/login");
		}
	}, []);

	function handleLogOut() {
		rootStore.user.logOut();
		navigate("/login");
	}

	const handleTabChange = (tabName: string) => {
		setActiveTab(tabName);
		navigate(`?activeTab=${tabName}`);
	}

	return user && (
		<div className={styles.tabs}>
			<div className={styles["tab-header"]}>
				<Button
					className={`${styles_button["tab-header__button"]} ${activeTab === 'info' && styles_button["tab-header__button--active"]}`}
					onClick={() => handleTabChange('info')}
				>
					Info
				</Button>
				<Button
					className={`${styles_button["tab-header__button"]} ${activeTab === 'orders' && styles_button["tab-header__button--active"]}`}
					onClick={() => handleTabChange('orders')}
				>
					Orders
				</Button>
			</div>

			<div className={styles["tab-content"]}>
				{activeTab === 'info' && (
					<div className={styles["tab-info"]}>
						<div className={styles["tab-info__user"]}>
							<div className={styles["tab-info__img-button"]}>
								<Image
									src={user.avatar}
									alt="avatar"
									avatar={true}
									className={styles.avatar}
								/>
								<Button
									onClick={handleLogOut}
									className={styles["button-logout"]}
								>
									Log out
								</Button>
							</div>
							<div className={styles["tab-info__details"]}>
								<Text view="p-18"><b>Name:</b> {user.name}</Text>
								<Text view="p-18"><b>E-mail:</b> {user.email}</Text>
								<Text view="p-18"><b>Role:</b> {user.role}</Text>
							</div>
						</div>
					</div>
				)}
				{activeTab === 'orders' && (
					<div className={styles["tab-orders"]}>
						<OrderList/>
					</div>
				)}
			</div>
		</div>
	);
}

export default observer(Tabs);