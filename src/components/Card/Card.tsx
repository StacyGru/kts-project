import React from 'react';
import Button from "../Button";
import Text from "../Text";
import styles from "./Card.module.scss";

export type CardProps = {
	/** Дополнительный classname */
	className?: string,
	/** URL изображения */
	image: string;
	/** Слот над заголовком */
	captionSlot?: React.ReactNode;
	/** Заголовок карточки */
	title: React.ReactNode | string;
	/** Описание карточки */
	subtitle: React.ReactNode;
	/** Содержимое карточки (футер/боковая часть), может быть пустым */
	contentSlot?: React.ReactNode;
	/** Клик на карточку */
	onClick?: React.MouseEventHandler;
	/** Слот для действия */
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
		<div className={`${styles.parent} ${className}`} onClick={onClick}>
			<img src={image} alt={title} className={`${styles.img}`}/>
			<div className={`${styles.child}`}>
				<div className={`${styles.text_block}`}>
					{captionSlot ? <Text view="p-14" color="secondary" weight="medium">{captionSlot}</Text> : null}
					<Text view="p-20" weight="bold" maxLines={parseInt("2")}>{title}</Text>
					<Text color="secondary" weight="normal" maxLines={parseInt("3")} className={`${styles.long_text}`}>{subtitle}</Text>
				</div>
				<div className={`${styles.footer_block}`}>
					{contentSlot ? <Text view="p-18" weight="bold">{contentSlot}</Text> : null}
            {actionSlot ? <Button>{actionSlot}</Button> : null}
				</div>
			</div>
		</div>
	);
};

export default Card;
