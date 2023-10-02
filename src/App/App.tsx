import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "components/Header";
import "styles/Styles.scss";
import AboutUs from "pages/AboutUs";
import Cart from "pages/Cart";
import Categories from "pages/Categories";
import Product from "pages/Product";
import Products from "pages/Products";
import styles from "./App.module.scss";

const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <div className={styles.parent}>
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/about_us" element={<AboutUs/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
