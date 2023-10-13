import classNames from 'classnames';
import React from 'react';
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	children: React.ReactNode;
	className?: string;
	color?: 'white' | 'accent';
};

const Button: React.FC<ButtonProps> = ({
																				 loading,
																				 children,
																				 className,
																				 color,
																				 ...restProps
																			 }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!loading && !restProps.disabled && restProps.onClick) {
			restProps.onClick(e);
		}
	};

	return (
		<button
			className={classNames(
				className,
				styles.button,
				color === 'white' ? styles["button--white"] : styles["button--accent"],
				(loading && !restProps.disabled) && styles["button--loading"]
			)}
			onClick={handleClick}
			disabled={restProps.disabled || loading}
			{...restProps}
		>
			{loading && <Loader size="s" color="white"/>}
			<Text
				view="button"
				className={styles.button__text}
			>
				{children}
			</Text>
		</button>
	);
};

export default React.memo(Button);