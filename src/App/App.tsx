import Header from "../components/Header";
import ProductList from "pages/ProductList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductPage from "pages/ProductPage";
import "styles/Styles.scss";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <div style={{ padding: "0 100px" }}>
        <Routes>
          <Route path="/" element={<ProductList/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
