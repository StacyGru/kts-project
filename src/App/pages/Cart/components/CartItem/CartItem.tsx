import React from 'react';
import Text from "components/Text";
import styles from "./CartItem.module.scss";
import Delete from "assets/delete.svg";

export type CartItemProps = {
	className?: string,
	image: string;
	captionSlot?: React.ReactNode;
	title: string;
	subtitle: React.ReactNode;
	contentSlot?: React.ReactNode;
	onClick?: React.MouseEventHandler;
	actionSlot?: React.ReactNode;
	onClickButton?: (event: React.MouseEvent) => void;
};

const CartItem: React.FC<CartItemProps> = ({
	                                          className,
	                                          image,
	                                          captionSlot,
	                                          title,
	                                          subtitle,
	                                          contentSlot = "",
	                                          onClick,
	                                          onClickButton
                                          }) => {

	return (
		<div
			className={`${styles.card} ${className}`}
			onClick={onClick}
		>
			<img
				src={image}
				alt={title}
				className={styles.card__img}
			/>
			<div className={styles.card__body}>
				<div className={styles.card__info}>
					{captionSlot
						? <Text view="p-14" color="secondary" weight="medium">{captionSlot}</Text>
						: null
					}
					<Text
						view="p-20"
						weight="bold"
						maxLines={parseInt("2")}
					>
						{title}
					</Text>
					<Text
						color="secondary"
						weight="normal"
						maxLines={parseInt("3")}
						className={styles.card__description}
					>
						{subtitle}
					</Text>
				</div>
				<div className={styles.card__footer}>
					{contentSlot
						? <Text view="p-18" weight="bold">{contentSlot}</Text>
						: null
					}
					<img
						src={Delete}
						alt="delete"
						className={styles.delete}
						onClick={onClickButton}
					/>
				</div>
			</div>
		</div>
	);
};

export default CartItem;