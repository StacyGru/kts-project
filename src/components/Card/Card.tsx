import React from 'react';
import Button from "components/Button";
import Text from "components/Text";
import styles from "./Card.module.scss";

export type CardProps = {
	className?: string,
	image: string;
	captionSlot?: React.ReactNode;
	title: string;
	subtitle: React.ReactNode;
	contentSlot?: React.ReactNode;
	onClick?: React.MouseEventHandler;
	actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
	className,
	image,
	captionSlot,
	title,
	subtitle,
	contentSlot = "",
	onClick,
	actionSlot
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
            {actionSlot
	            ? <Button>{actionSlot}</Button>
	            : null
						}
				</div>
			</div>
		</div>
	);
};

export default Card;
