import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import PageHeader from "components/PageHeader";
import rootStore from "store/RootStore";
import styles from "./LogIn.module.scss";

const LogIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	function handleLogIn(event: React.MouseEvent) {
		event.preventDefault();
		rootStore.user.logIn(email, password)
			.then(() => {
				const JWTJSON = JSON.stringify(rootStore.user.tokens);
				localStorage.setItem("JWT", JWTJSON);
				navigate("/user");
			})
			.catch((error) => alert(error));
	}

	return (
		<>
			<PageHeader text="Log in"/>

			<form className={styles.form}>
				<Input
					placeholder="E-mail"
					onChange={value => setEmail(value)}
				/>
				<Input
					type="password"
					placeholder="Password"
					onChange={value => setPassword(value)}
				/>
				<Button
					onClick={(event) => handleLogIn(event)}
				>Log in</Button>
			</form>
		</>
	);
}

export default observer(LogIn);