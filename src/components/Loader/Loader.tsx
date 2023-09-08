import React from 'react';
import styles from "./Loader.module.scss";

export type LoaderProps = {
	/** Размер */
	size?: 's' | 'm' | 'l';
	/** Дополнительный класс */
	className?: string;
	color?: 'white' | 'primary';
};

const Loader: React.FC<LoaderProps> = ({size, className, color = 'primary'}) => (
	<div className={`${styles.container} ${size ? size : `${styles.l}`} ${className}`}>
		<div className={`${color === 'white' ? `${styles.white} ${styles.circle}` : `${styles.circle}`}`}></div>
	</div>
);

export default Loader;
