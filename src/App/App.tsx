import React from 'react';
import Header from "components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "styles/Styles.scss";
import Categories from "pages/Categories";
import AboutUs from "pages/AboutUs";
import Products from "pages/Products";
import Product from "pages/Product";

const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <div style={{ padding: "0 100px" }}>
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/about_us" element={<AboutUs/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
