import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "components/Button/Button";
import styles_button from "components/Button/Button.module.scss";
import Image from "components/Image";
import Text from "components/Text";
import rootStore from "store/RootStore";
import styles from "./Tabs.module.scss";

const Tabs = () => {
	const [activeTab, setActiveTab] = useState('Info');
	const JWTJSON = localStorage.getItem("JWT");
	const user = rootStore.user.user;
	const navigate = useNavigate();

	useEffect(() => {
		if (JWTJSON) {
			rootStore.user.setTokens(JSON.parse(JWTJSON));
			rootStore.user.getUser();
		} else {
			navigate("/login");
		}
	}, []);

	function handleLogOut() {
		localStorage.removeItem("JWT");
		navigate("/login");
	}

	const handleTabChange = (tabName: string) => {
		setActiveTab(tabName);
	}

	return user && (
		<div className={styles.tabs}>
			<div className={styles["tab-header"]}>
				<Button
					className={`${styles_button["tab-header__button"]} ${activeTab === 'Info' && styles_button["tab-header__button--active"]}`}
					onClick={() => handleTabChange('Info')}
				>
					Info
				</Button>
				<Button
					className={`${styles_button["tab-header__button"]} ${activeTab === 'Orders' && styles_button["tab-header__button--active"]}`}
					onClick={() => handleTabChange('Orders')}
				>
					Orders
				</Button>
			</div>

			<div className={styles["tab-content"]}>
				{activeTab === 'Info' && (
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
				{activeTab === 'Orders' && (
					<div className={styles["tab-orders"]}>
						<Text
							view="p-18"
							color="secondary"
						>
							You have no orders yet
						</Text>
					</div>
				)}
			</div>
		</div>
	);
}

export default observer(Tabs);