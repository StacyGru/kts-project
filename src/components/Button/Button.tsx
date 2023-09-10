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
			className={classNames(className, loading && !restProps.disabled ? `${styles.loading_only}` : null,
				color === 'white' ? `${styles.button} ${styles.button_white}` : `${styles.button} ${styles.button_accent}`)}
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