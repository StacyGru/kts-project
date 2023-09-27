import React, {useEffect, useState} from 'react';
import Button from "components/Button";
import SideArrowIcon from "components/Icons/SideArrowIcon/SideArrowIcon";
import styles from "./Pagination.module.scss";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage,
	                                               totalPages,
	                                               onPageChange }) => {
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
	const [pages, setPages] = useState<number[]>([]);

	useEffect(() => {
		if (pageNumbers.length - currentPage < 5) {
			setPages(pageNumbers.slice(-5));
		} else {
			const pagesList = pageNumbers.slice(currentPage - 1, currentPage + 2);
			pagesList.push(0);
			pagesList.push(pageNumbers.length);
			setPages(pagesList);
		}
	}, [currentPage, totalPages]);

	return pages && (
		<div className={styles.pagination}>

			<button className={`${styles['arrow-button']} ${currentPage === 1 && styles.disabled}`}
			        onClick={() => {
				        if (currentPage !== 1) {
					        onPageChange(currentPage - 1)}
			        }
			        }>
				<SideArrowIcon color={currentPage === 1 ? 'secondary' : 'primary'} height={32} width={32}/>
			</button>

			{pages.map((page) => (
				<Button
					key={page}
					onClick={() => onPageChange(page)}
					disabled={page === 0}
					className={page === currentPage
						? `${styles.button} ${styles.current} ${page === 0 && styles.dots}`
						: `${styles.button} ${page === 0 && styles.dots}`}
				>
					{page === 0 ? "..." : page}
				</Button>
			))}

			<button className={`${styles['arrow-button']} ${currentPage === pageNumbers.length && styles.disabled}`}
			        onClick={() => {
								if (currentPage !== pageNumbers.length) {
									onPageChange(currentPage + 1)}
								}
			        }>
				<SideArrowIcon color={currentPage === pageNumbers.length ? 'secondary' : 'primary'} height={32} width={32} rotate="180deg"/>
			</button>

		</div>
	);
};

export default Pagination;