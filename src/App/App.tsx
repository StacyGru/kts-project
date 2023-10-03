import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "components/Header";
import "styles/Styles.scss";
import AboutUs from "pages/AboutUs";
import Cart from "pages/Cart";
import Categories from "pages/Categories";
import LogIn from "pages/LogIn";
import Product from "pages/Product";
import Products from "pages/Products";
import User from "pages/User";
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
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
