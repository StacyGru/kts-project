import React from 'react';
import Button from "components/Button";
import styles_button from "components/Button/Button.module.scss";
import Image from "components/Image";
import Text from "components/Text";
import styles from "./ProductCard.module.scss";

export type ProductCardProps = {
	className?: string,
	image: string;
	captionSlot?: React.ReactNode;
	title: string;
	subtitle: React.ReactNode;
	contentSlot?: React.ReactNode;
	onClick?: React.MouseEventHandler;
	actionSlot?: React.ReactNode;
	onClickButton?: (event: React.MouseEvent) => void;
	inCart: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
	className,
	image,
	captionSlot,
	title,
	subtitle,
	contentSlot = "",
	onClick,
	onClickButton,
	inCart
}) => {

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
					{contentSlot
						? <Text view="p-18" weight="bold">{contentSlot}</Text>
						: null
					}
          <Button
	          onClick={onClickButton}
	          className={inCart ? styles_button["button--in_cart"] : undefined}
          >
	          {inCart ? "In cart" : "Add to cart"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
