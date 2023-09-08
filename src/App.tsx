import Header from "components/Header";
import ProductList from "./App/pages/ProductList";

function App() {

  return (
    <>
      <Header/>
      <div style={{ padding: "100px" }}>
        <ProductList/>
      </div>
    </>
  )
}

export default App
