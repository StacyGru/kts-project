import {observer} from "mobx-react-lite";
import React from 'react';
import Delete from "assets/delete.svg";
import Plus from "assets/plus.svg";
import MinusIcon from "components/Icons/MinusIcon";
import Image from "components/Image";
import Text from "components/Text";
import {CartModel} from "models/cart/cartItem";
import rootStore from "store/RootStore";
import styles from "./CartItem.module.scss";

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
	item: CartModel;
};

const CartItem: React.FC<CartItemProps> = ({
	                                          className,
	                                          image,
	                                          captionSlot,
	                                          title,
	                                          subtitle,
	                                          onClick,
	                                          onClickButton,
																						item
                                          }) => {

	function handleIncrease(event: React.MouseEvent, item: CartModel) {
		event.stopPropagation();
		rootStore.cart.increaseItemAmount(item.product);
	}

	function handleDecrease(event: React.MouseEvent, item: CartModel) {
		event.stopPropagation();
		if (item.amount !== 1) {
			rootStore.cart.decreaseItemAmount(item.product);
		}
	}

	return (
		<div
			className={`${styles.card} ${className}`}
			onClick={onClick}
		>
			<Image
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
					<div className={styles.amount}>
						<MinusIcon
							className={`${styles["button-amount"]} ${item.amount === 1 && styles["button-amount--disabled"]}`}
							onClick={(event) => handleDecrease(event, item)}
							color={item.amount === 1 ? "secondary" : "primary"}
						/>
						<Text view="p-20">{item.amount}</Text>
						<img
							src={Plus}
							alt="plus"
							className={styles["button-amount"]}
							onClick={(event) => handleIncrease(event, item)}/>
					</div>

					<img
						src={Delete}
						alt="delete"
						onClick={onClickButton}
					/>
				</div>
			</div>
		</div>
	);
};

export default observer(CartItem);