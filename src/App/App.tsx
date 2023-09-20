import Header from "../components/Header";
import ProductList from "pages/ProductList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductPage from "pages/ProductPage";
import "styles/Styles.scss";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";

const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <div style={{ padding: "0 100px" }}>
        <Routes>
          <Route path="/" element={<ProductList/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/about_us" element={<AboutUs/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
