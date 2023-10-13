import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles_pagination from "components/Pagination/Pagination.module.scss";
import ProductCard from "components/ProductCard";
import SideArrowIcon from "components/icons/SideArrowIcon";
import {ProductModel} from "models/product";
import rootStore from "store/RootStore";
import styles from "./Carousel.module.scss";

export type CarouselProps = {
	blocks: ProductModel[]
}

const Carousel: React.FC<CarouselProps> = ({
	blocks
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleBlocks, setVisibleBlocks] = useState(3);
	const navigate = useNavigate();
	const cartListJSON = localStorage.getItem("cartList");
	const cartList = rootStore.cart.cartList;

	useEffect(() => {
		if (cartListJSON) {
			rootStore.cart.setCartList(JSON.parse(cartListJSON));
		}
		if (window.innerWidth >= 2030) {
			setVisibleBlocks(4);
		}
		if (window.innerWidth <= 1850 && window.innerWidth > 1450) {
			setVisibleBlocks(3);
		}
		if (window.innerWidth <= 1450 && window.innerWidth > 1063) {
			setVisibleBlocks(2);
		}
		if (window.innerWidth <= 1063) {
			setVisibleBlocks(1);
		}
	}, []);

	function handleCardClick(product: ProductModel) {
		navigate(`/product/${product.id}`);
	}

	function handleButtonClick(product: ProductModel, event: React.MouseEvent) {
		event.stopPropagation();
		if (cartList.find((item) => item.product.id === product.id)) {
			navigate("/cart");
			window.scrollTo({
				top: 0,
			});
		} else {
			rootStore.cart.addToCart(product);
		}
	}

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1 >= blocks.length ? 0 : prevIndex + 1));
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? blocks.length - visibleBlocks : prevIndex - 1));
	};

	return (
		<div className={styles.carousel}>
			<button className={`${styles_pagination['pagination__arrow-button']} ${currentIndex === 0 && styles_pagination['pagination__arrow-button--disabled']}`}
			        onClick={() => {
				        if (currentIndex !== 0) {
					        prevSlide()}
			        }
			        }>
				<SideArrowIcon color={currentIndex === 0 ? 'secondary' : 'primary'} height={32} width={32}/>
			</button>

			<div className={styles["product-grid"]}>
				{blocks.slice(currentIndex, currentIndex + visibleBlocks).map((product) => (
					<ProductCard
						key={product.id}
						image={product.images[0]}
						captionSlot={product.category.name}
						title={product.title}
						subtitle={product.description}
						contentSlot={`$${product.price}`}
						inCart={!!cartList.find((item) => item.product.id === product.id)}
						onClickButton={(event) => handleButtonClick(product, event)}
						onClick={() => handleCardClick(product)}
					/>
				))}
			</div>

			<button className={`${styles_pagination['pagination__arrow-button']} ${currentIndex + visibleBlocks === blocks.length && styles_pagination['pagination__arrow-button--disabled']}`}
			        onClick={() => {
				        if (currentIndex + visibleBlocks !== blocks.length) {
					        nextSlide()}
			        }
			        }>
				<SideArrowIcon color={currentIndex + visibleBlocks === blocks.length ? 'secondary' : 'primary'} height={32} width={32} rotate="180deg"/>
			</button>
		</div>
	);
};

export default observer(Carousel);