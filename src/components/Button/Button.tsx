import classNames from 'classnames';
import React from 'react';
import Loader from "../Loader";
import Text from "../Text";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Состояние загрузки */
	loading?: boolean;
	/** Текст кнопки */
	children: React.ReactNode;
	className?: string;
};

const Button: React.FC<ButtonProps> = ({
																				 loading,
																				 children,
																				 className,
																				 ...restProps
																			 }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!loading && !restProps.disabled && restProps.onClick) {
			restProps.onClick(e);
		}
	};

	return (
		<button
			className={classNames(className, loading && !restProps.disabled ? `${styles.loading_only}` : null, `${styles.button}`)}
			{...restProps}
			onClick={handleClick}
			disabled={restProps.disabled || loading}
		>
			{loading ? <Loader size="s" color="white"/> : null}
			<Text view="button" className={`${styles.button_text}`}>{children}</Text>
		</button>
	);
};

export default Button;